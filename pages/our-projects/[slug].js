import React, { useMemo } from 'react';
import Image from 'next/image';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import classNames from 'classnames';
import Button from '@/components/forms/Button';
import Section from '@/components/common/Section';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import { FeaturedProperties } from '@/components/layouts/FeaturedProperties';
import { Tab } from 'react-bootstrap';
import FAQsAccordion from '@/components/common/FAQsAccordion';
import { useRouter } from 'next/router';
import {
  getLocationFromAddress,
  getPrice,
  moneyFormatInNaira,
} from '@/utils/helpers';
import { getShortDate } from '@/utils/date-helpers';
import axios from 'axios';
import { PROJECT_STATUS_NAME, PROPERTY_STATUS } from '@/utils/constants';
import ProjectInterestModal, {
  ProjectInterestContent,
} from '@/components/common/ProjectInterestModal';
import { FaCaretDown } from 'react-icons/fa6';
import ShareButton from '@/components/common/ShareButton';
import { FaFilePdf, FaMap, FaMapPin } from 'react-icons/fa6';
import OverviewCard from '@/components/common/OverviewCard';
import ProjectHeaderSection from '@/components/common/ProjectHeaderSection';
import ReactPlayer from 'react-player';
import CompactPropertyCard from '@/components/common/CompactPropertyCard';
import BuyNowButton from '@/components/utils/BuyNowButton';

export default function SingleProjectPage({ project, featuredProperties }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const {
    name,
    image,
    description,
    startingPrice,
    type,
    delivery,
    city,
    state,
    status,
    locationMapURL,
    googleMapLatLng,
    videoURL,
  } = project || {};

  const faqs = project?.faqs?.data || [];
  const allFaqs =
    faqs?.map(({ attributes: { question, answer } }) => ({
      question,
      answer,
    })) || [];

  const { slug } = router.query;

  const shareUrl = `https://blissville.com.ng/our-projects/${slug}`;
  const neighborhoods = project?.neighborhoods?.data || [];
  const property = project?.properties?.data?.[0]?.attributes || {};

  return (
    <>
      <Navigation />
      <PageHeader
        title="Our Projects"
        subHeader="Powered By Highrachy"
        bgImage="/assets/img/bg/investors.jpeg"
      />

      <Section noPaddingBottom>
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <h2>{name}</h2>
              <p className="lead">{getLocationFromAddress(project)}</p>
            </div>
            <div className="col-sm-4 text-md-end mb-4 mb-md-0">
              <BuyNowButton
                className="px-3 btn-wide"
                property={property}
                paymentPlan={0}
                initialPayment={property?.price}
                packageName={property?.packageName || 'Shell'}
              />
            </div>
            <ProjectHeaderSection
              image={image}
              status={status || 'In Progress'}
              type={type}
              city={city}
              state={state}
              delivery={getShortDate(delivery)}
              startingPrice={getPrice(startingPrice)}
              hasGallery={!!project?.project_galleries?.data?.length}
              hasVideo={!!videoURL}
              hasLocationMap={!!locationMapURL}
            />
          </div>
        </div>
      </Section>
      <Section noPaddingTop className="bg-gray-50 pt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <OverviewCard header="Description">
                <DescriptionParagraphs text={description} defaultVisible={2} />
                <BrochureButton brochureURL={project?.brochureURL} />
              </OverviewCard>
              <OverviewCard header="Project Overview">
                <ul className="list-dotted list-unstyled">
                  <li>
                    <span className="list-dotted__label">Property Type </span>
                    <span className="list-dotted__value">{type}</span>
                  </li>
                  <li>
                    <span className="list-dotted__label">Location </span>
                    <span className="list-dotted__value">
                      {city}, {state}
                    </span>
                  </li>
                  <li>
                    <span className="list-dotted__label">Prices From </span>
                    <span className="list-dotted__value">
                      {getPrice(startingPrice)}
                    </span>
                  </li>
                  <li>
                    <span className="list-dotted__label">Delivery </span>
                    <span className="list-dotted__value">
                      {getShortDate(delivery)}
                    </span>
                  </li>
                  <li>
                    <span className="list-dotted__label">Status</span>
                    <span className="list-dotted__value">
                      {PROJECT_STATUS_NAME[status] || '-'}
                    </span>
                  </li>
                </ul>
              </OverviewCard>
              <OverviewCard header="Features">
                <FeatureList project={project} />
              </OverviewCard>

              {videoURL && (
                <VideoContainer videoURL={videoURL} videoThumbnail={image} />
              )}

              <NeighborhoodList neighborhoods={neighborhoods} slug={slug} />
              {/* add an overviewcard that shows properties in the project, build a small version of singlePropertynew component showing the property image and name*/}
              {project?.properties?.data?.length > 0 && (
                <section className="mt-5">
                  <h4 className="mb-4">Properties in {project?.name}</h4>
                  <div className="row">
                    {project.properties.data.map((property, idx) => (
                      <CompactPropertyCard
                        key={property.id || idx}
                        {...property}
                        compact
                        projectSlug={project?.slug}
                      />
                    ))}
                  </div>
                </section>
              )}

              <div className="mb-5"></div>
            </div>
            <div className="col-md-4 position-relative">
              <div className="interest sticky-top">
                <OverviewCard className="p-4">
                  <ProjectInterestContent
                    header="Interested in this property?"
                    propertyName={name}
                    property={project?.properties?.data?.[0]?.attributes}
                    shareText={`Hi, Please check out ${name} on Blissville!`}
                  />
                </OverviewCard>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Gallery galleries={project?.project_galleries?.data || []} />

      <LocationMapSection
        locationMapURL={locationMapURL}
        name={name}
        googleMapLatLng={googleMapLatLng}
      />

      {allFaqs && allFaqs.length > 0 && (
        <section className="container">
          <div className="row">
            <h4>FAQs</h4>
            <FAQsAccordion faqs={allFaqs} />
          </div>
        </section>
      )}
      <div className="mt-7"></div>
      <ScheduleVisit />
      <Footer />
    </>
  );
}

const PACKAGE = {
  ALL: 'all',
  SHELL: 'shell',
  STANDARD: 'standard',
  SUPREME: 'supreme',
};

const MAX_VISIBLE = 8;

export const FeatureList = ({ project, type = PACKAGE.ALL }) => {
  const [showAll, setShowAll] = React.useState(false);

  const featuresByPackage = {
    [PACKAGE.SHELL]: project.features,
    [PACKAGE.STANDARD]: project.standardFeatures,
    [PACKAGE.SUPREME]: project.supremeFeatures,
  };

  // Flatten and normalize feature list
  const allFeatures = [];
  Object.entries(featuresByPackage).forEach(([key, value], index) => {
    value?.split(',').forEach((feature) => {
      const trimmed = feature.trim();
      if (!trimmed) return;

      allFeatures.push({
        key: `${trimmed}-${index}`,
        text: trimmed,
        pkg: key,
      });
    });
  });

  const visibleFeatures = showAll
    ? allFeatures
    : allFeatures.slice(0, MAX_VISIBLE);

  return (
    <>
      <ul className="my-4 row list-features">
        {visibleFeatures.map(({ key, text, pkg }) => (
          <li
            key={key}
            className={classNames('col-md-6', {
              invalid:
                type !== PACKAGE.ALL &&
                ((type === PACKAGE.SHELL && pkg !== PACKAGE.SHELL) ||
                  (type === PACKAGE.STANDARD && pkg === PACKAGE.SUPREME)),
              standard: pkg === PACKAGE.STANDARD,
              supreme: pkg === PACKAGE.SUPREME,
            })}
          >
            {text}
            {/* Optionally uncomment tooltip */}
            {/* <FormTooltip
              text={
                pkg === PACKAGE.SHELL
                  ? 'Available in all packages'
                  : pkg === PACKAGE.STANDARD
                  ? 'Available in Standard and Supreme Packages'
                  : 'Available in Supreme Package only'
              }
              position="top"
            /> */}
          </li>
        ))}
      </ul>

      {allFeatures.length > MAX_VISIBLE && (
        <div className="mt-3">
          <Button
            color="primary-light"
            className="btn-wide"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'View Less' : 'View All Features'}
          </Button>
        </div>
      )}
    </>
  );
};

export const LocationMapSection = ({
  locationMapURL,
  name,
  googleMapLatLng,
}) => {
  if (!locationMapURL) {
    return null;
  }

  return (
    <Section id="location-map">
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>Location Map</h4>
            <div className="mb-4" style={{ width: '100%' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={locationMapURL}
                alt={`${name} Location Map`}
                className="img-fluid border border-2 border-light rounded img-cover"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
            {googleMapLatLng && (
              <Button
                color="primary-light"
                className="me-2 my-2 px-4"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.google.com/maps?saddr=My+Location&daddr=${googleMapLatLng}`}
              >
                <FaMap /> View on Google Maps
              </Button>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export function BrochureButton({ brochureURL }) {
  if (!brochureURL) return null;
  return (
    <Button
      color="primary"
      className="mt-3"
      href={brochureURL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaFilePdf className="me-2" />
      Download Brochure
    </Button>
  );
}

export function VideoContainer({ videoThumbnail, videoURL }) {
  const [playing, setPlaying] = React.useState(false);

  return (
    <OverviewCard id="video" header="Video">
      <div
        className="ratio ratio-16x9 mb-3 position-relative"
        style={{
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
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
              style={{ filter: 'brightness(0.6)' }}
              priority
            />
            <span
              style={{
                position: 'absolute',
                color: '#fff',
                fontSize: 64,
                background: 'rgba(0,0,0,0.5)',
                borderRadius: '50%',
                padding: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.5)" />
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
    </OverviewCard>
  );
}

export function NeighborhoodList({ neighborhoods }) {
  const [showAll, setShowAll] = React.useState(false);

  if (!neighborhoods || neighborhoods.length === 0) return null;

  const visibleNeighborhoods = showAll
    ? neighborhoods
    : neighborhoods.slice(0, MAX_VISIBLE);

  return (
    <OverviewCard header="Neighborhood">
      <ul className="location-list row list-unstyled">
        {visibleNeighborhoods.map(
          ({ attributes: { location, category } }, index) => (
            <li key={index} className="col-12 col-md-6 pb-0">
              <div className="d-flex align-items-center py-3">
                <div className="me-3 d-flex align-items-center justify-content-center">
                  <span className="location-icon" />
                </div>
                <div>
                  <h6 className="mb-0 text-dark fw-semibold">{location}</h6>
                  <p className="my-0 text-muted small">{category}</p>
                </div>
              </div>
            </li>
          )
        )}
      </ul>

      {neighborhoods.length > MAX_VISIBLE ? (
        <Button
          color="primary-light"
          className="me-2 my-3 px-4"
          onClick={() => setShowAll(true)}
        >
          View All Neighborhoods
        </Button>
      ) : (
        <Button
          color="primary-light"
          className="me-2 my-3 px-4"
          rel="noopener noreferrer"
          href="#location-map"
        >
          <FaMapPin className="me-2" />
          View Location Map
        </Button>
      )}
    </OverviewCard>
  );
}

export function DescriptionParagraphs({ text, defaultVisible = 1 }) {
  const [showAll, setShowAll] = React.useState(false);
  if (!text) return null;
  const paragraphs = text.split('\n\n');
  const visible = paragraphs.slice(0, defaultVisible);
  const rest = paragraphs.slice(defaultVisible);

  return (
    <div>
      {visible.map((para, idx) => (
        <p key={idx}>{para}</p>
      ))}
      {!showAll && rest.length > 0 && (
        <ReadMoreText onClick={() => setShowAll(true)} />
      )}
      {showAll &&
        rest.map((para, idx) => <p key={idx + visible.length}>{para}</p>)}
    </div>
  );
}

export const ReadMoreText = ({ text = 'Read More', onClick }) => (
  <p>
    <strong style={{ cursor: 'pointer' }} onClick={onClick}>
      {text} <FaCaretDown />
    </strong>
  </p>
);

function FeaturesList() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? output : output.slice(0, 10);
  return (
    <>
      <ul className="my-4 row list-features">
        {visible.map((item) => (
          <li key={item.key} className={item.className}>
            {item.feature}
          </li>
        ))}
      </ul>
      {!showAll && output.length > 10 && (
        <ReadMoreText text="View more" onClick={() => setShowAll(true)} />
      )}
    </>
  );
}

const GalleryGrid = () => {
  const IMAGES = [
    'https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-1-front.jpg',
    'https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-3-focus.jpg',
    'https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-2-night.jpg',
    'https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-1-night.jpg',
  ];

  return (
    <>
      <div className="row row-cols-2 g-3">
        {IMAGES.map((src, i) => (
          <div className="col" key={i}>
            <div className="thumb rounded-3 overflow-hidden position-relative h-100">
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                layout="fill"
                className="img-fluid img-cover h-100"
                priority={i === 0}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export const Gallery = ({ galleries, className }) => {
  if (!galleries || galleries.length === 0) {
    return null;
  }

  const groupedGalleries = galleries.reduce((acc, gallery) => {
    const description = gallery.attributes.description;
    if (!acc[description]) {
      acc[description] = [];
    }
    acc[description].push(gallery);
    return acc;
  }, {});

  return (
    <Section className={className} noPaddingBottom>
      <div id="gallery" className="container">
        <h3>Gallery</h3>
        {Object.entries(groupedGalleries).map(
          ([description, images], groupIndex) => (
            <div key={groupIndex} className="mb-5">
              <h5 className="text-primary">{description}</h5>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4">
                {images.map((gallery, index) => (
                  <div key={index} className="col">
                    <div className="card h-100">
                      <Image
                        src={gallery.attributes.image}
                        alt={description}
                        width={600}
                        height={500}
                        objectFit="cover"
                        className="card-img-top img-fluid"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </Section>
  );
};

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects?populate=*&filters[slug][$eq]=${params.slug}`
  );

  let { data } = await res.json();

  if (!data || data.length === 0) {
    const resAll = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/projects?populate=*`
    );
    const { data: allData } = await resAll.json();
    data = allData;
  }

  const propertiesRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties`,
    {
      params: {
        populate: '*',
        'pagination[pageSize]': 3,
        sort: 'createdAt:desc',
        'filters[project][id][$ne]': data[0].id,
        'filters[status][$eq]': PROPERTY_STATUS.ACTIVE,
      },
    }
  );

  return {
    props: {
      project: { id: data[0].id, ...data[0]['attributes'] },
      featuredProperties: propertiesRes.data.data,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
  const { data: projects } = await res.json();

  return {
    paths: projects.map((project) => {
      return {
        params: {
          slug: project['attributes']['slug'],
        },
      };
    }),
    fallback: true,
  };
}
