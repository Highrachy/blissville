import {
  generateNumOptions,
  getError,
  moneyFormatInNaira,
  statusIsSuccessful,
  valuesToOptions,
} from '@/utils/helpers';
import { getTokenFromStore } from '@/utils/localStorage';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import Button from '../forms/Button';
import FormikForm from '../forms/FormikForm';
import FormikButton from '@/components/forms/FormikButton';
import DeleteButton from '@/components/utils/DeleteButton';
import { propertySchema } from '../forms/schemas/admin-schema';
import Input from '../forms/Input';
import InputFormat from '../forms/InputFormat';
import CustomSelect from '../forms/CustomSelect';
import Upload from '../forms/Upload';
import MdEditor from '../forms/MdEditor';
import { FLOORS } from '@/utils/constants';
import { LocalImage } from '../common/Image';
import Humanize from 'humanize-plus';
import { TabContentHeader } from '../admin/TabContent';
import Select from '../forms/Select';

const ManageProperty = ({ data, id, query, project }) => {
  const [showAddNewForm, setShowAddNewForm] = React.useState(false);
  const [selectedProperty, setSelectedProperty] = React.useState(null);
  const currentAction = selectedProperty?.action
    ? Humanize.capitalize(selectedProperty?.action)
    : 'New';
  const title = !showAddNewForm
    ? 'All Properties'
    : `${currentAction} Property`;
  const buttonText = showAddNewForm ? 'View All' : 'Add New';
  const ActionButton = (
    <Button
      color={showAddNewForm ? 'danger' : 'primary'}
      className="btn-sm"
      onClick={() => {
        setSelectedProperty(null);
        setShowAddNewForm(!showAddNewForm);
      }}
    >
      {buttonText} Property
    </Button>
  );
  return (
    <TabContentHeader title={title} actionButton={ActionButton}>
      {showAddNewForm ? (
        <tr>
          <td colSpan="5">
            <ManagePropertyForm
              projectId={id}
              initialValues={selectedProperty}
              afterSubmit={() => {
                setShowAddNewForm(false);
                query.mutate();
              }}
              currentAction={currentAction}
              project={project}
            />
          </td>
        </tr>
      ) : data?.length > 0 ? (
        <>
          {data.map(({ id, attributes }, index) => (
            <SingleProperty
              key={id}
              number={index + 1}
              query={query}
              id={id}
              {...attributes}
              setShowAddNewForm={setShowAddNewForm}
              setSelectedProperty={setSelectedProperty}
            />
          ))}
        </>
      ) : (
        <p className="text-center my-6 text-xl text-muted">No Property Found</p>
      )}
    </TabContentHeader>
  );
};

export const ManagePropertyForm = ({
  projectId,
  initialValues,
  currentAction,
  afterSubmit,
  project,
}) => {
  const isEdit = currentAction === 'Edit';
  const paymentPlan = project?.paymentPlan / 6 || 12;

  const handleSubmit = async (values, actions) => {
    const payload = {
      ...values,
      floors: Array.isArray(values.floors)
        ? values.floors?.join(',')
        : 'Ground Floor',
      ...(!isEdit && { project: projectId }),
    };

    const id = initialValues?.id;
    try {
      axios({
        method: isEdit ? 'put' : 'post',
        url: isEdit
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/properties`,
        data: { data: { ...payload, project: projectId } },
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            toast.success('Property has been successfully updated');
            afterSubmit();
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
    <FormikForm
      schema={propertySchema}
      handleSubmit={handleSubmit}
      initialValues={initialValues}
      name={`property-${projectId}`}
      showFormikState
      showAllFormikState
    >
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <PropertyFormFields isEdit={isEdit} paymentPlan={paymentPlan} />
          </div>
        </div>
      </div>
    </FormikForm>
  );
};

const PropertyFormFields = ({ isEdit, paymentPlan }) => (
  <>
    <Input label="Property Name" name="name" />
    <Input label="Type" name="type" />
    <Upload
      label="Upload your image"
      defaultImage="/assets/img/placeholder/image.png"
      changeText="Update Picture"
      imgOptions={{
        className: 'mb-3 img-xxl',
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
    <Select
      label="Payment Plan"
      name="paymentPlan"
      options={generateNumOptions(paymentPlan + 1, 'month', {
        startFrom: 0,
        firstOptionText: 'Outright Payment',
        step: 6,
      })}
      blankOption="Select Payment Plan"
    />
    <div className="row">
      <InputFormat
        label="Payment Plan Increment per Month"
        name="paymentPlanIncrement"
        prefix=""
        formGroupClassName="col-sm-6"
      />
      <InputFormat
        label="Initial Payment (Shell)"
        name="initialPayment"
        prefix=""
        formGroupClassName="col-sm-6"
      />
    </div>
    <div className="row">
      <InputFormat
        label="Initial Payment (Standard)"
        name="standardInitialPayment"
        prefix=""
        formGroupClassName="col-sm-6"
      />
      <InputFormat
        label="Initial Payment (Supreme)"
        name="supremeInitialPayment"
        prefix=""
        formGroupClassName="col-sm-6"
      />
    </div>
    <FormikButton color="secondary">
      {isEdit ? 'Edit' : 'Save'} Property
    </FormikButton>
  </>
);

const SingleProperty = ({
  id,
  number,
  setSelectedProperty,
  setShowAddNewForm,
  query,
  ...props
}) => {
  const { name, price, image, type } = props;
  return (
    <tr>
      <td>{number}</td>
      <td>
        <LocalImage
          src={image}
          name={`${name}-${number}`}
          className="img-md2 me-2"
          rounded
        />
        {name}
      </td>
      <td>{moneyFormatInNaira(price)}</td>
      <td>
        <Button
          color="none"
          href={{
            pathname: '/app/admin/properties/[id]',
            query: { id },
          }}
          className="btn-xs btn-none text-success mx-1"
        >
          Manage
        </Button>
        <Button
          color="none"
          onClick={() => {
            setShowAddNewForm(true);
            setSelectedProperty({ id, ...props, action: 'edit' });
          }}
          className="btn-xs btn-none text-warning mx-1"
        >
          Edit
        </Button>
        <Button
          color="none"
          onClick={() => {
            setShowAddNewForm(true);
            setSelectedProperty({ id, ...props, action: 'duplicate' });
          }}
          className="btn-xs btn-none text-info mx-1"
        >
          Duplicate
        </Button>
        <DeleteButton
          buttonColor="none"
          afterSuccess={() => query.mutate()}
          api={`properties/${id}`}
          buttonSizeClassName="btn-xs btn-none text-danger mx-1"
        >
          Delete
        </DeleteButton>
      </td>
    </tr>
  );
};

export default ManageProperty;
