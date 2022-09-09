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
import {
  BuildingIcon,
  CompareIcon,
  ShareProjectIcon,
} from '@/components/Icons/Icons';
import { packages } from '@/data/packages';
import Link from 'next/link';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import Textarea from '@/components/forms/Textarea';
import CompareProperties from '@/components/layouts/CompareProperties';

export default function SinglePropertyPage() {
  return (
    <>
      <Navigation />
      <PageHeader
        title="Our Properties"
        subHeader="Powered By Highrachy"
        bgImage="/assets/img/bg/investors.jpeg"
      />
      <PropertyInformation />
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

const PropertyInformation = () => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <Section>
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <h2>3 Bedroom Apartment</h2>
            <p className="fw-bold text-gray-700">
              <BuildingIcon />
              &nbsp;
              <Link href="/our-projects/3-bedroom-apartment" passHref>
                <a className="text-reset">Blissville Uno</a>
              </Link>{' '}
              &nbsp;- 70 Adetokunbo Ademola Street, VI, Lagos
            </p>

            <h3 className="text-primary">₦35,000,000</h3>
          </div>
          <div className="col-sm-4 text-md-end mb-4 mb-md-0">
            <Button color="light" onClick={() => setShowModal(true)}>
              Share Property <ShareProjectIcon />
            </Button>

            <Modal
              title="Share Property"
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
        <div className="row">
          <div className="col-md-8">
            <div className="mb-3 img-property img-fill">
              <Image
                src="/assets/img/property/property1.jpeg"
                alt="Hero Image"
                layout="fill"
                objectFit="cover"
                className="img-fluid rounded"
              />
            </div>
            <div className="row d-none d-md-flex">
              {/* map div 4 times */}
              {[1, 2, 3, 4].map((key) => (
                <div className="col-sm-3" key={key}>
                  <div className="mb-3">
                    <Image
                      src="/assets/img/property/property1.jpeg"
                      alt="Hero Image"
                      width="1024"
                      height="768"
                      objectFit="cover"
                      className="img-fluid rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-gray rounded px-4">
              <h5 className="pt-4 mb-3">Ask me for more Information</h5>
              <ul className="list-dotted list-unstyled">
                <li>
                  <span className="list-dotted__label">Property Name </span>
                  <span className="list-dotted__value">Blissville Duos</span>
                </li>
                <li>
                  <span className="list-dotted__label">Property Type </span>
                  <span className="list-dotted__value">
                    3 Bedroom Apartments
                  </span>
                </li>
                <li>
                  <span className="list-dotted__label">Prices From </span>
                  <span className="list-dotted__value">₦ 35 Million</span>
                </li>
                <li>
                  <span className="list-dotted__label">Floor </span>
                  <span className="list-dotted__value">2nd & 3rd Floor</span>
                </li>
                <li>
                  <span className="list-dotted__label">Size </span>
                  <span className="list-dotted__value">155msq</span>
                </li>
                {/* <li>
              <span className="list-dotted__label">Bedrooms </span>
              <span className="list-dotted__value">3 bedrooms</span>
            </li>
            <li>
              <span className="list-dotted__label">Bathrooms </span>
              <span className="list-dotted__value">4 bedrooms</span>
            </li> */}

                <li>
                  <span className="list-dotted__label">Parking Space </span>
                  <span className="list-dotted__value">2 Cars</span>
                </li>
                <li>
                  <span className="list-dotted__label">Payment Plan</span>
                  <span className="list-dotted__value">12 Months</span>
                </li>
                <li className="text-center">
                  <Button href="/our-projects/test" color="light">
                    Schedule Visit{' '}
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <p className="lead">
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
            </p>
            <ul className="my-4 row list-features">
              <li className="col-md-4">Cable TV Distribution</li>
              <li className="col-md-4">Intercom System</li>
              <li className="col-md-4">Security Fence</li>
              <li className="col-md-4">Guest Toilet</li>
              <li className="col-md-4">Spacious Kitchen</li>
              <li className="col-md-4">Dedicated Parking</li>
              <li className="col-md-4">Gym</li>
              <li className="col-md-4">Maids Room</li>
              <li className="col-md-4">Intercom System</li>
              <li className="col-md-4">Water Treatment</li>
              <li className="col-md-4">Surveillance System</li>
              <li className="col-md-4 green">Inverter System</li>
              <li className="col-md-4 gold">Fire Detection</li>
            </ul>
            <ActionButtonGroup />

            <div className="mb-5"></div>
          </div>
          <div className="col-md-4">
            <div className="border rounded p-4">
              <div className="d-flex flex-column mb-3 flex-md-row align-items-md-center">
                <div className="flex-shrink-0">
                  <Image
                    src={`/assets/img/team/sales-manager.jpg`}
                    alt="Sales Manager"
                    width={48}
                    height={48}
                    className="rounded"
                  />
                </div>
                <div className="flex-grow-1 ms-md-3">
                  <h6 className="">Ask me for more Information</h6>
                </div>
              </div>

              <FormikForm
                schema={{}}
                handleSubmit={{}}
                buttonColor="light"
                name="ask-info-form"
                buttonText="Request Info"
                persistForm
              >
                <div className="row">
                  <Input floatingLabel name="name" label="Full Name" />
                  <Input
                    floatingLabel
                    name="email"
                    type="email"
                    label="Email Address"
                  />
                </div>
                <div className="row">
                  <Input
                    floatingLabel
                    name="phone"
                    label="Phone Number"
                    optional
                  />
                </div>
                <Textarea
                  floatingLabel
                  name="message"
                  label="Your Message"
                  placeholder="Tell me more about this property"
                />
              </FormikForm>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const TabInformation = () => {
  const [showComparePropertyModal, setShowComparePropertyModal] =
    React.useState(false);
  const [currentTab, setCurrentTab] = React.useState(packages[0]['name']);

  return (
    <Section altBg>
      <div className="container">
        <div className="row">
          <Tab.Container
            activeKey={currentTab}
            id="single-property-profile"
            className="mb-3"
          >
            <ul className="nav nav-tab gap-1 nav-fill">
              {packages.map(({ name }) => (
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
              {packages.map(({ name, description }) => (
                <Tab.Pane eventKey={name} key={name}>
                  <div className="my-5">
                    <div className="row">
                      <div className="col-md-8">
                        <h3>{name}</h3>
                      </div>
                      <div className="col-md-4 text-md-end">
                        <Button
                          color="light"
                          className="btn-outline-light mb-5 mb-md-0"
                          onClick={() => setShowComparePropertyModal(true)}
                        >
                          Compare All Packages <CompareIcon />
                        </Button>

                        <Modal
                          title="Compare Packages"
                          show={showComparePropertyModal}
                          onHide={() => setShowComparePropertyModal(false)}
                          size="lg"
                        >
                          <section className="row">
                            <CompareProperties />
                          </section>
                        </Modal>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-8">
                        <section>
                          <p className="">{description}</p>
                          <ul className="my-4 row list-features">
                            <li className="col-md-4">Cable TV Distribution</li>
                            <li className="col-md-4">Intercom System</li>
                            <li className="col-md-4">Security Fence</li>
                            <li className="col-md-4">Guest Toilet</li>
                            <li className="col-md-4">Spacious Kitchen</li>
                            <li className="col-md-4">Dedicated Parking</li>
                            <li className="col-md-4">Gym</li>
                            <li className="col-md-4">Maids Room</li>
                            <li className="col-md-4">Intercom System</li>
                            <li className="col-md-4">Water Treatment</li>
                            <li className="col-md-4">Surveillance System</li>
                            <li
                              className={classNames('col-md-4', {
                                invalid: packages[0]['name'] === name,
                                standard: packages[1]['name'] === name,
                                supreme: packages[2]['name'] === name,
                              })}
                            >
                              Inverter System
                            </li>
                            <li
                              className={classNames('col-md-4', {
                                invalid: packages[0]['name'] === name,
                                invalid: packages[1]['name'] === name,
                                supreme: packages[2]['name'] === name,
                              })}
                            >
                              Fire Detection
                            </li>
                          </ul>
                        </section>
                      </div>
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
