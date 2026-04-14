import { useState, useRef } from 'react';
import Section from '../common/Section';
import Button from '../forms/Button';
import { FaPlay, FaSyncAlt, FaInfoCircle } from 'react-icons/fa';

const phases = [
  {
    label: 'PHASE 01',
    title: 'Site Clearing',
    short: 'Completed',
    full: 'Site clearing completed including debris removal, leveling, and preparation for structural work.',
    active: true,
  },
  {
    label: 'PHASE 02',
    title: 'Construction',
    short: 'In Progress · 20%',
    full: 'Foundation complete. Structural framing and block work currently progressing at 20%.',
    active: true,
  },
  {
    label: 'PHASE 03',
    title: 'Snagging',
    short: 'Est. Q3 2027',
    full: 'Final inspection phase ensuring all finishes, fittings, and systems meet required standards.',
  },
  {
    label: 'PHASE 04',
    title: 'Handover',
    short: 'Est. Q3 2027',
    full: 'Completed units delivered to investors with full documentation and title processing.',
  },
];

export default function DevelopmentProgress() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const containerRef = useRef(null);

  const handleClick = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = containerRef.current.getBoundingClientRect();

    setCoords({
      top: rect.top - parentRect.top - 90,
      left: rect.left - parentRect.left + rect.width / 2,
    });

    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Section className="development-progress">
      <div className="container">
        <div className="progress-wrapper" ref={containerRef}>
          <div className="progress-inner">
            <div className="row g-0 align-items-stretch">
              {/* LEFT */}
              <div className="col-lg-7 content-side p-4 p-lg-5 position-relative">
                <span className="eyebrow mb-3">● LIVE MONTHLY TRACKER</span>

                <h2 className="title mb-4">Development Progress</h2>

                {/* PROGRESS */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-semibold text-dark-800">
                      Infrastructure & Groundwork
                    </span>
                    <span className="progress-value">20%</span>
                  </div>

                  <div className="progress custom-progress">
                    <div className="progress-bar" style={{ width: '20%' }} />
                  </div>
                </div>

                {/* PHASES */}
                <div className="row g-3 phase-row">
                  {phases.map((p, i) => (
                    <div className="col-6 col-md-3" key={i}>
                      <button
                        type="button"
                        className={`phase-item ${p.active ? 'active' : ''}`}
                        onClick={(e) => handleClick(e, i)}
                      >
                        <small>{p.label}</small>

                        <div className="d-flex align-items-center gap-1">
                          <h6>{p.title}</h6>
                          <FaInfoCircle className="info-icon" />
                        </div>

                        <p>{p.short}</p>
                      </button>
                    </div>
                  ))}
                </div>

                <hr className="divider my-4" />

                <Button
                  color="primary"
                  className="d-inline-flex align-items-center gap-2"
                >
                  <FaPlay size={12} />
                  View Project Update Images
                </Button>
              </div>

              {/* RIGHT */}
              <div className="col-lg-5 image-side">
                <div className="image-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/img/investors/construction-progress.jpg"
                    alt="Construction progress"
                    className="progress-img"
                    height="800"
                    width="800"
                  />

                  <div className="update-card d-flex align-items-center gap-3">
                    <div className="icon">
                      <FaSyncAlt size={12} />
                    </div>
                    <div>
                      <small>LAST UPDATE</small>
                      <div className="time">April 1, 2026</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* GLOBAL POPOVER */}
            {activeIndex !== null && (
              <div
                className="phase-popover-global"
                style={{
                  top: coords.top,
                  left: coords.left,
                }}
              >
                <div className="popover-title">{phases[activeIndex].title}</div>
                <div className="popover-desc">{phases[activeIndex].full}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
