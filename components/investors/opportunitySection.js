import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import {
  FaLocationDot,
  FaWater,
  FaScrewdriverWrench,
  FaShieldHalved,
} from 'react-icons/fa6';
import Section from '../common/Section';
import Button from '../forms/Button';

export const opportunityFeatures = [
  {
    icon: FaLocationDot,
    title: 'Premium Location',
    desc: 'Heart of Sangotedo development corridor.',
  },
  {
    icon: FaWater,
    title: 'Waterfront',
    desc: 'Rare creek access with boat jetty facilities.',
  },
  {
    icon: FaScrewdriverWrench,
    title: 'Active Construction',
    desc: 'Physical validation of investment progress.',
  },
  {
    icon: FaShieldHalved,
    title: 'Secured Title',
    desc: 'Full Certificate of Occupancy in place.',
  },
];

export default function OpportunitySection() {
  return (
    <Section className="py-6 py-lg-7 bg-primary-50">
      <Container>
        <Row className="align-items-center g-5">
          {/* IMAGE */}
          <Col lg={6}>
            <Image
              src="/assets/img/investors/smiling-investor.jpg"
              alt="Smiling investor writing in notebook"
              width={520}
              height={560}
              className="w-100 rounded-4 shadow-sm"
              priority
            />
          </Col>

          {/* CONTENT */}
          <Col lg={6}>
            <p className="text-uppercase small text-primary-700 mb-2">
              Why Blissville Tri-Level Terraces
            </p>

            <h2 className="display-5 fw-normal text-dark-900 mb-3">
              The Opportunity
            </h2>

            <p className="text-dark-800 mb-4">
              Sangotedo is the new frontier of Lagos real estate, benefiting
              from the Lekki Free Trade Zone and industrial, new Lekki deep sea
              port, proposed international airport, and ongoing infrastructure
              expansion and upgrade including roads, bridges, transmission lines
              and gas pipelines.
            </p>

            {/* FEATURES */}
            <Row className="g-4 mb-4">
              {opportunityFeatures.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Col sm={6} key={index}>
                    <div className="d-flex gap-3 align-items-start">
                      {/* ICON */}
                      <div className="text-primary-600 mt-1">
                        <Icon size={16} />
                      </div>

                      {/* TEXT */}
                      <div>
                        <div className="fw-semibold text-dark-900 mb-1">
                          {item.title}
                        </div>
                        <small className="text-dark-700">{item.desc}</small>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>

            <Button color="primary" size="lg">
              Invest Now <FaArrowRight size={12} />
            </Button>
          </Col>
        </Row>
      </Container>
    </Section>
  );
}
