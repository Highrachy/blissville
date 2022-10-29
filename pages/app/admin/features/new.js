import React from 'react';
import Backend from '@/components/admin/Backend';
import axios from 'axios';
import Section from '@/components/common/Section';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import FormikButton from '@/components/forms/FormikButton';
import MdEditor from '@/components/forms/MdEditor';
import { featureSchema } from '@/components/forms/schemas/admin-schema';
import { getTokenFromStore } from '@/utils/localStorage';
import { getError, statusIsSuccessful } from '@/utils/helpers';
import { toast } from 'react-toastify';
import Router, { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import Humanize from 'humanize-plus';
import { USER_ROLES } from '@/utils/constants';
import InputFormat from '@/components/forms/InputFormat';

const pageOptions = {
  key: 'feature',
};

const New = () => {
  const router = useRouter();
  const { id, action } = router.query;

  return (
    <Backend role={USER_ROLES.ADMIN} title="Project Feature">
      <ProcessFeatureForm feature={result} action={action} id={id} />
    </Backend>
  );
};

const ProcessFeatureForm = ({ action, id, feature }) => {
  const testInitialValues = {
    price: 0,
  };

  const currentAction = action ? Humanize.capitalize(action) : 'New';
  const initialValues = feature ? feature.attributes : { ...testInitialValues };
  const isEdit = currentAction === 'Edit';

  const handleSubmit = async (values, actions) => {
    const payload = {
      ...values,
    };

    try {
      axios({
        method: isEdit ? 'put' : 'post',
        url: isEdit
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/features/${id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/features`,
        data: { data: payload },
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            toast.success('Information sent successfully');
            Router.push('/app/admin/features');
            return;
          }
        })
        .catch(function (error) {
          toast.error(getError(error));
        });

      actions.setSubmitting(false);
      actions.resetForm();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <div className="card p-5">
      <Section title={`${currentAction} Feature`} noPaddingTop>
        <FeatureForm
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          isEdit={isEdit}
        />
      </Section>
    </div>
  );
};

const FeatureForm = ({ handleSubmit, initialValues, isEdit }) => (
  <div className="row">
    <div className="col-12 col-sm-11 col-lg-10 col-xl-9">
      <FormikForm
        schema={featureSchema}
        handleSubmit={handleSubmit}
        initialValues={initialValues}
        name={`new-feature-form`}
        showFormikState
        showAllFormikState
      >
        <Input label="Feature Name" name="name" />
        <InputFormat label="Price" name="price" />
        <MdEditor
          label="Description"
          name="description"
          height="10rem"
          optional
        />
        <FormikButton color="secondary">
          {isEdit ? 'Edit' : 'Save'} Feature
        </FormikButton>
      </FormikForm>
    </div>
  </div>
);

export default New;
