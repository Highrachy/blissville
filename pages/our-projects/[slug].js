import React from 'react';
import Image from 'next/image';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import classNames from 'classnames';
import Button from '@/components/forms/Button';
import Section from '@/components/common/Section';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import SingleProject from '@/components/common/SingleProject';
import { FeaturedProperties } from '@/components/layouts/FeaturedProperties';
import { Tab } from 'react-bootstrap';
import FAQsAccordion from '@/components/common/FAQsAccordion';
import { projectFaqs } from '@/data/faqs';
import ActionButtonGroup from '@/components/layouts/ActionButtonGroup';
import Sharer from '@/components/ui/Sharer';
import Modal from '@/components/ui/Modal';
import { ShareProjectIcon } from '@/components/Icons/Icons';
import { properties } from '@/data/properties';
import { useRouter } from 'next/router';
import { getLocationFromAddress } from '@/utils/helpers';

export default function SingleProjectPage({ project }) {
  const [showModal, setShowModal] = React.useState(false);
  const router = useRouter();
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { name, image, features } = project;
  const allFeatures = features.split(',');

  console.log('single project', project);

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
              <p className="lead">
                You can now experience true tranquility with our elevated
                apartment units and penthouses. Each unit is a 3 bedroom 185MSq
                with maids room, four bathrooms and five toilets, living room,
                dining space, kitchen, pantry, guest toilet and dedicated
                parking lots. <br />
                The standard apartments sit on the 2nd floor while the
                penthouses are on the 3rd floor. They are similar in design with
                three bedrooms each and an adjoining staff room. Owners of the
                apartments enjoy all the benefits that come with leaving in
                Blissville.
              </p>
              <ul className="my-4 row list-features">
                {allFeatures.map((feature, index) => (
                  <li key={index} className="col-md-4">
                    {feature}
                  </li>
                ))}
              </ul>
              <ActionButtonGroup />

              <div className="mb-5"></div>
            </div>
            <div className="col-md-4">
              <div className="bg-gray rounded px-4">
                <h5 className="pt-4 mb-3">Project Overview</h5>
                <ul className="list-dotted list-unstyled">
                  <li>
                    <span className="list-dotted__label">Property Type </span>
                    <span className="list-dotted__value">
                      Apartment/ Condos
                    </span>
                  </li>
                  <li>
                    <span className="list-dotted__label">Location </span>
                    <span className="list-dotted__value">Lekki, Lagos</span>
                  </li>
                  <li>
                    <span className="list-dotted__label">Total Units </span>
                    <span className="list-dotted__value">5 Units</span>
                  </li>
                  <li>
                    <span className="list-dotted__label">Prices From </span>
                    <span className="list-dotted__value">₦ 35 Million</span>
                  </li>
                  <li>
                    <span className="list-dotted__label">Delivery </span>
                    <span className="list-dotted__value">July, 2024</span>
                  </li>
                  <li>
                    <span className="list-dotted__label">Status</span>
                    <span className="list-dotted__value">In Progress</span>
                  </li>
                  <li>
                    <Button
                      href="/our-projects/3-bedroom-apartments"
                      color="light"
                    >
                      Schedule Visit{' '}
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <TabInformation />

      <Gallery />
      <Neighborhood />
      <section className="container">
        <div className="row">
          {projectFaqs.map(({ name, faqs: allFaqs }, index) => (
            <div className="mt-5 col-12 faqs-section" key={index}>
              <h4>{name}</h4>
              <FAQsAccordion faqs={allFaqs} />
            </div>
          ))}
        </div>
      </section>
      <FeaturedProperties />

      <div className="container pb-7">
        <h3 className="mt-3 mt-lg-6">Other Projects</h3>
        <div className="row">
          <SingleProject type="2" />
        </div>
      </div>
      <ScheduleVisit />
      <Footer />
    </>
  );
}

const TabInformation = () => {
  const [currentTab, setCurrentTab] = React.useState(properties[0]['name']);

  return (
    <Section altBg>
      <div className="container">
        <div className="row">
          <Tab.Container
            activeKey={currentTab}
            id="single-tenant-profile"
            className="mb-3"
          >
            <ul className="nav nav-tab gap-1 nav-fill">
              {properties.map(({ name }) => (
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
            <Tab.Content>
              {properties.map(
                ({
                  name,
                  type,
                  description,
                  floorplan,
                  floor,
                  size,
                  beds,
                  baths,
                  price,
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
                                  {floor}
                                </span>
                              </li>
                              <li>
                                <span className="list-dotted__label">
                                  Size:
                                </span>
                                <span className="list-dotted__value">
                                  {size}
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
                                  {price}
                                </span>
                              </li>
                            </ul>
                            <Button
                              color="secondary"
                              className="me-2 my-2"
                              href="/our-properties/3-bedroom-apartment"
                            >
                              I am Interested
                            </Button>
                            <Button color="light">Schedule visit</Button>
                          </section>
                        </div>
                        <div className="col-md-7 order-0 order-md-1">
                          <Image
                            src={`/assets/img/floor-plans/${floorplan}`}
                            alt="Floor Plan"
                            width={856}
                            height={856}
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

const Gallery = ({ className }) => (
  <Section className={className}>
    <div className="container">
      <h3>Gallery</h3>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-5 gx-4">
        {[1, 2, 3, 4].map((key) => (
          <div key={key} className="col">
            <Image
              src={`/assets/img/property/property1.jpeg`}
              alt="Hero Image"
              width={636}
              height={432}
              className="card-img-top col"
            />
          </div>
        ))}
      </div>
    </div>
  </Section>
);

const Neighborhood = () => {
  const locations = {
    Hospital: 'The new Circle Mall',
    Grocery: 'Prince Ebeano Supermarket',
    Entertainment: 'Dreamworld Africana Amusement Park',
    'Famous Places': 'Lekki Conservation Center',
    Financial: 'Several bank branches & ATMs',
    Others: 'Plazas and Filling/service stations',
  };

  return (
    <Section noPaddingBottom>
      <div className="container">
        <div className="row">
          <div className="col-md-7 col-lg-6">
            <h3>Neighborhood</h3>

            <ul className="list-location">
              {Object.entries(locations).map(([category, place]) => (
                <li key={category}>
                  <h5 className="text-gray-800 mb-0">{place}</h5>
                  <p className="text-md font-secondary mt-n1">
                    1.5km - {category}
                  </p>
                </li>
              ))}
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects?filters[slug][$eq]=${params.slug}`
  );

  const { data } = await res.json();

  return {
    props: { project: { id: data[0].id, ...data[0]['attributes'] } },
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
