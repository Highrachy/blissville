import React from 'react';
import Backend from '@/components/admin/Backend';
import {
  Buildings,
  StatusUp,
  Briefcase,
  People,
  Gallery,
  Calendar,
  Message,
  EmptyWalletChange,
} from 'iconsax-react';
import 'chart.js/auto';
import { Widget } from '../user/dashboard';
import { USER_ROLES } from '@/utils/constants';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { adminMenu } from '@/data/admin/sideMenu';

const PROPERTY_COLOR = '#446CB2';
const PENDING_PAYMENT_COLOR = '#F59E0B';
const REFERRAL_COLOR = '#26A65B';
const EMPTY_COLOR = '#CAD0D9';

const Dashboard = () => {
  const pageOptions = {
    key: 'dashboard',
    pageName: 'Dashboard',
  };

  const [query, result] = useSWRQuery({
    name: [pageOptions.key],
    endpoint: 'api/administrative/admin-dashboard',
  });

  return (
    <Backend role={USER_ROLES.ADMIN} title="Welcome back, Admin">
      <ContentLoader
        Icon={adminMenu['Dashboard']}
        query={query}
        results={result}
        name={'Dashboard'}
        loadingText="Retrieving the updated dashboard information"
      >
        <div className="row mt-n2 mt-md-0 mb-5">
          <WidgetList result={result} />
        </div>
      </ContentLoader>
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
  {
    name: 'slideshows',
    color: 'danger',
    Icon: <Gallery variant="Bulk" />,
  },
  {
    name: 'visitations',
    color: 'primary',
    Icon: <Calendar variant="Bulk" />,
  },
  {
    name: 'messages',
    color: 'warning',
    Icon: <Message variant="Bulk" />,
  },
  {
    name: 'interests',
    color: 'secondary',
    Icon: <EmptyWalletChange variant="Bulk" />,
  },
];

const WidgetList = ({ result }) => {
  return (
    <div className="row g-4 gy-4 gy-md-0">
      {widgetLists.map((widget, index) => (
        <Widget
          key={index}
          className="col-6 col-md-3"
          number={result?.[widget?.key || widget?.name]?.total || 0}
          {...widget}
          role="admin"
        />
      ))}
    </div>
  );
};

export default Dashboard;
