const navigation = [
    { name: 'Function', href: '#function' },
    { name: 'About us', href: '#about' },
    { name: 'Details', href: '#details' },
];

const features = [
    {
        title: 'Descubre oportunidades',
        description: 'Encuentra proyectos y propuestas que conectan con tus objetivos.',
    },
    {
        title: 'Conecta con personas',
        description: 'Construye relaciones con emprendedores, aliados e inversionistas.',
    },
    {
        title: 'Haz crecer tus ideas',
        description: 'Lleva tus proyectos al siguiente nivel con las herramientas de Foundy.',
    },
];

const steps = [
    { number: '01', title: 'Crea tu perfil', description: 'Cuéntanos quién eres y qué quieres construir.' },
    { number: '02', title: 'Explora la comunidad', description: 'Conoce proyectos, ideas y oportunidades relevantes.' },
    { number: '03', title: 'Empieza a colaborar', description: 'Da el siguiente paso y convierte tus ideas en resultados.' },
];

const stats = [
    { value: '01', label: 'Plataforma para conectar' },
    { value: '03', label: 'Formas de participar' },
    { value: '100%', label: 'Enfocada en oportunidades' },
];

export default function Landing({ onLogin, onRegister }) {
    return (
        <div className="min-h-screen bg-white text-slate-800">
            <header className="bg-[#006b70] shadow-sm">
                <nav className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-12" aria-label="Navegación principal">
                    <a href="#top" className="flex shrink-0 items-center" aria-label="Foundy inicio">
                        <img src="/images/foundy-logo.png" alt="Foundy" className="h-10 w-auto object-contain brightness-0 invert" />
                    </a>
                    <div className="hidden items-center gap-7 text-sm font-medium lg:flex">
                        {navigation.map((item, index) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`border-b pb-1 text-white transition hover:text-teal-200 ${index === 0 ? 'border-white' : 'border-transparent'}`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <button type="button" onClick={onRegister} className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-[#006b70] shadow-sm transition hover:bg-teal-50 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500">
                            Sign up
                        </button>
                        <button type="button" onClick={onLogin} className="rounded-full border border-white/80 px-5 py-2 text-xs font-semibold text-white transition hover:bg-white/10 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500">
                            Login
                        </button>
                    </div>
                </nav>
            </header>

            <main id="top">
                <section id="function" className="relative mx-5 mt-7 h-[30rem] overflow-hidden rounded-[0.35rem] sm:mx-8 sm:h-[34rem] lg:mx-12 lg:h-[calc(100vh-9rem)] lg:min-h-[34rem]" aria-labelledby="landing-title">
                    <img src="/images/emprendedores-negocios.jpg" alt="Emprendedores y productos locales" className="absolute inset-0 h-full w-full object-cover blur-[2px]" />
                    <div aria-hidden="true" className="absolute inset-0 bg-[#005f68]/55" />
                    <div className="relative z-10 flex h-full items-center justify-center px-5">
                        <div className="max-w-[25rem] rounded-lg bg-white px-6 py-6 text-center shadow-xl sm:px-8 sm:py-7">
                            <h1 id="landing-title" className="text-[1.45rem] font-extrabold leading-[1.03] tracking-tight text-[#006b75] sm:text-[1.7rem]">
                                Investments that foster entrepreneurship in <span className="text-[#21a99b]">El Salvador</span>
                            </h1>
                            <p className="mt-4 text-sm leading-6 text-slate-600">
                                Una plataforma para convertir conexiones en oportunidades.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12" aria-labelledby="features-title">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#21a99b]">Qué puedes hacer</p>
                        <h2 id="features-title" className="mt-3 text-3xl font-bold tracking-tight text-[#006b70] sm:text-4xl">
                            Todo lo que necesitas para empezar
                        </h2>
                        <p className="mt-4 text-base leading-7 text-slate-600">
                            Reemplaza este texto por la propuesta de valor principal de tu proyecto.
                        </p>
                    </div>
                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {features.map((feature, index) => (
                            <article key={feature.title} className="rounded-2xl border border-teal-100 bg-teal-50/50 p-6 transition hover:-translate-y-1 hover:shadow-lg">
                                <span className="text-3xl font-bold text-[#21a99b]">0{index + 1}</span>
                                <h3 className="mt-8 text-lg font-bold text-[#006b70]">{feature.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="about" className="bg-slate-50" aria-labelledby="about-title">
                    <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:items-center lg:px-12">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#21a99b]">About us</p>
                            <h2 id="about-title" className="mt-3 text-3xl font-bold tracking-tight text-[#006b70] sm:text-4xl">
                                Una comunidad que impulsa nuevas posibilidades
                            </h2>
                            <p className="mt-5 leading-7 text-slate-600">
                                Este es un bloque de contenido para presentar la misión, historia o equipo de Foundy. Puedes reemplazarlo con la información definitiva de tu organización.
                            </p>
                            <button type="button" onClick={onRegister} className="mt-7 rounded-md bg-[#006b70] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00545a]">
                                Forma parte de Foundy
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {stats.map((stat) => (
                                <div key={stat.label} className="rounded-xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-200">
                                    <p className="text-2xl font-bold text-[#21a99b]">{stat.value}</p>
                                    <p className="mt-2 text-xs leading-5 text-slate-500">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="details" className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12" aria-labelledby="steps-title">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#21a99b]">Details</p>
                    <h2 id="steps-title" className="mt-3 text-3xl font-bold tracking-tight text-[#006b70] sm:text-4xl">
                        Empieza en tres pasos
                    </h2>
                    <div className="mt-10 grid gap-8 md:grid-cols-3">
                        {steps.map((step) => (
                            <div key={step.number} className="border-t-2 border-[#21a99b] pt-5">
                                <span className="text-sm font-bold text-[#21a99b]">{step.number}</span>
                                <h3 className="mt-4 text-lg font-bold text-slate-800">{step.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="bg-[#006b70] text-white">
                <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:px-12">
                    <div className="sm:col-span-2">
                        <img src="/images/foundy-logo.png" alt="Foundy" className="h-10 w-auto object-contain brightness-0 invert" />
                        <p className="mt-4 max-w-sm text-sm leading-6 text-teal-100">Conectamos ideas, emprendedores e inversionistas para construir nuevas oportunidades en El Salvador.</p>
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold">Explora</h2>
                        <div className="mt-4 space-y-3 text-sm text-teal-100">
                            {navigation.map((item) => <a key={item.name} className="block hover:text-white" href={item.href}>{item.name}</a>)}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold">Cuenta</h2>
                        <div className="mt-4 space-y-3 text-sm text-teal-100">
                            <button type="button" onClick={onLogin} className="block hover:text-white">Sign in</button>
                            <button type="button" onClick={onRegister} className="block hover:text-white">Sign up</button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/20 px-6 py-5 text-center text-xs text-teal-100 sm:px-10">© 2026 Foundy. Todos los derechos reservados.</div>
            </footer>
        </div>
    );
}
