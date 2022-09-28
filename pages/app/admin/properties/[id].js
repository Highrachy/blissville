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
import TabContent, { TabContentHeader } from '@/components/admin/TabContent';

const pageOptions = {
  key: 'property',
  pageName: 'Property',
};

const allTabs = [
  {
    title: 'Overview',
    fields: [
      'name',
      'type',
      'description',
      'totalUnits',
      'availableUnits',
      'baths',
      'beds',
      'toilets',
    ],
  },
  {
    title: 'Floor Plans',
    fields: [],
    Component: () => (
      <>
        <TabContentHeader isTableContent={false} title="Floor Plans ***">
          <ManageItem />
        </TabContentHeader>
      </>
    ),
  },
  {
    title: 'Gallery',
    fields: [],
    Component: () => <ManageItem />,
  },
];

const ManageItem = () => <h2>Manage Item</h2>;

const SingleProperty = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentTab, setCurrentTab] = React.useState(allTabs[0].key);

  const [query, result] = useSWRQuery({
    name: id ? [pageOptions.key, id] : id,
    endpoint: `api/properties/${id}`,
    axiosOptions: {
      params: {
        populate: '*',
      },
    },
  });

  return (
    <Backend title="Property" role={USER_ROLES.ADMIN}>
      <ContentLoader
        Icon={adminMenu['Properties']}
        query={query}
        results={result}
        name={pageOptions.pageName}
      >
        <PropertyHeader
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          {...result?.attributes}
          id={id}
          query={query}
        />
        <TabContent
          name="properties"
          allTabs={allTabs}
          id={id}
          result={result}
        />
      </ContentLoader>
    </Backend>
  );
};

const PropertyHeader = ({
  currentTab,
  setCurrentTab,
  id,
  slug,
  name,
  query,
  status,
  type,
  ...propertyInfo
}) => {
  const project = propertyInfo?.project?.data?.attributes;
  return (
    <section className="card mb-5">
      <div className="card-body p-5 pb-0">
        <div className="d-flex flex-wrap flex-sm-nowrap">
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start flex-wrap mb-3">
              <div className="d-flex flex-column">
                <h4 className="d-flex align-items-center mb-2">
                  {name} - {project?.name}
                </h4>
                <div className="d-flex text-muted flex-wrap align-items-center fs-6 mb-2 pe-2">
                  <Location /> {getLocationFromAddress(project)}
                </div>
                <div className="d-flex text-muted flex-wrap align-items-center fs-6 mb-3 pe-2">
                  <span className="d-flex align-items-center fw-bold text-success">
                    <GoPrimitiveDot /> {ROLE_NAME[status]}
                  </span>
                </div>
                <div className="d-flex flex-wrap fs-6 my-2">
                  <Button
                    color="none"
                    className="btn-xs btn-outline-dark"
                    href={{
                      pathname: '/properties/[slug]',
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
                      pathname: 'app/admin/properties/new',
                      query: { id, action: 'edit' },
                    }}
                  >
                    Edit Property
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    color="info"
                    className="btn-xs"
                    href={{
                      pathname: 'app/admin/properties/new',
                      query: { id, action: 'duplicate' },
                    }}
                  >
                    Duplicate Property
                  </Button>
                </div>
              </div>
              {/* Action */}
              <div className="d-flex">
                <Button
                  color="dark"
                  className="btn-sm"
                  href={{
                    pathname: '/app/admin/projects/[id]',
                    query: { id: propertyInfo?.project?.data?.id },
                  }}
                >
                  View Project
                </Button>
              </div>
            </div>
          </div>
        </div>

        <ul className="nav fs-5 pt-5 fw-bolder">
          {allTabs.map(({ key }) => (
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

export default SingleProperty;
