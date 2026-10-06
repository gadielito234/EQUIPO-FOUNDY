import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const translations = {
  es: {
    Home: 'Inicio',
    'My projects': 'Mis proyectos',
    'My investments': 'Mis inversiones',
    Messages: 'Mensajes',
    Settings: 'Configuración',
    Notifications: 'Notificaciones',
    Dashboard: 'Panel',
    Statistics: 'Estadísticas',
    'Foundy card': 'Tarjeta Foundy',
    Support: 'Soporte',
    Logout: 'Cerrar sesión',
    Search: 'Buscar',
    'No sections found.': 'No se encontraron secciones.',
    'Explore': 'Explorar',
    Account: 'Cuenta',
    'All rights reserved.': 'Todos los derechos reservados.',
    'Log out of Foundy?': '¿Cerrar sesión en Foundy?',
    'You will need to sign in again to access your account.': 'Deberás iniciar sesión nuevamente para acceder a tu cuenta.',
    Cancel: 'Cancelar',
    'Log out': 'Cerrar sesión',
    'Preferred language': 'Idioma preferido',
    Theme: 'Tema',
    Light: 'Claro',
    Dark: 'Oscuro',
    'Platform settings': 'Configuración de la plataforma',
    'Manage All': 'Administrar todo',
    'Transaction Alerts': 'Alertas de transacciones',
    'Get notified when payments or transfers are made.': 'Recibe avisos cuando se realicen pagos o transferencias.',
    'Marketing Insights': 'Sugerencias de marketing',
    'Receive helpful campaign and growth suggestions.': 'Recibe sugerencias útiles para tus campañas y crecimiento.',
    'Choose which alerts you want to receive.': 'Elige qué alertas quieres recibir.',
    Policies: 'Políticas',
    'Review our privacy, terms, and platform guidelines.': 'Consulta nuestra privacidad, términos y pautas de la plataforma.',
    'View Policies': 'Ver políticas',
    'Danger Zone': 'Zona de peligro',
    'Deactivate Account': 'Desactivar cuenta',
    'Are you sure you want to deactivate your account?': '¿Seguro que quieres desactivar tu cuenta?',
    'Deactivate account': 'Desactivar cuenta',
    'Deactivating your account will disable your access and hide your profile from other users.': 'Al desactivar tu cuenta perderás el acceso y tu perfil dejará de ser visible para otros usuarios.',
    'Confirm deactivation': 'Confirmar desactivación',
    'Are you sure you want to deactivate your account? This action will disable your access and hide your profile from other users.': '¿Seguro que quieres desactivar tu cuenta? Perderás el acceso y tu perfil dejará de ser visible para otros usuarios.',
    Deactivate: 'Desactivar',
    'Back to Settings': 'Volver a Configuración',
    'Please review the policies below to understand how Foundy protects your data, supports respectful use, and defines the responsibilities of all users.': 'Revisa las políticas para conocer cómo Foundy protege tus datos, fomenta el uso respetuoso y define las responsabilidades de los usuarios.',
    'Personal data': 'Datos personales',
    'Public profile': 'Perfil público',
    'Your profile information': 'Información de tu perfil',
    'Profile updated successfully.': 'Perfil actualizado correctamente.',
    'Your profile could not be saved:': 'No se pudo guardar tu perfil:',
    'No account was found with that email address.': 'No se encontró una cuenta con ese correo electrónico.',
    Entrepreneur: 'Emprendedor',
    'Project summary': 'Resumen del proyecto',
    raised: 'recaudado',
    goal: 'meta',
    'Entrepreneur dashboard': 'Panel del emprendedor',
    'Hello,': 'Hola,',
    'Manage your projects, track your progress, and find the next step to grow your idea.': 'Administra tus proyectos, sigue tu progreso y encuentra el siguiente paso para hacer crecer tu idea.',
    Projects: 'Proyectos',
    'Total goal': 'Meta total',
    Raised: 'Recaudado',
    Remaining: 'Restante',
    'Your registered initiatives': 'Tus iniciativas registradas',
    'Requested capital': 'Capital solicitado',
    'Confirmed funds': 'Fondos confirmados',
    'To complete your goals': 'Para alcanzar tus metas',
    'Overall progress': 'Progreso general',
    'Funding progress': 'Progreso de financiación',
    'Create your first project to start tracking your funding progress.': 'Crea tu primer proyecto para comenzar a seguir tu progreso de financiación.',
    'Your next step': 'Tu siguiente paso',
    'Keep your project information updated to attract the right investors.': 'Mantén la información de tu proyecto actualizada para atraer a los inversionistas adecuados.',
    'Register your idea and start connecting with investors.': 'Registra tu idea y comienza a conectar con inversionistas.',
    'Add project': 'Agregar proyecto',
    'Register project': 'Registrar proyecto',
    'Your projects': 'Tus proyectos',
    Overview: 'Resumen',
    project: 'proyecto',
    projects: 'proyectos',
    'Loading your projects...': 'Cargando tus proyectos...',
    'You have no registered projects yet.': 'Aún no tienes proyectos registrados.',
    'No description available.': 'Descripción no disponible.',
    'No pudimos cargar tus proyectos. Intenta nuevamente.': 'We could not load your projects. Please try again.',
    'Conectamos ideas, emprendedores e inversionistas para construir nuevas oportunidades en El Salvador.': 'We connect ideas, entrepreneurs, and investors to build new opportunities in El Salvador.',
    'Conecta. Crece. Hazlo posible.': 'Connect. Grow. Make it happen.',
    'Explora': 'Explore',
    'Cuenta': 'Account',
    'Todos los derechos reservados.': 'All rights reserved.',
    'La foto se guardará con el perfil cuando pulses Guardar cambios.': 'The photo will be saved with your profile when you click Save changes.',
    'Investor activity center': 'Centro de actividad del inversionista',
    'User activity center': 'Centro de actividad del usuario',
    'Stay up to date with your investment activity.': 'Mantente al día con tu actividad de inversión.',
    'Browse opportunities': 'Explorar oportunidades',
    'Search opportunities': 'Buscar oportunidades',
    'Featured opportunity': 'Oportunidad destacada',
    'View details and invest': 'Ver detalles e invertir',
    Discover: 'Descubrir',
    'View all': 'Ver todo',
    Invest: 'Invertir',
    'No opportunities found.': 'No se encontraron oportunidades.',
    'Your investment data will appear here': 'Tus datos de inversión aparecerán aquí',
    'Once you record investments and payments, you can view your portfolio metrics.': 'Cuando registres inversiones y pagos, podrás ver las métricas de tu portafolio.',
    'Project details': 'Detalles del proyecto',
    Category: 'Categoría',
    Term: 'Plazo',
    Available: 'Disponible',
    'Decide your investment': 'Define tu inversión',
    'The investment will be recorded as pending payment.': 'La inversión se registrará como pago pendiente.',
    'Amount to invest': 'Monto a invertir',
    'This represents ': 'Esto representa ',
    'Confirm investment': 'Confirmar inversión',
    'No image': 'Sin imagen',
    'No project image': 'Sin imagen del proyecto',
    'Investment could not be recorded:': 'No se pudo registrar la inversión:',
    'Investment recorded, but the payment could not be saved:': 'La inversión se registró, pero no se pudo guardar el pago:',
    'Investment recorded and pending payment created.': 'Inversión registrada y pago pendiente creado.',
    'Enter a valid amount to invest.': 'Ingresa un monto válido para invertir.',
    'Saving...': 'Guardando...',
    'Investment agreements': 'Acuerdos de inversión',
    'Agreements are created after payment confirmation and can be downloaded for review.': 'Los acuerdos se generan cuando se confirma el pago y se pueden descargar para revisión.',
    'Contracts could not be loaded:': 'No se pudieron cargar los acuerdos:',
    'Loading agreements...': 'Cargando acuerdos...',
    'No confirmed investment agreements yet.': 'Aún no hay acuerdos de inversión con pagos confirmados.',
    'Return deadline': 'Fecha límite de retorno',
    'Download agreement': 'Descargar acuerdo',
    'Generated documents are informational records and should be reviewed and signed by both parties.': 'Los documentos generados son constancias informativas y ambas partes deben revisarlos y firmarlos.',
    Investor: 'Inversionista',
    Investment: 'Inversión',
    'Estimated investor profit': 'Ganancia estimada para el inversionista',
    'Expected project profit': 'Ganancia total estimada del proyecto',
    'Estimated return period': 'Plazo estimado de retorno',
    'Term not defined': 'Plazo no definido',
    months: 'meses',
    'All': 'Todas',
    Unread: 'No leídas',
    Read: 'Leídas',
    Total: 'Total',
    'Loading notifications...': 'Cargando notificaciones...',
    'Everything is in order': 'Todo está en orden',
    'You do not have any notifications yet.': 'Aún no tienes notificaciones.',
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const savedLanguage = window.localStorage.getItem('foundy-language');
    return savedLanguage === 'Spanish' ? 'Spanish' : 'English';
  });

  const setLanguage = (nextLanguage) => {
    const normalizedLanguage = nextLanguage === 'Spanish' ? 'Spanish' : 'English';
    window.localStorage.setItem('foundy-language', normalizedLanguage);
    setLanguageState(normalizedLanguage);
  };

  useEffect(() => {
    document.documentElement.lang = language === 'Spanish' ? 'es' : 'en';
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: (text) => (language === 'Spanish' ? translations.es[text] || text : text),
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider.');
  return context;
}