import Backend from '@/components/admin/Backend';
import Button from '@/components/forms/Button';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import { UserContext } from 'context/user';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { getLocationFromAddress, moneyFormatInNaira } from '@/utils/helpers';
import MakePayment from '@/components/utils/MakePayment';
import { differenceInDays, isPastDate } from '@/utils/date-helpers';
import Humanize from 'humanize-plus';
import { Buildings } from 'iconsax-react';
import classNames from 'classnames';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { userMenu } from '@/data/admin/sideMenu';
import SingleProperty from '@/components/common/SinglePropertyNew';
import Section from '@/components/common/Section';

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
        {result?.map((item) => (
          <MySingleProperty key={item.id} {...item} userId={id} />
        ))}
      </ContentLoader>
      <FeaturedProperties />
    </Backend>
  );
};

export default MyProperties;

const MySingleProperty = ({ id, attributes, userId }) => {
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
    totalAmountPaid > 0
      ? Math.min(Math.floor((totalAmountPaid / price) * 100), 100)
      : 0;
  const stillHasPendingPayment = now < 100;
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
              className={classNames('text-xs', {
                'text-success': !stillHasPendingPayment,
                'text-info': stillHasPendingPayment,
              })}
              style={{
                marginLeft: `${
                  now > 10 ? (now < 92 ? Math.max(now - 4, 10) : 92) : now
                }%`,
              }}
            >
              {now}%
            </div>
            <div className="progress" style={{ height: '6px' }}>
              <div
                className={classNames('progress-bar', {
                  'bg-success': !stillHasPendingPayment,
                  'bg-info': stillHasPendingPayment,
                })}
                role="progressbar"
                aria-label="Payment Progress"
                style={{ width: `${now}%` }}
                aria-valuenow={now}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>

            <div className="text-gray-800 mt-3 text-sm">
              {stillHasPendingPayment ? (
                <>
                  Next Payment:{' '}
                  <span className="fw-bold text-gray-800">
                    {moneyFormatInNaira(expectedNextPayment)}
                  </span>
                  <span className="float-end">
                    <OverdueBadge date={paymentDueDate} />
                  </span>
                </>
              ) : (
                <p className="fw-bold text-warning">
                  Payment Completed for this property
                </p>
              )}
            </div>

            <div className="mt-5"></div>
            {stillHasPendingPayment && (
              <MakePayment
                amount={expectedNextPayment}
                info={{ userId, assignedPropertyId: id }}
              />
            )}
            <Button
              className="me-3 mb-3 btn-sm"
              color={classNames({
                warning: stillHasPendingPayment,
                info: !stillHasPendingPayment,
              })}
              href={`/our-properties/${project?.slug || 'project-name'}/${
                property?.slug || 'property-name'
              }`}
            >
              View Property
            </Button>
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

const FeaturedProperties = () => (
  <Section>
    <PaginatedContent
      endpoint={'api/properties'}
      pageName="Featured Property"
      pluralPageName="Featured Properties"
      DataComponent={PropertiesRowList}
      PageIcon={userMenu['My Properties']}
      populate="*"
      limit="6"
    />
  </Section>
);

export const PropertiesRowList = ({ results }) => {
  return (
    <div className="row gy-4">
      {results.map((property, index) => (
        <SingleProperty key={index} {...property} />
      ))}
    </div>
  );
};
