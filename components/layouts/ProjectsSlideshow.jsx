import Image from 'next/image';
import React from 'react';
import SingleProject from '../common/SingleProject';

import { Pagination, Navigation, Autoplay, A11y, EffectCube } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const OurProjects = () => {
  return (
    <section
      className="bg-image-top"
      style={{ backgroundImage: 'url("/assets/img/bg/bg-projects.jpg")' }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h3 className="mb-5 mt-4 mt-md-7">Our Projects</h3>
          </div>
        </div>
        <div className="row">
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
            loop={true}
          >
            <SwiperSlide key="1">
              <SingleProject type="1" />
            </SwiperSlide>
            <SwiperSlide key="2">
              <SingleProject type="2" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default OurProjects;
