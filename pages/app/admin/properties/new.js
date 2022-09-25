import React from 'react';
import Backend from '@/components/admin/Backend';
import axios from 'axios';
import Section from '@/components/common/Section';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import FormikButton from '@/components/forms/FormikButton';
import MdEditor from '@/components/forms/MdEditor';
import { propertySchema } from '@/components/forms/schemas/admin-schema';
import { getTokenFromStore } from '@/utils/localStorage';
import { getError, statusIsSuccessful, valuesToOptions } from '@/utils/helpers';
import { toast } from 'react-toastify';
import Router, { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import Humanize from 'humanize-plus';
import { FLOORS, STATES, USER_ROLES } from '@/utils/constants';
import CustomSelect from '@/components/forms/CustomSelect';
import InputFormat from '@/components/forms/InputFormat';
import Upload from '@/components/forms/Upload';

const pageOptions = {
  key: 'property',
};

const New = () => {
  const router = useRouter();
  const { id, action } = router.query;

  const [query, result] = useSWRQuery({
    name: id ? [pageOptions.key, id] : id,
    endpoint: `api/properties/${id}`,
  });

  return (
    <Backend role={USER_ROLES.ADMIN} title="Add New Property">
      <ProcessPropertyForm property={result} action={action} id={id} />
    </Backend>
  );
};

const ProcessPropertyForm = ({ action, id, property }) => {
  const testInitialValues = {
    name: 'Blissville Uno',
    type: '3 Bedroom Flat',
    description: 'A maids room, 4 baths, 5 toilets',
    size: 255,
    totalUnits: 4,
    availableUnits: 3,
    baths: 3,
    beds: 3,
    toilets: 3,
    floors: 'Ground Floor, 1st Floor',
    parkingSpace: 2,
    price: 5000000,
    standardPrice: 15000000,
    supremePrice: 15000000,
    status: 'Available',
  };
  const currentAction = action ? Humanize.capitalize(action) : 'New';
  const initialValues = property
    ? property.attributes
    : { ...testInitialValues };
  const isEdit = currentAction === 'Edit';

  const handleSubmit = async (values, actions) => {
    const payload = {
      ...values,
      floors: Array.isArray(values.features)
        ? values.floors?.join(',')
        : 'Ground Floor',
    };

    try {
      axios({
        method: isEdit ? 'put' : 'post',
        url: isEdit
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/properties`,
        data: { data: payload },
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            toast.success('Information sent successfully');
            Router.push('/app/admin/properties');
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
    <Section title={`${currentAction} Property`} noPaddingTop>
      <PropertyForm
        handleSubmit={handleSubmit}
        initialValues={initialValues}
        isEdit={isEdit}
      />
    </Section>
  );
};

const PropertyForm = ({ handleSubmit, initialValues, isEdit }) => (
  <div className="row">
    <div className="col-12 col-sm-11 col-lg-10 col-xl-9">
      <FormikForm
        schema={propertySchema}
        handleSubmit={handleSubmit}
        initialValues={initialValues}
        name={`new-property-form`}
        showFormikState
        showAllFormikState
      >
        <Input label="Property Name" name="name" />
        <Input label="Type" name="type" />
        <Upload
          label="Upload your image"
          changeText="Update Picture"
          imgOptions={{
            className: 'mb-3 icon-md',
            width: 200,
            height: 300,
          }}
          name="image"
          uploadText={'Upload Picture'}
          folder={'property'}
        />
        <MdEditor label="Description" name="description" height="10rem" />
        <InputFormat
          label="Size"
          name="size"
          prefix=""
          formGroupClassName="col-sm-6"
        />
        <InputFormat
          label="Total Units"
          name="totalUnits"
          prefix=""
          formGroupClassName="col-sm-6"
        />
        <InputFormat
          label="Available Units"
          name="availableUnits"
          prefix=""
          formGroupClassName="col-sm-6"
        />
        <InputFormat
          name="baths"
          label="Baths"
          prefix=""
          formGroupClassName="col-sm-6"
        />
        <InputFormat
          name="beds"
          label="Beds"
          prefix=""
          formGroupClassName="col-sm-6"
        />
        <InputFormat
          name="toilets"
          label="Toilets"
          prefix=""
          formGroupClassName="col-sm-6"
        />
        <CustomSelect
          name="floors"
          label="Floors"
          options={valuesToOptions(FLOORS)}
          blankOption="Select Floors"
          isMulti
        />
        <InputFormat
          name="parkingSpace"
          label="Parking Space"
          prefix=""
          formGroupClassName="col-sm-6"
        />
        <InputFormat
          label="Price"
          name="price"
          prefix=""
          formGroupClassName="col-sm-6"
        />
        <InputFormat
          label="Standard Price"
          name="standardPrice"
          prefix=""
          formGroupClassName="col-sm-6"
        />
        <InputFormat
          label="Supreme Price"
          name="supremePrice"
          prefix=""
          formGroupClassName="col-sm-6"
        />
        <FormikButton color="secondary">
          {isEdit ? 'Edit' : 'Save'} Property
        </FormikButton>
      </FormikForm>
    </div>
  </div>
);

export default New;
