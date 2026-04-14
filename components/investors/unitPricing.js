import Image from 'next/image';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {
  FaBed,
  FaBath,
  FaCar,
  FaSolarPanel,
  FaShieldAlt,
  FaArrowRight,
} from 'react-icons/fa';
import Section from '../common/Section';

const units = [
  {
    title: 'Edge Unit',
    area: '360 SQM TOTAL AREA',
    variant: 'success',
    badge: 'Limited Supply',
    image: '/assets/img/property/property1.jpeg',
    features: [
      { icon: <FaBed />, text: '4 Bedrooms', variant: 'primary' },
      { icon: <FaBath />, text: '5.5 Bathrooms', variant: 'info' },
      { icon: <FaCar />, text: '2 Car Parks', variant: 'primary' },
      { icon: <FaSolarPanel />, text: 'Solar Ready', variant: 'warning' },
    ],
    shell: '₦175.0M',
    finished: '₦203.0M',
  },
  {
    title: 'Centre Unit',
    area: '335 SQM TOTAL AREA',
    variant: 'warning',
    image: '/assets/img/property/property2.jpeg',
    features: [
      { icon: <FaBed />, text: '4 Bedrooms', variant: 'primary' },
      { icon: <FaBath />, text: '5.5 Bathrooms', variant: 'info' },
      { icon: <FaCar />, text: '2 Car Parks', variant: 'primary' },
      { icon: <FaShieldAlt />, text: '24/7 Security', variant: 'success' },
    ],
    shell: '₦175.0M',
    finished: '₦203.0M',
  },
];

export default function UnitPricing() {
  return (
    <Section className="unit-section">
      <Container>
        {/* HEADER */}
        <div className="text-center mb-5">
          <p className="text-uppercase small text-primary-600 mb-2">
            INVESTMENT INVENTORY
          </p>

          <h2 className="unit-title">Unit Specification & Pricing</h2>
        </div>

        {/* CARDS */}
        <Row className="g-4">
          {units.map((unit, i) => (
            <Col lg={6} key={i}>
              <div className="unit-card h-100">
                {/* IMAGE WITH OVERLAY */}
                <div className="unit-img position-relative">
                  <Image
                    src={unit.image}
                    alt={unit.title}
                    width={640}
                    height={420}
                    className="w-100"
                  />

                  <div className="img-overlay" />
                </div>

                {/* BODY */}
                <div className="unit-body">
                  {/* TITLE */}
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h5 className="unit-name mb-0">{unit.title}</h5>

                    {unit.badge && (
                      <span className="unit-badge">{unit.badge}</span>
                    )}
                  </div>

                  {/* AREA */}
                  <div className={`unit-area ${unit.variant}`}>{unit.area}</div>

                  {/* FEATURES */}
                  <Row className="g-2 mt-3">
                    {unit.features.map((f, idx) => (
                      <Col xs={6} key={idx}>
                        <div className="feature-item">
                          <span className={`icon-box icon-${f.variant}`}>
                            {f.icon}
                          </span>
                          {f.text}
                        </div>
                      </Col>
                    ))}
                  </Row>

                  <div className="unit-divider" />

                  {/* PRICING */}
                  <div className="unit-pricing">
                    <div>
                      <small>Shell Price</small>
                      <div className="price shell">{unit.shell}</div>
                    </div>

                    <div className="text-end">
                      <small>Finished Price</small>
                      <div className="price finished">{unit.finished}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* CTA */}
        <div className="text-center mt-5">
          <Button className="unit-cta">
            View Properties Details <FaArrowRight size={12} />
          </Button>
        </div>
      </Container>
    </Section>
  );
}
