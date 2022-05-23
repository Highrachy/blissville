import Image from 'next/image';
import React from 'react';
import { TestimonialQuote, TestimonialTopQuotes } from '../Icons/Icons';
import Section from './Section';
import classNames from 'classnames';
import { testimonials } from '@/data/testimonials';
import Link from 'next/link';

export const TestimonialSection = () => (
  <Section altBg2>
    <div className="container">
      <div className="text-center">
        <TestimonialTopQuotes />
        <h3 className="text-color-dark-1 font-secondary mt-3 mb-5">
          What our customers are saying
        </h3>
      </div>
      <div className="row pt-5">
        <Testimonials topThree />
      </div>
      <div className="text-center">
        <Link href="/testimonials" passHref>
          <a className="text-secondary">View All Reviews</a>
        </Link>
      </div>
    </div>
  </Section>
);

const Testimonials = ({ topThree }) => {
  //get first top three testimonials in an array
  const allTestimonials = topThree ? testimonials.slice(0, 3) : testimonials;
  return allTestimonials.map((testimonial, index) => (
    <SingleTestimonial
      key={index}
      {...testimonial}
      altBg={!topThree || index % 2 === 1}
    />
  ));
};

const SingleTestimonial = ({ image, name, testimonial, altBg }) => (
  <aside className="col-lg-4 col-sm-12">
    <div
      className={classNames('testimonial-listing', {
        altBg: altBg,
      })}
    >
      <div className="testimonial-listing__container">
        <div className="testimonial-listing__image">
          <Image
            src={`/assets/img/${
              image ? `testimonials/${image}` : `avatars/default.png`
            }`}
            alt={name}
            width={100}
            height={100}
            className="rounded-circle image-cover"
          />
          <TestimonialQuote />
        </div>
        <div className="py-4">
          <p className="text-color-3">{testimonial}</p>
          <h6 className="text-secondary">{name}</h6>
        </div>
      </div>
    </div>
  </aside>
);

export default Testimonials;
