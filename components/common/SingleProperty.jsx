import { getLocationFromAddress, moneyFormatInNaira } from '@/utils/helpers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Button from '../forms/Button';
import { BathIcon, BedIcon, SizeIcon } from '../Icons/Icons';
const SingleProperty = ({ id, attributes }) => {
  const { name, slug, image, beds, baths, size, price, availableUnits } =
    attributes;
  const isSoldOut = availableUnits === 0;
  const project = attributes.project.data.attributes;
  return (
    <div className="col-lg-6 col-md-6 col-sm-12">
      <div className="property-card-premium card border-0">
        <div className="img-wrapper position-relative overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={636}
            height={432}
            objectFit="cover"
            className="card-img-top property-card-img"
          />
          {isSoldOut && (
            <span
              className={`property-badge ${isSoldOut ? 'badge-sold' : 'badge-featured'}`}
            >
              {isSoldOut ? 'SOLD OUT' : 'AVAILABLE'}
            </span>
          )}
        </div>
        <div className="card-body p-4 d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
              <h3 className="property-title mb-0">{name}</h3>
              <div className={`property-price ${isSoldOut ? 'sold-out' : ''}`}>
                {isSoldOut ? 'SOLD OUT' : moneyFormatInNaira(price)}
              </div>
            </div>

            <div className="property-location mb-3">
              <Link href={`/our-projects/${project.slug}`} passHref>
                <a className="project-link">{project.name}</a>
              </Link>
              <span className="separator mx-2">•</span>
              <span className="location-text">
                {getLocationFromAddress(project, true)}
              </span>
            </div>

            <div className="property-amenities d-flex align-items-center gap-3 mb-3">
              <div className="amenity-item">
                <SizeIcon />
                <span className="amenity-text">{size} Msq</span>
              </div>
              <span className="dot-separator">•</span>
              <div className="amenity-item">
                <BedIcon />
                <span className="amenity-text">{beds} Beds</span>
              </div>
              <span className="dot-separator">•</span>
              <div className="amenity-item">
                <BathIcon />
                <span className="amenity-text">{baths} Baths</span>
              </div>
            </div>
          </div>

          <div>
            <Link
              href={`/our-properties/${project?.slug || 'project-name'}/${slug || 'property-name'}`}
              passHref
            >
              <a
                className="btn btn-secondary mt-md-3 mt-2 btn-sm px-4 py-2 text-white text-sm fw-medium"
                role="button"
              >
                View Property
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProperty;
