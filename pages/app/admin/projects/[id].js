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
import ManageNeighborhood from '@/components/utils/ManageNeighborhood ';
import ManageFAQs from '@/components/utils/ManageFAQs';
import { LocalImage } from '@/components/common/Image';
import Link from 'next/link';
import ManageProperty from '@/components/utils/ManageProperty';

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
      Component: () => (
        <>
          <ManageProperty
            id={id}
            data={result?.attributes?.properties?.data}
            query={query}
          />
        </>
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
    {
      title: 'Neighborhood',
      Component: () => (
        <>
          <ManageNeighborhood
            id={id}
            data={result?.attributes?.neighborhoods?.data}
            query={query}
          />
        </>
      ),
    },
    {
      title: 'FAQs',
      Component: () => (
        <>
          <ManageFAQs
            id={id}
            data={result?.attributes?.faqs?.data}
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
  image,
  ...projectInfo
}) => {
  return (
    <section className="card mb-3">
      <div className="card-body p-5">
        <div className="d-flex flex-wrap flex-sm-nowrap">
          <div className="">
            <div className="d-block me-3 position-relative">
              <LocalImage
                src={image}
                name={name}
                className="img-xl"
                rounded
                responsiveImage={false}
              />
            </div>
          </div>
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start flex-wrap">
              <div className="d-flex flex-column">
                <h4 className="d-flex align-items-center mb-2">
                  {type} - {name}
                </h4>
                <div className="d-flex text-sm flex-wrap align-items-center mb-2 pe-2">
                  {getLocationFromAddress(projectInfo)}
                </div>
                <div className="d-flex flex-wrap my-2 text-muted">
                  <Link
                    href={{
                      pathname: '/app/admin/projects/new',
                      query: { id, action: 'edit' },
                    }}
                    passHref
                  >
                    <a className="text-underline text-success text-sm me-3">
                      Edit Project
                    </a>
                  </Link>
                  |
                  <Link
                    href={{
                      pathname: '/app/admin/projects/new',
                      query: { id, action: 'duplicate' },
                    }}
                    passHref
                  >
                    <a className="text-underline text-info text-sm mx-3">
                      Duplicate Project
                    </a>
                  </Link>
                  |
                  <Link
                    href={{
                      pathname: '/our-projects/[slug]',
                      query: { slug },
                    }}
                    passHref
                  >
                    <a className="text-underline text-warning text-sm ms-3">
                      View on Website
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SingleProject;
