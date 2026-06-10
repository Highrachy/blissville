import Image from 'next/image';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import Section from '../common/Section';
import Button from '../forms/Button';

export default function InvestorsHero() {
  return (
    <Section className="bg-gray-50">
      <Container>
        <Row className="align-items-center g-5">
          {/* LEFT */}
          <Col lg={6}>
            <h1 className="display-4 fw-semibold text-dark-900 lh-sm mb-4">
              <span className="text-primary-600">Blissville Terraces:</span>
              <br />
              Own the Future of Real Estate.
            </h1>

            <p className="text-dark-800 lead mb-4" style={{ maxWidth: 520 }}>
              Invest in a premium 14-unit waterfront development in Sangotedo.
              Entry from ₦19.1M, with projected returns driven by location
              growth, active construction, and structured exit options.
            </p>

            <div className="d-flex flex-wrap align-items-center gap-3">
              <Button
                color="primary"
                className="px-4 py-3 d-inline-flex align-items-center gap-2"
                href="#investment-structure"
              >
                View Investment Structure <FaArrowRight size={12} />
              </Button>
            </div>
          </Col>

          {/* RIGHT */}
          <Col lg={6}>
            <div className="position-relative">
              {/* IMAGE */}
              <div className="rounded-4 overflow-hidden shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-3.jpg"
                  alt="Blissville modern terrace apartments"
                  width={560}
                  height={420}
                  className="w-100 h-100 img-cover"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Section>
  );
}
