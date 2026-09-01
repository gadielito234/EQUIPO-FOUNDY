import { useEffect, useState } from "react";
import CrearProyecto from "./CrearProyecto.jsx";
import { supabase } from "../../services/supabase.js";

const menu = ["Create project", "My projects", "Opportunities", "Messages"];

function EmprendedorContenido({
  nombreUsuario = "Entrepreneur",
  onCerrarSesion,
  onBackHome,
  mostrarVista = "crear",
  onOpenCreateProject,
  onOpenMyProjects,
}) {
  const [vistaActual, setVistaActual] = useState(mostrarVista);
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setVistaActual(mostrarVista);
  }, [mostrarVista]);

  const obtenerProyectosLocal = () => {
    try {
      const data = JSON.parse(localStorage.getItem("proyectos") || "{}");
      return data[nombreUsuario] || [];
    } catch {
      return [];
    }
  };

  const guardarProyectosLocal = (lista) => {
    try {
      const data = JSON.parse(localStorage.getItem("proyectos") || "{}");
      data[nombreUsuario] = lista;
      localStorage.setItem("proyectos", JSON.stringify(data));
    } catch (error) {
      console.error("Error guardando proyectos en localStorage:", error);
    }
  };

  const cargarProyectos = async () => {
    setCargando(true);
    try {
      const { data, error } = await supabase
        .from("proyectos")
        .select("*")
        .eq("usuario_id", nombreUsuario)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        setProyectos(data);
        guardarProyectosLocal(data);
      } else {
        const locales = obtenerProyectosLocal();
        setProyectos(locales);
      }
    } catch {
      const locales = obtenerProyectosLocal();
      setProyectos(locales);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProyectos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nombreUsuario]);

  const agregarProyecto = (nuevoProyecto) => {
    const proyectoConDatos = {
      ...nuevoProyecto,
      id: nuevoProyecto?.id || `proyecto_${Date.now()}`,
      nombre: nuevoProyecto?.nombre || "Proyecto sin nombre",
      descripcion: nuevoProyecto?.descripcion || "",
      monto: nuevoProyecto?.monto ?? null,
      retorno: nuevoProyecto?.retorno ?? null,
      estado: nuevoProyecto?.estado || "borrador",
      imagenes_count: nuevoProyecto?.imagenes_count || 0,
      created_at: nuevoProyecto?.created_at || new Date().toISOString(),
    };

    setProyectos((prev) => [proyectoConDatos, ...prev]);
    guardarProyectosLocal([proyectoConDatos, ...proyectos]);
    setVistaActual("mis-proyectos");
    if (onOpenMyProjects) onOpenMyProjects();
  };

  const eliminarProyecto = (id) => {
    const confirmado = window.confirm("¿Deseas eliminar este proyecto?");
    if (!confirmado) return;

    const filtrados = proyectos.filter((proyecto) => proyecto.id !== id);
    setProyectos(filtrados);
    guardarProyectosLocal(filtrados);
  };

  const navegarMenu = (index) => {
    if (index === 0) {
      setVistaActual("crear");
      if (onOpenCreateProject) onOpenCreateProject();
      return;
    }

    if (index === 1) {
      setVistaActual("mis-proyectos");
      if (onOpenMyProjects) onOpenMyProjects();
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f6] text-slate-800">
      <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackHome}
            className="h-7 w-28 text-left text-lg font-black text-[#006b73]"
            aria-label="Back to home"
          >
            Foundy
          </button>
          <div className="hidden items-center gap-8 text-sm font-medium text-slate-500 md:flex">
            <a href="#" className="text-[#006b73]">Workspace</a>
            <a href="#" className="text-[#424a4c] hover:text-[#006b73]">Help center</a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 sm:block">Hello, {nombreUsuario}</span>
            <button
              type="button"
              onClick={onCerrarSesion}
              className="rounded-lg border border-[#424a4c]/30 px-3 py-2 text-xs font-semibold text-[#424a4c] transition hover:border-[#006b73] hover:text-[#006b73]"
            >
              Log out
            </button>
          </div>
        </div>
      </nav>

      <div className="mx-auto flex max-w-[1500px]">
        <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white px-4 py-7 lg:block">
          <div className="mb-8 px-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              ENTREPRENEUR
              <br />
              DASHBOARD
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-700">
              Build your next opportunity
            </p>
          </div>

          <nav className="space-y-1" aria-label="Entrepreneur menu">
            {menu.map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => navegarMenu(index)}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                  (index === 0 && vistaActual === "crear") ||
                  (index === 1 && vistaActual === "mis-proyectos")
                    ? "bg-[#006b73] text-white"
                    : "text-[#424a4c] hover:bg-[#00634b]/10 hover:text-[#00634b]"
                }`}
              >
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-base font-bold shadow-sm text-[#006b73]">
                  {index === 0 ? "+" : index + 1}
                </span>
                {item}
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          {vistaActual === "crear" ? (
            <CrearProyecto
              nombreUsuario={nombreUsuario}
              onCerrarSesion={onCerrarSesion}
              onBackHome={onBackHome}
              onProyectoCreado={agregarProyecto}
              onOpenMyProjects={() => {
                setVistaActual("mis-proyectos");
                if (onOpenMyProjects) onOpenMyProjects();
              }}
            />
          ) : (
            <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
              <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#006b73]">
                      Your projects
                    </p>
                    <h1 className="text-3xl font-black tracking-tight text-[#424a4c] sm:text-4xl">
                      My projects
                    </h1>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setVistaActual("crear");
                      if (onOpenCreateProject) onOpenCreateProject();
                    }}
                    className="rounded-xl bg-[#006b73] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#00545b]"
                  >
                    + Create
                  </button>
                </div>

                {cargando ? (
                  <div className="rounded-2xl border border-[#424a4c]/15 bg-white p-8 text-center text-slate-500">
                    Loading projects...
                  </div>
                ) : proyectos.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-[#006b73]/45 bg-[#006b73]/[0.03] p-12 text-center">
                    <p className="text-sm font-semibold text-[#424a4c]">No projects yet</p>
                    <p className="mt-1 text-xs text-[#424a4c]/60">
                      Create your first project to get started.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setVistaActual("crear");
                        if (onOpenCreateProject) onOpenCreateProject();
                      }}
                      className="mt-4 rounded-xl bg-[#006b73] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#00545b]"
                    >
                      Create project
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-5">
                    {proyectos.map((proyecto) => (
                      <div
                        key={proyecto.id}
                        className="rounded-2xl border border-[#424a4c]/15 bg-white p-6 shadow-[0_12px_35px_rgba(20,65,65,0.06)]"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="text-lg font-bold text-[#424a4c]">{proyecto.nombre}</h3>
                              <span
                                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                                  proyecto.estado === "publicado"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "border border-[#cce5e1] bg-white text-[#168b88]"
                                }`}
                              >
                                {proyecto.estado === "publicado" ? "Published" : "Draft"}
                              </span>
                            </div>

                            <p className="mt-2 text-sm text-[#424a4c]/75">{proyecto.descripcion}</p>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                              {proyecto.monto && (
                                <div>
                                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                                    Requested amount
                                  </p>
                                  <p className="mt-1 text-sm font-semibold text-[#006b73]">
                                    ${Number(proyecto.monto).toLocaleString()}
                                  </p>
                                </div>
                              )}
                              {proyecto.retorno && (
                                <div>
                                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                                    Return timeline
                                  </p>
                                  <p className="mt-1 text-sm font-semibold text-[#006b73]">
                                    {proyecto.retorno}
                                  </p>
                                </div>
                              )}
                            </div>

                            {proyecto.imagenes_count > 0 && (
                              <div className="mt-3">
                                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                                  Images
                                </p>
                                <p className="mt-1 text-sm text-[#424a4c]/75">
                                  {proyecto.imagenes_count} image{proyecto.imagenes_count === 1 ? "" : "s"}
                                </p>
                              </div>
                            )}

                            <div className="mt-3">
                              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                                Created
                              </p>
                              <p className="mt-1 text-sm text-[#424a4c]/75">
                                {new Date(proyecto.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2 sm:flex-col">
                            <button
                              type="button"
                              className="rounded-lg border border-[#424a4c]/30 px-3 py-2 text-xs font-semibold text-[#424a4c] transition hover:border-[#006b73] hover:text-[#006b73]"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => eliminarProyecto(proyecto.id)}
                              className="rounded-lg border border-red-300/50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:border-red-500 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default EmprendedorContenido;
