import React from 'react';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/admin/sideMenu';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import Button from '@/components/forms/Button';
import { getLocationFromAddress } from '@/utils/helpers';
import classNames from 'classnames';
import { GoPrimitiveDot } from 'react-icons/go';
import { Location } from 'iconsax-react';
import { ROLE_NAME, USER_ROLES } from '@/utils/constants';
import TabContent, { TabContentHeader } from '@/components/admin/TabContent';
import ManageGallery from '@/components/utils/ManageGallery';

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
    // {
    //   title: 'Gallery',
    //   fields: [],
    //   Component: () => <ManageGallery title="Gallery" />,
    // },
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
      </div>
    </section>
  );
};

export default SingleProperty;
