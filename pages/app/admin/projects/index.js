import React from 'react';
import Backend from '@/components/admin/Backend';
import axios from 'axios';
import Section from '@/components/common/Section';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import FormikButton from '@/components/forms/FormikButton';
import MdEditor from '@/components/forms/MdEditor';
import Switch from '@/components/forms/Switch';
import { getTokenFromStore } from '@/utils/localStorage';
import { getError, statusIsSuccessful } from '@/utils/helpers';
import { toast } from 'react-toastify';
import Router, { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import Humanize from 'humanize-plus';
import Textarea from '@/components/forms/Textarea';
import InputFormat from '@/components/forms/InputFormat';

const pageOptions = {
  key: 'apartment',
};

const New = () => {
  const router = useRouter();
  const { id, action } = router.query;

  const [query, result] = useSWRQuery({
    name: id ? [pageOptions.key, id] : id,
    endpoint: `api/apartments/${id}`,
  });

  return (
    <Backend>
      <ProcessApartmentForm apartment={result} action={action} id={id} />
    </Backend>
  );
};

const ProcessApartmentForm = ({ action, id, apartment }) => {
  const testInitialValues = {
    name: 'Blissville Uno',
    type: '3 Bedroom Flat',
    location: 'Lekki',
    description: 'A maids room, 4 baths, 5 toilets',
    address:
      'Blissville Apartments, Prince Kemi Olusesi street, off Dreamwolrd Africana Way, Lekki.',
    totalUnits: 1,
    availableUnits: 1,
    baths: 3,
    beds: 3,
    toilets: 3,
    availableSoon: true,
  };
  const currentAction = action ? Humanize.capitalize(action) : 'New';
  const initialValues = apartment
    ? apartment.attributes
    : { ...testInitialValues };
  const isEdit = currentAction === 'Edit';

  const handleSubmit = async (values, actions) => {
    const payload = {
      ...values,
      availableSoon: !!values.availableSoon,
    };

    try {
      axios({
        method: isEdit ? 'put' : 'post',
        url: isEdit
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/apartments/${id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/apartments`,
        data: { data: payload },
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            toast.success('Information sent successfully');
            Router.push('/admin/apartments');
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
    <Section title={`${currentAction} Apartment`} noPaddingTop>
      <ApartmentForm
        handleSubmit={handleSubmit}
        initialValues={initialValues}
        isEdit={isEdit}
      />
    </Section>
  );
};

const ApartmentForm = ({ handleSubmit, initialValues, isEdit }) => (
  <div className="container">
    <div className="row">
      <div className="col-12 col-sm-11 col-lg-10 col-xl-9">
        <FormikForm
          schema={{}}
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          name={`new-apartment-form`}
          showFormikState
          showAllFormikState
        >
          <Input label="Apartment Name" name="name" />
          <Input label="Type" name="type" />
          <Textarea label="Address" name="address" />
          <MdEditor label="Description" name="description" height="10rem" />
          <div className="row">
            <InputFormat
              label="Total Units"
              name="totalUnits"
              formGroupClassName="col-sm-6"
              prefix=""
            />
            <InputFormat
              label="Available Units"
              name="availableUnits"
              formGroupClassName="col-sm-6"
              prefix=""
            />
          </div>
          <div className="row">
            <InputFormat
              label="Baths"
              name="baths"
              formGroupClassName="col-sm-4"
              prefix=""
            />
            <InputFormat
              label="Beds"
              name="beds"
              formGroupClassName="col-sm-4"
              prefix=""
            />
            <InputFormat
              label="Toilets"
              name="toilets"
              formGroupClassName="col-sm-4"
              prefix=""
            />
          </div>
          <Switch
            formGroupClassName="col-md-6"
            label="Available Soon"
            name="availableSoon"
            optional
          />

          <FormikButton color="secondary">
            {isEdit ? 'Edit' : 'Save'} Apartment
          </FormikButton>
        </FormikForm>
      </div>
    </div>
  </div>
);

export default New;
