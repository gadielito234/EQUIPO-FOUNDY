import { useEffect, useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { supabase } from '../../services/supabase.js';

async function readPublishedProjects() {
  const { data, error } = await supabase.from('proyecto').select('*').eq('estado', 'publicado');

  if (error) throw error;

  return (data || []).map((project) => ({
    id: project.id_proyecto,
    title: project.nombre,
    location: project.ubicacion || 'Location unavailable',
    category: project.id_categoria || 'Uncategorized',
    objective: project.descripcion || 'No description available.',
    image: project.imagen_url || '',
    goal: project.monto_objetivo ? `$${Number(project.monto_objetivo).toLocaleString('en-US')}` : 'Unavailable',
    term: project.fecha_fin && project.fecha_inicio ? `${project.fecha_inicio} - ${project.fecha_fin}` : 'Unavailable',
  }));
}

export default function HomeInversionista({ usuarioData, onOpenInvestments }) {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activo = true;

    const cargar = async () => {
      try {
        const projects = await readPublishedProjects();
        if (!activo) return;
        setOpportunities(projects);
      } catch {
        if (activo) setOpportunities([]);
      } finally {
        if (activo) setLoading(false);
      }
    };

    cargar();
    return () => {
      activo = false;
    };
  }, []);

  const nombre = usuarioData?.usuario || 'Investor';

  return (
    <main className="min-h-full bg-[#f7f3ee] px-5 py-8 text-[#1e4043] sm:px-8 lg:px-10">
      <div className="w-full">
        <section className="relative overflow-hidden rounded-[28px] bg-[#0b5d61] px-6 py-8 text-white shadow-[0_16px_32px_rgba(11,93,97,0.16)] sm:px-8 sm:py-10">
          <div className="absolute -right-12 -top-20 h-56 w-56 rounded-full border-[28px] border-white/10" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b9eee0]">Investor home</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Hello, {nombre}</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">
              Discover available projects and find new opportunities to invest in.
            </p>
          </div>
        </section>

        <section className="mt-7 rounded-[26px] border border-[#e9e2d8] bg-white p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#168b68]">Catalog</p>
              <h2 className="mt-2 text-xl font-bold text-[#1e4043]">Available projects</h2>
            </div>
            <span className="text-xs font-semibold text-[#718083]">{opportunities.length} projects</span>
          </div>

          {loading ? (
            <p className="mt-8 text-sm text-[#718083]">Loading available projects...</p>
          ) : opportunities.length > 0 ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {opportunities.map((item) => (
                <article key={item.id} className="overflow-hidden rounded-2xl border border-[#edf0ed] bg-[#fbfcfa] transition hover:border-[#9ec7bd] hover:shadow-sm">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="h-36 w-full object-cover" />
                  ) : (
                    <div className="grid h-36 place-items-center bg-[#e8efed] text-xs text-[#5d6d6d]">No image</div>
                  )}

                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-[#edf5f2] px-2 py-1 text-[10px] font-semibold text-[#1d4b4c]">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-medium text-[#768587]">{item.term}</span>
                    </div>

                    <h3 className="mt-3 text-base font-bold text-[#1d3f42]">{item.title}</h3>
                    <p className="mt-2 flex items-center gap-1 text-[10px] text-[#5f7274]">
                      <MapPin size={12} className="text-[#168b68]" />
                      {item.location}
                    </p>
                    <p className="mt-3 text-[11px] leading-5 text-[#5d6d6d]">{item.objective}</p>

                    <div className="mt-4 flex items-center justify-between border-t border-[#edf0ed] pt-3 text-[10px] text-[#718083]">
                      <span>Goal <strong className="text-[#1e4043]">{item.goal}</strong></span>
                      <button
                        type="button"
                        onClick={onOpenInvestments}
                        className="inline-flex items-center gap-1 font-bold text-[#0b5d61]"
                      >
                        View more
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-xl border border-dashed border-[#cbd4d3] bg-[#f8f7f5] p-10 text-center text-sm text-[#446062]">
              There are no projects available at the moment.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
