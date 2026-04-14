import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import Section from '../common/Section';

export const snapshotData = [
  {
    title: 'Min Investment Entry',
    value: '19.12M',
    subtitle: 'Entry Tier Capital',
    color: 'warning',
  },
  {
    title: 'Product Price',
    value: '₦155M+',
    subtitle: 'Up to ₦203M (Corner)',
    color: 'primary',
  },
  {
    title: 'Total Inventory',
    value: '14 Units',
    subtitle: 'Tri-Level Terraces',
    color: 'success',
  },
  {
    title: 'Property Title',
    value: 'C of O',
    subtitle: 'Certificate of Occupancy',
    color: 'danger',
  },
];

export default function ProjectSnapshot() {
  return (
    <Section biggerPadding className="snapshot-section">
      <Container>
        <Row className="align-items-center g-5">
          {/* LEFT */}
          <Col lg={5} className="mb-4 mb-lg-0">
            <p className="text-uppercase small text-primary-700 mb-2">
              At a Glance
            </p>

            <h2 className="display-5 fw-normal text-dark-900 mb-3">
              Project Snapshot
            </h2>

            {/* ✅ ACCESSIBILITY FIX */}
            <p className="text-dark-800 mb-4">
              Blissville represents a pinnacle of tri-level architectural
              design, offering investors a rare entry into high-yield
              residential development with guaranteed flood mitigation and
              premium finishes.
            </p>

            <Button
              variant="success"
              className="px-4 py-2 d-inline-flex align-items-center gap-2"
            >
              View Project <FaArrowRight size={12} />
            </Button>
          </Col>

          {/* RIGHT */}
          <Col lg={{ span: 6, offset: 1 }}>
            <Row className="g-4">
              {snapshotData.map((item, index) => (
                <Col xs={12} sm={6} key={index}>
                  <div
                    className={`snapshot-card border-${item.color}  bg-${item.color}-50 h-100`}
                  >
                    <p
                      className={`small text-uppercase mb-2 fw-semibold text-${item.color}-700`}
                    >
                      {item.title}
                    </p>

                    <h4 className="fw-bold text-dark-900 mb-1">{item.value}</h4>

                    {/* ✅ BETTER CONTRAST */}
                    <small className="text-dark-700">{item.subtitle}</small>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </Section>
  );
}
