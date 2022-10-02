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
import Select from '@/components/forms/Select';

const pageOptions = {
  key: 'property',
};

const New = () => {
  const router = useRouter();
  const { id, action, projectId } = router.query;

  const [query, result] = useSWRQuery({
    name: id ? [pageOptions.key, id] : id,
    endpoint: `api/properties/${id}`,
  });

  return (
    <Backend role={USER_ROLES.ADMIN} title="Add New Property">
      <ProcessPropertyForm
        property={result}
        action={action}
        id={id}
        projectId={projectId}
      />
    </Backend>
  );
};

const ProcessPropertyForm = ({ action, id, property, projectId }) => {
  const testInitialValues = {
    name: '3 Bedroom Flat',
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
      status: 'Available',
      ...(!isEdit && { project: projectId }),
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
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <div className="card p-5">
      <Section title={`${currentAction} Property`} noPaddingTop>
        <PropertyForm
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          isEdit={isEdit}
        />
      </Section>
    </div>
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
          defaultImage="/assets/img/placeholder/image.png"
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
        <div className="row">
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
        </div>

        <div className="row">
          <InputFormat
            label="Size"
            name="size"
            prefix=""
            suffix="msq"
            formGroupClassName="col-sm-6"
          />
          <InputFormat
            name="beds"
            label="Beds"
            prefix=""
            formGroupClassName="col-sm-6"
          />
        </div>
        <div className="row">
          <InputFormat
            name="baths"
            label="Baths"
            prefix=""
            formGroupClassName="col-sm-6"
          />
          <InputFormat
            name="toilets"
            label="Toilets"
            prefix=""
            formGroupClassName="col-sm-6"
          />
        </div>
        <div className="row">
          <CustomSelect
            name="floors"
            label="Floors"
            options={valuesToOptions(FLOORS)}
            blankOption="Select Floors"
            isMulti
            formGroupClassName="col-sm-6"
          />
          <InputFormat
            name="parkingSpace"
            label="Parking Space"
            prefix=""
            formGroupClassName="col-sm-6"
          />
        </div>
        <InputFormat label="Price" name="price" prefix="" />
        <div className="row">
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
        </div>
        <FormikButton color="secondary">
          {isEdit ? 'Edit' : 'Save'} Property
        </FormikButton>
      </FormikForm>
    </div>
  </div>
);

export default New;
