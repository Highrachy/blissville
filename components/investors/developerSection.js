import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import Section from '../common/Section';
import Button from '../forms/Button';
import Link from 'next/link';

export default function DeveloperSection() {
  return (
    <Section className="py-6 py-lg-7 bg-white">
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

            {/* BADGES */}
            <div className="d-flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 rounded-pill text-xs fw-semibold bg-success-100 text-success-700">
                REDAN Registered
              </span>

              <span className="px-3 py-1 rounded-pill text-xs fw-semibold bg-info-100 text-primary-700">
                15+ Years Experience
              </span>
            </div>

            <p className="text-dark-800 mb-4 mt-4">
              <Link href="https://www.highrachy.com" passHref>
                <a
                  className="text-dark-800 fw-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Highrachy
                </a>
              </Link>{' '}
              is a leading project development firm with a track record of
              delivering premium residential solutions. Our alignment with
              investors is cemented by our{' '}
              <span className="text-danger-700 fw-semibold">
                10% equity stake
              </span>{' '}
              in every project, ensuring our interests are perfectly
              synchronized with yours.
            </p>

            {/* LOGO */}
            <div className="mb-4 mt-4">
              <Image
                src="/assets/img/highrachy-logo.png"
                alt="Highrachy logo"
                width={220}
                height={60}
              />
            </div>

            {/* CTA */}
            <Button
              color="primary"
              className="px-5"
              href="https://www.highrachy.com/projects"
            >
              View Completed Projects <FaArrowRight size={12} />
            </Button>
          </Col>

          {/* RIGHT */}
          <Col lg={6}>
            <div className="position-relative rounded-4 overflow-hidden shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/img/investors/the-developer.jpg"
                alt="Developers walking and discussing"
                width={560}
                height={560}
                className="img-fluid img-cover"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </Section>
  );
}
