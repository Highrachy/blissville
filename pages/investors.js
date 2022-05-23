import React from 'react';
import Image from 'next/image';
import Navigation from '@/components/layouts/Navigation';
import OurInvestors from '@/components/common/OurInvestors';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import classNames from 'classnames';
import Button from '@/components/forms/Button';

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
      <ProjectHighlights />
      <MidTermForecast />
      <OurInvestors />
      <Footer />
    </>
  );
}

const InvestToday = () => {
  return (
    <section className="mt-5">
      <InvestmentSection
        title="Invest Now"
        img={{
          src: '/assets/img/investors/your-income.png',
          alt: 'Hero Image',
          width: 410,
          height: 397,
        }}
      >
        <p>
          Our investors comprise of a selected group of elite personalities that
          includes professionals in various walks of life;
        </p>

        <ul className="my-4 row circle-tick">
          <li className="col-md-6">Lawyers</li>
          <li className="col-md-6">Agriculturalists</li>
          <li className="col-md-6">Manufacturers</li>
          <li className="col-md-6">Bankers</li>
          <li className="col-md-6">Businessmen</li>
          <li className="col-md-6">And many more...</li>
        </ul>

        <p className="mb-4">
          The unique thing about our investors is that they are very erudite and
          exposed individuals that can tell the difference between mediocre and
          true quality, words and actions.
        </p>
        <p className="mb-4 fw-bold lead">
          Our promise to our investors is to continually grow your wealth with
          strategically analyzed real estate projects that yields juicy returns.
        </p>
      </InvestmentSection>
      <InvestmentSection
        img={{
          src: '/assets/img/investors/your-income-2.png',
          alt: 'Hero Image',
          width: 410,
          height: 312,
        }}
      >
        <p className="mb-2">
          Blissville Condos are without a doubt one of the most viable real
          estate investments opportunities in the country today as
        </p>

        <p className="mb-4 lead fw-bold">
          We avail our esteemed investors with wonderful returns of over 22%
          p.a.{' '}
        </p>
        <p className="mb-2">
          Our esteemed investors also have the opportunity to convert their
          investments into real estate units of their choice and still enjoy
          juicy double digit discounts.
        </p>

        <p className="mb-4 lead fw-bold">
          Investments are structured as a loan investment with a projected yield
          of up to 40% in 18 months.
        </p>
        <InvestButton />
      </InvestmentSection>
    </section>
  );
};

const InvestmentOverview = () => {
  return (
    <section className="position-relative bg-blue">
      <InvestmentSection
        title="Investment Overview"
        img={{
          src: '/assets/img/investors/investment-overview.png',
          alt: 'Hero Image',
          width: 498,
          height: 304,
        }}
      >
        <p>
          Our projects strategically aim at providing energy efficient luxurious
          condominiums for the ever growing middle class within the Lekki
          suburbs. We aim to continually avail this market segment with unique
          edifices that are affordable to acquire and conveniently manage, while
          they enjoy the luxuries available in today’s real estate industry.
        </p>
        <p className="mb-4">
          Seasoned industry experts diligently working with proven project
          management methodologies will handle the day to day conceptualization,
          planning, execution and control of the projects. Seasoned industry
          experts diligently working with proven project management
          methodologies will handle the day to day conceptualization, planning,
          execution and control of the projects. These experts include;{' '}
        </p>
        <ul className="my-4 row circle-tick">
          <li className="col-md-6">Project Managers</li>
          <li className="col-md-6">Structural Engineers</li>
          <li className="col-md-6">Building Engineers</li>
          <li className="col-md-6">Electrical Engineers</li>
          <li className="col-md-6">And many more...</li>
        </ul>
        <p className="mb-4 fw-bold lead">
          Truth be told, we do not just sell homes, we provide peace of mind to
          our stakeholders.
        </p>
      </InvestmentSection>
      <InvestmentSection
        img={{
          src: '/assets/img/investors/investment-overview-2.png',
          alt: 'Hero Image',
          width: 507,
          height: 377,
        }}
      >
        <p className="mb-2">
          We intend to continuously and progressively expand our portfolio
          nationwide over the next five years and provide similar housing
          solutions suitable for strategically selected locations like Ibeju
          Lekki, Portharcourt, Uyo, Abuja and Kaduna.
        </p>

        <p className="mb-4 lead fw-bold">
          We forecast that our initial projects will have a future valuation
          greater than N1.3B and an exit value of approximately N1.2B. We are
          seeking investments ranging from N65M to N200M and more to be
          disbursed as required by our projects over the next 24months.
        </p>
        <p className="mb-2">
          Once initiated, our projects are modeled to finance themselves via
          cash flow. We seek investors who share our vision of enhancing lives
          and the environment by providing energy efficient residential
          dwellings, and are willing to benefit from our exciting pipeline of
          projects by keying in at this inception stage.
        </p>

        <InvestButton />
      </InvestmentSection>
    </section>
  );
};

const ProjectHighlights = () => {
  return (
    <section className="my-6">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h5>Project Highlights</h5>
            <p>
              The Blissville Condominiums Lifestyle housing estates will be
              introduced into the market using two (2) kick-off projects;
            </p>
          </div>
          <div className="col-md-6">
            <aside className="border-bottom">
              <h4>Project 1</h4>
              <p className="">
                A 1,400M2 expanse of land (Identified) situate within the
                suburbs of Lekki, valued at N65M.
              </p>
            </aside>
            <aside className="border-bottom">
              <h4>Project 2</h4>
              <p className="">
                At least 3,000M2 expanse of land within the suburbs of Lekki,
                with a projected value less than N200M.
              </p>
            </aside>
            <p className="">
              Once initiated, our projects are modeled to finance themselves via
              cash flow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const MidTermForecast = () => {
  return (
    <section className="mt-5">
      <InvestmentSection
        title="Invest Now"
        img={{
          src: '/assets/img/investors/mid-term-forecast.png',
          alt: 'Hero Image',
          width: 512,
          height: 389,
        }}
      >
        <p>
          Informed by our research results and projections, we intend to run at
          least 3 Blissvile Estates within the Lagos metropolis. This provides a
          platform to boost our brand recognition and introduce a broader range
          of products and services to the market.
        </p>

        <ul className="my-4 row circle-tick">
          <li>
            <span>Facility Management Services</span>
          </li>
          <li>Procurement and Supply Channels </li>
          <li>Recreational and Capacity Building Services</li>
        </ul>
      </InvestmentSection>
    </section>
  );
};

const InvestButton = () => (
  <Button color="primary" className="mt-3">
    Invest Now
  </Button>
);

const InvestmentSection = ({ children, title, img }) => (
  <section className="pb-6">
    <div className="container">
      <div className="row align-items-center">
        <div className={classNames('col-md-6', { 'order-1': !title })}>
          {title && <h3 className="mt-3 mt-lg-6">{title}</h3>}

          {children}
        </div>
        <div
          className={classNames('col-md-6', {
            'order-0 pe-7': !title,
            'ps-7': !!title,
          })}
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
          />
        </div>
      </div>
    </div>
  </section>
);
