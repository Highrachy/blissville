import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ReactPlayer from 'react-player';

import { PROJECT_STATUS } from '@/utils/constants';
import Navigation from '@/components/layouts/Navigation';
import BuyNowButton from '@/components/utils/BuyNowButton';
import CustomPlan from '@/components/common/CustomPlan';
import {
  BrochureButton,
  Gallery,
  LocationMapSection,
} from './our-projects/[slug]';
import FAQsAccordion from '@/components/common/FAQsAccordion';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import Footer from '@/components/common/Footer';
import Section from '@/components/common/Section';
import Button from '@/components/forms/Button';
import { moneyFormatInNaira } from '@/utils/helpers';
import ProjectInterestModal from '@/components/common/ProjectInterestModal';

import {
  FaBath,
  FaBatteryFull,
  FaBed,
  FaCar,
  FaCartShopping,
  FaCertificate,
  FaCopy,
  FaDownload,
  FaDroplet,
  FaDumbbell,
  FaFilePdf,
  FaFilm,
  FaFire,
  FaFireExtinguisher,
  FaHouse,
  FaLaptop,
  FaLayerGroup,
  FaSeedling,
  FaShip,
  FaSolarPanel,
  FaTableTennisPaddleBall,
  FaTree,
  FaVideo,
  FaWifi,
  FaShieldHalved,
  FaWater,
  FaBolt,
  FaLeaf,
  FaWaterLadder,
} from 'react-icons/fa6';
import { ImQuotesRight } from 'react-icons/im';
import faqs from '@/data/faqs';
import SeoHead from '@/components/utils/SeoHead';
import { FaCheckCircle } from 'react-icons/fa';

const AMENITY_ITEMS = [
  { label: '24/7 Security', icon: FaShieldHalved },
  { label: 'Clean Water', icon: FaDroplet },
  { label: 'Stable Electricity', icon: FaBolt },
  { label: 'Smart/Connected Community', icon: FaWifi },
  { label: 'CCTV Coverage', icon: FaVideo },
  { label: 'Bio-Friendly Environment', icon: FaLeaf },
  { label: 'Water Activities', icon: FaWater },
  { label: 'Astro Turf Sports Space', icon: FaTableTennisPaddleBall },
  { label: 'Estate Supermarket', icon: FaCartShopping },
  { label: 'Lounge and Gym', icon: FaDumbbell },
  { label: 'Gardens and Playground', icon: FaTree },
  { label: 'Fire Fighting Apparatus', icon: FaFireExtinguisher },
  { label: 'Home Office Space', icon: FaLaptop },
  { label: 'Water Transportation', icon: FaShip },
  { label: 'Trees and Gardens', icon: FaSeedling },
  { label: 'Lake Front View', icon: FaWaterLadder },
  { label: 'Inverter System', icon: FaBatteryFull, class: 'standard' },
  { label: 'Smart Solar', icon: FaSolarPanel, class: 'standard' },
  { label: 'Fire Detection', icon: FaFire, class: 'standard' },
  { label: 'Home Cinema', icon: FaFilm, class: 'standard' },
];

const NEIGHBORHOODS = [
  { name: 'Giwa Water Park', category: 'Recreation' },
  { name: 'Omu Resort', category: 'Recreation' },
  { name: 'Novare Mall (Shoprite)', category: 'Shopping' },
  { name: 'iFitness Gym', category: 'Fitness' },
  { name: 'Green Springs Schools', category: 'Education' },
  { name: 'Sangotedo Central Mosque', category: 'Worship' },
  { name: 'Sangotedo Jetty', category: 'Transportation' },
  { name: 'Corona Day Secondary School', category: 'Education' },
  { name: 'Medical Centres', category: 'Hospitals' },
  { name: 'Elevation Church', category: 'Worship' },
  { name: 'Lagos Business School (LBS)', category: 'Education' },
  { name: 'Pan-Atlantic University', category: 'Education' },
  { name: 'Tennis Academy', category: 'Sports' },
  { name: 'Domino’s Pizza', category: 'Food and Dining' },
];

const GALLERY_GRID_IMAGES = [
  '/assets/img/landing/3.png',
  '/assets/img/landing/4.png',
  '/assets/img/landing/2.png',
  '/assets/img/landing/6.png',
  '/assets/img/landing/1.png',
  '/assets/img/landing/5.png',
];

const GalleryGrid = () => (
  <div className="row row-cols-2 g-3">
    {GALLERY_GRID_IMAGES.map((src, i) => (
      <div className="col" key={i}>
        <div className="thumb overflow-hidden position-relative h-100">
          <Image
            src={src}
            alt={`Gallery ${i + 1}`}
            width={600}
            height={600}
            className="img-fluid img-cover h-100 rounded-3"
            priority={i === 0}
          />
        </div>
      </div>
    ))}
  </div>
);

const Features = ({ property }) => {
  const features = [
    { icon: <FaBed />, label: 'Bedrooms', value: '4 Bedrooms' },
    { icon: <FaBath />, label: 'Bathrooms', value: '5 Bathrooms' },
    { icon: <FaLayerGroup />, label: 'Size', value: `${property.size} sqm` },
    { icon: <FaCar />, label: 'Parking Spaces', value: '2 Cars' },
  ];

  return (
    <div className="row row-cols-2 row-cols-md-2 g-3">
      {features.map((f) => (
        <div className="col" key={f.label}>
          <div className="border rounded-4 text-muted py-5 px-4 h-100">
            <div className="mb-2 fw-bold fs-5">
              <span className="pe-2">{f.icon}</span>
              {f.label}
            </div>
            <div className="fw-semibold">{f.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const HeroSection = ({ property }) => {
  const [showModal, setShowModal] = useState(false);
  const image =
    'https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-2-night.jpg';

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
            A HOME THAT FEELS LIKE PARADISE
          </p>
          <h1 className="text-display mb-2 mb-md-4">Blissville Terraces</h1>

          <div className="d-flex flex-wrap text-white mb-3">
            <span className="me-3 d-flex align-items-center">
              <FaHouse className="me-2" /> 3-level Waterview Duplex
            </span>
            <span className="me-3 d-flex align-items-center">
              <FaCertificate className="me-2" /> Certificate of Occupancy
            </span>
          </div>

          <div className="d-flex flex-wrap align-items-center gap-2">
            <BuyNowButton
              className="btn-wide"
              property={property}
              paymentPlan={0}
              initialPayment={property?.price}
              packageName={property?.packageName || 'Shell'}
            />

            <Button
              className="btn-wide"
              color="primary"
              onClick={() => setShowModal(true)}
            >
              I am Interested
            </Button>

            <ProjectInterestModal
              show={showModal}
              onHide={() => setShowModal(false)}
              propertyName={property?.name}
              property={property}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const OverviewSection = ({ property }) => (
  <Section altBg2 id="overview">
    <div className="container">
      <div className="row align-items-start g-4 g-md-5">
        {/* Left: Copy + Stats */}
        <div className="col-12 col-md-6">
          <h2 className="fw-extrabold h2 h1-md">
            Designed for <span className="text-primary-600">Comfort</span>.{' '}
            <br /> Built for{' '}
            <span className="text-secondary-700">Tomorrow</span>.
          </h2>

          <p className="mt-3">
            Blissville Terraces blends modern architecture with smart,
            energy-efficient systems in an eco-friendly, connected community.
            Enjoy lakeside calm with city convenience—schools, shopping, gyms,
            and transport are moments away.
          </p>

          <div className="mt-4">
            <a
              className="d-flex text-muted text-link align-items-center gap-3 text-decoration-none"
              href="#exclusive-guide"
            >
              <span className="fs-1">
                <FaFilePdf />
              </span>
              <span>
                <div className="small">Get our Free Guide:</div>
                <div className="fw-bold">Beyond the Hype of Modern Housing</div>
              </span>
            </a>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <Features property={property} />
        </div>
      </div>
    </div>
  </Section>
);

function FeaturesAmenities() {
  return (
    <Section>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h3 className="fw-bold">Features and Amenities</h3>
        </div>

        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-5">
          {AMENITY_ITEMS.map(({ label, icon: Icon }) => (
            <div className="col" key={label}>
              <div className="text-center">
                <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3">
                  <Icon className="fs-5 text-dark" aria-hidden />
                </div>
                <div className="fw-semibold">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function VideoContainer() {
  const [playing, setPlaying] = useState(false);
  const videoThumbnail =
    'https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-3.jpg';
  const videoURL = 'https://www.blissville.com.ng/videos/blissville-video.mp4';

  return (
    <div
      className="ratio ratio-4x3 mb-3 position-relative"
      style={{ borderRadius: '8px', overflow: 'hidden' }}
    >
      {!playing && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            background: 'rgba(0,0,0,0.45)',
            zIndex: 2,
            cursor: 'pointer',
          }}
          onClick={() => setPlaying(true)}
        >
          <Image
            src={videoThumbnail}
            alt="Blissville Terraces Video Thumbnail"
            layout="fill"
            objectFit="cover"
            style={{ filter: 'brightness(0.8)' }}
            priority
          />
          <span
            style={{
              position: 'absolute',
              color: '#fff',
              fontSize: 64,
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '50%',
              padding: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.3)" />
              <polygon points="26,20 48,32 26,44" fill="#fff" />
            </svg>
          </span>
        </div>
      )}
      <ReactPlayer
        url={videoURL}
        width="100%"
        height="100%"
        controls
        playing={playing}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </div>
  );
}

const PropertyFeatureBlock = ({ property }) => {
  const { name } = property;
  const project = property.project.data.attributes;

  return (
    <Section className="test">
      <div className="container">
        <div className="row g-4 align-items-start">
          {/* LEFT */}
          <div className="col-12 col-lg-6">
            <h2 className="fw-bolder font-primary">{name} + BQ</h2>
            <p className="mb-4" style={{ lineHeight: 1.8 }}>
              A refined, three-level family home with a private boys’ quarters,
              dedicated home office, and a flexible bonus room for a cinema or
              gym. Smart systems, serene lake views, and access to premium
              estate amenities for a seamless, cost-efficient lifestyle.
            </p>

            <small className="text-muted fw-bold mt-5">Prices From</small>
            <h2 className="text-primary lh-sm pb-3">
              {moneyFormatInNaira(25_000_000)}
              <span className="text-sm text-muted-light">
                / Initial Deposit
              </span>
            </h2>

            <Button color="info" className="mt-3 me-3" href={'#payment-plan'}>
              <FaCopy /> View Payment Plan
            </Button>
            <BrochureButton brochureURL={project?.brochureURL} />
          </div>

          {/* RIGHT */}
          <div className="col-12 col-lg-6">
            <VideoContainer />
          </div>
        </div>
      </div>
    </Section>
  );
};

function Neighborhood() {
  return (
    <Section className="bg-light">
      <div className="container">
        <h2 className="h3 fw-bold mb-1">Everything Within Reach</h2>
        <p className="text-dark mt-1 mb-5">
          Schools, malls, gyms, parks, and transport are all conveniently
          located in the Sangotedo corridor.
        </p>

        <div className="row g-0 align-items-stretch">
          <div className="col-12 col-lg-7">
            <ul className="location-list row list-unstyled">
              {NEIGHBORHOODS.map(({ name, category }, index) => (
                <li key={index} className="col-12 col-md-6">
                  <div className="d-flex align-items-center py-3">
                    <span className="location-icon me-3" />
                    <div>
                      <h6 className="mb-0 text-dark fw-semibold">{name}</h6>
                      <p className="my-0 text-muted small">{category}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-lg-5">
            <GalleryGrid />
          </div>
        </div>
      </div>
    </Section>
  );
}

const ReviewsSection = () => {
  const name = 'Mrs M. Adefolaju';
  const testimonial = `Investing with Blissville apartments was our first foray into real estate investments, and I must add that it was a smart move! My hubby and I were concerned about the Naira's decline, and Blissville provided a great solution. We invested in 3 bedroom apartment by the Lekki Conservation Centre, opposite Chevron, and finished the unit to our taste. When we sold, we not only protected our capital from the incessant Naira devaluation but also made a profit of approximately 43%. Blissville's team was incredibly helpful throughout the process, making it a smooth and rewarding experience.`;

  return (
    <Section altBg2>
      <div className="container">
        <div className="text-primary text-center">
          <ImQuotesRight size="96" />
          <h3 className="mt-3">
            What People are saying about Blissville Terraces
          </h3>
        </div>

        <div className="row">
          <aside className="text-center">
            <div className="testimonial-listing__container col-lg-9 col-md-10 col-sm-11 col-11 mx-auto">
              <div className="py-2">
                <p className="lead mb-4">{testimonial}</p>
                <h5 className="text-primary">{name}</h5>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
};

const ExclusiveGuide = ({ projectName = 'Blissville Terraces' }) => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const onSubmit = (e) => {
    e.preventDefault();

    const link = document.createElement('a');
    link.href = '/docs/beyond-the-hype.pdf';
    link.download = 'Blissville-Exclusive-Guide.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setSent(true);
  };

  return (
    <Section altBg2>
      <div className="container">
        <div className="row align-items-center gy-4" id="exclusive-guide">
          <div className="col-lg-6">
            <h2 className="fw-bold text-dark mb-4">
              Get the Free Guide: <br /> Beyond the Hype of Modern Housing
            </h2>
            <p className="text-muted lh-lg">
              This isn’t just another brochure. It’s your{' '}
              <strong>free insider’s guide</strong> to {projectName}, revealing
              market insights, neighborhood advantages, lifestyle highlights,
              and the smarter way to secure your future home.
            </p>

            {!sent ? (
              <form onSubmit={onSubmit} className="row g-3">
                <div className="col-12 col-md-6">
                  <input
                    className="form-control"
                    placeholder="Full Name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
                <div className="col-12 col-md-6">
                  <input
                    className="form-control"
                    placeholder="Phone Number"
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
                <div className="col-12 col-md-6 d-grid">
                  <button
                    className="btn btn-primary text-white text-sm"
                    type="submit"
                  >
                    <FaFilePdf className="ms-2" /> Download Free Guide
                  </button>
                </div>
                <div className="col-12">
                  <div className="form-text">
                    We respect your privacy. By submitting, you agree to be
                    contacted if we can support you further.
                  </div>
                </div>
              </form>
            ) : (
              <div
                className="alert alert-success d-flex align-items-center"
                role="alert"
              >
                <FaCheckCircle className="me-2" /> Thanks! Your free guide is
                downloading now.
              </div>
            )}
          </div>

          <div className="col-lg-6">
            <div className="border rounded-4 p-4 h-100 bg-light">
              <h5 className="fw-bold">Inside the Free Guide:</h5>
              <ul className="mb-0">
                <li>
                  Why Blissville Terraces is more than just another property
                </li>
                <li>Market trends & projected growth opportunities</li>
                <li>Neighborhood highlights & commute times</li>
                <li>Design details & eco-friendly finishes</li>
                <li>Step-by-step path to secure your home</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default function SingleProjectPage({ property }) {
  const navigation = [
    { title: 'Overview', url: '#overview' },
    { title: 'Gallery', url: '#gallery' },
    { title: 'Payment Plans', url: '#payment-plans' },
    { title: 'Amenities', url: '#amenities' },
    { title: 'Location', url: '#location' },
    { title: 'Contact', url: '#contact' },
  ];

  const router = useRouter();
  if (router.isFallback) return <div>Loading...</div>;

  const project = property?.project?.data?.attributes;

  const mergedGalleries = [
    ...(property?.property_galleries?.data || []),
    ...(project?.project_galleries?.data || []),
  ];

  return (
    <>
      <SeoHead
        title="Blissville Terraces | Luxury Waterfront Duplexes in Sangotedo, Lagos"
        description="Explore Blissville Terraces — luxury 4-bedroom waterfront duplexes in Sangotedo, Lagos. Enjoy lake views, modern architecture, and smart living near Novare Mall and Lagos Business School. Built by trusted developer Highrachy."
        canonical="https://www.blissville.com.ng/our-projects/blissville-terraces"
        ogImage="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-2-night.jpg"
        keywords={[
          'Blissville Terraces Sangotedo',
          'Luxury homes in Lagos',
          'Waterfront duplex for sale Lagos',
          'Homes near Novare Mall',
          'Lagos Business School housing',
          '4-bedroom duplex Lekki',
          'Highrachy real estate',
          'Smart homes in Sangotedo',
          'Waterfront living Lagos',
          'Energy-efficient homes Nigeria',
        ]}
      />
      <Navigation navigation={navigation} />
      <HeroSection property={property} />
      <PropertyFeatureBlock property={property} />
      <OverviewSection property={property} />
      <FeaturesAmenities />
      <Neighborhood />
      <CustomPlan property={property} />

      <ReviewsSection />

      <div className="pb-6">
        <Gallery galleries={mergedGalleries} />
      </div>

      <Section altBg>
        <div className="container">
          <div className="row">
            <h4 className="pb-3">Frequently Asked Questions</h4>
            <FAQsAccordion faqs={faqs[0].faqs} />
          </div>
        </div>
      </Section>

      <ExclusiveGuide />
      <LocationMapSection
        locationMapURL={project?.locationMapURL}
        name={project?.name}
        googleMapLatLng={project?.googleMapLatLng}
      />
      <ScheduleVisit />
      <Footer />
    </>
  );
}

export async function getStaticProps({ params }) {
  const id = 3; // blissville terraces id
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/properties`;

  const { data } = await axios.get(apiUrl, {
    params: { 'filters[id][$eq]': id, populate: '*' },
  });

  const propertyData = data?.data[0]?.attributes;
  const project = propertyData.project;
  const projectId = project?.data?.id;

  let projectData = null;
  if (projectId) {
    const projectRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${projectId}`,
      { params: { populate: '*' } }
    );
    projectData = projectRes?.data || {};
  }

  const similarPropertiesRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties`,
    {
      params: {
        populate: '*',
        'filters[project][id][$eq]': projectId,
        'filters[slug][$ne]': id,
      },
    }
  );

  const featuredPropertiesRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties`,
    {
      params: {
        populate: '*',
        'pagination[pageSize]': 3,
        sort: 'createdAt:desc',
        'filters[project][id][$ne]': projectId,
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

  return {
    props: {
      property: { ...propertyData, project: projectData },
      featuredProperties: featuredPropertiesRes?.data?.data || [],
      similarProperties: similarPropertiesRes?.data?.data || [],
      projects: projectRes?.data?.data || [],
    },
    revalidate: 10,
  };
}
