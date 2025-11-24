import React from 'react';
import { coreValues } from '@/data/core-values';
import Section from './Section';

// Swiper
import { Pagination, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

export const CoreValuesSlider = () => {
  return (
    <Section>
      <div className="container">
        <h4 className="my-4">The QWIS Difference: Our Core Values</h4>

        <Swiper
          modules={[Autoplay, Pagination, A11y]}
          autoHeight={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          navigation={false}
          slidesPerView={1}
          spaceBetween={10}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            991: { slidesPerView: 3, spaceBetween: 50 },
          }}
          loop={true}
          loopFillGroupWithBlank={true}
          grabCursor={true}
        >
          {coreValues.map((value, index) => (
            <SwiperSlide key={index}>
              <SingleCoreValue {...value} />
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
        <h3 className="my-4">The QWIS Difference: Our Core Values</h3>

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
    <div className="benefits-card position-relative d-flex flex-column h-100 p-3">
      {/* Watermark (inside the card so it shows) */}
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

      {/* Card Content */}
      <div className="position-relative py-5" style={{ zIndex: 2 }}>
        <Icon size={46} color={color} variant="Bold" className="mb-3" />

        <h6
          className="text-uppercase mb-2 font-secondary"
          style={{ color: titleColor }}
        >
          {title}
        </h6>

        <p className="text-gray-700 mb-0 flex-grow-1">{text}</p>
      </div>
    </div>
  </div>
);

export default CoreValues;
