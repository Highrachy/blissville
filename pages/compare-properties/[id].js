import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import Section from '@/components/common/Section';
import Button from '@/components/forms/Button';
import Navigation from '@/components/layouts/Navigation';
import { STATUS_NAME } from '@/utils/constants';
import {
  getLocationFromAddress,
  listFeatures,
  moneyFormatInNaira,
} from '@/utils/helpers';
import axios from 'axios';
import { ArrowCircleLeft, ArrowLeft, ArrowLeft2 } from 'iconsax-react';
import Image from 'next/image';
import React from 'react';
import { Dropdown } from 'react-bootstrap';

const CompareProperties = ({ property, otherProperties }) => {
  const [selectedProperty, setSelectedProperty] = React.useState(null);
  return (
    <>
      <Navigation />
      <PageHeader
        title="Compare Property"
        subHeader="Powered By Highrachy"
        bgImage="/assets/img/bg/investors.jpeg"
      />
      {selectedProperty ? (
        <ComparePropertiesSection
          property={property}
          selectedProperty={selectedProperty}
          otherProperties={otherProperties}
          setSelectedProperty={setSelectedProperty}
        />
      ) : (
        <SelectPropertyToCompare
          property={property}
          otherProperties={otherProperties}
          setSelectedProperty={setSelectedProperty}
        />
      )}

      <Footer />
    </>
  );
};

const SelectPropertyToCompare = ({
  setSelectedProperty,
  property,
  otherProperties,
}) => {
  const { name, price, image } = property;
  const otherPropertiesList = otherProperties.map(
    ({ id, attributes: { name, project, price } }) => ({
      id,
      name,
      project: project.data.attributes.name,
      price,
    })
  );
  return (
    <Section>
      <div className="container">
        <h5 className="mb-4">Select property to compare:</h5>
        <div className="card bg-gray">
          <div className="row g-4 py-4">
            <div className="col-md-4"></div>
            <div className="col-md-4 text-center">
              <Image
                src={image}
                alt="Hero Image"
                height="200"
                width="240"
                objectFit="cover"
                className="rounded"
              />
              <h6>{name}</h6>
              <h5 className="text-primary">{moneyFormatInNaira(price)}</h5>
            </div>
            <div className="col-md-4 text-center">
              <Image
                src="/assets/img/placeholder/image.png"
                alt="Hero Image"
                height="200"
                width="240"
                objectFit="cover"
                className="rounded"
              />
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Select Property
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {otherPropertiesList.map(
                    ({ id, name, project, price }, index) => (
                      <span onClick={() => setSelectedProperty(id)} key={index}>
                        <Dropdown.Item>
                          <span className="text-primary">{name}</span> -{' '}
                          <small className="text-gray-700">
                            ₦{price / 1_000_000 || 0}M
                          </small>
                          <br />
                          <span className="text-xs text-muted">{project}</span>
                        </Dropdown.Item>
                      </span>
                    )
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
const ComparePropertiesSection = ({
  selectedProperty,
  property,
  otherProperties,
  setSelectedProperty,
}) => {
  const currentProperty = otherProperties.find(
    (property) => property.id === selectedProperty
  );

  const property2 = {
    id: currentProperty.id,
    ...currentProperty.attributes,
  };

  const project = property.project.data.attributes;
  const project2 = property2.project.data.attributes;
  return (
    <Section>
      <div className="container">
        <div className="text-end mb-5">
          <Button
            color="info"
            className="btn-sm"
            onClick={() => setSelectedProperty(null)}
          >
            <ArrowLeft /> Back
          </Button>
        </div>
        <div className="card">
          <div className="table-responsive mb-0">
            <table className="table table-border table-compare table-cols-3">
              <thead>
                <tr>
                  <th></th>
                  <th className="text-center">
                    <Image
                      src={property.image}
                      alt="Hero Image"
                      height="200"
                      width="240"
                      objectFit="cover"
                      className="rounded"
                    />
                    <h6 className="text-mobile-xs">{property.name}</h6>
                    <h5 className="text-primary d-none d-md-block">
                      {moneyFormatInNaira(property.price)}
                    </h5>
                  </th>
                  <th className="text-center">
                    <Image
                      src={property2.image}
                      alt="Hero Image"
                      height="200"
                      width="240"
                      objectFit="cover"
                      className="rounded"
                    />
                    <h6 className="text-mobile-xs">{property2.name}</h6>
                    <h5 className="text-primary d-none d-md-block">
                      {moneyFormatInNaira(property2.price)}
                    </h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                <CompareTableRow
                  title="Type"
                  value1={project.type}
                  value2={project2.type}
                />
                <CompareTableRow
                  title="Project"
                  value1={project.name}
                  value2={project2.name}
                />
                <CompareTableRow
                  title="Price"
                  value1={moneyFormatInNaira(property.price)}
                  value2={moneyFormatInNaira(property2.price)}
                />
                <CompareTableRow
                  title="Location"
                  value1={getLocationFromAddress(project, true)}
                  value2={getLocationFromAddress(project2, true)}
                />
                <CompareTableRow
                  title="Bedrooms"
                  value1={`${property.beds} Bedrooms`}
                  value2={`${property2.beds} Bedrooms`}
                />
                <CompareTableRow
                  title="Bathrooms"
                  value1={`${property.baths} Bathrooms`}
                  value2={`${property2.baths} Bathrooms`}
                />
                <CompareTableRow
                  title="Toilets"
                  value1={`${property.toilets} Toilets`}
                  value2={`${property2.toilets} Toilets`}
                />
                <CompareTableRow
                  title="Parking Space"
                  value1={`${property.parkingSpace} Cars`}
                  value2={`${property2.parkingSpace} Cars`}
                />
                <CompareTableRow
                  title="Size"
                  value1={`${property.size} Msq`}
                  value2={`${property2.size} Msq`}
                />
                <CompareTableRow
                  title="Floor"
                  value1={`${property.floors}`}
                  value2={`${property2.floors}`}
                />
                <CompareTableRow
                  title="Payment Plan"
                  value1={`${
                    property.paymentPlan || project.paymentPlan
                  } Months`}
                  value2={`${
                    property2.paymentPlan || project.paymentPlan
                  } Months`}
                />
                <CompareTableRow
                  title="Available Units"
                  value1={`${property.availableUnits} units`}
                  value2={`${property2.availableUnits} units`}
                />
                <CompareTableRow
                  title="Features"
                  value1={project.features}
                  value2={project2.features}
                />
                <tr>
                  <td className="font-secondary text-primary fw-semibold">
                    &nbsp;
                  </td>
                  <td className={`text-center `}>
                    <Button
                      color="secondary"
                      className="btn-sm"
                      href={`/our-properties/${project.slug}/${property.slug}/${property.id}`}
                    >
                      I am Interested
                    </Button>
                  </td>
                  <td className={`text-center`}>
                    <Button
                      color="secondary"
                      className="btn-sm"
                      href={`/our-properties/${project2.slug}/${property2.slug}/${property2.id}`}
                    >
                      I am Interested
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Section>
  );
};

const CompareTableRow = ({ title, value1, value2 }) => {
  const className = value1 === value2 ? 'text-gray-700' : 'text-gray-900';
  return (
    <tr>
      <td className="font-secondary text-primary fw-semibold">{title}</td>
      <td className={`text-center ${className}`}>{value1}</td>
      <td className={`text-center ${className}`}>{value2}</td>
    </tr>
  );
};
export default CompareProperties;

export async function getStaticProps({ params }) {
  const id = params['id'];
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties?populate=*&filters[id][$eq]=${id}`
  );

  const { data } = await res.json();

  const propertiesRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties`,
    {
      params: {
        populate: '*',
        sort: 'name:asc',
        'filters[id][$ne]': id,
      },
    }
  );

  return {
    props: {
      property: { id: data[0].id, ...data[0]['attributes'] },
      otherProperties: propertiesRes.data.data,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties`);
  const { data: propertyLists } = await res.json();
  return {
    paths: propertyLists.map((propertyList) => {
      return {
        params: {
          id: propertyList['id'].toString(),
        },
      };
    }),
    fallback: true,
  };
}
