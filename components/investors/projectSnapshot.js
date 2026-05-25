import { Container, Row, Col } from 'react-bootstrap';
import Section from '../common/Section';
import { FaArrowRight } from 'react-icons/fa';
import Button from '../forms/Button';

import {
  FaCoins,
  FaHouseChimney,
  FaCubesStacked,
  FaExpand,
} from 'react-icons/fa6';

const snapshotData = [
  {
    value: '₦19.12 Million',
    label: 'Minimum Investment',
    icon: FaCoins,
    color: 'primary',
  },
  {
    value: '₦155 Million',
    label: 'Product Price',
    icon: FaHouseChimney,
    color: 'warning',
  },
  {
    value: '14 Units',
    label: 'Total Inventory',
    icon: FaCubesStacked,
    color: 'success',
  },
  {
    value: '4054 SqM',
    label: 'Total Land Size',
    icon: FaExpand,
    color: 'info',
  },
];

export default function ProjectSnapshot() {
  return (
    <Section className="py-6 py-lg-7 bg-body">
      <Container>
        <Row className="g-5 align-items-start">
          {/* LEFT */}
          <Col lg={5}>
            <p className="text-uppercase small text-primary-700 mb-2">
              At a Glance
            </p>

            <h2 className="display-5 fw-normal text-dark-900 mb-3">
              Project Snapshot
            </h2>

            <p className="text-dark-700 mb-4">
              Blissville represents a pinnacle of tri-level architectural
              design, offering investors a rare entry into high-yield
              residential development with guaranteed flood mitigation and
              premium finishes.
            </p>

            <hr className="my-5 text-dark-600" />

            {/* METRICS */}
            <div className="d-flex flex-wrap gap-3 gap-lg-7 mb-5">
              <div>
                <div className="fw-bold text-success-700 lh-1 fs-2">32%</div>
                <small className="text-uppercase text-xs fw-semibold text-dark-700">
                  Projected Year 1 ROI
                </small>
              </div>

              <div>
                <div className="fw-bold text-info-700 lh-1 fs-2">C of O</div>
                <small className="text-uppercase text-xs fw-semibold text-dark-700">
                  Secured Title Doc
                </small>
              </div>
            </div>

            <Button
              color="primary"
              className="px-5"
              href="/our-projects/blissville-terraces"
            >
              View Project <FaArrowRight size={12} />
            </Button>
          </Col>

          {/* RIGHT */}
          <Col lg={{ span: 6, offset: 1 }}>
            <Row className="g-4">
              {snapshotData.map((item, i) => {
                const Icon = item.icon;

                return (
                  <Col sm={6} key={i}>
                    <div className="snapshot-card h-100 p-4 rounded-3 border">
                      {/* ICON */}
                      <div
                        className={`d-inline-flex align-items-center justify-content-center rounded-3 bg-${item.color}-100 text-${item.color}-700 mb-5`}
                        style={{ width: 36, height: 36 }}
                      >
                        <Icon size={16} />
                      </div>

                      {/* VALUE */}
                      <div
                        className={`fw-semibold font-secondary text-dark-900 fs-5 mb-0`}
                      >
                        {item.value}
                      </div>

                      {/* LABEL */}
                      <small className="text-dark-700 text-xs font-primary">
                        {item.label}
                      </small>
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
