import React from 'react';
import Humanize from 'humanize-plus';
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
import { Dropdown, Tab } from 'react-bootstrap';
import FAQsAccordion from '@/components/common/FAQsAccordion';
import { projectFaqs } from '@/data/faqs';
import ActionButtonGroup from '@/components/layouts/ActionButtonGroup';
import Sharer from '@/components/ui/Sharer';
import Modal from '@/components/ui/Modal';
import ProjectsSlideshow from '@/components/layouts/ProjectsSlideshow';
import {
  BathIcon,
  BedIcon,
  BuildingIcon,
  CompareIcon,
  ShareProjectIcon,
  SizeIcon,
} from '@/components/Icons/Icons';
import { packages } from '@/data/packages';
import Link from 'next/link';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import Textarea from '@/components/forms/Textarea';
import ComparePackages from '@/components/layouts/ComparePackages';
import PaymentPlanSlider from '@/components/common/PaymentPlanSlider';
import { Car, Convertshape, Magicpen } from 'iconsax-react';
import { useRouter } from 'next/router';
import {
  getLocationFromAddress,
  getMonthlyPayment,
  listFeatures,
  moneyFormatInNaira,
  statusIsSuccessful,
} from '@/utils/helpers';
import { Gallery, Neighborhood } from 'pages/our-projects/[slug]';
import axios from 'axios';
import { askInfoSchema } from '@/components/forms/schemas/page-schema';
import { getTokenFromStore } from '@/utils/localStorage';
import FormikButton from '@/components/forms/FormikButton';
import BuyNowButton from '@/components/utils/BuyNowButton';

export default function SinglePropertyPage({
  property,
  projects,
  similarProperties,
  featuredProperties,
}) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const faqs = property?.project?.data?.attributes?.faqs?.data || [];
  const allFaqs = faqs?.map(({ attributes: { question, answer } }) => ({
    question,
    answer,
  }));

  return (
    <>
      <Navigation />
      <PageHeader
        title="Our Properties"
        subHeader="Powered By Highrachy"
        bgImage="/assets/img/bg/investors.jpeg"
      />

      <PropertyInformation property={property} />
      <TabInformation property={property} />

      <FeaturedProperties
        properties={similarProperties}
        title="Other Properties"
      />

      <Gallery
        galleries={[
          ...(property?.property_galleries.data || []),
          ...(property?.project?.data?.attributes?.project_galleries.data ||
            []),
        ]}
      />
      <Neighborhood
        neighborhoods={
          property?.project?.data?.attributes?.neighborhoods?.data || []
        }
      />
      {allFaqs.length > 0 && (
        <section className="container mt-6">
          <div className="row">
            <h4>FAQs</h4>
            <FAQsAccordion faqs={allFaqs} />
          </div>
        </section>
      )}
      <FeaturedProperties properties={featuredProperties} />
      <Section noPaddingBottom>
        <ProjectsSlideshow projects={projects} title="Other Projects" />
      </Section>
      <div className="mt-7"></div>
      <ScheduleVisit />
      <Footer />
    </>
  );
}

const PropertyInformation = ({ property }) => {
  const [showModal, setShowModal] = React.useState(false);
  const {
    id,
    name,
    price,
    image,
    type,
    floors,
    size,
    beds,
    baths,
    parkingSpace,
    paymentPlan,
  } = property;
  const project = property.project.data.attributes;
  return (
    <Section>
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <h2>{name}</h2>
            <p className="fw-bold text-gray-700">
              <BuildingIcon />
              &nbsp;
              <Link href={`/our-projects/${project.slug}`} passHref>
                <a className="text-reset">{project.name}</a>
              </Link>{' '}
              &nbsp;- {getLocationFromAddress(project)}
            </p>

            <h3 className="text-primary">{moneyFormatInNaira(price)}</h3>
          </div>
          <div className="col-sm-4 text-md-end mb-4 mb-md-0">
            <aside>
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
            </aside>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="mb-3 img-property img-fill">
              <Image
                src={image}
                alt={name}
                layout="fill"
                objectFit="cover"
                className="img-fluid rounded"
              />
            </div>
            <div className="row d-none d-md-flex">
              <FeatureCard
                number={size}
                title="Msq"
                icon={<SizeIcon />}
                pluralize={false}
              />
              <FeatureCard number={baths} title="Bath" icon={<BathIcon />} />
              <FeatureCard number={beds} title="Bed" icon={<BedIcon />} />
              <FeatureCard
                number={parkingSpace}
                title="Parking"
                icon={<Car variant="Bold" />}
                pluralize={false}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-gray rounded px-4 pb-3">
              <h5 className="pt-4 mb-3">Property Overview</h5>
              <ul className="list-dotted list-unstyled">
                <li>
                  <span className="list-dotted__label">Property Name </span>
                  <span className="list-dotted__value">{name}</span>
                </li>
                <li>
                  <span className="list-dotted__label">Property Type </span>
                  <span className="list-dotted__value">{type}</span>
                </li>
                <li>
                  <span className="list-dotted__label">Prices From </span>
                  <span className="list-dotted__value">
                    {moneyFormatInNaira(price)}
                  </span>
                </li>
                <li>
                  <span className="list-dotted__label">Floor </span>
                  <span className="list-dotted__value">{floors}</span>
                </li>
                <li>
                  <span className="list-dotted__label">Payment Plan</span>
                  <span className="list-dotted__value">
                    {paymentPlan} {Humanize.pluralize(paymentPlan, 'Month')}
                  </span>
                </li>
                <li className="text-center">
                  <ScheduleVisitationButton visiting={`Property - ${name}`} />
                </li>
              </ul>
            </div>
            <Button
              color="light"
              className="w-100 my-3"
              href={`/compare-properties/${id}`}
            >
              Compare Property <Convertshape variant="Bulk" />
            </Button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <article className="lead">{property.description}</article>
            {listFeatures(project)}
            <ActionButtonGroup price={price} />

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

              <AskInfoForm name={name} projectName={project.name} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const AskInfoForm = ({ name, projectName }) => {
  const handleSubmit = async (values, actions) => {
    const payload = {
      values,
      source: `Property Page - ${name}`,
      subject: `Enquiry about ${projectName} - ${name}`,
    };
    try {
      axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/contacts`,
        data: { data: payload },
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            toast.success('Information sent successfully');
            actions.resetForm({ values: {} });
            actions.setSubmitting(false);
          }
        })
        .catch(function (error) {
          toast.error(getError(error));
        });
    } catch (error) {
      toast.error(getError(error));
    }
  };
  return (
    <FormikForm
      schema={askInfoSchema}
      handleSubmit={handleSubmit}
      name="ask-info-form"
      buttonText="Send Message"
      persistForm
    >
      <div className="row">
        <Input floatingLabel name="name" label="Full Name" />
        <Input floatingLabel name="email" type="email" label="Email Address" />
      </div>
      <div className="row">
        <Input floatingLabel name="phone" label="Phone Number" optional />
      </div>
      <Textarea
        floatingLabel
        name="message"
        label="Your Message"
        placeholder="Tell me more about this property"
        rows={5}
      />
      <FormikButton color="success" className="mt-2 text-white btn-wide">
        Send Message
      </FormikButton>
    </FormikForm>
  );
};

const TabInformation = ({ property }) => {
  const project = property.project.data.attributes;
  const [showComparePropertyModal, setShowComparePropertyModal] =
    React.useState(false);
  const halfPaymentPlan =
    property.paymentPlan > 0 ? property.paymentPlan / 2 : 0;
  const [currentTab, setCurrentTab] = React.useState(packages[0]['name']);
  const [customPlan, setCustomPlan] = React.useState(halfPaymentPlan);

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
              <Modal
                title="Compare Packages"
                show={showComparePropertyModal}
                onHide={() => setShowComparePropertyModal(false)}
                size="lg"
              >
                <section className="row">
                  <ComparePackages project={project} />
                </section>
              </Modal>
              {packages.map(({ name, description, key }, index) => {
                const allPrices = ['price', 'standardPrice', 'supremePrice'];
                const currentTabPrice = property[allPrices[index]];

                return (
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
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-8">
                          <section>
                            <p className="">{description}</p>
                            {listFeatures(project, key)}
                          </section>
                        </div>
                      </div>

                      <div className="row mt-5">
                        <h4>
                          Available Payment Plans
                          {property.paymentPlan > 6 && (
                            <div className="float-md-end">
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="light"
                                  id="dropdown-basic"
                                >
                                  Select Payment Plan
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  {/* loop from 3 in multiple of 3 to paymentPlan */}
                                  {Array.from(
                                    { length: property.paymentPlan / 3 - 1 },
                                    (_, i) => i + 1
                                  ).map(
                                    (plan) =>
                                      plan * 3 !== customPlan && (
                                        <Dropdown.Item
                                          key={plan}
                                          onClick={() =>
                                            setCustomPlan(plan * 3)
                                          }
                                        >
                                          {plan * 3} Months
                                        </Dropdown.Item>
                                      )
                                  )}
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          )}
                        </h4>

                        <PaymentPlanCard
                          month={0}
                          price={currentTabPrice}
                          property={property}
                          dimDisplay={customPlan !== halfPaymentPlan}
                        />

                        <PaymentPlanCard
                          month={customPlan}
                          price={currentTabPrice}
                          property={property}
                          customPlan={customPlan !== halfPaymentPlan}
                        />
                        <PaymentPlanCard
                          month={property.paymentPlan}
                          price={currentTabPrice}
                          property={property}
                          dimDisplay={customPlan !== halfPaymentPlan}
                        />
                      </div>
                    </div>
                  </Tab.Pane>
                );
              })}
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </Section>
  );
};

const FeatureCard = ({ number, title, icon, pluralize = true }) => (
  <aside className="col-sm-3">
    <div className={`card h-100 position-relative bg-gray`}>
      <div className="card-body px-md-4 px-3">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h4 className="mb-0 widget__color lh-1 mt-3 mb-2 text-muted">
              {number}
            </h4>
            <p className="mb-0 text-sm text-muted">
              {pluralize ? Humanize.pluralize(number, title) : title}
            </p>
          </div>
        </div>
        <div
          className={`widget__icon-tint dark position-absolute bottom-0 end-0`}
        >
          {icon}
        </div>
      </div>
    </div>
  </aside>
);

const PaymentPlanCard = ({
  property,
  month,
  price,
  customPlan,
  dimDisplay,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  const monthName =
    month === 0
      ? 'Outright Payment'
      : `${month}  ${Humanize.pluralize(month, 'Month')} Plan`;
  const { initialPayment, paymentPlanIncrement } = property;
  const totalPayment =
    parseInt(price, 10) + parseInt(paymentPlanIncrement * month, 10);
  const currentInitialPayment = month === 0 ? totalPayment : initialPayment;
  const monthlyPayment = getMonthlyPayment(
    totalPayment,
    currentInitialPayment,
    month
  );

  return (
    <div
      className={classNames('col-sm-4 d-flex align-items-stretch', {
        dim: dimDisplay,
      })}
    >
      <Modal
        title="Customize Plan"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <section className="row">
          <PaymentPlanSlider
            min={currentInitialPayment}
            max={totalPayment}
            month={month}
          />
        </section>
      </Modal>
      <div className="card w-100 position-relative text-center px-4 py-5 mb-4">
        {customPlan && <YourCustomPlanIcon />}
        <h5 className="mb-3">{monthName}</h5>
        <ul className="list-dotted list-unstyled px-4">
          <li>
            <span className="list-dotted__label">Initial Payment</span>
            <span className="list-dotted__value">
              {moneyFormatInNaira(currentInitialPayment)}
            </span>
          </li>
          <li>
            <span className="list-dotted__label">Monthly Payment</span>
            <span className="list-dotted__value"> {monthlyPayment}</span>
          </li>
          <li>
            <span className="list-dotted__label">Total</span>
            <span className="list-dotted__value text-xl fw-bold">
              {moneyFormatInNaira(totalPayment)}
            </span>
          </li>
          <li className="d-block">
            <div className="">
              <BuyNowButton
                className="w-100"
                property={property}
                paymentPlan={month}
                initialPayment={currentInitialPayment}
                price={totalPayment}
              />
              {month !== 0 && (
                <div
                  className="mt-4 text-sm text-link"
                  onClick={() => setShowModal(true)}
                >
                  <Magicpen variant="Bulk" /> Customize this Plan
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

const YourCustomPlanIcon = () => (
  <div className="custom-plan">
    <svg
      width={146}
      height={67}
      viewBox="0 0 146 67"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M37.8857 19.3219C25.0014 27.1027 17.8478 41.3328 13.5484 55.2498C13.3274 55.965 13.0571 56.6828 12.8102 57.3814C12.1199 55.9885 7.40904 44.4207 5.50715 45.1279C4.39563 45.5413 5.03145 47.0268 5.27606 47.6261C7.04662 51.9581 8.77632 55.8418 10.8919 60.0311C12.4841 63.1848 15.4471 62.3627 18.3822 61.4028C22.8633 59.9374 23.2269 59.5172 27.8165 57.8306C28.5729 57.5524 29.3678 57.3276 30.0689 56.9802C30.8932 56.5711 31.777 55.7054 31.3394 54.7619C30.8434 53.6925 29.7644 53.768 28.8426 54.1606C28.6502 54.2431 28.4548 54.3186 28.2576 54.3895C26.0913 55.1672 16.2594 59.316 15.9319 58.6146C15.8213 58.3784 15.8587 58.1036 15.9005 57.8464C17.104 50.4242 20.2913 43.354 24.0565 36.894C26.5898 32.5469 29.8412 28.6203 33.63 25.3083C36.6746 22.6467 40.107 20.3869 43.8461 18.8272C47.8556 17.1544 51.7358 16.8097 56.0191 16.5553C58.485 16.4091 56.5319 14.0598 55.16 13.7952C53.6521 13.5039 52.0378 14.027 50.573 14.3319C45.9391 15.299 41.7074 17.0141 37.8857 19.3219Z"
        fill="#196F3D"
      />
      <path
        d="M70.5753 8.12926H69.0241C68.9645 7.79782 68.8535 7.50615 68.6911 7.25426C68.5286 7.00237 68.3298 6.78859 68.0945 6.61293C67.8591 6.43726 67.5956 6.30469 67.304 6.2152C67.0156 6.12571 66.709 6.08097 66.3842 6.08097C65.7976 6.08097 65.2723 6.22846 64.8082 6.52344C64.3475 6.81842 63.983 7.25095 63.7145 7.82102C63.4493 8.3911 63.3168 9.08712 63.3168 9.90909C63.3168 10.7377 63.4493 11.437 63.7145 12.0071C63.983 12.5772 64.3492 13.008 64.8132 13.2997C65.2772 13.5914 65.7992 13.7372 66.3793 13.7372C66.7008 13.7372 67.0057 13.6941 67.294 13.608C67.5857 13.5185 67.8492 13.3875 68.0845 13.2152C68.3198 13.0429 68.5187 12.8324 68.6811 12.5838C68.8468 12.3319 68.9612 12.0436 69.0241 11.7188L70.5753 11.7237C70.4924 12.2242 70.3317 12.6849 70.093 13.1058C69.8577 13.5234 69.5545 13.8847 69.1832 14.1896C68.8153 14.4912 68.3944 14.7249 67.9205 14.8906C67.4465 15.0563 66.9295 15.1392 66.3693 15.1392C65.4877 15.1392 64.7022 14.9304 64.0128 14.5128C63.3234 14.0919 62.7798 13.4903 62.3821 12.7081C61.9877 11.9259 61.7905 10.9929 61.7905 9.90909C61.7905 8.82197 61.9893 7.88897 62.3871 7.11008C62.7848 6.32789 63.3284 5.72798 64.0178 5.31037C64.7071 4.88944 65.491 4.67898 66.3693 4.67898C66.9096 4.67898 67.4134 4.75687 67.8807 4.91264C68.3513 5.0651 68.7739 5.29048 69.1484 5.58878C69.523 5.88376 69.8329 6.24503 70.0781 6.67258C70.3234 7.09683 70.4891 7.58239 70.5753 8.12926ZM77.1316 11.8331V7.36364H78.623V15H77.1614V13.6776H77.0819C76.9062 14.0852 76.6245 14.425 76.2367 14.6967C75.8522 14.9652 75.3733 15.0994 74.7999 15.0994C74.3094 15.0994 73.8752 14.9917 73.4973 14.7763C73.1228 14.5575 72.8278 14.2344 72.6124 13.8068C72.4003 13.3793 72.2942 12.8506 72.2942 12.2209V7.36364H73.7807V12.0419C73.7807 12.5623 73.9249 12.9766 74.2132 13.2848C74.5016 13.593 74.8761 13.7472 75.3368 13.7472C75.6152 13.7472 75.892 13.6776 76.1671 13.5384C76.4455 13.3991 76.6758 13.1887 76.8581 12.907C77.0437 12.6252 77.1349 12.2673 77.1316 11.8331ZM86.3427 9.22798L84.9954 9.46662C84.939 9.29427 84.8496 9.13021 84.7269 8.97443C84.6076 8.81865 84.4452 8.69105 84.2397 8.59162C84.0342 8.49219 83.7773 8.44247 83.4691 8.44247C83.0482 8.44247 82.6969 8.53693 82.4151 8.72585C82.1334 8.91146 81.9925 9.15175 81.9925 9.44673C81.9925 9.70194 82.087 9.90743 82.2759 10.0632C82.4648 10.219 82.7698 10.3466 83.1907 10.446L84.4038 10.7244C85.1064 10.8868 85.6301 11.1371 85.9748 11.4751C86.3195 11.8132 86.4918 12.2524 86.4918 12.7926C86.4918 13.25 86.3593 13.6577 86.0941 14.0156C85.8323 14.3703 85.466 14.6487 84.9954 14.8509C84.5281 15.053 83.9862 15.1541 83.3697 15.1541C82.5146 15.1541 81.8169 14.9718 81.2766 14.6072C80.7364 14.2393 80.4049 13.7173 80.2823 13.0412L81.7191 12.8224C81.8086 13.197 81.9925 13.4804 82.271 13.6726C82.5494 13.8615 82.9123 13.956 83.3597 13.956C83.8469 13.956 84.2364 13.8549 84.5281 13.6527C84.8197 13.4472 84.9656 13.197 84.9656 12.902C84.9656 12.6634 84.8761 12.4628 84.6971 12.3004C84.5214 12.138 84.2513 12.0154 83.8867 11.9325L82.5941 11.6491C81.8815 11.4867 81.3545 11.2282 81.0131 10.8736C80.6751 10.5189 80.506 10.0698 80.506 9.52628C80.506 9.07552 80.632 8.68111 80.8839 8.34304C81.1358 8.00497 81.4838 7.74148 81.9279 7.55256C82.372 7.36032 82.8808 7.2642 83.4542 7.2642C84.2795 7.2642 84.9291 7.44318 85.4031 7.80114C85.877 8.15578 86.1902 8.63139 86.3427 9.22798ZM91.6909 7.36364V8.55682H87.5197V7.36364H91.6909ZM88.6383 5.53409H90.1248V12.7578C90.1248 13.0462 90.1679 13.2633 90.2541 13.4091C90.3403 13.5516 90.4513 13.6494 90.5872 13.7024C90.7264 13.7521 90.8772 13.777 91.0396 13.777C91.1589 13.777 91.2633 13.7687 91.3528 13.7521C91.4423 13.7356 91.5119 13.7223 91.5616 13.7124L91.8301 14.9403C91.7439 14.9735 91.6213 15.0066 91.4622 15.0398C91.3031 15.0762 91.1042 15.0961 90.8656 15.0994C90.4745 15.1061 90.1099 15.0365 89.7718 14.8906C89.4338 14.7448 89.1603 14.5194 88.9515 14.2145C88.7427 13.9096 88.6383 13.5268 88.6383 13.0661V5.53409ZM96.4698 15.1541C95.7539 15.1541 95.1291 14.9901 94.5955 14.6619C94.0619 14.3338 93.6476 13.8748 93.3526 13.2848C93.0576 12.6948 92.9102 12.0054 92.9102 11.2166C92.9102 10.4245 93.0576 9.73177 93.3526 9.13849C93.6476 8.54522 94.0619 8.08452 94.5955 7.75639C95.1291 7.42827 95.7539 7.2642 96.4698 7.2642C97.1857 7.2642 97.8105 7.42827 98.3441 7.75639C98.8777 8.08452 99.292 8.54522 99.587 9.13849C99.882 9.73177 100.029 10.4245 100.029 11.2166C100.029 12.0054 99.882 12.6948 99.587 13.2848C99.292 13.8748 98.8777 14.3338 98.3441 14.6619C97.8105 14.9901 97.1857 15.1541 96.4698 15.1541ZM96.4748 13.9062C96.9388 13.9062 97.3233 13.7836 97.6282 13.5384C97.9331 13.2931 98.1585 12.9666 98.3043 12.5589C98.4535 12.1513 98.5281 11.7022 98.5281 11.2116C98.5281 10.7244 98.4535 10.277 98.3043 9.86932C98.1585 9.45833 97.9331 9.12855 97.6282 8.87997C97.3233 8.63139 96.9388 8.5071 96.4748 8.5071C96.0075 8.5071 95.6197 8.63139 95.3114 8.87997C95.0065 9.12855 94.7795 9.45833 94.6303 9.86932C94.4845 10.277 94.4116 10.7244 94.4116 11.2116C94.4116 11.7022 94.4845 12.1513 94.6303 12.5589C94.7795 12.9666 95.0065 13.2931 95.3114 13.5384C95.6197 13.7836 96.0075 13.9062 96.4748 13.9062ZM101.689 15V7.36364H103.116V8.60653H103.21C103.369 8.18561 103.629 7.85748 103.991 7.62216C104.352 7.38352 104.784 7.2642 105.288 7.2642C105.799 7.2642 106.226 7.38352 106.571 7.62216C106.919 7.8608 107.176 8.18892 107.341 8.60653H107.421C107.603 8.19886 107.893 7.87405 108.291 7.6321C108.689 7.38684 109.163 7.2642 109.713 7.2642C110.406 7.2642 110.971 7.4813 111.408 7.91548C111.849 8.34967 112.069 9.00426 112.069 9.87926V15H110.583V10.0185C110.583 9.50142 110.442 9.12689 110.16 8.89489C109.879 8.66288 109.542 8.54688 109.151 8.54688C108.667 8.54688 108.291 8.69602 108.023 8.99432C107.754 9.2893 107.62 9.6688 107.62 10.1328V15H106.138V9.92401C106.138 9.50971 106.009 9.17661 105.751 8.92472C105.492 8.67282 105.156 8.54688 104.741 8.54688C104.46 8.54688 104.199 8.62145 103.961 8.7706C103.725 8.91643 103.535 9.12026 103.389 9.3821C103.247 9.64394 103.175 9.94721 103.175 10.2919V15H101.689ZM117.886 15V4.81818H121.515C122.308 4.81818 122.964 4.96236 123.484 5.25071C124.005 5.53906 124.394 5.93347 124.653 6.43395C124.911 6.93111 125.04 7.49124 125.04 8.11435C125.04 8.74077 124.909 9.30421 124.648 9.80469C124.389 10.3018 123.998 10.6963 123.474 10.9879C122.954 11.2763 122.299 11.4205 121.51 11.4205H119.015V10.1179H121.371C121.872 10.1179 122.278 10.0317 122.589 9.85938C122.901 9.68371 123.13 9.44508 123.275 9.14347C123.421 8.84186 123.494 8.49882 123.494 8.11435C123.494 7.72988 123.421 7.38849 123.275 7.0902C123.13 6.7919 122.899 6.55824 122.584 6.3892C122.273 6.22017 121.862 6.13565 121.351 6.13565H119.422V15H117.886ZM128.208 4.81818V15H126.722V4.81818H128.208ZM132.431 15.169C131.947 15.169 131.509 15.0795 131.118 14.9006C130.727 14.7183 130.417 14.4548 130.188 14.1101C129.963 13.7654 129.85 13.3428 129.85 12.8423C129.85 12.4115 129.933 12.0568 130.099 11.7784C130.265 11.5 130.488 11.2796 130.77 11.1172C131.052 10.9548 131.367 10.8321 131.715 10.7493C132.063 10.6664 132.417 10.6035 132.779 10.5604C133.236 10.5073 133.607 10.4643 133.892 10.4311C134.177 10.3946 134.384 10.3366 134.514 10.2571C134.643 10.1776 134.708 10.0483 134.708 9.86932V9.83452C134.708 9.40033 134.585 9.06392 134.34 8.82528C134.098 8.58665 133.736 8.46733 133.256 8.46733C132.755 8.46733 132.361 8.57836 132.073 8.80043C131.788 9.01918 131.59 9.26278 131.481 9.53125L130.084 9.21307C130.25 8.74905 130.492 8.37453 130.81 8.08949C131.131 7.80114 131.501 7.59233 131.919 7.46307C132.336 7.33049 132.775 7.2642 133.236 7.2642C133.541 7.2642 133.864 7.30066 134.205 7.37358C134.55 7.44318 134.872 7.57244 135.17 7.76136C135.472 7.95028 135.718 8.22041 135.911 8.57173C136.103 8.91974 136.199 9.37216 136.199 9.92898V15H134.747V13.956H134.688C134.592 14.1482 134.447 14.3371 134.255 14.5227C134.063 14.7083 133.816 14.8625 133.514 14.9851C133.213 15.1077 132.852 15.169 132.431 15.169ZM132.754 13.9759C133.165 13.9759 133.516 13.8946 133.808 13.7322C134.103 13.5698 134.326 13.3577 134.479 13.0959C134.635 12.8307 134.713 12.5473 134.713 12.2457V11.2614C134.66 11.3144 134.557 11.3641 134.404 11.4105C134.255 11.4536 134.084 11.4917 133.892 11.5249C133.7 11.5547 133.513 11.5829 133.33 11.6094C133.148 11.6326 132.996 11.6525 132.873 11.669C132.585 11.7055 132.321 11.7668 132.083 11.853C131.847 11.9392 131.658 12.0634 131.516 12.2259C131.377 12.3849 131.307 12.5971 131.307 12.8622C131.307 13.2301 131.443 13.5085 131.715 13.6974C131.986 13.883 132.333 13.9759 132.754 13.9759ZM139.665 10.4659V15H138.179V7.36364H139.606V8.60653H139.7C139.876 8.20218 140.151 7.87737 140.526 7.6321C140.903 7.38684 141.379 7.2642 141.952 7.2642C142.473 7.2642 142.929 7.37358 143.32 7.59233C143.711 7.80777 144.014 8.12926 144.229 8.55682C144.445 8.98437 144.553 9.51302 144.553 10.1428V15H143.066V10.3217C143.066 9.76823 142.922 9.3357 142.634 9.02415C142.345 8.70928 141.949 8.55185 141.445 8.55185C141.101 8.55185 140.794 8.62642 140.526 8.77557C140.26 8.92472 140.05 9.14347 139.894 9.43182C139.742 9.71686 139.665 10.0616 139.665 10.4659Z"
        fill="#196F3D"
      />
    </svg>
  </div>
);

export async function getStaticProps({ params }) {
  const id = params['id'][2];
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties?populate=deep&filters[id][$eq]=${id}`
  );

  const { data } = await res.json();
  const projectId = data[0].attributes.project.data.id;

  const propertiesRes = await axios.get(
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
  const similarPropertiesRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties`,
    {
      params: {
        populate: '*',
        'filters[project][id][$eq]': projectId,
        'filters[id][$ne]': id,
      },
    }
  );

  const projectRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
    {
      params: {
        'pagination[pageSize]': 3,
        sort: 'createdAt:desc',
      },
    }
  );

  return {
    props: {
      property: { id: data[0].id, ...data[0]['attributes'] },
      featuredProperties: propertiesRes.data.data,
      similarProperties: similarPropertiesRes.data.data,
      projects: projectRes.data.data,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties`);
  const { data: propertyLists } = await res.json();
  return {
    paths: propertyLists.map((propertyList) => {
      return {
        params: {
          id: ['', '', propertyList['id'].toString()],
        },
      };
    }),
    fallback: true,
  };
}
