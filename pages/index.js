import { BathIcon, BedIcon, SizeIcon } from '@/components/common/Icons';
import OurInvestors from '@/components/common/OurInvestors';
import Overlay from '@/components/common/Overlay';
import Button from '@/components/forms/Button';
import Navigation from '@/components/layouts/Navigation';
import { benefits } from '@/data/benefits';
import Image from 'next/image';
import Link from 'next/link';
import { socialMediaLinks } from '../data';

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <ExecutiveSummary />
      <OurProjects />
      <Benefits />
      <WhyBlissville />
      <OurInvestors />
      <WhyBlissville />
    </>
  );
}

const HeroSection = () => (
  <section className="position-relative bg-blue">
    <div className="container">
      <div className="row">
        <section className="col-md-6">
          <h1 className="text-primary text-title mt-5">
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
        <section className="col-md-6">
          <div className="hero-image py-6 ps-5">
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
  <section className="pt-6">
    <div className="container">
      <div className="row">
        <div className="col-6">
          <div className="ms-n5">
            <Image
              src="/assets/img/home/cuate.svg"
              alt="Hero Image"
              width={601}
              height={564}
            />
          </div>
        </div>
        <div className="col-6">
          <h3 className="mt-6">Executive Summary</h3>

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
  </section>
);

const OurProjects = () => (
  <div className="container mt-5">
    <h3 className="text-color-dark">Our Projects</h3>
    <div className="row">
      <SingleProject img="1" />
      <SingleProject img="2" />
    </div>
  </div>
);

const SingleProject = ({ img }) => (
  <div className="col-md-6 col-sm-12">
    <div className="property-listing overflow-hidden card">
      <Overlay>
        <span className="d-inline-block">
          <span className="d-inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/assets/img/property/property${img}.jpeg`}
              alt="Hero Image"
              width={636}
              height={382}
              className="card-img-top "
            />
          </span>
        </span>
      </Overlay>
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

const Benefits = () => (
  <section className="position-relative bg-blue my-7 py-7">
    <div className="container">
      <div className="row">
        <h3 className="font-secondary text-center text-color-dark-1">
          Benefits of Blissville
        </h3>
        {benefits.map((benefit, index) => (
          <SingleBenefits key={index} {...benefit} />
        ))}
      </div>
    </div>
  </section>
);

const SingleBenefits = ({ background, icon, title, text }) => (
  <div className="col-sm-4 text-center px-5 mt-6 benefits-section">
    <div className={`bg-icon bg-${background}`}>{icon}</div>
    <h5 className="text-uppercase mt-3 text-color-1">{title}</h5>
    <p className="">{text}</p>
  </div>
);

const WhyBlissville = () => (
  <section>
    <div className="container">
      <div className="row">
        <div className="col-6">
          <div className="ms-n7">
            <Image
              src="/assets/img/home/why-blissville.jpg"
              alt="Why Blissville"
              width={674}
              height={674}
            />
          </div>
        </div>
        <div className="col-6">
          <p className="lead fw-bold font-secondary pt-6">
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
