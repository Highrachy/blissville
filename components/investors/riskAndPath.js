import Section from '../common/Section';
import {
  FaTriangleExclamation,
  FaMoneyBillTrendUp,
  FaChartLine,
  FaFileShield,
  FaFileSignature,
  FaMapLocationDot,
  FaScaleBalanced,
  FaHandshake,
} from 'react-icons/fa6';

const risks = [
  {
    icon: FaTriangleExclamation,
    color: 'blue',
    label: 'CRITICAL FACTOR',
    title: 'Construction Delay',
    risk: 'Delays could impact delivery timelines.',
    mitigation:
      'Already ~20% complete with experienced contractors and phased execution.',
    status: 'ACTIVE',
    statusClass: 'active',
  },
  {
    icon: FaMoneyBillTrendUp,
    color: 'green',
    label: 'FINANCIAL FACTOR',
    title: 'Cost Overrun',
    risk: 'Unexpected increases in project cost.',
    mitigation: 'Fixed-price contracts with contingency buffers.',
    status: 'SECURED',
    statusClass: 'secured',
  },
  {
    icon: FaChartLine,
    color: 'teal',
    label: 'MARKET FACTOR',
    title: 'Sales Risk',
    risk: 'Units may take longer to sell.',
    mitigation: 'Only 14 units in a high-demand Sangotedo corridor.',
    status: 'IN PROGRESS',
    statusClass: 'in-progress',
  },
  {
    icon: FaFileShield,
    color: 'lime',
    label: 'REGULATORY FACTOR',
    title: 'Title & Documentation',
    risk: 'Incomplete approvals could delay ownership.',
    mitigation: 'C of O secured and all approvals verified.',
    status: 'SECURED',
    statusClass: 'secured',
  },
];

const steps = [
  {
    icon: FaFileSignature,
    color: 'blue',
    title: 'Request Due Diligence',
    desc: 'Review legal titles, survey plans, and approvals.',
  },
  {
    icon: FaMapLocationDot,
    color: 'green',
    title: 'Site Visitation',
    desc: 'Visit the site and verify construction progress.',
  },
  {
    icon: FaScaleBalanced,
    color: 'teal',
    title: 'Legal Counsel',
    desc: 'Independent legal review of all documents.',
  },
  {
    icon: FaHandshake,
    color: 'lime',
    title: 'Execute Agreement',
    desc: 'Sign and formally join the investor pool.',
  },
];

export default function RiskAndOwnership() {
  return (
    <Section className="risk-mitigation-section py-6 py-lg-7">
      <div className="container">
        {/* =========================
           RISK
        ========================= */}
        <h2 className="section-title mb-4">Risk and Mitigation</h2>

        <div className="risk-grid mb-6">
          {risks.map((item, i) => {
            const Icon = item.icon;

            return (
              <div key={i} className={`risk-card ${item.color}`}>
                <div className="card-icon">
                  <Icon size={14} />
                </div>

                <div className="card-label">{item.label}</div>

                <div className="card-title">{item.title}</div>

                <p className="card-risk">{item.risk}</p>

                <p className="card-mitigation">{item.mitigation}</p>

                <div className="card-footer">
                  <span className={`status-badge ${item.statusClass}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================
           OWNERSHIP
        ========================= */}
        <h2 className="section-title mb-4">The Path to Ownership</h2>

        <div className="path-grid">
          {steps.map((step, i) => {
            const Icon = step.icon;

            return (
              <div key={i} className={`path-card ${step.color}`}>
                <div className="card-icon">
                  <Icon size={14} />
                </div>

                <div className="card-number">
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="card-title">{step.title}</div>

                <p className="card-text">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
