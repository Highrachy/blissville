import React from 'react';
import { camelToSentence, processData } from '@/utils/helpers';
import { Tab } from 'react-bootstrap';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';

const TabContent = ({ allTabs, id, name, result }) => {
  const [currentTab, setCurrentTab] = React.useState(allTabs[0].title);
  return (
    <Tab.Container
      activeKey={currentTab}
      id={`${name}-tab-content`}
      className="mb-3"
    >
      <TabHeader
        allTabs={allTabs}
        setCurrentTab={setCurrentTab}
        currentTab={currentTab}
      />
      <Tab.Content>
        {allTabs.map(
          ({ title, fields, Component, processField, renameField }) => (
            <Tab.Pane eventKey={title} key={title}>
              <TabInformation
                id={id}
                title={title}
                result={{ id, ...result?.attributes }}
                data={fields}
                Component={Component}
                setCurrentTab={setCurrentTab}
                processField={processField}
                renameField={renameField}
              />
            </Tab.Pane>
          )
        )}
      </Tab.Content>
    </Tab.Container>
  );
};

export default TabContent;

const TabHeader = ({ allTabs, setCurrentTab, currentTab }) => (
  <ul className="nav fs-5 pt-5 fw-bolder">
    {allTabs.map(({ title }) => (
      <li key={title} className="nav-item" onClick={() => setCurrentTab(title)}>
        <span
          className={classNames('nav-link tab-header', {
            active: currentTab === title,
          })}
        >
          {title}
        </span>
      </li>
    ))}
  </ul>
);

const TabInformation = ({
  result,
  title,
  data,
  Component,
  processField,
  renameField,
  useTableHeader,
}) => {
  return (
    <section>
      {Component ? (
        useTableHeader ? (
          <TabContentHeader title={title} isTableContent={false}>
            <Component result={result} />
          </TabContentHeader>
        ) : (
          <Component result={result} />
        )
      ) : (
        <TabContentHeader title={title}>
          {!data || data.length === 0 ? (
            <tr>
              <td colSpan="5">
                <h3> There is no data to display</h3>
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                <th width="250">
                  {renameField?.[item] || camelToSentence(item)}
                </th>
                <td>
                  {item === 'description' ? (
                    <ReactMarkdown>{result[item]}</ReactMarkdown>
                  ) : processField?.[item] ? (
                    processField?.[item](result[item])
                  ) : (
                    processData(result[item], 'image')
                  )}
                </td>
              </tr>
            ))
          )}
        </TabContentHeader>
      )}
    </section>
  );
};

export const TabContentHeader = ({
  actionButton,
  children,
  title,
  isTableContent = true,
}) => (
  <div className="card position-relative">
    <div className="table-responsive">
      <table className="table table-border">
        <thead>
          <tr>
            <th colSpan="5">
              <h5 className="my-3">
                {title}
                {actionButton && (
                  <div className="float-end">{actionButton}</div>
                )}
              </h5>
            </th>
          </tr>
        </thead>
        <tbody>{isTableContent && children}</tbody>
      </table>
    </div>
    {!isTableContent && <div className="table-content">{children}</div>}
  </div>
);
