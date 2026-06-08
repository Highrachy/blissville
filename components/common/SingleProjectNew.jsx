import { PROJECT_STATUS_NAME } from '@/utils/constants';
import { getShortDate } from '@/utils/date-helpers';
import { getPrice } from '@/utils/helpers';
import Image from 'next/image';
import React from 'react';
import Button from '../forms/Button';
import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

const getStatusIndicatorColor = (status) => {
  const mapping = {
    '0': '#eab308', // IN_VIEW -> Vibrant Gold
    '1': '#a855f7', // STARTED -> Purple
    '2': '#06b6d4', // IN_PROGRESS -> Cyan
    '3': '#3b82f6', // ALMOST_COMPLETED -> Blue
    '4': '#10b981', // COMPLETED -> Vibrant Emerald Green
    '5': '#ef4444', // NOT_AVAILABLE -> Red
  };
  return mapping[status] || '#3b82f6';
};

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
  const dotColor = getStatusIndicatorColor(status);
  const totalPrice = attributes.totalPrice || attributes.maxPrice || startingPrice * 2.5; // fallback for display demo

  return (
    <div className="premium-project-card">
      <style>{`
        @keyframes status-pulse {
          0% {
            transform: scale(0.95);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
            box-shadow: 0 0 12px ${dotColor};
          }
          100% {
            transform: scale(0.95);
            opacity: 0.6;
          }
        }
      `}</style>
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
            
            {/* World-Class Glassmorphic Badge */}
            <div 
              className="position-absolute top-0 start-0 m-3 z-5 d-flex align-items-center gap-2"
              style={{
                padding: '0.45rem 0.95rem',
                borderRadius: '30px',
                background: 'rgba(15, 23, 42, 0.8)', // Deep slate translucent
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
              }}
            >
              <span 
                className="d-inline-block"
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: dotColor,
                  boxShadow: `0 0 8px ${dotColor}`,
                  animation: 'status-pulse 2s infinite ease-in-out'
                }}
              />
              <span 
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  lineHeight: '1',
                }}
              >
                {statusLabel}
              </span>
            </div>
          </div>
        </div>

        {/* ── Details ── */}
        <div className="col-lg-5 d-flex">
          <div className="ppc-details">
            {/* Header */}
            <div className="ppc-header">
              <h4 className="ppc-name">{name}</h4>
              <p className="ppc-location">
                <FaMapMarkerAlt className="text-primary me-1" />
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
              <li>
                <span className="ppc-info-label">Starting Price</span>
                <span className="ppc-info-value ppc-info-value--price fs-6">{getPrice(startingPrice)}</span>
              </li>
              <li>
                <span className="ppc-info-label">Total Price</span>
                <span className="ppc-info-value fs-6 fw-bold">{getPrice(totalPrice)}</span>
              </li>
              <li>
                <span className="ppc-info-label">Delivery</span>
                <span className="ppc-info-value">{getShortDate(delivery)}</span>
              </li>
            </ul>

            {/* CTA */}
            <Button
              href={`/our-projects/${slug}`}
              color="secondary"
              className="ppc-cta d-flex align-items-center justify-content-center gap-2"
            >
              <span>View Project</span>
              <FaArrowRight className="btn-arrow" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
