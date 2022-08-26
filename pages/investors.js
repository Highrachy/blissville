import React from 'react';
import Image from 'next/image';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import classNames from 'classnames';
import Button from '@/components/forms/Button';
import InvestorSlider from '@/components/common/InvestorSlider';
import Section from '@/components/common/Section';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import { benefits } from '@/data/benefits';

export default function Home() {
  return (
    <>
      <Navigation />
      <PageHeader
        title="Investors"
        subHeader="INVEST TODAY AND WATCH YOUR MONEY GROW..."
        bgImage="/assets/img/bg/investors.jpeg"
      />
      <InvestToday />
      <InvestmentOverview />
      <AnnualGrowth />
      <InvestmentCards />
      <MidTermForecast />
      <ScheduleVisit />
      <Footer />
    </>
  );
}

export const InvestToday = () => (
  <Section>
    <div className="container">
      <div className="row">
        <div className="col-md-7 col-lg-7">
          <h3 className="mt-3 mt-lg-6">Invest Today</h3>

          <p className="">
            Our investors comprise of a selected group of elite personalities
            that includes professionals in various works of life; Lawyers,
            manufacturers, agriculturalists, bankers, businessmen, and the list
            goes on.
          </p>

          <p className="mb-5">
            The unique thing about our investors is that they are very erudite &
            exposed individuals that can tell the difference between mediocre
            and true quality, words and actions.
          </p>

          <Button color="primary">Learn More</Button>
        </div>
        <div className="col-md-5 col-lg-5">
          <InvestorSlider />
        </div>
      </div>
    </div>
  </Section>
);

const InvestmentOverview = () => {
  return (
    <section>
      <div className="container">
        <h3 className="mt-3 mt-lg-6">Investment Overview</h3>
        <div className="row">
          <div className="col-md-6">
            <p className="mb-5">
              Our projects strategically aim at providing energy efficient
              luxurious condominiums for the ever growing middle class within
              the Lekki suburbs. We aim to continually avail this market segment
              with unique edifices that are affordable to acquire and
              conveniently manage, while they enjoy the luxuries available in
              today’s real estate industry. Seasoned industry experts diligently
              working with proven project management methodologies will handle
              the day to day conceptualization, planning, execution and control
              of the projects.
            </p>
          </div>
          <div className="col-md-6">
            <p className="mb-5">
              We forecast that our initial projects will have a future valuation
              greater than N1.3B and an exit value of approximately N1.2B. We
              are seeking investments ranging from N65M to N200M and more to be
              disbursed as required by our projects over the next 24months. Once
              initiated, our projects are modeled to finance themselves via cash
              flow. We seek investors who share our vision of enhancing lives
              and the environment by providing energy efficient residential
              dwellings, and are willing to benefit from our exciting pipeline
              of projects by keying in at this inception stage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const AnnualGrowth = () => {
  return (
    <Section>
      <div className="container">
        <div className="row">
          <div className="col-md-5 col-lg-6">
            <div className="ms-n5">
              <Image
                src="/assets/img/home/cuate.svg"
                alt="Hero Image"
                width={601}
                height={564}
              />
            </div>
          </div>
          <div className="col-md-7 col-lg-6">
            <h3 className="mt-3 mt-lg-6">Annual Revenue Growth of over 200%</h3>

            <p className="lead">
              Our promise to our investors is to continually grow your wealth
              with strategically analyzed real estate projects that yields juicy
              returns.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

const MidTermForecast = () => {
  return (
    <Section>
      <div className="container">
        <div className="row">
          <div className="col-md-7 col-lg-7">
            <h3 className="mt-3 mt-lg-6">Mid-Term Forecast</h3>

            <p className="">
              Informed by our research results and projections, we intend to run
              at least 3 Blissvile Estates within the Lagos metropolis. This
              provides a platform to boost our brand recognition and introduce a
              broader range of products and services to the market.
            </p>

            <p className="mb-5">
              These include but are not limited to;
              <ul>
                <li>Facility Management services</li>
                <li>Procurement and supply channels</li>
                <li>Recreational and capacity building services</li>
              </ul>
            </p>
          </div>
          <div className="col-md-5 col-lg-5">
            <Image
              src="/assets/img/home/cuate.svg"
              alt="Hero Image"
              width={601}
              height={564}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

const InvestmentCards = () => (
  <Section>
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 gy-5 gx-5">
        {benefits.map((benefit, index) => (
          <SingleInvestmentCard key={index} {...benefit} />
        ))}
      </div>
    </div>
  </Section>
);

const SingleInvestmentCard = ({ icon, title, text }) => (
  <div className="col d-flex align-items-stretch">
    <div className="benefits-card">
      <div className="bg-icon">{icon}</div>
      <h6 className="text-uppercase mt-4 mb-2 font-secondary text-color">
        {title}
      </h6>
      <p className="text-xl fw-bold">{text}</p>
    </div>
  </div>
);
