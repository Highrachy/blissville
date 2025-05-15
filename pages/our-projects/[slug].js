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
  listFeatures,
  moneyFormatInNaira,
} from '@/utils/helpers';
import { getShortDate } from '@/utils/date-helpers';
import axios from 'axios';
import { PROPERTY_STATUS } from '@/utils/constants';
import ProjectInterestModal, {
  ProjectInterestContent,
} from '@/components/common/ProjectInterestModal';
import { FaCaretDown } from 'react-icons/fa';
import ShareButton from '@/components/common/ShareButton';
import {
  FaFilePdf,
  FaLocationPin,
  FaLocationPinLock,
  FaMap,
  FaMapPin,
} from 'react-icons/fa6';
import OverviewCard from '@/components/common/OverviewCard';
import { HiLocationMarker } from 'react-icons/hi';
import SinglePropertyNew, {
  CompactPropertyCard,
} from '@/components/common/SinglePropertyNew';
import { BathIcon, BedIcon, SizeIcon } from '@/components/Icons/Icons';

export default function SingleProjectPage({ project, featuredProperties }) {
  const [showModal, setShowModal] = React.useState(false);
  const [showInterestModal, setShowInterestModal] = React.useState(false);

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
  } = project || {};

  const faqs = project?.faqs?.data || [];
  const allFaqs =
    faqs?.map(({ attributes: { question, answer } }) => ({
      question,
      answer,
    })) || [];

  const { slug } = router.query;

  const shareUrl = `https://blissville.com.ng/our-projects/${slug}`;
  const isBlissvilleTerraces = slug === 'blissville-terraces';
  const neighborhoods = project?.neighborhoods?.data || [];

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
              <ShareButton
                url={shareUrl}
                text={`Check out ${name} on Blissville!`}
              />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="mb-3 img-project img-fill mb-md-5">
            <Image
              src={image}
              alt="Hero Image"
              layout="fill"
              objectFit="cover"
              className="img-fluid"
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
                {isBlissvilleTerraces && (
                  <Button
                    color="primary"
                    className="mt-3"
                    href="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/Blissville+Terraces+Brochure.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFilePdf size={20} className="me-2" />
                    Download Brochure
                  </Button>
                )}
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
                    <span className="list-dotted__value">In Progress</span>
                  </li>
                </ul>
              </OverviewCard>
              <OverviewCard header="Features">
                {listFeatures(project)}
              </OverviewCard>

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
                  />
                </OverviewCard>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <ProjectInterestModal
        show={showModal}
        onHide={() => setShowModal(false)}
        propertyName={name}
      />

      <Gallery galleries={project?.project_galleries?.data || []} />

      <Section>
        <div className="container">
          <div className="row">
            <div className="col">
              <h4>Location Map</h4>
              <div className="mb-4">
                <Image
                  src="/assets/img/maps/bvt-location-map.png"
                  alt="BVT Location Map"
                  className="img-fluid border border-2 border-light rounded"
                  width={2694}
                  height={1768}
                />
              </div>
              <Button
                color="primary-light"
                className="me-2 my-2 px-4"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.google.com/maps?saddr=My+Location&daddr=6.480150,3.646269`}
              >
                <FaMap /> View on Google Maps
              </Button>
            </div>
          </div>
        </div>
      </Section>

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

export function NeighborhoodList({ neighborhoods }) {
  if (!neighborhoods || neighborhoods.length === 0) {
    return null;
  }

  return (
    <OverviewCard header="Neighborhood">
      <ul className="location-list row list-unstyled">
        {neighborhoods.map(({ attributes: { location, category } }, index) => (
          <li key={index} className="col-12 col-md-6">
            <div className="d-flex align-items-center py-3">
              <div className="me-3 d-flex align-items-center justify-content-center">
                <span className="location-icon"></span>
              </div>
              <div>
                <h6 className="mb-0 text-dark fw-semibold">{location}</h6>
                <p className="my-0 text-muted small">{category}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Button
        color="primary-light"
        className="me-2 my-2 px-4"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.google.com/maps?saddr=My+Location&daddr=6.480150,3.646269`}
      >
        <FaMapPin /> View Location Map
      </Button>
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
        <p>
          <strong
            style={{ cursor: 'pointer' }}
            onClick={() => setShowAll(true)}
          >
            Read more <FaCaretDown />
          </strong>
        </p>
      )}
      {showAll &&
        rest.map((para, idx) => <p key={idx + visible.length}>{para}</p>)}
    </div>
  );
}

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

export const Neighborhood = ({ neighborhoods, slug }) => {
  const isBlissvilleTerraces = slug === 'blissville-terraces';

  if (!neighborhoods || neighborhoods.length === 0) {
    return null;
  }

  return (
    <Section noPaddingBottom>
      <div className="container">
        <div className="row">
          <div className="col">
            {isBlissvilleTerraces && (
              <section className="mb-6">
                <h3>Location Map</h3>
                <Image
                  src="/assets/img/maps/bvt-location-map.png"
                  alt="BVT Location Map"
                  className="img-fluid border border-2 border-light rounded"
                  width={2694}
                  height={1768}
                />

                <Button
                  color="primary-light"
                  className="me-2 my-2 px-4"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps?saddr=My+Location&daddr=6.480150,3.646269`}
                >
                  <FaMap /> View on Google Maps
                </Button>
              </section>
            )}
          </div>
        </div>
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
