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

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import 'swiper/css/effect-cube';

export const BenefitSlider = () => {
  return (
    <div className="container mb-5">
      <h3 className="my-4">Why Choose Blissville</h3>
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
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
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
            <SingleBenefits key={index} {...benefit} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const Benefits = ({ className, topThree }) => {
  const allBenefits = topThree ? benefits.slice(0, 3) : benefits;
  return (
    <Section className={className}>
      <div className="container">
        <h3 className="my-4">Why Choose Blissville</h3>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 gy-5 gx-5">
          {allBenefits.map((benefit, index) => (
            <SingleBenefits key={index} {...benefit} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export const SingleBenefits = ({ icon, title, text }) => (
  <div className="col h-100 d-flex align-items-stretch">
    <div className="benefits-card">
      <div className="bg-icon">{icon}</div>
      <h6 className="text-uppercase mt-4 mb-2 font-secondary text-primary">
        {title}
      </h6>
      <p className="text-gray-700">{text}</p>
    </div>
  </div>
);

export default Benefits;
