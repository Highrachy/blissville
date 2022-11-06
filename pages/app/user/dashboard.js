import React, { useContext } from 'react';
import Backend from '@/components/admin/Backend';
import Link from 'next/link';
import Humanize from 'humanize-plus';
import { HeartAdd, Buildings, StatusUp, UserAdd } from 'iconsax-react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import Image from 'next/image';
import Button from '@/components/forms/Button';
import classNames from 'classnames';
import { UserContext } from 'context/user';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import { TransactionHistory, UpcomingPayments } from './transactions';
import { moneyFormatInNaira } from '@/utils/helpers';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { adminMenu } from '@/data/admin/sideMenu';

const PROPERTY_COLOR = '#446CB2';
const PENDING_PAYMENT_COLOR = '#F59E0B';
const REFERRAL_COLOR = '#26A65B';
const EMPTY_COLOR = '#CAD0D9';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const pageOptions = {
    key: 'dashboard',
    pageName: 'Dashboard',
  };

  const [query, result] = useSWRQuery({
    name: [pageOptions.key],
    endpoint: 'api/administrative/user-dashboard',
  });

  const { paymentBreakdown } = result || {
    amountPaid: 0,
    expectedNextPayment: 0,
    referral: 0,
  };

  return (
    <Backend title={`Welcome back, ${user?.firstName ? user.firstName : ''}`}>
      <ContentLoader
        Icon={adminMenu['Dashboard']}
        query={query}
        results={result}
        name={'Dashboard'}
        loadingText="Generating your Dashboard"
      >
        <>
          <div className="row mb-4">
            <div className="col-sm-6 mb-4 mb-md-0">
              <div className="card h-100 bg-gray-50 p-4">
                <h4>{moneyFormatInNaira(paymentBreakdown?.amountPaid || 0)}</h4>
                <p className="text-gray-700 fw-semibold text-sm">
                  Your Net Worth
                </p>
                <div className="row">
                  <div className="col-sm-6">
                    <WidgetChart paymentBreakdown={paymentBreakdown} />
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex flex-column justify-content-end h-100 mt-4 mt-md-0 pb-5 pb-md-0">
                      <ChartLegend
                        name="Amount Paid"
                        color="primary"
                        price={moneyFormatInNaira(
                          paymentBreakdown?.amountPaid || 0
                        )}
                      />
                      <ChartLegend
                        name="Referral Bonus"
                        color="success"
                        price={moneyFormatInNaira(
                          paymentBreakdown?.referral || 0
                        )}
                      />
                      <ChartLegend
                        name="Pending Payment"
                        color="warning"
                        price={
                          paymentBreakdown?.expectedNextPayment || 0 > 0
                            ? `-${moneyFormatInNaira(
                                paymentBreakdown?.expectedNextPayment
                              )}`
                            : moneyFormatInNaira(0)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <WidgetList result={result} />
          </div>

          <div className="row">
            <div className="col-sm-6">
              <UpcomingPayments payments={result?.assignedProperty?.data} />
              <TransactionHistory transactions={result?.transactions?.data} />
            </div>
            <div className="col-sm-6">
              <CustomizeYourHomeBanner />
            </div>
          </div>
        </>
      </ContentLoader>
    </Backend>
  );
};

const CustomizeYourHomeBanner = () => {
  return (
    <section className="card bg-gray-50 py-3 py-md-4 h-100">
      <div className="card-body d-flex flex-column flex-center px-4 px-md-6">
        <div className="my-3">
          <h5 className="fw-regular text-gray-800 text-center lh-lg">
            Do you know that you can{' '}
            <div className="fw-bolder">Customize Your Home</div> at no extra
            costs?
          </h5>
          <div className="py-4 text-center">
            <Image
              src="/assets/svg/customize-your-home.svg"
              alt="blissville logo"
              width={316}
              height={194}
            />
          </div>
        </div>
        <div className="text-center mb-1">
          <Button href="/our-projects/3-bedroom-apartments" color="secondary">
            Try it out now
          </Button>
        </div>
      </div>
    </section>
  );
};
const WidgetChart = ({ paymentBreakdown }) => {
  // {amountPaid: 500000, expectedNextPayment: 2000000, referral: 0}
  const contributionIsEmpty =
    paymentBreakdown?.amountPaid === 0 &&
    paymentBreakdown?.expectedNextPayment === 0 &&
    paymentBreakdown?.referral === 0;

  return (
    <Doughnut
      data={{
        labels: ['Amount Paid', 'Pending Payment', 'Referral Bonus'],
        datasets: [
          {
            data: [
              contributionIsEmpty ? 1 : paymentBreakdown?.amountPaid,
              paymentBreakdown?.expectedNextPayment,
              paymentBreakdown?.referral,
            ],
            backgroundColor: [
              contributionIsEmpty ? EMPTY_COLOR : PROPERTY_COLOR,
              PENDING_PAYMENT_COLOR,
              REFERRAL_COLOR,
            ],
          },
        ],
      }}
      options={{
        responsive: true,
        rotation: 1,
        maintainAspectRatio: true,
        cutout: '70%',

        plugins: {
          legend: { display: false },
        },
      }}
    />
  );
};

const WidgetList = ({ result }) => {
  console.log('result', result);
  return (
    <div className="col-sm-6">
      <div className="row g-4">
        {widgetLists.map((widget, index) => (
          <Widget
            key={index}
            number={result?.[widget?.key || widget?.name]?.total || 0}
            {...widget}
          />
        ))}
      </div>
    </div>
  );
};

const widgetLists = [
  {
    name: 'properties',
    link: 'my-properties',
    key: 'assignedProperty',
    color: 'primary',
    Icon: <Buildings variant="Bulk" />,
  },
  {
    name: 'transactions',
    color: 'secondary',
    Icon: <StatusUp variant="Bulk" />,
  },
  {
    name: 'wishlist',
    color: 'warning',
    Icon: <HeartAdd variant="Bulk" />,
  },
  {
    name: 'referrals',
    color: 'danger',
    Icon: <UserAdd variant="Bulk" />,
  },
];

const ChartLegend = ({ color, name, price }) => (
  <div className="d-flex mb-2 pe-2 justify-content-between">
    <div className={`d-flex align-items-center`}>
      <span className={`legend__color bg-${color}`}></span>
      <span className="legend__title">{Humanize.capitalize(name)}</span>
    </div>
    <span className="legend__price">{price}</span>
  </div>
);

export const Widget = ({
  name,
  color,
  link,
  Icon,
  number,
  className = 'col-6',
  role = 'user',
}) => {
  const url = `/app/${role}/${link || name}`;

  return (
    <section className={`widget ${className} mb-4`}>
      <Link href={url} passHref>
        <a className="text-reset">
          <div className={`card h-100 position-relative ${color}`}>
            <div className="card-body px-md-4 px-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="py-1">
                  <div className="d-flex flex-wrap mb-2 pe-2 widget__color">
                    <h6 className={`d-flex align-items-center widget__color`}>
                      <span className="widget__Icon me-sm-2 me-1">{Icon}</span>
                      {Humanize.capitalize(name)}
                    </h6>
                  </div>
                  <h2 className="mb-0  widget__color">{number || 0}</h2>
                </div>
              </div>
              <div
                className={`widget__icon-tint ${color} position-absolute bottom-0 end-0`}
              >
                {Icon}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </section>
  );
};

export const DashboardTable = ({ children, title, className }) => {
  return (
    <div className={classNames('table-responsive card mb-5', className)}>
      <table className="table table-border table-striped">
        <thead>
          <tr>
            <th colSpan="2">
              <h5 className="my-3">{title}</h5>
            </th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Dashboard;
