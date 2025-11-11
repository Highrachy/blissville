import Section from '@/components/common/Section';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import { investorSchema } from '@/components/forms/schemas/page-schema';
import Select from '@/components/forms/Select';
import Textarea from '@/components/forms/Textarea';
import {
  camelToSentence,
  isDevEnvironment,
  valuesToOptions,
} from '@/utils/helpers';
import React from 'react';
import { toast } from 'react-toastify';
import Footer from '@/components/common/Footer';
import Navigation from '@/components/layouts/Navigation';
import axios from 'axios';
import { getError, statusIsSuccessful } from '@/utils/helpers';
import FormikButton from '@/components/forms/FormikButton';
import { PageHeader } from '@/components/common/Header';
import { investorTestData } from '@/data/sample/investor';
import { useFormikContext } from 'formik';
import Button from '@/components/forms/Button';
import { FaChevronLeft } from 'react-icons/fa';
import InvestorTerms from '@/data/investor-terms';
import Humanize from 'humanize-plus';
import CheckboxGroup from '@/components/forms/CheckboxGroup';
import Upload from '@/components/forms/Upload';
import InputFormat from '@/components/forms/InputFormat';
import Image from 'next/image';
import { titles } from '@/utils/constants';
import SeoHead from '@/components/utils/SeoHead';

const InvestmentApplicationForm = () => {
  return (
    <>
      <Navigation />
      <SeoHead
        title="Investors | Real Estate Investment Opportunities in Lagos | Blissville by Highrachy"
        description="Invest with Blissville by Highrachy and watch your money grow. Explore exclusive real estate investment opportunities in Lagos with annual growth rates exceeding 200%."
        canonical="https://www.blissville.com.ng/investors"
        ogImage="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-2-front.jpg"
        keywords={[
          'Real estate investment Lagos',
          'Blissville investors',
          'Highrachy investment opportunities',
          'Property investment Nigeria',
          'Invest in Blissville Lagos',
          'Luxury real estate Nigeria',
          'Best investment opportunities Lagos',
          'Affordable real estate returns',
          'Highrachy real estate investors',
          'Property wealth growth Nigeria',
        ]}
      />
      <PageHeader
        title="Invest Now"
        subHeader="Seize Your Opportunity: Apply to Invest Today"
        bgImage="/assets/img/bg/investors.jpeg"
      />
      <InvestmentForm />
      <Footer />
    </>
  );
};

const IntroText = () => (
  <div className="row">
    <div className="col-md-7 col-lg-7 pe-5">
      <p className="fw-normal">
        Thank you for considering investing with us. The process to participate
        in our exciting investment opportunities is outlined below.
      </p>
      <ol className="lh-2">
        <li className="mb-4">
          Select an investment package that suits your budget and investment
          below
        </li>
        <li className="mb-4">
          After completing the form, our team will review it and contact you to
          finalize the investment agreement.
        </li>
        <li className="mb-4">
          You can make the payment to our bank account:
          <ul className="bg-primary-50 list-unstyled p-4 mt-2 rounded border-1">
            <li>
              <strong>Account Name:</strong> Highrachy Investment & Technology
              Limited
            </li>
            <li>
              <strong>Account Number:</strong> 0029082860
            </li>
            <li>
              <strong>Bank:</strong> Stanbic IBTC Bank PLC
            </li>
          </ul>
        </li>
      </ol>
      <p className="">
        We are excited to embark on this journey together and look forward to
        welcoming you as a valued investment partner in our project.
      </p>
    </div>
    <div className="col-md-5 col-lg-5">
      <Image
        src="/assets/img/investors/investment-tree.jpg"
        alt="Hero Image"
        width={1500}
        className="rounded pe-md-3"
        height={1688}
      />
    </div>
    <div className="dotted-border-muted my-5"></div>

    <h3>Select an Investment Package</h3>
    <Select
      name="investmentRange"
      formGroupClassName="col-md-6"
      label="Investment Package"
      optional
      options={valuesToOptions(
        ['₦25 Million', '₦50 Million', '₦100 Million'],
        'Select Investment Package'
      )}
    />
  </div>
);

const PersonalInformation = () => (
  <>
    <div className="row">
      <Select
        formGroupClassName="col-md-6"
        name="title"
        label="Title"
        options={valuesToOptions(titles, 'Select One...')}
      />
      <Input
        formGroupClassName="col-md-6"
        name="firstName"
        label="First Name"
      />
    </div>
    <div className="row">
      <Input
        formGroupClassName="col-md-6"
        name="middleName"
        label="Middle Name"
        optional
      />
      <Input formGroupClassName="col-md-6" name="surname" label="Surname" />
    </div>

    <Textarea
      name="residentialAddress"
      label="Residential Address"
      placeholder="Current Home Address"
    />
    <div className="row">
      <Input
        formGroupClassName="col-md-6"
        name="phone"
        label="Mobile Telephone"
      />
      <Input
        formGroupClassName="col-md-6"
        name="email"
        type="email"
        label="Personal Email"
      />
    </div>
    <div className="row">
      <Select
        name="gender"
        label="Gender"
        options={valuesToOptions(['Male', 'Female'], 'Select One...')}
        formGroupClassName="col-md-6"
      />
      <Input
        formGroupClassName="col-md-6"
        name="nationality"
        label="Nationality"
      />
    </div>
    <div className="row">
      <Input
        formGroupClassName="col-md-6"
        name="occupation"
        label="Occupation"
      />
      <Select
        formGroupClassName="col-md-6"
        name="employmentStatus"
        label="Employment Status"
        options={valuesToOptions(
          [
            'Contractor/Freelancer',
            'Employed Full-Time',
            'Employed Part-Time',
            'Retired',
            'Self-Employed',
            'Student',
            'Temporary/Seasonal Worker',
            'Unemployed',
          ],
          'Select Employment Status'
        )}
      />
    </div>

    <div className="row">
      <Input name="employerName" label="Employer Name" optional />

      <Textarea
        name="officeAddress"
        label="Office Address"
        placeholder="Office Address"
      />
    </div>
  </>
);
const InvestmentInfo = () => (
  <>
    <div className="row">
      <InputFormat name="amountToInvest" label="Amount to Invest" />
    </div>
    <h6 className="mt-5">Your Bank Details</h6>
    <Input name="bankAccountName" label="Bank Account Name" />
    <div className="row">
      <Input
        formGroupClassName="col-md-6"
        name="accountNumber"
        label="Account Number"
      />

      <Input formGroupClassName="col-md-6" name="bankName" label="Bank Name" />
    </div>
  </>
);
const TermsAndCondition = () => (
  <>
    <InvestorTerms />
    <div className="dotted-border-muted my-5"></div>{' '}
    <div className="mt-3">
      <Upload
        label="Upload your Signature"
        changeText="Update Signature"
        defaultImage="/assets/img/placeholder/image.png"
        imgOptions={{
          className: 'mb-3 img-xl img-contain',
          width: 100,
          height: 200,
        }}
        name="signature"
        uploadText={`Upload Signature`}
        folder={'investor-signature'}
      />
    </div>
    <div className="mt-4">
      <CheckboxGroup
        inline
        name="declaration"
        options={[
          {
            label: (
              <>
                I hereby declare that the information given in this application
                is correct to the best of my knowledge and believe same to be
                true.
              </>
            ),
            value: true,
          },
        ]}
      />
    </div>
    <div className="mt-2 mb-5">
      <CheckboxGroup
        inline
        name="confirmation"
        options={[
          {
            label: (
              <>
                By submitting this form, I hereby acknowledge that I have read
                and understand the terms and conditions contained herein and
                agree to be bound by the same.
              </>
            ),
            value: true,
          },
        ]}
      />
    </div>
  </>
);

export const PaddedSection = ({ children, title }) => (
  <section className="pb-5">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12">
          {title && <h3>{title}</h3>}
          {children}
        </div>
      </div>
    </div>
  </section>
);

const InvestmentForm = ({ apartment }) => {
  const [step, setStep] = React.useState(0);
  const [errorFields, setErrorFields] = React.useState([]);

  const handleSubmit = async (values, actions) => {
    const payload = {
      ...values,
      investmentRange: values?.investmentRange || 'None',
    };

    delete payload.confirmation;
    delete payload.declaration;

    try {
      axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/investors`,
        data: { data: payload },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            toast.success('Information sent successfully');
            setStep(0);
            actions.resetForm({ values: {} });
            actions.setSubmitting(false);
          }
        })
        .catch(function (error) {
          toast.error(getError(error));
          actions.setSubmitting(false);
        });
    } catch (error) {
      toast.error(getError(error));
      actions.setSubmitting(false);
    }
  };

  const myRef = React.useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  const ALL_STEPS = [
    <IntroText key="1" />,
    <PersonalInformation key="2" />,
    <InvestmentInfo key="3" />,
    <TermsAndCondition key="4" />,
  ];
  const ALL_STEPS_TITLE = [
    'Investment Application Form',
    'Client Details',
    'Investment Details',
    'Terms and Conditions',
  ];

  const lastStep = ALL_STEPS.length - 1;
  const isFirstStep = step === 0;
  const isLastStep = step === lastStep;

  const showErrorMessage = (fields = []) => {
    setErrorFields(fields);
  };

  return (
    <Section>
      <FormikForm
        schema={investorSchema}
        handleSubmit={handleSubmit}
        name="tenant-application-form"
        showFormikState
        showAllFormikState
        persistForm
        initialValues={
          isDevEnvironment() ? investorTestData : { investmentRange: 'None' }
        }
      >
        <PaddedSection>
          <>
            <section ref={myRef}>&nbsp;</section>

            {isFirstStep && <h3 className="mb-4">{ALL_STEPS_TITLE[step]}</h3>}
            <div className="">
              {!isFirstStep && (
                <h4 className="mb-3">
                  {ALL_STEPS_TITLE[step]}{' '}
                  <span className="text-muted">
                    (Step {step}/{lastStep})
                  </span>{' '}
                </h4>
              )}
              {errorFields.length > 0 && (
                <div className="alert alert-danger">
                  <p className="mb-0">
                    <strong>The following fields are required</strong>
                  </p>
                  <p className="mb-0">
                    {errorFields.map((field, index) => (
                      <li key={index}>{field}</li>
                    ))}
                  </p>
                </div>
              )}

              {step > 0 && (
                <div className="mb-4 alert alert-info text-sm">
                  <strong>Note: </strong> Your information is confidential and
                  will not be shared with any 3rd parties.
                </div>
              )}

              {ALL_STEPS[step]}
            </div>

            <ActionButtons
              step={step}
              setStep={setStep}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              executeScroll={executeScroll}
            />
          </>
        </PaddedSection>
      </FormikForm>
    </Section>
  );
};

const ActionButtons = ({
  step,
  setStep,
  isFirstStep,
  isLastStep,
  executeScroll,
}) => {
  const { values, setFieldTouched } = useFormikContext();

  const validateStep = (step) => {
    const requiredFields = getMissingRequiredFields(step);
    const missingFields = [...requiredFields];
    if (missingFields.length > 0) {
      toast.error(
        `${missingFields.join(', ')} ${Humanize.pluralize(
          missingFields.length,
          'is',
          'are'
        )} required`
      );
    }
    return [...missingFields].length === 0;
  };

  const getMissingRequiredFields = (step) => {
    const requiredFields = REQUIRED_FIELDS[step] || [];
    if (!Array.isArray(requiredFields)) return [];
    return requiredFields.reduce((acc, field) => {
      if (!values?.[field]) {
        acc.push(camelToSentence(field));
        setFieldTouched(field, true, true);
      }
      return acc;
    }, []);
  };

  return (
    <div className="d-flex justify-content-between">
      {/*  Show Back button on all steps except First Step */}
      {!isFirstStep && (
        <Button
          color="outline-light"
          className="px-5"
          onClick={() => {
            setStep(step - 1);
            executeScroll();
          }}
        >
          <FaChevronLeft /> Back
        </Button>
      )}

      {isLastStep ? (
        // Submit Button on last step
        <FormikButton
          className="px-5"
          disabled={!values?.['confirmation']?.[0]}
        >
          Submit Application
        </FormikButton>
      ) : (
        // Show Forward button on all steps except Last Step
        <Button
          color="primary"
          className="px-5"
          onClick={() => {
            if (validateStep(step)) {
              setStep(step + 1);
            }
            executeScroll();
          }}
        >
          {isFirstStep ? "Let's Begin" : <>Continue</>}
        </Button>
      )}
    </div>
  );
};

export const REQUIRED_FIELDS = {
  1: [
    'title',
    'firstName',
    'surname',
    'residentialAddress',
    'phone',
    'email',
    'gender',
    'nationality',
    'occupation',
    'employmentStatus',
    'officeAddress',
  ],
  2: ['amountToInvest', 'bankAccountName', 'accountNumber', 'bankName'],
  3: ['signature', 'declaration', 'confirmation'],
};

export default InvestmentApplicationForm;
