import React from 'react';
import Backend from '@/components/admin/Backend';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import { getShortDate } from '@/utils/date-helpers';
import ProcessButton from '@/components/utils/ProcessButton';
import Humanize from 'humanize-plus';
import { Message } from 'iconsax-react';
import { USER_ROLES } from '@/utils/constants';

const Messages = () => (
  <Backend role={USER_ROLES.ADMIN}>
    <PaginatedContent
      endpoint={'api/contacts'}
      pageName="Message"
      DataComponent={MessagesRowList}
      PageIcon={<Message />}
      sort="createdAt:desc"
      // filterFields={filterMessages}
    />
  </Backend>
);

export default Messages;

export const MessagesRowList = ({ results, offset, query }) => {
  return (
    <div className="container-fluid">
      <Card className="mt-2">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th colSpan="6">Enquiries from Website </th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ id, attributes }, index) => (
                <MessagesSingleRow
                  key={index}
                  query={query}
                  number={offset + index + 1}
                  id={id}
                  {...attributes}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export const MessagesSingleRow = ({
  number,
  name,
  email,
  phone,
  subject,
  reference,
  source,
  message,
  createdAt,
}) => {
  return (
    <tr>
      <td>{number}</td>
      <td className="td-block">
        {name}
        <span>{email}</span>
      </td>
      <td className="td-block">
        {phone}
        <span>{reference || ''} </span>
      </td>
      <td className="td-block">
        <small>{subject}</small>
        <span>{Humanize.truncate(message, 40)} </span>
      </td>
      <td className="td-block">
        {getShortDate(createdAt)}{' '}
        <span>
          <small>{source}</small>
        </span>
      </td>

      <td>
        <ProcessButton
          modalContent={message}
          modalTitle="View Message"
          hideActionButton
        >
          View
        </ProcessButton>
      </td>
    </tr>
  );
};
