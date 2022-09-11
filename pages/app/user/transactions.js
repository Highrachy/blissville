import Backend from '@/components/admin/Backend';
import Button from '@/components/forms/Button';
import classNames from 'classnames';
import React from 'react';
import { Tab } from 'react-bootstrap';
import { DashboardTable } from './dashboard';

const Transactions = () => {
  return (
    <Backend title="Transactions">
      <TabInformation />
    </Backend>
  );
};

export default Transactions;

const TabInformation = () => {
  const allTabs = ['Upcoming Payments', 'Past Payments'];
  const [currentTab, setCurrentTab] = React.useState(allTabs[0]);

  return (
    <>
      <Tab.Container
        activeKey={currentTab}
        id="single-tenant-profile"
        className="mb-3"
      >
        <ul className="nav nav-tabs">
          {allTabs.map((name) => (
            <li
              key={name}
              className={classNames('nav-item position-relative', {
                active: currentTab === name,
              })}
              onClick={() => setCurrentTab(name)}
            >
              <div
                className={classNames('nav-link', {
                  active: currentTab === name,
                })}
              >
                {name}
              </div>
            </li>
          ))}
        </ul>
        <Tab.Content>
          <Tab.Pane eventKey={allTabs[0]} key={allTabs[0]}>
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
          </Tab.Pane>
          <Tab.Pane eventKey={allTabs[1]} key={allTabs[1]}>
            <DashboardTable title="Past Payments">
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
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
  );
};
