import React from 'react';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/admin/sideMenu';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import { USER_ROLES } from '@/utils/constants';
import TabContent, { TabContentHeader } from '@/components/admin/TabContent';
import ManageGallery from '@/components/utils/ManageGallery';
import ManageFloorPlan from '@/components/utils/ManageFloorPlan';
import Link from 'next/link';
import { LocalImage } from '@/components/common/Image';
import DeleteButton from '@/components/utils/DeleteButton';
import Separator from '@/components/common/Separator';

const pageOptions = {
  key: 'property',
  pageName: 'Property',
};

const SingleProperty = () => {
  const router = useRouter();
  const { id } = router.query;

  const [query, result] = useSWRQuery({
    name: id ? [pageOptions.key, id] : id,
    endpoint: `api/properties/${id}`,
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
        'totalUnits',
        'availableUnits',
        'baths',
        'beds',
        'toilets',
      ],
    },
    {
      title: 'Gallery',
      Component: () => (
        <>
          <ManageGallery
            type="property"
            id={id}
            data={result?.attributes?.property_galleries?.data}
            query={query}
          />
        </>
      ),
    },
    {
      title: 'Floor Plan',
      Component: () => (
        <>
          <ManageFloorPlan
            id={id}
            data={result?.attributes?.floor_plans?.data}
            query={query}
          />
        </>
      ),
    },
  ];
  const [currentTab, setCurrentTab] = React.useState(allTabs[0].key);

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
  image,
  type,
  ...propertyInfo
}) => {
  const project = propertyInfo?.project?.data?.attributes;
  const projectId = propertyInfo?.project?.data?.id;
  return (
    <section className="card mb-5">
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
                <h4 className="d-flex align-items-center mb-2">{name}</h4>
                <div className="d-flex text-sm flex-wrap align-items-center fs-6 mb-2 pe-2">
                  <Link
                    href={{
                      pathname: '/app/admin/projects/[id]',
                      query: { id: projectId },
                    }}
                    passHref
                  >
                    <a className="text-underline text-muted fw-bold">
                      {project?.name}
                    </a>
                  </Link>
                </div>
                {/* <div className="d-flex text-muted flex-wrap align-items-center fs-6 mb-3 pe-2">
                  <span className="d-flex align-items-center fw-bold text-primary">
                    <GoPrimitiveDot /> {STATUS_NAME[status]}
                  </span>
                </div> */}
                <div className="d-flex flex-wrap fs-6 my-2">
                  <Link
                    href={`/our-properties/${project?.slug || 'project-name'}/${
                      slug || 'property-name'
                    }`}
                    passHref
                  >
                    <a className="text-underline text-muted text-sm me-3">
                      View on Website
                    </a>
                  </Link>
                  <Separator />
                  <Link
                    href={{
                      pathname: '/app/admin/properties/new',
                      query: { id, projectId, action: 'edit' },
                    }}
                    passHref
                  >
                    <a className="text-underline text-success text-sm mx-3">
                      Edit Property
                    </a>
                  </Link>
                  <Separator />
                  <Link
                    href={{
                      pathname: '/app/admin/properties/new',
                      query: { id, projectId, action: 'duplicate' },
                    }}
                    passHref
                  >
                    <a className="text-underline text-info text-sm mx-3">
                      Duplicate Property
                    </a>
                  </Link>
                  <Separator />
                  <DeleteButton
                    afterSuccess={() => query.mutate()}
                    api={`properties/${id}`}
                    buttonSizeClassName="text-danger btn-link text-sm mx-3"
                    buttonColor="none"
                  >
                    Delete Property
                  </DeleteButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProperty;
