import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { Modal, Nav } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import {
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaBed,
  FaCar,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaComments,
  FaEnvelope,
  FaExpand,
  FaFileContract,
  FaFileSignature,
  FaHouseUser,
  FaKey,
  FaLayerGroup,
  FaLocationDot,
  FaMapLocationDot,
  FaPhone,
  FaPlus,
  FaRoad,
  FaRulerCombined,
  FaWater,
  FaScaleBalanced,
  FaShip,
  FaVideo,
  FaWhatsapp,
} from 'react-icons/fa6';
import {
  MdVerified,
  MdSolarPower,
  MdDirectionsBoat,
  MdPark,
} from 'react-icons/md';
import {
  Autoplay,
  Navigation as SwiperNavigation,
  Pagination,
  A11y,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import SeoHead from '@/components/utils/SeoHead';
import { socialMediaLinks } from '@/data/index';
import { trackMetaEvent } from '@/utils/metaPixel';
import {
  CURRENT_DEVELOPMENT_PERCENTAGE,
  LAST_UPDATED as INVESTORS_LAST_UPDATED,
} from './investors';

const S3 = 'https://blissville-staging.s3.us-east-1.amazonaws.com/bvt';
const PROPERTY_URL =
  '/our-properties/blissville-terraces/4-bedroom-waterview-terrace-duplex';
const PAYMENT_PLAN_URL =
  '/our-properties/blissville-terraces/4-bedroom-waterview-terrace-duplex#payment-plan';
const NAIRAMETRICS_URL =
  'https://nairametrics.com/2026/04/11/peace-of-mind-by-design-blissvilles-blueprint-for-wellness-first-tech-enabled-urban-living-in-lagos/';
const WHATSAPP_NUMBER = '+234 905 555 5146';
const WHATSAPP_URL =
  'https://wa.me/2349055555146?text=Hello%20Blissville%2C%20I%20live%20abroad%20and%20would%20like%20to%20learn%20about%20Blissville%20Terraces.';
const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Caribbean+Lake+City+Estate+Sangotedo+Lagos';

const IMAGES = {
  hero: `${S3}/type-3-night.jpg`,
  dusk: `${S3}/type-2-night.jpg`,
  threeLevels: `${S3}/type-1-front.jpg`,
  street: `${S3}/type-2.jpg`,
  cinema: '/assets/img/interiors/cinema.jpg',
  furnished: '/assets/img/interiors/detached-lounge-1.jpg',
  bedroom: '/assets/img/interiors/semi-detached-master-bedroom-1.jpg',
  office: '/assets/img/interiors/home-office.jpg',
  dining: '/assets/img/interiors/detached-dining-1.jpg',
  lake: '/assets/img/landing/1.png',
  progress: '/assets/img/investors/progress/building-structural-frame.jpg',
  structuralFrame:
    '/assets/img/investors/progress/building-structural-frame.jpg',
  map: '/assets/img/maps/bvt-location-map.png',
};

const SITE_UPDATE = INVESTORS_LAST_UPDATED || 'September 2026';

const DIASPORA_NAV = [
  { title: 'The home', url: '#the-home' },
  { title: 'How it works', url: '#how-it-works' },
  { title: 'Location', url: '#location' },
  { title: 'FAQs', url: '#faqs' },
  {
    component: (
      <Nav.Link
        className="nav-btn-cta dsp-nav-cta"
        href="#consultation"
        eventKey="#consultation"
      >
        Book a consultation <FaArrowRight aria-hidden="true" />
      </Nav.Link>
    ),
  },
];

const WORLD_CLOCKS = [
  { city: 'London', timeZone: 'Europe/London' },
  { city: 'New York', timeZone: 'America/New_York' },
  { city: 'Toronto', timeZone: 'America/Toronto' },
  { city: 'Dubai', timeZone: 'Asia/Dubai' },
  { city: 'Lagos', timeZone: 'Africa/Lagos', home: true },
];

const PROOF_POINTS = [
  {
    icon: MdVerified,
    title: 'C of O (Govt Allocation)',
    detail:
      'Pristine legal foundation with verifiable state cadastral registry record.',
    variant: 'verified',
  },
  {
    icon: MdSolarPower,
    title: 'Smart Solar & Inverter',
    detail:
      'Integrated hybrid renewable setups minimizing auxiliary operational costs.',
    variant: 'solar',
  },
  {
    icon: MdDirectionsBoat,
    title: 'Land & Water Access',
    detail:
      'Lekki-Epe corridor connectivity + private estate boat jetty (25 min to VI).',
    variant: 'boat',
  },
  {
    icon: MdPark,
    title: 'Bio-Friendly Setting',
    detail:
      'Lush lakeside microclimate, filtered pure air, and landscaped park networks.',
    variant: 'park',
  },
];

const HOME_SPECS = [
  { value: '4', label: 'Ensuite bedrooms', icon: FaBed },
  { value: '3', label: 'Levels of living', icon: FaLayerGroup },
  { value: '1', label: 'Maid’s room', icon: FaHouseUser },
  { value: '2', label: 'Car parks', icon: FaCar },
  {
    value: '335',
    unit: 'sqm',
    label: 'Total built area',
    icon: FaRulerCombined,
  },
  { value: 'Lakeside', label: 'Waterview estate', icon: FaWater },
];

const HOME_FEATURES = [
  {
    key: 'levels',
    title: 'Three levels',
    caption: 'A floor to gather, a floor to rest, a floor to retreat.',
    image: IMAGES.threeLevels,
    alt: 'Architectural rendering of a three-level Blissville Terraces home with palms and private balconies',
    tag: 'Architecture',
  },
  {
    key: 'multipurpose',
    title: 'Multipurpose room',
    caption: 'Cinema, gym, studio or prayer room. Your call.',
    image: IMAGES.cinema,
    alt: 'Interior rendering of a multipurpose room set up as a home cinema with a feature wall and lounge seating',
    tag: 'Flexible space',
  },
  {
    key: 'lake',
    title: 'An estate with a lake',
    caption: 'Water at the heart of Lagos lagoon living.',
    image: IMAGES.lake,
    alt: 'Rendering of the Caribbean Lake City Estate lake with boats moored along the water',
    tag: 'Caribbean Lake City',
  },
  {
    key: 'bedrooms',
    title: 'Four bedrooms ensuite',
    caption: 'Plus a maid’s room.',
    image: IMAGES.bedroom,
    alt: 'Interior rendering of a calm master bedroom with timber panelling and soft lighting',
    tag: 'Private retreats',
  },
  {
    key: 'office',
    title: 'Home office',
    caption: 'Work across time zones from the comfort of your home.',
    image: IMAGES.office,
    alt: 'Interior rendering of a bright room with a dedicated desk and shelving for working from home',
    tag: 'Work from home',
  },
];

const PACKAGES = [
  {
    name: 'The Canvas',
    text: 'A blank canvas, finished to your taste and timeline.',
    price: '₦155M',
    note: 'From',
  },
  {
    name: 'The Complete',
    text: 'Fully finished, ready for you to make your own.',
    price: '₦187M',
    note: 'From',
  },
  {
    name: 'The Prestige',
    text: 'Premium finishes and lifestyle upgrades throughout.',
    price: 'On request',
    note: 'Pricing',
  },
];

const STEPS = [
  {
    icon: FaComments,
    title: 'Talk to us',
    text: 'Send us a message, email or call us.',
  },
  {
    icon: FaVideo,
    title: 'Inspect',
    text: 'Schedule a virtual inspection or send a representative.',
  },
  {
    icon: FaScaleBalanced,
    title: 'Verify',
    text: 'Independently consult a lawyer to review the title and contract.',
  },
  {
    icon: FaKey,
    title: 'Own it',
    text: 'Choose a Fixed or Flexi payment plan. Start with an initial deposit.',
    linkText: 'Explore payment schedules',
    href: PAYMENT_PLAN_URL,
  },
];

const DOCUMENTS = [
  {
    icon: FaFileSignature,
    title: 'Deed of Assignment',
    text: 'Transfers ownership to you',
  },
  {
    icon: FaMapLocationDot,
    title: 'Survey plan',
    text: 'Defines your property’s boundaries',
  },
  {
    icon: FaFileContract,
    title: 'Form 1C',
    text: 'For your Governor’s Consent',
  },
];

const GALLERY = [
  {
    src: IMAGES.street,
    badge: 'Exterior architecture',
    category: 'Architecture',
    label: 'Terrace perspective',
    title: 'The terrace perspective',
    caption:
      'Blissville Terraces architectural perspective. Contemporary three-level residence with private balconies and floor-to-ceiling glass.',
    description:
      'Spacious three-level terrace featuring clean modern lines, expansive glazing, private balconies, and landscaped grounds.',
    alt: 'Architectural perspective rendering of the contemporary three-level Blissville Terraces residence with modern balconies and expansive glazing',
  },
  {
    src: IMAGES.dining,
    badge: 'Interior concept',
    category: 'Interior living',
    label: 'Interior',
    title: 'Living and dining',
    caption:
      'Living and dining area. Interior rendering; finishes depend on your selected package.',
    description:
      'Open-plan living and dining designed for family gatherings, entertaining, and abundant natural light.',
    alt: 'Interior rendering of a dining area with sculptural chairs, timber panelling and pendant lighting',
  },
  {
    src: IMAGES.structuralFrame,
    badge: `Site update · ${CURRENT_DEVELOPMENT_PERCENTAGE}%`,
    category: 'Construction log',
    label: `Site progress · ${CURRENT_DEVELOPMENT_PERCENTAGE}%`,
    title: 'Rising on site',
    progress: `${CURRENT_DEVELOPMENT_PERCENTAGE}% complete`,
    caption: `Structural framing in place with active blockwork and carcass development progressing at ${CURRENT_DEVELOPMENT_PERCENTAGE}% completion. Site update, ${SITE_UPDATE}.`,
    description:
      'Structural frame in place with active blockwork and carcass development underway at Caribbean Lake City Estate.',
    alt: `Active construction progress at Blissville Terraces at ${CURRENT_DEVELOPMENT_PERCENTAGE}% development completion, ${SITE_UPDATE}`,
    live: true,
  },
];

const NEIGHBOURHOOD = [
  'Novare Mall',
  'Greensprings School',
  'Pan-Atlantic University',
  'Lufasi Nature Park',
  'Giwa Water Park',
];

const FAQS = [
  {
    question: 'Can I buy a home while living abroad?',
    answer:
      'Yes. You can purchase a home remotely while living abroad. Consultations, virtual inspections, representation on-site, legal document reviews, and payments can all be coordinated remotely, allowing you to proceed with your purchase without being physically present in Lagos.',
  },
  {
    question: 'How can I inspect the property from overseas?',
    answer:
      'You can arrange a live video walkthrough with our team or appoint a trusted representative or independent surveyor to conduct an on-site inspection on your behalf. Our team will coordinate the process and provide the information you need to assess the property remotely.',
  },
  {
    question: 'What title does the land have?',
    answer:
      'The land has a Certificate of Occupancy (C of O) issued through Government Allocation. Upon completion of payment, the necessary documentation for transferring ownership, including the Deed of Assignment and Governor’s Consent, will be processed in accordance with applicable requirements.',
  },
  {
    question: 'What documents will I receive?',
    answer:
      'A Deed of Assignment, survey plan and Form 1C. Once fully paid, you can process Governor’s Consent.',
  },
  {
    question: 'How can I verify the title?',
    answer:
      'Have an independent lawyer search the title at the Lagos State Lands Registry and review the contract before you pay. We provide the necessary documents upon request.',
  },
  {
    question: 'What do the homes cost?',
    answer: (
      <>
        Prices vary by package (The Canvas, The Complete and The Prestige) and
        payment plan. Starting from &#8358;155 million, you can own a unit at
        Blissville Terraces.{' '}
        <Link href={PAYMENT_PLAN_URL}>
          <a className="dsp-inline-link">
            See pricing tiers &amp; structured plans
          </a>
        </Link>
        .
      </>
    ),
  },
  {
    question: 'What payment plans are available?',
    answer: (
      <>
        A Fixed Plan or a Flexi Plan. We explain the deposit, schedule and total
        cost of each, and confirm it in writing. You can{' '}
        <Link href={PAYMENT_PLAN_URL}>
          <a className="dsp-inline-link">
            view the complete payment plan breakdown and installment schedules
            here
          </a>
        </Link>
        .
      </>
    ),
  },
  {
    question: 'How do I pay from abroad?',
    answer:
      'Only into Highrachy Investment & Technology Limited’s corporate account, using details we confirm with you by phone and in writing. Never a personal account; keep every receipt.',
  },
  {
    question: 'What other costs should I budget for?',
    answer:
      'Utility connection fee, Governor’s Consent fees and registration, and the estate service charge.',
  },
];

const COUNTRIES = [
  'United Kingdom',
  'United States',
  'Canada',
  'Ireland',
  'Germany',
  'United Arab Emirates',
  'Other',
];

const PURPOSES = [
  'Future residence',
  'Family home',
  'Investment',
  'Retirement',
  'Not sure yet',
];

const CONTACT_CHANNELS = ['WhatsApp', 'Phone', 'Email'];

const INITIAL_FORM = {
  fullName: '',
  email: '',
  country: '',
  whatsapp: '',
  homePurpose: '',
  contactChannel: 'Email',
  consent: false,
};

const formatTime = (timeZone, date) =>
  new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone,
  }).format(date);

const useRevealOnScroll = (rootRef) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const elements = Array.from(root.querySelectorAll('[data-reveal]'));
    // Reveal anything already on screen before enabling the hidden state, so there is no flicker.
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        element.classList.add('is-revealed');
      }
    });
    root.classList.add('has-reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    elements
      .filter((element) => !element.classList.contains('is-revealed'))
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [rootRef]);
};

const Eyebrow = ({ children, light = false }) => (
  <span className={`dsp-eyebrow${light ? ' dsp-eyebrow--light' : ''}`}>
    {children}
  </span>
);

export default function DiasporaPage() {
  const pageRef = useRef(null);
  const homeSwiperRef = useRef(null);
  const [now, setNow] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeHomeIndex, setActiveHomeIndex] = useState(0);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useRevealOnScroll(pageRef);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 30000);
    trackMetaEvent('ViewContent', {
      content_name: 'Blissville Terraces Diaspora Landing Page',
      content_category: 'Diaspora Real Estate',
    });
    return () => clearInterval(interval);
  }, []);

  const phoneRequired = formData.contactChannel !== 'Email';

  const handlePrevHome = () => {
    if (homeSwiperRef.current) {
      homeSwiperRef.current.slidePrev();
    }
  };

  const handleNextHome = () => {
    if (homeSwiperRef.current) {
      homeSwiperRef.current.slideNext();
    }
  };

  const handleSelectHomeSlide = (index) => {
    setActiveHomeIndex(index);
    if (homeSwiperRef.current) {
      if (typeof homeSwiperRef.current.slideToLoop === 'function') {
        homeSwiperRef.current.slideToLoop(index);
      } else {
        homeSwiperRef.current.slideTo(index);
      }
    }
  };

  const handleInputChange = ({ target: { name, value, type, checked } }) => {
    setFormData((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.country ||
      !formData.homePurpose ||
      !formData.consent ||
      (phoneRequired && !formData.whatsapp.trim())
    ) {
      setSubmitError(
        'Please complete the required fields and consent to being contacted.',
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    try {
      const funnelPayload = {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.whatsapp.trim() || 'N/A',
        source:
          typeof window !== 'undefined'
            ? window.location.href
            : 'Blissville Terraces Diaspora Landing Page',
        funnel: 'Blissville Terraces Diaspora',
        content: JSON.stringify({
          country: formData.country,
          homePurpose: formData.homePurpose,
          contactChannel: formData.contactChannel,
          consent: formData.consent,
          submittedAt: new Date().toISOString(),
        }),
      };

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/funnels`, {
        data: funnelPayload,
      });

      // Also submit to contacts endpoint to ensure customer support notifications trigger
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts`, {
          data: {
            name: formData.fullName.trim(),
            email: formData.email.trim(),
            phone: formData.whatsapp.trim() || 'N/A',
            message: `[BLISSVILLE TERRACES DIASPORA INQUIRY]\nCountry: ${formData.country}\nPurpose: ${formData.homePurpose}\nPreferred Channel: ${formData.contactChannel}`,
            subject: `Blissville Terraces Diaspora Inquiry (${formData.country})`,
            source:
              typeof window !== 'undefined'
                ? window.location.href
                : 'Blissville Terraces Diaspora Landing Page',
          },
        });
      } catch (contactError) {
        // Funnel submission already succeeded
        console.warn('Contacts endpoint fallback notice:', contactError);
      }

      trackMetaEvent('Lead', {
        content_name: 'Blissville Terraces Diaspora Registration',
        country: formData.country,
        purpose: formData.homePurpose,
      });
      setIsSubmitted(true);
      toast.success(
        'Your inquiry has been received. Our team will contact you shortly.',
      );
    } catch (error) {
      setSubmitError(
        'We could not send your request. Please try again or reach us directly on WhatsApp. Your details are still here.',
      );
      toast.error('Your request was not sent. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="diaspora-experience" ref={pageRef}>
      <SeoHead
        title="Blissville Terraces Diaspora | Own Your Home from Abroad"
        description="Own a four-bedroom waterview home at Blissville Terraces, Caribbean Lake City Estate, Sangotedo, Lagos, from anywhere in the world. Fully verified title and transparent remote purchase."
        canonical="https://www.blissville.com.ng/diaspora"
        ogImage={IMAGES.hero}
        keywords={[
          'Blissville Terraces Diaspora',
          'Buy property in Lagos from abroad',
          'Diaspora real estate Nigeria',
          'Sangotedo waterfront homes',
          'Virtual property inspection Lagos',
        ]}
      />
      <a className="dsp-skip-link" href="#diaspora-content">
        Skip to content
      </a>
      <Navigation navigation={DIASPORA_NAV} collapseOnSelect />

      <main className="diaspora-page" id="diaspora-content">
        {/* Hero */}
        <section className="dsp-hero" aria-labelledby="diaspora-title">
          <div className="dsp-hero__media">
            <Image
              src={IMAGES.hero}
              alt="Blissville Terraces at dusk, with warm lighting along private balconies and palms"
              layout="fill"
              objectFit="cover"
              objectPosition="center 62%"
              priority
              sizes="100vw"
              quality={85}
            />
          </div>
          <div className="dsp-container dsp-hero__inner">
            <div className="dsp-hero__copy">
              <Eyebrow light>
                Blissville Terraces · For Nigerians abroad
              </Eyebrow>
              <h1 id="diaspora-title">
                Own your home at Blissville Terraces{' '}
                <em>from anywhere in the world.</em>
              </h1>
              <p className="dsp-hero__location">
                <FaLocationDot aria-hidden="true" />
                Caribbean Lake City Estate, Sangotedo, Lagos
              </p>
              <div className="dsp-actions">
                <a className="dsp-btn dsp-btn--primary" href="#consultation">
                  Book a Virtual Consultation
                  <FaArrowRight aria-hidden="true" />
                </a>
                <a
                  className="dsp-btn dsp-btn--glass"
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp
                    aria-hidden="true"
                    className="dsp-whatsapp-icon"
                  />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div
              className="dsp-clock"
              aria-label="Current time around the world"
            >
              <span className="dsp-clock__label">
                Wherever you are, <strong>we are on your time.</strong>
              </span>
              <ul>
                {WORLD_CLOCKS.map(({ city, timeZone, home }) => (
                  <li key={city} className={home ? 'is-home' : undefined}>
                    <span>{city}</span>
                    <time suppressHydrationWarning>
                      {now ? formatTime(timeZone, now) : '--:--'}
                    </time>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <span className="dsp-render-note">Architectural rendering</span>
        </section>

        {/* Proof strip */}
        <section className="dsp-proof" aria-label="Why Blissville Terraces">
          <div className="dsp-container">
            <div className="dsp-proof__grid">
              {PROOF_POINTS.map(({ icon: Icon, title, detail, variant }) => (
                <div key={title} className="dsp-proof__card">
                  <div
                    className={`dsp-proof__icon-wrap dsp-proof__icon-wrap--${variant}`}
                  >
                    <Icon size={26} aria-hidden="true" />
                  </div>
                  <div className="dsp-proof__content">
                    <h3 className="dsp-proof__title">{title}</h3>
                    <p className="dsp-proof__text">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The home */}
        <section
          className="dsp-section dsp-home"
          id="the-home"
          aria-labelledby="home-title"
        >
          <div className="dsp-container">
            <header className="dsp-heading dsp-heading--center" data-reveal>
              <Eyebrow>The home</Eyebrow>
              <h2 id="home-title">
                Room for every chapter, <span>wherever life takes you.</span>
              </h2>
              <div className="dsp-home__intro">
                <p>
                  Four-bedroom waterview terraces in Caribbean Lake City Estate.
                  Designed for family visits, a future return, or the life you
                  are building now.
                </p>
                <div className="dsp-actions">
                  <Link href={PROPERTY_URL}>
                    <a className="dsp-btn dsp-btn--primary">
                      Learn more <FaArrowRight aria-hidden="true" />
                    </a>
                  </Link>
                  <a className="dsp-btn dsp-btn--outline" href="#consultation">
                    <FaVideo aria-hidden="true" /> Book a virtual consultation
                  </a>
                </div>
              </div>
            </header>

            <div className="dsp-home-gallery" data-reveal>
              <div className="dsp-home-carousel-wrapper">
                {/* Carousel Navigation Arrows */}
                <button
                  type="button"
                  className="dsp-carousel-arrow dsp-carousel-arrow--prev"
                  aria-label="Previous home feature"
                  onClick={handlePrevHome}
                >
                  <FaChevronLeft aria-hidden="true" />
                </button>

                <button
                  type="button"
                  className="dsp-carousel-arrow dsp-carousel-arrow--next"
                  aria-label="Next home feature"
                  onClick={handleNextHome}
                >
                  <FaChevronRight aria-hidden="true" />
                </button>

                <Swiper
                  modules={[Autoplay, SwiperNavigation, Pagination, A11y]}
                  spaceBetween={0}
                  slidesPerView={1}
                  loop={true}
                  speed={700}
                  autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  onSwiper={(swiper) => {
                    homeSwiperRef.current = swiper;
                  }}
                  onSlideChange={(swiper) => {
                    setActiveHomeIndex(
                      swiper.realIndex ?? swiper.activeIndex ?? 0,
                    );
                  }}
                  className="dsp-home-swiper"
                >
                  {HOME_FEATURES.map((feature, index) => (
                    <SwiperSlide key={feature.key}>
                      <figure className="dsp-home-gallery__stage">
                        <Image
                          src={feature.image}
                          alt={feature.alt}
                          layout="fill"
                          objectFit="cover"
                          objectPosition={
                            feature.key === 'lake' ? 'center 72%' : 'center'
                          }
                          priority={index === 0}
                          sizes="(max-width: 767px) 100vw, (max-width: 1336px) 92vw, 1240px"
                        />
                        <figcaption aria-live="polite" aria-atomic="true">
                          <small>{feature.tag}</small>
                          <h3>{feature.title}</h3>
                          <p>{feature.caption}</p>
                        </figcaption>
                        <button
                          type="button"
                          className="dsp-home-gallery__expand"
                          aria-label={`Enlarge photo: ${feature.title}`}
                          onClick={() =>
                            setSelectedImage({
                              src: feature.image,
                              alt: feature.alt,
                              title: feature.title,
                              caption: feature.caption,
                            })
                          }
                        >
                          <FaExpand aria-hidden="true" />
                        </button>
                        <span
                          className="dsp-home-gallery__count"
                          aria-hidden="true"
                        >
                          {String(index + 1).padStart(2, '0')} /{' '}
                          {String(HOME_FEATURES.length).padStart(2, '0')}
                        </span>
                      </figure>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div
                className="dsp-home-gallery__selector"
                role="group"
                aria-label="Explore the home"
              >
                {HOME_FEATURES.map((feature, index) => (
                  <button
                    key={feature.key}
                    type="button"
                    className="dsp-home-gallery__choice"
                    aria-pressed={activeHomeIndex === index}
                    onClick={() => handleSelectHomeSlide(index)}
                  >
                    <span className="dsp-home-gallery__thumbnail">
                      <Image
                        src={feature.image}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                        sizes="(max-width: 767px) 150px, 240px"
                      />
                    </span>
                    <span>{feature.title}</span>
                  </button>
                ))}
              </div>
            </div>
            <p className="dsp-fine-print dsp-home__note">
              Architectural and interior renderings are illustrative. Finishes
              and fittings depend on your selected package.
            </p>

            <ul
              className="dsp-specbar"
              aria-label="Home at a glance"
              data-reveal
            >
              {HOME_SPECS.map(({ icon: Icon, value, unit, label }) => (
                <li key={label}>
                  <Icon className="dsp-specbar__icon" aria-hidden="true" />
                  <strong>
                    {value}
                    {unit && <small>{unit}</small>}
                  </strong>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Canvas to Complete */}
        <section
          className="dsp-section dsp-own"
          id="ownership"
          aria-labelledby="ownership-title"
        >
          <div className="dsp-container dsp-own__layout">
            <div className="dsp-own__media" data-reveal>
              <Image
                src={IMAGES.furnished}
                alt="Fully furnished living room with a sculptural staircase, timber panelling and a ring chandelier"
                layout="fill"
                objectFit="cover"
                sizes="(max-width: 991px) 100vw, 50vw"
              />
              <span className="dsp-own__badge">
                <small>Designed for Living</small>
                Fully furnished interior
              </span>
            </div>
            <div className="dsp-own__copy" data-reveal>
              <Eyebrow>Canvas to Complete</Eyebrow>
              <h2 id="ownership-title">
                Different ways <span>to own.</span>
              </h2>
              <p className="dsp-lead">
                Choose a blank canvas to customise or a fully finished home to
                make your own.
              </p>
              <ul className="dsp-packages">
                {PACKAGES.map((item) => (
                  <li key={item.name}>
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.text}</p>
                    </div>
                    <div className="dsp-packages__price">
                      <small>{item.note}</small>
                      <strong>{item.price}</strong>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="dsp-fine-print">
                Centre-unit starting prices, subject to availability. Fixed and
                Flexi payment plans available, confirmed in writing.
              </p>
              <div className="dsp-actions dsp-own__ctas">
                <Link href={PROPERTY_URL} passHref>
                  <a className="dsp-btn dsp-btn--primary">
                    View Property Details <FaArrowRight aria-hidden="true" />
                  </a>
                </Link>
                <Link href={PAYMENT_PLAN_URL} passHref>
                  <a className="dsp-btn dsp-btn--outline">View Payment Plans</a>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          className="dsp-section dsp-process"
          id="how-it-works"
          aria-labelledby="process-title"
        >
          <div className="dsp-container">
            <header className="dsp-heading dsp-heading--center" data-reveal>
              <Eyebrow light>Buying from abroad</Eyebrow>
              <h2 id="process-title">
                Invest from anywhere. <span>Check everything.</span>
              </h2>
              <p>
                Four clear steps, each one possible from wherever you call home
                today.
              </p>
            </header>

            <ol className="dsp-steps">
              {STEPS.map(
                ({ icon: Icon, title, text, href, linkText }, index) => (
                  <li
                    key={title}
                    data-reveal
                    style={{ '--dsp-delay': `${index * 90}ms` }}
                  >
                    <span className="dsp-steps__marker">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <Icon className="dsp-steps__icon" aria-hidden="true" />
                    <h3>{title}</h3>
                    <p>{text}</p>
                    {href && (
                      <Link href={href}>
                        <a className="dsp-steps__link">
                          {linkText} <FaArrowRight aria-hidden="true" />
                        </a>
                      </Link>
                    )}
                  </li>
                ),
              )}
            </ol>

            <div className="dsp-receive" data-reveal>
              <div className="dsp-receive__intro">
                <Eyebrow light>You receive</Eyebrow>
                <p>
                  Documents your lawyer can review. Once fully paid, you can
                  process Governor’s Consent.
                </p>
              </div>
              <ul className="dsp-receive__docs">
                {DOCUMENTS.map(({ icon: Icon, title, text }) => (
                  <li key={title}>
                    <Icon aria-hidden="true" />
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Photo strip */}
        <section
          className="dsp-section dsp-gallery"
          id="gallery"
          aria-labelledby="gallery-title"
        >
          <div className="dsp-container">
            <header className="dsp-heading" data-reveal>
              <Eyebrow>Rendered and rising</Eyebrow>
              <h2 id="gallery-title">
                See the vision. <span>Follow the progress.</span>
              </h2>
            </header>

            <div className="dsp-gallery__grid">
              {GALLERY.map((photo, index) => (
                <figure
                  key={photo.src}
                  className={`dsp-photo dsp-photo--${index + 1}`}
                  data-reveal
                  style={{ '--dsp-delay': `${index * 120}ms` }}
                >
                  <div
                    className="dsp-photo__card"
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedImage(photo)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedImage(photo);
                      }
                    }}
                    aria-label={`Enlarge photo: ${photo.title} - ${photo.caption}`}
                  >
                    <div className="dsp-photo__media">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        layout="fill"
                        objectFit="cover"
                        sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index === 0}
                      />
                      <div className="dsp-photo__scrim" aria-hidden="true" />

                      <div className="dsp-photo__top-bar">
                        {photo.live ? (
                          <span className="dsp-photo__badge dsp-photo__badge--live">
                            <i aria-hidden="true" /> {photo.badge}
                          </span>
                        ) : (
                          <span className="dsp-photo__badge dsp-photo__badge--glass">
                            {photo.badge}
                          </span>
                        )}

                        <span
                          className="dsp-photo__expand-btn"
                          aria-label={`Enlarge ${photo.title}`}
                        >
                          <FaExpand aria-hidden="true" />
                        </span>
                      </div>
                    </div>

                    <figcaption className="dsp-photo__caption">
                      <div className="dsp-photo__meta">
                        <small>{photo.category || photo.label}</small>
                        <span className="dsp-photo__index" aria-hidden="true">
                          0{index + 1}
                        </span>
                      </div>
                      <h3 className="dsp-photo__title">
                        {photo.title}
                        {photo.progress && (
                          <span className="dsp-photo__pct">
                            {' '}
                            · {photo.progress}
                          </span>
                        )}
                      </h3>
                      <p className="dsp-photo__desc">{photo.description}</p>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
            <p className="dsp-fine-print dsp-gallery__note">
              Renderings and interiors are illustrative. Finishes, fittings and
              energy systems depend on your selected package.
            </p>
          </div>
        </section>

        {/* Location */}
        <section
          className="dsp-section dsp-location"
          id="location"
          aria-labelledby="location-title"
        >
          <div className="dsp-container dsp-location__layout">
            <div className="dsp-location__copy" data-reveal>
              <Eyebrow>Location</Eyebrow>
              <h2 id="location-title">
                Sangotedo, <span>Lekki-Epe Expressway.</span>
              </h2>
              <p className="dsp-lead">
                Inside Caribbean Lake City Estate, with two ways home.
              </p>
              <ul className="dsp-routes">
                <li>
                  <span className="dsp-routes__icon">
                    <FaRoad aria-hidden="true" />
                  </span>
                  <span>
                    <small>By road</small>
                    <strong>Along the Lekki-Epe Expressway</strong>
                  </span>
                </li>
                <li>
                  <span className="dsp-routes__icon">
                    <FaShip aria-hidden="true" />
                  </span>
                  <span>
                    <small>By water</small>
                    <strong>Through the estate’s water access</strong>
                  </span>
                </li>
              </ul>
              <div className="dsp-nearby">
                <small>Nearby</small>
                <ul>
                  {NEIGHBOURHOOD.map((place) => (
                    <li key={place}>{place}</li>
                  ))}
                </ul>
              </div>
              <a
                className="dsp-link"
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps{' '}
                <FaArrowUpRightFromSquare aria-hidden="true" />
              </a>
            </div>
            <figure className="dsp-map" data-reveal>
              <div className="dsp-map__frame">
                <Image
                  src={IMAGES.map}
                  alt="Illustrated map showing Blissville Terraces in Caribbean Lake City Estate, reached from the Lekki-Epe Expressway via Thesaurus Gardens Drive, with Omu Creek to the north"
                  layout="fill"
                  objectFit="contain"
                  sizes="(max-width: 991px) 100vw, 60vw"
                />
              </div>
              <figcaption>Illustrated map, not to scale.</figcaption>
            </figure>
          </div>
        </section>

        {/* FAQs */}
        <section
          className="dsp-section dsp-faq"
          id="faqs"
          aria-labelledby="faq-title"
        >
          <div className="dsp-container dsp-faq__layout">
            <div className="dsp-faq__intro" data-reveal>
              <Eyebrow>Frequently asked questions</Eyebrow>
              <h2 id="faq-title">
                Clear answers, <span>before you commit.</span>
              </h2>
              <p>
                Buying from abroad raises fair questions. Here are the ones we
                hear most.
              </p>
              <div className="dsp-faq__help">
                <strong>Still have a question?</strong>
                <span>Message us and a real person will reply.</span>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp aria-hidden="true" /> Ask on WhatsApp
                </a>
              </div>
            </div>
            <div className="dsp-faq__list">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    className={`dsp-faq__item${isOpen ? ' is-open' : ''}`}
                    key={faq.question}
                  >
                    <h3>
                      <button
                        type="button"
                        id={`faq-question-${index}`}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${index}`}
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                      >
                        <span>{faq.question}</span>
                        <i aria-hidden="true">
                          <FaPlus />
                        </i>
                      </button>
                    </h3>
                    <div
                      className="dsp-faq__answer"
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      aria-hidden={!isOpen}
                    >
                      <div>
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Consultation */}
        <section
          className="dsp-consult"
          id="consultation"
          aria-labelledby="consult-title"
        >
          <div className="dsp-consult__media">
            <Image
              src={IMAGES.dusk}
              alt="Blissville Terraces at dusk with the lights on"
              layout="fill"
              objectFit="cover"
              sizes="100vw"
            />
          </div>
          <div className="dsp-container dsp-consult__layout">
            <div className="dsp-consult__copy" data-reveal>
              <Eyebrow light>Your next step</Eyebrow>
              <h2 id="consult-title">See it for yourself.</h2>
              <p className="dsp-lead">
                A short call, at a time that suits your time zone.
              </p>
              <ul className="dsp-consult__points">
                <li>
                  <FaCheck aria-hidden="true" /> A live walkthrough of the home
                </li>
                <li>
                  <FaCheck aria-hidden="true" /> Packages and payment plans,
                  explained
                </li>
                <li>
                  <FaCheck aria-hidden="true" /> Documents for your lawyer to
                  review
                </li>
              </ul>
              <a
                className="dsp-consult__whatsapp"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="dsp-consult__whatsapp-icon">
                  <FaWhatsapp aria-hidden="true" />
                </span>
                <span>
                  <small>Or WhatsApp</small>
                  <strong>{WHATSAPP_NUMBER}</strong>
                </span>
                <FaArrowRight aria-hidden="true" />
              </a>
            </div>

            <div className="dsp-form" data-reveal>
              {isSubmitted ? (
                <div className="dsp-form__success" role="status">
                  <span className="dsp-form__success-icon">
                    <FaCheck aria-hidden="true" />
                  </span>
                  <h3>Thank you, {formData.fullName.split(' ')[0]}.</h3>
                  <p>
                    Your request has been received. We’ll contact you by{' '}
                    {formData.contactChannel} within 6 hours to arrange a time
                    that works for you.
                  </p>
                  <button
                    type="button"
                    className="dsp-btn dsp-btn--outline"
                    onClick={() => {
                      setFormData(INITIAL_FORM);
                      setIsSubmitted(false);
                    }}
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} aria-busy={isSubmitting}>
                  <h3>Book a Virtual Consultation</h3>
                  <fieldset disabled={isSubmitting}>
                    <legend className="visually-hidden">
                      Your consultation details
                    </legend>
                    <div className="dsp-form__row">
                      <div className="dsp-field">
                        <label htmlFor="fullName">Full name</label>
                        <input
                          id="fullName"
                          name="fullName"
                          autoComplete="name"
                          required
                          placeholder="Your full name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="dsp-field">
                        <label htmlFor="email">Email address</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="dsp-form__row">
                      <div className="dsp-field">
                        <label htmlFor="country">Country of residence</label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          required
                          value={formData.country}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>
                            Select country
                          </option>
                          {COUNTRIES.map((country) => (
                            <option key={country}>{country}</option>
                          ))}
                        </select>
                      </div>
                      <div className="dsp-field">
                        <label htmlFor="whatsapp">
                          WhatsApp {!phoneRequired && <small>(optional)</small>}
                        </label>
                        <input
                          id="whatsapp"
                          name="whatsapp"
                          type="tel"
                          autoComplete="tel"
                          required={phoneRequired}
                          placeholder="+44 7700 900000"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="dsp-field">
                      <label htmlFor="homePurpose">What is the home for?</label>
                      <select
                        id="homePurpose"
                        name="homePurpose"
                        required
                        value={formData.homePurpose}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          Choose one
                        </option>
                        {PURPOSES.map((purpose) => (
                          <option key={purpose}>{purpose}</option>
                        ))}
                      </select>
                    </div>
                    <fieldset className="dsp-segmented">
                      <legend>Preferred contact</legend>
                      <div>
                        {CONTACT_CHANNELS.map((channel) => (
                          <label key={channel}>
                            <input
                              type="radio"
                              name="contactChannel"
                              value={channel}
                              checked={formData.contactChannel === channel}
                              onChange={handleInputChange}
                            />
                            <span>{channel}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <div className="dsp-consent">
                      <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        required
                        checked={formData.consent}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="consent">
                        I agree that Highrachy Investment &amp; Technology
                        Limited (Blissville) may contact me about Blissville
                        Terraces. I can opt out at any time. See our{' '}
                        <Link href="/terms-of-use">
                          <a>Privacy Policy</a>
                        </Link>
                        .
                      </label>
                    </div>
                    {submitError && (
                      <p className="dsp-form__error" role="alert">
                        {submitError}{' '}
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Contact us on WhatsApp
                        </a>
                      </p>
                    )}
                    <button
                      className="dsp-btn dsp-btn--primary dsp-btn--block"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? 'Sending your request…'
                        : 'Take the First Step Home'}
                      <FaArrowRight aria-hidden="true" />
                    </button>
                    <p className="dsp-form__reply">
                      <FaClock aria-hidden="true" /> We reply within 6 hours.
                    </p>
                  </fieldset>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Pre-footer brand band */}
      <aside
        className="dsp-band"
        aria-label="Contact Highrachy Investment & Technology Limited"
      >
        <div className="dsp-container dsp-band__layout">
          <div className="dsp-band__brand">
            <span className="dsp-band__label">Developed by</span>
            <strong className="dsp-band__company">
              Highrachy Investment &amp; Technology Limited
            </strong>
            <address>
              <FaLocationDot aria-hidden="true" />
              <span>
                3rd Floor, Ibukun House, 70 Adetokunbo Ademola Street, Victoria
                Island, Lagos
              </span>
            </address>
            <div className="dsp-band__social">
              <span className="dsp-band__label">Follow Blissville</span>
              <div>
                {socialMediaLinks.map(({ name, icon, url }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Blissville on ${name}`}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="dsp-band__contact">
            <a className="dsp-band__tile" href="tel:+2349055555146">
              <span className="dsp-band__tile-icon">
                <FaPhone aria-hidden="true" />
              </span>
              <span>
                <small>Call us</small>
                <strong>{WHATSAPP_NUMBER}</strong>
              </span>
              <FaArrowRight
                className="dsp-band__tile-arrow"
                aria-hidden="true"
              />
            </a>
            <a
              className="dsp-band__tile"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="dsp-band__tile-icon dsp-band__tile-icon--whatsapp">
                <FaWhatsapp aria-hidden="true" />
              </span>
              <span>
                <small>WhatsApp</small>
                <strong>Chat with an advisor</strong>
              </span>
              <FaArrowRight
                className="dsp-band__tile-arrow"
                aria-hidden="true"
              />
            </a>
            <a className="dsp-band__tile" href="mailto:info@blissville.com.ng">
              <span className="dsp-band__tile-icon">
                <FaEnvelope aria-hidden="true" />
              </span>
              <span>
                <small>Email us</small>
                <strong>info@blissville.com.ng</strong>
              </span>
              <FaArrowRight
                className="dsp-band__tile-arrow"
                aria-hidden="true"
              />
            </a>
          </div>

          <a
            className="dsp-band__press"
            href={NAIRAMETRICS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="dsp-band__press-top">
              <small>As seen on</small>
              <span className="dsp-band__press-date">April 2026</span>
            </span>
            <strong className="dsp-band__masthead">Nairametrics</strong>
            <span className="dsp-band__quote">
              Peace of mind by design: Blissville’s blueprint for
              wellness-first, tech-enabled urban living in Lagos.
            </span>
            <span className="dsp-band__read">
              Read the feature <FaArrowUpRightFromSquare aria-hidden="true" />
            </span>
          </a>
        </div>
      </aside>
      <Footer />

      <Modal
        show={!!selectedImage}
        onHide={() => setSelectedImage(null)}
        centered
        size="xl"
        aria-labelledby="diaspora-photo-title"
        className="dsp-lightbox"
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title id="diaspora-photo-title">
            {selectedImage?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedImage && (
            <>
              <div className="dsp-lightbox__image">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  layout="fill"
                  objectFit="contain"
                  sizes="90vw"
                />
              </div>
              <p>{selectedImage.caption}</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
