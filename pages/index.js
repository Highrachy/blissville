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

export default function Home({ slides, projects }) {
  console.log('projects: ', projects);

  return (
    <>
      <TopNavigation />
      <HeroSection slides={slides} />
      <ExecutiveSummary />
      <FeaturedProperties />
      <BenefitSlider />
      <ProjectsSlideshow projects={projects} />
      <InvestToday showButton />
      <TestimonialSection />
      <ScheduleVisit />
      <Footer />
    </>
  );
}

const HeroSection = ({ slides }) => (
  <Swiper
    loop={true}
    navigation={true}
    modules={[Navigation]}
    className="hero-container"
  >
    {slides.map(({ image, slug, startingPrice, name }, index) => (
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
            <p className="lead text-hero-lead mb-1 mb-md-3">
              A PLACE TO CALL HOME
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
              Actualize the dream of buying a home, readily tailored to suit
              your peculiar taste with the specific finishing details you
              desire.
            </p>

            <p className="mb-5 lead">
              Subscribe with us today and proceed to select from our vast range
              of Floor tiles, Wall tiles, Paint colors, and other finishes to
              customize your home into the haven that suits your style.
            </p>

            <Button color="secondary" className="mb-5">
              Try it Now &nbsp; <ArrowRight />
            </Button>
          </Fade>
        </div>
        <div className="col-md-5 col-lg-6 d-none d-md-block">
          <Bounce right>
            <Image
              src="/assets/img/home/dream-home.png"
              alt="Hero Image"
              width={534}
              height={694}
              className="img-cover"
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
        // 'pagination[page]': 1,
        'pagination[pageSize]': 2,
        'filters[featured][$eq]': 'true',
      },
    }
  );

  const projectRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
    {
      params: {
        'pagination[pageSize]': 3,
        sort: 'createdAt:desc',
      },
    }
  );

  const slides = slideRes.data.data.map(({ id, attributes }) => ({
    id,
    name: attributes.name,
    image: attributes.image,
    slug: attributes.slug,
    startingPrice: attributes.startingPrice || 30_000_000,
  }));

  const projects = projectRes.data.data;
  return {
    props: {
      slides,
      projects,
    },
    revalidate: 10,
  };
}
