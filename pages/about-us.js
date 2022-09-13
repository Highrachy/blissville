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
            The Leading Real Estate Company in Nigeria
          </h3>

          <p className="lead">
            Our Vision is to be a front runner in providing convenient and
            efficient housing thereby enhancing returns to our investors and
            property owners.
          </p>
        </div>
        <div className="col-md-5 col-lg-6">
          <Image
            src="/assets/img/property/property1.jpeg"
            alt="Hero Image"
            width={1024}
            height={768}
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
            <p className="mt-n4 mb-5">
              Our projects strategically aim at providing energy efficient
              luxury condos that are well within your grasp, thus presenting you
              with a rare combination of quality and affordability in a single
              package.
              <br /> <br />
              Our unique edifices do not simply cater for the affordability on
              procurement but also ensure that the living experience of the
              occupants is delightfully enhanced at minimum running and
              maintenance cost
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
                  and with architectural designs that respond imaginatively to
                  the cultural climatic and environmental conditions. In
                  reality, we do not just sell homes, we secure your future.
                  <br /> <br />
                  Over the next five years, we intend to progressively expand
                  our portfolio nationwide and provide similar housing solutions
                  suitable for strategically selected locations like Ibeju
                  Lekki, Porthharcourt, Uyo, Abuja and Kaduna.
                  <br /> <br />
                  Subscribe with us today and proceed to select from our vast
                  range of Floor tiles, Wall tiles, Paint colors, and other
                  finishes to customize your home into the haven that suits your
                  style.
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
