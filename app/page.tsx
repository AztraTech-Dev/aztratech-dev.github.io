export default function Home() {
  return (
    <>
      <main id="main-content">

        {/* ── HERO ── */}
        <section id="hero">
          <div className="container">
            <p className="hero-eyebrow">
              Stablecoin Rails &nbsp;·&nbsp; RWA Tokenization &nbsp;·&nbsp; Security-by-Design
            </p>
            <h1 className="hero-h1">Production-Ready Web3 Infrastructure</h1>
            <p className="hero-body">
              We build the boring-but-critical layer that makes Web3 products survive enterprise
              pilots, regulatory reviews, and scale. You focus on product differentiation, we
              handle the infrastructure complexity that blocks most launches.
            </p>
            <div className="hero-actions">
              <a
                href="https://calendly.com/vladislav-usichenko/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Book Discovery Call
              </a>
              <a
                href="https://github.com/AztraTech-Dev"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                View GitHub
              </a>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section id="about">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-val">40+</div>
                <div className="stat-desc">Projects Delivered</div>
              </div>
              <div className="stat-card">
                <div className="stat-val">$1.2M+</div>
                <div className="stat-desc">Commercial Value</div>
              </div>
              <div className="stat-card">
                <div className="stat-val small">
                  Web3 · DeFi<br />RWA · Fintech
                </div>
                <div className="stat-desc">Domains Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services">
          <div className="container">
            <span className="label">Core Services</span>
            <h2 className="section-title">Infrastructure That Ships to Production</h2>
            <p className="section-sub">
              Production-grade systems for the layer most teams underestimate until it blocks
              their launch.
            </p>
            <div className="services-grid">

              <div className="service-card">
                <div className="svc-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M9 5.5v7M6.5 7.5h3.75a1.25 1.25 0 0 1 0 2.5H7.75A1.25 1.25 0 0 0 7.75 12.5H11"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="svc-title">Stablecoin Payment Rails</div>
                <ul className="svc-bullets">
                  <li>Multi-corridor settlement architecture</li>
                  <li>Treasury automation &amp; reconciliation</li>
                  <li>24/7 ops with compliance-by-design</li>
                  <li>Real-time monitoring and alerting</li>
                </ul>
                <div className="svc-for">
                  <em>For:</em> PSPs, TMS providers, fintech building global payouts
                </div>
              </div>

              <div className="service-card">
                <div className="svc-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="2.5" y="2.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M5.5 9.5l2.5 2 4.5-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="svc-title">RWA Tokenization Lifecycle</div>
                <ul className="svc-bullets">
                  <li>Registry &amp; transfer restrictions</li>
                  <li>Investor eligibility, subscription &amp; redemption flows</li>
                  <li>Corporate actions &amp; admin workflows</li>
                  <li>Audit-ready reporting, hybrid on-chain/off-chain</li>
                </ul>
                <div className="svc-for">
                  <em>For:</em> Fund admins, issuers, tokenization platforms
                </div>
              </div>

              <div className="service-card">
                <div className="svc-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M9 2 L3 4.5v5C3 12.6 5.7 15.6 9 16.5c3.3-.9 6-3.9 6-7v-5L9 2z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.5 9l2 2 3.5-3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="svc-title">Security &amp; Compliance Engineering</div>
                <ul className="svc-bullets">
                  <li>Continuous security program &amp; release gates</li>
                  <li>Incident readiness &amp; vendor risk packs</li>
                  <li>Evidence collection for SOC2 / ISO</li>
                  <li>Threat modeling &amp; secure SDLC</li>
                </ul>
                <div className="svc-for">
                  <em>For:</em> B2B rails entering regulated and enterprise markets
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── HOW WE WORK ── */}
        <section id="how-we-work">
          <div className="container">
            <span className="label">Engagement Models</span>
            <h2 className="section-title">How We Work</h2>
            <p className="section-sub">
              Four structured models that match where you are, from first architecture review to
              ongoing operations.
            </p>
            <div className="steps-grid">

              <div className="step-card">
                <div className="step-num">01</div>
                <div className="step-title">Diagnostic Sprint</div>
                <span className="step-badge">2 – 4 weeks</span>
                <p className="step-body">
                  Architecture audit, compliance roadmap, and risk assessment. Ideal for teams
                  that need clarity before committing to a build.
                </p>
                <p className="step-deliverables">
                  Deliverables: technical roadmap · risk register · prioritized backlog
                </p>
              </div>

              <div className="step-card">
                <div className="step-num">02</div>
                <div className="step-title">MVP Build</div>
                <span className="step-badge">8 – 14 weeks</span>
                <p className="step-body">
                  Core infrastructure, critical integrations, compliance baseline, and first
                  production milestone delivered on schedule.
                </p>
                <p className="step-deliverables">
                  Deliverables: production-ready system · integration runbook · compliance baseline
                </p>
              </div>

              <div className="step-card">
                <div className="step-num">03</div>
                <div className="step-title">Production Scale</div>
                <span className="step-badge">3 – 6+ months</span>
                <p className="step-body">
                  Multi-corridor and multi-asset expansion, security hardening, and full audit
                  readiness for regulated environments.
                </p>
                <p className="step-deliverables">
                  Deliverables: expanded infrastructure · hardened security · audit package
                </p>
              </div>

              <div className="step-card">
                <div className="step-num">04</div>
                <div className="step-title">Managed Retainer</div>
                <span className="step-badge">Ongoing</span>
                <p className="step-body">
                  Continuous support, feature delivery, and compliance updates. Three tiers:
                  Advisor / Builder / Ops-Ready.
                </p>
                <p className="step-deliverables">
                  Deliverables: SLA-backed ops · monthly reporting · continuous compliance
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section id="team">
          <div className="container">
            <span className="label">Team</span>
            <h2 className="section-title">Who You Work With</h2>
            <div className="team-card">
              <div className="team-name">Vladislav Usichenko</div>
              <div className="team-role">Founder &amp; CEO</div>
              <p className="team-bio">
                B2B technology executive with 40+ deals and $1.2M+ in commercial value across
                Web3, DeFi, fintech and custom software delivery. Specializes in business
                development, technical delivery coordination, and assembling specialist teams
                around complex projects.
              </p>
              <p className="team-footnote">
                Backed by a vetted network of senior Web3 engineers assembled per project.
              </p>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact">
          <div className="container">
            <h2 className="contact-headline">Start with a 30-minute discovery call</h2>
            <p className="contact-sub">No commitment. Clear infrastructure roadmap.</p>
            <div className="contact-grid">

              <a
                href="https://calendly.com/vladislav-usichenko/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
              >
                <span className="contact-card-icon">📅</span>
                <div>
                  <div className="contact-card-lbl">Book a Call</div>
                  <div className="contact-card-val">calendly.com/vladislav-usichenko/30min</div>
                </div>
              </a>

              <a href="mailto:vladyslav.usichenko@aztra.tech" className="contact-card">
                <span className="contact-card-icon">✉️</span>
                <div>
                  <div className="contact-card-lbl">Email</div>
                  <div className="contact-card-val">vladyslav.usichenko@aztra.tech</div>
                </div>
              </a>

              <a
                href="https://t.me/aztratech"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
              >
                <span className="contact-card-icon">💬</span>
                <div>
                  <div className="contact-card-lbl">Telegram</div>
                  <div className="contact-card-val">@aztratech</div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/company/aztratech-company/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
              >
                <span className="contact-card-icon">🔗</span>
                <div>
                  <div className="contact-card-lbl">LinkedIn</div>
                  <div className="contact-card-val">linkedin.com/company/aztratech-company</div>
                </div>
              </a>

            </div>
            <div className="contact-cta">
              <a
                href="https://calendly.com/vladislav-usichenko/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Schedule Discovery Call
              </a>
            </div>
          </div>
        </section>

      </main>

    </>
  )
}
