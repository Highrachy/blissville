import Link from 'next/link';
import Image from 'next/image';
import { FaBath, FaBed, FaVectorSquare } from 'react-icons/fa';
import Button from '../forms/Button';
import { moneyFormatInNaira } from '@/utils/helpers';

export const CompactPropertyCard = ({ id, attributes, projectSlug }) => {
  const { name, slug, image, beds, baths, size, price, availableUnits } =
    attributes;

  const isSoldOut = availableUnits === 0;
  const href = `/our-properties/${projectSlug || 'project-name'}/${
    slug || 'property-name'
  }`;

  return (
    <div className="col-12 mb-4">
      <div className="card border shadow-sm overflow-hidden">
        <div className="row g-0 align-items-stretch">
          {/* Image column */}
          <div className="col-12 col-md-5">
            <Link href={href} passHref>
              <a className="cp-image-container d-block position-relative">
                <Image
                  src={image}
                  alt={name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-0"
                />
              </a>
            </Link>
          </div>

          {/* Content column */}
          <div className="col-12 col-md-7 p-4 d-flex flex-column">
            <div>
              <h5 className="fw-medium mb-2">{name}</h5>
              <div
                className={`h4 fw-bold mb-4 ${
                  isSoldOut ? 'text-muted' : 'text-primary'
                }`}
              >
                {isSoldOut ? 'SOLD OUT' : moneyFormatInNaira(price)}
              </div>
            </div>

            <div className="mb-4">
              <div className="d-flex flex-wrap text-muted small">
                <div className="d-flex align-items-center me-3 mb-2">
                  <FaVectorSquare className="me-2" />
                  {size} Msq
                </div>
                <div className="d-flex align-items-center me-3 mb-2">
                  <FaBed className="me-2" />
                  {beds} Bed{beds > 1 ? 's' : ''}
                </div>
                <div className="d-flex align-items-center mb-2">
                  <FaBath className="me-2" />
                  {baths} Bath{baths > 1 ? 's' : ''}
                </div>
              </div>
            </div>

            <Button
              color="secondary"
              className="btn-wide align-self-start mt-auto"
              href={href}
            >
              View Property
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactPropertyCard;
