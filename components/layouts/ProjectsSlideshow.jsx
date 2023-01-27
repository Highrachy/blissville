import React from 'react';
import SingleProject from '../common/SingleProjectNew';

import { Pagination, Autoplay, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

const OurProjects = ({ projects, title }) => {
  if (!projects || projects?.length === 0) return null;
  return (
    <section
      className="bg-image-top"
      style={{ backgroundImage: 'url("/assets/img/bg/bg-projects.jpg")' }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h3 className="mb-5 mt-4 mt-md-7">{title || 'Our Projects'}</h3>
          </div>
        </div>
        <div className="row">
          {projects?.length > 1 ? (
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
              loop={true}
            >
              {projects.map((project, index) => (
                <SwiperSlide key={project.attributes.name + index}>
                  <SingleProject {...project} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <SingleProject {...projects[0]} />
          )}
        </div>
      </div>
    </section>
  );
};

export default OurProjects;
