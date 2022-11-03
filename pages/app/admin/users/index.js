import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
import { USER_ROLES } from '@/utils/constants';
import Button from '@/components/forms/Button';
import { getFullName } from '@/utils/helpers';
import { adminMenu } from '@/data/admin/sideMenu';
import TopTitle from '@/components/admin/TopTitle';

const Users = () => (
  <Backend role={USER_ROLES.ADMIN}>
    <PaginatedContent
      endpoint={'api/users'}
      pageName="User"
      DataComponent={UsersRowList}
      PageIcon={adminMenu['Users']}
      populate="*"
      // filterFields={filterUsers}
      hideTitle
      // params={{ start: 0, limit: 3 }}
    />
  </Backend>
);

export const UsersRowList = ({ results, offset, attachment }) => {
  return (
    <div className="container-fluid">
      <TopTitle>{results?.length} Users</TopTitle>
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
              {results.map((attributes, index) => (
                <UsersSingleRow
                  key={index}
                  number={offset + index + 1}
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
