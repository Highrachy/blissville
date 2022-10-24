import React from 'react';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/admin/sideMenu';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import Button from '@/components/forms/Button';
import { getLocationFromAddress, moneyFormatInNaira } from '@/utils/helpers';
import { GalleryTick } from 'iconsax-react';
import { PROJECT_STATUS_NAME, USER_ROLES } from '@/utils/constants';
import { PropertiesRowList } from '../properties';
import TabContent from '@/components/admin/TabContent';
import ManageGallery from '@/components/utils/ManageGallery';
import ManageNeighborhood from '@/components/utils/ManageNeighborhood ';
import ManageFAQs from '@/components/utils/ManageFAQs';
import { LocalImage } from '@/components/common/Image';
import Link from 'next/link';
import ManageProperty from '@/components/utils/ManageProperty';
import ProcessButton from '@/components/utils/ProcessButton';
import Separator from '@/components/common/Separator';

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

  const featured = result?.attributes?.featured;

  const allTabs = [
    {
      title: 'Overview',
      fields: [
        'name',
        'type',
        'startingPrice',
        'description',
        'street1',
        'street2',
        'city',
        'state',
        'features',
        'standardFeatures',
        'supremeFeatures',
        'paymentPlan',
        'status',
        'startDate',
        'delivery',
        'featured',
        'slogan',
      ],
      processField: {
        status: (value) => PROJECT_STATUS_NAME[value],
        paymentPlan: (value) => `${value} Months`,
        featured: (value) => (
          <ProcessButton
            afterSuccess={() => query.mutate()}
            api={`projects/${id}`}
            buttonColor={featured ? 'danger' : 'success'}
            buttonSizeClassName="btn-sm"
            data={{ featured: !featured }}
            modalContent={`Are you sure you want to ${
              featured ? 'remove' : 'show'
            } this on the home page`}
            modalTitle={featured ? 'Remove from Slideshow' : 'Add to Slideshow'}
            successMessage={`The information has been successfully updated`}
          >
            {featured ? 'Remove from Slideshow' : 'Add to Home Page Slideshow'}
          </ProcessButton>
        ),
      },
      renameField: {
        featured: 'Show on HomePage',
      },
    },
    {
      title: 'Properties',
      Component: () => (
        <>
          <ManageProperty
            id={id}
            data={result?.attributes?.properties?.data}
            query={query}
            project={result?.attributes}
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
  startingPrice,
  featured,
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
                <h5 className="d-flex align-items-center mt-n2">
                  {name} - {type} &nbsp;{' '}
                  {featured && (
                    <span className="text-primary">
                      <GalleryTick variant="Bulk" />
                    </span>
                  )}
                </h5>
                <div className="d-flex text-sm flex-wrap align-items-center mb-2 pe-2">
                  {getLocationFromAddress(projectInfo)}
                </div>
                <div className="d-flex text-sm flex-wrap align-items-center pe-2 text-primary fw-bold">
                  <span className="text-muted">From </span>&nbsp;{' '}
                  {moneyFormatInNaira(startingPrice)} &nbsp;
                </div>
                <div className="d-flex flex-wrap my-2 text-muted">
                  <Link
                    href={{
                      pathname: '/our-projects/[slug]',
                      query: { slug },
                    }}
                    passHref
                  >
                    <a className="text-underline text-muted text-sm me-3">
                      View on Website
                    </a>
                  </Link>
                  <Separator />
                  <Link
                    href={{
                      pathname: '/app/admin/projects/new',
                      query: { id, action: 'edit' },
                    }}
                    passHref
                  >
                    <a className="text-underline text-success text-sm mx-3">
                      Edit Project
                    </a>
                  </Link>
                  <Separator />
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
