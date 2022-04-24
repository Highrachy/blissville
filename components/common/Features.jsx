import React from 'react';
import { features } from '@/data/features';
import classNames from 'classnames';
import Section from './Section';

const Features = () => (
  <Section>
    <div className="container">
      <div className="row">
        <h3 className="text-color-dark-1">Features of Blissville</h3>
        {features.map((benefit, index) => (
          <SingleFeature key={index} {...benefit} />
        ))}
      </div>
    </div>
  </Section>
);

const SingleFeature = ({ background, icon, title, text, lists }) => (
  <div className="col-md-6 col-lg-4 mt-4">
    <div className="features-section h-100">
      <div className={`bg-icon bg-${background}`}>{icon}</div>
      <h5 className="text-uppercase mt-3 text-color-1">{title}</h5>
      <p className="">{text}</p>
      <ul>
        {lists.map((list, index) => (
          <li
            key={index}
            className={classNames('text-color-dark-2', background)}
          >
            {list}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
export default Features;
