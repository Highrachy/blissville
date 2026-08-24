/**
 * =============================================================================
 * Construction Log Galleries
 * =============================================================================
 */

import { BVT3DImages } from './renders';
import { CLCImages } from './community';
import { BVTInterior } from './interior';
import { CLCWellness } from './wellness';

export const PROJECT_GALLERIES = [
  {
    type: 'primary',
    id: 'renders',
    filter: 'renders',
    title: '3D Renders',
    date: '',
    heading: 'Designed Before\nIt Was Built',
    subheading: 'Architectural Vision',
    description:
      'Every exceptional home begins with thoughtful design. These architectural visualizations reveal the vision behind Blissville Terraces, where contemporary architecture, efficient layouts, and timeless finishes come together to create homes that are beautiful to own, comfortable to live in, and built to retain lasting value.',
    images: BVT3DImages,
  },

  {
    type: 'alt',
    id: 'community',
    filter: 'community',
    title: 'Masterplan & Amenities',
    date: '',
    heading: 'Life Beyond\nYour Front Door',
    subheading: 'Caribbean Lake City',
    description:
      'Your home extends far beyond your front door. Wide landscaped streets, secure entrances, family parks, beautiful public spaces, and a thoughtfully planned neighbourhood create an environment where residents can enjoy peace of mind, stronger community, and a better quality of life every day.',
    images: CLCImages,
    reversed: true,
  },

  {
    type: 'primary',
    id: 'interior',
    filter: 'interior',
    title: 'Proposed Interior Design',
    date: '',
    heading: 'Crafted For\nModern Living',
    subheading: 'Luxury From Within',
    description:
      'These 3D renders showcase the proposed interior design for Blissville Terraces, illustrating how premium finishes, functional kitchens, and elegant bedrooms could come together to create practical, beautiful spaces for modern living.',
    images: BVTInterior,
  },

  {
    type: 'alt',
    id: 'wellness',
    filter: 'wellness',
    title: 'Wellness & Lifestyle',
    date: '',
    heading: 'Wellness For\nEveryday Living',
    subheading: 'Resort-Inspired Experiences',
    description:
      'A truly exceptional community supports every part of your lifestyle. Relax by the waterfront, spend time with family in beautifully landscaped parks, stay active in the wellness centre, or simply unwind by the pool. Every amenity has been carefully planned to help residents live healthier, happier, and more connected lives.',
    images: CLCWellness,
    reversed: true,
  },
];

export default PROJECT_GALLERIES;
