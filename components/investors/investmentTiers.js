import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import Section from '../common/Section';
import Button from '../forms/Button';

const tiers = [
  {
    id: 'standard',
    title: 'STANDARD BLOCK',
    description: 'Entry level equity share in project development.',
    price: '₦19.1M',
  },
  {
    id: 'portfolio',
    title: 'LARGE INVESTMENT BLOCK',
    description: 'Enhanced returns with 2x Standard Block allocation.',
    price: '₦38.2M',
  },
  {
    id: 'full',
    title: 'FULL UNIT OWNERSHIP',
    description: 'Complete asset ownership and title transfer.',
    price: '₦155M+',
  },
  {
    id: 'custom',
    title: 'CUSTOM TIER',
    description: 'Minimum investment is ₦19.125M.',
    price: 'Flexible',
  },
];

export default function InvestmentTiers() {
  const [active, setActive] = useState('custom');

  return (
    <Section
      id="investment-structure"
      className="investment-section py-6 py-lg-7"
    >
      <Container>
        {/* HEADER */}
        <div className="mb-5">
          <p className="text-uppercase small text-warning-600 mb-2">
            Investment Structure
          </p>

          <h2 className="display-5 fw-normal text-dark-900">
            Investment Tiers
          </h2>
        </div>

        <Row className="g-4">
          {/* LEFT */}
          <Col lg={6}>
            <div className="tier-card p-4 p-lg-5 h-100 d-flex flex-column">
              <h5 className="fw-semibold text-dark-900 mb-4">
                Available Tiers
              </h5>

              <div className="flex-grow-1">
                {tiers.map((tier) => {
                  const isActive = active === tier.id;

                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setActive(tier.id)}
                      className={`tier-item ${isActive ? 'active' : ''}`}
                    >
                      <div className="flex-grow-1">
                        <div className="tier-title">{tier.title}</div>
                        <div className="tier-desc">{tier.description}</div>
                      </div>

                      <div className="tier-price">{tier.price}</div>
                    </button>
                  );
                })}
              </div>
              <Button color="primary" className="mt-4" href="/investors/apply">
                Become an Investor <FaArrowRight size={12} />
              </Button>
            </div>
          </Col>

          {/* RIGHT */}
          <Col lg={6}>
            <div className="tier-card p-4 p-lg-5 h-100 text-center">
              <p className="text-uppercase fw-semibold text-dark-800 mb-3">
                Capital Allocation
              </p>

              {/* DONUT */}
              <div className="donut-wrapper mx-auto mb-4">
                <div className="donut">
                  <div className="donut-center">
                    <div className="donut-value">₦1.53B</div>
                    <div className="donut-label">TOTAL COST</div>
                  </div>
                </div>
              </div>

              {/* LEGEND */}
              <div className="legend text-start mx-auto">
                <div className="legend-item">
                  <span className="dot bg-danger"></span>
                  <span className="legend-label">Developer (10%)</span>
                  <span className="legend-value">₦153.0M</span>
                </div>

                <div className="legend-item">
                  <span className="dot dot-gold"></span>
                  <span className="legend-label">Investor Raise (25%)</span>
                  <span className="legend-value">₦382.5M</span>
                </div>

                <div className="legend-item mb-0">
                  <span className="dot bg-primary"></span>
                  <span className="legend-label">Revenue-Funded (65%)</span>
                  <span className="legend-value">₦994.5M</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Section>
  );
}
