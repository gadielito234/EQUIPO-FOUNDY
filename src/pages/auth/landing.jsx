import { ChartNoAxesCombined, Sprout } from 'lucide-react';

const navigation = [
    { name: 'How it works', href: '#function' },
    { name: 'Entrepreneurs', href: '#pathways-title' },
    { name: 'Investors', href: '#showcase-title' },
    { name: 'About Foundy', href: '#about' },
];

const features = [
    {
        title: 'Discover opportunities',
        description: 'Find projects and proposals that match your goals.',
    },
    {
        title: 'Connect with people',
        description: 'Build relationships with entrepreneurs, partners, and investors.',
    },
    {
        title: 'Grow your ideas',
        description: 'Take your projects to the next level with Foundy tools.',
    },
];

const showcase = [
    { image: '/images/Cafemonteverde.png', label: 'Local commerce', title: 'Ideas rooted in community', description: 'Support businesses with a clear purpose and a path to grow.' },
    { image: '/images/Artesaníaselfaro.png', label: 'Creative economy', title: 'Talent that deserves momentum', description: 'Connect local makers with people ready to open new doors.' },
    { image: '/images/tatipupuseria.png', label: 'Entrepreneurship', title: 'Small businesses, bigger possibilities', description: 'Turn a promising idea into a project people can believe in.' },
];

export default function Landing({ onLogin, onRegister }) {
    return (
        <div className="min-h-screen bg-white text-slate-800">
            <header className="landing-reveal border-b border-[#dcebe6] bg-white shadow-sm">
                <nav className="mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-12" aria-label="Main navigation">
                    <a href="#top" className="flex shrink-0 items-center" aria-label="Foundy home">
                        <img src="/images/foundy-negro.png" alt="Foundy" className="foundy-logo-glow h-9 w-auto object-contain" />
                    </a>
                    <div className="hidden items-center gap-6 text-sm font-semibold text-[#315d60] lg:flex">
                        {navigation.map((item, index) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`border-b-2 pb-1 transition hover:border-[#21a99b] hover:text-[#006b70] ${index === 0 ? 'border-[#21a99b] text-[#006b70]' : 'border-transparent'}`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <button type="button" onClick={onRegister} className="rounded-md bg-[#006b70] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-1 hover:bg-[#00545a]">
                            Sign up
                        </button>
                        <button type="button" onClick={onLogin} className="hidden rounded-md border border-[#9bc7bd] px-5 py-2.5 text-xs font-semibold text-[#006b70] transition hover:-translate-y-1 hover:bg-[#eff9f5] sm:block">
                            Login
                        </button>
                    </div>
                </nav>
            </header>

            <main id="top">
                <section id="function" className="mx-5 mt-7 overflow-hidden rounded-[1.5rem] bg-[#e8f4f0] sm:mx-8 lg:mx-12" aria-labelledby="landing-title">
                    <div className="mx-auto grid min-h-[36rem] max-w-7xl items-center gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[0.85fr_1.15fr] lg:px-14 lg:py-16">
                        <div className="landing-reveal max-w-xl">
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0b817d]">Invest. Build. Grow.</p>
                            <h1 id="landing-title" className="mt-5 text-4xl font-black leading-[0.98] tracking-tight text-[#073f4a] sm:text-6xl">Connecting capital with the future of El Salvador.</h1>
                            <p className="mt-6 max-w-lg text-base leading-7 text-[#4b686c] sm:text-lg">Foundy brings promising projects, ambitious entrepreneurs, and thoughtful investors into one trusted network.</p>
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <button type="button" onClick={onRegister} className="rounded-md bg-[#006b70] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_20px_rgba(0,107,112,0.18)] transition hover:-translate-y-1 hover:bg-[#00545a]">Join Foundy</button>
                                <button type="button" onClick={onLogin} className="rounded-md border border-[#8dbbb2] bg-white/60 px-5 py-3 text-sm font-bold text-[#006b70] transition hover:-translate-y-1 hover:bg-white">Explore opportunities</button>
                            </div>
                            <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-[#b9d9d1] pt-5">
                                <div><p className="text-2xl font-black text-[#006b70]">01</p><p className="mt-1 text-xs leading-4 text-[#5d7779]">One place to connect</p></div>
                                <div><p className="text-2xl font-black text-[#006b70]">02</p><p className="mt-1 text-xs leading-4 text-[#5d7779]">Clearer opportunities</p></div>
                                <div><p className="text-2xl font-black text-[#006b70]">03</p><p className="mt-1 text-xs leading-4 text-[#5d7779]">Momentum that lasts</p></div>
                            </div>
                        </div>
                        <div className="landing-reveal landing-reveal-delay-2 relative min-h-[23rem] overflow-hidden rounded-[1.25rem] bg-[#0b5d61] shadow-[0_24px_45px_rgba(6,75,78,0.18)] sm:min-h-[30rem]">
                            <img src="/images/emprendedores-negocios.jpg" alt="Entrepreneurs and local businesses collaborating" className="landing-hero-image absolute inset-0 h-full w-full object-cover opacity-90" />
                            <div className="absolute inset-0 bg-[#073f4a]/45" />
                            <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/25 bg-[#073f4a]/75 p-4 text-white backdrop-blur-sm sm:bottom-7 sm:left-7 sm:right-7 sm:p-5">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a8e7d6]">Built around possibility</p>
                                <p className="mt-2 text-lg font-bold leading-tight sm:text-xl">The right connection can change the scale of an idea.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12" aria-labelledby="pathways-title">
                    <div className="landing-reveal max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#21a99b]">Choose your next move</p>
                        <h2 id="pathways-title" className="mt-3 text-3xl font-bold tracking-tight text-[#006b70] sm:text-4xl">A platform with room for both sides of the table.</h2>
                    </div>
                    <div className="mt-8 grid gap-5 lg:grid-cols-2">
                        <article className="landing-card landing-reveal landing-reveal-delay-1 grid overflow-hidden rounded-2xl border border-[#d5e9e3] bg-white sm:grid-cols-[0.8fr_1.2fr]">
                            <div className="relative grid min-h-52 place-items-center overflow-hidden bg-[#dff3eb] text-[#087f78] sm:min-h-full">
                                <div className="absolute right-6 top-7 h-16 w-3 rotate-45 bg-[#a9ddca]" aria-hidden="true" />
                                <div className="absolute bottom-8 left-7 h-3 w-20 -rotate-12 bg-[#bce7d8]" aria-hidden="true" />
                                <div className="relative grid h-20 w-20 place-items-center rounded-2xl border border-[#70c4a9] bg-white shadow-[0_12px_25px_rgba(8,127,120,0.14)]"><Sprout size={38} strokeWidth={1.6} /></div>
                            </div>
                            <div className="p-6 sm:p-7"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#21a99b]">For entrepreneurs</p><h3 className="mt-3 text-2xl font-bold text-[#006b70]">Make your project easier to believe in.</h3><p className="mt-3 text-sm leading-6 text-slate-600">Build a profile, present your project, and find people who can help your next stage become real.</p><button type="button" onClick={onRegister} className="mt-6 text-sm font-bold text-[#006b70] transition hover:translate-x-1">Build your profile →</button></div>
                        </article>
                        <article className="landing-card landing-reveal landing-reveal-delay-2 grid overflow-hidden rounded-2xl border border-[#d5e9e3] bg-[#006b70] text-white sm:grid-cols-[0.8fr_1.2fr]">
                            <div className="relative grid min-h-52 place-items-center overflow-hidden bg-[#0b817d] text-[#d9f8eb] sm:min-h-full">
                                <div className="absolute right-6 top-7 h-16 w-3 rotate-45 bg-white/15" aria-hidden="true" />
                                <div className="absolute bottom-8 left-7 h-3 w-20 -rotate-12 bg-white/10" aria-hidden="true" />
                                <div className="relative grid h-20 w-20 place-items-center rounded-2xl border border-white/40 bg-white/10 shadow-[0_12px_25px_rgba(0,55,60,0.2)]"><ChartNoAxesCombined size={38} strokeWidth={1.6} /></div>
                            </div>
                            <div className="p-6 sm:p-7"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a8e7d6]">For investors</p><h3 className="mt-3 text-2xl font-bold">Find the story behind the opportunity.</h3><p className="mt-3 text-sm leading-6 text-teal-50/80">Discover published projects, understand their potential, and choose where your support can make a difference.</p><button type="button" onClick={onRegister} className="mt-6 text-sm font-bold text-white transition hover:translate-x-1">Explore opportunities →</button></div>
                        </article>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12" aria-labelledby="features-title">
                    <div className="landing-reveal max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#21a99b]">What can you do?</p>
                        <h2 id="features-title" className="mt-3 text-3xl font-bold tracking-tight text-[#006b70] sm:text-4xl">
                            Everything you need to get started
                        </h2>
                        <p className="mt-4 text-base leading-7 text-slate-600">
                            Find the people, projects, and tools you need to turn ideas into momentum.
                        </p>
                    </div>
                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {features.map((feature, index) => (
                            <article key={feature.title} className="landing-card landing-reveal landing-reveal-delay-1 rounded-2xl border border-teal-100 bg-teal-50/50 p-6">
                                <span className="text-3xl font-bold text-[#21a99b]">0{index + 1}</span>
                                <h3 className="mt-8 text-lg font-bold text-[#006b70]">{feature.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="about" className="bg-slate-50" aria-labelledby="about-title">
                    <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:items-center lg:px-12">
                        <div className="landing-reveal">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#21a99b]">About us</p>
                            <h2 id="about-title" className="mt-3 text-3xl font-bold tracking-tight text-[#006b70] sm:text-4xl">
                                A community that drives new possibilities
                            </h2>
                            <p className="mt-5 leading-7 text-slate-600">
                                Foundy brings entrepreneurs, investors, and partners together to build meaningful opportunities and a stronger future.
                            </p>
                            <button type="button" onClick={onRegister} className="mt-7 rounded-md bg-[#006b70] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00545a]">
                                Join Foundy
                            </button>
                        </div>
                        <div className="landing-card landing-reveal landing-reveal-delay-2 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                            <p className="text-sm leading-6 text-slate-500">Discover opportunities and meaningful connections in one growing community.</p>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12" aria-labelledby="showcase-title">
                    <div className="landing-reveal flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#21a99b]">Made possible together</p>
                            <h2 id="showcase-title" className="mt-3 text-3xl font-bold tracking-tight text-[#006b70] sm:text-4xl">Real ideas. Real people. Real progress.</h2>
                            <p className="mt-4 text-base leading-7 text-slate-600">Explore the kind of local businesses and ambitious projects that Foundy helps move forward.</p>
                        </div>
                        <button type="button" onClick={onRegister} className="w-fit rounded-md border border-[#006b70] px-5 py-3 text-sm font-semibold text-[#006b70] transition hover:bg-[#006b70] hover:text-white">Join the community</button>
                    </div>
                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {showcase.map((item, index) => (
                            <article key={item.title} className={`landing-card landing-reveal landing-reveal-delay-${index + 1} overflow-hidden rounded-2xl border border-slate-200 bg-white`}>
                                <img src={item.image} alt={item.title} className="h-52 w-full object-cover transition duration-500 hover:scale-105" />
                                <div className="p-5">
                                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#21a99b]">{item.label}</p>
                                    <h3 className="mt-2 text-lg font-bold text-[#006b70]">{item.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="overflow-hidden bg-[#006b70] text-white" aria-labelledby="roles-title">
                    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-12">
                        <div className="landing-reveal">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9be4d0]">Your role in the story</p>
                            <h2 id="roles-title" className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Build, back, and belong.</h2>
                            <p className="mt-5 max-w-md text-sm leading-7 text-teal-50/80">Foundy makes the next move easier to see, whether you are shaping an idea or looking for the right one to support.</p>
                            <button type="button" onClick={onRegister} className="mt-7 rounded-md bg-white px-5 py-3 text-sm font-bold text-[#006b70] transition hover:-translate-y-1 hover:bg-[#e2f8f0]">Start with Foundy</button>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <article className="landing-card landing-reveal landing-reveal-delay-1 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                                <span className="text-3xl" aria-hidden="true">↗</span>
                                <h3 className="mt-6 text-xl font-bold">For entrepreneurs</h3>
                                <p className="mt-3 text-sm leading-6 text-teal-50/75">Present your project, find meaningful connections, and create momentum around your vision.</p>
                            </article>
                            <article className="landing-card landing-reveal landing-reveal-delay-2 rounded-2xl border border-white/20 bg-[#21a99b] p-6">
                                <span className="text-3xl" aria-hidden="true">✦</span>
                                <h3 className="mt-6 text-xl font-bold">For investors</h3>
                                <p className="mt-3 text-sm leading-6 text-white/80">Explore published opportunities, understand the story behind them, and choose where to invest.</p>
                            </article>
                        </div>
                    </div>
                </section>

            </main>

            <footer className="bg-[#006b70] text-white">
                <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:px-12">
                    <div className="sm:col-span-2">
                        <img src="/images/foundy-logo.png" alt="Foundy" className="h-10 w-auto object-contain brightness-0 invert" />
                        <p className="mt-4 max-w-sm text-sm leading-6 text-teal-100">We connect ideas, entrepreneurs, and investors to build new opportunities in El Salvador.</p>
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold">Explora</h2>
                        <div className="mt-4 space-y-3 text-sm text-teal-100">
                            {navigation.map((item) => <a key={item.name} className="block hover:text-white" href={item.href}>{item.name}</a>)}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold">Account</h2>
                        <div className="mt-4 space-y-3 text-sm text-teal-100">
                            <button type="button" onClick={onLogin} className="block hover:text-white">Sign in</button>
                            <button type="button" onClick={onRegister} className="block hover:text-white">Sign up</button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/20 px-6 py-5 text-center text-xs text-teal-100 sm:px-10">© 2026 Foundy. All rights reserved.</div>
            </footer>
        </div>
    );
}
