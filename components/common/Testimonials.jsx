import Image from 'next/image';
import React from 'react';
import { TestimonialQuote, TestimonialTopQuotes } from '../Icons/Icons';
import Section from './Section';
import classNames from 'classnames';
import { testimonials } from '@/data/testimonials';
import { QuoteUp } from 'iconsax-react';
import { Roll, Slide, Zoom } from 'react-reveal';

export const TestimonialSection = () => (
  <Section altBg>
    <div className="container">
      <div className="text-center">
        <Roll left>
          <QuoteUp size="64" color="#446cb2" variant="Bold" />
        </Roll>
        <Slide left>
          <h3 className="mt-3">What our customers are saying</h3>
        </Slide>
      </div>
      <div className="row pt-5">
        <OneTestimonial {...testimonials[0]} />
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
          <Zoom>
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
          </Zoom>
        </div>
        <div className="py-4">
          <Slide right>
            <p className="text-gray-700 lead mb-5">{testimonial}</p>
            <h6 className="text-primary">{name}</h6>
          </Slide>
        </div>
      </div>
    </div>
  </aside>
);

const OneTestimonial = ({ image, name, testimonial, altBg }) => (
  <aside className="text-center">
    <div className="testimonial-listing__container col-lg-5  col-md-6 col-sm-8 col-10 mx-auto">
      <div className="testimonial-listing__image">
        <Slide left>
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
        </Slide>
      </div>
      <div className="py-5">
        <Slide right>
          <p className="text-gray-800 lead mb-4">{testimonial}</p>
          <h6 className="text-primary">{name}</h6>
        </Slide>
      </div>
    </div>
  </aside>
);

export default Testimonials;
