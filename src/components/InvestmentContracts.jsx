import { useEffect, useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useLanguage } from './LanguageContext.jsx';
import { supabase } from '../services/supabase.js';

const formatDate = (value) => {
  if (!value) return 'Not defined';
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-US');
};

const formatMoney = (value) => (
  value === null || value === undefined
    ? 'Not defined'
    : `$${Number(value).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
);

function downloadContract(contract) {
  const document = new jsPDF();
  const pageWidth = document.internal.pageSize.getWidth();
  const textWidth = pageWidth - 36;
  let y = 28;

  document.setTextColor(0, 91, 97);
  document.setFont('helvetica', 'bold');
  document.setFontSize(18);
  document.text('INVESTMENT AGREEMENT', 18, y);
  y += 10;

  document.setTextColor(70, 83, 84);
  document.setFont('helvetica', 'normal');
  document.setFontSize(10);
  document.text(`Generated: ${formatDate(new Date().toISOString().slice(0, 10))}`, 18, y);
  y += 12;
  const returnTerm = contract.plazo_retorno_meses
    ? `${contract.plazo_retorno_meses} months`
    : 'term not defined';

  const paragraphs = [
    `Investor: ${contract.inversionista_nombre}`,
    `Entrepreneur: ${contract.emprendedor_nombre}`,
    `Project: ${contract.proyecto_nombre}`,
    `Confirmed contribution: ${formatMoney(contract.monto)} USD`,
    `Recorded participation: ${Number(contract.participacion || 0).toFixed(2)}%`,
    `Estimated total project profit: ${formatMoney(contract.ganancia_esperada_proyecto)} USD`,
    `Estimated profit share for this investor: ${formatMoney(contract.ganancia_estimada_inversionista)} USD`,
    `Estimated total to receive (contribution plus profit): ${formatMoney(Number(contract.monto || 0) + Number(contract.ganancia_estimada_inversionista || 0))} USD`,
    `Estimated term: ${returnTerm}`,
    `Payment confirmation date: ${formatDate(contract.fecha_pago)}`,
    `Estimated return date: ${formatDate(contract.fecha_limite_retorno)}`,
    '',
    'Recorded terms',
    `The entrepreneur declares estimated total project profit of ${formatMoney(contract.ganancia_esperada_proyecto)} USD. This investor's estimated share is ${formatMoney(contract.ganancia_estimada_inversionista)} USD, calculated from their ${Number(contract.participacion || 0).toFixed(2)}% participation. The estimated term is ${returnTerm} from payment confirmation.`,
    '',
    'Profit and return dates are projections provided by the entrepreneur and are not guaranteed. This document is an informational record generated from data entered in Foundy. Both parties should review the terms and sign a separate document to formalize legal obligations. This document is not a substitute for legal advice.',
  ];

  paragraphs.forEach((paragraph) => {
    if (!paragraph) {
      y += 5;
      return;
    }

    if (paragraph === 'Recorded terms') {
      document.setFont('helvetica', 'bold');
      document.setTextColor(0, 91, 97);
    } else {
      document.setFont('helvetica', 'normal');
      document.setTextColor(53, 69, 70);
    }

    const lines = document.splitTextToSize(paragraph, textWidth);
    if (y + lines.length * 6 > 265) {
      document.addPage();
      y = 24;
    }
    document.text(lines, 18, y);
    y += lines.length * 6 + 3;
  });

  if (y + 28 > 280) {
    document.addPage();
    y = 28;
  }
  document.setDrawColor(160, 174, 170);
  document.line(22, y + 15, 88, y + 15);
  document.line(122, y + 15, 188, y + 15);
  document.setFontSize(9);
  document.text('Investor signature', 22, y + 21);
  document.text('Entrepreneur signature', 122, y + 21);
  document.save(`foundy-investment-agreement-${contract.id_inversion}.pdf`);
}

export default function InvestmentContracts({ userId, party }) {
  const { t } = useLanguage();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const column = party === 'investor' ? 'id_inversionista' : 'id_emprendedor';

    const loadContracts = async () => {
      if (!userId) {
        setContracts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error: queryError } = await supabase
        .from('investment_contracts')
        .select('id_inversion, proyecto_nombre, inversionista_nombre, emprendedor_nombre, monto, participacion, ganancia_esperada_proyecto, ganancia_estimada_inversionista, plazo_retorno_meses, fecha_pago, fecha_limite_retorno, created_at')
        .eq(column, userId)
        .order('created_at', { ascending: false });

      if (!active) return;
      setError(queryError ? `${t('Contracts could not be loaded:')} ${queryError.message}` : '');
      setContracts(data || []);
      setLoading(false);
    };

    loadContracts();
    const channel = userId
      ? supabase.channel(`investment-contracts:${party}:${userId}`)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'investment_contracts',
          filter: `${column}=eq.${userId}`,
        }, loadContracts)
        .subscribe()
      : null;
    return () => {
      active = false;
      if (channel) supabase.removeChannel(channel);
    };
  }, [party, t, userId]);

  return (
    <section className="mt-7 overflow-hidden rounded-xl border border-[#e9e2d8] bg-white">
      <div className="border-b border-[#edf0ed] px-5 py-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-[#1e4043]">
          <FileText size={18} className="text-[#0b5d61]" />
          {t('Investment agreements')}
        </h2>
        <p className="mt-1 text-xs leading-5 text-[#718083]">{t('Agreements are created after payment confirmation and can be downloaded for review.')}</p>
      </div>

      {error ? (
        <p className="px-5 py-4 text-sm text-red-700" role="alert">{error}</p>
      ) : loading ? (
        <p className="px-5 py-8 text-center text-sm text-[#718083]">{t('Loading agreements...')}</p>
      ) : contracts.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-[#718083]">{t('No confirmed investment agreements yet.')}</p>
      ) : (
        <div className="divide-y divide-[#edf0ed]">
          {contracts.map((contract) => (
            <article key={contract.id_inversion} className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-[#1d3f42]">{contract.proyecto_nombre}</h3>
                <p className="mt-1 text-xs text-[#718083]">
                  {party === 'investor' ? `${t('Entrepreneur')}: ${contract.emprendedor_nombre}` : `${t('Investor')}: ${contract.inversionista_nombre}`}
                </p>
                <p className="mt-1 text-xs text-[#718083]">
                  {t('Investment')}: {formatMoney(contract.monto)} USD · {Number(contract.participacion || 0).toFixed(2)}%
                </p>
                <p className="mt-1 text-xs text-[#718083]">
                  {t('Estimated investor profit')}: {formatMoney(contract.ganancia_estimada_inversionista)} USD · {contract.plazo_retorno_meses ? `${contract.plazo_retorno_meses} ${t('months')}` : t('Term not defined')} · {t('Return deadline')}: {formatDate(contract.fecha_limite_retorno)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => downloadContract(contract)}
                className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#0b5d61] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#08494c]"
              >
                <Download size={15} />
                {t('Download agreement')}
              </button>
            </article>
          ))}
        </div>
      )}
      <p className="border-t border-[#edf0ed] px-5 py-3 text-[11px] leading-5 text-[#718083]">{t('Generated documents are informational records and should be reviewed and signed by both parties.')}</p>
    </section>
  );
}
