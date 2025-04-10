import React from 'react';
import Image from 'next/image';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import classNames from 'classnames';
import Button from '@/components/forms/Button';
import Section from '@/components/common/Section';
import ScheduleVisit, {
  ScheduleVisitationButton,
} from '@/components/common/ScheduleVisit';
import SingleProject from '@/components/common/SingleProject';
import { FeaturedProperties } from '@/components/layouts/FeaturedProperties';
import { Tab } from 'react-bootstrap';
import FAQsAccordion from '@/components/common/FAQsAccordion';
import ActionButtonGroup from '@/components/layouts/ActionButtonGroup';
import Sharer from '@/components/ui/Sharer';
import Modal from '@/components/ui/Modal';
import { ShareProjectIcon } from '@/components/Icons/Icons';
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

export default function SingleProjectPage({ project, featuredProperties }) {
  const [showModal, setShowModal] = React.useState(false);
  const router = useRouter();
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
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
  } = project;

  const faqs = project?.faqs?.data;
  const allFaqs = faqs?.map(({ attributes: { question, answer } }) => ({
    question,
    answer,
  }));

  const { slug } = router.query;

  const shareUrl = `https://blissville.com.ng/our-projects/${slug}`;
  const isBlissvilleTerraces = slug === 'blissville-terraces';

  return (
    <>
      <Navigation />
      <PageHeader
        title="Our Projects"
        subHeader="Powered By Highrachy"
        bgImage="/assets/img/bg/investors.jpeg"
      />
      <Section>
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <h2>{name}</h2>
              <p className="lead">{getLocationFromAddress(project)}</p>
            </div>
            <div className="col-sm-4 text-md-end mb-4 mb-md-0">
              <Button color="light" onClick={() => setShowModal(true)}>
                Share Project <ShareProjectIcon />
              </Button>

              <Modal
                title="Share Project"
                show={showModal}
                onHide={() => setShowModal(false)}
              >
                <section className="row">
                  <div className="col-md-12 my-3">
                    <p>Click to share this project with your friends</p>
                    <Sharer shareUrl={shareUrl} />
                  </div>
                </section>
              </Modal>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="mb-3 img-project img-fill mb-md-5">
            {isBlissvilleTerraces ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/launch-ads.jpg"
                  alt="Project Image"
                  className="img-fluid"
                />
              </>
            ) : (
              <Image
                src={image}
                alt="Hero Image"
                layout="fill"
                objectFit="cover"
                className="img-fluid"
              />
            )}
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="lead">{description}</div>
              {listFeatures(project)}
              <ActionButtonGroup price={startingPrice} />

              <div className="mb-5"></div>
            </div>
            <div className="col-md-4">
              <div className="bg-gray rounded px-4">
                <h5 className="pt-4 mb-3">Project Overview</h5>
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
                  <li>
                    <ScheduleVisitationButton visiting={`Project - ${name}`} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <TabInformation project={project} />

      <Gallery galleries={project?.project_galleries?.data || []} />
      <Neighborhood
        neighborhoods={project?.neighborhoods?.data || []}
        slug={slug}
      />

      {allFaqs.length > 0 && (
        <section className="container">
          <div className="row">
            <h4>FAQs</h4>
            <FAQsAccordion faqs={allFaqs} />
          </div>
        </section>
      )}
      <FeaturedProperties properties={featuredProperties} />
      <div className="mt-7"></div>
      <ScheduleVisit />
      <Footer />
    </>
  );
}

const TabInformation = ({ project }) => {
  const properties = project?.properties?.data || [];

  const [currentTab, setCurrentTab] = React.useState(
    properties[0]?.attributes?.['name']
  );

  if (properties.length === 0) {
    return null;
  }

  return (
    <Section altBg>
      <div className="container">
        <div className="row">
          <Tab.Container
            activeKey={currentTab}
            id="single-tenant-profile"
            className="mb-3"
          >
            {properties.length > 1 && (
              <ul className="nav nav-tab gap-1 nav-fill">
                {properties.map(({ attributes: { name } }) => (
                  <li
                    key={name}
                    className={classNames('nav-item position-relative', {
                      active: currentTab === name,
                    })}
                    onClick={() => setCurrentTab(name)}
                  >
                    <span className="active-indicator"></span>
                    <div
                      className={classNames('nav-link py-4', {
                        active: currentTab === name,
                      })}
                    >
                      {name}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <Tab.Content>
              {properties.map(
                ({
                  id,
                  attributes: {
                    name,
                    type,
                    slug,
                    description,
                    image,
                    floors,
                    size,
                    beds,
                    baths,
                    price,
                    availableUnits,
                  },
                }) => (
                  <Tab.Pane eventKey={name} key={name}>
                    <div className="my-5">
                      <h3>{name}</h3>
                      <div className="row">
                        <div className="col-md-5 order-1 order-md-0">
                          <section className="pe-5">
                            <p className="">{description}</p>
                            <ul className="list-dotted list-unstyled">
                              <li>
                                <span className="list-dotted__label">
                                  Property Type:
                                </span>
                                <span className="list-dotted__value">
                                  {type}
                                </span>
                              </li>
                              <li>
                                <span className="list-dotted__label">
                                  Floor:
                                </span>
                                <span className="list-dotted__value">
                                  {floors}
                                </span>
                              </li>
                              <li>
                                <span className="list-dotted__label">
                                  Size:
                                </span>
                                <span className="list-dotted__value">
                                  {size} Msq
                                </span>
                              </li>
                              <li>
                                <span className="list-dotted__label">
                                  Bedrooms:
                                </span>
                                <span className="list-dotted__value">
                                  {beds} bedrooms
                                </span>
                              </li>
                              <li>
                                <span className="list-dotted__label">
                                  Bathrooms:
                                </span>
                                <span className="list-dotted__value">
                                  {baths} bathrooms
                                </span>
                              </li>
                              <li>
                                <span className="list-dotted__value text-primary h2">
                                  {availableUnits === 0
                                    ? 'SOLD OUT'
                                    : moneyFormatInNaira(price)}
                                </span>
                              </li>
                            </ul>
                            <Button
                              color="secondary"
                              className="me-2 my-2"
                              href={`/our-properties/${
                                project?.slug || 'project-name'
                              }/${slug || 'property-name'}/${id}`}
                            >
                              {availableUnits === 0
                                ? 'View Project'
                                : 'I am Interested'}
                            </Button>
                            {availableUnits !== 0 && (
                              <ScheduleVisitationButton visiting={name} />
                            )}
                          </section>
                        </div>
                        <div className="col-md-7 order-0 order-md-1">
                          <Image
                            src={image}
                            className="rounded"
                            alt="Floor Plan"
                            width={856}
                            height={856}
                            objectFit="cover"
                          />
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>
                )
              )}
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </Section>
  );
};

export const Gallery = ({ galleries, className }) => {
  if (!galleries || galleries.length === 0) {
    return null;
  }

  // Group images by description
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
      <div className="container">
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
                  color="secondary"
                  className="me-2 my-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps?saddr=My+Location&daddr=6.480150,3.646269`}
                >
                  View on Google Maps
                </Button>
              </section>
            )}

            <h3>Neighborhood</h3>
            <ul className="location-list row list-unstyled">
              {neighborhoods.map(
                ({ attributes: { location, category, distance } }, index) => (
                  <li key={index} className="col-12 col-md-6">
                    <div className="d-flex align-items-center py-3">
                      <div className="me-3 d-flex align-items-center justify-content-center">
                        <span className="location-icon"></span>
                      </div>
                      <div>
                        <h5 className="mb-0 text-dark fw-semibold">
                          {location}
                        </h5>
                        <p className="my-0 text-muted">
                          {/* {distance}km - */}
                          {category}
                        </p>
                      </div>
                    </div>
                  </li>
                )
              )}
            </ul>
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
