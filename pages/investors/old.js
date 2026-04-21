import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import Button from '@/components/forms/Button';
import InvestorSlider from '@/components/common/InvestorSlider';
import Section from '@/components/common/Section';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import useWindowSize from '@/hooks/useWindowSize';
import { Slide } from 'react-reveal';
import { TestimonialSection } from '@/components/common/Testimonials';
import SeoHead from '@/components/utils/SeoHead';
import { trackEvent } from '@/utils/ga';

const VARIANTS = {
  A: {
    heading: 'Invest Today',
    paragraph1:
      'Our investors comprise of a selected group of elite personalities that includes professionals in various works of life; Lawyers, manufacturers, agriculturalists, bankers, businessmen, and the list goes on.',
    paragraph2:
      'The unique thing about our investors is that they are very erudite & exposed individuals that can tell the difference between mediocre and true quality, words and actions.',
    primaryCta: 'Apply Now',
  },

  B: {
    heading: 'Why Experienced Investors Choose Blissville',
    paragraph1:
      'Blissville investors are seasoned professionals who understand long-term value, disciplined execution, and the importance of structured real estate investments.',
    paragraph2:
      'They recognize that sustainable wealth is built through well-planned projects, clear timelines, and proven delivery, not speculation or empty promises.',
    paragraph3:
      'This approach allows investors to grow capital confidently while managing risk.',
    primaryCta: 'Become an Investor',
  },
};

export default function Investors() {
  return (
    <>
      <Navigation />
      <SeoHead
        title="Investors | Real Estate Investment Opportunities in Lagos | Blissville by Highrachy"
        description="Invest with Blissville by Highrachy and watch your money grow. Explore exclusive real estate investment opportunities in Lagos with annual growth rates exceeding 200%."
        canonical="https://www.blissville.com.ng/investors"
        ogImage="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-2-front.jpg"
        keywords={[
          'Real estate investment Lagos',
          'Blissville investors',
          'Highrachy investment opportunities',
          'Property investment Nigeria',
          'Invest in Blissville Lagos',
          'Luxury real estate Nigeria',
          'Best investment opportunities Lagos',
          'Affordable real estate returns',
          'Highrachy real estate investors',
          'Property wealth growth Nigeria',
        ]}
      />
      <PageHeader
        title="Investors"
        subHeader="INVEST TODAY AND WATCH YOUR MONEY GROW..."
        bgImage="/assets/img/bg/investment.jpg"
      />
      <InvestToday />
      <AnnualGrowth />
      <InvestmentOverview />
      <TestimonialSection />
      <InvestmentCards />
      <MidTermForecast />
      <ScheduleVisit />
      <Footer />
    </>
  );
}

export const InvestToday = ({ showButton }) => {
  const [variantKey, setVariantKey] = useState(null);

  // 🔒 prevents double assignment in StrictMode
  const hasAssignedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (hasAssignedRef.current) return;

    hasAssignedRef.current = true;

    let storedVariant = localStorage.getItem('invest_today_variant');

    if (!storedVariant || !VARIANTS[storedVariant]) {
      storedVariant = Math.random() < 0.5 ? 'A' : 'B';
      localStorage.setItem('invest_today_variant', storedVariant);
    }

    setVariantKey(storedVariant);
  }, []);

  // Track impression ONCE
  useEffect(() => {
    if (!variantKey) return;

    trackEvent({
      action: 'invest_today_variant_loaded',
      category: 'investor_ab_test',
      label: `variant_${variantKey}`,
    });
  }, [variantKey]);

  if (!variantKey) return null;

  const variant = VARIANTS[variantKey];

  return (
    <Section>
      <div className="container">
        <Slide left>
          <h3 className="mt-3 mt-lg-4 mb-4">{variant.heading}</h3>
        </Slide>

        <div className="row">
          <div className="col-md-7 col-lg-7 order-1 order-md-0">
            <Slide left>
              <div className="pe-md-5">
                <p className="lead">{variant.paragraph1}</p>

                <p className="lead mb-4">{variant.paragraph2}</p>

                {variant.paragraph3 && (
                  <p className="lead mb-4">{variant.paragraph3}</p>
                )}
              </div>
            </Slide>

            <Slide left>
              <>
                {showButton && (
                  <Button
                    href={`/investors`}
                    color="secondary"
                    className="mb-5 me-4"
                    onClick={() =>
                      trackEvent({
                        action: 'invest_today_learn_more_click',
                        category: 'investor_ab_test',
                        label: `variant_${variantKey}`,
                      })
                    }
                  >
                    Learn More
                  </Button>
                )}

                <Button
                  href={`/investors/apply`}
                  color="primary"
                  className="mb-5"
                  onClick={() =>
                    trackEvent({
                      action: 'invest_today_apply_click',
                      category: 'investor_ab_test',
                      label: `variant_${variantKey}`,
                    })
                  }
                >
                  {variant.primaryCta}
                </Button>
              </>
            </Slide>
          </div>

          <div className="col-md-5 col-lg-5 order-0 order-md-1 mb-5">
            <Image
              src="/assets/img/investors/smiling-investor.jpg"
              alt="Hero Image"
              width={800}
              height={800}
              className="img-cover rounded-2"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

const InvestmentOverview = () => {
  const { width } = useWindowSize();
  const isMobile = width <= 991;
  const [showReadMore, setShowReadMore] = React.useState(true);
  return (
    <Section>
      <div className="container">
        <h3>Investment Overview</h3>
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
              the day to day
              <span className="d-none d-md-inline">
                {' '}
                conceptualization, planning, execution and control of the
                projects.
                <br />
                <br />
                We forecast that our initial projects will have a future
                valuation greater than N1.3B and an exit value of approximately
                N1.2B. We are seeking investments ranging from N65M to N200M and
                more to be disbursed as required by our projects over the next
                24months. Once initiated, our projects are modeled to finance
                themselves via cash flow. We seek investors who share our vision
                of enhancing lives and the environment by providing energy
                efficient residential dwellings, and are willing to benefit from
                our exciting pipeline of projects by keying in at this inception
                stage.
              </span>
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
                <span className="mb-5 d-inline d-md-none">
                  conceptualization, planning, execution and control of the
                  projects.
                  <br />
                  <br />
                  We forecast that our initial projects will have a future
                  valuation greater than N1.3B and an exit value of
                  approximately N1.2B. We are seeking investments ranging from
                  N65M to N200M and more to be disbursed as required by our
                  projects over the next 24months. Once initiated, our projects
                  are modeled to finance themselves via cash flow. We seek
                  investors who share our vision of enhancing lives and the
                  environment by providing energy efficient residential
                  dwellings, and are willing to benefit from our exciting
                  pipeline of projects by keying in at this inception stage.
                </span>
              )}
            </p>
          </div>

          <div className="col-md-5 offset-md-1">
            <InvestorSlider />
          </div>
        </div>
      </div>
    </Section>
  );
};

const AnnualGrowth = () => {
  return (
    <Section altBg>
      <div className="container">
        <div className="row">
          <div className="col-md-5 col-lg-6">
            <Image
              src="/assets/img/property/property1.jpeg"
              alt="Hero Image"
              width={1024}
              className="rounded pe-md-3"
              height={768}
            />
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
        <h3 className="mt-3 mt-lg-6">Mid-Term Forecast</h3>
        <div className="row">
          <div className="col-md-6 col-lg-6">
            <p className="">
              Informed by our research results and projections, we intend to run
              at least 3 Blissvile Estates within the Lagos metropolis. This
              provides a platform to boost our brand recognition and introduce a
              broader range of products and services to the market.
            </p>

            <p className="mb-5">
              These include but are not limited to;
              <ul>
                <li>Procurement and supply channels</li>
                <li>Recreational and capacity building services</li>
              </ul>
            </p>
          </div>
          <div className="col-md-6 col-lg-6">
            <Image
              src="/assets/img/investors/mid-term-forecast.png"
              alt="Mid-Term Forecast"
              className="rounded"
              width={634}
              height={423}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

const InvestmentCards = () => (
  <div className="container mt-6">
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 gy-5 gx-5">
      {investments.map((investment, index) => (
        <SingleInvestmentCard key={index} {...investment} />
      ))}
    </div>
  </div>
);

const SingleInvestmentCard = ({ icon, title, price }) => (
  <div className="col d-flex align-items-stretch">
    <div className="benefits-card w-100">
      <div className="bg-icon">{icon}</div>
      <h6 className="text-uppercase mt-4 mb-2 font-secondary text-color">
        {title}
      </h6>
      <p className="text-xl fw-bold text-primary">₦ {price}</p>
    </div>
  </div>
);

const ExitValueIcon = () => (
  <svg
    width={56}
    height={56}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.4"
      d="M49.3093 18.2178V18.2233V37.7766C49.3093 41.6256 48.1698 44.4577 46.3018 46.3257C44.4338 48.1937 41.6016 49.3333 37.7527 49.3333H18.2227C14.3738 49.3333 11.5422 48.1938 9.67445 46.3237C7.80642 44.4533 6.66602 41.6153 6.66602 37.7533V18.2233C6.66602 14.3744 7.80556 11.5422 9.67356 9.67417C11.5416 7.80617 14.3738 6.66663 18.2227 6.66663H37.776C41.6253 6.66663 44.4567 7.80634 46.3213 9.67329C48.1855 11.5398 49.3199 14.3701 49.3093 18.2178Z"
      fill="#3A4451"
      stroke="#3A4451"
      strokeWidth={4}
    />
    <mask id="path-2-inside-1_1474_4450" fill="white">
      <path d="M16.0527 44.1C15.0961 44.1 14.3027 43.3067 14.3027 42.35V37.52C14.3027 36.5634 15.0961 35.77 16.0527 35.77C17.0094 35.77 17.8027 36.5634 17.8027 37.52V42.35C17.8027 43.33 17.0094 44.1 16.0527 44.1Z" />
    </mask>
    <path
      d="M16.0527 44.1C15.0961 44.1 14.3027 43.3067 14.3027 42.35V37.52C14.3027 36.5634 15.0961 35.77 16.0527 35.77C17.0094 35.77 17.8027 36.5634 17.8027 37.52V42.35C17.8027 43.33 17.0094 44.1 16.0527 44.1Z"
      fill="#3A4451"
    />
    <path
      d="M16.0527 40.1C17.3052 40.1 18.3027 41.0975 18.3027 42.35H10.3027C10.3027 45.5158 12.8869 48.1 16.0527 48.1V40.1ZM18.3027 42.35V37.52H10.3027V42.35H18.3027ZM18.3027 37.52C18.3027 38.7725 17.3052 39.77 16.0527 39.77V31.77C12.8869 31.77 10.3027 34.3542 10.3027 37.52H18.3027ZM16.0527 39.77C14.8003 39.77 13.8027 38.7725 13.8027 37.52H21.8027C21.8027 34.3542 19.2185 31.77 16.0527 31.77V39.77ZM13.8027 37.52V42.35H21.8027V37.52H13.8027ZM13.8027 42.35C13.8027 41.0862 14.8351 40.1 16.0527 40.1V48.1C19.1837 48.1 21.8027 45.5738 21.8027 42.35H13.8027Z"
      fill="#3A4451"
      mask="url(#path-2-inside-1_1474_4450)"
    />
    <mask id="path-4-inside-2_1474_4450" fill="white">
      <path d="M28 44.1C27.0433 44.1 26.25 43.3066 26.25 42.35V32.6666C26.25 31.71 27.0433 30.9166 28 30.9166C28.9567 30.9166 29.75 31.71 29.75 32.6666V42.35C29.75 43.33 28.9567 44.1 28 44.1Z" />
    </mask>
    <path
      d="M28 44.1C27.0433 44.1 26.25 43.3066 26.25 42.35V32.6666C26.25 31.71 27.0433 30.9166 28 30.9166C28.9567 30.9166 29.75 31.71 29.75 32.6666V42.35C29.75 43.33 28.9567 44.1 28 44.1Z"
      fill="#3A4451"
    />
    <path
      d="M28 40.1C29.2525 40.1 30.25 41.0975 30.25 42.35H22.25C22.25 45.5158 24.8342 48.1 28 48.1V40.1ZM30.25 42.35V32.6666H22.25V42.35H30.25ZM30.25 32.6666C30.25 33.9191 29.2525 34.9166 28 34.9166V26.9166C24.8342 26.9166 22.25 29.5008 22.25 32.6666H30.25ZM28 34.9166C26.7475 34.9166 25.75 33.9191 25.75 32.6666H33.75C33.75 29.5008 31.1658 26.9166 28 26.9166V34.9166ZM25.75 32.6666V42.35H33.75V32.6666H25.75ZM25.75 42.35C25.75 41.0861 26.7824 40.1 28 40.1V48.1C31.131 48.1 33.75 45.5738 33.75 42.35H25.75Z"
      fill="#3A4451"
      mask="url(#path-4-inside-2_1474_4450)"
    />
    <path
      d="M39.9453 44.1C38.9886 44.1 38.1953 43.3067 38.1953 42.35V27.8367C38.1953 26.88 38.9886 26.0867 39.9453 26.0867C40.902 26.0867 41.6953 26.88 41.6953 27.8367V42.35C41.6953 43.33 40.9253 44.1 39.9453 44.1Z"
      fill="#3A4451"
    />
    <path
      d="M41.6969 13.5799C41.6969 13.4632 41.6503 13.3232 41.6269 13.2066C41.6036 13.1132 41.5803 12.9966 41.5569 12.9032C41.5103 12.8099 41.4403 12.7399 41.3936 12.6466C41.3236 12.5532 41.2536 12.4366 41.1603 12.3666C41.1369 12.3432 41.1369 12.3199 41.1136 12.3199C41.0436 12.2732 40.9736 12.2499 40.9036 12.2032C40.8103 12.1332 40.6936 12.0632 40.5769 12.0166C40.4603 11.9699 40.3436 11.9699 40.2269 11.9466C40.1336 11.9232 40.0636 11.8999 39.9703 11.8999H33.1336C32.1769 11.8999 31.3836 12.6932 31.3836 13.6499C31.3836 14.6066 32.1769 15.3999 33.1336 15.3999H36.0503C30.4969 21.2332 23.4969 25.3399 15.6336 27.3232C14.7003 27.5566 14.1169 28.5132 14.3503 29.4466C14.5369 30.2399 15.2603 30.7766 16.0536 30.7766C16.1936 30.7766 16.3336 30.7532 16.4736 30.7299C24.8036 28.6532 32.2469 24.3366 38.1969 18.2232V20.4866C38.1969 21.4432 38.9903 22.2366 39.9469 22.2366C40.9036 22.2366 41.6969 21.4432 41.6969 20.4866V13.6499C41.6969 13.6266 41.6969 13.6032 41.6969 13.5799Z"
      fill="#3A4451"
    />
  </svg>
);

const InvestmentIcon = () => (
  <svg
    width={56}
    height={56}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.4"
      d="M42.3327 23.9867V40.6593C42.2969 43.9608 41.7913 45.2449 41.1247 45.8721C40.4228 46.5324 38.9909 47 35.5126 47H13.4861C9.94782 47 8.52777 46.5126 7.83832 45.8322C7.15812 45.161 6.66602 43.7814 6.66602 40.2967V23.9867C6.66602 20.8507 7.06664 19.4088 7.65966 18.6606C8.16345 18.025 9.15271 17.484 11.767 17.3275C12.3191 17.3046 12.8842 17.2833 13.4861 17.2833H35.5126C39.0509 17.2833 40.4709 17.7708 41.1604 18.4511C41.8406 19.1223 42.3327 20.5019 42.3327 23.9867Z"
      fill="#292D32"
      stroke="#3A4451"
      strokeWidth={4}
    />
    <path
      d="M49.3327 15.7033V32.0133C49.3327 35.1493 48.9321 36.5912 48.339 37.3394C48.0018 37.7649 47.447 38.148 46.3327 38.4017V23.9867C46.3327 20.5181 45.9381 17.546 43.9699 15.6039C42.011 13.6709 39.021 13.2833 35.5126 13.2833H13.7697C13.9553 11.4575 14.3683 10.6037 14.874 10.1279C15.5759 9.4676 17.0078 9 20.4861 9H42.5126C46.0509 9 47.4709 9.48743 48.1604 10.1678C48.8406 10.839 49.3327 12.2186 49.3327 15.7033Z"
      fill="#292D32"
      stroke="#3A4451"
      strokeWidth={4}
    />
    <path
      d="M16.24 43.3068H12.2266C11.2699 43.3068 10.4766 42.5134 10.4766 41.5568C10.4766 40.6001 11.2699 39.8068 12.2266 39.8068H16.24C17.1966 39.8068 17.99 40.6001 17.99 41.5568C17.99 42.5134 17.22 43.3068 16.24 43.3068Z"
      fill="#292D32"
    />
    <path
      d="M29.2845 43.3068H21.2578C20.3011 43.3068 19.5078 42.5134 19.5078 41.5568C19.5078 40.6001 20.3011 39.8068 21.2578 39.8068H29.2845C30.2412 39.8068 31.0345 40.6001 31.0345 41.5568C31.0345 42.5134 30.2645 43.3068 29.2845 43.3068Z"
      fill="#292D32"
    />
    <path
      d="M44.3327 27.6733H4.66602V31.1733H44.3327V27.6733Z"
      fill="#292D32"
    />
  </svg>
);

const ProjectCostIcon = () => (
  <svg
    width={56}
    height={56}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.6"
      d="M16.3327 11.3334H21.3359C21.3337 11.4444 21.3327 11.5555 21.3327 11.6667V16.6667H13.666V14C13.666 12.5379 14.8706 11.3334 16.3327 11.3334Z"
      fill="#292D32"
      stroke="#3A4451"
      strokeWidth={4}
    />
    <path
      d="M21.3327 44.3333C21.3327 46.1886 21.6591 47.8993 22.4334 49.3333H11.666C9.64097 49.3333 8.48954 48.8284 7.83023 48.1691C7.17092 47.5098 6.66602 46.3583 6.66602 44.3333V25.6666C6.66602 23.6416 7.17092 22.4901 7.83023 21.8308C8.48954 21.1715 9.64097 20.6666 11.666 20.6666H21.3327V44.3333ZM13.9993 43.4166C16.0606 43.4166 17.7493 41.7279 17.7493 39.6666V30.3333C17.7493 28.2721 16.0606 26.5833 13.9993 26.5833C11.9381 26.5833 10.2493 28.2721 10.2493 30.3333V39.6666C10.2493 41.7279 11.9381 43.4166 13.9993 43.4166Z"
      fill="#292D32"
      stroke="#3A4451"
      strokeWidth={4}
    />
    <path
      opacity="0.4"
      d="M32.6673 51.3333H30.334C25.6673 51.3333 23.334 49 23.334 44.3333V11.6666C23.334 6.99996 25.6673 4.66663 30.334 4.66663H44.334C49.0007 4.66663 51.334 6.99996 51.334 11.6666V44.3333C51.334 49 49.0007 51.3333 44.334 51.3333H42.0007"
      fill="#292D32"
    />
    <path
      d="M41.9993 42V51.3333H32.666V42C32.666 40.7166 33.716 39.6666 34.9993 39.6666H39.666C40.9493 39.6666 41.9993 40.7166 41.9993 42Z"
      fill="#292D32"
    />
    <path
      d="M32.666 32.0833C31.7093 32.0833 30.916 31.29 30.916 30.3333V18.6666C30.916 17.71 31.7093 16.9166 32.666 16.9166C33.6227 16.9166 34.416 17.71 34.416 18.6666V30.3333C34.416 31.29 33.6227 32.0833 32.666 32.0833Z"
      fill="#292D32"
    />
    <path
      d="M42 32.0833C41.0433 32.0833 40.25 31.29 40.25 30.3333V18.6666C40.25 17.71 41.0433 16.9166 42 16.9166C42.9567 16.9166 43.75 17.71 43.75 18.6666V30.3333C43.75 31.29 42.9567 32.0833 42 32.0833Z"
      fill="#292D32"
    />
  </svg>
);
const investments = [
  { icon: <InvestmentIcon />, title: 'Investment', price: '200,000,000' },
  { icon: <ProjectCostIcon />, title: 'Project Cost', price: '720,000,000' },
  { icon: <ExitValueIcon />, title: 'Exit Value', price: '1,200,000,000' },
];
