import Footer from '@/components/common/Footer';
import Section from '@/components/common/Section';
import Button from '@/components/forms/Button';
import Navigation from '@/components/layouts/Navigation';
import Image from 'next/image';
import Benefits from '@/components/common/Benefits';
import { TestimonialSection } from '@/components/common/Testimonials';
import ProjectsSlideshow from '@/components/layouts/ProjectsSlideshow';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import { InvestToday } from './investors';
import { FeaturedProperties } from '@/components/layouts/FeaturedProperties';
import { KeyIcon, PhoneIcon } from '@/components/Icons/Icons';

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <ExecutiveSummary />
      <FeaturedProperties />
      <Benefits topThree />
      <ProjectsSlideshow />
      <InvestToday />
      <TestimonialSection />
      <ScheduleVisit />
      <Footer />
    </>
  );
}

const HeroSection = () => (
  <section className="hero-image">
    <div className="container">
      <div className="position-absolute bottom-0">
        <p className="text-white lead">A PLACE TO CALL HOME</p>
        <h1 className="text-white text-display">BLISSVILLE UNO</h1>
        <div className="btn-primary py-3 btn btn-xl d-inline-flex align-items-center rounded-4 me-md-3 mb-3">
          <div className="me-3">
            <KeyIcon />
          </div>
          <div className="d-flex flex-column">
            <div className="text-start">PRICES FROM</div>
            <h5 className="text-white mb-0">₦35,000,000</h5>
          </div>
        </div>
        <Button className="btn btn-secondary py-3 btn-xl d-inline-flex align-items-center rounded-4 me-md-3 mb-3">
          <div className="me-3">
            <PhoneIcon />
          </div>
          <div className="d-flex flex-column">
            <div className="text-start">CALL NOW</div>
            <h5 className="text-white mb-0">0802-833-7440</h5>
          </div>
        </Button>
      </div>
    </div>
  </section>
);

const ExecutiveSummary = () => (
  <Section altBg className="mt-n7">
    <div className="container">
      <div className="row">
        <div className="col-md-7 col-lg-6 pe-5">
          <h3 className="mt-3 mt-lg-6 mb-4">
            Start Planning your{' '}
            <span className="text-primary">
              <br />
              DREAM HOME
            </span>{' '}
            with us.
          </h3>

          <p className="lead">
            Actualize the dream of buying a home, readily tailored to suit your
            peculiar taste with the specific finishing details you desire.
          </p>

          <p className="mb-5 lead">
            Subscribe with us today and proceed to select from our vast range of
            Floor tiles, Wall tiles, Paint colors, and other finishes to
            customize your home into the haven that suits your style.
          </p>

          <Button color="secondary" className="mb-5">
            Try it Now
          </Button>
        </div>
        <div className="col-md-5 col-lg-6">
          <Image
            src="/assets/img/home/dream-home.png"
            alt="Hero Image"
            width={534}
            height={694}
            className="img-cover"
          />
        </div>
      </div>
    </div>
  </Section>
);
