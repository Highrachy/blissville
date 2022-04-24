import React from 'react';
import { benefits } from '@/data/benefits';

const Benefits = () => (
  <section className="position-relative bg-blue my-7 py-7">
    <div className="container">
      <div className="row">
        <h3 className="font-secondary text-center text-color-dark-1">
          Benefits of Blissville
        </h3>
        {benefits.map((benefit, index) => (
          <SingleBenefits key={index} {...benefit} />
        ))}
      </div>
    </div>
  </section>
);

const SingleBenefits = ({ background, icon, title, text }) => (
  <div className="col-md-6 col-lg-4 text-center px-5 mt-6 benefits-section">
    <div className={`bg-icon bg-${background}`}>{icon}</div>
    <h5 className="text-uppercase mt-3 text-color-1">{title}</h5>
    <p className="">{text}</p>
  </div>
);
export default Benefits;
