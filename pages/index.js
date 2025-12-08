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
import { useState } from 'react';
import { CoreValuesSlider } from '@/components/common/CoreValues';
import { VideoContainer } from './our-projects/[slug]';

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
      <CoreValuesSlider />
      <FeaturedProperties properties={properties} />
      <BenefitSlider />
      <ProjectsSlideshow projects={projects} />
      <MassiveInfrastructureSection />
      <TestimonialSection />
      <InvestToday showButton />
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
        <div className="col-md-5 mt-7">
          <Bounce right>
            <VideoContainer
              fullscreenModal
              noOverviewCard
              videoURL="/videos/blissville-video.mp4"
              videoThumbnail="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-3.jpg"
            />
          </Bounce>
        </div>
      </div>
    </div>
  </Section>
);

export function MassiveInfrastructureSection() {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <Section>
      <Container>
        <div className="row align-items-center" id="infrastructure">
          <h2 className="fw-bold mb-3 mt-3">
            VALUABLE INSIGHTS FROM 2025 SO FAR:
            <br />
            <span className="text-primary d-block d-md-inline">
              Learn More About Massive Infrastructural Developments
            </span>
          </h2>

          {/* RIGHT CONTENT */}
          <div className="col-md-7">
            <Fade left>
              {/* First two paragraphs (always visible) */}
              <p className="lead mb-3">
                <strong>Blissville Terraces (BVT)</strong> at Sangotedo is
                progressing from a &quot;potential&quot; to a
                &quot;reality&quot;. We are witnessing the simultaneous
                activation of mega-infrastructure projects from both the State
                and Federal governments, securing your investment. This is not
                just appreciation; it is acceleration, setting the stage for
                exponential capital growth.
              </p>

              <p className="lead mb-3">
                On February 8, 2025, the Lagos State Government signed an MoU
                with the <strong>Summa Group</strong> (a Turkish construction
                and investment company) to construct the{' '}
                <strong>Lekki-Epe International Airport</strong>. Mr.{' '}
                <strong>Babajide Sanwo-Olu</strong>, the Executive Governor of
                Lagos State, stated that this is a &quot;new global
                gateway&quot; that promises massive foreign investment, job
                creation, and an influx of expatriates. <strong>BVT</strong> is
                perfectly positioned to capture the demand for premium and
                desirable housing that the airport will stir in the real estate
                sector.
              </p>
            </Fade>

            {/* Hidden content (shows on toggle) */}
            {expanded && (
              <>
                <p className="lead mb-3">
                  In addition, connectivity is now a reality. On May 26, 2025,
                  President <strong>Bola Ahmed Tinubu</strong> commissioned
                  Section 1 (30 km) of the{' '}
                  <strong>Lagos-Calabar Coastal Highway</strong>, which connects
                  Victoria Island all the way to Eleko Junction. The impact is
                  being felt right at the Sangotedo axis, where BVT is located.
                </p>

                <p className="lead mb-3">
                  Furthermore, the{' '}
                  <strong>Lekki-Epe Expressway Upgrade Phase 2</strong> is
                  easing travel, reducing the commute from Ajah / Abraham
                  Adesanya to the BVT site to barely 10 minutes. Likewise, the
                  underway construction of the{' '}
                  <strong>Sangotedo Interchange Link Road</strong> and the{' '}
                  <strong>Omu Creek Bridge</strong> ensures crucial alternative
                  routes and a superior local access profile.
                </p>

                <p className="lead mb-3">
                  In June 2025, the Lagos State Government launched the
                  multi-million Euro{' '}
                  <strong>&lsquo;Omi Eko&rsquo; Water Transport Project</strong>{' '}
                  to expand and modernize water transportation.{' '}
                  <strong>BVT&rsquo;s</strong> lake is fully connected to the
                  Lagos waterways via the <strong>Omu Creek</strong>,
                  integrating the project directly into the state&rsquo;s
                  strategic <strong>&lsquo;Blue Economy&rsquo; network</strong>.
                  This unique waterfront status allows BVT to command a premium
                  built on a unique lifestyle and an integrated transport asset.
                </p>

                <p className="lead mb-4">
                  With ongoing government projects and improved infrastructure
                  taking shape, the long-term strength of{' '}
                  <strong>Blissville Terraces</strong> is becoming even more
                  evident. These developments continue to boost its appeal,
                  value, and future potential.
                </p>
              </>
            )}

            {/* Read More / Show Less button */}
            <Button variant="dark" onClick={toggleExpanded}>
              {expanded ? 'Show Less' : 'Read More'}
            </Button>
          </div>

          {/* IMAGE */}
          <div className="col-md-5 mb-4 ps-md-5 mb-md-0">
            <Fade right>
              <Image
                src="/assets/img/home/clc-gate.jpg"
                alt="Caribbean Lake City Gate"
                width={800}
                height={800}
                className="img-fluid rounded-2 shadow-sm"
              />
            </Fade>
          </div>
        </div>
      </Container>
    </Section>
  );
}

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
