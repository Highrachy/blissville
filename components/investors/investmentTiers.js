import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import Section from '../common/Section';

const tiers = [
  {
    id: 'standard',
    title: 'STANDARD BLOCK',
    description: 'Entry level equity share in project development.',
    price: '₦19.1M',
  },
  {
    id: 'portfolio',
    title: 'LARGE PORTFOLIO',
    description: 'Enhanced returns with 2x Standard Block allocation.',
    price: '₦38.2M',
  },
  {
    id: 'full',
    title: 'FULL UNIT OWNERSHIP',
    description: 'Complete asset ownership and title transfer.',
    price: '₦155M+',
  },
];

export default function InvestmentTiers() {
  const [active, setActive] = useState('full');

  return (
    <Section biggerPadding className="investment-section">
      <Container>
        <p className="text-uppercase small text-warning-600 mb-2">
          Investment Structure
        </p>

        <h2 className="display-5 fw-normal text-dark-900 mb-5">
          Investment Tiers
        </h2>

        <Row className="g-4">
          {/* LEFT */}
          <Col lg={6}>
            <div className="tier-card p-4 p-lg-5 h-100">
              <h5 className="fw-semibold text-dark-900 mb-4">
                Available Tiers
              </h5>

              {tiers.map((tier) => {
                const isActive = active === tier.id;

                return (
                  <button
                    key={tier.id}
                    className={`tier-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActive(tier.id)}
                    aria-pressed={isActive}
                  >
                    <div className="flex-grow-1 text-start">
                      <div className="tier-title">{tier.title}</div>
                      <div className="tier-desc">{tier.description}</div>
                    </div>

                    <div className="tier-price">{tier.price}</div>
                  </button>
                );
              })}

              <p className="tier-note mt-3 mb-4">
                Minimum Investment is ₦19.1M
              </p>

              <Button className="tier-btn">
                Start Investing <FaArrowRight size={12} />
              </Button>
            </div>
          </Col>

          {/* RIGHT */}
          <Col lg={6}>
            <div className="tier-card p-4 p-lg-5 h-100 text-center">
              <p className="text-uppercase small text-primary-600 mb-3">
                Capital Allocation
              </p>

              <div className="donut-wrapper mx-auto mb-4">
                <div className="donut">
                  <div className="donut-center">
                    <div className="donut-value">₦1.2B</div>
                    <div className="donut-label">TOTAL COST</div>
                  </div>
                </div>
              </div>

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

                <div className="legend-item">
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
