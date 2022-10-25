import React from 'react';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/admin/sideMenu';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import {
  INTEREST_STATUS,
  INTEREST_STATUS_NAME,
  USER_ROLES,
} from '@/utils/constants';
import TabContent, { TabContentHeader } from '@/components/admin/TabContent';
import Link from 'next/link';
import { LocalImage } from '@/components/common/Image';
import Separator from '@/components/common/Separator';
import {
  getFullName,
  getMonthlyPayment,
  getPaymentPlan,
} from '@/utils/helpers';
import ProcessButton from '@/components/utils/ProcessButton';

const pageOptions = {
  key: 'interest',
  pageName: 'Interest',
};

const SingleInterest = () => {
  const router = useRouter();
  const { id } = router.query;

  const [query, result] = useSWRQuery({
    name: id ? [pageOptions.key, id] : id,
    endpoint: `api/interests/${id}`,
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
        'fullName',
        'email',
        'phone',
        'paymentPlan',
        'initialPayment',
        'paymentStartDate',
        'monthlyPayment',
        'status',
        'package',
        'action',
      ],
      processField: {
        fullName: () => getFullName(output),
        paymentPlan: (value) => getPaymentPlan(value),
        monthlyPayment: () =>
          getMonthlyPayment(
            output.price,
            output.initialPayment,
            output.paymentPlan
          ),
        status: (value) => INTEREST_STATUS_NAME[value],
        action: () =>
          output.status === 0 && (
            <>
              <ProcessButton
                afterSuccess={() => query.mutate()}
                api={`interests/${id}`}
                buttonColor={'success'}
                buttonSizeClassName="btn-sm"
                modalTitle="Assign Property"
                data={{ status: INTEREST_STATUS.ASSIGNED }}
                modalContent={`Are you sure you want to assign this property to ${getFullName(
                  output
                )}?`}
                successMessage={`The information has been successfully updated`}
              >
                Assign Property
              </ProcessButton>
              &nbsp; &nbsp;
              <ProcessButton
                afterSuccess={() => query.mutate()}
                api={`interests/${id}`}
                buttonColor={'danger'}
                buttonSizeClassName="btn-sm"
                data={{ status: INTEREST_STATUS.CANCELLED }}
                modalContent={`Are you sure you want to cancel this property to ${getFullName(
                  output
                )}?`}
                modalTitle={'Reject Property'}
                successMessage={`The information has been successfully updated`}
              >
                Cancel Interest
              </ProcessButton>
            </>
          ),
      },
      renameField: {
        paymentStartDate: 'Proposed Start Date',
      },
    },
  ];
  const [currentTab, setCurrentTab] = React.useState(allTabs[0].key);

  return (
    <Backend title="Interest" role={USER_ROLES.ADMIN}>
      <ContentLoader
        Icon={adminMenu['Interests']}
        query={query}
        results={result}
        name={pageOptions.pageName}
      >
        <InterestHeader
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          {...result?.attributes}
          id={id}
          query={query}
        />
        <TabContent
          name="interests"
          allTabs={allTabs}
          id={id}
          result={result}
        />
      </ContentLoader>
    </Backend>
  );
};

const InterestHeader = ({
  currentTab,
  setCurrentTab,
  id,
  email,
  phone,
  status,
  ...interestInfo
}) => {
  const property = interestInfo?.property?.data?.attributes;
  return (
    <section className="card mb-5">
      <div className="card-body p-5">
        <div className="d-flex flex-wrap flex-sm-nowrap">
          <div className="">
            <div className="d-block me-3 position-relative">
              <LocalImage
                src={property?.image}
                name={property?.name}
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
                  {getFullName(interestInfo)}
                </h4>
                <div className="d-flex text-sm flex-wrap align-items-center fs-6 mb-2 pe-2">
                  <Link
                    href={{
                      pathname: '/app/admin/projects/[id]',
                      query: { id: property?.project?.data?.id },
                    }}
                    passHref
                  >
                    <a className="text-underline text-muted">
                      {property?.project?.data.attributes?.name}
                    </a>
                  </Link>
                  &nbsp; - &nbsp;
                  <Link
                    href={{
                      pathname: '/app/admin/properties/[id]',
                      query: { id: interestInfo?.property?.data?.id },
                    }}
                    passHref
                  >
                    <a className="text-underline text-muted fw-bold">
                      {property?.name}
                    </a>
                  </Link>
                </div>
                <div className="d-flex flex-wrap fs-6 my-2">
                  <span className="pe-3">{email}</span>
                  <Separator />
                  <span className="ps-3">{phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleInterest;
