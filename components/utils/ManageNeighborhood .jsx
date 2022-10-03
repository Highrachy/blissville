import { getError, statusIsSuccessful, valuesToOptions } from '@/utils/helpers';
import { getTokenFromStore } from '@/utils/localStorage';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import Button from '../forms/Button';
import FormikForm from '../forms/FormikForm';
import FormikButton from '@/components/forms/FormikButton';
import DeleteButton from '@/components/utils/DeleteButton';
import { neighborhoodSchema } from '../forms/schemas/admin-schema';
import Input from '../forms/Input';
import Select from '../forms/Select';
import Humanize from 'humanize-plus';
import InputFormat from '../forms/InputFormat';
import { TabContentHeader } from '../admin/TabContent';

const NEIGHBORHOOD_CATEGORIES = [
  'Hospitals',
  'Schools',
  'Banks',
  'Restautants and Bars',
  'Entertainments',
  'Points of Interests',
  'Shopping Malls',
  'Others',
];

const ManageNeighborhood = ({ data, id, query }) => {
  const [showAddNewForm, setShowAddNewForm] = React.useState(false);
  const [selectedNeighborhood, setSelectedNeighborhood] = React.useState(null);
  const currentAction = selectedNeighborhood?.action
    ? Humanize.capitalize(selectedNeighborhood?.action)
    : 'New';
  const title = !showAddNewForm
    ? 'Neighborhood'
    : `${currentAction} Neighborhood`;
  const buttonText = showAddNewForm ? 'View All' : 'Add New';
  const ActionButton = (
    <Button
      color={showAddNewForm ? 'danger' : 'primary'}
      className="btn-sm"
      onClick={() => {
        setSelectedNeighborhood(null);
        setShowAddNewForm(!showAddNewForm);
      }}
    >
      {buttonText} Neighborhood
    </Button>
  );
  return (
    <TabContentHeader title={title} actionButton={ActionButton}>
      {showAddNewForm ? (
        <tr>
          <td colSpan="5">
            <ManageNeighborhoodForm
              projectId={id}
              selectedNeighborhood={selectedNeighborhood}
              setShowAddNewForm={setShowAddNewForm}
              query={query}
              currentAction={currentAction}
            />
          </td>
        </tr>
      ) : data?.length > 0 ? (
        <>
          {data.map(({ id, attributes }, index) => (
            <SingleNeighborhood
              key={id}
              number={index + 1}
              query={query}
              id={id}
              {...attributes}
              setShowAddNewForm={setShowAddNewForm}
              setSelectedNeighborhood={setSelectedNeighborhood}
            />
          ))}
        </>
      ) : (
        <p className="text-center">No Neighborhood Found</p>
      )}
    </TabContentHeader>
  );
};

const ManageNeighborhoodForm = ({
  projectId,
  setShowAddNewForm,
  query,
  selectedNeighborhood,
  currentAction,
}) => {
  console.log('selectedNeighborhood: ', selectedNeighborhood);
  const handleSubmit = async (values, actions) => {
    const payload = values;
    const isEdit = currentAction === 'Edit';
    const id = selectedNeighborhood?.id;
    try {
      axios({
        method: isEdit ? 'put' : 'post',
        url: isEdit
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/neighborhoods/${id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/neighborhoods`,
        data: { data: { ...payload, project: projectId } },
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            toast.success('Neighborhood has been successfully updated');
            setShowAddNewForm(false);
            query.mutate();
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
      schema={neighborhoodSchema}
      handleSubmit={handleSubmit}
      initialValues={selectedNeighborhood}
      name={`neighborhood-${projectId}`}
      showFormikState
      showAllFormikState
    >
      <div className="row">
        <Input label="Location" name="location" />
        <div className="row">
          <Select
            name="category"
            label="Category"
            options={valuesToOptions(NEIGHBORHOOD_CATEGORIES)}
            blankOption="Select Category"
            formGroupClassName="col-md-6"
          />
          <InputFormat
            prefix=""
            suffix=" Km"
            label="Distance"
            name="distance"
            formGroupClassName="col-sm-6"
          />
        </div>
      </div>
      <FormikButton color="info" className="mt-5">
        Save Neighborhood
      </FormikButton>
    </FormikForm>
  );
};

const SingleNeighborhood = ({
  id,
  number,
  setSelectedNeighborhood,
  setShowAddNewForm,
  query,
  ...props
}) => {
  const { location, category, distance } = props;
  return (
    <tr>
      <td>{number}</td>
      <td>{location}</td>
      <td>{category}</td>
      <td>{distance}</td>
      <td>
        <Button
          onClick={() => {
            setShowAddNewForm(true);
            setSelectedNeighborhood({ id, ...props, action: 'edit' });
          }}
          className="btn-xs me-2"
        >
          Edit
        </Button>
        <DeleteButton
          afterSuccess={() => query.mutate()}
          api={`neighborhoods/${id}`}
          buttonSizeClassName="btn-xs me-2"
        >
          Delete
        </DeleteButton>
      </td>
    </tr>
  );
};

export default ManageNeighborhood;
