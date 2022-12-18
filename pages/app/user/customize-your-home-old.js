import Backend from '@/components/admin/Backend';
import Button from '@/components/forms/Button';
import { Building } from 'iconsax-react';
import Image from 'next/image';
import React from 'react';
import { Badge, ProgressBar } from 'react-bootstrap';

const CustomizeYourHome = () => {
  return (
    <Backend title="Customize Your Home">
      <SingleProperty now="45" />
      <SingleProperty now="0" type="2" />
    </Backend>
  );
};

export default CustomizeYourHome;

const SingleProperty = ({ type = 1, now }) => {
  return (
    <div className="card rounded mb-4">
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
              <Building variant="Bulk" color="#66768E" /> &nbsp; Blissville Duos
              - Lekki, Lagos
            </p>
            <p className="text-primary fw-bold text-xl">₦ 40,000,000</p>
            <div
              className="text-primary text-xs"
              style={{ marginLeft: `${now}%` }}
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

            <Button
              href="/our-projects/3-bedroom-apartments"
              className="me-3 mt-5"
              color="secondary"
            >
              Start Customization
            </Button>
          </aside>
        </div>
      </div>
    </div>
  );
};
