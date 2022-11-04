import Backend from '@/components/admin/Backend';
import Button from '@/components/forms/Button';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import { UserContext } from 'context/user';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { adminMenu } from '@/data/admin/sideMenu';
import { getLocationFromAddress, moneyFormatInNaira } from '@/utils/helpers';
import MakePayment from '@/components/utils/MakePayment';
import { differenceInDays, isPastDate } from '@/utils/date-helpers';
import Humanize from 'humanize-plus';
import { Buildings } from 'iconsax-react';

const MyProperties = () => {
  const { user } = useContext(UserContext);
  const id = user?.id;

  const [query, result] = useSWRQuery({
    name: id ? ['assigned-properties', id] : id,
    endpoint: `api/assigned-properties`,
    axiosOptions: {
      params: {
        'filters[user][id][$eq]': id,
        populate: '*',
      },
    },
  });

  return (
    <Backend title="My Properties">
      <ContentLoader
        Icon={<Buildings size="24" variant="Bulk" />}
        query={query}
        results={result}
        name={'Property'}
        noContentText={'You have not been assigned any property yet'}
      >
        {result.map((item) => (
          <SingleProperty key={item.id} {...item} userId={id} />
        ))}
      </ContentLoader>
    </Backend>
  );
};

export default MyProperties;

const SingleProperty = ({ id, attributes, userId }) => {
  const {
    price,
    initialPayment,
    expectedNextPayment,
    paymentDueDate,
    totalAmountPaid,
  } = attributes;
  const property = {
    ...attributes?.property?.data?.attributes,
    id: attributes?.property?.data?.id,
  };
  const project = {
    ...attributes?.project?.data?.attributes,
    id: attributes?.project?.data?.id,
  };
  const now =
    totalAmountPaid > 0 ? Math.floor((totalAmountPaid / price) * 100) : 0;
  return (
    <div className="card rounded m-0 mb-5">
      <div className="row g-0">
        <div className="col-lg-6">
          <div className="img-fill">
            <Image
              src={property.image}
              alt="Hero Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="col-lg-6">
          <aside className="px-5 py-5">
            <div className="d-sm-flex justify-content-sm-between mb-2 mb-sm-3">
              <div>
                <h5 className="mb-0">{property.name}&nbsp;</h5>
                <p className="small mb-2 mb-sm-0">
                  <Link href={`/our-projects/${project.slug}`} passHref>
                    <a className="text-reset">{project.name}</a>
                  </Link>{' '}
                  &nbsp;- {getLocationFromAddress(project, true)}
                </p>
              </div>
              <span className="h6 fw-light">
                <small className="badge text-xs mt-n3 bg-light">
                  {attributes.package.split(' ')[0]}
                </small>
              </span>
            </div>
            <p className="text-primary fw-bold text-xl mb-0">
              {moneyFormatInNaira(price)}
            </p>
            <hr className="dotted-border" />
            <div
              className="text-primary text-xs"
              style={{
                marginLeft: `${now > 10 ? Math.max(now - 4, 10) : now}%`,
              }}
            >
              {now}%
            </div>
            <div className="progress" style={{ height: '6px' }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-label="Payment Progress"
                style={{ width: `${now}%` }}
                aria-valuenow={now}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>

            <p className="text-gray-800 mt-3 text-sm mb-5">
              Next Payment:{' '}
              <span className="fw-bold text-gray-800">
                {moneyFormatInNaira(expectedNextPayment)}
              </span>
              <OverdueBadge date={paymentDueDate} />
            </p>

            <Button
              className="me-3 mb-3 btn-sm"
              href={`/our-properties/${project?.slug || 'project-name'}/${
                property?.slug || 'property-name'
              }/${property.id}`}
            >
              View Property
            </Button>
            <MakePayment
              amount={initialPayment}
              info={{ userId, assignedPropertyId: id }}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export const OverdueBadge = ({ date }) => {
  const days = Math.abs(differenceInDays(date)) || 0;
  const daysInWords = `${days} ${Humanize.pluralize(days, 'day')}`;
  return isPastDate(date) ? (
    <div className="badge badge-overdue badge-overdue__danger">
      Overdue: <strong>{daysInWords} ago</strong>
    </div>
  ) : (
    <div className="badge  badge-overdue badge-overdue__success">
      Due: <strong>{daysInWords}</strong>
    </div>
  );
};
