import { FolderKanban, Plus, Target, Users } from 'lucide-react';

function Inicio({ onOpenCreateProject }) {

    return (
                <div className="min-h-full bg-[#f3f8f6] text-[#173d43]">
                            <div className="mx-auto max-w-7xl px-1 py-1 sm:px-2 lg:px-4">
                                <section className="flex flex-col justify-between gap-5 rounded-2xl bg-[#0d7169] px-6 py-7 text-white shadow-[0_14px_30px_rgba(13,113,105,0.16)] sm:flex-row sm:items-center sm:px-8">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b9eee0]">Tu avance</p>
                                        <h2 className="mt-2 max-w-xl text-2xl font-bold tracking-tight sm:text-3xl">Sigue el camino de tu emprendimiento</h2>
                                        <p className="mt-3 max-w-lg text-sm leading-6 text-white/75">Cuando conectemos la información de tu proyecto podrás ver cuánto has avanzado hacia tu meta de inversión.</p>
                                    </div>
                                    <button type="button" onClick={onOpenCreateProject} className="flex w-fit shrink-0 items-center gap-2 rounded-lg bg-white px-4 py-3 text-xs font-bold text-[#0d7169] transition hover:bg-[#e7f7f1]"><Plus size={16} />Crear proyecto</button>
                                </section>

                                <section className="mt-7 grid gap-4 md:grid-cols-3" aria-label="Resumen de progreso">
                                    <article className="rounded-xl border border-[#d9e7e3] bg-white p-5">
                                        <div className="flex items-center justify-between"><p className="text-xs font-semibold text-[#688083]">Meta de inversión</p><Target size={18} className="text-[#0d7169]" /></div>
                                        <p className="mt-5 text-2xl font-bold text-[#a2b4b3]">Sin datos</p>
                                        <p className="mt-2 text-xs text-[#8a9b9c]">Se mostrará al conectar tu proyecto</p>
                                    </article>
                                    <article className="rounded-xl border border-[#d9e7e3] bg-white p-5">
                                        <div className="flex items-center justify-between"><p className="text-xs font-semibold text-[#688083]">Inversionistas confirmados</p><Users size={18} className="text-[#0d7169]" /></div>
                                        <p className="mt-5 text-2xl font-bold text-[#a2b4b3]">Sin datos</p>
                                        <p className="mt-2 text-xs text-[#8a9b9c]">Aún no hay registros disponibles</p>
                                    </article>
                                    <article className="rounded-xl border border-[#d9e7e3] bg-white p-5">
                                        <div className="flex items-center justify-between"><p className="text-xs font-semibold text-[#688083]">Falta para completar la meta</p><Target size={18} className="text-[#0d7169]" /></div>
                                        <p className="mt-5 text-2xl font-bold text-[#a2b4b3]">Sin datos</p>
                                        <p className="mt-2 text-xs text-[#8a9b9c]">Se calculará con tus inversiones</p>
                                    </article>
                                </section>

                                <section className="mt-7 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                                    <article className="rounded-xl border border-[#d9e7e3] bg-white p-6 sm:p-8">
                                        <div className="flex items-start justify-between gap-4">
                                            <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#15927f]">Progreso de la meta</p><h2 className="mt-2 text-xl font-bold">Todavía no hay progreso para mostrar</h2></div>
                                            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#e9f6f2] text-[#0d7169]"><Target size={19} /></span>
                                        </div>
                                        <div className="mt-8 h-3 overflow-hidden rounded-full bg-[#e6efed]"><div className="h-full w-0 rounded-full bg-[#0d7169]" /></div>
                                        <div className="mt-3 flex justify-between text-xs text-[#849798]"><span>0% completado</span><span>Meta pendiente</span></div>
                                        <p className="mt-8 border-t border-[#edf2f0] pt-5 text-sm leading-6 text-[#718588]">Crea tu proyecto y conecta la base de datos para comenzar a visualizar el avance real.</p>
                                    </article>

                                    <article className="rounded-xl border border-dashed border-[#9bc8bd] bg-[#f8fcfa] p-6 sm:p-8">
                                        <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#dff2eb] text-[#0d7169]"><FolderKanban size={20} /></div>
                                        <h2 className="mt-5 text-xl font-bold">Tu proyecto aparecerá aquí</h2>
                                        <p className="mt-2 text-sm leading-6 text-[#718588]">Aún no hay información conectada. Cuando registres tu emprendimiento podrás consultar su avance desde este panel.</p>
                                        <button type="button" onClick={onOpenCreateProject} className="mt-6 flex items-center gap-2 rounded-lg border border-[#0d7169] px-4 py-3 text-xs font-bold text-[#0d7169] hover:bg-[#e5f5ef]"><Plus size={16} />Registrar emprendimiento</button>
                                    </article>
                                </section>
                            </div>
                </div>
    );
}

export default Inicio;