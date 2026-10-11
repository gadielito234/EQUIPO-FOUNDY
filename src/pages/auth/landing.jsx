import {
    ArrowRight,
    BadgeCheck,
    ChartNoAxesCombined,
    MessageSquareText,
    ShieldCheck,
    Sparkles,
    Sprout,
    TrendingUp,
    Users,
} from 'lucide-react';

const navigation = [
    { name: 'How it works', href: '#function' },
    { name: 'Entrepreneurs', href: '#pathways-title' },
    { name: 'Investors', href: '#showcase-title' },
    { name: 'About us', href: '#about' },
];

const stats = [
    { value: '48+', label: 'active projects' },
    { value: '86%', label: 'annual growth' },
    { value: '24h', label: 'average response' },
];

const howItWorks = [
    {
        icon: Sparkles,
        title: 'Discover opportunities',
        description: 'Find promising projects with a clear story and room to grow.',
    },
    {
        icon: Users,
        title: 'Connect with confidence',
        description: 'Meet entrepreneurs, partners, and investors who share your goals.',
    },
    {
        icon: TrendingUp,
        title: 'Move into your next chapter',
        description: 'Make confident decisions with a community focused on results and lasting relationships.',
    },
];

const features = [
    {
        title: 'Professional profile',
        description: 'Present your project or investment interests with a clear, credible profile.',
    },
    {
        title: 'Smarter connections',
        description: 'Connect with people and projects that fit your growth goals.',
    },
    {
        title: 'Clear progress tracking',
        description: 'Keep moving forward with an experience built around progress and trust.',
    },
];

const showcase = [
    { image: '/images/Cafemonteverde.png', label: 'Local business', title: 'Ideas rooted in the community', description: 'Support purpose-driven businesses with a roadmap for meaningful growth.' },
    { image: '/images/Artesaníaselfaro.png', label: 'Creative economy', title: 'Talent ready for a boost', description: 'Connect local creators with people ready to open new opportunities.' },
    { image: '/images/tatipupuseria.png', label: 'Entrepreneurship', title: 'Small businesses, big possibilities', description: 'Turn a promising idea into a project with visibility and support.' },
];

const testimonials = [
    {
        quote: 'Foundy helped me find the right way to present my business and start conversations with real investors.',
        author: 'María López',
        role: 'Local entrepreneur',
    },
    {
        quote: 'The platform helps me discover projects with clarity and support them from a more strategic perspective.',
        author: 'Jorge Ramírez',
        role: 'Angel investor',
    },
];

export default function Landing({ onLogin, onRegister }) {
    return (
        <div className="min-h-screen bg-[#f5faf8] text-slate-800">
            <header className="landing-reveal sticky top-0 z-50 border-b border-[#dfece8] bg-white/80 backdrop-blur-xl">
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
                            Sign in
                        </button>
                    </div>
                </nav>
                <div className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-6 pb-3 text-xs font-semibold text-[#315d60] sm:px-10 lg:hidden" aria-label="Mobile navigation">
                    {navigation.map((item) => <a key={item.name} href={item.href} className="shrink-0 whitespace-nowrap py-1 hover:text-[#006b70]">{item.name}</a>)}
                </div>
            </header>

            <main id="top">
                <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(13,168,147,0.18),transparent_35%),linear-gradient(135deg,#ecf9f5_0%,#ffffff_45%,#edf7f5_100%)]">
                    <div className="hero-grid-pattern absolute inset-0 opacity-40" aria-hidden="true" />
                    <div className="relative mx-auto grid min-h-0 max-w-7xl grid-cols-1 items-center gap-10 px-4 py-10 sm:px-10 sm:py-12 lg:min-h-[42rem] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:px-12 lg:py-20">
                        <div className="landing-reveal max-w-2xl">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#a4dbd1] bg-[#ebfaf6] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#0b817d]">
                                <BadgeCheck className="h-3.5 w-3.5" />
                                A community for growth
                            </span>
                            <h1 id="landing-title" className="mt-6 text-4xl font-black leading-[0.95] tracking-[-0.06em] text-[#073f4a] sm:text-5xl lg:text-6xl">
                                Connect ideas with capital and the future they deserve.
                            </h1>
                            <p className="mt-6 max-w-xl text-base leading-7 text-[#4d666b] sm:text-lg">
                                Foundy brings entrepreneurs, investors, and partners together to turn promising projects into meaningful, sustainable opportunities.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <button type="button" onClick={onRegister} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#006b70] px-5 py-3.5 text-sm font-bold text-white shadow-[0_18px_30px_rgba(0,107,112,0.18)] transition hover:-translate-y-1 hover:bg-[#00545a]">
                                    Join Foundy
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                                <button type="button" onClick={onLogin} className="inline-flex items-center justify-center rounded-xl border border-[#8dbbb2] bg-white/80 px-5 py-3.5 text-sm font-bold text-[#006b70] transition hover:-translate-y-1 hover:bg-white">
                                    Explore opportunities
                                </button>
                            </div>

                            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-[#44666a]">
                                <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#0b817d]" /> Verified network</span>
                                <span className="inline-flex items-center gap-2"><MessageSquareText className="h-4 w-4 text-[#0b817d]" /> Real connections</span>
                            </div>

                            <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
                                {stats.map((item) => (
                                    <div key={item.label} className="rounded-2xl border border-[#d7ece5] bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                                        <p className="text-2xl font-black text-[#006b70]">{item.value}</p>
                                        <p className="mt-1 text-xs leading-4 text-[#5d7779]">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="landing-reveal landing-reveal-delay-2 relative">
                            <div className="glass-panel soft-glow relative overflow-hidden rounded-[2rem] border border-[#dbeee9] bg-white/60 p-4 shadow-[0_28px_60px_rgba(0,72,77,0.15)]">
                                <div className="overflow-hidden rounded-[1.5rem] bg-[#e6f5f1]">
                                    <img src="/images/emprendedores-negocios.jpg" alt="Entrepreneurs and businesses working together" className="landing-hero-image h-[20rem] w-full object-cover sm:h-[28rem] lg:h-[34rem]" />
                                </div>

                                <div className="absolute left-8 top-8 rounded-2xl border border-white/60 bg-white/80 p-3 shadow-lg backdrop-blur-sm">
                                    <div className="flex items-center gap-2 text-[#006b70]">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#dff4ee]">
                                            <TrendingUp className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#5f7a7d]">Pipeline</p>
                                            <p className="text-sm font-bold text-[#0f4a4c]">+38% visibility</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-8 right-8 max-w-[17rem] rounded-2xl border border-[#d6f6ee] bg-[#0a666a] p-4 text-white shadow-[0_20px_32px_rgba(3,72,75,0.25)]">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b3efe1]">Featured opportunity</p>
                                    <p className="mt-2 text-lg font-bold leading-snug">The right project to support your next steps.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="function" className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12" aria-labelledby="function-title">
                    <div className="landing-reveal max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#21a99b]">How it works</p>
                        <h2 id="function-title" className="mt-3 text-3xl font-bold tracking-tight text-[#006b70] sm:text-4xl">A simple path to grow with confidence.</h2>
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {howItWorks.map(({ icon: Icon, title, description }, index) => (
                            <article key={title} className={`landing-card landing-reveal landing-reveal-delay-${index + 1} rounded-3xl border border-[#dfece8] bg-white p-6 shadow-sm`}>
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ebfaf6] text-[#006b70]">
                                    <Icon className="h-7 w-7" />
                                </div>
                                <p className="mt-6 text-3xl font-black text-[#21a99b]">0{index + 1}</p>
                                <h3 className="mt-4 text-xl font-bold text-[#006b70]">{title}</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-12" aria-labelledby="pathways-title">
                    <div className="landing-reveal max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#21a99b]">One platform</p>
                        <h2 id="pathways-title" className="mt-3 text-3xl font-bold tracking-tight text-[#006b70] sm:text-4xl">Find your path and make your next move.</h2>
                    </div>

                    <div className="mt-8 grid gap-5 lg:grid-cols-2">
                        <article className="landing-card landing-reveal landing-reveal-delay-1 grid overflow-hidden rounded-[2rem] border border-[#dfece8] bg-white sm:grid-cols-[0.78fr_1.22fr]">
                            <div className="relative grid min-h-56 place-items-center overflow-hidden bg-[#eafaf5] text-[#0b817d] sm:min-h-full">
                                <div className="absolute right-5 top-5 h-16 w-3 rotate-45 bg-[#bfead7]" aria-hidden="true" />
                                <div className="absolute bottom-8 left-6 h-3 w-20 -rotate-12 bg-[#d6f3e7]" aria-hidden="true" />
                                <div className="relative grid h-20 w-20 place-items-center rounded-2xl border border-[#7ccdb7] bg-white shadow-[0_14px_30px_rgba(8,127,120,0.12)]">
                                    <Sprout className="h-9 w-9" />
                                </div>
                            </div>
                            <div className="p-6 sm:p-7">
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#21a99b]">For entrepreneurs</p>
                                <h3 className="mt-3 text-2xl font-bold text-[#006b70]">Showcase your project and open the right doors.</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600">Build a clear presence, share your vision, and connect with people who understand your stage of growth.</p>
                                <button type="button" onClick={onRegister} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#006b70] transition hover:translate-x-1">
                                    Create my profile <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </article>

                        <article className="landing-card landing-reveal landing-reveal-delay-2 grid overflow-hidden rounded-[2rem] border border-[#015d60] bg-[#006b70] text-white sm:grid-cols-[0.78fr_1.22fr]">
                            <div className="relative grid min-h-56 place-items-center overflow-hidden bg-[#0b817d] text-[#dffaf2] sm:min-h-full">
                                <div className="absolute right-5 top-5 h-16 w-3 rotate-45 bg-white/15" aria-hidden="true" />
                                <div className="absolute bottom-8 left-6 h-3 w-20 -rotate-12 bg-white/10" aria-hidden="true" />
                                <div className="relative grid h-20 w-20 place-items-center rounded-2xl border border-white/30 bg-white/10 shadow-[0_14px_30px_rgba(0,59,64,0.18)]">
                                    <ChartNoAxesCombined className="h-9 w-9" />
                                </div>
                            </div>
                            <div className="p-6 sm:p-7">
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a8e7d6]">For investors</p>
                                <h3 className="mt-3 text-2xl font-bold">Discover opportunities with context and potential.</h3>
                                <p className="mt-3 text-sm leading-6 text-teal-50/80">Explore compelling projects, understand their direction, and choose investments that align with your goals.</p>
                                <button type="button" onClick={onRegister} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:translate-x-1">
                                    View opportunities <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </article>
                    </div>
                </section>

                <section className="bg-[#edf7f5]" aria-labelledby="features-title">
                    <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
                        <div className="landing-reveal max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#21a99b]">What Foundy offers</p>
                            <h2 id="features-title" className="mt-3 text-3xl font-bold tracking-tight text-[#006b70] sm:text-4xl">Everything you need to move forward.</h2>
                        </div>

                        <div className="mt-10 grid gap-5 md:grid-cols-3">
                            {features.map((feature, index) => (
                                <article key={feature.title} className={`landing-card landing-reveal landing-reveal-delay-${index + 1} rounded-[2rem] border border-[#d6eee8] bg-white p-6 shadow-sm`}>
                                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dff4ee] text-lg font-black text-[#006b70]">0{index + 1}</span>
                                    <h3 className="mt-6 text-xl font-bold text-[#006b70]">{feature.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="about" className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12" aria-labelledby="about-title">
                    <div className="grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
                        <div className="landing-reveal">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#21a99b]">About us</p>
                            <h2 id="about-title" className="mt-3 text-3xl font-bold tracking-tight text-[#006b70] sm:text-4xl">A community built to move meaningful ideas forward.</h2>
                            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
                                At Foundy, we believe every promising project deserves to be seen, connected, and supported by the right community. We bring people with vision together to create meaningful opportunities and lasting growth.
                            </p>
                            <button type="button" onClick={onRegister} className="mt-7 rounded-xl bg-[#006b70] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00545a]">
                                Join the community
                            </button>
                        </div>

                        <div className="landing-card landing-reveal landing-reveal-delay-2 rounded-[2rem] border border-[#dfece8] bg-white p-6 shadow-sm">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 rounded-2xl bg-[#ecfaf7] p-4">
                                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#006b70]">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#006b70]">Trust in every connection</h3>
                                        <p className="mt-1 text-sm leading-6 text-slate-600">An experience designed to encourage genuine relationships and cut through the noise.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 rounded-2xl bg-[#f6fbfb] p-4">
                                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#006b70]">
                                        <Users className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#006b70]">People with vision</h3>
                                        <p className="mt-1 text-sm leading-6 text-slate-600">We bring entrepreneurship, investment, and collaboration together to build momentum.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-12" aria-labelledby="showcase-title">
                    <div className="landing-reveal flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#21a99b]">Featured stories</p>
                            <h2 id="showcase-title" className="mt-3 text-3xl font-bold tracking-tight text-[#006b70] sm:text-4xl">Local ideas with real reach.</h2>
                        </div>
                        <button type="button" onClick={onRegister} className="w-fit rounded-xl border border-[#006b70] px-5 py-3 text-sm font-semibold text-[#006b70] transition hover:bg-[#006b70] hover:text-white">
                            Join the community
                        </button>
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {showcase.map((item, index) => (
                            <article key={item.title} className={`landing-card landing-reveal landing-reveal-delay-${index + 1} overflow-hidden rounded-[2rem] border border-[#dfece8] bg-white`}>
                                <img src={item.image} alt={item.title} className="h-56 w-full object-cover transition duration-500 hover:scale-105" />
                                <div className="p-5">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#21a99b]">{item.label}</p>
                                    <h3 className="mt-2 text-xl font-bold text-[#006b70]">{item.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="bg-[#006b70] text-white" aria-labelledby="testimonials-title">
                    <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
                        <div className="landing-reveal max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9be4d0]">Testimonials</p>
                            <h2 id="testimonials-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A community that gets people moving.</h2>
                        </div>

                        <div className="mt-10 grid gap-5 lg:grid-cols-2">
                            {testimonials.map((testimonial, index) => (
                                <article key={testimonial.author} className={`landing-card landing-reveal landing-reveal-delay-${index + 1} rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-sm`}>
                                    <p className="text-base leading-7 text-teal-50">“{testimonial.quote}”</p>
                                    <div className="mt-6 border-t border-white/15 pt-4">
                                        <p className="font-bold">{testimonial.author}</p>
                                        <p className="text-sm text-teal-100">{testimonial.role}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12" aria-labelledby="roles-title">
                    <div className="landing-reveal rounded-[2rem] bg-[linear-gradient(135deg,#0a5d5d_0%,#006b70_35%,#0d7c78_100%)] px-6 py-10 text-white shadow-[0_24px_45px_rgba(0,88,92,0.26)] sm:px-8 lg:px-10">
                        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9be4d0]">Your next step</p>
                                <h2 id="roles-title" className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Build, invest, and grow with a community that understands you.</h2>
                                <p className="mt-4 max-w-md text-sm leading-7 text-teal-50/80">Foundy helps you find meaningful connections to take your project or support to the next level.</p>
                                <button type="button" onClick={onRegister} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#006b70] transition hover:-translate-y-1 hover:bg-[#e5f8f3]">
                                    Get started <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <article className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                                    <span className="text-3xl" aria-hidden="true">↗</span>
                                    <h3 className="mt-5 text-xl font-bold">For entrepreneurs</h3>
                                    <p className="mt-2 text-sm leading-6 text-teal-50/80">Showcase your project, build support, and raise its visibility with the right community.</p>
                                </article>
                                <article className="rounded-2xl border border-white/15 bg-[#21a99b] p-5">
                                    <span className="text-3xl" aria-hidden="true">✦</span>
                                    <h3 className="mt-5 text-xl font-bold">For investors</h3>
                                    <p className="mt-2 text-sm leading-6 text-white/85">Discover opportunities with context, traction, and real potential for impact.</p>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-[#006b70] text-white">
                <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:px-12">
                    <div className="sm:col-span-2">
                        <img src="/images/foundy-logo.png" alt="Foundy" className="h-10 w-auto object-contain brightness-0 invert" />
                        <p className="mt-4 max-w-sm text-sm leading-6 text-teal-100">We connect ideas, entrepreneurs, and investors to create new opportunities in El Salvador.</p>
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold">Explore</h2>
                        <div className="mt-4 space-y-3 text-sm text-teal-100">
                            {navigation.map((item) => (
                                <a key={item.name} className="block hover:text-white" href={item.href}>{item.name}</a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold">Account</h2>
                        <div className="mt-4 space-y-3 text-sm text-teal-100">
                            <button type="button" onClick={onLogin} className="block text-left hover:text-white">Sign in</button>
                            <button type="button" onClick={onRegister} className="block text-left hover:text-white">Sign up</button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/20 px-6 py-5 text-center text-xs text-teal-100 sm:px-10">© 2026 Foundy. All rights reserved.</div>
            </footer>
        </div>
    );
}
