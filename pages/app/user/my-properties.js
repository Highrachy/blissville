import Backend from '@/components/admin/Backend';
import Button from '@/components/forms/Button';
import Image from 'next/image';
import React from 'react';

const MyProperties = () => {
  return (
    <Backend title="My Properties">
      <SingleProperty />
    </Backend>
  );
};

export default MyProperties;

const SingleProperty = ({ type = 1 }) => {
  const now = 67;
  return (
    <div className="card rounded m-0">
      <div className="row g-0">
        <div className="col-lg-6">
          <div className="img-fill">
            <Image
              src={`/assets/img/property/property${type}.jpeg`}
              alt="Hero Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="col-lg-6">
          <aside className="px-5 py-5">
            <h4>
              3 Bedroom Apartments{' '}
              <small className="badge bg-light">Shell</small>
            </h4>
            <p className="text-gray-700 font-secondary mb-2">
              Blissville Duos - Lekki, Lagos
            </p>
            <p className="text-primary fw-bold text-xl">₦ 40,000,000</p>
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
              <span className="fw-bold text-gray-800">₦ 18,000,000</span>
            </p>

            <Button
              href="/our-projects/test"
              className="me-3 mb-3 btn-sm"
              color="secondary"
            >
              View Project
            </Button>
            <Button
              href="/our-projects/test"
              className="me-3 btn-sm"
              color="warning"
            >
              Customize Project
            </Button>
          </aside>
        </div>
      </div>
    </div>
  );
};
