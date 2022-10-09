import { getError, statusIsSuccessful, valuesToOptions } from '@/utils/helpers';
import { getTokenFromStore } from '@/utils/localStorage';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import Button from '../forms/Button';
import FormikForm from '../forms/FormikForm';
import FormikButton from '@/components/forms/FormikButton';
import DeleteButton from '@/components/utils/DeleteButton';
import { faqSchema } from '../forms/schemas/admin-schema';
import Input from '../forms/Input';
import MdEditor from '../forms/MdEditor';
import { Card } from 'react-bootstrap';
import { TabContentHeader } from '../admin/TabContent';

const ManageFAQs = ({ data, id, query }) => {
  const [showAddNewForm, setShowAddNewForm] = React.useState(false);
  const [selectedFAQ, setSelectedFAQ] = React.useState(null);

  const currentAction = selectedFAQ?.action
    ? Humanize.capitalize(selectedFAQ?.action)
    : 'New';
  const title = !showAddNewForm ? 'All FAQs' : `${currentAction} FAQ`;
  const buttonText = showAddNewForm ? 'View All' : 'Add New';
  const ActionButton = (
    <Button
      color={showAddNewForm ? 'danger' : 'primary'}
      className="btn-sm"
      onClick={() => {
        setSelectedFAQ(null);
        setShowAddNewForm(!showAddNewForm);
      }}
    >
      {buttonText} FAQ
    </Button>
  );

  return (
    <TabContentHeader title={title} actionButton={ActionButton}>
      {showAddNewForm ? (
        <tr>
          <td colSpan="5">
            <ManageFAQsForm
              projectId={id}
              selectedFAQ={selectedFAQ}
              setShowAddNewForm={setShowAddNewForm}
              query={query}
            />
          </td>
        </tr>
      ) : data?.length > 0 ? (
        <>
          {data.map(({ id, attributes }, index) => (
            <SingleFAQ
              key={id}
              number={index + 1}
              query={query}
              id={id}
              {...attributes}
              setShowAddNewForm={setShowAddNewForm}
              setSelectedFAQ={setSelectedFAQ}
            />
          ))}
        </>
      ) : (
        <p className="text-center my-6 text-xl text-muted">No FAQ Found</p>
      )}
    </TabContentHeader>
  );
};

const ManageFAQsForm = ({
  projectId,
  setShowAddNewForm,
  query,
  selectedFAQ,
}) => {
  const handleSubmit = async (values, actions) => {
    const payload = values;
    const isEdit = selectedFAQ !== null;
    const id = selectedFAQ?.id;
    try {
      axios({
        method: isEdit ? 'put' : 'post',
        url: isEdit
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/faqs/${id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/faqs`,
        data: { data: { ...payload, project: projectId } },
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            toast.success('FAQ has been successfully updated');
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
      schema={faqSchema}
      handleSubmit={handleSubmit}
      initialValues={selectedFAQ}
      name={`FAQ-${projectId}`}
      showFormikState
      showAllFormikState
    >
      <Input name="question" label="Question" />
      <MdEditor label="Answer" name="answer" height="10rem" />

      <FormikButton color="secondary" className="mt-3">
        Save FAQ
      </FormikButton>
    </FormikForm>
  );
};

const SingleFAQ = ({
  id,
  number,
  setSelectedFAQ,
  setShowAddNewForm,
  query,
  ...props
}) => {
  const { question, answer } = props;
  return (
    <tr>
      <td>{number}</td>
      <td className="small">
        <span>{question}</span>
        <br />
        <span className="text-muted">{answer}</span>
      </td>

      <td>
        <Button
          onClick={() => {
            setShowAddNewForm(true);
            setSelectedFAQ({ id, ...props });
          }}
          className="btn-xs me-2"
        >
          Edit FAQ
        </Button>
        <DeleteButton
          afterSuccess={() => query.mutate()}
          api={`FAQs/${id}`}
          buttonSizeClassName="btn-xs me-2"
        >
          Delete
        </DeleteButton>
      </td>
    </tr>
  );
};

export default ManageFAQs;
