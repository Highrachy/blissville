import React from 'react';
import {
  getError,
  getMonthlyPayment,
  getPaymentPlan,
  moneyFormatInNaira,
  statusIsSuccessful,
} from '@/utils/helpers';
import { getTokenFromStore } from '@/utils/localStorage';
import axios from 'axios';
import { toast } from 'react-toastify';
import DatePicker from '../forms/DatePicker';
import FormikButton from '../forms/FormikButton';
import Input from '../forms/Input';
import { interestSchema } from '../forms/schemas/page-schema';
import FormikModalButton from '../utils/FormikModalButton';
import Image from 'next/image';

const BuyNowButton = ({
  className,
  price,
  paymentPlan,
  initialPayment,
  property,
}) => {
  const handleSubmit = async (values, actions) => {
    const payload = {
      ...values,
      paymentStartDate: values.paymentStartDate.date,
      price,
      paymentPlan,
      initialPayment,
      property: property.id,
    };

    try {
      axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/interests`,
        data: { data: payload },
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            toast.success('Your Interest has been successfully saved');
            actions.resetForm({ values: {} });
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
      initialValues={{}}
      size="lg"
      modalContent={
        <InterestForm
          price={price}
          paymentPlan={paymentPlan}
          initialPayment={initialPayment}
          property={property}
        />
      }
      handleSubmit={handleSubmit}
    >
      Buy Now
    </FormikModalButton>
  );
};

export default BuyNowButton;

const InterestForm = ({ price, paymentPlan, initialPayment, property }) => {
  const { image, name } = property;
  return (
    <div className="container">
      <div className="d-flex flex-wrap flex-sm-nowrap">
        <div className="">
          <div className="d-block me-3 position-relative">
            <Image
              src={image}
              alt="Hero Image"
              width={200}
              height={130}
              className="rounded"
            />
          </div>
        </div>
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-start flex-wrap">
            <div className="d-flex flex-column">
              <h5 className="mb-2">{name}</h5>
              <h4 className="mb-2 text-primary text-xl fw-bold">
                {moneyFormatInNaira(price)}
              </h4>
              <p className="text-muted mb-2">{getPaymentPlan(paymentPlan)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <ul className="list-dotted list-unstyled">
          <li>
            <span className="list-dotted__label">Initial Payment</span>
            <span className="list-dotted__value">
              {moneyFormatInNaira(initialPayment)}
            </span>
          </li>
          <li>
            <span className="list-dotted__label">Monthly Payment</span>
            <span className="list-dotted__value">
              {getMonthlyPayment(price, initialPayment, paymentPlan)}
            </span>
          </li>
          <li></li>
          {/* <li>
            <span className="list-dotted__label">Total</span>
            <span className="list-dotted__value text-xl fw-bold">
              {moneyFormatInNaira(price)}
            </span>
          </li> */}
        </ul>
      </div>
      <h4 className="mt-n4 mb-3">Interest Form</h4>
      <div className="row">
        <Input label="Title" name="title" formGroupClassName="col-sm-6" />
        <Input
          label="First Name"
          name="firstName"
          formGroupClassName="col-sm-6"
        />
      </div>
      <div className="row">
        <Input
          label="Last Name"
          name="lastName"
          formGroupClassName="col-sm-6"
        />
        <Input
          isValidMessage="Email address seems valid"
          label="Email"
          name="email"
          placeholder="Email Address"
          formGroupClassName="col-sm-6"
        />
      </div>
      <div className="row">
        <Input
          isValidMessage="Phone number looks good"
          label="Phone"
          name="phone"
          formGroupClassName="col-sm-6"
        />
        <DatePicker
          label="Payment Start Date"
          name="paymentStartDate"
          minDate={new Date()}
          placeholder="Start Date"
          formGroupClassName="col-sm-6"
        />
      </div>

      <FormikButton color="info" className="mt-5 text-white btn-wide">
        Buy Now
      </FormikButton>
    </div>
  );
};
