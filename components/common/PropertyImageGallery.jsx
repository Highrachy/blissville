import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * PropertyImageGallery displays the main property image and two random gallery images, with a See All button.
 * @param {object} property - The property object containing image and gallery data.
 */
const PropertyImageGallery = ({ property }) => {
  // Compose gallery array
  const gallery = useMemo(
    () => [
      ...(property?.property_galleries?.data || []),
      ...(property?.project?.data?.attributes?.project_galleries?.data || []),
    ],
    [property]
  );

  // Pick 2 random images from gallery
  const randomGalleryImages = useMemo(() => {
    if (!gallery.length) return [];
    if (gallery.length <= 2) return gallery;
    const shuffled = [...gallery].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }, [gallery]);

  const hasGalleryImages = randomGalleryImages.length > 0;
  return (
    <div className="row g-2 align-items-stretch">
      <div
        className={
          hasGalleryImages
            ? 'col-md-8 position-relative'
            : 'col-12 position-relative'
        }
      >
        <Image
          src={property?.image || '/assets/img/bg/investors.jpeg'}
          alt={property?.name || 'Main view of Property'}
          className="img-fluid rounded h-100 w-100 object-fit-cover"
          layout="responsive"
          width={800}
          height={700}
          priority
        />
        {property?.slug === '4-bedroom-waterview-terrace-duplex' && (
          <a
            className="btn btn-sm position-absolute top-0 start-0 m-4 text-white border-0"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // 50% see-through black
              backdropFilter: 'blur(4px)', // adds soft glassy look
            }}
          >
            6 units left
          </a>
        )}
      </div>
      {hasGalleryImages && (
        <div className="col-md-4 d-flex flex-column gap-2">
          {randomGalleryImages[0]?.attributes?.image && (
            <Image
              src={randomGalleryImages[0].attributes.image}
              alt="Gallery Image 1"
              className="img-fluid rounded object-fit-cover flex-fill"
              style={{ height: '50%' }}
              layout="responsive"
              width={400}
              height={350}
            />
          )}
          <div
            className="position-relative flex-fill"
            style={{ height: '50%' }}
          >
            {randomGalleryImages[1]?.attributes?.image && (
              <Image
                src={randomGalleryImages[1].attributes.image}
                alt="Gallery Image 2"
                className="img-fluid rounded object-fit-cover h-100 w-100"
                layout="responsive"
                width={400}
                height={350}
              />
            )}
            <Link href={`#gallery`} passHref>
              <a className="btn btn-info-light btn-sm position-absolute bottom-0 end-0 m-2">
                View Gallery
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyImageGallery;
