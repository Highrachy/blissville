import { getError, statusIsSuccessful } from '@/utils/helpers';
import { getTokenFromStore } from '@/utils/localStorage';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import Button from '../forms/Button';
import FormikForm from '../forms/FormikForm';
import Upload from '../forms/Upload';
import Textarea from '@/components/forms/Textarea';
import FormikButton from '@/components/forms/FormikButton';
import DeleteButton from '@/components/utils/DeleteButton';
import { LocalImage } from '../common/Image';
import { gallerySchema } from '../forms/schemas/admin-schema';
import { TabContentHeader } from '../admin/TabContent';

const ManageGallery = ({ type, data, id, query }) => {
  const [showAddNewForm, setShowAddNewForm] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const currentAction = selectedImage?.action
    ? Humanize.capitalize(selectedImage?.action)
    : 'New';
  const title = !showAddNewForm ? 'Gallery' : `${currentAction} Gallery`;
  const buttonText = showAddNewForm ? 'View All' : 'Add New';

  const ActionButton = (
    <Button
      color={showAddNewForm ? 'danger' : 'primary'}
      className="btn-sm"
      onClick={() => {
        setSelectedImage(null);
        setShowAddNewForm(!showAddNewForm);
      }}
    >
      {buttonText} Gallery
    </Button>
  );

  return (
    <TabContentHeader
      title={title}
      actionButton={ActionButton}
      isTableContent={false}
    >
      {showAddNewForm ? (
        <ManageGalleryForm
          type={type}
          typeId={id}
          selectedImage={selectedImage}
          setShowAddNewForm={setShowAddNewForm}
          query={query}
        />
      ) : data?.length > 0 ? (
        <div className="row row-cols-2 row-cols-md-3 g-4">
          {data.map(({ id, attributes }) => (
            <SingleGallery
              key={id}
              query={query}
              id={id}
              typeToDelete={type}
              {...attributes}
              setShowAddNewForm={setShowAddNewForm}
              setSelectedImage={setSelectedImage}
            />
          ))}
        </div>
      ) : (
        <p className="text-center my-6 text-xl text-muted">No Gallery Found</p>
      )}
    </TabContentHeader>
  );
};

const ManageGalleryForm = ({
  type,
  typeId,
  setShowAddNewForm,
  query,
  selectedImage,
}) => {
  const handleSubmit = async (values, actions) => {
    const payload = values;
    const isEdit = selectedImage !== null;
    const id = selectedImage?.id;
    try {
      axios({
        method: isEdit ? 'put' : 'post',
        url: isEdit
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/${type}-galleries/${id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/${type}-galleries`,
        data: { data: { ...payload, [type]: typeId } },
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            toast.success('Gallery has been successfully updated');
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
      schema={gallerySchema}
      handleSubmit={handleSubmit}
      initialValues={selectedImage}
      name={`${type}-${typeId}-gallery`}
      showFormikState
      showAllFormikState
    >
      <div className="row">
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
          folder={type}
        />

        <Textarea label="Description" name="description" rows={3} optional />
      </div>
      <FormikButton color="secondary" className="mt-3">
        Save Image
      </FormikButton>
    </FormikForm>
  );
};

const SingleGallery = ({
  id,
  image,
  description,
  setSelectedImage,
  setShowAddNewForm,
  typeToDelete,
  query,
}) => {
  return (
    <div className="col">
      <div className="gallery-listing overflow-hidden bg-gray-50 card h-100">
        <div className="img-wrapper">
          <LocalImage
            src={image}
            name="gallery Image"
            className="card-img-top img-fluid"
          />
        </div>
        <div className="card-body p-4">
          <div className="row">
            <div className="text-gray-700 text-sm font-secondary">
              {description}
            </div>
          </div>

          <hr className="dotted-border" />

          <Button
            onClick={() => {
              setShowAddNewForm(true);
              setSelectedImage({ id, image, description });
            }}
            className="btn-xs me-2"
          >
            Edit Gallery
          </Button>
          <DeleteButton
            afterSuccess={() => query.mutate()}
            api={`${typeToDelete}-galleries/${id}`}
            buttonSizeClassName="btn-xs me-2"
          >
            Delete
          </DeleteButton>
        </div>
      </div>
    </div>
  );
};

export default ManageGallery;
