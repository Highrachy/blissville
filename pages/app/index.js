import BackendPage from '@/components/layouts/BackendPage';

const Dashboard = ({ children }) => {
  return (
    <BackendPage>
      <div className="px-5 pt-3">
        <h4>Hello Kingsley</h4>
        <p>What would you like to do today?</p>
      </div>
    </BackendPage>
  );
};

export default Dashboard;
