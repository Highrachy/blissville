import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { MdFlood } from 'react-icons/md';
import Section from '../common/Section';
import Button from '../forms/Button';

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
          <Col lg={6}>
            <h2 className="location-title mb-4">Location Intelligence</h2>

            <div className="location-table-section pe-lg-5">
              <div className="location-header d-flex justify-content-between mb-3">
                <span>Details</span>
                <span>Information</span>
              </div>

              <div className="location-table">
                {locationDetails.map((item, index) => (
                  <div key={index} className="location-row">
                    <span className="location-label">{item.label}</span>

                    <span className="location-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button color="info" size="lg" className="mt-4">
              Schedule Site Visitation <FaArrowRight size={12} />
            </Button>
          </Col>

          {/* RIGHT */}
          <Col lg={6}>
            <div className="flood-card">
              <div className="flood-icon mb-3">
                <MdFlood size={36} />
              </div>

              <h4 className="flood-title mb-3">Flood Prevention Protocols</h4>

              <p className="flood-text mb-4">
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
