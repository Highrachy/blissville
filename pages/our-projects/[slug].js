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
import faqs from '@/data/faqs';

export default function SingleProjectPage() {
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
              <h2>BLISSVILLE DUOS</h2>
              <p className="lead">70 Adetokunbo Ademola Street, VI, Lagos</p>
            </div>
            <div className="col-sm-4 text-end">
              <Button color="light">Share Project</Button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="img-fill h-100 min-vh-100 mb-4">
            <Image
              src="/assets/img/property/property1.jpeg"
              alt="Hero Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 lead">
              You can now experience true tranquility with our elevated
              apartment units and penthouses. Each unit is a 3 bedroom 185MSq
              with maids room, four bathrooms and five toilets, living room,
              dining space, kitchen, pantry, guest toilet and dedicated parking
              lots. <br />
              The standard apartments sit on the 2nd floor while the penthouses
              are on the 3rd floor. They are similar in design with three
              bedrooms each and an adjoining staff room. Owners of the
              apartments enjoy all the benefits that come with leaving in
              Blissville.
              <br />
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
                    <Button href="/our-projects/test" color="light">
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
      <Section>
        <Gallery />
      </Section>
      <Section>
        <div className="container">
          <h3 className="mt-3 mt-lg-6">Our Projects</h3>
          <div className="row">
            <SingleProject />
          </div>
        </div>
      </Section>
      <Section>
        <Neighborhood />
      </Section>
      <Section>
        <FeaturedProperties />
      </Section>
      <Section>
        <section className="container py-6">
          <div className="row">
            {faqs.map(({ name, faqs: allFaqs }, index) => (
              <div className="mt-5 col-12 faqs-section" key={index}>
                <h4>{name}</h4>
                <FAQsAccordion faqs={allFaqs} />
              </div>
            ))}
          </div>
        </section>
      </Section>
      <ScheduleVisit />
      <Footer />
    </>
  );
}

const TabInformation = () => {
  const [currentTab, setCurrentTab] = React.useState(1);
  const allTabs = [
    { key: 1, title: 'Testing the Code' },
    { key: 2, title: 'Next stage' },
  ];

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
              {allTabs.map(({ key, title }) => (
                <li
                  key={key}
                  className={classNames('nav-item position-relative', {
                    active: currentTab === key,
                  })}
                  onClick={() => setCurrentTab(key)}
                >
                  <span className="active-indicator"></span>
                  <div
                    className={classNames('nav-link', {
                      active: currentTab === key,
                    })}
                  >
                    {title}
                  </div>
                </li>
              ))}
            </ul>
            <Tab.Content>
              {allTabs.map(({ key, title }) => (
                <Tab.Pane eventKey={key} key={key}>
                  <div className="row">
                    <div className="col-md-5">
                      <h3>3 Bedroom Apartments</h3>{' '}
                      <p className="">
                        You can now experience true tranquility with our
                        elevated apartment units and penthouses. Each unit is a
                        3 bedroom 185MSq with maids room, four bathrooms and
                        five toilets, living room, dining space, kitchen,
                        pantry, guest toilet and dedicated parking lots.
                      </p>
                      <ul>
                        <li>
                          1. Project Name: <span>Quarter</span>
                        </li>
                        <li>
                          2. Project Type: <span>Apartment / Home</span>
                        </li>
                        <li>
                          3. Building Location: <span>New York, USA</span>
                        </li>
                        <li>
                          4. No. Of Apartments: <span>568</span>
                        </li>
                        <li>
                          5. Total Investment: <span>$14,500,00</span>
                        </li>
                      </ul>
                      <Button color="secondary" className="me-2">
                        View Property
                      </Button>
                      <Button color="light">Schedule visit</Button>
                    </div>
                    <div className="col-md-7">
                      <Image
                        src="/assets/img/home/cuate.svg"
                        alt="Hero Image"
                        width={601}
                        height={564}
                      />
                    </div>
                  </div>
                </Tab.Pane>
              ))}
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

const Neighborhood = () => (
  <Section>
    <div className="container">
      <div className="row">
        <div className="col-md-7 col-lg-6">
          <h3 className="mt-3 mt-lg-6">Neighborhood</h3>

          <ul className="circle-tick">
            <li>
              <h6>The New Circle Mall</h6>
              <p>1.5km - Hospital</p>
            </li>
            <li>
              <h6>The New Circle Mall</h6>
              <p>1.5km - Hospital</p>
            </li>
            <li>
              <h6>The New Circle Mall</h6>
              <p>1.5km - Hospital</p>
            </li>
            <li>
              <h6>The New Circle Mall</h6>
              <p>1.5km - Hospital</p>
            </li>
          </ul>
        </div>
        <div className="col-md-5 col-lg-6">
          <div className="ms-n5">
            <Image
              src="/assets/img/home/cuate.svg"
              alt="Hero Image"
              width={601}
              height={564}
            />
          </div>
        </div>
      </div>
    </div>
  </Section>
);
