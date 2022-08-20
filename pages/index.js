import Footer from '@/components/common/Footer';
import { BathIcon, BedIcon, SizeIcon } from '@/components/Icons/Icons';
import OurInvestors from '@/components/common/OurInvestors';
import Overlay from '@/components/common/Overlay';
import Section from '@/components/common/Section';
import Button from '@/components/forms/Button';
import Navigation from '@/components/layouts/Navigation';
import Image from 'next/image';
import Link from 'next/link';
import { socialMediaLinks } from '../data';
import Benefits from '@/components/common/Benefits';
import { TestimonialSection } from '@/components/common/Testimonials';
import OurProjects from '@/components/layouts/OurProjects';
import ScheduleVisit from '@/components/common/ScheduleVisit';

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <ExecutiveSummary />
      <FeaturedProperties />
      <Benefits className="my-7" />
      <OurProjects />
      <InvestToday />
      <TestimonialSection />
      <ScheduleVisit />
      <Footer />
    </>
  );
}

const HeroSection = () => (
  <section className="position-relative">
    <Image
      src="/assets/img/home/hero.jpeg"
      alt="Hero Image"
      width={1500}
      height={1398}
    />
  </section>
);

const ExecutiveSummary = () => (
  <Section altBg>
    <div className="container">
      <div className="row">
        <div className="col-md-7 col-lg-6">
          <h3 className="mt-3 mt-lg-6">
            Start Planning your DREAM HOME with us.
          </h3>

          <p className="">
            Actualize the dream of buying a home, readily tailored to suit your
            peculiar taste with the specific finishing details you desire.
          </p>

          <p className="mb-5">
            Subscribe with us today and proceed to select from our vast range of
            Floor tiles, Wall tiles, Paint colors, and other finishes to
            customize your home into the haven that suits your style.
          </p>

          <Button color="secondary">Try it Now</Button>
        </div>
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
      </div>
    </div>
  </Section>
);

export const FeaturedProperties = () => (
  <div className="container mt-5">
    <h4>Featured Properties</h4>
    <div className="row">
      <SingleProperty img="1" />
      <SingleProperty img="2" />
    </div>
  </div>
);

const SingleProperty = ({ img }) => (
  <div className="col-md-4 col-sm-12">
    <div className="property-listing overflow-hidden bg-gray-50 card">
      <div className="img-wrapper">
        {/* <Overlay> */}
        <Image
          src={`/assets/img/property/property${img}.jpeg`}
          alt="Hero Image"
          width={636}
          height={432}
          className="card-img-top"
        />
        {/* </Overlay> */}
      </div>
      <div className="card-body p-4">
        <div className="row">
          <h5 className="card-title fw-medium">4 Bedroom Maisonettes</h5>
          <div className="text-gray-700 text-sm font-secondary fw-medium">
            Blissville Duos - Lekki, Lagos
          </div>
          <div className="text-lg text-primary fw-bold">₦ 74,000,000</div>
        </div>

        <hr className="dotted-border" />

        <div className="text-gray-700 text-sm font-secondary fw-medium">
          <span className="pe-3">
            <span className="text-gray-600">
              <SizeIcon />
            </span>{' '}
            255 Msq
          </span>
          <span className="px-3">
            <span className="text-gray-600">
              <BedIcon />
            </span>{' '}
            4 beds
          </span>
          <span className="px-3">
            <span className="text-gray-600">
              <BathIcon />
            </span>{' '}
            5 baths
          </span>
        </div>

        <Button className="mt-5 btn-sm px-4 py-2 text-white text-sm fw-medium">
          View Property
        </Button>
      </div>
    </div>
  </div>
);

const InvestToday = () => (
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
          <div className="card bg-gray-50">
            <div className="px-5 py-7 text-center">
              <h6>You will get up to</h6>
              <h3>N 14,500,000</h3>
              <p className="text-gray-700 text-sm font-secondary fw-medium">
                when you invest N10,000,000
              </p>
            </div>
            <Image
              src="/assets/svg/skyline.svg"
              alt="Skyline"
              height="189"
              width="576"
            />
          </div>
        </div>
      </div>
    </div>
  </Section>
);
