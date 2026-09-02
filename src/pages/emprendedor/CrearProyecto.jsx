import { useRef, useState } from "react";
import { supabase } from "../../services/supabase.js";
import AIConsultingPanel from "../../components/ai/AIConsultingPanel.jsx";

const menu = ["Create project", "My projects", "Opportunities", "Messages"];

const initialProject = {
  nombre: "",
  descripcion: "",
  monto: "",  
  retorno: "",
};

function CrearProyecto({ nombreUsuario = "Entrepreneur", onCerrarSesion, onBackHome }) {
  const [proyecto, setProyecto] = useState(initialProject);
  const [imagenes, setImagenes] = useState([]);
  const [alerta, setAlerta] = useState(null);
  const inputImagenes = useRef(null);

  const actualizarCampo = (event) => {
    setProyecto({ ...proyecto, [event.target.name]: event.target.value });
    setAlerta(null);
  };

  const seleccionarImagenes = (event) => {
    const archivos = Array.from(event.target.files || []);
    setImagenes(archivos);
    if (archivos.length > 0) {
      setAlerta({
        tipo: "success",
        texto: `${archivos.length} image${archivos.length === 1 ? "" : "s"} added.`,
      });
    }
  };

  const limpiarFormulario = () => {
    setProyecto(initialProject);
    setImagenes([]);
    setAlerta(null);
  };

  const guardarProyecto = async (event, publicar = false) => {
    event.preventDefault();
    if (!proyecto.nombre.trim() || !proyecto.descripcion.trim()) {
      setAlerta({
        tipo: "warning",
        texto: "Complete the project name and description.",
      });
      return;
    }
    if (publicar) {
      const fechaInicio = new Date();
      const meses = Number.parseInt(proyecto.retorno, 10) || 1;
      const fechaFin = new Date(fechaInicio);
      fechaFin.setMonth(fechaFin.getMonth() + meses);
      const { error } = await supabase.from("proyecto").insert([{
        nombre: proyecto.nombre.trim(),
        descripcion: proyecto.descripcion.trim(),
        monto_objetivo: proyecto.monto ? Number(proyecto.monto) : 0,
        inversion: 0,
        estado: "publicado",
        fecha_inicio: fechaInicio.toISOString().slice(0, 10),
        fecha_fin: fechaFin.toISOString().slice(0, 10),
      }]);
      if (error) {
        setAlerta({ tipo: "warning", texto: `Could not publish project: ${error.message}` });
        return;
      }
      window.dispatchEvent(new Event("foundy-project-published"));
    }
    setAlerta({
      tipo: "success",
      texto: publicar
        ? "Project published successfully."
        : "Project saved as a draft.",
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f7f6] text-slate-800">
      <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackHome}
            className="flex h-10 items-center gap-2 rounded-lg px-2 text-sm font-bold text-[#006b73] transition hover:bg-[#006b73]/9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006b73]/30"
            aria-label="Volver al panel"
            title="Volver al panel"
          >
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.w171eC9ZBI8OTweGWM7G0gHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt=""
              className="h-7 w-7 object-contain"
            />
            <span>Volver</span>
          </button>
          <div className="hidden items-center gap-8 text-sm font-medium text-slate-500 md:flex">
            <a href="#crear-proyecto" className="text-[#006b73]">
              Espacio de trabajo
            </a>
            <a href="#ayuda" className="text-[#424a4c] hover:text-[#006b73]">
              Centro de ayuda
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 sm:block">
              Hello, {nombreUsuario}
            </span>
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

      <div className="mx-auto flex max-w-375">
        <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white px-4 py-7 lg:block">
          <div className="mb-8 px-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Entrepreneur dashboard
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-700">
              Build your next opportunity
            </p>
          </div>
          <nav className="space-y-1" aria-label="Entrepreneur menu">
            {menu.map((item, index) => (
              <a
                key={item}
                href={index === 0 ? "#crear-proyecto" : "#"}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${index === 0 ? "bg-[#006b73] text-white" : "text-[#424a4c] hover:bg-[#00634b]/10 hover:text-[#00634b]"}`}
              >
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-base font-bold shadow-sm">
                  {index === 0 ? "+" : index + 1}
                </span>
                {item}
              </a>
            ))}
          </nav>
          <div id="ayuda" className="mt-10 rounded-2xl bg-[#f8f1e7] p-4">
            <p className="text-xs font-bold text-[#8a5a24]">Need guidance?</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              AI can help you shape your idea.
            </p>
            <button
              type="button"
              onClick={() => document.getElementById("ai-consulting")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-3 text-xs font-bold text-[#00634b] hover:underline"
            >
              Get help
            </button>
          </div>
        </aside>

        <main
          id="crear-proyecto"
          className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-12"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#006b73]">
                  New project
                </p>
                <h1 className="text-3xl font-black tracking-tight text-[#424a4c] sm:text-4xl">
                  Create something that matters.
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#424a4c]/75">
                  Share your idea with the community and find the connections
                  you need to make it grow.
                </p>
              </div>
              <span className="w-fit rounded-full border border-[#cce5e1] bg-white px-3 py-1.5 text-xs font-semibold text-[#168b88]">
                Unsaved draft
              </span>
            </div>

            {alerta && (
              <div
                className={`mb-5 flex items-center justify-between rounded-xl border px-4 py-3 text-sm ${alerta.tipo === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : alerta.tipo === "warning" ? "border-amber-200 bg-amber-50 text-amber-800" : "border-sky-200 bg-sky-50 text-sky-800"}`}
                role="alert"
              >
                <span>{alerta.texto}</span>
                <button
                  type="button"
                  onClick={() => setAlerta(null)}
                  className="ml-4 font-bold opacity-60 hover:opacity-100"
                  aria-label="Cerrar alerta"
                >
                  ×
                </button>
              </div>
            )}

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
              <form
                onSubmit={guardarProyecto}
                className="rounded-2xl border border-[#424a4c]/15 bg-white p-5 shadow-[0_12px_35px_rgba(20,65,65,0.06)] sm:p-8"
              >
                <div className="mb-7 flex items-center gap-3 border-b border-slate-100 pb-5">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#006b73] text-sm font-black text-white">
                    01
                  </span>
                  <div>
                    <h2 className="font-bold text-[#424a4c]">
                      Project information
                    </h2>
                    <p className="text-xs text-[#424a4c]/60">
                      Tell us about what you are building.
                    </p>
                  </div>
                </div>
                <label
                  htmlFor="nombre"
                  className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-600"
                >
                  Project name
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  value={proyecto.nombre}
                  onChange={actualizarCampo}
                  placeholder="E.g. Highland coffee"
                  className="mb-6 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#168b88] focus:bg-white focus:ring-4 focus:ring-[#168b88]/10"
                  required
                />
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="descripcion"
                    className="block text-xs font-bold uppercase tracking-wide text-slate-600"
                  >
                    Description
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {proyecto.descripcion.length}/500
                  </span>
                </div>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={proyecto.descripcion}
                  onChange={actualizarCampo}
                  maxLength="500"
                  rows="6"
                  placeholder="Describe your idea, the problem it solves, and who it benefits..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-[#168b88] focus:bg-white focus:ring-4 focus:ring-[#168b88]/10"
                  required
                />
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-600">
                    Requested amount
                    <input
                      name="monto"
                      type="number"
                      min="0"
                      value={proyecto.monto}
                      onChange={actualizarCampo}
                      placeholder="$ 0.00"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-normal normal-case outline-none focus:border-[#168b88] focus:bg-white focus:ring-4 focus:ring-[#168b88]/10"
                    />
                  </label>
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-600">
                    Return timeline
                    <input
                      name="retorno"
                      value={proyecto.retorno}
                      onChange={actualizarCampo}
                      placeholder="E.g. 12 months"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-normal normal-case outline-none focus:border-[#168b88] focus:bg-white focus:ring-4 focus:ring-[#168b88]/10"
                    />
                  </label>
                </div>
                <div className="mt-7">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#424a4c]">
                    Project images
                  </p>
                  <button
                    type="button"
                    onClick={() => inputImagenes.current?.click()}
                    className="flex min-h-32 w-full flex-col items-center justify-center rounded-xl border border-dashed border-[#006b73]/45 bg-[#006b73]/3 px-4 py-6 text-center transition hover:border-[#00634b] hover:bg-[#00634b]/4"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-[#006b73] text-xl text-[#006b73]">
                      +
                    </span>
                    <span className="mt-2 text-xs font-semibold text-[#00634b]">
                      {imagenes.length
                        ? `${imagenes.length} file${imagenes.length === 1 ? "" : "s"} selected`
                        : "Add images"}
                    </span>
                    <span className="mt-1 text-[11px] text-[#424a4c]/60">
                      PNG, JPG up to 10 MB
                    </span>
                  </button>
                  <input
                    ref={inputImagenes}
                    onChange={seleccionarImagenes}
                    type="file"
                    accept="image/png,image/jpeg"
                    multiple
                    className="hidden"
                  />
                </div>
                <div className="mt-8 flex flex-col-reverse justify-between gap-3 border-t border-slate-100 pt-6 sm:flex-row">
                  <button
                    type="button"
                    onClick={limpiarFormulario}
                    className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#424a4c]/70 transition hover:bg-slate-50 hover:text-[#424a4c]"
                  >
                    Cancel
                  </button>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="rounded-xl bg-[#006b73] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#00545b]"
                    >
                      Save draft
                    </button>
                    <button
                      type="button"
                      onClick={(event) => guardarProyecto(event, true)}
                      className="rounded-xl bg-[#00634b] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#004c3a]"
                    >
                      Publish project
                    </button>
                  </div>
                </div>
              </form>

              <div id="ai-consulting">
                <AIConsultingPanel project={proyecto} onMessage={setAlerta} />
              </div>
            </div>
          </div>
        </main>
      </div>
      <footer className="border-t border-slate-200 bg-white px-6 py-5 text-center text-xs text-slate-400">
        <span className="font-bold text-[#006b73]">foundy.</span> Your idea
        deserves to grow. <span className="mx-2 hidden sm:inline">·</span>
        <span className="block sm:inline">© 2026</span>
      </footer>
    </div>
  );
}

export default CrearProyecto;
