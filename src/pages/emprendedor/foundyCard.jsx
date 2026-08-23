import { useState } from 'react';
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
  { label: 'Home', icon: '⌂' },
  { label: 'My projects', icon: '▣' },
  { label: 'Messages', icon: '✉' },
  { label: 'Settings', icon: '⚙' },
  { label: 'Notifications', icon: '◉' },
];

const portfolioBars = [
  { label: 'Jan', value: 28 },
  { label: 'Feb', value: 42 },
  { label: 'Mar', value: 55 },
  { label: 'Apr', value: 64 },
  { label: 'May', value: 76 },
  { label: 'Jun', value: 84 },
];

const updates = [
  {
    name: 'EcoStream Solutions',
    badge: 'Growth',
    value: '$48k',
    meta: '18 investors • 3.8% yield',
    tone: 'green',
  },
  {
    name: 'Quantum Ledger',
    badge: 'AI',
    value: '$27k',
    meta: '11 investors • 4.6% yield',
    tone: 'purple',
  },
  {
    name: 'Northstar Labs',
    badge: 'New',
    value: '$19k',
    meta: '9 investors • 2.9% yield',
    tone: 'gold',
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
    <div className="foundy-card-page">
      <aside className="foundy-sidebar">
        <div className="foundy-sidebar__header">
          <div className="foundy-profile-wrapper">
            <img src={user.avatar || defaultUser.avatar} alt={userName} className="foundy-profile-image" />
          </div>
          <span className="foundy-user-badge">{userName}</span>
        </div>

        <nav className="foundy-sidebar__menu" aria-label="Sidebar navigation">
          {sidebarMenu.map((item, index) => (
            <button
              key={item.label}
              type="button"
              className={`foundy-menu-item ${index === 0 ? 'active' : ''}`}
            >
              <span className="foundy-menu-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="foundy-sidebar__footer">
          <button type="button" className="foundy-menu-item foundy-footer-item">
            <span className="foundy-menu-icon">?</span>
            <span>Support</span>
          </button>
          <button type="button" className="foundy-menu-item foundy-footer-item foundy-logout-item">
            <span className="foundy-menu-icon">⇠</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="foundy-main-panel">
        <header className="foundy-topbar">
          <div className="foundy-brand-block" aria-label="Foundy brand logo">
            <img src="/images/foundy-logo.png" alt="Foundy logo" className="foundy-brand-logo" />
          </div>

          <nav className="foundy-nav" aria-label="Main navigation">
            <button type="button" className="foundy-nav-link">
              Dashboard
            </button>
            <button type="button" className="foundy-nav-link">
              Statistics
            </button>
            <button type="button" className="foundy-nav-link foundy-nav-link--active">
              Foundy card
            </button>
          </nav>

          <div className="foundy-search-wrap">
            <span className="foundy-search-icon">⌕</span>
            <input type="text" className="foundy-search" placeholder="Search" aria-label="Search" />
          </div>
        </header>

        <section className="foundy-banner">
          <div className="foundy-banner__content">
            <p className="foundy-banner__eyebrow">Portfolio overview</p>
            <h1>Manage your Foundy Card and exclusive investment portfolio.</h1>
          </div>
          <button type="button" className="foundy-invest-btn">
            + Invest Now
          </button>
        </section>

        <div className="foundy-content-grid">
          <section className="foundy-left-column">
            <div className="foundy-card-box">
              <div className="foundy-card-header">
                <span className="foundy-card-brand">FOUNDY</span>
                <span className="foundy-card-chip" aria-label="Card type">
                  ●●●
                </span>
              </div>

              <div className="foundy-card-number">•••• •••• •••• 8291</div>

              <div className="foundy-card-footer">
                <div>
                  <span className="foundy-card-label">Card Holder</span>
                  <strong>{userName}</strong>
                </div>
                <div className="foundy-card-initials">{initials}</div>
              </div>
            </div>

            <div className="foundy-portfolio-box">
              <div className="foundy-section-head">
                <span>Portfolio</span>
                <span className="foundy-badge foundy-badge--success">+12.4%</span>
              </div>
              <div className="foundy-portfolio-value">$128,490.00</div>
            </div>

            <div className="foundy-chart-box">
              <div className="foundy-section-head">
                <span>ROI Performance</span>
                <span className="foundy-badge foundy-badge--neutral">YTD</span>
              </div>

              <div className="foundy-chart" aria-label="ROI performance chart">
                {portfolioBars.map((bar) => (
                  <div key={bar.label} className="foundy-chart-bar-group">
                    <div className="foundy-chart-bar" style={{ height: `${bar.value}%` }} />
                    <span>{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="foundy-perks-grid">
              <div className="foundy-perk-card">
                <div className="foundy-perk-icon">✦</div>
                <div>
                  <h3>Early Access</h3>
                  <p>Priority opportunities</p>
                </div>
              </div>

              <div className="foundy-perk-card">
                <div className="foundy-perk-icon foundy-perk-icon--accent">✓</div>
                <div>
                  <h3>Tax Benefits</h3>
                  <p>Smart portfolio planning</p>
                </div>
              </div>
            </div>
          </section>

          <aside className="foundy-right-column">
            <section className="foundy-updates-box">
              <div className="foundy-section-head">
                <span>Entrepreneur Updates</span>
                <button type="button" className="foundy-link-button">
                  View all
                </button>
              </div>

              <div className="foundy-update-list">
                {updates.map((item) => (
                  <article key={item.name} className="foundy-update-item">
                    <div className={`foundy-update-icon foundy-update-icon--${item.tone}`}>
                      {item.name.split(' ')[0][0]}
                    </div>
                    <div className="foundy-update-details">
                      <div className="foundy-update-header">
                        <h3>{item.name}</h3>
                        <span className="foundy-badge foundy-badge--update">{item.badge}</span>
                      </div>
                      <p>{item.meta}</p>
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
