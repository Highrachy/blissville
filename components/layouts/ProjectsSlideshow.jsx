import Image from 'next/image';
import React from 'react';
import SingleProject from '../common/SingleProject';

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
          <SingleProject />
        </div>
      </div>
    </section>
  );
};

export default OurProjects;
