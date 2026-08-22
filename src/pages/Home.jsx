import '../styles/home.css';

const sidebarItems = [
  { name: 'Home', icon: '⌂', active: true },
  { name: 'My projects', icon: '▣' },
  { name: 'Messages', icon: '✉' },
  { name: 'Settings', icon: '⚙' },
  { name: 'Notifications', icon: '◔' },
];

const growthData = [
  { month: 'Jan', value: 28 },
  { month: 'Feb', value: 36 },
  { month: 'Mar', value: 42 },
  { month: 'Apr', value: 58 },
  { month: 'May', value: 71 },
  { month: 'Jun', value: 86 },
];

const recentActivity = [
  { title: 'New Investment Received', detail: '$100 from Alpha Ventures', time: '13 min ago', tone: 'positive' },
  { title: 'Document Verified', detail: 'Project "VencerTech"', time: '1h ago', tone: 'neutral' },
  { title: 'New Investor Follow', detail: 'Sarah Chen followed your profile', time: '2h ago', tone: 'positive' },
];

function Sidebar({ nombreUsuario, tipoUsuario, onCerrarSesion, onOpenSettings }) {
  return (
    <aside className="foundy-sidebar">
      <div className="foundy-sidebar__top">
        <div className="foundy-brand">
          <div className="foundy-brand__mark">F</div>
          <span className="foundy-brand__text">Foundy</span>
        </div>

        <div className="foundy-profile">
          <div className="foundy-profile__avatar">{nombreUsuario.charAt(0).toUpperCase()}</div>
          <div>
            <p className="foundy-profile__name">{nombreUsuario}</p>
            <p className="foundy-profile__role">TIPO: {tipoUsuario}</p>
          </div>
        </div>
      </div>

      <nav className="foundy-nav" aria-label="Sidebar navigation">
        {sidebarItems.map((item) => (
          <button
            key={item.name}
            type="button"
            className={`foundy-nav__item ${item.active ? 'foundy-nav__item--active' : ''}`}
            onClick={item.name === 'Settings' ? onOpenSettings : undefined}
          >
            <span className="foundy-nav__icon">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="foundy-sidebar__footer">
        <button type="button" className="foundy-sidebar__support">Support</button>
        <button type="button" className="foundy-sidebar__logout" onClick={onCerrarSesion}>
          Logout
        </button>
      </div>
    </aside>
  );
}

function DashboardHeader() {
  return (
    <header className="foundy-header">
      <div>
        <p className="foundy-header__eyebrow">Dashboard</p>
        <h1 className="foundy-header__title">Statistics</h1>
      </div>

      <div className="foundy-header__card">
        <span className="foundy-header__card-label">Foundy</span>
        <strong>+12.4%</strong>
      </div>
    </header>
  );
}

function WelcomeSection({ nombreUsuario }) {
  return (
    <section className="foundy-welcome">
      <div className="foundy-welcome__content">
        <p className="foundy-welcome__kicker">Overview</p>
        <h2 className="foundy-welcome__title">Welcome back, {nombreUsuario}.</h2>
        <p className="foundy-welcome__subtitle">Your investments are growing strong this quarter.</p>

        <div className="foundy-welcome__stats">
          <span>3 new investors</span>
          <span>Portfolio growth 12% above market</span>
        </div>

        <div className="foundy-welcome__actions">
          <button type="button" className="foundy-btn foundy-btn--primary">Create Project</button>
          <button type="button" className="foundy-btn foundy-btn--secondary">View Reports</button>
        </div>
      </div>

      <div className="foundy-spotlight">
        <div className="foundy-spotlight__badge">Live</div>
        <div className="foundy-spotlight__value">$184.2K</div>
        <p className="foundy-spotlight__label">Portfolio value</p>
      </div>
    </section>
  );
}

function SummaryCard({ title, value, status, description, progress, badge, cta }) {
  return (
    <article className="foundy-summary-card">
      <div className="foundy-summary-card__top">
        <div>
          <p className="foundy-summary-card__title">{title}</p>
          <h3 className="foundy-summary-card__value">{value}</h3>
        </div>
        {status && <span className="foundy-summary-card__status">{status}</span>}
      </div>

      {description && <p className="foundy-summary-card__description">{description}</p>}

      {progress !== undefined && (
        <div className="foundy-summary-card__progress">
          <div className="foundy-summary-card__progress-bar">
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="foundy-summary-card__progress-meta">
            <span>{badge}</span>
            <span>{progress}%</span>
          </div>
        </div>
      )}

      {cta && <button type="button" className="foundy-summary-card__button">{cta}</button>}
    </article>
  );
}

function GrowthStatistics() {
  return (
    <section className="foundy-growth-card">
      <div className="foundy-growth-card__header">
        <div>
          <p className="foundy-growth-card__label">Growth Statistics</p>
          <h3 className="foundy-growth-card__title">Net value</h3>
        </div>
        <span className="foundy-growth-card__range">Last 6 Months</span>
      </div>

      <div className="foundy-chart" aria-label="Monthly growth chart">
        {growthData.map((item) => (
          <div key={item.month} className="foundy-chart__column">
            <div className="foundy-chart__bar-wrap">
              <div className="foundy-chart__bar" style={{ height: `${item.value}%` }} />
            </div>
            <span className="foundy-chart__month">{item.month}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function RecentActivity() {
  return (
    <aside className="foundy-activity-card">
      <div className="foundy-activity-card__header">
        <h3>Recent Activity</h3>
      </div>

      <div className="foundy-activity-list">
        {recentActivity.map((item) => (
          <div key={item.title} className="foundy-activity-item">
            <div className={`foundy-activity-item__dot foundy-activity-item__dot--${item.tone}`} />
            <div className="foundy-activity-item__content">
              <p className="foundy-activity-item__title">{item.title}</p>
              <p className="foundy-activity-item__detail">{item.detail}</p>
              <span className="foundy-activity-item__time">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}


function Home({ usuarioData, onCerrarSesion, onOpenSettings, onBackHome }) {
  const nombreUsuario = usuarioData?.usuario || 'Usuario';
  const tipoUsuario = usuarioData?.tipo_usuario || 'Usuario';

  return (
    <div className="foundy-dashboard">
      <Sidebar
        nombreUsuario={nombreUsuario}
        tipoUsuario={tipoUsuario}
        onCerrarSesion={onCerrarSesion}
        onOpenSettings={onOpenSettings || onBackHome}
      />

      <div className="foundy-main-panel">
        <DashboardHeader />

        <main className="foundy-content">
          <WelcomeSection nombreUsuario={nombreUsuario} />

          <section className="foundy-summary-grid">
            <SummaryCard
              title="Active Investments"
              value="2 Ventures"
              status="Pending"
              description="Updated 2h ago"
            />

            <SummaryCard
              title="Profile Strength"
              value="92%"
              progress={92}
              badge="Excellent"
              cta="Finish now"
            />
          </section>

          <section className="foundy-lower-grid">
            <GrowthStatistics />
            <RecentActivity />
          </section>
        </main>
      </div>
    </div>
  );
}

export default Home;