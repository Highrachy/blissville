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
          <span className={`property-badge ${isSoldOut ? 'badge-sold' : 'badge-featured'}`}>
            {isSoldOut ? 'SOLD OUT' : 'FEATURED'}
          </span>
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
              <span className="location-text">{getLocationFromAddress(project, true)}</span>
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

          <div className="pt-2">
            <Link href={`/our-properties/${project?.slug || 'project-name'}/${slug || 'property-name'}`} passHref>
              <a className="property-details-link d-inline-flex align-items-center gap-2">
                <span>View Details</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="btn-arrow">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProperty;

