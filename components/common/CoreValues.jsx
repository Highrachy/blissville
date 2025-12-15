import React from 'react';
import { coreValues } from '@/data/core-values';
import Section from './Section';

// Swiper
import { Pagination, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const CoreValuesTitle = () => (
  <h4 className="my-4">
    The QWIS Difference:
    <span className="text-primary d-block d-md-inline"> Our Core Values</span>
  </h4>
);

export const CoreValuesSlider = () => {
  return (
    <Section>
      <div className="container">
        <CoreValuesTitle />

        <Swiper
          modules={[Autoplay, Pagination, A11y]}
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={false}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
            992: { slidesPerView: 2, spaceBetween: 24 },
            1200: { slidesPerView: 2, spaceBetween: 40 },
          }}
          // loop={true}
          onReachEnd={(swiper) => {
            // Wait a moment before restarting autoplay
            setTimeout(() => {
              swiper.slideTo(0); // Go back to first slide
              swiper.autoplay.start(); // Resume autoplay
            }, 5000);
          }}
          grabCursor={true}
        >
          {coreValues.map((value, index) => (
            <SwiperSlide key={index}>
              <div className="h-100 d-flex align-items-stretch">
                <SingleCoreValue {...value} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  );
};

const CoreValues = ({ className }) => {
  const items = coreValues;

  return (
    <Section id="core-values" className={className}>
      <div className="container">
        <CoreValuesTitle />
        {/* 2 per row from sm → xxl */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 gy-5 gx-5">
          {items.map((value) => (
            <SingleCoreValue key={value.title} {...value} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export const SingleCoreValue = ({
  icon: Icon,
  color,
  titleColor,
  watermark,
  title,
  text,
}) => (
  <div className="col d-flex">
    <div
      className="benefits-card position-relative d-flex flex-column w-100"
      style={{
        minHeight: 280, // SAME height for all cards
        padding: '1.5rem',
      }}
    >
      {/* Watermark */}
      <div
        className="corevalue-watermark"
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          fontSize: '5rem',
          fontWeight: 800,
          opacity: 0.04,
          lineHeight: '1',
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {watermark}
      </div>

      {/* Content */}
      <div className="position-relative py-5" style={{ zIndex: 2 }}>
        <div className="mb-3" style={{ width: 46, height: 46, flexShrink: 0 }}>
          <Icon size={46} color={color} variant="Bold" className="mb-3" />
        </div>

        <h6 className="text-uppercase mb-2" style={{ color: titleColor }}>
          {title}
        </h6>

        <p className="text-gray-700 mb-0">{text}</p>
      </div>
    </div>
  </div>
);

export default CoreValues;
