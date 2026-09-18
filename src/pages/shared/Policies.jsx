import { useI18n } from '../../services/i18n.js';

const policySections = {
  en: [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    summary: 'How we collect, use, and protect personal information.',
    paragraphs: [
      'Foundy collects the information necessary to provide a safe and useful platform for entrepreneurs and investors. This includes account details, profile information, communication data, and transaction-related information.',
      'We use this information to operate the platform, personalize the experience, support users, prevent misuse, and comply with legal obligations.',
      'We do not sell personal data to third parties. Information may be shared only with trusted service providers that help us operate the app under confidentiality obligations.',
    ],
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    summary: 'The rules and responsibilities for using Foundy.',
    paragraphs: [
      'Users must provide accurate information, use the platform responsibly, and respect the rights of other participants. Any misuse, fraud, abusive behavior, or unauthorized access may result in account restrictions.',
      'Foundy provides a marketplace and communication channel between parties, but it does not guarantee outcomes, investment returns, or business success.',
      'By using the platform, you agree to comply with our policies, applicable laws, and the expectations set forth in this agreement.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies & Data Use',
    summary: 'How we use cookies, analytics, and stored information.',
    paragraphs: [
      'We use cookies and similar technologies to understand how the platform is used, improve performance, remember preferences, and provide a smoother experience.',
      'Analytics tools help us measure engagement, troubleshoot issues, and identify opportunities to improve services.',
      'Users can manage cookie preferences in their device settings or through the platform settings, where applicable.',
    ],
  },
  {
    id: 'guidelines',
    title: 'Community Guidelines',
    summary: 'Expected behavior inside the Foundy community.',
    paragraphs: [
      'We encourage respectful communication, professional conduct, and transparency. Members should avoid spam, abusive language, misleading claims, or any activity intended to harm others.',
      'If you believe a profile, message, or project violates our standards, you can report it through the support channels available in the app.',
      'Foundy may review reports, apply corrective measures, and remove content that violates these guidelines.',
    ],
  },
  ],
  es: [
    {
      id: 'privacy',
      title: 'Política de privacidad',
      summary: 'Cómo recopilamos, usamos y protegemos la información personal.',
      paragraphs: [
        'Foundy recopila la información necesaria para ofrecer una plataforma segura y útil para emprendedores e inversionistas. Esto incluye datos de cuenta, información de perfil, comunicaciones e información relacionada con transacciones.',
        'Usamos esta información para operar la plataforma, personalizar la experiencia, ayudar a los usuarios, prevenir usos indebidos y cumplir obligaciones legales.',
        'No vendemos datos personales a terceros. La información solo puede compartirse con proveedores de confianza que nos ayudan a operar la aplicación bajo obligaciones de confidencialidad.',
      ],
    },
    {
      id: 'terms',
      title: 'Términos de servicio',
      summary: 'Las reglas y responsabilidades para usar Foundy.',
      paragraphs: [
        'Los usuarios deben proporcionar información precisa, usar la plataforma responsablemente y respetar los derechos de los demás participantes. El uso indebido, fraude, comportamiento abusivo o acceso no autorizado puede causar restricciones de cuenta.',
        'Foundy ofrece un mercado y un canal de comunicación entre las partes, pero no garantiza resultados, rendimientos de inversión ni éxito empresarial.',
        'Al usar la plataforma, aceptas cumplir nuestras políticas, las leyes aplicables y las expectativas establecidas en este acuerdo.',
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies y uso de datos',
      summary: 'Cómo usamos cookies, analítica e información almacenada.',
      paragraphs: [
        'Usamos cookies y tecnologías similares para entender cómo se utiliza la plataforma, mejorar el rendimiento, recordar preferencias y ofrecer una experiencia más fluida.',
        'Las herramientas de analítica nos ayudan a medir la participación, resolver problemas e identificar oportunidades para mejorar los servicios.',
        'Los usuarios pueden administrar las preferencias de cookies desde la configuración de su dispositivo o desde la configuración de la plataforma, cuando corresponda.',
      ],
    },
    {
      id: 'guidelines',
      title: 'Normas de la comunidad',
      summary: 'Comportamiento esperado dentro de la comunidad Foundy.',
      paragraphs: [
        'Fomentamos la comunicación respetuosa, la conducta profesional y la transparencia. Los miembros deben evitar el spam, el lenguaje abusivo, las afirmaciones engañosas o cualquier actividad destinada a perjudicar a otros.',
        'Si crees que un perfil, mensaje o proyecto infringe nuestras normas, puedes denunciarlo mediante los canales de soporte disponibles en la aplicación.',
        'Foundy puede revisar los reportes, aplicar medidas correctivas y eliminar contenido que infrinja estas normas.',
      ],
    },
  ],
};

export default function Policies({ onBack }) {
  const { t, language } = useI18n();
  const sections = policySections[language];
  return (
    <div className="min-h-screen bg-[#f5f2eb] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[28px] border border-[#dfe7e5] bg-white p-5 shadow-sm sm:p-6 lg:p-8">
          <div className="mb-6 flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#6fa795] bg-[#dff4ee] text-[32px] font-black leading-none text-[#1a3a3e] shadow-sm transition hover:bg-[#cfeae3]"
              aria-label={`${t('back')} ${t('settings')}`}
              title={`${t('back')} ${t('settings')}`}
            >
              <span aria-hidden="true" className="relative -top-[1px]">←</span>
            </button>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1ca38b]">{t('legal')}</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-[#193b40] sm:text-4xl">{t('policies')}</h1>
            </div>
          </div>

          <p className="mb-8 text-sm leading-6 text-[#5d7277] sm:text-base">
            {t('policiesIntro')}
          </p>

          <main className="space-y-8 rounded-[24px] border border-[#dfe7e5] bg-[#f8fbfa] p-5 shadow-sm sm:p-6 lg:p-8">
            {sections.map((section) => (
              <section key={section.id} className="scroll-mt-6">
                <div className="mb-3">
                  <h2 className="text-2xl font-black tracking-tight text-[#1a3a3e] sm:text-3xl">
                    {section.title}
                  </h2>
                  <p className="mt-2 text-sm text-[#5d7277]">{section.summary}</p>
                </div>

                <div className="space-y-4 text-sm leading-7 text-[#374f52] sm:text-base">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
