import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { FaCar, FaShip, FaBuilding, FaPlane } from 'react-icons/fa';
import Section from '../common/Section';
import Button from '../forms/Button';

export const neighborhoodData = [
  {
    icon: FaCar,
    label: 'Business Hub',
    title: 'Victoria Island',
    time: '~45m',
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
    time: '~35m',
    meta: 'Lekki-Epe Axis',
    color: 'warning',
  },
];

export default function NeighborhoodSection() {
  return (
    <Section
      biggerPadding
      className="py-6 py-lg-7 bg-white neighborhood-section"
    >
      <Container>
        <Row className="g-5 align-items-start">
          {/* LEFT */}
          <Col lg={5}>
            <p className="text-uppercase small text-success mb-2">
              Connectivity
            </p>

            <h2 className="display-5 fw-normal text-dark-900 mb-3">
              Neighborhood
            </h2>

            <p className="text-dark-700 mb-4">
              Strategically positioned at the nexus of commerce and leisure.
              Blissville Terraces offers unparalleled access to the city’s vital
              hubs via multiple transit modalities.
            </p>

            {/* ADVANTAGE */}
            <div className="advantage-highlight mb-4">
              <div className="d-flex gap-3">
                <div className="advantage-icon">
                  <FaShip size={14} />
                </div>

                <div className="advantage-text">
                  <div className="fw-semibold text-dark-900">
                    Strategic Advantage
                  </div>

                  <small className="text-dark-700">
                    Exclusive Waterfront Accessibility
                  </small>
                </div>
              </div>
            </div>

            <Button
              color="primary"
              className="px-5"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.google.com/maps?saddr=My+Location&daddr=6.480150,3.646269`}
            >
              View on Google Maps <FaArrowRight size={12} />
            </Button>
          </Col>

          {/* RIGHT */}
          <Col lg={7}>
            <Row className="g-4">
              {neighborhoodData.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Col md={6} key={index}>
                    <div className="snapshot-card h-100 p-4 rounded-3 border">
                      {/* ICON */}
                      <div
                        className={`d-inline-flex align-items-center justify-content-center rounded-3 bg-${item.color}-100 text-${item.color}-600 mb-3`}
                        style={{ width: 36, height: 36 }}
                      >
                        <Icon size={16} />
                      </div>

                      {/* LABEL */}
                      <div className="text-uppercase text-xs text-dark-700 mb-0 fw-light">
                        {item.label}
                      </div>

                      {/* TITLE */}
                      <div className="fw-bold text-dark-900 mb-5">
                        {item.title}
                      </div>

                      {/* FOOT */}
                      <div className="d-flex justify-content-between align-items-center">
                        <span className={`fw-bold fs-5 text-${item.color}-800`}>
                          {item.time}
                        </span>

                        <small className="text-dark-700 text-xs">
                          {item.meta}
                        </small>
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
