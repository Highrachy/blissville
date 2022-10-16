import { getLocationFromAddress, moneyFormatInNaira } from '@/utils/helpers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Button from '../forms/Button';
import { BathIcon, BedIcon, SizeIcon } from '../Icons/Icons';

const SingleProperty = ({ id, attributes }) => {
  const { name, slug, image, beds, baths, size, price } = attributes;
  const project = attributes.project.data.attributes;
  return (
    <div className="col-md-4 col-sm-12">
      <div className="property-listing overflow-hidden bg-gray-50 card">
        <div className="img-wrapper">
          <Image
            src={image}
            alt="Hero Image"
            width={636}
            height={432}
            objectFit="cover"
            className="card-img-top"
          />
        </div>
        <div className="card-body p-4">
          <div className="row">
            <h5 className="card-title fw-medium mb-0">{name}</h5>
            <div className="text-gray-700 text-sm font-secondary fw-medium">
              <Link href={`/our-projects/${project.slug}`} passHref>
                <a className="text-reset">{project.name}</a>
              </Link>{' '}
              - {getLocationFromAddress(project, true)}
            </div>
            <div className="text-lg text-primary fw-bold">
              {moneyFormatInNaira(price)}
            </div>
          </div>

          <hr className="dotted-border" />

          <div className="text-gray-700 text-sm font-secondary fw-medium">
            <span className="pe-md-3 pe-2">
              <span className="text-gray-600">
                <SizeIcon />
              </span>{' '}
              {size} Msq
            </span>
            <span className="px-md-3 px-2">
              <span className="text-gray-600">
                <BedIcon />
              </span>{' '}
              {beds} beds
            </span>
            <span className="px-2 px-md-3">
              <span className="text-gray-600">
                <BathIcon />
              </span>{' '}
              {baths} baths
            </span>
          </div>

          <Button
            className="mt-md-5 mt-4 btn-sm px-4 py-2 text-white text-sm fw-medium"
            href={`/our-properties/${project.slug}/${slug}/${id}`}
          >
            View Property
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleProperty;
