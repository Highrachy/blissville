import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/admin/sideMenu';
import Button from '@/components/forms/Button';
import { filterVisitations } from '@/utils/filters';
import { USER_ROLES } from '@/utils/constants';
import { getShortDate } from '@/utils/date-helpers';
import { Calendar } from 'iconsax-react';

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

export const VisitationsRowList = ({ results, offset, attachment }) => {
  return (
    <div className="container-fluid">
      <Card className="mt-2">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Status</th>
                <th>Visiting</th>
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
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export const VisitationsSingleRow = ({
  number,
  name,
  email,
  phone,
  status,
  visitDate,
  visiting,
}) => {
  return (
    <tr>
      <td>{number}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{getShortDate(visitDate)}</td>
      <td>{status}</td>
      <td>{visiting}</td>
    </tr>
  );
};

export default Visitations;
