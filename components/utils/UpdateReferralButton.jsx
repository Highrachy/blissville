import React from 'react';
import FormikButton from '../forms/FormikButton';
import Input from '../forms/Input';
import FormikModalButton from './FormikModalButton';
import axios from 'axios';
import { toast } from 'react-toastify';
import { referralPercentageSchema } from '@/components/forms/schemas/admin-schema';
import { getError, statusIsSuccessful } from '@/utils/helpers';
import { getTokenFromStore } from '@/utils/localStorage';

const UpdateReferralButton = ({ id, result, query, table = 'users' }) => {
  const handleSubmit = async (values, actions) => {
    const payload =
      table === 'users'
        ? {
            ...values,
          }
        : { data: { ...values } };
    try {
      axios({
        method: 'put',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/${table}/${id}`,
        data: { ...payload },
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            toast.success(
              'Referral Percentage has been successfully scheduled'
            );
            query.mutate();
            actions.resetForm({});
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
  const referralPercentage = result?.referralPercentage || 2.5;
  return (
    <>
      {referralPercentage}% &nbsp;{' '}
      <FormikModalButton
        modalTitle="Update Referral Percentage"
        color="info"
        className="btn text-white btn-xs"
        name="user-referral-bonus"
        schema={referralPercentageSchema}
        initialValues={{ referralPercentage }}
        modalContent={
          <>
            <Input name="referralPercentage" label="Referral Percentage" />
            <FormikButton color="secondary" className="mt-3">
              Update Referral Percentage
            </FormikButton>
          </>
        }
        handleSubmit={handleSubmit}
      >
        Update
      </FormikModalButton>
    </>
  );
};

export default UpdateReferralButton;
