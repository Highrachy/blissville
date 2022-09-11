import React from 'react';
import Backend from '@/components/admin/Backend';
import Link from 'next/link';
import Humanize from 'humanize-plus';
import { adminMenu } from '@/data/adminMenu';
import TopTitle from '@/components/admin/TopTitle';
import { EmojiHappy, HeartAdd, House, Star, StatusUp } from 'iconsax-react';

const Dashboard = () => {
  const pageOptions = {
    key: 'dashboard',
    pageName: 'Dashboard',
  };

  return (
    <Backend>
      <div className="row">
        <TopTitle>Welcome Back, Haruna</TopTitle>

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
    </Backend>
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

const Widget = ({ name, color, Icon, result }) => {
  const link = `/admin/${name}`;

  return (
    <section className="widget mb-4 col-sm-6 col-lg-3 mb-4">
      <Link href={link} passHref>
        <a className="text-reset">
          <div className={`card h-100 position-relative ${color}`}>
            <div className="card-body px-4">
              <div className="d-flex align-items-center justify-content-between">
                <div className="py-1">
                  <div className="d-flex flex-wrap fs-6 mb-2 pe-2 widget__color">
                    <h6 className={`d-flex align-items-center  widget__color`}>
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

export default Dashboard;
