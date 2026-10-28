import React from 'react';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import Button from '@/components/forms/Button';
import Section from '@/components/common/Section';
import { FeaturedProperties } from '@/components/layouts/FeaturedProperties';
import ProjectsSlideshow from '@/components/layouts/ProjectsSlideshow';
import { getPackageDisplayName } from '@/data/packages';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  getLocationFromAddress,
  moneyFormatInNaira,
} from '@/utils/helpers';
import {
  BrochureButton,
  FeatureList,
  Gallery,
  LocationMapSection,
  NeighborhoodList,
  VideoContainer,
} from 'pages/our-projects/[slug]';
import axios from 'axios';
import BuyNowButton from '@/components/utils/BuyNowButton';
import {
  PROJECT_STATUS,
  PROJECT_STATUS_NAME,
} from '@/utils/constants';
import PropertyImageGallery from '@/components/common/PropertyImageGallery';
import OverviewCard from '@/components/common/OverviewCard';
import { DescriptionParagraphs } from '../our-projects/[slug]';
import { ProjectInterestContent } from '@/components/common/ProjectInterestModal';
import FAQsAccordion from '@/components/common/FAQsAccordion';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import { FaBath, FaBed, FaCar, FaLayerGroup } from 'react-icons/fa6';
import { FaThLarge } from 'react-icons/fa';
import { getShortDate } from '@/utils/date-helpers';
import CompactPropertyCard from '@/components/common/CompactPropertyCard';
import { ProjectInfoItem } from '@/components/common/ProjectHeaderSection';
import CustomPlan from '@/components/common/CustomPlan';
import CustomPlanReview from '@/components/common/CustomPlan2';
import SeoHead from '@/components/utils/SeoHead';
import { trackMetaEvent } from '@/utils/metaPixel';

export default function SinglePropertyPage({
  property,
  projects,
  similarProperties,
  featuredProperties,
}) {
  const router = useRouter();

  const isReviewMode = 'review' in router.query;

  const project = property?.project?.data?.attributes;
  const projectName = project?.name || 'Blissville Project';

  React.useEffect(() => {
    if (property?.name) {
      trackMetaEvent('ViewContent', {
        content_name: property.name,
        content_type: 'property',
        content_category: projectName,
        value: property?.price || undefined,
        currency: 'NGN',
      });
    }
  }, [property?.name, property?.price, projectName]);

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const faqs = project?.faqs?.data || [];
  const allFaqs = faqs?.map(({ attributes: { question, answer } }) => ({
    question,
    answer,
  }));
  const location =
    project?.city && project?.state
      ? `${project.city}, ${project.state}`
      : 'Lagos, Nigeria';

  const canonicalUrl = `https://www.blissville.com.ng/our-properties/${
    project?.slug?.toLowerCase() || 'project'
  }/${property?.slug?.toLowerCase()}`;
  const { name, beds, description, image, price, parkingSpace } = property;
  const ogImage =
    image ||
    'https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-3.jpg';

  return (
    <>
      <SeoHead
        title={`${beds || ''}-Bedroom ${projectName} in ${location}`}
        description={`Discover ${name} at ${projectName} — a modern ${
          beds || ''
        }-bedroom property in ${location}. ${description?.slice(
          0,
          160,
        )} Enjoy energy-efficient design, ${
          parkingSpace || 'ample'
        } parking, and spacious interiors starting from ${
          price ? '₦' + price.toLocaleString() : 'an affordable rate'
        }.`}
        canonical={canonicalUrl}
        ogImage={ogImage}
        keywords={[
          `${name} ${location}`,
          `${beds || ''}-Bedroom home in ${projectName}`,
          `${projectName} properties`,
          `Luxury homes ${location}`,
          `Buy home ${location}`,
          `Real estate ${projectName}`,
          `Highrachy property ${location}`,
          `Waterfront homes Lagos`,
          `Affordable homes Blissville`,
          `Smart homes ${projectName}`,
        ]}
      />
      <Navigation />
      <PageHeader
        title={project?.name ? project?.name : 'Our Properties'}
        subHeader={'Powered By Highrachy'}
        bgImage={property?.image || '/assets/img/bg/investors.jpeg'}
      />

      <PropertyInformation
        property={property}
        similarProperties={similarProperties}
      />

      {isReviewMode ? (
        <CustomPlanReview property={property} />
      ) : (
        <CustomPlan property={property} />
      )}

      <Gallery
        galleries={[
          ...(property?.property_galleries?.data || []),
          ...(property?.project?.data?.attributes?.project_galleries?.data ||
            []),
        ]}
      />

      <LocationMapSection
        locationMapURL={project?.locationMapURL}
        name={project?.name}
        googleMapLatLng={project?.googleMapLatLng}
      />

      {allFaqs.length > 0 && (
        <section className="container mt-6">
          <div className="row">
            <h4>FAQs</h4>
            <FAQsAccordion faqs={allFaqs} />
          </div>
        </section>
      )}

      <div className="mb-7">
        <FeaturedProperties
          properties={featuredProperties}
          title={
            featuredProperties && featuredProperties.length === 1
              ? 'Featured Property'
              : 'Featured Properties'
          }
        />
      </div>
      <section>
        <ProjectsSlideshow projects={projects} title="Featured Projects" />
      </section>
      <div className="mt-7"></div>
      <ScheduleVisit />
      <Footer />
    </>
  );
}

export const PropertyInformation = ({ property, similarProperties }) => {
  const { name, price, availableUnits } = property;
  const project = property.project.data.attributes;
  const isSoldOut = availableUnits === 0;

  return (
    <>
      <Section noPaddingBottom className="mb-5">
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <h2>{name}</h2>
              <p className="text-gray-700">
                <Link href={`/our-projects/${project.slug}`} passHref>
                  <a className="text-reset">{project.name}</a>
                </Link>{' '}
                &nbsp;- {getLocationFromAddress(project)}
              </p>

              <h3 className="text-primary">
                {isSoldOut ? 'SOLD OUT' : moneyFormatInNaira(price)} <br />
              </h3>
            </div>
            <div className="col-sm-4 text-md-end mb-4 mb-md-0">
              <aside>
                <BuyNowButton
                  className="px-3 btn-wide"
                  property={property}
                  paymentPlan={0}
                  initialPayment={property?.price}
                  packageName={getPackageDisplayName(property?.packageName)}
                />
              </aside>
            </div>
          </div>
        </div>
        <div className="container property-detail">
          <PropertyImageGallery property={property} />
          <PropertyIconSection property={property} />
        </div>
      </Section>
      <PropertyInfoSection
        property={property}
        similarProperties={similarProperties}
      />
    </>
  );
};

export const PropertyIconSection = ({ property }) => {
  return (
    <div className="bg-body my-5">
      <div className="d-flex flex-wrap justify-content-between align-items-start">
        <ProjectInfoItem
          icon={<FaLayerGroup size={18} />}
          label="Property Size"
          value={property?.size ? `${property.size} sqm` : '-'}
          className="info-item"
        />
        <ProjectInfoItem
          icon={<FaBed size={18} />}
          label="Bedroom"
          value={
            property?.beds != null
              ? `${property.beds} Bedroom${property.beds > 1 ? 's' : ''}`
              : '-'
          }
          className="info-item"
        />
        <ProjectInfoItem
          icon={<FaBath size={18} />}
          label="Bathroom"
          value={
            property?.baths != null
              ? `${property.baths} Bathroom${property.baths > 1 ? 's' : ''}`
              : '-'
          }
          className="info-item"
        />
        <ProjectInfoItem
          icon={<FaThLarge size={18} />}
          label="Available Units"
          value={
            property?.availableUnits != null
              ? property.availableUnits === 0
                ? 'Sold Out'
                : `${property.availableUnits} Unit${
                    property.availableUnits > 1 ? 's' : ''
                  }`
              : '-'
          }
          className="info-item"
        />
        <ProjectInfoItem
          icon={<FaCar size={18} />}
          label="Parking Space"
          value={
            property?.parkingSpace != null
              ? `${property.parkingSpace} Space${
                  property.parkingSpace > 1 ? 's' : ''
                }`
              : '-'
          }
          className="info-item"
        />
      </div>
    </div>
  );
};







export async function getStaticProps({ params }) {
  const id = params['id']?.[1] || params['id']?.[0];

  try {
    // Build the API URL dynamically using the id and populate all fields
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/properties`;
    const { data } = await axios.get(apiUrl, {
      timeout: 1000,
      params: {
        'filters[slug][$eq]': id,
        populate: '*',
      },
    });

    const propertyData = data?.data?.[0]?.attributes;
    if (!propertyData) {
      throw new Error('Property not found from API');
    }
    const project = propertyData.project;
    const projectId = project?.data?.id;

    // Fetch the single project for this id, populate *
    let projectData = null;
    if (projectId) {
      const projectRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${projectId}`,
        {
          timeout: 1000,
          params: {
            populate: '*',
          },
        },
      );
      projectData = projectRes?.data || {};
    }

    const similarPropertiesRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/properties`,
      {
        timeout: 1000,
        params: {
          populate: '*',
          'filters[project][id][$eq]': projectId,
          'filters[slug][$ne]': id,
        },
      },
    );

    const featuredPropertiesRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/properties`,
      {
        timeout: 1000,
        params: {
          populate: '*',
          'pagination[pageSize]': 3,
          sort: 'createdAt:desc',
          'filters[project][id][$ne]': projectId,
        },
      },
    );

    const projectRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
      {
        timeout: 1000,
        params: {
          'pagination[pageSize]': 3,
          sort: 'createdAt:desc',
          'filters[status][$ne]': PROJECT_STATUS.NOT_AVAILABLE,
        },
      },
    );

    return {
      props: {
        property: { ...propertyData, project: projectData },
        featuredProperties: featuredPropertiesRes?.data?.data || [],
        similarProperties: similarPropertiesRes?.data?.data || [],
        projects: projectRes?.data?.data || [],
      },
      revalidate: 10,
    };
  } catch (error) {
    const fallbackProperty = {
      name: '4 Bedroom Waterview Terrace Duplex',
      slug: '4-bedroom-waterview-terrace-duplex',
      price: 155000000,
      size: 335,
      baths: 5,
      toilets: 5,
      parkingSpace: 2,
      packageName: 'the-canvas',
      availableUnits: 6,
      delivery: '2026-12-31',
      description:
        'A refined, three-level family home with a private boys’ quarters, dedicated home office, and a flexible bonus room for a cinema or gym. Smart systems, serene lake views, and access to premium estate amenities for a seamless, cost-efficient lifestyle.',
      features: {
        data: [
          { attributes: { name: '24/7 Security' } },
          { attributes: { name: 'Smart Solar & Inverter' } },
          { attributes: { name: 'Water Access & Boat Jetty' } },
          { attributes: { name: 'Lakeside Recreation' } },
          { attributes: { name: 'Certificate of Occupancy' } },
        ],
      },
      property_galleries: {
        data: [
          { attributes: { url: '/assets/img/landing/1.png' } },
          { attributes: { url: '/assets/img/landing/2.png' } },
          { attributes: { url: '/assets/img/landing/3.png' } },
          { attributes: { url: '/assets/img/landing/4.png' } },
        ],
      },
      project: {
        data: {
          id: 3,
          attributes: {
            name: 'Blissville Terraces',
            slug: 'blissville-terraces',
            city: 'Sangotedo',
            state: 'Lagos',
            status: 'In Progress',
            brochureURL: '/assets/documents/blissville-terraces-brochure.pdf',
            delivery: '2026-12-31',
            neighborhoods: {
              data: [
                { attributes: { name: 'Novare Mall', distance: '5 mins' } },
                {
                  attributes: {
                    name: 'Lagos Business School',
                    distance: '7 mins',
                  },
                },
                {
                  attributes: {
                    name: 'Green Springs School',
                    distance: '8 mins',
                  },
                },
              ],
            },
            faqs: {
              data: [
                {
                  attributes: {
                    question: 'What title does Blissville Terraces have?',
                    answer:
                      'Blissville Terraces has a Certificate of Occupancy (C of O) through Government Allocation.',
                  },
                },
                {
                  attributes: {
                    question: 'Can I inspect virtually?',
                    answer:
                      'Yes, you can schedule a live virtual walkthrough or send a proxy.',
                  },
                },
              ],
            },
          },
        },
      },
    };

    return {
      props: {
        property: fallbackProperty,
        featuredProperties: [],
        similarProperties: [],
        projects: [],
      },
      revalidate: 10,
    };
  }
}

export async function getStaticPaths() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/properties`,
      {
        timeout: 1000,
        params: { populate: '*' },
      },
    );
    const propertyLists = res.data?.data || [];

    // Get all projects for mapping project name
    const projectsRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
      {
        timeout: 1000,
        params: { populate: '*' },
      },
    );
    const projects = projectsRes.data?.data || [];

    // Helper to get project slug from project id
    function getProjectSlug(projectId) {
      const project = projects.find((p) => p.id === projectId);
      return project?.attributes?.slug || 'project';
    }

    return {
      paths: propertyLists.map((propertyList) => {
        const projectId = propertyList?.attributes?.project?.data?.id;
        const projectSlug = getProjectSlug(projectId);
        return {
          params: {
            id: [projectSlug, propertyList?.attributes?.slug?.toString()],
          },
        };
      }),
      fallback: true,
    };
  } catch (e) {
    return {
      paths: [
        {
          params: {
            id: [
              'blissville-terraces',
              '4-bedroom-waterview-terrace-duplex',
            ],
          },
        },
      ],
      fallback: true,
    };
  }
}

function PropertyInfoSection({ property, similarProperties }) {
  const project = property?.project?.data?.attributes || {};
  const neighborhoods = project?.neighborhoods?.data || [];

  return (
    <Section noPaddingTop className="bg-gray-50 pt-5">
      <div className="container">
        <div className="row g-3">
          {/* Left Column */}
          <div className="col-lg-8">
            {/* Overview */}
            <OverviewCard header="Description">
              <DescriptionParagraphs
                text={[property?.description].filter(Boolean).join('\n\n')}
                defaultVisible={2}
              />

              <BrochureButton brochureURL={project?.brochureURL} />
            </OverviewCard>

            <ProjectOverviewDetails property={property} project={project} />

            <OverviewCard header="Features">
              {<FeatureList project={project} />}
            </OverviewCard>

            {project?.videoURL && (
              <VideoContainer
                video={project?.videoURL}
                videoThumbnail={property?.image}
              />
            )}

            <NeighborhoodList neighborhoods={neighborhoods} />

            {similarProperties.length > 0 && (
              <section className="mt-5">
                <h4 className="mb-4">Other Properties in {project?.name}</h4>
                <div className="row">
                  {similarProperties.map((property, idx) => (
                    <CompactPropertyCard
                      key={property.id || idx}
                      {...property}
                      compact
                      projectSlug={project?.slug}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
          <div className="col-lg-4 position-relative">
            <div className="interest sticky-top">
              <OverviewCard className="p-4">
                <ProjectInterestContent
                  header="Interested in this property?"
                  propertyName={property?.name}
                  property={property}
                />
                <div className="mt-4" />
              </OverviewCard>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function DetailItem({ label, value, className }) {
  return (
    <li>
      <span className="list-dotted__label pe-6">{label}</span>
      <span className={`list-dotted__value ${className}`}>{value}</span>
    </li>
  );
}

export function ProjectOverviewDetails({ property, project }) {
  const [showAll, setShowAll] = React.useState(false);

  const isSoldOut = property?.availableUnits === 0;
  const isCompleted =
    project?.status === PROJECT_STATUS.COMPLETED ||
    project?.status === 4 ||
    project?.status === '4' ||
    PROJECT_STATUS_NAME[project?.status]?.toLowerCase() === 'completed' ||
    project?.status?.toString().toLowerCase() === 'completed';

  const details = [
    {
      label: 'Property Type',
      value: property?.name,
    },
    {
      label: 'Location',
      value: getLocationFromAddress(project),
    },
    {
      label: 'Land Title',
      value: 'Certificate of Occupancy (C of O)',
    },
    {
      label: 'Size',
      value: property?.size ? `${property.size} sqm` : null,
    },
    {
      label: 'Price',
      value:
        !isSoldOut && property?.price
          ? moneyFormatInNaira(property.price)
          : null,
      className: 'text-price',
    },
    {
      label: 'Bathrooms',
      value:
        property?.baths != null
          ? `${property.baths} Bathroom${property.baths > 1 ? 's' : ''}`
          : null,
    },
    {
      label: 'Toilets',
      value:
        property?.toilets != null
          ? `${property.toilets} Toilet${property.toilets > 1 ? 's' : ''}`
          : null,
    },
    {
      label: 'Parking Space',
      value:
        property?.parkingSpace != null
          ? `${property.parkingSpace} ${
              property.parkingSpace > 1 ? 'Spaces' : 'Space'
            }`
          : null,
    },
    {
      label: isCompleted ? 'Delivered' : 'Proposed Delivery',
      value: getShortDate(project?.delivery),
    },
    {
      label: 'Units Available',
      value:
        property?.availableUnits != null
          ? isSoldOut
            ? 'Sold Out'
            : `${property.availableUnits} Unit${
                property.availableUnits > 1 ? 's' : ''
              }`
          : null,
    },
  ].filter((item) => item.value); // Remove items with no value

  const visibleDetails = showAll ? details : details.slice(0, 4);

  return (
    <OverviewCard header="Property Overview">
      <ul className="list-dotted list-unstyled mb-0">
        {visibleDetails.map(({ label, value, className }, index) => (
          <DetailItem
            key={index}
            label={label}
            value={value}
            className={className}
          />
        ))}
        <DetailItem label="" value="" />
      </ul>

      {details.length > 4 && (
        <Button
          color="primary-light"
          className="btn-wide"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'View Less' : 'View All'}
        </Button>
      )}
    </OverviewCard>
  );
}
