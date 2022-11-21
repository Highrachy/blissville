import React from 'react';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/admin/sideMenu';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import {
  USER_STATUS,
  USER_STATUS_NAME,
  USER_ROLES,
  ROLE_NAME,
} from '@/utils/constants';
import TabContent, { TabContentHeader } from '@/components/admin/TabContent';
import Link from 'next/link';
import { LocalImage } from '@/components/common/Image';
import Separator from '@/components/common/Separator';
import {
  getFullName,
  getMonthlyPayment,
  getPaymentPlan,
  moneyFormatInNaira,
} from '@/utils/helpers';
import ProcessButton from '@/components/utils/ProcessButton';

const pageOptions = {
  key: 'user',
  pageName: 'User',
};

const SingleUser = () => {
  const router = useRouter();
  const { id } = router.query;

  const [query, result] = useSWRQuery({
    name: id ? [pageOptions.key, id] : id,
    endpoint: `api/users/${id}`,
    axiosOptions: {
      params: {
        populate: 'deep',
      },
    },
  });

  const allTabs = [
    {
      title: 'Overview',
      fields: [
        'title',
        'firstName',
        'lastName',
        'email',
        'phone',
        'confirmed',
        'blocked',
        'createdAt',
        'updatedAt',
      ],
      processField: {
        fullName: () => getFullName(output),
        // action: () =>
        //   output.status === 0 && (
        //     <>
        //       <ProcessButton
        //         afterSuccess={() => query.mutate()}
        //         api={`users/${id}`}
        //         buttonColor={'success'}
        //         buttonSizeClassName="btn-sm"
        //         modalTitle="Assign Property"
        //         data={{ status: USER_STATUS.ASSIGNED }}
        //         modalContent={`Are you sure you want to assign this property to ${getFullName(
        //           output
        //         )}?`}
        //         successMessage={`The information has been successfully updated`}
        //       >
        //         Assign Property
        //       </ProcessButton>
        //       &nbsp; &nbsp;
        //       <ProcessButton
        //         afterSuccess={() => query.mutate()}
        //         api={`users/${id}`}
        //         buttonColor={'danger'}
        //         buttonSizeClassName="btn-sm"
        //         data={{ status: USER_STATUS.CANCELLED }}
        //         modalContent={`Are you sure you want to cancel this property to ${getFullName(
        //           output
        //         )}?`}
        //         modalTitle={'Reject Property'}
        //         successMessage={`The information has been successfully updated`}
        //       >
        //         Cancel User
        //       </ProcessButton>
        //     </>
        //   ),
      },
    },
  ];
  const [currentTab, setCurrentTab] = React.useState(allTabs[0].key);

  return (
    <Backend title="User" role={USER_ROLES.ADMIN}>
      <ContentLoader
        Icon={adminMenu['Users']}
        query={query}
        results={result}
        name={pageOptions.pageName}
      >
        <UserHeader
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          {...result}
          id={id}
          query={query}
        />
        <TabContent
          name="users"
          allTabs={allTabs}
          id={id}
          result={{ attributes: result }}
        />
      </ContentLoader>
    </Backend>
  );
};

const UserHeader = ({
  currentTab,
  setCurrentTab,
  id,
  profileImage,
  email,
  phone,
  status,
  permission,
  ...userInfo
}) => {
  const property = userInfo?.property?.data?.attributes;
  return (
    <section className="card mb-5">
      <div className="card-body p-5">
        <div className="d-flex flex-wrap flex-sm-nowrap">
          <div className="">
            <div className="d-block me-3 position-relative">
              <LocalImage
                src={profileImage}
                name={userInfo.firstName}
                className="img-xl"
                rounded
                responsiveImage={false}
              />
            </div>
          </div>
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start flex-wrap">
              <div className="d-flex flex-column">
                <h4 className="d-flex align-items-center mb-1">
                  {getFullName(userInfo)}
                </h4>
                <div className="d-flex flex-wrap fs-6 my-2">
                  <span className="pe-3">{email}</span>
                  <Separator />
                  <span className="ps-3">{phone}</span>
                </div>
                <div className="d-flex text-sm flex-wrap align-items-center fs-6 mb-2 pe-2">
                  {ROLE_NAME[permission]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleUser;
