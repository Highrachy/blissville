import React from 'react';
import Backend from '@/components/admin/Backend';
import Link from 'next/link';
import Humanize from 'humanize-plus';
import { adminMenu } from '@/data/adminMenu';
import TopTitle from '@/components/admin/TopTitle';

const Dashboard = () => {
  const pageOptions = {
    key: 'dashboard',
    pageName: 'Dashboard',
  };

  return (
    <Backend>
      <div className="row">
        <TopTitle>Dashboard</TopTitle>
      </div>
    </Backend>
  );
};

export const widgetColors = ['primary', 'warning', 'info', 'success'];
export const allWidgets = ['apartment', 'tenant', 'applicant', 'job'];

const Widget = ({ name, color, result }) => {
  const pluralizeName = Humanize.pluralize(2, name);
  const capitalizedName = Humanize.capitalize(pluralizeName);
  const link = `/admin/${pluralizeName}`;

  return (
    <section className="widget mb-4 col-sm-6 col-lg-3 mb-4">
      <Link href={link} passHref>
        <a className="text-reset">
          <div className="card h-100">
            <div className="card-body px-4">
              <div className="d-flex align-items-center justify-content-between">
                <div className="py-3">
                  <h5 className={`fw-normal m-0 text-${color}`}>
                    {result[pluralizeName].total}
                  </h5>
                  <p className="subtitle mb-0">
                    {Humanize.pluralize(
                      result[pluralizeName].total,
                      name
                    ).toUpperCase()}
                  </p>
                </div>
                <div
                  className={`flex-shrink-0 ms-3 icon-md2 text-${color}-light`}
                >
                  {adminMenu[capitalizedName]}
                </div>
              </div>
            </div>
            <div
              className={`card-footer border-top-0 py-3 px-4 text-${color} bg-${color}-light`}
            >
              <div className="row align-items-center text-red">
                <div className="col-12">
                  <small className="fw-bold">
                    {result[pluralizeName].text}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </section>
  );
};

export default Dashboard;
