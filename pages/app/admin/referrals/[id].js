import React from 'react';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/admin/sideMenu';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import { REFERRAL_STATUS_NAME, USER_ROLES } from '@/utils/constants';
import TabContent, { TabContentHeader } from '@/components/admin/TabContent';
import { LocalImage } from '@/components/common/Image';
import Separator from '@/components/common/Separator';
import { getFullName, moneyFormatInNaira } from '@/utils/helpers';
import FormikButton from '@/components/forms/FormikButton';
import Input from '@/components/forms/Input';
import FormikModalButton from '@/components/utils/FormikModalButton';

const pageOptions = {
  key: 'referral',
  pageName: 'Referral',
};

const SingleReferral = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = async (values, actions) => {
    return null;
    // const payload = {
    //   ...values,
    //   visitDate: values.visitDate.date,
    //   visiting: `${visiting}`,
    // };
    // try {
    //   axios({
    //     method: 'post',
    //     url: `${process.env.NEXT_PUBLIC_API_URL}/api/visitations`,
    //     data: { data: payload },
    //   })
    //     .then(function (response) {
    //       const { status } = response;
    //       if (statusIsSuccessful(status)) {
    //         toast.success('Visitation has been successfully scheduled');
    //         actions.resetForm({});
    //         actions.setSubmitting(false);
    //         return true;
    //       }
    //     })
    //     .catch(function (error) {
    //       toast.error(getError(error));
    //     });
    // } catch (error) {
    //   toast.error(getError(error));
    // }
  };

  const [query, result] = useSWRQuery({
    name: id ? [pageOptions.key, id] : id,
    endpoint: `api/referrals/${id}`,
    axiosOptions: {
      params: {
        populate: '*',
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
      ],
      processField: {
        referredBy: () => getFullName(output?.user?.data?.attributes),
        referralPercentage: () => (
          <>
            2.5% &nbsp;{' '}
            <FormikModalButton
              color="info"
              className="btn text-white btn-xs"
              name="referral-bonus"
              schema={{}}
              initialValues={{}}
              modalContent={
                <>
                  <Input name="percentage" label="Referral Percentage" />
                  <FormikButton color="secondary" className="mt-3">
                    Update Referral Percentage
                  </FormikButton>
                </>
              }
              handleSubmit={handleSubmit}
            >
              Update
            </FormikModalButton>
          </>
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
