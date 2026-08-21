export default function Landing({ onLogin, onRegister }) {
    return (
        <div className="relative isolate min-h-screen overflow-hidden bg-gray-900">
            <div
                aria-hidden="true"
                className="absolute inset-0 scale-100 bg-[url('/images/emprendedores-negocios.jpg')] bg-cover bg-center blur-sm opacity-400"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gray-950/65" />
            <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                <div className="relative isolate overflow-hidden rounded-3xl bg-gray-900/60 px-6 pt-16 ring-1 ring-white/10 backdrop-blur-sm sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                    <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                            Impulsa tus ideas con Foundy
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Conecta con oportunidades, emprendedores e inversionistas para convertir tus proyectos en realidad.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-6 lg:justify-start">
                            <button type="button" onClick={onLogin} className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-200">
                                Iniciar sesión
                            </button>
                            <button type="button" onClick={onRegister} className="text-sm font-semibold text-white hover:text-gray-100">
                                Crear cuenta <span aria-hidden="true">→</span>
                            </button>
                        </div>
                    </div>
                    <div className="relative mt-16 h-80 lg:mt-8">
                        <img width="1824" height="1080" src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png" alt="Vista previa de la aplicación Foundy" className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10" />
                    </div>
                </div>
            </div>
        </div>
    );
}
