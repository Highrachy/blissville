import React from 'react';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/admin/sideMenu';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import Button from '@/components/forms/Button';
import { getLocationFromAddress } from '@/utils/helpers';
import { Location } from 'iconsax-react';
import { USER_ROLES } from '@/utils/constants';
import { PropertiesRowList } from '../properties';
import TabContent from '@/components/admin/TabContent';
import ManageGallery from '@/components/utils/ManageGallery';

const pageOptions = {
  key: 'project',
  pageName: 'Project',
};

const SingleProject = () => {
  const router = useRouter();
  const { id } = router.query;

  const [query, result] = useSWRQuery({
    name: id ? [pageOptions.key, id] : id,
    endpoint: `api/projects/${id}`,
    axiosOptions: {
      params: {
        populate: '*',
      },
    },
  });

  const allTabs = [
    {
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
      title: 'Properties',
      Component: ({ result }) => (
        <PropertiesRowList
          results={result?.properties?.data || []}
          offset={0}
        />
      ),
    },
    {
      title: 'Gallery',
      Component: () => (
        <>
          <ManageGallery
            type="project"
            id={id}
            data={result?.attributes?.project_galleries?.data}
            query={query}
          />
        </>
      ),
    },
  ];

  return (
    <Backend title="Projects" role={USER_ROLES.ADMIN}>
      <ContentLoader
        Icon={adminMenu['Projects']}
        query={query}
        results={result}
        name={pageOptions.pageName}
      >
        <ProjectHeader {...result?.attributes} id={id} query={query} />

        <TabContent name="projects" allTabs={allTabs} id={id} result={result} />
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
                      pathname: '/our-projects/[slug]',
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
                      pathname: 'app/admin/projects/new',
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
      </div>
    </section>
  );
};
export default SingleProject;
