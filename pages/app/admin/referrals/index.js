import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/admin/sideMenu';
import { LocalImage } from '@/components/common/Image';
import Button from '@/components/forms/Button';
import {
  REFERRAL_STATUS_COLOR,
  REFERRAL_STATUS_NAME,
  USER_ROLES,
} from '@/utils/constants';
import { getFullName, moneyFormatInNaira } from '@/utils/helpers';

const Referrals = () => (
  <Backend role={USER_ROLES.ADMIN}>
    <PaginatedContent
      endpoint={'api/referrals'}
      pageName="Referral"
      DataComponent={ReferralsRowList}
      PageIcon={adminMenu['Referrals']}
      populate="*"
      // filterFields={filterReferrals}
    />
  </Backend>
);

export const ReferralsRowList = ({ results, offset }) => {
  console.log('results', results);
  return (
    <div className="container-fluid">
      <Card className="mt-2">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th>S/N</th>
                <th>User</th>
                <th>Referral</th>
                <th>Status</th>
                <th>Reward</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ id, attributes }, index) => (
                <ReferralsSingleRow
                  key={index}
                  number={offset + index + 1}
                  id={id}
                  {...attributes}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export const ReferralsSingleRow = ({ number, ...props }) => {
  const {
    id,
    user,
    referralName,
    email,
    referredUser,
    totalReward,
    accumulatedReward,
    status,
  } = props;
  const currentUser = user?.data?.attributes;
  const referral = referredUser?.data?.attributes;
  return (
    <tr>
      <td>{number}</td>
      <td>
        <LocalImage
          src={currentUser?.profileImage}
          name={`referral-${number}`}
          className="img-md2 me-2"
          rounded
        />
        {getFullName(currentUser)}
      </td>
      <td className="td-block">
        {status > 0 ? referralName : getFullName(referral)}
        <span>{email}</span>
      </td>
      <td>
        <span
          className={`badge badge-dot text-${REFERRAL_STATUS_COLOR[status]}`}
        >
          {REFERRAL_STATUS_NAME[status]}
        </span>
      </td>
      <td className="td-block">
        {moneyFormatInNaira(accumulatedReward)}
        <span>{moneyFormatInNaira(totalReward)}</span>
      </td>
      <td>
        <Button
          color="secondary"
          className="btn-xs"
          href={{
            pathname: '/app/admin/referrals/[id]',
            query: { id },
          }}
        >
          Manage Referral
        </Button>
      </td>
    </tr>
  );
};

export default Referrals;
