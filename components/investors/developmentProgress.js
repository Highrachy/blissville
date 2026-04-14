import Section from '../common/Section';
import {
  FaVideo,
  FaSyncAlt,
  FaHardHat,
  FaBuilding,
  FaCheckCircle,
} from 'react-icons/fa';

const DevelopmentProgress = () => {
  return (
    <Section className="development-progress">
      <div className="container">
        <div className="row g-0 align-items-stretch">
          {/* LEFT */}
          <div className="col-lg-7 p-4 p-lg-5 content-side">
            <span className="eyebrow">● LIVE MONTHLY TRACKER</span>

            <h2 className="title">Development Progress</h2>

            {/* Progress */}
            <div className="progress-block">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-semibold text-dark-800">
                  Infrastructure & Groundwork
                </span>
                <span className="progress-value">20%</span>
              </div>

              <div className="progress custom-progress">
                <div className="progress-bar" style={{ width: '20%' }} />
              </div>
            </div>

            {/* Phases */}
            <div className="row phase-row mt-4">
              <div className="col-6 col-md-3 phase active">
                <small>PHASE 01</small>
                <h6>Site Clearing</h6>
                <p>Completed June 2025</p>
              </div>

              <div className="col-6 col-md-3 phase active">
                <small>PHASE 02</small>
                <h6>Construction Works</h6>
                <p>In Progress · 20%</p>
              </div>

              <div className="col-6 col-md-3 phase">
                <small>PHASE 03</small>
                <h6>Snagging Testing</h6>
                <p>Est. Q3 2027</p>
              </div>

              <div className="col-6 col-md-3 phase">
                <small>PHASE 04</small>
                <h6>Handover</h6>
                <p>Est. Q3 2027</p>
              </div>
            </div>

            <hr className="divider" />

            <button className="btn btn-primary px-4 py-2">
              <FaVideo className="me-2" />
              View Project Updates
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-lg-5 image-side">
            <img
              src="/assets/img/investors/construction-progress.jpg"
              alt="Construction progress"
              className="progress-img"
            />
            <div className="update-card d-flex align-items-center gap-3">
              <div className="icon">
                <FaSyncAlt />
              </div>
              <div>
                <small>LAST UPDATE</small>
                <div className="time">April 1, 2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default DevelopmentProgress;
