import Image from 'next/image';
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import Section from '../common/Section';

export default function InvestorsHero() {
  return (
    <Section biggerPadding className="investors-hero">
      <Container>
        <Row className="align-items-center g-5">
          {/* LEFT */}
          <Col lg={6}>
            {/* <p className="text-uppercase small text-primary-700 mb-3">
              BLISSVILLE TRI-LEVEL TERRACES
            </p> */}

            <h1 className="display-4 investor-header fw-normal lh-1 text-dark-900 mb-4">
              <span className="text-primary-600">Blissville Terraces:</span>
              <br /> Where Smart Investors Own the Future.
            </h1>

            <p className="text-dark-800 mb-4 mb-lg-5" style={{ maxWidth: 480 }}>
              A tech-driven investment in Blissville Tri-Level Terraces. Merging
              architectural curatorship with location intelligence for
              unparalleled asset growth.
            </p>

            <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3 gap-sm-4">
              <Button
                variant="dark"
                className="px-4 py-2 d-inline-flex align-items-center gap-2"
              >
                Start Investing <FaArrowRight size={12} />
              </Button>

              <div>
                <div className="fw-bold text-warning-600 fs-4 d-inline d-lg-block">
                  32%
                </div>
                <small className="text-dark-600 text-uppercase">
                  &nbsp;Projected Year 1 ROI
                </small>
              </div>
            </div>
          </Col>

          {/* RIGHT */}
          <Col lg={6}>
            <div className="hero-media-wrap">
              {/* IMAGE */}
              <div className="rounded-4 overflow-hidden shadow-sm property-img-wrap">
                <Image
                  src="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-1-front.jpg"
                  alt="Blissville modern terrace apartments"
                  width={560}
                  height={420}
                  className="w-100"
                  style={{ display: 'block' }}
                  priority
                />
              </div>

              {/* FLOATING CARD */}
              <div className="hero-card bg-white rounded-3 shadow-sm p-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-semibold text-dark-900">
                    Development Status
                  </span>
                  <span className="fw-semibold text-success-600">20%</span>
                </div>

                <ProgressBar now={20} className="mb-2" style={{ height: 6 }} />

                <small className="text-dark-700">
                  Foundations completed. Structural framing for Sector A in
                  progress.
                </small>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Section>
  );
}
