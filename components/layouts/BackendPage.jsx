import Sidebar from '@/components/common/Sidebar';
import React from 'react';
import TopNav from '../common/TopNav';

const BackendPage = ({ children }) => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const closeSidebar = () => {
    document.body.classList.remove('modal-open');
    setShowSidebar(false);
  };

  return (
    <div className="dashboard-page">
      <Sidebar closeSidebar={closeSidebar} showSidebar={showSidebar} />

      {/* Content Page */}
      <div className="content-page">
        <TopNav />
        <div className="py-7 px-5">{children}</div>
      </div>
    </div>
  );
};

export default BackendPage;
