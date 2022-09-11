import Footer from '@/components/common/Footer';
import Section from '@/components/common/Section';
import Button from '@/components/forms/Button';
import Navigation from '@/components/layouts/Navigation';
import Image from 'next/image';
import Benefits, { SingleBenefits } from '@/components/common/Benefits';
import { TestimonialSection } from '@/components/common/Testimonials';
import ProjectsSlideshow from '@/components/layouts/ProjectsSlideshow';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import { InvestToday } from './investors';
import { FeaturedProperties } from '@/components/layouts/FeaturedProperties';
import ActionButtonGroup from '@/components/layouts/ActionButtonGroup';
import { ArrowRight } from '@/components/Icons/Icons';

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
  <div className="hero-container">
    <div className="hero-image">
      <div className="hero-content bottom-0">
        <div className="container">
          <p className="lead d-none d-md-block">A PLACE TO CALL HOME</p>
          <p className="lead d-md-none text-sm">
            <span className="text-uppercase"> From</span>{' '}
            <span className="fw-bold">₦35,000,000</span>
          </p>
          <h1 className="text-display mb-4">BLISSVILLE UNO</h1>
          <ActionButtonGroup />
        </div>
      </div>
    </div>
  </div>
);

const ExecutiveSummary = () => (
  <Section altBg>
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
            Try it Now &nbsp; <ArrowRight />
          </Button>
        </div>
        <div className="col-md-5 col-lg-6 d-none d-md-block">
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

// // Import Swiper styles
// import 'swiper/css';
// import { benefits } from '@/data/benefits';
// import { Pagination, Navigation, Autoplay, A11y, EffectCube } from 'swiper';

// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// import 'swiper/css/effect-cube';
// import useWindowSize from '@/hooks/useWindowSize';
// import ActionButtonGroup from '@/components/layouts/ActionButtonGroup';

// const TextSlider = () => {
//   const { width } = useWindowSize();
//   const isMobile = width <= 991;

//   return (
//     <div className="container">
//       <Swiper
//         // install Swiper modules
//         modules={[Autoplay, EffectCube, Pagination, A11y]}
//         autoHeight={true}
//         autoplay={{
//           delay: 5000,
//           disableOnInteraction: true,
//         }}
//         navigation={false}
//         slidesPerView={1}
//         spaceBetween={10}
//         pagination={{ clickable: true }}
//         onSwiper={(swiper) => console.log(swiper)}
//         onSlideChange={() => console.log('slide change')}
//         // slidesPerGroup={3}
//         breakpoints={{
//           640: {
//             slidesPerView: 2,
//             spaceBetween: 20,
//           },
//           991: {
//             slidesPerView: 3,
//             spaceBetween: 50,
//           },
//         }}
//         loop={true}
//         loopFillGroupWithBlank={true}
//         effect={''}
//         grabCursor={true}
//         cubeEffect={{
//           shadow: true,
//           slideShadows: true,
//           shadowOffset: 20,
//           shadowScale: 0.94,
//         }}
//       >
//         {benefits.map((benefit, index) => (
//           <SwiperSlide key={index}>
//             <SingleBenefits key={index} {...benefit} />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };
