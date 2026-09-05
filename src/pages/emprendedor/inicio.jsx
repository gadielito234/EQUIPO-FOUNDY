import {
    Bell,
    CreditCard,
    FolderKanban,
    HelpCircle,
    Home,
    LogOut,
    Mail,
    Plus,
    Settings,
    Target,
    Users,
} from 'lucide-react';

const navigationItems = [
    { label: 'Inicio', icon: Home },
    { label: 'Mis proyectos', icon: FolderKanban },
    { label: 'Foundy Card', icon: CreditCard },
    { label: 'Mensajes', icon: Mail },
    { label: 'Configuración', icon: Settings },
    { label: 'Notificaciones', icon: Bell },
];

function Inicio({ usuarioData, onCerrarSesion, onOpenSettings, onOpenCreateProject, onOpenChat, onOpenFoundyCard, showSidebar = true }) {
    const nombreUsuario = usuarioData?.usuario || 'Emprendedor';
    const inicial = nombreUsuario.charAt(0).toUpperCase();

    const handleNavigation = (label) => {
        if (label === 'Mis proyectos') onOpenCreateProject?.();
        if (label === 'Foundy Card') onOpenFoundyCard?.();
        if (label === 'Mensajes') onOpenChat?.();
        if (label === 'Configuración') onOpenSettings?.();
    };

    return (
                <div className="min-h-screen bg-[#f3f8f6] text-[#173d43]">
                    <div className="flex min-h-screen">
                        {showSidebar && <aside className="hidden w-64 shrink-0 flex-col border-r border-[#d9e7e3] bg-white px-4 py-6 lg:flex">
                            <div className="flex items-center gap-3 px-3">
                                <img src="/images/foundy-logo.png" alt="Foundy" className="h-8 w-auto object-contain" />
                                <span className="text-xl font-bold text-[#0d5c5d]">Foundy</span>
                            </div>

                            <div className="mt-9 flex items-center gap-3 border-b border-[#e4eeeb] px-3 pb-6">
                                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#d8eee8] text-sm font-bold text-[#0d7169]">{inicial}</span>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold">{usuarioData?.usuario || 'Emprendedor'}</p>
                                    <p className="mt-0.5 text-xs text-[#789094]">Emprendedor</p>
                                </div>
                            </div>

                            <nav className="mt-6 space-y-1.5" aria-label="Navegación principal">
                                {navigationItems.map(({ label, icon: Icon }) => (
                                    <button
                                        key={label}
                                        type="button"
                                        onClick={() => handleNavigation(label)}
                                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${label === 'Inicio' ? 'bg-[#0d7169] font-semibold text-white shadow-sm' : 'text-[#5d7376] hover:bg-[#edf6f3] hover:text-[#0d5c5d]'}`}
                                    >
                                        <Icon size={17} />
                                        {label}
                                    </button>
                                ))}
                            </nav>

                            <div className="mt-auto space-y-1.5 border-t border-[#e4eeeb] pt-5">
                                <button type="button" className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-[#5d7376] hover:bg-[#edf6f3] hover:text-[#0d5c5d]"><HelpCircle size={17} />Ayuda</button>
                                <button type="button" onClick={onCerrarSesion} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-[#5d7376] hover:bg-red-50 hover:text-red-700"><LogOut size={17} />Cerrar sesión</button>
                            </div>
                        </aside>}

                        <main className="min-w-0 flex-1">
                            <header className="flex h-18 items-center justify-between border-b border-[#d9e7e3] bg-white px-5 sm:px-8">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#15927f]">Panel del emprendedor</p>
                                    <h1 className="mt-1 text-lg font-bold text-[#173d43]">Resumen de tu emprendimiento</h1>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button type="button" className="grid h-9 w-9 place-items-center rounded-full text-[#5d7376] hover:bg-[#edf6f3] hover:text-[#0d5c5d]" aria-label="Notificaciones"><Bell size={18} /></button>
                                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#d8eee8] text-xs font-bold text-[#0d7169]" aria-label={nombreUsuario}>{inicial}</span>
                                </div>
                            </header>

                            <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10">
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
                        </main>
                    </div>
                </div>
    );
}

export default Inicio;