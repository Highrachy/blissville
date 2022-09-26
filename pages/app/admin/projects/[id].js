import React from 'react';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/admin/sideMenu';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import Button from '@/components/forms/Button';
import {
  camelToSentence,
  getLocationFromAddress,
  processData,
} from '@/utils/helpers';
import { Tab } from 'react-bootstrap';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import Humanize from 'humanize-plus';
import { GoPrimitiveDot } from 'react-icons/go';
import ProcessButton from '@/components/utils/ProcessButton';
import { Location } from 'iconsax-react';
import { ROLE_NAME, USER_ROLES } from '@/utils/constants';
import { PropertiesRowList } from '../properties';

const pageOptions = {
  key: 'project',
  pageName: 'Project',
};

const allProjectTabs = [
  {
    key: 'Overview',
    title: 'Overview',
    fields: [
      'name',
      'type',
      'image',
      'description',
      'street1',
      'street2',
      'city',
      'state',
      'features',
      'paymentPlan',
      'startDate',
      'delivery',
    ],
  },
  {
    key: 'Properties',
    title: 'Properties',
    fields: [],
  },
];

const SingleProject = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentTab, setCurrentTab] = React.useState(allProjectTabs[0].key);

  const [query, result] = useSWRQuery({
    name: id ? [pageOptions.key, id] : id,
    endpoint: `api/projects/${id}`,
    axiosOptions: {
      params: {
        populate: '*',
      },
    },
  });

  return (
    <Backend title="Single Project" role={USER_ROLES.ADMIN}>
      <ContentLoader
        Icon={adminMenu['Projects']}
        query={query}
        results={result}
        name={pageOptions.pageName}
      >
        <ProjectHeader
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          {...result?.attributes}
          id={id}
          query={query}
        />
        <Tab.Container
          activeKey={currentTab}
          id="single-project-profile"
          className="mb-3"
        >
          <Tab.Content>
            {allProjectTabs.map(({ key, title, fields }) => (
              <Tab.Pane eventKey={key} key={key}>
                <TabInformation
                  id={id}
                  title={title}
                  project={{ id, ...result?.attributes }}
                  data={fields}
                  setCurrentTab={setCurrentTab}
                />
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Tab.Container>
      </ContentLoader>
    </Backend>
  );
};

const ProjectHeader = ({
  currentTab,
  setCurrentTab,
  id,
  slug,
  name,
  query,
  status,
  type,
  ...projectInfo
}) => {
  return (
    <section className="card mb-5">
      <div className="card-body p-5 pb-0">
        <div className="d-flex flex-wrap flex-sm-nowrap">
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start flex-wrap mb-3">
              <div className="d-flex flex-column">
                <h4 className="d-flex align-items-center mb-2">
                  {type} - {name}
                </h4>
                <div className="d-flex text-muted flex-wrap align-items-center fs-6 mb-2 pe-2">
                  <Location /> {getLocationFromAddress(projectInfo)}
                </div>
                {/* <div className="d-flex text-muted flex-wrap align-items-center fs-6 mb-3 pe-2">
                  <span className="d-flex align-items-center fw-bold text-success">
                    <GoPrimitiveDot /> {ROLE_NAME[status]}
                  </span>
                </div> */}
                <div className="d-flex flex-wrap fs-6 my-2">
                  <Button
                    color="none"
                    className="btn-xs btn-outline-dark"
                    href={{
                      pathname: '/projects/[slug]',
                      query: { slug },
                    }}
                  >
                    View on Website
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    color="none"
                    className="btn-xs btn-outline-primary"
                    href={{
                      pathname: '/app/admin/projects/new',
                      query: { id, action: 'edit' },
                    }}
                  >
                    Edit Project
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    color="info"
                    className="btn-xs"
                    href={{
                      pathname: '/admin/projects/new',
                      query: { id, action: 'duplicate' },
                    }}
                  >
                    Duplicate Project
                  </Button>
                </div>
              </div>
              {/* Action */}
              <div className="d-flex">
                <Button
                  className="btn-sm"
                  href={{
                    pathname: '/app/admin/properties/new',
                    query: { projectId: id },
                  }}
                >
                  Add Property
                </Button>
              </div>
            </div>
          </div>
        </div>

        <ul className="nav fs-5 pt-5 fw-bolder">
          {allProjectTabs.map(({ key }) => (
            <li
              key={key}
              className="nav-item"
              onClick={() => setCurrentTab(key)}
            >
              <span
                className={classNames('nav-link tab-header', {
                  active: currentTab === key,
                })}
              >
                {key}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const TabInformation = ({ project, title, data }) => {
  console.log('project: ', project);
  return (
    <section>
      {title === allProjectTabs[1].title ? (
        <PropertiesRowList
          results={project?.properties?.data || []}
          offset={0}
        />
      ) : (
        <div className="card">
          <div className="table-responsive">
            <table className="table table-border">
              <thead>
                <tr>
                  <th colSpan="5">
                    <h5 className="my-3">{title}</h5>
                  </th>
                </tr>
              </thead>

              <tbody>
                {!data || data.length === 0 ? (
                  <tr>
                    <td colSpan="5">
                      <h3> There is no data to display</h3>
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={index}>
                      <th width="250">{camelToSentence(item)}</th>
                      <td>
                        {item === 'description' ? (
                          <ReactMarkdown>{project[item]}</ReactMarkdown>
                        ) : (
                          processData(project[item])
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default SingleProject;
