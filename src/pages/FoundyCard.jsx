import { useState } from 'react';
import { Home, FolderKanban, Mail, Settings, Bell, HelpCircle, LogOut } from 'lucide-react';
import '../styles/foundyCard.css';

const defaultUser = {
  name: 'Sara Hernández',
  avatar:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
};

const getStoredUser = () => {
  if (typeof window === 'undefined') {
    return defaultUser;
  }

  try {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser?.name) {
      return {
        ...defaultUser,
        ...savedUser,
      };
    }
  } catch (error) {
    console.warn('Unable to parse user from localStorage:', error);
  }

  return defaultUser;
};

const sidebarMenu = [
  { label: 'Home', icon: Home },
  { label: 'My projects', icon: FolderKanban },
  { label: 'Messages', icon: Mail },
  { label: 'Settings', icon: Settings },
  { label: 'Notifications', icon: Bell },
];

const chartBars = [
  { label: 'Jan', value: 28 },
  { label: 'Feb', value: 38 },
  { label: 'Mar', value: 42 },
  { label: 'Apr', value: 58 },
  { label: 'May', value: 74 },
  { label: 'Jun', value: 64 },
];

const updates = [
  {
    name: 'EcoStream Solutions',
    badge: 'Seed Stage',
    value: '$48k',
    meta: 'Q3 revenue goals exceeded by 15% following our…',
    tone: 'green',
    investors: 42,
  },
  {
    name: 'Quantum Ledger',
    badge: 'Series A',
    value: '$27k',
    meta: 'Beta testing for our cross-border payment protocol is…',
    tone: 'purple',
    investors: 128,
  },
];

function FoundyCardPage() {
  const [user] = useState(getStoredUser);
  const userName = user?.name || defaultUser.name;
  const initials = userName
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <div className="foundy-page">
      <aside className="foundy-sidebar">
        <div className="foundy-sidebar__profile">
          <div className="foundy-avatar-frame">
            <img src={user.avatar || defaultUser.avatar} alt={userName} className="foundy-avatar" />
          </div>
          <button type="button" className="foundy-profile-badge">
            {userName}
          </button>
        </div>

        <nav className="foundy-sidebar__menu" aria-label="Sidebar navigation">
          {sidebarMenu.map((item, index) => {
            const IconComponent = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                className={`foundy-menu-item ${index === 0 ? 'active' : ''}`}
              >
                <span className="foundy-menu-icon"><IconComponent size={20} /></span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="foundy-sidebar__footer">
          <button type="button" className="foundy-menu-item foundy-footer-item">
            <span className="foundy-menu-icon"><HelpCircle size={20} /></span>
            <span>Support</span>
          </button>
          <button type="button" className="foundy-menu-item foundy-footer-item foundy-logout-item">
            <span className="foundy-menu-icon"><LogOut size={20} /></span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="foundy-main">
        <header className="foundy-topbar">
          <div className="foundy-brand-wrap" aria-label="Foundy brand logo">
            <img src="/images/foundy-logo.png" alt="Foundy logo" className="foundy-logo" />
          </div>

          <nav className="foundy-topnav" aria-label="Main navigation">
            <button type="button" className="foundy-topnav-link">
              Dashboard
            </button>
            <button type="button" className="foundy-topnav-link">
              Statistics
            </button>
            <button type="button" className="foundy-topnav-link foundy-topnav-link--active">
              Foundy card
            </button>
          </nav>

          <label className="foundy-search" aria-label="Search">
            <span className="foundy-search-icon">⌕</span>
            <input type="text" placeholder="Search" />
          </label>
        </header>

        <section className="foundy-banner">
          <div className="foundy-banner__inner">
            <span className="foundy-banner__tag">MEMBER DASHBOARD</span>
            <h1>Manage your Foundy Card and exclusive investment portfolio.</h1>
          </div>
          <button type="button" className="foundy-invest-btn">
            + Invest Now
          </button>
        </section>

        <div className="foundy-content-grid">
          <section className="foundy-left-column">
            <article className="foundy-card-box">
              <div className="foundy-card-header">
                <span className="foundy-card-brand">FOUNDY</span>
                <span className="foundy-card-chip" aria-label="Card type">
                  ●●●
                </span>
              </div>

              <div className="foundy-card-number">Investor ID</div>
              <div className="foundy-card-mask"># # # # # # # # # # 8291</div>

              <div className="foundy-card-footer">
                <div>
                  <span className="foundy-card-label">Card Holder</span>
                  <strong>{userName}</strong>
                </div>
                <div className="foundy-card-initials">{initials}</div>
              </div>
            </article>

            <article className="foundy-summary-box">
              <div className="foundy-summary-header">
                <span>Portfolio Summary</span>
                <span className="foundy-badge foundy-badge--success">+12.4%</span>
              </div>

              <div className="foundy-summary-body">
                <div className="foundy-summary-label">Total Value</div>
                <div className="foundy-summary-value">$128,490.00</div>
              </div>
            </article>

            <article className="foundy-chart-box">
              <div className="foundy-summary-header">
                <span>ROI Performance</span>
                <span className="foundy-badge foundy-badge--neutral">YTD</span>
              </div>

              <div className="foundy-chart" aria-label="ROI performance chart">
                {chartBars.map((bar) => (
                  <div key={bar.label} className="foundy-chart-column">
                    <div className="foundy-chart-bar" style={{ height: `${bar.value}%` }} />
                    <span>{bar.label}</span>
                  </div>
                ))}
              </div>
            </article>

            <div className="foundy-perks-grid">
              <article className="foundy-perk-card">
                <div className="foundy-perk-icon">✦</div>
                <div>
                  <h3>Early Access</h3>
                  <p>Priority opportunities</p>
                </div>
              </article>

              <article className="foundy-perk-card">
                <div className="foundy-perk-icon foundy-perk-icon--accent">✓</div>
                <div>
                  <h3>Tax Benefits</h3>
                  <p>Smart portfolio planning</p>
                </div>
              </article>
            </div>
          </section>

          <aside className="foundy-right-column">
            <section className="foundy-updates-box">
              <div className="foundy-updates-header">
                <h2>Entrepreneur Updates</h2>
                <button type="button" className="foundy-link-button">View All</button>
              </div>

              <div className="foundy-update-list">
                {updates.map((item) => (
                  <article key={item.name} className="foundy-update-item">
                    <div className={`foundy-update-ico foundy-update-ico--${item.tone}`}>
                      {item.name.split(' ')[0][0]}
                    </div>
                    <div className="foundy-update-content">
                      <div className="foundy-update-head">
                        <h3>{item.name}</h3>
                        <span className="foundy-badge foundy-badge--update">{item.badge}</span>
                      </div>
                      <p>{item.meta}</p>
                      <div className="foundy-update-meta">
                        <span>◔</span>
                        <span>{item.investors} investors</span>
                      </div>
                    </div>
                    <strong className="foundy-update-value">{item.value}</strong>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default FoundyCardPage;
