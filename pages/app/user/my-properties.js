import Backend from '@/components/admin/Backend';
import Button from '@/components/forms/Button';
import { BuildingIcon } from '@/components/Icons/Icons';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import { UserContext } from 'context/user';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { adminMenu } from '@/data/admin/sideMenu';
import { moneyFormatInNaira } from '@/utils/helpers';
import MakePayment from '@/components/utils/MakePayment';

const MyProperties = () => {
  const { user } = useContext(UserContext);
  console.log('user', user);
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

  console.log('result', result);
  return (
    <Backend title="My Properties">
      <ContentLoader
        Icon={adminMenu['My Properties']}
        query={query}
        results={result}
        name={'My Property'}
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
  const { price, initialPayment } = attributes;
  // return <pre>{JSON.stringify(attributes, null, 2)}</pre>;
  const property = {
    ...attributes.property.data.attributes,
    id: attributes.property.data.id,
  };
  const now = 10;
  return (
    <div className="card rounded m-0">
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
            <h4>
              {property.name}&nbsp;
              <small className="badge text-xs mt-n3 bg-light">
                {attributes.package.split(' ')[0]}
              </small>
            </h4>
            {/* <p className="text-gray-700 font-secondary mb-2">
              <BuildingIcon />
              &nbsp;
              <Link href={`/our-projects/${project.slug}`} passHref>
                <a className="text-reset">{project.name}</a>
              </Link>{' '}
              &nbsp;- {getLocationFromAddress(project)}
            </p> */}
            <p className="text-primary fw-bold text-xl">
              {moneyFormatInNaira(price)}
            </p>
            <hr className="dotted-border" />
            <p className="text-gray-700 mb-3 text-sm mt-4">
              Next Payment:{' '}
              <span className="fw-bold text-danger">Due in 7 days</span>
            </p>
            <div
              className="text-primary text-xs"
              style={{ marginLeft: `${now - 4}%` }}
            >
              {now}%
            </div>
            <div className="progress" style={{ height: '6px' }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-label="Example 1px high"
                style={{ width: `${now}%` }}
                aria-valuenow={now}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>

            <p className="text-gray-700 mt-3 mb-5">
              Current Payment:{' '}
              <span className="fw-bold text-gray-800">
                {moneyFormatInNaira(initialPayment)}
              </span>
            </p>

            <Button
              className="me-3 mb-3 btn-sm"
              href={`/our-properties/test-project/${property.slug}/${property.id}`}
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
