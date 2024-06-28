import Section from '@/components/common/Section';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import { propertyAcquisitionSchema } from '@/components/forms/schemas/page-schema';
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
import { PageHeader } from '@/components/common/Header';
import { propertyAcquisitionTestData } from '@/data/sample/propertyAcquisition';
import { useFormikContext } from 'formik';
import Button from '@/components/forms/Button';
import { FaChevronLeft } from 'react-icons/fa';
import Humanize from 'humanize-plus';
import CheckboxGroup from '@/components/forms/CheckboxGroup';
import Upload from '@/components/forms/Upload';
import Image from 'next/image';
import { titles } from '@/utils/constants';
import { PaddedSection } from 'pages/investors/apply';
import InputFormat from '@/components/forms/InputFormat';
import FormikButton from '@/components/forms/FormikButton';

const PropertyAcquisitionForm = () => {
  return (
    <>
      <Navigation />
      <PageHeader
        title="Acquire Property"
        subHeader="Apply today to acquire your property"
        bgImage="/assets/img/bg/property-acquisitions.jpeg"
      />
      <AcquisitionForm />
      <Footer />
    </>
  );
};

const IntroText = () => (
  <div className="row">
    <div className="col-md-7 col-lg-7 pe-5">
      <p className="fw-normal">
        Thank you for considering acquiring property with us. The process to
        participate in our exciting property acquisition opportunities is
        outlined below.
      </p>
      <ol className="lh-2">
        <li className="mb-4">
          Select a property acquisition plan that suits your needs below.
        </li>
        <li className="mb-4">
          After completing the form, our team will review it and contact you to
          finalize the acquisition agreement.
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
        welcoming you as a valued partner in our project.
      </p>
    </div>
    <div className="col-md-5 col-lg-5">
      <Image
        src="/assets/img/property-acquisitions/property.jpg"
        alt="Property Image"
        width={1500}
        className="rounded pe-md-3"
        height={1688}
      />
    </div>
    <div className="dotted-border-muted my-5"></div>
  </div>
);

const ClientDetails = () => (
  <>
    <div className="mt-3">
      <Upload
        label="Upload your Passport Photograph"
        changeText="Update Passport Photograph"
        defaultImage="/assets/img/placeholder/image.png"
        imgOptions={{
          className: 'mb-3 img-xl img-contain',
          width: 200,
          height: 200,
        }}
        name="passport"
        uploadText={`Upload Passort Photograph`}
        folder={'property-acquisition-passport'}
      />
    </div>
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
      <Input formGroupClassName="col-md-6" name="surname" label="Surname" />
      <Input
        formGroupClassName="col-md-6"
        name="otherNames"
        label="Other Names"
        optional
      />
    </div>

    <Textarea
      name="residentialAddress"
      label="Residential Address"
      placeholder="Current Home Address"
    />

    <Textarea
      name="officeAddress"
      label="Office Address"
      placeholder="Current Home Address"
    />
    <Input name="occupation" label="Occupation" />
    <div className="row">
      <Input formGroupClassName="col-md-6" name="phone" label="Telephone No" />
      <Input
        formGroupClassName="col-md-6"
        name="email"
        type="email"
        label="Personal Email"
      />
    </div>

    <div className="dotted-border-muted my-5"></div>

    <h4>Next of Kin (optional)</h4>
    <div className="row">
      <Input
        formGroupClassName="col-md-6"
        name="nextOfKin"
        label="Next of Kin"
        optional
      />
      <Input
        formGroupClassName="col-md-6"
        name="phoneNOK"
        label="Telephone Number of Next of Kin"
        optional
      />
    </div>
    <Input name="emailNOK" optional type="email" label="Email of Next of Kin" />
  </>
);

const InterestAndRelationship = () => (
  <>
    <div className="row">
      <Select
        name="residentType"
        label="Resident Type"
        options={valuesToOptions(
          ['3 bedroom Apartment - Flat'],
          'Select Resident Type'
        )}
      />
    </div>
    <div className="row">
      <Select
        formGroupClassName="col-md-6"
        name="previousHighrachyTransactions"
        label="Previous Transactions with Highrachy"
        optional
        options={valuesToOptions(
          ['Yes', 'No'],
          'Any other office, house or Flat bought or rented from Highrachy?'
        )}
      />
      <Select
        formGroupClassName="col-md-6"
        name="intendedUseOfProperty"
        label="Intended Use of Property"
        optional
        options={valuesToOptions(
          ['Owner Occupation', 'Sublease'],
          'Select Intended Use of Property'
        )}
      />
    </div>
    <Input name="nameOnTitleDocument" label="Name on Title Document" />
    <div className="row">
      <Input
        formGroupClassName="col-md-6"
        name="nameOfAgent"
        label="Name of Agent"
        optional
      />
      <Input
        formGroupClassName="col-md-6"
        name="telephoneNoAgent"
        label="Telephone Number of Agent"
        optional
      />
    </div>
  </>
);

const TransactionDetails = () => (
  <>
    <div className="row">
      <Select
        name="paymentPlan"
        label="Payment Plan"
        options={valuesToOptions(['One Off Payment'], 'Select Payment Plan')}
      />
      <InputFormat
        formGroupClassName="col-md-6"
        name="amountImmediatelyAvailableForPayment"
        label="Amount Immediately Available for Payment"
      />
      <Input
        formGroupClassName="col-md-6"
        name="nameOfBanker"
        label="Name of Banker"
        optional
      />
    </div>
  </>
);

const Declaration = () => (
  <>
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
        name="customersSignature"
        uploadText={`Upload Signature`}
        folder={'property-acquisition-signature'}
      />
    </div>
    <div className="mt-4">
      <CheckboxGroup
        inline
        name="confirmation"
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
  </>
);

const AcquisitionForm = () => {
  const [step, setStep] = React.useState(0);
  const [errorFields, setErrorFields] = React.useState([]);

  const handleSubmit = async (values, actions) => {
    const payload = {
      ...values,
    };

    delete payload.confirmation;

    try {
      axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/property-acquisitions`,
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
    <ClientDetails key="1" />,
    <InterestAndRelationship key="2" />,
    <TransactionDetails key="3" />,
    <Declaration key="4" />,
  ];

  const ALL_STEPS_TITLE = [
    'Property Acquisition Form',
    'Client Details',
    'Interest and Relationship',
    'Transaction Details',
    'Declaration',
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
        schema={propertyAcquisitionSchema}
        handleSubmit={handleSubmit}
        name="property-acquisition-application-form"
        showFormikState
        showAllFormikState
        persistForm
        initialValues={isDevEnvironment() ? propertyAcquisitionTestData : null}
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

              {step >= 0 && (
                <div className="mb-4 alert alert-info text-sm">
                  <strong>Note: </strong> Your information is confidential and
                  will not be shared with any 3rd parties.
                </div>
              )}

              {ALL_STEPS[step]}
            </div>

            <div className="mt-5">
              <ActionButtons
                step={step}
                setStep={setStep}
                isFirstStep={isFirstStep}
                isLastStep={isLastStep}
                executeScroll={executeScroll}
                compulsoryFields={REQUIRED_FIELDS}
              />
            </div>
          </>
        </PaddedSection>
      </FormikForm>
    </Section>
  );
};

export const ActionButtons = ({
  step,
  setStep,
  isFirstStep,
  isLastStep,
  executeScroll,
  compulsoryFields = REQUIRED_FIELDS,
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
    const requiredFields = compulsoryFields[step] || [];
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
      <div>
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
      </div>

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
          Continue
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
    'occupation',
    'phone',
    'email',
  ],
  2: ['residentType', 'nameOnTitleDocument'],
  3: ['paymentPlan', 'amountImmediatelyAvailableForPayment'],
  4: ['confirmation', 'customersSignature'],
};

export default PropertyAcquisitionForm;
