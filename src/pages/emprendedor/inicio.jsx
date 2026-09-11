import { useEffect, useState } from 'react';
import { ArrowUpRight, FolderKanban, Plus, Target, Users } from 'lucide-react';
import { supabase } from '../../services/supabase.js';

const formatMoney = (value) => `$${Number(value || 0).toLocaleString('en-US')}`;

function Inicio({ usuarioData, onOpenCreateProject }) {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let activo = true;
    const cargarProyectos = async () => {
      if (!usuarioData?.dui) {
        setProyectos([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data, error: queryError } = await supabase
        .from('proyecto')
        .select('id_proyecto, nombre, descripcion, monto_objetivo, monto_recaudado, estado, fecha_inicio')
        .eq('dui', usuarioData.dui)
        .order('fecha_inicio', { ascending: false });
      if (!activo) return;
      setError(queryError ? 'No pudimos cargar tus proyectos. Intenta nuevamente.' : '');
      setProyectos(data || []);
      setLoading(false);
    };
    cargarProyectos();
    window.addEventListener('foundy-project-published', cargarProyectos);
    return () => {
      activo = false;
      window.removeEventListener('foundy-project-published', cargarProyectos);
    };
  }, [usuarioData?.dui]);

  const metaTotal = proyectos.reduce((total, proyecto) => total + Number(proyecto.monto_objetivo || 0), 0);
  const recaudadoTotal = proyectos.reduce((total, proyecto) => total + Number(proyecto.monto_recaudado || 0), 0);
  const pendienteTotal = Math.max(metaTotal - recaudadoTotal, 0);
  const progreso = metaTotal ? Math.min(Math.round((recaudadoTotal / metaTotal) * 100), 100) : 0;
  const nombre = usuarioData?.usuario || 'emprendedor';

  return (
    <div className="min-h-full bg-[#f7f3ee] text-[#1e4043]">
      <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
        <section className="relative overflow-hidden rounded-2xl bg-[#0b5d61] px-6 py-8 text-white shadow-[0_16px_32px_rgba(11,93,97,0.16)] sm:px-9 sm:py-10">
          <div className="absolute -right-12 -top-20 h-56 w-56 rounded-full border-[28px] border-white/10" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b9eee0]">Entrepreneur dashboard</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Hello, {nombre}</h1>
            <p className="mt-3 text-sm leading-6 text-white/75">Manage your projects, track your progress, and find the next step to grow your idea.</p>
          </div>
        </section>

        {error && <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</div>}

        <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Project summary">
          {[
            ['Projects', loading ? '...' : proyectos.length, 'Your registered initiatives', FolderKanban, ''],
            ['Total goal', loading ? '...' : formatMoney(metaTotal), 'Requested capital', Target, ''],
            ['Raised', loading ? '...' : formatMoney(recaudadoTotal), 'Confirmed funds', ArrowUpRight, 'text-[#168b68]'],
            ['Remaining', loading ? '...' : formatMoney(pendienteTotal), 'To complete your goals', Users, ''],
          ].map(([label, value, hint, Icon, valueClass]) => (
            <article key={label} className="rounded-xl border border-[#e9e2d8] bg-white p-5">
              <div className="flex items-center justify-between"><p className="text-xs font-semibold text-[#6b7a7c]">{label}</p><Icon size={18} className="text-[#0b5d61]" /></div>
              <p className={`mt-4 text-2xl font-bold ${valueClass}`}>{value}</p><p className="mt-1 text-xs text-[#849294]">{hint}</p>
            </article>
          ))}
        </section>

        <section className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
          <article className="rounded-xl border border-[#e9e2d8] bg-white p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#168b68]">Overall progress</p><h2 className="mt-2 text-xl font-bold">Funding progress</h2></div><span className="text-2xl font-bold text-[#0b5d61]">{loading ? '...' : `${progreso}%`}</span></div>
            <div className="mt-8 h-3 overflow-hidden rounded-full bg-[#e7ece8]"><div className="h-full rounded-full bg-[#168b68] transition-all duration-500" style={{ width: `${progreso}%` }} /></div>
            <div className="mt-3 flex justify-between text-xs text-[#718083]"><span>{formatMoney(recaudadoTotal)} raised</span><span>{formatMoney(metaTotal)} goal</span></div>
            {!loading && proyectos.length === 0 && <p className="mt-7 border-t border-[#edf0ed] pt-5 text-sm leading-6 text-[#718083]">Create your first project to start tracking your funding progress.</p>}
          </article>
          <article className="rounded-xl border border-dashed border-[#9bc8bd] bg-[#f3faf6] p-6 sm:p-7"><div className="grid h-11 w-11 place-items-center rounded-lg bg-[#dff2eb] text-[#0b5d61]"><FolderKanban size={20} /></div><h2 className="mt-5 text-xl font-bold">Your next step</h2><p className="mt-2 text-sm leading-6 text-[#718083]">{proyectos.length ? 'Keep your project information updated to attract the right investors.' : 'Register your idea and start connecting with investors.'}</p><button type="button" onClick={onOpenCreateProject} className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[#0b5d61] px-4 py-3 text-sm font-bold text-[#0b5d61] transition hover:bg-[#e5f5ef]"><Plus size={16} /> {proyectos.length ? 'Add project' : 'Register project'}</button></article>
        </section>

        <section className="mt-7 rounded-xl border border-[#e9e2d8] bg-white p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#168b68]">Your projects</p><h2 className="mt-2 text-xl font-bold">Overview</h2></div><span className="text-xs font-semibold text-[#718083]">{proyectos.length} {proyectos.length === 1 ? 'project' : 'projects'}</span></div>
          {loading ? <p className="py-10 text-center text-sm text-[#718083]">Loading your projects...</p> : proyectos.length === 0 ? <p className="py-10 text-center text-sm text-[#718083]">You have no registered projects yet.</p> : <div className="mt-5 grid gap-3 md:grid-cols-2">{proyectos.map((proyecto) => <article key={proyecto.id_proyecto} className="rounded-lg border border-[#edf0ed] bg-[#fbfcfa] p-4"><div className="flex items-start justify-between gap-3"><h3 className="font-bold">{proyecto.nombre}</h3><span className="rounded-full bg-[#e5f3ed] px-2.5 py-1 text-[10px] font-bold uppercase text-[#168b68]">{proyecto.estado || 'draft'}</span></div><p className="mt-2 line-clamp-2 text-sm leading-5 text-[#718083]">{proyecto.descripcion || 'No description available.'}</p><div className="mt-4 flex justify-between border-t border-[#edf0ed] pt-3 text-xs text-[#718083]"><span>Raised: <strong className="text-[#1e4043]">{formatMoney(proyecto.monto_recaudado)}</strong></span><span>Goal: <strong className="text-[#1e4043]">{formatMoney(proyecto.monto_objetivo)}</strong></span></div></article>)}</div>}
        </section>
      </div>
    </div>
  );
}

export default Inicio;
