import Image from 'next/image';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import Section from '../common/Section';

export default function DeveloperSection() {
  return (
    <Section biggerPadding className="bg-white">
      <Container>
        <Row className="align-items-center g-5">
          {/* LEFT */}
          <Col lg={6}>
            <p className="text-uppercase small text-primary-600 mb-2">
              The Developer
            </p>

            <h2 className="display-5 fw-normal text-dark-900 mb-3">
              Highrachy Investment & Technology Ltd.
            </h2>

            {/* BADGES (FIXED) */}
            <div className="d-flex flex-wrap gap-2 mb-3">
              <span className="badge rounded-pill px-3 py-2 bg-success-subtle text-success-700 fw-medium">
                REDAN REGISTERED
              </span>

              <span className="badge rounded-pill px-3 py-2 bg-primary-subtle text-primary-700 fw-medium">
                OVER 12 YEARS EXPERIENCE
              </span>
            </div>

            <p className="text-dark-700 mb-4" style={{ maxWidth: 520 }}>
              Highrachy is a leading project development firm with a track
              record of delivering premium residential solutions. Our alignment
              with investors is cemented by our 10% equity stake in every
              project, ensuring our interests are perfectly synchronized with
              yours.
            </p>

            {/* LOGO */}
            <div className="mb-4">
              <Image
                src="/assets/img/highrachy-logo.png"
                alt="Highrachy logo"
                width={240}
                height={70}
              />
            </div>

            {/* CTA */}
            <Button
              className="px-4 py-2 d-inline-flex align-items-center gap-2"
              style={{ background: 'var(--bs-success)', border: 'none' }}
            >
              View Developer Website <FaArrowRight size={12} />
            </Button>
          </Col>

          {/* RIGHT */}
          <Col lg={6}>
            <div className="position-relative rounded-4">
              <Image
                src="/assets/img/investors/the-developer.jpg"
                alt="Developers walking and discussing"
                width={560}
                height={560}
                className="img-fluid img-cover rounded-4 shadow-sm"
              />

              {/* ✨ SUBTLE OVERLAY (FIXED) */}
              <div className="dev-overlay" />
            </div>
          </Col>
        </Row>
      </Container>
    </Section>
  );
}
