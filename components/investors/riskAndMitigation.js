import Section from '../common/Section';
import { FiShield } from 'react-icons/fi';

const risks = [
  {
    title: 'Construction Delay',
    subtitle: 'Execution Timeline',
    desc: 'Project already ~20% complete with experienced team and phased delivery milestones.',
    label: 'Progress',
    value: 20,
    status: 'Active Monitoring',
    type: 'primary',
  },
  {
    title: 'Cost Overrun',
    subtitle: 'Budget Control',
    desc: 'Fixed-price contracts with 15% contingency buffer to absorb cost fluctuations.',
    label: 'Protected',
    value: 85,
    status: 'Cost Controlled',
    type: 'success',
  },
  {
    title: 'Sales Shortfall',
    subtitle: 'Market Demand',
    desc: 'Limited 14-unit supply in a high-demand waterfront corridor supports strong absorption.',
    label: 'Demand',
    value: 65,
    status: 'Well Positioned',
    type: 'primary',
  },
  {
    title: 'Title Security',
    subtitle: 'Legal Integrity',
    desc: 'C of O secured and can be independently verified prior to investor participation.',
    label: 'Secured',
    value: 100,
    status: 'Fully Secured',
    type: 'success',
  },
  {
    title: 'Financial Protection',
    subtitle: 'Investor Returns',
    desc: 'Structured investment model with defined returns and layered capital protection.',
    label: 'Structured',
    value: 100,
    status: 'Capital Protected',
    type: 'primary',
  },
];

export default function RiskAndMitigation() {
  return (
    <Section className="risk-governance-section">
      <div className="container">
        {/* HEADER */}
        <div className="header-block">
          <h2 className="display-5 fw-normal text-dark-900">
            Risk and Mitigation
          </h2>

          <p className="section-subtext">
            Institutional-grade risk management designed to protect capital,
            ensure transparency, and maintain steady project execution across
            every phase.
          </p>

          <div className="audit-row">
            <FiShield />
            <span>Audit-Ready Portfolio</span>
          </div>
        </div>

        {/* TABLE */}
        <div className="risk-table">
          <div className="risk-head">
            <div>Risk Domain</div>
            <div>Mitigation Strategy</div>
            <div>Exposure</div>
            <div>Risk Status</div>
          </div>

          {risks.map((item, i) => (
            <div key={i} className="risk-row">
              <div className="risk-domain">
                <div className="title">{item.title}</div>
                <div className="subtitle">{item.subtitle}</div>
              </div>

              <div className="risk-mitigation">{item.desc}</div>

              <div className="risk-exposure">
                <div className="top">
                  <span className={`label ${item.type}`}>{item.label}</span>
                  <span className="percent">{item.value}%</span>
                </div>

                <div className="progress">
                  <div
                    className={`bar ${item.type}`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>

              <div className="risk-status">
                <span className={`badge ${item.type}`}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
