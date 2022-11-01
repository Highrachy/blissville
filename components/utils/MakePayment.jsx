import Axios from 'axios';
import Modal from 'components/ui/Modal';
import Button from 'components/forms/Button';
import React from 'react';
import { BASE_API_URL } from 'utils/constants';
import { getTokenFromStore } from 'utils/localStorage';
import { Formik, Form } from 'formik';
import { createSchema } from 'components/forms/schemas/schema-helpers';
import InputFormat from 'components/forms/InputFormat';
import { Card } from 'react-bootstrap';
import {
  setInitialValues,
  DisplayFormikState,
} from 'components/forms/form-helper';
import {
  dataToOptions,
  getError,
  statusIsSuccessful,
  valuesToOptions,
} from 'utils/helpers';
import DatePicker from 'components/forms/DatePicker';
import Select from 'components/forms/Select';
import Label from 'components/forms/Label';
import { toast } from 'react-toastify';
import {
  offlinePaymentSchema,
  onlinePaymentSchema,
} from '../forms/schemas/page-schema';
import Upload from '../forms/Upload';

const KEY = {
  ONLINE: 'online',
  OFFLINE: 'offline',
};

const PAYMENT_TYPE = {
  [KEY.ONLINE]: 'Pay Online',
  [KEY.OFFLINE]: 'Bank Deposit/Transfer',
};

const BANK_ACCOUNTS = [
  { accountName: 'Blissville', accountNumber: '1234567890', bankName: 'GTB' },
];

const MakePayment = ({ amount, info }) => {
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [paymentType, setPaymentType] = React.useState(KEY.ONLINE);

  return (
    <>
      <Modal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        showFooter={false}
      >
        <h5 className="my-3">How would you like to pay: </h5>

        {Object.entries(PAYMENT_TYPE).map(([key, value]) => (
          <span key={key}>
            <Button
              color={key === paymentType ? 'primary' : 'light'}
              onClick={() => setPaymentType(key)}
              className="me-3 btn-sm"
            >
              {value}
            </Button>
          </span>
        ))}
        <hr className="my-4" />

        {paymentType === KEY.ONLINE ? (
          <OnlinePayment
            amount={amount}
            hideForm={() => setShowPaymentModal(false)}
            info={info}
            setPaymentType={setPaymentType}
          />
        ) : (
          <OfflinePayment
            amount={amount}
            hideForm={() => setShowPaymentModal(false)}
            info={info}
            setPaymentType={setPaymentType}
          />
        )}
      </Modal>

      <Button
        className="me-3 mb-3 btn-sm"
        color="warning"
        onClick={() => setShowPaymentModal(true)}
      >
        Make Payment
      </Button>
    </>
  );
};

const OnlinePayment = ({ setPaymentType, amount, info }) => {
  return (
    <div className="mt-5">
      <h5 className="header-small">Online Payment</h5>
      <Formik
        enableReinitialize={true}
        initialValues={setInitialValues(onlinePaymentSchema, {
          amount: Math.min(1_000_000, amount),
        })}
        onSubmit={({ amount }, actions) => {
          const payload = {
            amount: amount.toString(),
            info,
          };
          console.log('payload', payload);

          Axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/payment/initialize`,
            payload,
            {
              headers: {
                Authorization: getTokenFromStore(),
              },
            }
          )
            .then(function (response) {
              const { status, data } = response;
              console.log('response', response);
              if (statusIsSuccessful(status)) {
                window.location.href = data.data.authorization_url;
              }
            })
            .catch(function (error) {
              toast.error(getError(error));
              actions.setSubmitting(false);
            });
        }}
        validationSchema={createSchema(onlinePaymentSchema)}
      >
        {({ isSubmitting, handleSubmit, ...props }) => (
          <Form>
            <PaystackPaymentForm
              {...props}
              isSubmitting={isSubmitting}
              handleSubmit={handleSubmit}
            />

            <div
              className="text-link text-center text-sm my-4"
              onClick={() => setPaymentType(KEY.OFFLINE)}
            >
              Need to pay into our bank account directly <br />
              Pay via Bank Deposit / Transfer
            </div>

            <DisplayFormikState {...props} showAll />
          </Form>
        )}
      </Formik>
    </div>
  );
};

const OfflinePayment = ({ amount, info, setPaymentType, hideForm }) => {
  const [showPaymentForm, setShowPaymentForm] = React.useState(false);

  return showPaymentForm ? (
    <>
      <h5 className="header-small mb-3">Payment Verification</h5>
      <OfflinePaymentForm amount={amount} info={info} hideForm={hideForm} />
    </>
  ) : (
    <>
      <div className="my-4">
        <h5 className="header-small mb-4">Bank Transfer/ Deposit</h5>
        <p>1. Pay To:</p>
        {BANK_ACCOUNTS.map(
          ({ accountNumber, bankName, accountName }, index) => (
            <>
              <h5 className="header-smaller">{accountName}</h5>
              <p key={index}>
                {bankName} - {accountNumber}
              </p>
            </>
          )
        )}
      </div>

      <p>
        2. After paying, fill the Payment Verification Form to process your
        payment.
      </p>
      <Button
        className="btn-wide btn-sm mt-4"
        onClick={() => setShowPaymentForm(true)}
      >
        Payment Verification Form
      </Button>

      <div
        className="text-link text-center text-xs my-4"
        onClick={() => setPaymentType(KEY.ONLINE)}
      >
        Love to make your payment online? <br />
        Pay via our Secured Online Platform
      </div>
    </>
  );
};

const PaystackPaymentForm = ({ isSubmitting, handleSubmit }) => {
  return (
    <section className="row">
      <div className="px-3 col-sm-12">
        <InputFormat
          label="Amount"
          name="amount"
          placeholder="Transaction Amount"
        />
        <Button
          className="btn-secondary mt-1 mb-5"
          loading={isSubmitting}
          onClick={handleSubmit}
        >
          Make Payment
        </Button>
      </div>
    </section>
  );
};

export const OfflinePaymentForm = ({
  amount,
  hideForm,
  info,
  offlinePayment,
}) => {
  const [receipt, setReceipt] = React.useState('');
  const isUpdating = !!offlinePayment?.id;
  const bankOptions = dataToOptions(BANK_ACCOUNTS, 'bankName', 'bankName');

  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(offlinePaymentSchema, {
        amount,
        ...offlinePayment,
      })}
      onSubmit={(values, actions) => {
        const payload = {
          ...values,
          assignedProperty: info?.assignedPropertyId,
          paymentDate: values.paymentDate.date,
        };

        if (isUpdating) {
          delete payload.offerId;

          if (!receipt) {
            delete payload.receipt;
          }
        }

        Axios({
          method: isUpdating ? 'put' : 'post',
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/offline-payments`,
          data: isUpdating
            ? { data: { ...payload, id: offlinePayment.id } }
            : { data: payload },
          headers: { Authorization: getTokenFromStore() },
        })
          .then(function (response) {
            const { status } = response;
            if (statusIsSuccessful(status)) {
              toast.success(
                `Your transaction has been successfully ${
                  isUpdating ? 'updated' : 'added'
                }`
              );
              hideForm();
              // refreshQuery('payment', true);
              actions.setSubmitting(false);
              actions.resetForm();
            }
          })
          .catch(function (error) {
            toast.error(getError(error));
            actions.setSubmitting(false);
          });
      }}
      validationSchema={createSchema(offlinePaymentSchema)}
    >
      {({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <section className="row">
            <div className="px-3 col-sm-12">
              <InputFormat
                label="Amount Paid"
                name="amount"
                placeholder="Transaction Amount"
              />

              <Select
                label="Bank"
                name="bank"
                options={bankOptions}
                blankOption="Select Bank"
              />

              <DatePicker
                label="Paid on"
                name="paymentDate"
                placeholder="Paid On"
                maxDate={new Date()}
              />

              <Select
                label="Payment Type"
                name="type"
                options={valuesToOptions(['Bank Transfer', 'Bank Deposit'])}
                blankOption="Select Payment type"
              />

              <br />
              <Label name="evidence" text="Evidence" optional />
              <Upload
                changeText="Update Picture"
                defaultImage="/assets/img/placeholder/image.png"
                imgOptions={{
                  className: 'mb-3',
                  width: 200,
                  height: 200,
                }}
                name="evidence"
                uploadText={`Upload Evidence`}
                folder={'evidence'}
              />

              <Button
                className="btn-secondary mt-4"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                {isUpdating ? 'Update' : 'Verify'} Payment
              </Button>
            </div>
          </section>
          <DisplayFormikState {...props} showAll />
        </Form>
      )}
    </Formik>
  );
};

export default MakePayment;
