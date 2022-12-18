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
import { DashboardTable } from '../dashboard';
import { LocalImage } from '@/components/common/Image';
import Separator from '@/components/common/Separator';

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
  const item = result?.[0] || null;

  return (
    <Backend title="Start Customization">
      <ContentLoader
        Icon={<Buildings size="24" variant="Bulk" />}
        query={query}
        results={result}
        name={'Property'}
        noContentText={'You have not been assigned any property yet'}
      >
        <Header {...item} userId={id} />
        <Summary {...item} userId={id} />
        {customizeData.map((data, index) => (
          <CustomizeRoom {...data} key={index} />
        ))}
      </ContentLoader>
    </Backend>
  );
};

export default MyProperties;

const CustomizeRoom = ({ image, name, description }) => {
  return (
    <div className="card rounded m-0 mb-5">
      <div className="row g-0">
        <div className="col-lg-6">
          <div className="img-fill">
            <Image
              src={`/assets/img/customize/${image}`}
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
                <h5 className="mb-0">{name}</h5>
                <p className="small mb-4 mb-sm-2">{description}</p>
              </div>
            </div>
            <hr className="dotted-border" />
            <div className="mt-4"></div>
            <Button
              href="/app/user/customize-your-home/customize"
              color="success"
              className="btn-sm"
            >
              Start Customization
            </Button>{' '}
            &nbsp;&nbsp;
            <Button href="#" color="primary" className="btn-sm">
              Use Default Customization
            </Button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export const Summary = ({ attributes }) => {
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
  return (
    <DashboardTable title="Overview">
      <tr>
        <th width="300">
          <span className="fw-semibold">Property Price</span>
          <br />
          <span className="fw-light text-gray-700 text-xs">
            {property?.name} - {project?.name}
          </span>
        </th>
        <td className="text-end">
          <span className="text-price">{moneyFormatInNaira(price)}</span>
        </td>
      </tr>
      <tr>
        <th width="300">
          <span className="fw-semibold">Customization Fee</span>
          <br />
          <span className="fw-light text-gray-700 text-xs">
            {attributes?.package}
          </span>
        </th>
        <td className="text-end">
          <span className="text-price">{moneyFormatInNaira(0)}</span>
        </td>
      </tr>
      <tr>
        <th width="300">
          <span className="fw-semibold">Total</span>
          <br />
          <span className="fw-light text-gray-700 text-xs">
            Total Amount to Pay
          </span>
        </th>
        <td className="text-end">
          <span className="text-price">{moneyFormatInNaira(price)}</span>
        </td>
      </tr>
    </DashboardTable>
  );
};

const Header = ({ attributes }) => {
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
  const now = 0;
  const stillHasPendingPayment = now < 100;
  return (
    <section className="card mb-3">
      <div className="card-body p-5">
        <div className="d-flex flex-wrap flex-sm-nowrap">
          <div className="">
            <div className="d-block me-3 position-relative">
              <LocalImage
                src={property.image}
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
                <h5 className="d-flex align-items-center mt-n2">
                  {property.name}
                </h5>
                <div className="d-flex text-sm flex-wrap align-items-center mb-2 pe-2">
                  <Link href={`/our-projects/${project.slug}`} passHref>
                    <a className="text-reset">{project.name}</a>
                  </Link>{' '}
                  &nbsp;- {getLocationFromAddress(project, true)}
                </div>
                <div className="d-flex text-sm flex-wrap align-items-center pe-2 text-primary fw-bold">
                  <span className="text-muted">Customization Price: </span>
                  &nbsp; {moneyFormatInNaira(0)} &nbsp;
                </div>
                <div className="my-2 text-muted">
                  {/* <Link
                    href={`/our-properties/${project?.slug || 'project-name'}/${
                      property?.slug || 'property-name'
                    }/${property.id}`}
                    passHref
                  >
                    <a className="text-underline text-muted text-sm me-3">
                      View on Website
                    </a>
                  </Link>
                  <Separator /> */}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const customizeData = [
  {
    name: 'Living Room',
    image: 'living-room.png',
    description: `A living room is a room in a home that's used for entertaining friends, talking, reading, or watching television. You can also call a living room a lounge, a sitting room, a front room, or a parlor.`,
  },
  {
    name: 'Master Bedroom',
    image: 'master-bedroom.png',
    description: `The master bedroom typically has a master bathroom that's attached to it. The master bathroom is often equipped with a full bath (shower and bathtub combination), toilet, and sink for private use.`,
  },
  {
    name: `Visitor's Room`,
    image: 'visitor.png',
    description: `A visitor's room is a room in a home that's used for entertaining friends, talking, reading, or watching television. You can also call a living room a lounge, a sitting room, a front room, or a parlor.`,
  },
  {
    name: `Children's Room`,
    image: 'children.png',
    description: `The children's room is a room in a home that's used for as the resting bedroom for the kids. You can also call a living room a lounge, a sitting room, a front room, or a parlor.`,
  },
  {
    name: 'Kitchen',
    image: 'kitchen.png',
    description: `A kitchen is a place used to prepare foods and entertaining friends, wash dishes and prepare fast snakes. You can also call a living room a lounge, a sitting room, a front room, or a parlor.`,
  },
];
