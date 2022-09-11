import React from 'react';
import Backend from '@/components/admin/Backend';
import Link from 'next/link';
import Humanize from 'humanize-plus';
import TopTitle from '@/components/admin/TopTitle';
import { HeartAdd, House, Star, StatusUp } from 'iconsax-react';
import { Doughnut } from 'react-chartjs-2';
import { moneyFormatInNaira } from '@/utils/helpers';
import 'chart.js/auto';
import Image from 'next/image';
import Button from '@/components/forms/Button';
import SingleProperty from '@/components/common/SingleProperty';

const PROPERTY_COLOR = '#446CB2';
const PENDING_PAYMENT_COLOR = '#F59E0B';
const REFERRAL_COLOR = '#26A65B';
const EMPTY_COLOR = '#CAD0D9';

const Dashboard = () => {
  const pageOptions = {
    key: 'dashboard',
    pageName: 'Dashboard',
  };

  return (
    <Backend title="Welcome back, Haruna">
      <div className="row">
        <div className="col-sm-6 mb-4 mb-md-0">
          <div className="card bg-gray-50 h-100 p-4 pb-5">
            <h4>₦ 7,000,000</h4>
            <p className="text-gray-700 fw-semibold text-sm">Your Net Worth</p>
            <div className="row">
              <div className="col-sm-6">
                <WidgetChart />
              </div>
              <div className="col-sm-6">
                <div className="d-flex flex-column justify-content-end h-100 mt-4 mt-md-0">
                  <ChartLegend
                    name="Amount Paid"
                    color="primary"
                    price="6,500,000"
                  />
                  <ChartLegend
                    name="Referral Bonus"
                    color="success"
                    price="5,000"
                  />
                  <ChartLegend
                    name="Pending Payment"
                    color="warning"
                    price="-2,000,000"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <WidgetList />
      </div>

      <div className="row">
        <div className="col-sm-6 mb-4 mb-md-0">
          <DashboardTable title="Upcoming Payments">
            <tr>
              <th width="300">
                <span className="fw-semibold">
                  3 Bedroom Apartments - Ikoyi
                </span>
                <br />
                <span className="fw-light text-gray-700 text-xs">
                  Aug 17th, 2021
                </span>
              </th>
              <td className="text-end">
                <span className="fw-semibold">500,000</span>
                <br />
                <span className="fw-semibold text-primary text-xs">
                  Monthly Payment
                </span>
              </td>
            </tr>
            <tr>
              <th width="300">
                <span className="fw-semibold">
                  4 Bedroom Apartments - Ikoyi
                </span>
                <br />
                <span className="fw-light text-gray-700 text-xs">
                  Aug 17th, 2021
                </span>
              </th>
              <td className="text-end">
                <span className="fw-semibold">10,000</span>
                <br />
                <span className="fw-semibold text-primary text-xs">
                  Utility Bill
                </span>
              </td>
            </tr>
          </DashboardTable>
          <DashboardTable title="Transaction History">
            <tr>
              <th width="300">
                <span className="fw-semibold">
                  3 Bedroom Apartments - Ikoyi
                </span>
                <br />
                <span className="fw-light text-gray-700 text-xs">
                  Aug 17th, 2021
                </span>
              </th>
              <td className="text-end">
                <span className="fw-semibold">7,500,000</span>
                <br />
                <span className="fw-semibold text-danger text-xs">Paid</span>
              </td>
            </tr>
            <tr>
              <th width="300">
                <span className="fw-semibold">
                  4 Bedroom Apartments - Ikoyi
                </span>
                <br />
                <span className="fw-light text-gray-700 text-xs">
                  Aug 17th, 2021
                </span>
              </th>
              <td className="text-end">
                <span className="fw-semibold">10,000</span>
                <br />
                <span className="fw-semibold text-success text-xs">
                  Received
                </span>
              </td>
            </tr>
          </DashboardTable>
        </div>
        <div className="col-sm-6">
          <section className="card bg-gray-50 py-3 py-md-5">
            <div className="card-body d-flex flex-column flex-center px-4 px-md-6">
              <div className="my-4">
                <h5 className="fw-regular text-gray-800 text-center lh-lg">
                  Do you know that you can{' '}
                  <div className="fw-bolder">Customize Your Home</div> at no
                  extra costs?
                </h5>
                <div className="py-5 text-center">
                  <Image
                    src="/assets/svg/customize-your-home.svg"
                    alt="blissville logo"
                    width={316}
                    height={194}
                  />
                </div>
              </div>
              <div className="text-center mb-1">
                <Button href="/our-projects/test" color="secondary">
                  Try it out now
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <FeaturedProperties />
    </Backend>
  );
};

const WidgetChart = () => {
  const accountOverview = {
    totalAmountPaid: 3000,
    contributionReward: 1000,
    referralRewards: 500,
  };
  const contributionIsEmpty =
    accountOverview?.contributionReward === 0 &&
    accountOverview?.totalAmountPaid === 0 &&
    accountOverview?.referralRewards === 0;

  return (
    <Doughnut
      data={{
        labels: ['Amount Paid', 'Pending Payment', 'Referral Bonus'],
        datasets: [
          {
            data: [
              contributionIsEmpty ? 1 : accountOverview.totalAmountPaid,
              accountOverview.contributionReward,
              accountOverview.referralRewards,
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

const WidgetList = () => {
  return (
    <div className="col-sm-6">
      <div className="row">
        {widgetLists.map((widget, index) => (
          <Widget
            key={index}
            result={{
              properties: { total: 1 },
              transactions: { total: 2 },
              wishlist: { total: 0 },
              referrals: { total: 1 },
            }}
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
    color: 'primary',
    Icon: <House variant="Bulk" />,
  },
  {
    name: 'transactions',
    color: 'secondary',
    Icon: <StatusUp variant="Bulk" />,
  },
  {
    name: 'referrals',
    color: 'warning',
    Icon: <HeartAdd variant="Bulk" />,
  },
  {
    name: 'wishlist',
    color: 'danger',
    Icon: <Star variant="Bulk" />,
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

const Widget = ({ name, color, Icon, result }) => {
  const link = `/admin/${name}`;

  return (
    <section className="widget mb-4 col-md-6 mb-4">
      <Link href={link} passHref>
        <a className="text-reset">
          <div className={`card h-100 position-relative ${color}`}>
            <div className="card-body px-4">
              <div className="d-flex align-items-center justify-content-between">
                <div className="py-1">
                  <div className="d-flex flex-wrap mb-2 pe-2 widget__color">
                    <h6 className={`d-flex align-items-center widget__color`}>
                      <span className="widget__Icon me-2">{Icon}</span>
                      {Humanize.capitalize(name)}
                    </h6>
                  </div>
                  <h2 className="mb-0  widget__color">
                    {result?.[name]?.total || 0}
                  </h2>
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

export const DashboardTable = ({ children, title }) => {
  return (
    <div className="table-responsive card mt-5">
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

export const FeaturedProperties = () => (
  <div className="container mt-5">
    <h4 className="mb-4">Featured Properties</h4>
    <div className="row gy-4">
      <SingleProperty img="1" />
      <SingleProperty img="2" />
    </div>
  </div>
);

export default Dashboard;
