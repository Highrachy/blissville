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
  listFeatures,
  moneyFormatInNaira,
} from '@/utils/helpers';
import { getShortDate } from '@/utils/date-helpers';
import axios from 'axios';

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
                    <Sharer shareUrl="https://blissville.com.ng" />
                  </div>
                </section>
              </Modal>
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
                      {moneyFormatInNaira(startingPrice)}
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
                    <ScheduleVisitationButton visiting={name} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <TabInformation project={project} />

      <Gallery galleries={project?.project_galleries?.data || []} />
      <Neighborhood neighborhoods={project?.neighborhoods?.data || []} />

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
                                  {moneyFormatInNaira(price)}
                                </span>
                              </li>
                            </ul>
                            <Button
                              color="secondary"
                              className="me-2 my-2"
                              href={`/our-properties/${project.slug}/${slug}/${id}`}
                            >
                              I am Interested
                            </Button>
                            <ScheduleVisitationButton visiting={name} />
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
  return (
    <Section className={className} noPaddingBottom>
      <div className="container">
        <h3>Gallery</h3>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-5 gx-4">
          {galleries.map((gallery, index) => (
            <div key={index} className="col">
              <Image
                src={gallery?.attributes?.image}
                alt="Hero Image"
                width={600}
                height={600}
                objectFit="cover"
                className="card-img-top col"
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export const Neighborhood = ({ neighborhoods }) => {
  // const locations = {
  //   Hospital: 'The new Circle Mall',
  //   Grocery: 'Prince Ebeano Supermarket',
  //   Entertainment: 'Dreamworld Africana Amusement Park',
  //   'Famous Places': 'Lekki Conservation Center',
  //   Financial: 'Several bank branches & ATMs',
  //   Others: 'Plazas and Filling/service stations',
  // };

  if (!neighborhoods || neighborhoods.length === 0) {
    return null;
  }

  return (
    <Section noPaddingBottom>
      <div className="container">
        <div className="row">
          <div className="col-md-7 col-lg-6">
            <h3>Neighborhood</h3>

            <ul className="list-location">
              {neighborhoods.map(
                ({ attributes: { location, category, distance } }) => (
                  <li key={category}>
                    <h5 className="text-gray-800 mb-0">{location}</h5>
                    <p className="text-md font-secondary mt-n1">
                      {distance}km - {category}
                    </p>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="col-md-5 col-lg-6">
            <div className="mt-5">
              <Image
                src="/assets/img/maps/single-project.png"
                alt="Hero Image"
                width={626}
                height={578}
              />
            </div>
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

  const { data } = await res.json();

  const propertiesRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties`,
    {
      params: {
        populate: '*',
        'pagination[pageSize]': 3,
        sort: 'createdAt:desc',
        'filters[project][id][$ne]': data[0].id,
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
