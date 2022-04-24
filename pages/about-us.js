import React from 'react';
import Section from '@/components/common/Section';
import Image from 'next/image';
import Navigation from '@/components/layouts/Navigation';
import OurInvestors from '@/components/common/OurInvestors';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import Benefits from '@/components/common/Benefits';

export default function Home() {
  return (
    <>
      <Navigation />
      <PageHeader
        title="About Blissville"
        bgImage="/assets/img/bg/about-us.jpeg"
      />
      <OurVision />
      <Benefits />
      <OurInvestors />
      <Footer />
    </>
  );
}

const OurVision = () => {
  return (
    <Section>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <h3 className="mt-3 mt-lg-6">Our Vision</h3>

            <p className="lead fw-bold">
              “To be a front runner in providing convenient and efficient
              housing thereby enhancing returns to our investors and property
              owners.”
            </p>

            <p className="mb-4">
              Our projects strategically aim at providing energy efficient
              luxury condos that are well within your grasp, thus presenting you
              with a rare combination of quality and affordability in a single
              package.
            </p>

            <p className="mb-4">
              Our unique edifices do not simply cater for the affordability on
              procurement but also ensure that the living experience of the
              occupants is delightfully enhanced at minimum running and
              maintenance cost and with architectural designs that respond
              imaginatively to the cultural climatic and environmental
              conditions. In reality, we do not just sell homes, we secure your
              future.
            </p>

            <p className="mb-4">
              Over the next five years, we intend to progressively expand our
              portfolio nationwide and provide similar housing solutions
              suitable for strategically selected locations like Ibeju Lekki,
              Porthharcourt, Uyo, Abuja and Kaduna.
            </p>
          </div>
          <div className="col-md-5 col-lg-4">
            <div className="ps-3">
              <Image
                src="/assets/img/about-us/our-vision.png"
                alt="Hero Image"
                width={548}
                height={428}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
