import Image from 'next/image';
import React from 'react';
import Button from '../forms/Button';
import { BathIcon, BedIcon, SizeIcon } from '../Icons/Icons';

const SingleProperty = ({ img }) => (
  <div className="col-md-4 col-sm-12">
    <div className="property-listing overflow-hidden bg-gray-50 card">
      <div className="img-wrapper">
        {/* <Overlay> */}
        <Image
          src={`/assets/img/property/property${img}.jpeg`}
          alt="Hero Image"
          width={636}
          height={432}
          className="card-img-top"
        />
        {/* </Overlay> */}
      </div>
      <div className="card-body p-4">
        <div className="row">
          <h5 className="card-title fw-medium">4 Bedroom Maisonettes</h5>
          <div className="text-gray-700 text-sm font-secondary fw-medium">
            Blissville Duos - Lekki, Lagos
          </div>
          <div className="text-lg text-primary fw-bold">₦ 74,000,000</div>
        </div>

        <hr className="dotted-border" />

        <div className="text-gray-700 text-sm font-secondary fw-medium">
          <span className="pe-md-3 pe-2">
            <span className="text-gray-600">
              <SizeIcon />
            </span>{' '}
            255 Msq
          </span>
          <span className="px-md-3 px-2">
            <span className="text-gray-600">
              <BedIcon />
            </span>{' '}
            4 beds
          </span>
          <span className="px-2 px-md-3">
            <span className="text-gray-600">
              <BathIcon />
            </span>{' '}
            5 baths
          </span>
        </div>

        <Button
          className="mt-md-5 mt-4 btn-sm px-4 py-2 text-white text-sm fw-medium"
          href="/our-properties/3-bedroom-apartments"
        >
          View Property
        </Button>
      </div>
    </div>
  </div>
);

export default SingleProperty;
