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
import { Card } from 'react-bootstrap';
import InputFormat from '../forms/InputFormat';

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

  return (
    <div>
      <h3>
        {!showAddNewForm ? 'View All Neighborhood' : 'Add New Neighborhood'}
        <div className="text-end">
          <Button
            color={showAddNewForm ? 'danger' : 'primary'}
            className="btn-sm"
            onClick={() => {
              setSelectedNeighborhood(null);
              setShowAddNewForm(!showAddNewForm);
            }}
          >
            {showAddNewForm ? 'View All Neighborhood' : 'Add New Neighborhood'}
          </Button>
        </div>
      </h3>
      {showAddNewForm ? (
        <ManageNeighborhoodForm
          projectId={id}
          selectedNeighborhood={selectedNeighborhood}
          setShowAddNewForm={setShowAddNewForm}
          query={query}
        />
      ) : data?.length > 0 ? (
        <Card className="mt-2">
          <div className="table-responsive">
            <table className="table table-border table-hover">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
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
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <p className="text-center">No Neighborhood Found</p>
      )}
    </div>
  );
};

const ManageNeighborhoodForm = ({
  projectId,
  setShowAddNewForm,
  query,
  selectedNeighborhood,
}) => {
  const handleSubmit = async (values, actions) => {
    const payload = values;
    const isEdit = selectedNeighborhood !== null;
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
            setSelectedNeighborhood({ id, ...props });
          }}
          className="btn-sm"
        >
          Edit Neighborhood
        </Button>
        <DeleteButton
          afterSuccess={() => query.mutate()}
          api={`neighborhoods/${id}`}
          buttonSizeClassName="btn-sm"
        >
          Delete
        </DeleteButton>
      </td>
    </tr>
  );
};

export default ManageNeighborhood;
