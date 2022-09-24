import React from 'react';
import Backend from '@/components/admin/Backend';
import axios from 'axios';
import Section from '@/components/common/Section';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import FormikButton from '@/components/forms/FormikButton';
import MdEditor from '@/components/forms/MdEditor';
import { projectSchema } from '@/components/forms/schemas/admin-schema';
import { getTokenFromStore } from '@/utils/localStorage';
import {
  generateNumOptions,
  getError,
  statusIsSuccessful,
  valuesToOptions,
} from '@/utils/helpers';
import { toast } from 'react-toastify';
import Router, { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import Humanize from 'humanize-plus';
import Textarea from '@/components/forms/Textarea';
import InputFormat from '@/components/forms/InputFormat';
import Select from '@/components/forms/Select';
import { STATES } from '@/utils/constants';
import CustomSelect from '@/components/forms/CustomSelect';
import DatePicker from '@/components/forms/DatePicker';

const pageOptions = {
  key: 'project',
};

const New = () => {
  const router = useRouter();
  const { id, action } = router.query;

  const [query, result] = useSWRQuery({
    name: id ? [pageOptions.key, id] : id,
    endpoint: `api/projects/${id}`,
  });

  return (
    <Backend>
      <ProcessProjectForm project={result} action={action} id={id} />
    </Backend>
  );
};

const ProcessProjectForm = ({ action, id, project }) => {
  const testInitialValues = {
    name: 'Blissville Uno',
    type: '3 Bedroom Flat',
    description: 'A maids room, 4 baths, 5 toilets',
    street1:
      'Blissville Projects, Prince Kemi Olusesi street, off Dreamwolrd Africana Way, Lekki.',
    street2: '',
    city: 'Lekki',
    state: 'Lagos',
    features: '',
    featuresStandard: '',
    featuresSupreme: '',
    paymentPlan: 6,
    startDate: '2020-01-01',
    delivery: '2025-01-01',
  };
  const currentAction = action ? Humanize.capitalize(action) : 'New';
  const initialValues = project ? project.attributes : { ...testInitialValues };
  const isEdit = currentAction === 'Edit';

  const handleSubmit = async (values, actions) => {
    const payload = {
      ...values,
      availableSoon: !!values.availableSoon,
    };

    try {
      axios({
        method: isEdit ? 'put' : 'post',
        url: isEdit
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
        data: { data: payload },
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            toast.success('Information sent successfully');
            Router.push('/admin/projects');
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
    <Section title={`${currentAction} Project`} noPaddingTop>
      <ProjectForm
        handleSubmit={handleSubmit}
        initialValues={initialValues}
        isEdit={isEdit}
      />
    </Section>
  );
};

const ProjectForm = ({ handleSubmit, initialValues, isEdit }) => (
  <div className="container">
    <div className="row">
      <div className="col-12 col-sm-11 col-lg-10 col-xl-9">
        <FormikForm
          schema={projectSchema}
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          name={`new-project-form`}
          showFormikState
          showAllFormikState
        >
          <Input label="Project Name" name="name" />
          <Input label="Type" name="type" />
          <MdEditor label="Description" name="description" height="10rem" />
          <Input label="Street 1" name="street1" />
          <Input label="Street 2" name="street2" />
          <Input label="City" name="city" />
          <Select
            formGroupClassName="col-md-6"
            name="state"
            label="State"
            options={valuesToOptions(STATES)}
            blankOption="Select State"
            optional
          />
          <CustomSelect
            name="features"
            label="Features"
            options={valuesToOptions(STATES)}
            blankOption="Select Shell features"
            isMulti
          />
          <CustomSelect
            name="featuresStandard"
            label="Standard Features"
            options={valuesToOptions(STATES)}
            blankOption="Select Standard features"
            isMulti
          />
          <CustomSelect
            name="featuresSupreme"
            label="Supreme Features"
            options={valuesToOptions(STATES)}
            blankOption="Select Supreme features"
            isMulti
          />
          <Select
            label="Payment Plan"
            name="paymentPlan"
            options={generateNumOptions(36, 'month', { startFrom: 2 })}
            blankOption="Select Payment Plan"
          />
          <DatePicker
            label="Start Date"
            name="startDate"
            placeholder="YYYY-MM-DD"
            helpText="Format: YYYY-MM-DD"
          />
          <DatePicker
            label="Delivery"
            name="delivery"
            placeholder="YYYY-MM-DD"
            helpText="Format: YYYY-MM-DD"
          />
          <FormikButton color="secondary">
            {isEdit ? 'Edit' : 'Save'} Project
          </FormikButton>
        </FormikForm>
      </div>
    </div>
  </div>
);

export default New;
