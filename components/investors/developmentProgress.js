import { useState, useRef } from 'react';
import Section from '../common/Section';
import Button from '../forms/Button';
import { FaPlay, FaSyncAlt, FaInfoCircle } from 'react-icons/fa';
import { Pagination, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function DevelopmentProgress({
  percentage = 25,
  lastUpdated = 'June 1, 2026',
  currentStatusLabel = 'Construction (In Progress)',
  phases = [],
  images = [],
}) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

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

                <h2 className="display-6 fw-normal text-dark-900 mb-4">
                  Development Progress
                </h2>

                {/* PROGRESS */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-semibold text-dark-800">
                      {currentStatusLabel}
                    </span>
                    <span className="progress-value">{percentage}%</span>
                  </div>

                  <div className="progress custom-progress mb-2">
                    <div
                      className="progress-bar"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <div className="progress-update-info d-flex align-items-center gap-2">
                    <FaSyncAlt className="sync-spinner text-success" size={10} />
                    <span className="text-muted" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                      Last Updated: <strong className="text-dark-800">{lastUpdated}</strong>
                    </span>
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
                  color="primary-light"
                  href="/our-properties/blissville-terraces/4-bedroom-waterview-terrace-duplex#gallery"
                  className="px-4 py-3 d-inline-flex align-items-center gap-2"
                >
                  <FaPlay size={12} />
                  View Project Update Images
                </Button>
              </div>

              {/* RIGHT */}
              <div className="col-lg-5 image-side">
                <div className="image-wrap">
                  {images && images.length > 0 ? (
                    <Swiper
                      modules={[Pagination, Autoplay, A11y]}
                      spaceBetween={0}
                      slidesPerView={1}
                      pagination={images.length > 1 ? { el: '.progress-swiper-pagination', clickable: true } : false}
                      autoplay={images.length > 1 ? { delay: 5000, disableOnInteraction: false } : false}
                      observer={true}
                      observeParents={true}
                      className="progress-swiper h-100"
                      onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}
                    >
                      {images.map((img, idx) => (
                        <SwiperSlide key={idx} className="position-relative h-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img.src}
                            alt={img.description || `Development progress ${idx + 1}`}
                            className="progress-img"
                          />
                        </SwiperSlide>
                      ))}

                      {(images.length > 1 || images[activeSlideIndex]?.description) && (
                        <div className="progress-info-card">
                          {images[activeSlideIndex]?.description && (
                            <p className="progress-desc-text">
                              {images[activeSlideIndex].description}
                            </p>
                          )}
                          {images.length > 1 && (
                            <div className="progress-swiper-pagination"></div>
                          )}
                        </div>
                      )}
                    </Swiper>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src="/assets/img/investors/construction-progress.jpg"
                      alt="Construction progress"
                      className="progress-img"
                    />
                  )}
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
