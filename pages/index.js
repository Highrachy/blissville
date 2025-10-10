import Footer from '@/components/common/Footer';
import Section from '@/components/common/Section';
import Button from '@/components/forms/Button';
import TopNavigation from '@/components/layouts/Navigation';
import Image from 'next/image';
import { BenefitSlider } from '@/components/common/Benefits';
import { TestimonialSection } from '@/components/common/Testimonials';
import ProjectsSlideshow from '@/components/layouts/ProjectsSlideshow';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import { InvestToday } from './investors';
import { FeaturedProperties } from '@/components/layouts/FeaturedProperties';
import ActionButtonGroup from '@/components/layouts/ActionButtonGroup';
import { ArrowRight } from '@/components/Icons/Icons';
import Fade from 'react-reveal/Fade';
import { Bounce } from 'react-reveal';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import ReferralModal from '@/components/ui/ReferralModal';
import { useRouter } from 'next/router';
import { PROJECT_STATUS, PROPERTY_STATUS } from '@/utils/constants';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import SeoHead from '@/components/utils/SeoHead';
import {
  FaBuilding,
  FaCar,
  FaDoorOpen,
  FaRulerCombined,
} from 'react-icons/fa6';

const BASE_CONTENT = {
  image:
    'https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-3-night.jpg',
  name: 'Blissville Terraces',
  slogan: 'PRE-LAUNCH OFFER',
  slug: 'blissville-terraces',
  startingPrice: '120000000',
};

const SLIDES = [
  {
    id: 1,
    ...BASE_CONTENT,
  },
  {
    id: 2,
    ...BASE_CONTENT,
    image:
      'https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-3.jpg',
  },
  {
    id: 3,
    ...BASE_CONTENT,
    image:
      'https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-2-night.jpg',
  },
];

export default function Home({ slides, projects, properties }) {
  const { query } = useRouter();
  const showAds = false;

  return (
    <>
      <SeoHead />
      <TopNavigation />
      {/* {showAds ? <AdsSection /> : <HeroSection slides={slides} />} */}
      <VideoCoverSection videoSrc="/videos/project-intro.mp4" />
      <ExecutiveSummary />
      <FeaturedProperties properties={properties} />
      <BenefitSlider />
      <ProjectsSlideshow projects={projects} />
      <InvestToday showButton />
      <TestimonialSection />
      <ScheduleVisit />
      <Footer />
      <ReferralModal referralCode={query.ref} inviteCode={query.inviteCode} />
    </>
  );
}

export const HeroSection = ({ slides }) => {
  if (slides.length === 1) {
    // Render a static hero with the same structure and classes as SwiperSlide
    const { image, slug, startingPrice, name, slogan } = slides[0];
    return (
      <div
        className="hero-image swiper-slide swiper-slide-active hero-container"
        style={{
          background: `linear-gradient(0deg, rgba(15, 17, 20, 0.5), rgba(15, 17, 20, 0.5)), url(${image})`,
          backgroundSize: 'cover',
        }}
      >
        <div className="hero-content">
          <div className="container">
            <p className="lead text-hero-lead text-uppercase mb-1 mb-md-3">
              {slogan || 'A HOME THAT FEELS LIKE PARADISE'}
            </p>
            <h1 className="text-display mb-2 mb-md-4">{name}</h1>
            <ActionButtonGroup
              price={startingPrice}
              href={`/our-projects/${slug}`}
            />
          </div>
        </div>
      </div>
    );
  }
  // Multiple slides: use Swiper
  return (
    <Swiper
      loop={true}
      navigation={true}
      modules={[Navigation]}
      className="hero-container"
    >
      {slides.map(({ image, slug, startingPrice, name, slogan }, index) => (
        <SwiperSlide
          key={index}
          className="hero-image"
          style={{
            background: `linear-gradient(0deg, rgba(15, 17, 20, 0.5), rgba(15, 17, 20, 0.5)), url(${image})`,
            backgroundSize: 'cover',
          }}
        >
          <div className="hero-content">
            <div className="container">
              <p className="lead text-hero-lead text-uppercase mb-1 mb-md-3">
                {slogan || 'A PLACE TO CALL HOME'}
              </p>
              <h1 className="text-display mb-2 mb-md-4">{name}</h1>
              <ActionButtonGroup
                price={startingPrice}
                href={`/our-projects/${slug}`}
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const AdsSection = () => {
  const adsImage =
    'https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/launch-ads.jpg';
  return (
    <Link passHref href="/blissville-terraces">
      <a>
        <section className="ads-section position-relative d-flex align-items-center justify-content-center">
          <div className="ads-overlay"></div>
          <div className="ads-content">
            <Image
              src={adsImage}
              alt="Advertisement"
              width={2500}
              height={2500}
              className="img-fluid ads-image"
              priority
            />
          </div>
        </section>
      </a>
    </Link>
  );
};

const ExecutiveSummary = () => (
  <Section altBg>
    <div className="container">
      <div className="row">
        <div className="col-md-7 pe-md-5">
          <Fade left>
            <h2 className="fw-bold mt-3 mt-lg-5 mb-4">
              Introducing{' '}
              <span className="text-primary d-block d-md-inline">
                Blissville Terraces
              </span>
            </h2>

            <p className="lead mb-3">
              Discover refined waterfront living at{' '}
              <strong>Blissville Terraces</strong>, an exclusive community of
              elegant four-bedroom duplexes in the heart of{' '}
              <strong>Sangotedo, Lagos</strong>.
            </p>

            <p className="lead mb-3">
              Located just minutes from <strong>Novare Mall</strong>,{' '}
              <strong>Lagos Business School</strong>, and the calm waters of
              Caribbean Lake City Estate, Blissville Terraces blends modern
              design, peaceful surroundings, and family comfort in one beautiful
              address.
            </p>

            <p className="lead mb-4">
              Each home comes with smart layouts, energy-efficient systems, and
              premium finishes that help you enjoy comfort, convenience, and a
              real sense of belonging.
            </p>

            <ActionButtonGroup />
          </Fade>
        </div>
        <div className="col-md-5">
          <Bounce right>
            <Image
              src="/assets/img/home/clc-gate.jpg"
              alt="Caribbean Lake City Gate"
              width={800}
              height={800}
              className="mt-4 img-cover rounded-2 shadow"
            />
          </Bounce>
        </div>
      </div>
    </div>
  </Section>
);

export function VideoCoverSection({ videoSrc }) {
  return (
    <section className="position-relative w-100 vh-100 overflow-hidden">
      {/* 🎥 Fullscreen Background Video */}
      <video
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🌫️ Transparent Overlay Text */}
      <div className="position-absolute bottom-0 start-0 w-100 text-center pb-5">
        <div className="bg-dark bg-opacity-50 py-3 px-4 d-inline-block rounded-1">
          <h1 className="text-white fw-bold h3 mb-0">
            Welcome to Blissville Terraces
          </h1>
        </div>
      </div>
    </section>
  );
}
export async function getStaticProps() {
  const slideRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
    {
      params: {
        'pagination[pageSize]': 3,
        'filters[featured][$eq]': 'true',
        'filters[status][$ne]': PROJECT_STATUS.NOT_AVAILABLE,
      },
    }
  );

  const projectRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
    {
      params: {
        'pagination[pageSize]': 3,
        sort: 'createdAt:desc',
        'filters[status][$ne]': PROJECT_STATUS.NOT_AVAILABLE,
      },
    }
  );

  const propertiesRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties?populate=*`,
    {
      params: {
        'pagination[pageSize]': 3,
        sort: 'createdAt:desc',
        'filters[status][$eq]': PROPERTY_STATUS.ACTIVE,
      },
    }
  );

  const slides = slideRes.data.data.map(({ id, attributes }) => ({
    id,
    name: attributes.name,
    image: attributes.image,
    slug: attributes.slug,
    slogan: attributes.slogan,
    startingPrice: attributes.startingPrice || 0,
  }));

  const projects = projectRes.data.data;
  const properties = propertiesRes.data.data;
  return {
    props: {
      slides,
      projects,
      properties,
    },
    revalidate: 10,
  };
}
