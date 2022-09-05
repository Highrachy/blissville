import React from 'react';
import { benefits } from '@/data/benefits';
import Section from './Section';

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
  <div className="col d-flex align-items-stretch">
    <div className="benefits-card">
      <div className="bg-icon">{icon}</div>
      <h6 className="text-uppercase mt-4 mb-2 font-secondary text-color">
        {title}
      </h6>
      <p>{text}</p>
    </div>
  </div>
);

export default Benefits;
