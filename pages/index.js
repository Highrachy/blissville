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
      <TopNavigation />
      {showAds ? <AdsSection /> : <HeroSection slides={slides} />}
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

const HeroSection = ({ slides }) => {
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
        <div className="col-md-7 col-lg-6 pe-md-5">
          <Fade left>
            <h3 className="mt-3 mt-lg-6 mb-4">
              Start Planning your{' '}
              <span className="text-primary">
                <br className="d-md-inline-block d-none" />
                DREAM HOME
              </span>{' '}
              with us.
            </h3>

            <p className="lead">
              Serenity, comfort, security. These are qualities you experience
              when you actualize your dream of buying a home with Blissville.
            </p>

            <p className="mb-5 lead">
              Subscribe with us today and proceed to select from our vast range
              of floor tiles, wall tiles, paint colors and other finishes to
              customize your home into the haven that suits your style.
            </p>

            <Button color="secondary" href="/contact-us" className="mb-5">
              Get Started &nbsp; <ArrowRight />
            </Button>
          </Fade>
        </div>
        <div className="col-md-5 col-lg-6 d-none d-md-block">
          <Bounce right>
            <Image
              src="/assets/img/home/dream-home.jpg"
              alt="Hero Image"
              width={769}
              height={800}
              className="img-cover rounded-2"
            />
          </Bounce>
        </div>
      </div>
    </div>
  </Section>
);

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
