import Section from '../common/Section';
import { DocumentText, Home, ShieldTick, TickSquare } from 'iconsax-react';
import Button from '../forms/Button';
import { FaArrowRight } from 'react-icons/fa6';

const steps = [
  {
    title: 'Request Due Diligence',
    desc: 'Review technical specifications, architectural plans, and verified legal documentation.',
    icon: DocumentText,
  },
  {
    title: 'Site Visitation',
    desc: 'Experience the property firsthand with a guided walkthrough of progress and design.',
    icon: Home,
  },
  {
    title: 'Legal Review',
    desc: 'Independent validation of contracts, structure, and compliance by your legal counsel.',
    icon: ShieldTick,
  },
  {
    title: 'Execute Agreement',
    desc: 'Finalize participation and secure your allocation in the development.',
    icon: TickSquare,
  },
];

export default function PathToPartnership() {
  return (
    <Section className="path-section py-6 py-lg-7">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="path-title">The Path to Partnership</h2>
          <p className="path-subtitle">
            A seamless onboarding journey designed for high-net-worth investors.
          </p>
        </div>

        <div className="path-grid">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const variant = ['primary', 'info', 'success', 'warning'][i];

            return (
              <div key={i} className={`path-card ${variant}`}>
                <div className="card-top">
                  <div className={`icon-wrap icon-${variant}`}>
                    <Icon size="18" variant="Outline" />
                  </div>

                  <div className="step-number">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                <h4 className="step-title">{step.title}</h4>
                <p className="step-desc">{step.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-5">
          <Button color="primary" className="px-5 py-3" href="/investors/apply">
            Become an Investor <FaArrowRight size={12} />
          </Button>

          <div className="cta-sub">
            Selective Investor Access • Limited Availability
          </div>
        </div>
      </div>
    </Section>
  );
}
