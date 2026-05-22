import React from 'react';
import Section from '../common/Section';
import SingleProperty from '../common/SingleProperty';

export const FeaturedProperties = ({ properties, title }) =>
  properties?.length > 0 && (
    <Section noPaddingBottom>
      <div className="container">
        <div className="featured-properties-header mb-5 text-center text-md-start">
          <h4 className="section-title fw-bold mb-2">{title || 'Featured Properties'}</h4>
        </div>
        <div className="row gy-4 gy-lg-5">
          {properties.map((property, index) => (
            <SingleProperty key={index} {...property} />
          ))}
        </div>
      </div>
    </Section>
  );
