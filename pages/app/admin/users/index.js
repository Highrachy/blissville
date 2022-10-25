import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
import { filterUsers } from '@/utils/filters';
import { USER_ROLES } from '@/utils/constants';
import { getShortDate } from '@/utils/date-helpers';
import Button from '@/components/forms/Button';
import { getFullName } from '@/utils/helpers';
import { adminMenu } from '@/data/admin/sideMenu';

const Users = () => (
  <Backend role={USER_ROLES.ADMIN}>
    <PaginatedContent
      endpoint={'api/local-users'}
      pageName="User"
      DataComponent={UsersRowList}
      PageIcon={adminMenu['Users']}
      populate="*"
      filterFields={filterUsers}
    />
  </Backend>
);

export const UsersRowList = ({ results, offset, attachment }) => {
  return (
    <div className="container-fluid">
      <Card className="mt-2">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ id, attributes }, index) => (
                <UsersSingleRow
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

export const UsersSingleRow = ({
  number,
  id,
  email,
  phone,
  status,
  ...userInfo
}) => {
  return (
    <tr>
      <td>{number}</td>
      <td className="td-block">
        {getFullName(userInfo)}
        <span>{email}</span>
      </td>
      <td className="td-block">
        <small>{phone}</small>
      </td>
      <td>
        <Button
          color="secondary"
          className="btn-xs"
          href={{
            pathname: '/app/admin/users/[id]',
            query: { id },
          }}
        >
          Manage User
        </Button>
      </td>
    </tr>
  );
};

export default Users;