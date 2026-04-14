import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaArrowRight, FaTint } from 'react-icons/fa';
import Section from '../common/Section';

const locationDetails = [
  { label: 'Estate', value: 'Caribbean Lake City' },
  { label: 'Address', value: 'Thesaurus Garden Drive, Sangotedo' },
  { label: 'Land Size', value: 'Approx. 1 Acre' },
];

const floodFeatures = [
  'State of the art shoreline protection',
  'Standard drainages',
  'Standard elevated roads',
  'Deep foundations (concrete piles) and elevated buildings',
  'All year round site visits and inspections',
];

export default function LocationSection() {
  return (
    <Section biggerPadding className="location-section">
      <Container>
        <Row className="g-5 align-items-center">
          {/* LEFT */}
          <Col lg={6} className="d-flex">
            <div className="w-100">
              <h2 className="display-5 fw-normal text-white mb-4">
                Location Intelligence
              </h2>

              {/* HEADER */}
              <div className="d-flex justify-content-between text-uppercase small mb-3 fw-semibold">
                <span className="text-accent">Details</span>
                <span className="text-accent">Information</span>
              </div>

              {/* TABLE */}
              <div className="location-table">
                {locationDetails.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between py-3 border-bottom border-divider"
                  >
                    <span className="text-muted-strong">{item.label}</span>

                    <span className="text-white fw-medium text-end">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                variant="success"
                className="mt-4 px-4 py-2 d-inline-flex align-items-center gap-2"
              >
                Schedule Site Visitation <FaArrowRight size={12} />
              </Button>
            </div>
          </Col>

          {/* RIGHT */}
          <Col lg={6}>
            <div className="flood-card">
              <div className="mb-3 text-accent">
                <FaTint size={26} />
              </div>

              <h4 className="text-white fw-semibold mb-3">
                Flood Prevention Protocols
              </h4>

              <p className="text-body-dark mb-4">
                The site is protected from floods by two interconnected
                solutions, a state of the art shoreline protection technology
                installed by Willem Olaf Willem Engineering company, and a
                standard infrastructure drainage and road designed and executed
                by a well seasoned and registered engineering team.
              </p>

              <ul className="flood-list">
                {floodFeatures.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </Section>
  );
}
