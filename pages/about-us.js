/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Section from '@/components/common/Section';
import Image from 'next/image';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import Benefits from '@/components/common/Benefits';
import Team from '@/components/common/Team';
import StrategicRelationships from '@/components/layouts/StrategicRelationships';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import useWindowSize from '@/hooks/useWindowSize';

export default function AboutUs() {
  return (
    <>
      <Navigation />
      <PageHeader
        title="About Blissville"
        bgImage="/assets/img/bg/about-us.jpeg"
      />
      <IntroText />
      <CEOSpeech />
      <Benefits />
      <Team />
      <StrategicRelationships />
      <ScheduleVisit />
      <Footer />
    </>
  );
}

const IntroText = () => (
  <Section>
    <div className="container">
      <div className="row">
        <div className="col-md-7 col-lg-6">
          <h3 className="mt-3 mt-lg-6">
            The Leading Real Estate brand that avails you with true value.
          </h3>

          <p className="lead">
            Our Vision is to be industry leader in providing convenient and
            efficient housing in the African market thereby enhancing returns to
            our investors and property owners.
          </p>
        </div>
        <div className="col-md-5 col-lg-6">
          <Image
            src="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-1-front.jpg"
            alt="Hero Image"
            width={1800}
            height={1440}
          />
        </div>
      </div>
    </div>
  </Section>
);

const CEOSpeech = () => {
  const { width } = useWindowSize();
  const isMobile = width <= 991;
  const [showReadMore, setShowReadMore] = React.useState(true);

  return (
    <Section altBg>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-4">
            <div className="ms-n5 d-none d-md-block">
              <Image
                src="/assets/img/team/ceo.png"
                alt="Hero Image"
                width={400}
                height={506}
              />
            </div>
          </div>
          <div className="col-md-8 col-lg-8">
            <p className="mt-md-n4 mb-5">
              Our projects strategically aim at providing energy efficient
              premium homes that are well within your grasp, thus presenting you
              with a rare combination of quality and affordability in a single
              package.
              <br /> <br />
              You will enjoy a distinctive home that not only saves on
              procurement costs but also ensures minimal running and maintenance
              expenses.&nbsp;
              {isMobile && showReadMore ? (
                <>
                  ...
                  <div
                    className="text-primary fw-bold mt-2"
                    onClick={() => setShowReadMore(false)}
                  >
                    {' '}
                    Read more
                  </div>
                </>
              ) : (
                <>
                  With architectural designs that creatively adapt to cultural,
                  climatic, and environmental conditions, your new home will not
                  only meet but exceed your expectations.
                  <br /> <br />
                  Over the next five years, you can look forward to more housing
                  solutions in strategically selected locations such as Ibeju
                  Lekki, Port Harcourt, Uyo, Abuja, and Kaduna, expanding your
                  options across the nation.
                  <br /> <br />
                  Subscribe today and take the first step in customizing your
                  home with our extensive range of floor tiles, wall tiles,
                  paint colors, and other finishes, transforming your space into
                  a haven that reflects your unique style.
                </>
              )}
            </p>

            <Image
              src="/assets/img/team/ceo-sign.png"
              alt="Ceo Signature"
              width={138}
              height={30}
            />
            <h5>Nnamdi Ijei</h5>
            <h6>Company CEO</h6>
          </div>
        </div>
      </div>
    </Section>
  );
};
