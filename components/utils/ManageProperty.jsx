import { getError, statusIsSuccessful, valuesToOptions } from '@/utils/helpers';
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

const ManageProperty = ({ data, id, query }) => {
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
        <p className="text-center">No Property Found</p>
      )}
    </TabContentHeader>
  );
};

export const ManagePropertyForm = ({
  projectId,
  initialValues,
  currentAction,
  afterSubmit,
}) => {
  const isEdit = currentAction === 'Edit';

  const handleSubmit = async (values, actions) => {
    const payload = {
      ...values,
      floors: Array.isArray(values.features)
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
      <PropertyFormFields isEdit={isEdit} />
    </FormikForm>
  );
};

const PropertyFormFields = ({ isEdit }) => (
  <>
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
      <td>{price}</td>
      <td>
        <Button
          href={{
            pathname: '/app/admin/properties/[id]',
            query: { id },
          }}
          className="btn-xs mx-1"
          color="dark"
        >
          Manage
        </Button>
        <Button
          onClick={() => {
            setShowAddNewForm(true);
            setSelectedProperty({ id, ...props, action: 'edit' });
          }}
          className="btn-xs mx-1"
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            setShowAddNewForm(true);
            setSelectedProperty({ id, ...props, action: 'duplicate' });
          }}
          className="btn-xs mx-1"
          color="info"
        >
          Duplicate
        </Button>
        <DeleteButton
          afterSuccess={() => query.mutate()}
          api={`properties/${id}`}
          buttonSizeClassName="btn-xs mx-1"
        >
          Delete
        </DeleteButton>
      </td>
    </tr>
  );
};

export default ManageProperty;
