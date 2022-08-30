import React from 'react';
import Section from '../common/Section';
import SingleProperty from '../common/SingleProperty';

export const FeaturedProperties = () => (
  <Section>
    <div className="container mt-5">
      <h4 className="mb-4">Featured Properties</h4>
      <div className="row gy-4">
        <SingleProperty img="1" />
        <SingleProperty img="2" />
      </div>
    </div>
  </Section>
);
