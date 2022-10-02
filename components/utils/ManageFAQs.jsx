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

const ManageFAQs = ({ data, id, query }) => {
  const [showAddNewForm, setShowAddNewForm] = React.useState(false);
  const [selectedFAQ, setSelectedFAQ] = React.useState(null);

  return (
    <div>
      <h3>
        {!showAddNewForm ? 'View All FAQ' : 'Add New FAQ'}
        <div className="text-end">
          <Button
            color={showAddNewForm ? 'danger' : 'primary'}
            className="btn-sm"
            onClick={() => {
              setSelectedFAQ(null);
              setShowAddNewForm(!showAddNewForm);
            }}
          >
            {showAddNewForm ? 'View All FAQ' : 'Add New FAQ'}
          </Button>
        </div>
      </h3>
      {showAddNewForm ? (
        <ManageFAQsForm
          projectId={id}
          selectedFAQ={selectedFAQ}
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
                  <th>Question</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
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
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <p className="text-center">No FAQ Found</p>
      )}
    </div>
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

      <FormikButton color="info" className="mt-5">
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
          className="btn-sm"
        >
          Edit FAQ
        </Button>
        <DeleteButton
          afterSuccess={() => query.mutate()}
          api={`FAQs/${id}`}
          buttonSizeClassName="btn-sm"
        >
          Delete
        </DeleteButton>
      </td>
    </tr>
  );
};

export default ManageFAQs;
