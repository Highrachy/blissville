import { properties } from '@/data/properties';
import React from 'react';
import Section from '../common/Section';
import SinglePropertyNew from '../common/SinglePropertyNew';

export const FeaturedProperties = ({ properties, title }) =>
  properties?.length > 0 && (
    <Section noPaddingBottom>
      <div className="container">
        <h4 className="mb-4">{title || 'Featured Properties'}</h4>
        <div className="row gy-4">
          {properties.map((property, index) => (
            <SinglePropertyNew key={index} {...property} />
          ))}
        </div>
      </div>
    </Section>
  );
