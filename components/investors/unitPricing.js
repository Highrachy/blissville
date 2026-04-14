import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';
import { FaBed, FaBath, FaCar, FaCouch, FaArrowRight } from 'react-icons/fa';
import Section from '../common/Section';
import Button from '../forms/Button';

const units = [
  {
    title: 'Edge Unit',
    area: '360 SQM TOTAL AREA',
    variant: 'success',
    badge: 'Limited Supply',
    image:
      'https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-3.jpg',
    features: [
      { icon: <FaBed />, text: '4 Bedrooms', variant: 'primary' },
      { icon: <FaBath />, text: '5.5 Bathrooms', variant: 'info' },
      { icon: <FaCar />, text: '2 Car Parks', variant: 'warning' },
      { icon: <FaCouch />, text: 'Multipurpose Room', variant: 'success' },
    ],
    shell: '₦169.0M',
    finished: '₦203.0M',
  },
  {
    title: 'Centre Unit',
    area: '335 SQM TOTAL AREA',
    variant: 'warning',
    image:
      'https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-1-front.jpg',
    features: [
      { icon: <FaBed />, text: '4 Bedrooms', variant: 'primary' },
      { icon: <FaBath />, text: '5.5 Bathrooms', variant: 'info' },
      { icon: <FaCar />, text: '2 Car Parks', variant: 'warning' },
      { icon: <FaCouch />, text: 'Multipurpose Room', variant: 'success' },
    ],
    shell: '₦155.0M',
    finished: '₦187.0M',
  },
];

export default function UnitPricing() {
  return (
    <Section className="unit-section py-6 py-lg-7">
      <Container>
        {/* HEADER */}
        <div className="text-center mb-5">
          <p className="text-uppercase small text-primary-600 mb-2">
            Investment Inventory
          </p>

          <h2 className="unit-title">Unit Specification & Pricing</h2>
        </div>

        {/* CARDS */}
        <Row className="g-4">
          {units.map((unit, i) => (
            <Col lg={6} key={i}>
              <div className="unit-card h-100">
                <div className="unit-img">
                  <Image
                    src={unit.image}
                    alt={unit.title}
                    width={640}
                    height={420}
                    className="w-100"
                  />
                </div>

                <div className="unit-body">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h5 className="unit-name mb-0">{unit.title}</h5>

                    {unit.badge && (
                      <span className="unit-badge">{unit.badge}</span>
                    )}
                  </div>

                  <div className={`unit-area ${unit.variant}`}>{unit.area}</div>

                  {/* FEATURES */}
                  <Row className="g-2 mt-3">
                    {unit.features.map((f, idx) => (
                      <Col xs={6} key={idx}>
                        <div className="feature-item">
                          <span className={`icon-box icon-${f.variant}`}>
                            {f.icon}
                          </span>
                          <span>{f.text}</span>
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

        {/* VALUE STATEMENT */}
        <div className="unit-extra text-center mt-5">
          <p className="unit-extra-text mb-4">
            All units are developed to not just benefit from the serenity of the
            environment, but are also designed for energy sustainability.
          </p>
          <p className="unit-extra-meta mb-4">
            Sophisticated Security System | Sporting Facilities | Creek Access |
            Landscaped Grounds
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mt-4">
          <Button color="dark" size="lg" className="unit-cta">
            View Property Details <FaArrowRight size={12} />
          </Button>
        </div>
      </Container>
    </Section>
  );
}
