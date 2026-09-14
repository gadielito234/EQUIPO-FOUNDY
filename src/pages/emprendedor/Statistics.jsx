import { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import { supabase } from '../../services/supabase.js';

const buildMonthlyData = (projects = []) => {
  const now = new Date();

  return Array.from({ length: 12 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (11 - index), 1);
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();

    const activeProjects = (projects || []).filter((project) => {
      const projectDate = new Date(project.fecha_inicio || now);
      return project.estado === 'publicado' && projectDate <= date;
    });

    const totalInvestment = activeProjects.reduce(
      (total, project) => total + Number(project.monto_recaudado || 0),
      0,
    );

    const totalGoal = activeProjects.reduce(
      (total, project) => total + Number(project.monto_objetivo || 0),
      0,
    );

    const progress = totalGoal ? Math.min(totalInvestment / totalGoal, 1) : 0;
    const pct = Math.round(progress * 100);

    return {
      month,
      cx: 18 + index * 30,
      cy: 104 - progress * 68,
      totalInvestment: `$${totalInvestment.toLocaleString('en-US')}`,
      roi: `${pct}%`,
      activeProjects: String(activeProjects.length),
      investmentChange: `${pct}% of goal reached`,
      roiChange: 'Based on current funding',
      projectsChange: `${activeProjects.length} published project${activeProjects.length === 1 ? '' : 's'}`,
      distribution: [
        { label: 'Projects', pct: 45, color: '#138b88' },
        { label: 'Raised', pct: Math.max(10, Math.min(45, Math.round(progress * 45))), color: '#65bcb2' },
        { label: 'Pending', pct: Math.max(10, 100 - Math.max(10, Math.min(45, Math.round(progress * 45))) - 45), color: '#d9e9e5' },
      ],
    };
  });
};

const fallbackMonthlyData = buildMonthlyData();

function Statistics({ usuarioData }) {
  const [monthlyData, setMonthlyData] = useState(fallbackMonthlyData);
  const [loading, setLoading] = useState(true);
  const [mesSeleccionado, setMesSeleccionado] = useState(11);
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('1 YEAR');

  useEffect(() => {
    let mounted = true;

    const loadStatistics = async () => {
      setLoading(true);

      const fallbackRows = buildMonthlyData();
      if (!mounted) return;
      setMonthlyData(fallbackRows);

      if (!usuarioData?.dui) {
        setLoading(false);
        return;
      }

      try {
        const { data: projects, error } = await supabase
          .from('proyecto')
          .select('id_proyecto, monto_objetivo, monto_recaudado, estado, fecha_inicio, id_categoria')
          .eq('dui', usuarioData.dui);

        if (!mounted) return;

        if (error) {
          setMonthlyData(fallbackRows);
          setLoading(false);
          return;
        }

        const rows = buildMonthlyData(projects || []);
        setMonthlyData(rows);
      } catch {
        if (mounted) {
          setMonthlyData(fallbackRows);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadStatistics();

    return () => {
      mounted = false;
    };
  }, [usuarioData?.dui]);

  const getDatosPorPeriodo = (periodo) => {
    if (periodo === '6 MONTHS') return monthlyData.slice(-6);
    if (periodo === 'ALL') return monthlyData;
    return monthlyData;
  };

  const datosPorPeriodo = getDatosPorPeriodo(periodoSeleccionado);
  const mesVisibleIndex = Math.max(0, Math.min(mesSeleccionado, datosPorPeriodo.length - 1));
  const datosActivos = datosPorPeriodo[mesVisibleIndex] || datosPorPeriodo[datosPorPeriodo.length - 1];

  const handlePeriodoChange = (periodo) => {
    setPeriodoSeleccionado(periodo);

    const nuevoRango = getDatosPorPeriodo(periodo);
    const ultimoMes = nuevoRango[nuevoRango.length - 1];
    const mesActual = monthlyData.findIndex((mes) => mes.month === ultimoMes.month);

    setMesSeleccionado(mesActual >= 0 ? mesActual : 0);
  };

  const handleExportReport = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;

    doc.setFillColor(244, 246, 247);
    doc.rect(0, 0, pageWidth, 300, 'F');

    doc.setTextColor(0, 76, 82);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('My Statistics', 14, 22);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(104, 117, 119);
    doc.setFontSize(10);
    doc.text('Track your progress and get insights into your performance.', 14, 30);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(20, 111, 120);
    doc.roundedRect(14, 42, 58, 30, 4, 4, 'F');
    doc.setFontSize(10);
    doc.text('Total Investment', 20, 53);
    doc.setFontSize(18);
    doc.text(datosActivos.totalInvestment, 20, 66);

    doc.setFillColor(255, 255, 255);
    doc.setTextColor(39, 76, 82);
    doc.roundedRect(84, 42, 58, 30, 4, 4, 'F');
    doc.setFontSize(10);
    doc.text('Avg. Annual ROI', 90, 53);
    doc.setFontSize(18);
    doc.text(datosActivos.roi, 90, 66);

    doc.setFillColor(228, 243, 239);
    doc.roundedRect(154, 42, 58, 30, 4, 4, 'F');
    doc.setTextColor(50, 151, 125);
    doc.setFontSize(10);
    doc.text('Active Projects', 160, 53);
    doc.setFontSize(18);
    doc.text(datosActivos.activeProjects, 170, 66);

    doc.setTextColor(0, 76, 82);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('Portfolio Growth', 14, 96);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Your investment growth over time', 14, 102);
    doc.text(`Selected month: ${datosActivos.month}`, 14, 110);

    doc.setFillColor(21, 126, 129);
    doc.setDrawColor(21, 126, 129);
    doc.line(14, 118, 192, 118);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('Distribution', 14, 176);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);

    let yOffset = 192;
    datosActivos.distribution.forEach((item) => {
      doc.setFillColor(...hexToRgb(item.color));
      doc.roundedRect(14, yOffset, 78, 8, 2, 2, 'F');
      doc.setTextColor(0, 76, 82);
      doc.setFontSize(9);
      doc.text(item.label, 22, yOffset + 6);
      doc.text(`${item.pct}%`, 178, yOffset + 6);
      yOffset += 12;
    });

    doc.setTextColor(0, 76, 82);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Foundy · Generated report', centerX, 280, { align: 'center' });

    doc.save('foundy-statistics-report.pdf');
  };

  const hexToRgb = (hex) => {
    const cleanHex = hex.replace('#', '');
    const bigint = Number.parseInt(cleanHex, 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  const [d1, d2, d3] = datosActivos.distribution;
  const conicGradient = `conic-gradient(${d1.color} 0 ${d1.pct}%, ${d2.color} ${d1.pct}% ${d1.pct + d2.pct}%, ${d3.color} ${d1.pct + d2.pct}% 100%)`;

  const chartPath = datosPorPeriodo
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.cx} ${point.cy}`)
    .join(' ');

  const chartAreaPath = `${chartPath} L ${datosPorPeriodo[datosPorPeriodo.length - 1].cx} 120 L ${datosPorPeriodo[0].cx} 120 Z`;

  return (
    <div className="min-h-screen bg-[#f4f6f7] text-[#31474a]">
      <main className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#004e56]">My Statistics</h1>
            <p className="mt-1 max-w-lg text-xs leading-5 text-[#687577]">
              Track your progress and get insights into your performance.
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportReport}
            className="rounded-md bg-[#006b73] px-3 py-2 text-[11px] font-semibold text-white shadow-sm transition hover:bg-[#005c61]"
          >
            Export report
          </button>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-[#146f78] bg-[#0d6c73] p-4 text-white shadow-[0_8px_18px_rgba(0,90,95,0.12)]">
            <p className="text-[11px] text-[#d8f2ee]">Total Investment</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{datosActivos.totalInvestment}</p>
            <p className="mt-2 text-[10px] font-semibold text-[#c0e9df]">{datosActivos.investmentChange}</p>
          </article>

          <article className="rounded-xl border border-[#e8eeee] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
            <p className="text-[11px] text-[#7d898b]">Avg. Annual ROI</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-[#279578]">{datosActivos.roi}</p>
            <p className="mt-2 text-[10px] font-semibold text-[#2c8068]">{datosActivos.roiChange}</p>
          </article>

          <article className="rounded-xl border border-[#d9eee8] bg-[#e4f3ef] p-4">
            <p className="text-[11px] text-[#527573]">Active Projects</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-[#32977d]">{datosActivos.activeProjects}</p>
            <p className="mt-2 text-[10px] font-semibold text-[#2c8068]">{datosActivos.projectsChange}</p>
          </article>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(220px,0.8fr)]">
          <article className="rounded-xl border border-[#e8eeee] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-sm font-semibold text-[#293a3d]">Portfolio Growth</h2>
                <p className="mt-1 text-[10px] text-[#899395]">Your investment growth over time</p>
              </div>

              <div className="flex gap-1 rounded border border-[#e0e7e7] bg-[#f6f8f8] p-1 text-[8px] text-[#617173]">
                {['6 MONTHS', '1 YEAR', 'ALL'].map((periodo) => (
                  <button
                    key={periodo}
                    type="button"
                    onClick={() => handlePeriodoChange(periodo)}
                    className={periodoSeleccionado === periodo ? 'rounded bg-[#e6f1f0] px-2 py-1 font-semibold text-[#006b73]' : 'px-2 py-1'}
                  >
                    {periodo}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative mt-6 h-44 overflow-hidden rounded-lg border border-[#edf1f1] bg-[#f9fbfb]">
              <svg viewBox="0 0 360 140" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" role="img" aria-label="Portfolio growth chart">
                <defs>
                  <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#65bcb2" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#65bcb2" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {[0, 1, 2, 3].map((line) => (
                  <line
                    key={line}
                    x1="0"
                    x2="360"
                    y1={25 + line * 30}
                    y2={25 + line * 30}
                    stroke="#e8efef"
                    strokeDasharray="4 4"
                  />
                ))}

                <path d={chartAreaPath} fill="url(#growthFill)" />
                <path d={chartPath} fill="none" stroke="#138b88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                {datosPorPeriodo.map((point) => {
                  const indexInMonthly = monthlyData.findIndex((item) => item.month === point.month);
                  const isActive = indexInMonthly === mesSeleccionado;

                  return (
                    <g key={point.month}>
                      <circle
                        cx={point.cx}
                        cy={point.cy}
                        r={isActive ? 5 : 3.5}
                        fill={isActive ? '#ffffff' : '#138b88'}
                        stroke="#138b88"
                        strokeWidth="2"
                        className="cursor-pointer"
                        onClick={() => setMesSeleccionado(indexInMonthly)}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="mt-3 flex justify-between gap-1 text-[9px] text-[#899395]">
              {datosPorPeriodo.map((point) => {
                const indexInMonthly = monthlyData.findIndex((item) => item.month === point.month);

                return (
                  <button
                    key={point.month}
                    type="button"
                    onClick={() => setMesSeleccionado(indexInMonthly)}
                    className={indexInMonthly === mesSeleccionado ? 'font-semibold text-[#006b73]' : 'hover:text-[#527573]'}
                  >
                    {point.month}
                  </button>
                );
              })}
            </div>
          </article>

          <article className="rounded-xl border border-[#e8eeee] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
            <h2 className="text-sm font-semibold text-[#293a3d]">Distribution</h2>
            <p className="mt-1 text-[10px] text-[#899395]">By project category</p>

            <div className="mx-auto mt-6 flex h-32 w-32 items-center justify-center rounded-full" style={{ background: conicGradient }}>
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white">
                <strong className="block text-2xl text-[#006b73]">{datosActivos.activeProjects}</strong>
                <span className="text-[9px] text-[#7b888a]">ACTIVE PROJECTS</span>
              </div>
            </div>

            <div className="mt-5 space-y-2 text-[10px] text-[#586668]">
              {datosActivos.distribution.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded bg-[#f5f9f8] px-2 py-1.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.label}</span>
                  </div>
                  <span className="rounded bg-[#e5f1ee] px-1 text-[#527573]">{item.pct}%</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-xl border border-[#e8eeee] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-[#293a3d]">Recent Activity</h2>
              <p className="mt-1 text-[10px] text-[#899395]">Your latest investment activity</p>
            </div>
            <button type="button" className="text-[10px] font-semibold text-[#006b73]">
              View full history
            </button>
          </div>

          <div className="mt-4 grid gap-3 text-xs sm:grid-cols-3">
            <p className="border-l-2 border-[#78c7b2] pl-3">
              <strong className="block text-[#42575a]">New investment added</strong>
              <span className="text-[10px] text-[#899395]">GreenTech Solutions · 2 hours ago</span>
            </p>
            <p className="border-l-2 border-[#78c7b2] pl-3">
              <strong className="block text-[#42575a]">Project milestone reached</strong>
              <span className="text-[10px] text-[#899395]">EcoMarket · Yesterday</span>
            </p>
            <p className="border-l-2 border-[#78c7b2] pl-3">
              <strong className="block text-[#42575a]">Monthly report ready</strong>
              <span className="text-[10px] text-[#899395]">Your portfolio · 2 days ago</span>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Statistics;
