import Image from 'next/image';
import React from 'react';
import { TestimonialQuote, TestimonialTopQuotes } from '../Icons/Icons';
import Section from './Section';
import classNames from 'classnames';

const Testimonials = () => (
  <Section altBg2>
    <div className="container">
      <div className="text-center">
        <TestimonialTopQuotes />
        <h3 className="text-color-dark-1 font-secondary mt-3 mb-5">
          What our customers are saying
        </h3>
      </div>
      <div className="row pt-5">
        <SingleTestimonial img="1" />
        <SingleTestimonial altBg img="2" />
        <SingleTestimonial img="3" />
      </div>
    </div>
  </Section>
);

const SingleTestimonial = ({ img, altBg }) => (
  <aside
    className={classNames('testimonial-listing col-lg-4 col-sm-12', { altBg })}
  >
    <div className="testimonial-listing__container">
      <div className="testimonial-listing__image">
        <Image
          src={`/assets/img/testimonials/${img}.jpeg`}
          alt="testimonials 1"
          width={120}
          height={120}
          className="rounded-circle image-cover"
        />
        <TestimonialQuote />
      </div>
      <div className="py-4">
        <p className="text-color-3">
          Though, we sell you homes, our ultimate target is to enhance your
          living experience with very reasonable financial consequences.
        </p>
        <h4 className="text-secondary">Tolu Asabi</h4>
      </div>
    </div>
  </aside>
);

export default Testimonials;
