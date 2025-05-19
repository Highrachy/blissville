import React, { useContext } from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
// import { filterInterests } from '@/utils/filters';
import { getShortDate } from '@/utils/date-helpers';
import { EmptyWalletChange } from 'iconsax-react';
import Button from '@/components/forms/Button';
import { moneyFormatInNaira } from '@/utils/helpers';
import { LocalImage } from '@/components/common/Image';
import { UserContext } from 'context/user';
import TopTitle from '@/components/admin/TopTitle';

const Interests = () => {
  const { user } = useContext(UserContext);
  return (
    <Backend>
      <TopTitle>Wishlist</TopTitle>
      <PaginatedContent
        endpoint={'api/interests'}
        pageName="Interest"
        DataComponent={InterestsRowList}
        PageIcon={<EmptyWalletChange />}
        populate="deep"
        hideTitle
        params={{
          'filters[email][$eq]': user?.email,
          'filters[status][$eq]': 0,
        }}
      />
    </Backend>
  );
};

export const InterestsRowList = ({ results, offset, attachment }) => {
  return (
    <div className="container-fluid">
      <Card className="mt-2">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Property</th>
                <th>Initial Payment</th>
                <th>Package</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ id, attributes }, index) => (
                <InterestsSingleRow
                  key={index}
                  number={offset + index + 1}
                  id={id}
                  {...attributes}
                  attachment={attachment}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export const InterestsSingleRow = ({
  number,
  id,
  price,
  paymentStartDate,
  ...interestInfo
}) => {
  const property = {
    ...interestInfo?.property.data.attributes,
    id: interestInfo?.property.data.id,
  };
  const project = {
    ...property?.project?.data?.attributes,
  };
  return (
    <tr>
      <td>{number}</td>
      <td>
        <LocalImage
          src={property.image}
          name={property.name}
          className="img-md2 me-2"
          rounded
        />
        {property.name}
      </td>
      <td>{getShortDate(paymentStartDate)}</td>
      <td className="fw-bold text-xs">{interestInfo.package.split(' ')[0]}</td>

      <td>
        <span className="fw-bold text-lg text-primary">
          {moneyFormatInNaira(price)}
        </span>
      </td>
      <td>
        <Button
          color="info"
          className="btn-xs"
          href={`/our-properties/${project?.slug || 'project-name'}/${
            property?.slug || 'property-name'
          }`}
        >
          View Property
        </Button>
      </td>
    </tr>
  );
};

export default Interests;
