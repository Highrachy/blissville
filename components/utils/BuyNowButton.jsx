import React, { useContext } from 'react';
import {
  getError,
  getMonthlyPayment,
  getPaymentPlan,
  moneyFormatInNaira,
  statusIsSuccessful,
} from '@/utils/helpers';
import { getReferralFromStore, getTokenFromStore } from '@/utils/localStorage';
import axios from 'axios';
import { toast } from 'react-toastify';
import DatePicker from '../forms/DatePicker';
import FormikButton from '../forms/FormikButton';
import Input from '../forms/Input';
import { interestSchema } from '../forms/schemas/page-schema';
import FormikModalButton from '../utils/FormikModalButton';
import Image from 'next/image';
import { UserContext } from 'context/user';
import Button from '../forms/Button';

const BuyNowButton = ({
  className,
  price,
  paymentPlan,
  initialPayment,
  property,
  packageName,
  children,
}) => {
  const { user } = useContext(UserContext);
  const referredBy = getReferralFromStore();
  const handleSubmit = async (values, actions) => {
    const payload = {
      ...values,
      paymentStartDate: values.paymentStartDate.date,
      price,
      paymentPlan,
      initialPayment,
      property: property.id,
      package: packageName,
      referredBy: referredBy?.id,
    };

    try {
      axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/interests`,
        data: { data: payload },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            toast.success('Your Interest has been successfully saved');
            actions.resetForm({});
            actions.setSubmitting(false);
            return true;
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
    <FormikModalButton
      color="success"
      className={`btn text-white ${className}`}
      name="schedule-visit"
      schema={interestSchema}
      initialValues={{ ...user }}
      size="md"
      modalContent={
        <InterestForm
          price={price}
          paymentPlan={paymentPlan}
          initialPayment={initialPayment}
          property={property}
          packageName={packageName}
          user={user}
        />
      }
      handleSubmit={handleSubmit}
    >
      {children || 'Buy Now'}
    </FormikModalButton>
  );
};

export default BuyNowButton;

const InterestForm = ({
  price,
  paymentPlan,
  initialPayment,
  property,
  packageName,
  user,
}) => {
  const { image, name } = property;
  const [showForm, setShowForm] = React.useState(false);
  const monthlyPayment = getMonthlyPayment(price, paymentPlan, initialPayment);

  return (
    <div className="container">
      <div className="row">
        <div className="text-center">
          <Image
            src={image}
            alt="Hero Image"
            width={200}
            height={130}
            className="rounded"
          />
          <h5>{name}</h5>
          <p className="mb-3 mt-n2 text-sm text-muted">
            {packageName} ({getPaymentPlan(paymentPlan)})
          </p>
        </div>
        <div className="table-responsive">
          <table className="table table-border">
            <thead>
              <tr>
                <th>Price</th>
                <th className="text-primary text-xl fw-bold">
                  {moneyFormatInNaira(price)}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Initial Payment</td>
                <td>{moneyFormatInNaira(initialPayment)}</td>
              </tr>
              {monthlyPayment <= 1 && (
                <tr>
                  <td>Monthly Payment</td>
                  <td>{monthlyPayment}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {!showForm && (
        <div className="mt-5 text-center">
          <Button
            color="secondary"
            className="btn-wide"
            onClick={() => setShowForm(true)}
          >
            Proceed
          </Button>
        </div>
      )}
      {showForm && (
        <>
          <p className="fw-bold mt-5 mb-3">
            Fill the form below to confirm your interest
          </p>
          <div className="row">
            <Input label="First Name" name="firstName" />
            <Input label="Last Name" name="lastName" />
          </div>
          <div className="row">
            <Input
              isValidMessage="Email address seems valid"
              label="Email"
              name="email"
              placeholder="Email Address"
              disabled={!!user?.email}
              helpText={
                user?.email ? 'We use this to keep track of your interest' : ''
              }
            />
            <Input
              isValidMessage="Phone number looks good"
              label="Phone"
              name="phone"
            />
          </div>
          <div className="row">
            <DatePicker
              label="Proposed Payment Start Date"
              name="paymentStartDate"
              minDate={new Date()}
              placeholder="Start Date"
            />
          </div>
          <FormikButton color="success" className="mt-3 text-white btn-wide">
            Submit
          </FormikButton>
        </>
      )}
    </div>
  );
};
