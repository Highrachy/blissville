import React, { useContext } from 'react';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/admin/sideMenu';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import TabContent from '@/components/admin/TabContent';
import { DashboardTable } from './dashboard';
import { getShortDate } from '@/utils/date-helpers';
import { moneyFormatInNaira } from '@/utils/helpers';
import {
  ASSIGNED_PROPERTY_STATUS,
  PAYMENT_SOURCE_NAME,
  TRANSACTION_STATUS_NAME,
} from '@/utils/constants';
import { UserContext } from 'context/user';
import { OverdueBadge } from './my-properties';

const pageOptions = {
  key: 'transactions',
  pageName: 'Transactions',
};

const Transactions = () => {
  const { user } = useContext(UserContext);
  const id = user?.id;

  const [query, transactions] = useSWRQuery({
    name: id ? ['transactions', id] : id,
    endpoint: `api/transactions`,
    axiosOptions: {
      params: {
        populate: 'deep,3',
        // 'filters[user][id][$eq]': id,
        sort: 'createdAt:desc',
      },
    },
  });
  const [_, payments] = useSWRQuery({
    name: id ? ['assigned-properties', id] : id,
    endpoint: `api/assigned-properties`,
    axiosOptions: {
      params: {
        // 'filters[user][id][$eq]': id,
        'filters[status][$lt]': ASSIGNED_PROPERTY_STATUS.COMPLETE_PAYMENT,
        populate: '*',
      },
    },
  });
  const [__, offlinePayments] = useSWRQuery({
    name: id ? ['api/offline-payments', id] : id,
    endpoint: `api/offline-payments`,
    axiosOptions: {
      params: {
        // 'filters[user][id][$eq]': id,
        populate: 'deep,3',
      },
    },
  });

  const allTabs = [
    {
      title: 'Past Transactions',
      Component: () => (
        <PastTransactions title="Past Payments" transactions={transactions} />
      ),
    },
    {
      title: 'Upcoming Payments',
      Component: () => (
        <UpcomingPayments title="Upcoming Payments" payments={payments} />
      ),
    },
    {
      title: 'Offline Payments',
      Component: () => <OfflinePayments offlinePayments={offlinePayments} />,
    },
  ];

  return (
    <Backend title="Transactions">
      <ContentLoader
        Icon={adminMenu['Transactions']}
        query={query}
        results={transactions}
        name={pageOptions.pageName}
      >
        <TabContent name="transactions" allTabs={allTabs} />
      </ContentLoader>
    </Backend>
  );
};

const PastTransactions = ({ transactions }) => {
  console.log('transactions', transactions);

  return (
    <DashboardTable title="Past Transactions">
      {!transactions || transactions.length === 0 ? (
        <tr>
          <td colSpan="5">
            <h3> There is no data to display</h3>
          </td>
        </tr>
      ) : (
        transactions.map(
          (
            { attributes: { property, createdAt, amount, paymentSource } },
            index
          ) => (
            <tr key={index}>
              <th width="300">
                <span className="fw-semibold">
                  {property.data.attributes.name} -{' '}
                  {property.data.attributes.project.data.attributes.name}
                </span>
                <br />
                <span className="fw-light text-gray-700 text-xs">
                  {getShortDate(createdAt)}
                </span>
              </th>
              <td className="text-end">
                <span className="fw-semibold">
                  {moneyFormatInNaira(amount)}
                </span>
                <br />
                <span className="fw-semibold text-primary text-xs">
                  {PAYMENT_SOURCE_NAME[paymentSource]}
                </span>
              </td>
            </tr>
          )
        )
      )}
    </DashboardTable>
  );
};

const UpcomingPayments = ({ payments }) => {
  console.log('payments', payments);

  return (
    <DashboardTable title="Upcoming Payments">
      {!payments || payments.length === 0 ? (
        <tr>
          <td colSpan="5">
            <h3> There is no data to display</h3>
          </td>
        </tr>
      ) : (
        payments.map(
          (
            {
              attributes: {
                property,
                expectedNextPayment,
                project,
                paymentDueDate,
              },
            },
            index
          ) => (
            <tr key={index}>
              <th width="300">
                <span className="fw-semibold">
                  {property?.data?.attributes?.name} -{' '}
                  {project?.data?.attributes?.name}
                </span>
                <br />
                <span className="fw-light text-gray-700 text-xs">
                  {paymentDueDate && getShortDate(paymentDueDate)}
                </span>
              </th>
              <td className="text-end">
                <span className="fw-semibold">
                  {expectedNextPayment &&
                    moneyFormatInNaira(expectedNextPayment)}
                </span>
                <br />
                <span className="fw-semibold text-primary text-xs">
                  {paymentDueDate && <OverdueBadge date={paymentDueDate} />}
                </span>
              </td>
            </tr>
          )
        )
      )}
    </DashboardTable>
  );
};

const OfflinePayments = ({ offlinePayments }) => {
  console.log('offlinePayments', offlinePayments);

  return (
    <DashboardTable title="Offline Payments">
      {!offlinePayments || offlinePayments.length === 0 ? (
        <tr>
          <td colSpan="5">
            <h3> There is no data to display</h3>
          </td>
        </tr>
      ) : (
        offlinePayments.map(
          (
            { attributes: { assignedProperty, amount, paymentDate, status } },
            index
          ) => (
            <tr key={index}>
              <th width="300">
                <span className="fw-semibold">
                  {
                    assignedProperty?.data?.attributes?.property?.data
                      ?.attributes?.name
                  }{' '}
                  -{' '}
                  {
                    assignedProperty?.data?.attributes?.project?.data
                      ?.attributes?.name
                  }
                </span>
                <br />
                <span className="fw-light text-gray-700 text-xs">
                  {paymentDate && getShortDate(paymentDate)}
                </span>
              </th>
              <td className="text-end">
                <span className="fw-semibold">
                  {amount && moneyFormatInNaira(amount)}
                </span>
                <br />
                <span className="fw-semibold text-primary text-xs">
                  {status && TRANSACTION_STATUS_NAME[status]}
                </span>
              </td>
            </tr>
          )
        )
      )}
    </DashboardTable>
  );
};

export default Transactions;
