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

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <ExecutiveSummary />
      <OurProjects />
      <Benefits className="my-7" />
      <WhyBlissville />
      <TestimonialSection />
      <OurInvestors />
      <Footer />
    </>
  );
}

const HeroSection = () => (
  <section className="position-relative bg-blue">
    <div className="container">
      <div className="row">
        <section className="col-md-6">
          <h1 className="text-primary text-title mt-6">
            Start planning your dream home with us
          </h1>
          <p className="text-leading">
            Actualize the dream of buying a home readily tailored to suit your
            peculiar taste.
          </p>
          <div className="my-5">
            <Button color="primary">Buy Now</Button>

            <Button
              color="none"
              className="text-secondary text-decoration-underline ms-4"
            >
              Learn more
            </Button>
          </div>

          <div className="hero-icons my-5">
            <ul className="list-inline ms-auto">
              {socialMediaLinks.map(({ icon, url }, index) => (
                <li
                  key={`social-link-${index}`}
                  className="list-inline-item hero-icon"
                >
                  <Link href={url} passHref>
                    <a className="text-reset icon-sm">{icon}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="col-md-6 hero-image__container">
          <div className="hero-image py-6 mx-auto">
            <Image
              className="rounded-5"
              src="/assets/img/home/hero.jpeg"
              alt="Hero Image"
              width={601}
              height={564}
            />
          </div>
          <div className="hero-overlay"></div>
        </section>
      </div>
    </div>
  </section>
);

const ExecutiveSummary = () => (
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
          <h3 className="mt-3 mt-lg-6">Executive Summary</h3>

          <p className="lead fw-bold">
            Our projects strategically aim at providing energy efficient luxury
            condominiums for the ever growing middle class individuals within
            the Lekki suburbs.
          </p>

          <p className="mb-5">
            We aim to continually avail this market segment with unique
            structures that are affordable to acquire and convenient to manage,
            while they enjoy the luxuries available in today’s real estate
            industry.
          </p>

          <Button
            color="none"
            className="text-secondary text-decoration-underline"
          >
            Learn more
          </Button>
        </div>
      </div>
    </div>
  </Section>
);

export const OurProjects = () => (
  <div className="container mt-5">
    <h3>Our Projects</h3>
    <div className="row">
      <SingleProject img="1" />
      <SingleProject img="2" />
    </div>
  </div>
);

const SingleProject = ({ img }) => (
  <div className="col-md-6 col-sm-12">
    <div className="property-listing overflow-hidden card">
      <div className="img-wrapper">
        <Overlay>
          <Image
            src={`/assets/img/property/property${img}.jpeg`}
            alt="Hero Image"
            width={636}
            height={382}
            className="card-img-top"
          />
        </Overlay>
      </div>
      <div className="card-body p-4">
        <div className="row">
          <div className="col-sm-8">
            <h5 className="card-title text-color-dark">
              4 Bedroom Maisonettes
            </h5>
          </div>
          <div className="col-sm-4">
            <h5 className="price text-end text-success">₦74,000,000</h5>
          </div>
        </div>

        <div className="text-color-dark-2">
          <span className="pe-3">
            <SizeIcon /> 255 Msq
          </span>
          <span className="px-3">
            <BedIcon /> 4
          </span>
          <span className="px-3">
            <BathIcon /> 5
          </span>
        </div>
      </div>
      <div className="card-footer px-4 py-4 bg-white">
        <div className="row">
          <div className="col-sm-6">
            <p className="card-text">
              5th Floor, Ibukun House, Victoria Island, Lagos
            </p>
          </div>
          <div className="col-sm-4 offset-sm-2 text-end">
            <Button color="primary" className="btn-sm px-3">
              Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const WhyBlissville = () => (
  <section>
    <div className="container pb-7">
      <div className="row">
        <div className="col-md-6">
          <div className="ms-lg-n7 ms-0">
            <Image
              src="/assets/img/home/why-blissville.jpg"
              alt="Why Blissville"
              width={674}
              height={674}
            />
          </div>
        </div>
        <div className="col-md-6">
          <p className="lead fw-bold font-secondary pt-lg-6">
            Blissville Condos and Apartments are about more than just the homes,
            but about you and everything that makes your life better and easier.
          </p>

          <p>
            Our designs respond imaginatively to the cultural, climatic and
            environmental conditions; as such, only the most suitable materials
            are employed.
          </p>

          <p>
            Though, we sell you homes, our ultimate target is to enhance your
            living experience with very reasonable financial consequences.
          </p>
        </div>
      </div>
    </div>
  </section>
);
