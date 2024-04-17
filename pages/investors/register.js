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
import { getTokenFromStore } from '@/utils/localStorage';
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
import Link from 'next/link';
import InputFormat from '@/components/forms/InputFormat';

const Register = () => {
  return (
    <>
      <Navigation />
      <PageHeader
        title="Invest with Blissville"
        subHeader="Secure Your Future: Invest Today and Watch Your Wealth Grow"
        bgImage="/assets/img/bg/investors.jpeg"
      />
      <InvestmentForm />
      <Footer />
    </>
  );
};

const IntroText = () => (
  <div className="col-sm-12" id="top-page">
    <p className="lead fw-normal mt-3">
      Thank you for considering investing with us. The process to participate in
      our exciting investment opportunities is outlined below:
    </p>
    <ol className="text-lg lh-2">
      <li className="mb-4">
        Please click the button below to begin the investment application
        process.
      </li>
      <li className="mb-4">
        After submitting the form, our team will review it and contact you to
        finalize the investment agreement.
      </li>
      <li className="mb-4">
        The investment amount will be due as per the terms of the investment
        agreement. You can make the payment to our bank account:
        <ul>
          <li>
            <strong>Account Name:</strong> Highrachy Investment and Technology
            Limited
          </li>
          <li>
            <strong>Account Number:</strong> 0013808391
          </li>
          <li>
            <strong>Bank:</strong> Guaranty Trust Bank PLC
          </li>
        </ul>
      </li>
    </ol>
    <p className="text-lg">
      We are excited to embark on this journey together and look forward to
      welcoming you as a valued investor in our projects.
    </p>
  </div>
);

const titles = [
  'Mr',
  'Mrs',
  'Ms',
  'Miss',
  'Alhaji',
  'Alhaja',
  'Chief',
  'Dr',
  'Prof',
  'Rev',
  'Sir',
  'Madam',
  'Master',
];

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
      <Select
        formGroupClassName="col-md-6"
        name="investmentRange"
        label="Investment Range"
        options={valuesToOptions(
          [
            '₦1 Million - ₦4.5 Million',
            '₦5 Million - ₦9.5 Million',
            '₦10 Million and Above',
          ],
          'Select Investment Range'
        )}
      />

      <InputFormat
        formGroupClassName="col-md-6"
        name="amountToInvest"
        label="Amount to Invest"
      />
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
    <h3>Terms and Condition</h3>
    <InvestorTerms />

    <div className="mt-6">
      <Upload
        label="Upload your Signature"
        changeText="Update Signature"
        defaultImage="/assets/img/placeholder/image.png"
        imgOptions={{
          className: 'mb-3 img-xl',
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
    <div className="mt-2">
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
        <div className="col-lg-10 col-md-11 col-sm-12">
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
    };

    delete payload.confirmation;
    delete payload.declaration;

    console.log('payload', payload);

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
    'Begin Your Investment Journey Now',
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
        initialValues={isDevEnvironment() ? investorTestData : {}}
      >
        <PaddedSection>
          <>
            <section ref={myRef}>&nbsp;</section>
            {isFirstStep && <h3 className="mb-4">{ALL_STEPS_TITLE[step]}</h3>}
            <div className="bg-light py-4 px-4 px-md-6 py-md-5 mb-4">
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

              {ALL_STEPS[step]}

              {step > 0 && (
                <div className="text-muted mt-5">
                  <strong>Note: </strong> Your information is confidential and
                  will not be shared with any 3rd parties.
                </div>
              )}
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
          {isFirstStep ? "Ready to Invest? Let's Begin" : <>Continue</>}
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
  2: [
    'investmentRange',
    'amountToInvest',
    'bankAccountName',
    'accountNumber',
    'bankName',
  ],
  3: ['signature', 'declaration', 'confirmation'],
};

export default Register;
