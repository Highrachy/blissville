import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/admin/sideMenu';
import Button from '@/components/forms/Button';
import { filterVisitations } from '@/utils/filters';
import {
  USER_ROLES,
  VISITATION_STATUS,
  VISITATION_STATUS_NAME,
} from '@/utils/constants';
import { getShortDate } from '@/utils/date-helpers';
import { Calendar } from 'iconsax-react';
import FormikModalButton from '@/components/utils/FormikModalButton';
import FormikButton from '@/components/forms/FormikButton';
import DatePicker from '@/components/forms/DatePicker';
import { rescheduleVisitationSchema } from '@/components/forms/schemas/page-schema';
import Modal from '@/components/ui/Modal';

// forms
import axios from 'axios';
import { getTokenFromStore } from '@/utils/localStorage';
import { getError, statusIsSuccessful } from '@/utils/helpers';
import { toast } from 'react-toastify';
import ProcessButton from '@/components/utils/ProcessButton';
import FormikForm from '@/components/forms/FormikForm';

const Visitations = () => (
  <Backend role={USER_ROLES.ADMIN}>
    <PaginatedContent
      // addNewUrl={'/app/admin/visitations/new'}
      endpoint={'api/visitations'}
      pageName="Visitation"
      DataComponent={VisitationsRowList}
      PageIcon={<Calendar />}
      populate="*"
      filterFields={filterVisitations}
    />
  </Backend>
);

export const VisitationsRowList = ({ results, offset, attachment, query }) => {
  return (
    <div className="container-fluid">
      <Card className="mt-2">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Purpose</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ id, attributes }, index) => (
                <VisitationsSingleRow
                  key={index}
                  number={offset + index + 1}
                  id={id}
                  {...attributes}
                  attachment={attachment}
                  query={query}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export const VisitationsSingleRow = (visitation) => {
  const { number, name, status, visitDate, visiting } = visitation;
  return (
    <tr>
      <td>{number}</td>
      <td>{name}</td>
      <td>{getShortDate(visitDate)}</td>
      <td>{VISITATION_STATUS_NAME[status]}</td>
      <td>{visiting}</td>
      <td>
        <ManageVisitationButton visitation={visitation} />
      </td>
    </tr>
  );
};

export const ManageVisitationButton = ({ visitation }) => {
  const [showModal, setShowModal] = React.useState(false);

  const handleSubmit = async (values, actions) => {
    const payload = {
      visitDate: values.visitDate.date,
      status: VISITATION_STATUS.RESCHEDULED.toString(),
    };
    try {
      axios({
        method: 'put',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/visitations/${visitation.id}`,
        data: { data: payload },
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            visitation.query.mutate();
            toast.success('Visitation has been successfully scheduled');
            actions.resetForm({ values: {} });
            actions.setSubmitting(false);
            setShowModal(false);
          }
        })
        .catch(function (error) {
          toast.error(getError(error));
        });
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const manageVisitation = async (status) => {
    try {
      axios({
        method: 'put',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/visitations/${visitation.id}`,
        data: { data: { status: status.toString() } },
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            visitation.query.mutate();
            toast.success('Visitation has been successfully updated');
            setShowModal(false);
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
    <>
      <Button
        color={'success'}
        className={`btn text-white btn-xs`}
        onClick={() => setShowModal(true)}
      >
        Manage Visitation
      </Button>

      {/* Modals */}
      <Modal
        title="Manage Visitation"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <section className="row">
          <div className="col-md-12 my-3">
            <div>
              <FormikForm
                schema={rescheduleVisitationSchema}
                handleSubmit={handleSubmit}
                name="schedule-visit"
              >
                <VisitationForm
                  visitation={visitation}
                  manageVisitation={manageVisitation}
                />
              </FormikForm>
            </div>
          </div>
        </section>
      </Modal>
    </>
  );
};

const VisitationForm = ({ visitation, manageVisitation }) => {
  const { id, query, name, email, phone, visitDate, visiting } = visitation;
  const status = parseInt(visitation.status, 10);
  return (
    <>
      <div className="table-responsive">
        <table className="table table-border">
          <thead>
            <tr className="">
              <th colSpan={3}>
                {visiting} ({VISITATION_STATUS_NAME[status]})
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{email}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{phone}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>{getShortDate(visitDate)}</td>
            </tr>
          </tbody>
        </table>
        <div className="my-4">
          {(status === VISITATION_STATUS.SCHEDULED ||
            status === VISITATION_STATUS.RESCHEDULED) && (
            <Button
              color="success"
              className="btn-sm me-3"
              onClick={() => manageVisitation(VISITATION_STATUS.CONFIRMED)}
            >
              Confirm Visitation
            </Button>
          )}
          {status === VISITATION_STATUS.CONFIRMED && (
            <Button
              color="success"
              className="btn-sm me-3"
              onClick={() => manageVisitation(VISITATION_STATUS.VISITED)}
            >
              Mark as Visited
            </Button>
          )}
          {status !== VISITATION_STATUS.VISITED && (
            <Button
              color="danger"
              className="btn-sm"
              onClick={() => manageVisitation(VISITATION_STATUS.CANCELLED)}
            >
              Cancel Visitation
            </Button>
          )}
        </div>
      </div>
      {status !== VISITATION_STATUS.VISITED && (
        <div className="mt-5">
          <h5>Reschedule Visitation</h5>
          <DatePicker
            name="visitDate"
            minDate={new Date()}
            placeholder="Visit Date"
          />
          <FormikButton color="info" className="text-white btn-sm">
            Reschedule Visit
          </FormikButton>
        </div>
      )}
    </>
  );
};

export default Visitations;
