import "../styles/home.css";

function Home({ usuarioData, onCerrarSesion }) {
  const nombre = usuarioData?.nombre || "Usuario";
  const usuario = usuarioData?.username || "@usuario";
  const foto = usuarioData?.foto || "https://i.pravatar.cc/150?img=47";

  return (
    <div className="foundy-home">
      {/* SIDEBAR */}
      <aside className="sidebar d-none d-md-flex">
        <div className="sidebar-top">
          <i className="bi bi-list menu-icon"></i>
          <div className="foundy-logo">
            FOUNDY
            <span>↗</span>
          </div>
        </div>

        <div className="profile-section">
          <div className="profile-image">
            <img src={foto} alt={nombre} />
          </div>
          <h6 className="text-center">{nombre}</h6>
          <div className="d-flex justify-content-center">
            <span className="profile-badge">{usuario}</span>
          </div>
        </div>

        <nav className="sidebar-menu">
          <a href="#" className="sidebar-link active">
            <i className="bi bi-house-door-fill"></i>
            Home
          </a>
          <a href="#" className="sidebar-link">
            <i className="bi bi-kanban"></i>
            My projects
          </a>
          <a href="#" className="sidebar-link">
            <i className="bi bi-chat-dots"></i>
            Messages
          </a>
          <a href="#" className="sidebar-link">
            <i className="bi bi-gear"></i>
            Settings
          </a>
          <a href="#" className="sidebar-link">
            <i className="bi bi-bell"></i>
            Notifications
          </a>
        </nav>

        <div className="sidebar-bottom">
          <a href="#" className="sidebar-link">
            <i className="bi bi-life-preserver"></i>
            Support
          </a>
          <a
            href="#"
            className="sidebar-link"
            onClick={(e) => {
              e.preventDefault();
              onCerrarSesion && onCerrarSesion();
            }}
          >
            <i className="bi bi-box-arrow-right"></i>
            Logout
          </a>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="main-content">
        {/* HEADER */}
        <header className="top-header">
          <button className="mobile-menu-button d-md-none">
            <i className="bi bi-list"></i>
          </button>

          <nav className="header-links">
            <a href="#" className="header-link active">
              Dashboard
            </a>
            <a href="#" className="header-link">
              Statistics
            </a>
            <a href="#" className="header-link">
              Foundy card
            </a>
          </nav>

          <div className="search-box">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Search..." />
          </div>
        </header>

        {/* DASHBOARD */}
        <main className="dashboard-container">
          <section className="welcome-section">
            <h1>Welcome back, {nombre.split(" ")[0]}.</h1>
            <p>
              Your ventures are showing strong momentum this quarter. You
              have 3 new investor inquiries and your portfolio growth is
              outpacing the market by 12%.
            </p>
            <div className="d-flex gap-2">
              <button className="create-btn">Create Project</button>
              <button className="reports-btn">View Reports</button>
            </div>
          </section>

          {/* STATS */}
          <div className="row stats-row g-3">
            <div className="col-md-6">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="bi bi-briefcase-fill"></i>
                </div>
                <small>Active Investments</small>
                <h3>2 Ventures</h3>
                <span className="growth-badge">+1 this month</span>
              </div>
            </div>

            <div className="col-md-6">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="bi bi-person-check-fill"></i>
                </div>
                <small>Profile Strength</small>
                <h3>92% Complete</h3>
                <div className="custom-progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: "92%" }}
                  ></div>
                </div>
                <div className="d-flex justify-content-between mt-1">
                  <small>Updated</small>
                  <small>Finish now</small>
                </div>
              </div>
            </div>
          </div>

          {/* GRÁFICO + ACTIVIDAD */}
          <div className="row g-3 mt-1">
            <div className="col-lg-8">
              <div className="dashboard-card chart-card">
                <div className="card-heading">
                  <div>
                    <h5>Growth Statistics</h5>
                    <small>Net value over the last 6 months</small>
                  </div>
                  <button className="period-btn">Last 6 Months</button>
                </div>

                <div className="chart">
                  <div className="bar bar-1"></div>
                  <div className="bar bar-2"></div>
                  <div className="bar bar-3"></div>
                  <div className="bar bar-4"></div>
                  <div className="bar bar-5"></div>
                  <div className="bar bar-6"></div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="dashboard-card activity-card">
                <div className="card-heading">
                  <h5>Recent Activity</h5>
                </div>

                <div className="activity-item">
                  <div className="activity-icon">
                    <i className="bi bi-person-check"></i>
                  </div>
                  <div>
                    <strong>New Investor Reaction</strong>
                    <small>500 Alex approved...</small>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-icon">
                    <i className="bi bi-file-earmark-check"></i>
                  </div>
                  <div>
                    <strong>Document Verified</strong>
                    <small>Project Foundy...</small>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-icon">
                    <i className="bi bi-person-plus"></i>
                  </div>
                  <div>
                    <strong>New Investor Follow</strong>
                    <small>Someone viewed...</small>
                  </div>
                </div>

                <a href="#" className="view-all">
                  View All Activity →
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="foundy-footer">
          <div className="footer-inner">
            <div className="row">
              <div className="col-md-6">
                <h6>FOUNDY</h6>
                <p className="footer-description">
                  The platform connecting founders and investors so ventures
                  can grow faster, backed by real data and real relationships.
                </p>
              </div>
              <div className="col-md-3">
                <h6>Product</h6>
                <p>Dashboard</p>
                <p>Statistics</p>
                <p>Foundy card</p>
              </div>
              <div className="col-md-3">
                <h6>Company</h6>
                <p>About</p>
                <p>Support</p>
                <p>Contact</p>
              </div>
            </div>

            <div className="footer-bottom">
              <strong>Foundy</strong>
              <small>© 2026 Foundy. All rights reserved.</small>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;