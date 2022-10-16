import { properties } from '@/data/properties';
import React from 'react';
import Section from '../common/Section';
import SingleProperty from '../common/SingleProperty';
import SinglePropertyNew from '../common/SinglePropertyNew';

export const FeaturedProperties = ({ properties }) =>
  properties?.length > 0 ? (
    <Section>
      <div className="container mt-5">
        <h4 className="mb-4">Featured Properties</h4>
        <div className="row gy-4">
          {properties.map((property, index) => (
            <SinglePropertyNew key={index} {...property} />
          ))}
        </div>
      </div>
    </Section>
  ) : (
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
