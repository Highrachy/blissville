import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
import { filterInterests } from '@/utils/filters';
import { USER_ROLES } from '@/utils/constants';
import { getShortDate } from '@/utils/date-helpers';
import { Calendar } from 'iconsax-react';
import Button from '@/components/forms/Button';

const Interests = () => (
  <Backend role={USER_ROLES.ADMIN}>
    <PaginatedContent
      // addNewUrl={'/app/admin/interests/new'}
      endpoint={'api/interests'}
      pageName="Interest"
      DataComponent={InterestsRowList}
      PageIcon={<Calendar />}
      populate="*"
      filterFields={filterInterests}
    />
  </Backend>
);

export const InterestsRowList = ({ results, offset, attachment }) => {
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ id, attributes }, index) => (
                <InterestsSingleRow
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

export const InterestsSingleRow = ({
  number,
  id,
  email,
  phone,
  status,
  paymentStartDate,
  ...interestInfo
}) => {
  return (
    <tr>
      <td>{number}</td>
      <td>{getFullName(interestInfo)}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{getShortDate(paymentStartDate)}</td>
      <td>{status}</td>
      <td>
        <Button
          color="secondary"
          className="btn-xs"
          href={{
            pathname: '/app/admin/interests/[id]',
            query: { id },
          }}
        >
          Manage Interest
        </Button>
      </td>
    </tr>
  );
};

export default Interests;
