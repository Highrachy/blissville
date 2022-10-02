import { getError, statusIsSuccessful, valuesToOptions } from '@/utils/helpers';
import { getTokenFromStore } from '@/utils/localStorage';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import Button from '../forms/Button';
import FormikForm from '../forms/FormikForm';
import FormikButton from '@/components/forms/FormikButton';
import DeleteButton from '@/components/utils/DeleteButton';
import { floorPlanSchema } from '../forms/schemas/admin-schema';
import Input from '../forms/Input';
import Upload from '../forms/Upload';
import { LocalImage } from '../common/Image';

const ManageFloorPlan = ({ data, id, query }) => {
  const [showAddNewForm, setShowAddNewForm] = React.useState(false);
  const [selectedFloorPlan, setSelectedFloorPlan] = React.useState(null);

  return (
    <div>
      <h3>
        {!showAddNewForm ? 'View All Floor Plan' : 'Add New Floor Plan'}
        <div className="text-end">
          <Button
            color={showAddNewForm ? 'danger' : 'primary'}
            className="btn-sm"
            onClick={() => {
              setSelectedFloorPlan(null);
              setShowAddNewForm(!showAddNewForm);
            }}
          >
            {showAddNewForm ? 'View All Floor Plans' : 'Add New Floor Plan'}
          </Button>
        </div>
      </h3>
      {showAddNewForm ? (
        <ManageFloorPlanForm
          propertyId={id}
          selectedFloorPlan={selectedFloorPlan}
          setShowAddNewForm={setShowAddNewForm}
          query={query}
        />
      ) : data.length > 0 ? (
        <div className="row row-cols-2 row-cols-md-3 g-4">
          {data.map(({ id, attributes }) => (
            <SingleFloorPlan
              key={id}
              query={query}
              id={id}
              {...attributes}
              setShowAddNewForm={setShowAddNewForm}
              setSelectedFloorPlan={setSelectedFloorPlan}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">No Floor Plan Found</p>
      )}
    </div>
  );
};

const ManageFloorPlanForm = ({
  propertyId,
  setShowAddNewForm,
  query,
  selectedFloorPlan,
}) => {
  const handleSubmit = async (values, actions) => {
    const payload = values;
    const isEdit = selectedFloorPlan !== null;
    const id = selectedFloorPlan?.id;
    try {
      axios({
        method: isEdit ? 'put' : 'post',
        url: isEdit
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/floor-plans/${id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/floor-plans`,
        data: { data: { ...payload, property: propertyId } },
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            toast.success('Floor Plan has been successfully updated');
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
      schema={floorPlanSchema}
      handleSubmit={handleSubmit}
      initialValues={selectedFloorPlan}
      name={`floorplan-${propertyId}`}
      showFormikState
      showAllFormikState
    >
      <div className="row">
        <Input label="Title" name="title" />
        <Upload
          label="Upload your image"
          changeText="Update Picture"
          defaultImage="/assets/img/placeholder/image.png"
          imgOptions={{
            className: 'mb-3 icon-md',
            width: 200,
            height: 300,
          }}
          name="image"
          uploadText={`Upload Picture`}
          folder={'floor-plans'}
        />
      </div>
      <FormikButton color="info" className="mt-5">
        Save Floor Plan
      </FormikButton>
    </FormikForm>
  );
};

const SingleFloorPlan = ({
  id,
  number,
  setSelectedFloorPlan,
  setShowAddNewForm,
  query,
  ...props
}) => {
  const { title, image } = props;
  return (
    <div className="col">
      <div className="gallery-listing overflow-hidden bg-gray-50 card h-100">
        <div className="img-wrapper">
          <LocalImage
            src={image}
            name="floor plan Image"
            className="card-img-top img-fluid"
          />
        </div>
        <div className="card-body p-4">
          <div className="row">
            <div className="text-gray-700 text-sm font-secondary">{title}</div>
          </div>

          <hr className="dotted-border" />

          <Button
            onClick={() => {
              setShowAddNewForm(true);
              setSelectedFloorPlan({ id, ...props });
            }}
            className="mt-md-5 mt-4 btn-sm px-4 py-2 text-white text-sm fw-medium"
          >
            Edit Floor Plan
          </Button>
          <DeleteButton
            afterSuccess={() => query.mutate()}
            api={`floor-plans/${id}`}
            buttonSizeClassName="btn-sm"
          >
            Delete
          </DeleteButton>
        </div>
      </div>
    </div>
  );
};

export default ManageFloorPlan;
