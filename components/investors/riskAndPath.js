import Section from '../common/Section';
import { FaExclamationTriangle } from 'react-icons/fa';

const RiskAndPath = () => {
  return (
    <Section className="risk-path-section">
      <div className="container">
        <div className="row g-5">
          {/* LEFT */}
          <div className="col-lg-6">
            <h2 className="section-title mb-4">Risk Mitigation Framework</h2>

            <div className="risk-card">
              <div className="d-flex gap-3">
                <FaExclamationTriangle className="risk-icon" />
                <div>
                  <h6>Construction Delay</h6>
                  <p>
                    Phased funding and early procurement of long-lead items to
                    bypass supply chain shocks.
                  </p>
                </div>
              </div>
            </div>

            <div className="risk-card">
              <div className="d-flex gap-3">
                <FaExclamationTriangle className="risk-icon" />
                <div>
                  <h6>Cost Overrun</h6>
                  <p>
                    Fixed-price contracts with reputable contractors and 15%
                    contingency buffers.
                  </p>
                </div>
              </div>
            </div>

            <div className="risk-card">
              <div className="d-flex gap-3">
                <FaExclamationTriangle className="risk-icon" />
                <div>
                  <h6>Regulatory Changes</h6>
                  <p>
                    Fully secured C of O and approved building plans prior to
                    investor onboarding.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-lg-6">
            <h2 className="section-title mb-4">The Path to Ownership</h2>

            <div className="path-step">
              <div className="step-badge">1</div>
              <div>
                <h6>Request Due Diligence</h6>
                <p>
                  Review all legal titles, survey plans, and building approvals.
                </p>
              </div>
            </div>

            <div className="path-step">
              <div className="step-badge">2</div>
              <div>
                <h6>Site Visitation</h6>
                <p>
                  Walk the site in Sangotedo and verify construction progress in
                  person.
                </p>
              </div>
            </div>

            <div className="path-step">
              <div className="step-badge">3</div>
              <div>
                <h6>Legal Counsel</h6>
                <p>
                  Independent review of the Investment Agreement and Equity
                  Deed.
                </p>
              </div>
            </div>

            <div className="path-step">
              <div className="step-badge">4</div>
              <div>
                <h6>Execute Agreement</h6>
                <p>Formalize your commitment and join the investor pool.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default RiskAndPath;
