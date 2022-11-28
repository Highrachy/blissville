import React from 'react';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/admin/sideMenu';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import { REFERRAL_STATUS_NAME, USER_ROLES } from '@/utils/constants';
import TabContent from '@/components/admin/TabContent';
import { LocalImage } from '@/components/common/Image';
import Separator from '@/components/common/Separator';
import { getFullName, moneyFormatInNaira } from '@/utils/helpers';
import UpdateReferralButton from '@/components/utils/UpdateReferralButton';

const pageOptions = {
  key: 'referral',
  pageName: 'Referral',
};

const SingleReferral = () => {
  const router = useRouter();
  const { id } = router.query;

  const [query, result] = useSWRQuery({
    name: id ? [pageOptions.key, id] : id,
    endpoint: `api/referrals/${id}`,
    axiosOptions: {
      params: {
        populate: 'deep',
      },
    },
  });

  const output = result?.attributes;

  const allTabs = [
    {
      title: 'Overview',
      fields: [
        'referralName',
        'referredBy',
        'email',
        'status',
        'totalReward',
        'accumulatedReward',
        'referralPercentage',
        'property',
      ],
      processField: {
        referredBy: () => getFullName(output?.user?.data?.attributes),
        referralPercentage: () => (
          <UpdateReferralButton
            id={id}
            result={output}
            query={query}
            table="referrals"
          />
        ),
        accumulatedReward: (value) => (
          <span className="fw-bold text-lg text-primary">
            {moneyFormatInNaira(value)}
          </span>
        ),
        totalReward: (value) => (
          <span className="fw-bold text-lg text-primary">
            {moneyFormatInNaira(value)}
          </span>
        ),
        initialPayment: (value) => (
          <span className="fw-semibold text-md">
            {moneyFormatInNaira(value)}
          </span>
        ),
        status: (value) => REFERRAL_STATUS_NAME[value],
        property: () => {
          const assignedProperty = output?.assignedProperty?.data?.attributes;
          const property = assignedProperty?.property?.data?.attributes;
          const project = property?.project?.data?.attributes;
          if (!assignedProperty) return 'Not Assigned';
          return (
            <span className="fw-semibold text-md">
              {project.name} ({property?.name}) -{' '}
              <strong className="text-primary">
                {moneyFormatInNaira(assignedProperty.price)}
              </strong>
            </span>
          );
        },
      },
    },
  ];
  const [currentTab, setCurrentTab] = React.useState(allTabs[0].key);

  return (
    <Backend title="Referral" role={USER_ROLES.ADMIN}>
      <ContentLoader
        Icon={adminMenu['Referrals']}
        query={query}
        results={result}
        name={pageOptions.pageName}
      >
        <ReferralHeader
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          {...result?.attributes}
          id={id}
          query={query}
        />
        <TabContent
          name="referrals"
          allTabs={allTabs}
          id={id}
          result={result}
        />
      </ContentLoader>
    </Backend>
  );
};

const ReferralHeader = ({ currentTab, setCurrentTab, id, ...referralInfo }) => {
  const user = referralInfo?.user?.data?.attributes;
  const referredUser = referralInfo?.referredUser?.data?.attributes;

  return (
    <section className="card mb-5">
      <div className="card-body p-5">
        <div className="d-flex flex-wrap flex-sm-nowrap">
          <div className="">
            <div className="d-block me-3 position-relative">
              <LocalImage
                src={user?.profileImage}
                name={user?.firstName}
                className="img-xl"
                rounded
                responsiveImage={false}
              />
            </div>
          </div>
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start flex-wrap">
              <div className="d-flex flex-column">
                <h4 className="d-flex align-items-center">
                  {getFullName(user)}
                </h4>
                <div className="d-flex flex-wrap fs-6 my-2">
                  <span className="pe-3">{user.email}</span>
                  <Separator />
                  <span className="ps-3">{user.phone}</span>
                </div>
                {referredUser && (
                  <div className="d-flex flex-wrap fs-6 my-2">
                    <span className="pe-3">
                      Referred{' '}
                      <span className="text-secondary fw-bold">
                        {getFullName(referredUser)}
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleReferral;
