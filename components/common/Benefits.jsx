import React from 'react';
import { benefits } from '@/data/benefits';
import Section from './Section';

// Import Swiper styles
import {
  Pagination,
  // Navigation as NavigationSwiper,
  Autoplay,
  A11y,
} from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

// import 'swiper/css/effect-cube';

export const BenefitSlider = () => {
  return (
    <Section>
      <div className="container">
        <h4 className="my-4">Why Choose Blissville</h4>
        <Swiper
          // install Swiper modules
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
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log('slide change')}
          // slidesPerGroup={3}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            991: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          loop={true}
          loopFillGroupWithBlank={true}
          grabCursor={true}
        >
          {benefits.map((benefit, index) => (
            <SwiperSlide key={index}>
              <div className="h-100">
                <SingleBenefit key={index} {...benefit} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  );
};

const Benefits = ({ className, topThree }) => {
  const allBenefits = topThree ? benefits.slice(0, 3) : benefits;
  return (
    <Section className={className}>
      <div className="container">
        <h3 className="my-4">Why Choose Blissville</h3>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 gy-5 gx-5">
          {allBenefits.map((benefit) => (
            <SingleBenefit key={benefit.title} {...benefit} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export const SingleBenefit = ({
  icon: Icon,
  color,
  titleColor,
  title,
  text,
}) => (
  <div className="col d-flex">
    <div className="benefits-card position-relative d-flex flex-column h-100 p-3">
      {/* CONTENT */}
      <div className="position-relative py-5" style={{ zIndex: 2 }}>
        <div className="mb-3" style={{ width: 46, height: 46 }}>
          <Icon size={46} color={color} variant="Bulk" className="mb-3" />
        </div>

        <h6
          className="text-uppercase mb-2 font-secondary"
          style={{ color: titleColor }}
        >
          {title}
        </h6>

        <p className="text-gray-700 mb-0">{text}</p>
      </div>
    </div>
  </div>
);
export default Benefits;
