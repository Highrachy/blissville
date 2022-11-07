import React from 'react';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/admin/sideMenu';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import TabContent from '@/components/admin/TabContent';
import { getShortDate } from '@/utils/date-helpers';
import { moneyFormatInNaira } from '@/utils/helpers';
import {
  PAYMENT_SOURCE,
  PAYMENT_SOURCE_COLOR,
  PAYMENT_SOURCE_NAME,
  TRANSACTION_STATUS,
  TRANSACTION_STATUS_COLOR,
  TRANSACTION_STATUS_NAME,
} from '@/utils/constants';
import { DashboardTable } from 'pages/app/user/dashboard';
import { OverdueBadge } from 'pages/app/user/my-properties';
import ProcessButton from '@/components/utils/ProcessButton';

const pageOptions = {
  key: 'transactions',
  pageName: 'Transactions',
};

const Transactions = () => {
  const [query, result] = useSWRQuery({
    name: 'allTransactions',
    endpoint: 'api/administrative/admin-transactions',
  });

  const allTabs = [
    {
      title: 'Upcoming Payments',
      Component: () => <UpcomingPayments payments={result?.nextPayments} />,
    },
    {
      title: 'Transaction History',
      Component: () => (
        <TransactionHistory transactions={result?.transactions} />
      ),
    },
    {
      title: 'Offline Payments',
      Component: () => (
        <OfflinePayments
          offlinePayments={result?.offlinePayments}
          query={query}
        />
      ),
    },
  ];

  return (
    <Backend title="Transactions">
      <ContentLoader
        Icon={adminMenu['Transactions']}
        query={query}
        results={result}
        name={pageOptions.pageName}
      >
        <TabContent name="transactions" allTabs={allTabs} />
      </ContentLoader>
    </Backend>
  );
};

export const TransactionHistory = ({ transactions }) => {
  return (
    <DashboardTable title="Transaction History">
      {!transactions || transactions.length === 0 ? (
        <tr>
          <td colSpan="5">
            <div className="py-4 mt-2 text-md text-center text-gray-700">
              There are no transactions found
            </div>
          </td>
        </tr>
      ) : (
        transactions.map(
          ({ property, project, createdAt, amount, paymentSource }, index) => (
            <tr key={index}>
              <th width="300">
                <span className="fw-semibold">{getShortDate(createdAt)}</span>
                <br />
                <span className="fw-light text-gray-700 text-xs">
                  {property?.name} - {property?.project?.name}
                </span>
              </th>
              <td className="text-end">
                <span className="text-price">{moneyFormatInNaira(amount)}</span>
                <br />
                <span
                  className={`fw-semibold text-${PAYMENT_SOURCE_COLOR[paymentSource]} text-xs`}
                >
                  {paymentSource.toString() ===
                  PAYMENT_SOURCE.PAYSTACK.toString()
                    ? PAYMENT_SOURCE_NAME[paymentSource]
                    : 'Bank Payment'}
                </span>
              </td>
            </tr>
          )
        )
      )}
    </DashboardTable>
  );
};

export const UpcomingPayments = ({ payments }) => {
  return (
    <DashboardTable title="Upcoming Payments">
      {!payments || payments.length === 0 ? (
        <tr>
          <td colSpan="5">
            <p className="py-4 text-md text-center text-gray-700">
              <div className="mt-2">There are no upcoming payments</div>
            </p>
          </td>
        </tr>
      ) : (
        payments.map(
          (
            { property, expectedNextPayment, project, paymentDueDate },
            index
          ) => (
            <tr key={index}>
              <th width="300">
                <span className="fw-semibold">
                  {paymentDueDate && getShortDate(paymentDueDate)}
                </span>
                <br />
                <span className="fw-light text-gray-700 text-xs">
                  {property?.name} - {project?.name}
                </span>
              </th>
              <td className="text-end">
                <span className="text-price">
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

const OfflinePayments = ({ offlinePayments, query }) => {
  return (
    <DashboardTable title="Offline Payments">
      {!offlinePayments || offlinePayments.length === 0 ? (
        <tr>
          <td colSpan="5">
            <div className="py-4 text-md mt-2 text-center text-gray-700">
              There are no offline payments
            </div>
          </td>
        </tr>
      ) : (
        offlinePayments.map(
          (
            { assignedProperty, amount, paymentDate, status = 0, id },
            index
          ) => (
            <tr key={index}>
              <th width="300">
                <span className="fw-semibold">
                  {paymentDate && getShortDate(paymentDate)}
                </span>
                <br />
                <span className="fw-light text-gray-700 text-xs">
                  {assignedProperty?.property?.name} -{' '}
                  {assignedProperty?.property?.project?.name}
                </span>
              </th>
              <td className="text-end">
                <span className="text-price">
                  {amount && moneyFormatInNaira(amount)}
                </span>
                <br />
                <span
                  className={`fw-semibold text-${TRANSACTION_STATUS_COLOR[status]} text-xs`}
                >
                  {TRANSACTION_STATUS_NAME[status]}
                </span>
              </td>
              <td width="200">
                {status.toString() ===
                  TRANSACTION_STATUS.PENDING.toString() && (
                  <ProcessButton
                    afterSuccess={() => query.mutate()}
                    api={`offline-payments/${id}`}
                    buttonColor={'warning'}
                    buttonClassName={'btn-sm'}
                    buttonSizeClassName="btn-xs"
                    modalTitle="Assign Property"
                    data={{ status: TRANSACTION_STATUS.CONFIRMED }}
                    modalContent={`Are you sure you want to mark this transaction as verified?`}
                    successMessage={`The information has been successfully updated`}
                  >
                    Verify Payment
                  </ProcessButton>
                )}
              </td>
            </tr>
          )
        )
      )}
    </DashboardTable>
  );
};

export default Transactions;
