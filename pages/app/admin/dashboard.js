import React from 'react';
import Backend from '@/components/admin/Backend';
import { Buildings, StatusUp, Briefcase, People } from 'iconsax-react';
import 'chart.js/auto';
import { Widget } from '../user/dashboard';

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
    <Backend title="Welcome back, Admin">
      <div className="row mb-4">
        <WidgetList />
      </div>
    </Backend>
  );
};

const widgetLists = [
  {
    name: 'projects',
    color: 'warning',
    Icon: <Briefcase variant="Bulk" />,
  },
  {
    name: 'properties',
    color: 'primary',
    Icon: <Buildings variant="Bulk" />,
  },
  {
    name: 'transactions',
    color: 'secondary',
    Icon: <StatusUp variant="Bulk" />,
  },
  {
    name: 'users',
    color: 'danger',
    Icon: <People variant="Bulk" />,
  },
];

const WidgetList = () => {
  return (
    <div className="row g-4 gy-4 gy-md-0">
      {widgetLists.map((widget, index) => (
        <Widget
          key={index}
          className="col-3"
          result={{
            properties: { total: 9 },
            transactions: { total: 28 },
            projects: { total: 3 },
            users: { total: 15 },
          }}
          {...widget}
          role="admin"
        />
      ))}
    </div>
  );
};

export default Dashboard;