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
import Select from '@/components/forms/Select';
import { STATES, USER_ROLES } from '@/utils/constants';
import CustomSelect from '@/components/forms/CustomSelect';
import DatePicker from '@/components/forms/DatePicker';
import Upload from '@/components/forms/Upload';

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
    <Backend role={USER_ROLES.ADMIN} title="Manage Projects">
      <ProcessProjectForm project={result} action={action} id={id} />
    </Backend>
  );
};

const ProcessProjectForm = ({ action, id, project }) => {
  const testInitialValues = {
    name: 'Blissville Uno',
  };
  const [query, allFeatures] = useSWRQuery({
    name: 'allFeatures',
    endpoint: `api/features`,
    axiosOptions: {
      params: {
        sort: 'name',
      },
    },
  });

  const featuresArray = allFeatures?.map((feature) => feature.attributes.name);

  const currentAction = action ? Humanize.capitalize(action) : 'New';
  const initialValues = project ? project.attributes : { ...testInitialValues };
  const isEdit = currentAction === 'Edit';

  const handleSubmit = async (values, actions) => {
    const payload = {
      ...values,
      features: Array.isArray(values.features)
        ? values.features?.join(', ')
        : values.features,
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
            Router.push('/app/admin/projects');
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
    <div className="card p-5">
      <Section title={`${currentAction} Project`} noPaddingTop>
        <ProjectForm
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          isEdit={isEdit}
          featuresArray={featuresArray}
        />
      </Section>
    </div>
  );
};

const ProjectForm = ({
  handleSubmit,
  initialValues,
  isEdit,
  featuresArray,
}) => (
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
          folder={`projects`}
          maxFileSize={1_024 * 2_050}
        />
        <MdEditor label="Description" name="description" height="10rem" />
        <Input label="Street 1" name="street1" />
        <Input label="Street 2" name="street2" />
        <div className="row">
          <Input label="City" name="city" formGroupClassName="col-md-6" />
          <Select
            formGroupClassName="col-md-6"
            name="state"
            label="State"
            options={valuesToOptions(STATES)}
            blankOption="Select State"
            optional
          />
        </div>
        <CustomSelect
          name="features"
          label="Features"
          options={valuesToOptions(featuresArray)}
          blankOption="Select Shell features"
          isMulti
        />
        <Select
          label="Payment Plan"
          name="paymentPlan"
          options={generateNumOptions(36, 'month', { startFrom: 2 })}
          blankOption="Select Payment Plan"
        />
        <div className="row">
          <DatePicker
            formGroupClassName="col-md-6"
            label="Start Date"
            name="startDate"
            placeholder="YYYY-MM-DD"
            helpText="Format: YYYY-MM-DD"
          />
          <DatePicker
            formGroupClassName="col-md-6"
            label="Delivery"
            name="delivery"
            placeholder="YYYY-MM-DD"
            helpText="Format: YYYY-MM-DD"
          />
        </div>
        <FormikButton color="secondary">
          {isEdit ? 'Edit' : 'Save'} Project
        </FormikButton>
      </FormikForm>
    </div>
  </div>
);

export default New;

if (content?.link) {
  return (
    <a
      href={content.link}
      target="_blank"
      rel="noopener noreferrer"
      className="d-block"
    >
      <img src={content.image} alt={content.title} />
    </a>
  );
} else {
  return (
    <div className="d-block">
      <img src={content.image} alt={content.title} />
    </div>
  );
}
