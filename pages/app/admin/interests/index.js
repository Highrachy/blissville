import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
// import { filterInterests } from '@/utils/filters';
import { INTEREST_STATUS_COLOR, USER_ROLES } from '@/utils/constants';
import { getShortDate } from '@/utils/date-helpers';
import { EmptyWalletChange } from 'iconsax-react';
import Button from '@/components/forms/Button';
import { getFullName } from '@/utils/helpers';
import { INTEREST_STATUS_NAME } from '@/utils/constants';
import { LocalImage } from '@/components/common/Image';

const Interests = () => (
  <Backend role={USER_ROLES.ADMIN}>
    <PaginatedContent
      endpoint={'api/interests'}
      pageName="Interest"
      DataComponent={InterestsRowList}
      PageIcon={<EmptyWalletChange />}
      populate="*"
      // filterFields={filterInterests}
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
                <th>Date</th>
                <th>Property</th>
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
  property,
  ...interestInfo
}) => {
  return (
    <tr>
      <td>{number}</td>
      <td className="td-block">
        {getFullName(interestInfo)}
        <span>{email}</span>
      </td>
      <td className="td-block">
        {getShortDate(paymentStartDate)}{' '}
        <span>
          <small>{phone}</small>
        </span>
      </td>
      <td>
        <LocalImage
          src={property.data.attributes.image}
          name={property.data.attributes.name}
          className="img-md2 me-2"
          rounded
        />
        {property.data.attributes.name}
      </td>
      <td>
        <span
          className={`badge badge-dot text-${INTEREST_STATUS_COLOR[status]}`}
        >
          {INTEREST_STATUS_NAME[status]}
        </span>
      </td>
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
