import { Ship } from 'iconsax-react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { FaCar, FaShip, FaBuilding, FaPlane } from 'react-icons/fa';
import Section from '../common/Section';

export const neighborhoodData = [
  {
    icon: FaCar,
    label: 'Business Hub',
    title: 'Victoria Island',
    time: '45m',
    meta: 'Commute Time',
    color: 'primary',
  },
  {
    icon: FaShip,
    label: 'Express Access',
    title: 'VI Jetty',
    time: '25m',
    meta: 'Waterway',
    color: 'info',
  },
  {
    icon: FaBuilding,
    label: 'Commercial Center',
    title: 'Lekki Phase 1',
    time: '35m',
    meta: 'Via Expressway',
    color: 'success',
  },
  {
    icon: FaPlane,
    label: 'Future Infrastructure',
    title: 'Intl Airport',
    time: '20m',
    meta: 'Lekki-Epe Axis',
    color: 'warning',
  },
];

export default function NeighborhoodSection() {
  return (
    <Section biggerPadding className="neighborhood-section">
      <Container>
        <Row className="g-5 align-items-start">
          {/* LEFT */}
          <Col lg={5}>
            <p className="text-uppercase small text-success mb-2">
              Connectivity
            </p>

            <h2 className="display-5 fw-normal text-primary-800 mb-3">
              Neighborhood
            </h2>

            <p className="text-dark-700 mb-4">
              Strategically positioned at the nexus of commerce and leisure.
              Blissville Terraces offers unparalleled access to the city&rsquo;s
              vital hubs via multiple transit modalities.
            </p>

            <div className="advantage-highlight mb-4">
              <div className="d-flex align-items-start gap-3">
                <div className="advantage-icon">
                  <FaShip size={12} />
                </div>

                <div className="advantage-text">
                  <div className="fw-semibold text-info-900">
                    Strategic Advantage
                  </div>

                  <small className="text-info-700">
                    Exclusive Waterfront Accessibility
                  </small>
                </div>
              </div>
            </div>

            <Button
              variant="dark"
              className="px-4 py-2 d-inline-flex align-items-center gap-2"
            >
              View Location On Google Map <FaArrowRight size={12} />
            </Button>
          </Col>

          {/* RIGHT */}
          <Col lg={7}>
            <Row className="g-4">
              {neighborhoodData.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Col md={6} key={index}>
                    <div className="neighborhood-card h-100">
                      <div className={`icon-box icon-${item.color}`}>
                        <Icon size={18} />
                      </div>

                      <p className="small text-uppercase text-muted mb-1">
                        {item.label}
                      </p>

                      <h5 className="fw-semibold text-dark-900 mb-3">
                        {item.title}
                      </h5>

                      <div className="d-flex justify-content-between align-items-center">
                        <span className={`fw-bold fs-4 text-${item.color}`}>
                          {item.time}
                        </span>

                        <small className="text-dark-700">{item.meta}</small>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </Section>
  );
}
