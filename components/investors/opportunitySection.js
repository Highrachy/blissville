import Image from 'next/image';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { FaMapMarkerAlt, FaWater, FaTools, FaShieldAlt } from 'react-icons/fa';
import Section from '../common/Section';

export const opportunityFeatures = [
  {
    icon: FaMapMarkerAlt,
    title: 'Premium Location',
    desc: 'Heart of Sangotedo development corridor.',
  },
  {
    icon: FaWater,
    title: 'Waterfront',
    desc: 'Rare creek access with boat jetty facilities.',
  },
  {
    icon: FaTools,
    title: 'Active Construction',
    desc: 'Physical validation of investment progress.',
  },
  {
    icon: FaShieldAlt,
    title: 'Secured Title',
    desc: 'Full Certificate of Occupancy in place.',
  },
];

export default function OpportunitySection() {
  return (
    <Section biggerPadding className="opportunity-section">
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <div className="opportunity-image-wrap">
              <Image
                src="/assets/img/investors/smiling-investor.jpg"
                alt="Smiling investor writing in notebook"
                width={520}
                height={560}
                className="w-100 rounded-4 shadow-sm"
                style={{ display: 'block' }}
                priority
              />
            </div>
          </Col>
          <Col lg={6}>
            <p className="text-uppercase small text-primary-700 mb-2">
              Why Blissville Tri-Level Terraces
            </p>

            <h2 className="display-5 fw-normal text-dark-900 mb-3">
              The Opportunity
            </h2>

            <p className="text-dark-800 mb-4">
              Sangotedo is the new epicenter of Lagos’ residential sprawl. As
              Lekki Phase 1 reaches saturation, smart capital is moving east.
              Blissville represents the pinnacle of this migration by offering
              architectural innovation that respects the natural creek landscape
              while providing 21st-century luxury.
            </p>

            {/* FEATURES GRID */}
            <Row className="g-4 mb-4">
              {opportunityFeatures.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Col sm={6} key={index}>
                    <div className="d-flex gap-3">
                      {/* ICON */}
                      <div className="feature-icon">
                        <Icon size={18} />
                      </div>

                      {/* TEXT */}
                      <div>
                        <h6 className="fw-semibold text-dark-900 mb-1">
                          {item.title}
                        </h6>
                        <small className="text-dark-800">{item.desc}</small>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>

            <Button
              variant="dark"
              className="px-4 py-2 d-inline-flex align-items-center gap-2"
            >
              Start Investing <FaArrowRight size={12} />
            </Button>
          </Col>
        </Row>
      </Container>
    </Section>
  );
}
