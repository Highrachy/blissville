import { PROJECT_STATUS_NAME } from '@/utils/constants';
import { getShortDate } from '@/utils/date-helpers';
import { getPrice } from '@/utils/helpers';
import Image from 'next/image';
import React from 'react';
import Button from '../forms/Button';
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaMoneyBillWave,
  FaLayerGroup,
  FaArrowRight,
  FaCheckCircle,
} from 'react-icons/fa';

const SingleProject = ({ id, attributes }) => {
  const {
    name,
    type,
    image,
    city,
    state,
    delivery,
    status,
    startingPrice,
    slug,
  } = attributes;

  const totalUnits = slug === 'blissville-apartments' ? 12 : 14;
  const statusLabel = PROJECT_STATUS_NAME[status] || status;
  const totalPrice = attributes.totalPrice || attributes.maxPrice || startingPrice * 2.5; // fallback for display demo

  return (
    <div className="premium-project-card">
      <div className="row g-0 align-items-stretch">
        {/* ── Image ── */}
        <div className="col-lg-7 position-relative">
          <div className="ppc-image">
            <Image
              src={image}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="ppc-image__img"
              priority
            />
            <div className="ppc-image__overlay" />
          </div>
        </div>

        {/* ── Details ── */}
        <div className="col-lg-5 d-flex">
          <div className="ppc-details">
            {/* Header */}
            <div className="ppc-header">
              <h4 className="ppc-name">{name}</h4>
              <p className="ppc-location">
                <FaMapMarkerAlt />
                <span>{city}, {state}</span>
              </p>
            </div>

            {/* Info rows */}
            <ul className="ppc-info-list">
              <li>
                <span className="ppc-info-label">Property Type</span>
                <span className="ppc-info-value">{type}</span>
              </li>
              <li>
                <span className="ppc-info-label">Total Units</span>
                <span className="ppc-info-value">{totalUnits} Units</span>
              </li>
              <li className="align-items-start">
                <span className="ppc-info-label mt-1">Pricing</span>
                <span className="ppc-info-value ppc-info-value--price text-end">
                  <div className="d-flex align-items-center justify-content-end gap-2 mb-1">
                    <span className="text-muted fw-normal" style={{fontSize: '0.75rem'}}>From</span>
                    <span className="fs-6">{getPrice(startingPrice)}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-end gap-2 opacity-75">
                    <span className="text-muted fw-normal" style={{fontSize: '0.7rem'}}>Total Value Approx.</span>
                    <span style={{fontSize: '0.82rem'}}>{getPrice(totalPrice)}</span>
                  </div>
                </span>
              </li>
              <li>
                <span className="ppc-info-label">Delivery</span>
                <span className="ppc-info-value">{getShortDate(delivery)}</span>
              </li>
              <li>
                <span className="ppc-info-label">Status</span>
                <span className="ppc-info-value">
                  <span className="ppc-status-pill">{statusLabel}</span>
                </span>
              </li>
            </ul>

            {/* CTA */}
            <Button
              href={`/our-projects/${slug}`}
              color="secondary"
              className="ppc-cta"
            >
              View Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
