<<<<<<< HEAD
export default function HomeInversionista() {
=======
const featuredOpportunity = {
  title: 'Jorge Aparicio | Traditional Coffee',
  location: 'Santa Ana, El Salvador',
  category: 'Agriculture',
  image: '/images/jorgeaparicio.jpeg',
  goal: '$20,000',
  spots: '12 spots avail.',
  term: '24 to 36 months',
  starts: '12/08/24',
  objective:
    'Producer of Salvadoran artisanal coffee. Looking for an investment of $20,000 to expand production, improve equipment and export their sales. Project an annual return of 8% with an estimated recovery of the investment in 24 to 36 months.',
};

const opportunities = [
  {
    title: 'Café Monte Verde',
    location: 'Santa Ana, El Salvador',
    category: 'Agriculture',
    image: '/images/Cafemonteverde.png',
    goal: '$500',
    spots: '1 spot avail.',
    term: '1 month',
    starts: '12/08/24',
    objective: 'Investment objective: Advertising and local distribution network…',
  },
  {
    title: 'Tati Pupuseria',
    location: 'Santa Tecla, El Salvador',
    category: 'Gastronomy',
    image: '/images/tatipupuseria.png',
    goal: '$300',
    spots: '2 spots avail.',
    term: '1 month',
    starts: '12/31/23',
    objective: 'Investment objective: New industrial stovetop and kitchen renovation.',
  },
  {
    title: 'Artesanías El Faro',
    location: 'La Libertad, El Salvador',
    category: 'Textiles',
    image: '/images/Artesaníaselfaro.png',
    goal: '$120',
    spots: '2 spots avail.',
    term: '2 months',
    starts: '01/15/24',
    objective: 'Investment objective: Bulk raw material purchase and online store…',
  },
  {
    title: 'Artesanías Sunshine sv',
    location: 'La Libertad, El Salvador',
    category: 'Textiles',
    image: '/images/sunshine.png',
    goal: '$200',
    spots: '1 spot avail.',
    term: '2 months',
    starts: '01/15/24',
    objective: 'Investment objective: Bulk raw material purchase and online store…',
  },
];

const investmentGrowth = [
  { month: 'Jan', value: 24 },
  { month: 'Feb', value: 34 },
  { month: 'Mar', value: 28 },
  { month: 'Apr', value: 42 },
  { month: 'May', value: 38 },
  { month: 'Jun', value: 58 },
  { month: 'Jul', value: 90 },
];

function HomeInversionista({ usuarioData }) {
  const nombreUsuario = usuarioData?.usuario || 'David Diaz';
  const searchTerm = '';

  const filteredOpportunities = opportunities.filter((item) => {
    if (!searchTerm.trim()) return true;
    const haystack = `${item.title} ${item.location} ${item.category} ${item.objective} ${nombreUsuario}`.toLowerCase();
    return haystack.includes(searchTerm.trim().toLowerCase());
  });

>>>>>>> d784d26ed20b685861482f6d6795287299b200c4
  return (
    <div className="rounded-lg border border-dashed border-[#cbd4d3] p-8 text-center text-sm text-[#446062]">
      No hay oportunidades disponibles.
    </div>
  );
}
