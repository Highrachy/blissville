import { PROJECT_STATUS_NAME } from '@/utils/constants';
import Image from 'next/image';
import {
  FaCamera,
  FaVideo,
  FaStreetView,
  FaLayerGroup,
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaRegCalendarAlt,
} from 'react-icons/fa';
import { FaMap } from 'react-icons/fa6';

export default function ProjectHeaderSection({
  image,
  type,
  city,
  state,
  startingPrice: price,
  delivery,
  status,
  hasGallery = false,
  hasVideo = false,
  hasLocationMap = false,
}) {
  return (
    <section className="project-header-section position-relative">
      {/* Image Banner */}
      <div className="position-relative">
        <div className="mb-3 img-project img-fill mb-md-5">
          <Image
            src={image}
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            className="img-fluid"
          />
        </div>

        {/* Top Right Action Buttons */}
        <div className="position-absolute bottom-0 end-0 m-3 d-flex flex-wrap gap-2 justify-content-end">
          {hasGallery && (
            <a
              className="btn d-flex align-items-center gap-2 btn-info-light px-3 py-2 rounded shadow-sm"
              href="#gallery"
            >
              <FaCamera />
              <span className="d-none d-sm-inline">Gallery</span>
            </a>
          )}
          {hasVideo && (
            <a
              className="btn d-flex align-items-center gap-2 btn-primary-light px-3 py-2 rounded shadow-sm"
              href="#video"
            >
              <FaVideo />
              <span className="d-none d-sm-inline">Video</span>
            </a>
          )}
          {hasLocationMap && (
            <a
              className="btn d-flex align-items-center gap-2 btn-warning-light  px-3 py-2 rounded shadow-sm"
              href="#location-map"
            >
              <FaMap />
              <span className="d-none d-sm-inline">Map</span>
            </a>
          )}
        </div>
      </div>

      {/* Info Grid */}
      <div className="bg-white mb-5">
        <div className="d-flex flex-wrap justify-content-between align-items-start">
          <ProjectInfoItem
            icon={<FaBuilding size={18} />}
            label="Property Type"
            value={type || '-'}
            className="info-item"
          />
          <ProjectInfoItem
            icon={<FaMapMarkerAlt size={18} />}
            label="Location"
            value={city && state ? `${city}, ${state}` : '-'}
            className="info-item"
          />
          <ProjectInfoItem
            icon={<FaMoneyBillWave size={18} />}
            label="Prices From"
            value={price || '-'}
            className="info-item"
          />
          <ProjectInfoItem
            icon={<FaLayerGroup size={18} />}
            label="Status"
            value={PROJECT_STATUS_NAME[status] || '-'}
            className="info-item"
          />
          <ProjectInfoItem
            icon={<FaRegCalendarAlt size={18} />}
            label="Proposed Delivery"
            value={delivery || '-'}
            className="info-item"
          />
        </div>
      </div>
    </section>
  );
}

function ProjectInfoItem({ icon, label, value }) {
  return (
    <div className="py-md-0 py-4">
      <div className="d-flex align-items-start">
        <span className="me-2 d-flex align-items-center fw-light text-sm text-muted">
          {icon}
        </span>
        <div>
          <div className="text-muted small fw-light text-xs mb-1">{label}</div>
          <div className="fw-bold text-gray pe-3 pe-md-0">{value}</div>
        </div>
      </div>
    </div>
  );
}
