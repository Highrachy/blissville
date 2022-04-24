import React from 'react';
import { benefits } from '@/data/benefits';
import Section from './Section';
import classNames from 'classnames';

const Benefits = ({ className }) => (
  <Section className="bg-blue">
    <div className={classNames('container', className)}>
      <div className="row">
        <h3 className="font-secondary text-center text-color-dark-1">
          Benefits of Blissville
        </h3>
        {benefits.map((benefit, index) => (
          <SingleBenefits key={index} {...benefit} />
        ))}
      </div>
    </div>
  </Section>
);

const SingleBenefits = ({ background, icon, title, text }) => (
  <div className="col-md-6 col-lg-4 text-center px-5 mt-6 benefits-section">
    <div className={`bg-icon bg-${background}`}>{icon}</div>
    <h5 className="text-uppercase mt-3 text-color-1">{title}</h5>
    <p className="">{text}</p>
  </div>
);
export default Benefits;
