import React from 'react';
import Backend from '@/components/admin/Backend';
import axios from 'axios';
import Section from '@/components/common/Section';
import FormikForm from '@/components/forms/FormikForm';
import { propertySchema } from '@/components/forms/schemas/admin-schema';
import { getTokenFromStore } from '@/utils/localStorage';
import { getError, statusIsSuccessful, valuesToOptions } from '@/utils/helpers';
import { toast } from 'react-toastify';
import Router, { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import Humanize from 'humanize-plus';
import { USER_ROLES } from '@/utils/constants';
import { ManagePropertyForm } from '@/components/utils/ManageProperty';

const pageOptions = {
  key: 'property',
};

const New = () => {
  const router = useRouter();
  const { id, action, projectId } = router.query;

  const [query, result] = useSWRQuery({
    name: id ? [pageOptions.key, id] : id,
    endpoint: `api/properties/${id}`,
  });

  return (
    <Backend role={USER_ROLES.ADMIN} title="Add New Property">
      <ProcessPropertyForm
        property={{ id, ...result?.attributes }}
        action={action}
        projectId={projectId}
      />
    </Backend>
  );
};

const ProcessPropertyForm = ({ action, property, projectId }) => {
  console.log('property: ', property);
  const currentAction = action ? Humanize.capitalize(action) : 'New';

  return (
    <div className="card p-5">
      <Section title={`${currentAction} Property`} noPaddingTop>
        <ManagePropertyForm
          projectId={projectId}
          initialValues={property}
          currentAction={currentAction}
          afterSubmit={() =>
            Router.push(`/app/admin/properties/${property.id}`)
          }
        />
      </Section>
    </div>
  );
};

export default New;
