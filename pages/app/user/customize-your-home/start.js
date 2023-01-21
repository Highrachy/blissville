import Backend from '@/components/admin/Backend';
import Button from '@/components/forms/Button';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import { UserContext } from 'context/user';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useContext } from 'react';
import { getLocationFromAddress, moneyFormatInNaira } from '@/utils/helpers';
import MakePayment from '@/components/utils/MakePayment';
import { differenceInDays, isPastDate } from '@/utils/date-helpers';
import Humanize from 'humanize-plus';
import { Buildings } from 'iconsax-react';
import classNames from 'classnames';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { userMenu } from '@/data/admin/sideMenu';
import SingleProperty from '@/components/common/SinglePropertyNew';
import Section from '@/components/common/Section';
import { DashboardTable } from '../dashboard';
import { LocalImage } from '@/components/common/Image';
import Separator from '@/components/common/Separator';
import { TabTeam } from '@/components/common/Team';
import { MdCheckCircle } from 'react-icons/md';
import { getCustomization, storeCustomization } from '@/utils/localStorage';
import { useRouter } from 'next/router';

const START_CUSTOMIZE_OPTIONS = {
  1: {
    key: 'Customization',
    text: 'How would you like to get started',
    options: {
      CUSTOMIZE_ALL: 'I am excited to customise all rooms in my apartment',
      CUSTOMIZE_FEW: 'I am excited to customise a few rooms only',
      HELP_ME: 'Help me customize my apartment with the best option',
    },
    extraText: (
      <>
        {' '}
        Not sure on how to proceed?{' '}
        <Link href="/contact-us" passHref>
          You can chat with us or contact us
        </Link>
      </>
    ),
  },
  2: {
    key: 'Budget',
    text: 'What is your budget',
    options: {
      NO_COST: 'I want no additional cost',
      AVERAGE_COST: 'I am happy with an average cost',
      PREMIUM_COST:
        'I want a premium things with little consideration for the cost',
    },
  },
  3: {
    key: 'Theme',
    text: 'What is your preferred theme',
    options: {
      ANY_THEME: 'Any theme',
      MODERN: 'Modern, Contemporary and Elegant',
      MINIMALIST: 'Minimalist and Professional',
      PREMIUM: 'Premium, Classy and Royal',
    },
    extraText: (
      <>
        {' '}
        Not sure on these themes mean?{' '}
        <Link href="/contact-us" passHref>
          Read our online article for more clarification
        </Link>
      </>
    ),
  },
  4: {
    text: 'Review your selection',
    options: [],
  },
};

const MyProperties = () => {
  const { user } = useContext(UserContext);
  const id = user?.id;

  const [query, result] = useSWRQuery({
    name: id ? ['assigned-properties', id] : id,
    endpoint: `api/assigned-properties`,
    axiosOptions: {
      params: {
        'filters[user][id][$eq]': id,
        populate: '*',
      },
    },
  });
  const item = result?.[0] || null;

  return (
    <Backend title="Start Customization">
      <ContentLoader
        Icon={<Buildings size="24" variant="Bulk" />}
        query={query}
        results={result}
        name={'Property'}
        noContentText={'You have not been assigned any property yet'}
      >
        <Header {...item} userId={id} />
        {/* <Summary {...item} userId={id} /> */}
        <Customize />
      </ContentLoader>
    </Backend>
  );
};

export default MyProperties;

const Header = ({ attributes }) => {
  const {
    price,
    initialPayment,
    expectedNextPayment,
    paymentDueDate,
    totalAmountPaid,
  } = attributes;
  const property = {
    ...attributes?.property?.data?.attributes,
    id: attributes?.property?.data?.id,
  };
  const project = {
    ...attributes?.project?.data?.attributes,
    id: attributes?.project?.data?.id,
  };
  const now = 0;
  const stillHasPendingPayment = now < 100;
  return (
    <section className="card mb-3">
      <div className="card-body p-5">
        <div className="d-flex flex-wrap flex-sm-nowrap">
          <div className="">
            <div className="d-block me-3 position-relative">
              <LocalImage
                src={property.image}
                name={name}
                className="img-xl"
                rounded
                responsiveImage={false}
              />
            </div>
          </div>
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start flex-wrap">
              <div className="d-flex flex-column">
                <h5 className="d-flex align-items-center mt-n2">
                  {property.name}
                </h5>
                <div className="d-flex text-sm flex-wrap align-items-center mb-2 pe-2">
                  <Link href={`/our-projects/${project.slug}`} passHref>
                    <a className="text-reset">{project.name}</a>
                  </Link>{' '}
                  &nbsp;- {getLocationFromAddress(project, true)}
                </div>
                <div className="d-flex text-sm flex-wrap align-items-center pe-2 text-primary fw-bold">
                  <span className="text-muted">Customization Price: </span>
                  &nbsp; {moneyFormatInNaira(0)} &nbsp;
                </div>
                <div className="my-2 text-muted">
                  {/* <Link
                    href={`/our-properties/${project?.slug || 'project-name'}/${
                      property?.slug || 'property-name'
                    }/${property.id}`}
                    passHref
                  >
                    <a className="text-underline text-muted text-sm me-3">
                      View on Website
                    </a>
                  </Link>
                  <Separator /> */}
                  <div
                    className={classNames('text-xs', {
                      'text-success': !stillHasPendingPayment,
                      'text-info': stillHasPendingPayment,
                    })}
                    style={{
                      marginLeft: `${
                        now > 10 ? (now < 92 ? Math.max(now - 4, 10) : 92) : now
                      }%`,
                    }}
                  >
                    {now}%
                  </div>
                  <div className="progress" style={{ height: '6px' }}>
                    <div
                      className={classNames('progress-bar', {
                        'bg-success': !stillHasPendingPayment,
                        'bg-info': stillHasPendingPayment,
                      })}
                      role="progressbar"
                      aria-label="Payment Progress"
                      style={{ width: `${now}%` }}
                      aria-valuenow={now}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Customize = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({
    ...(getCustomization() || {}),
  });
  const lastStep = Object.keys(START_CUSTOMIZE_OPTIONS).length;
  const isLastStep = currentStep === lastStep;

  return (
    <section className="card mb-3">
      <div className="card-body p-6 pb-6">
        <h3 className="text-primary">Start Customizing your Home</h3>

        <p className="text-muted mb-5">
          If you&apos;re looking to make your house feel like home, look no
          further! You can customize your home to make it feel exactly as you
          want it. With our easy-to-use design tools, you can quickly create a
          space that&apos;s unique to you.
        </p>
        <hr className="dotted-border" />
        <section>
          <h4 className="text-center py-5">
            {START_CUSTOMIZE_OPTIONS[currentStep]?.text}
          </h4>

          {isLastStep && (
            <>
              <ListOptions
                currentStep={currentStep}
                selectedOptions={selectedOptions}
                setCurrentStep={setCurrentStep}
              />
            </>
          )}

          <CustomizeOptions
            step={currentStep}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />

          {currentStep < lastStep && (
            <>
              <Button
                className="mt-5"
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!selectedOptions[currentStep]}
              >
                Continue Customization
              </Button>
              {currentStep > 1 && (
                <Button
                  color="light"
                  className="ms-3 mt-5"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Back
                </Button>
              )}
            </>
          )}
        </section>
      </div>
    </section>
  );
};

const ListOptions = ({ selectedOptions, currentStep, setCurrentStep }) => {
  const router = useRouter();
  return (
    <>
      <ul className="list-group list-group-numbered">
        {Object.entries(selectedOptions).map(
          ([step, option], index) =>
            index < 3 && (
              <ListOption
                key={index}
                step={parseInt(step, 10)}
                text={option?.text}
                title={START_CUSTOMIZE_OPTIONS[index + 1]?.key}
                setCurrentStep={setCurrentStep}
              />
            )
        )}
      </ul>
      <Button
        color="primary"
        className="mt-5"
        onClick={() => {
          storeCustomization({
            ...selectedOptions,
            selection: {
              rooms:
                getCustomization()?.[1].option === 'CUSTOMIZE_FEW'
                  ? getCustomization().selection?.rooms || []
                  : null,
              completed: false,
            },
          });
          router.push('/app/user/customize-your-home/customize');
        }}
      >
        Save Selection
      </Button>

      <Button
        color="light"
        className="ms-3 mt-5"
        onClick={() => setCurrentStep(currentStep - 1)}
      >
        Back
      </Button>
    </>
  );
};

const ListOption = ({ step, title, text, setCurrentStep }) => (
  <li className="list-group-item px-4 py-4 d-flex justify-content-between align-items-start">
    <div className="ms-2 me-auto">
      <div className="fw-bold">{title}</div>
      <div className="text-muted"></div>
      {text}
    </div>
    <span
      className="text-xs text-link text-muted"
      onClick={() => setCurrentStep(step)}
    >
      Edit Option
    </span>
  </li>
);

const CustomizeOptions = ({ step, selectedOptions, setSelectedOptions }) => {
  const options = START_CUSTOMIZE_OPTIONS[step]?.options;
  const extraText = START_CUSTOMIZE_OPTIONS[step]?.extraText;
  return (
    <>
      <ul className="d-flex flex-column list-unstyled w-100">
        {Object.entries(options).map(([option, text]) => (
          <SingleOption
            key={option}
            option={option}
            text={text}
            step={step}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        ))}
      </ul>

      <div className="text-muted text-sm mt-4 mb-4">{extraText}</div>
    </>
  );
};

const SingleOption = ({
  text,
  step,
  option,
  selectedOptions,
  setSelectedOptions,
}) => {
  return (
    <li
      className={`custom-option ${
        selectedOptions[step]?.option === option ? 'active' : ''
      }`}
      onClick={() =>
        setSelectedOptions({ ...selectedOptions, [step]: { option, text } })
      }
    >
      {text}
      <span className="custom-option__check">
        <MdCheckCircle />
      </span>
    </li>
  );
};
