/**
 * =============================================================================
 * Construction Log Galleries
 * =============================================================================
 */

import { BVT3DImages } from './renders';
import { CLCImages } from './community';
import { BVTInterior } from './interior';

export const PROJECT_GALLERIES = [
  {
    type: 'primary',
    id: 'renders',
    filter: 'renders',
    title: '3D Renders',
    date: 'Design Phase',
    heading: 'Designed Before\nIt Was Built',
    subheading: 'Architectural Vision',
    description:
      'Every great development begins with a vision. These architectural visualizations capture the design intent, showcasing the timeless elegance, modern luxury, and waterfront lifestyle that define Blissville Terraces long before construction begins.',
    images: BVT3DImages,
  },

  {
    type: 'alt',
    id: 'community',
    filter: 'community',
    title: 'Masterplan & Amenities',
    date: 'Master-Planned Community',
    heading: 'Life Beyond\nYour Front Door',
    subheading: 'Caribbean Lake City',
    description:
      'Blissville Terraces is nestled within Caribbean Lake City—a thoughtfully planned waterfront destination featuring landscaped boulevards, recreational spaces, premium amenities, and a vibrant environment designed for exceptional everyday living.',
    images: CLCImages,
    reversed: true,
  },
  {
    type: 'primary',
    id: 'interior',
    filter: 'interior',
    title: 'Interior Design',
    date: 'Interior Preview',
    heading: 'Crafted For\nModern Living',
    subheading: 'Luxury From Within',
    description:
      'Every interior is carefully designed to combine elegance, comfort, and functionality. From spacious living areas to beautifully finished kitchens and bedrooms, every detail has been curated to create a refined living experience.',
    images: BVTInterior,
  },
];

export default PROJECT_GALLERIES;
