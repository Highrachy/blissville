import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import Section from '@/components/common/Section';
import Navigation from '@/components/layouts/Navigation';
import Image from 'next/image';
import React from 'react';
import { Dropdown } from 'react-bootstrap';

const CompareProperties = () => {
  const [selectedProperty, setSelectedProperty] = React.useState(false);
  return (
    <>
      <Navigation />
      <PageHeader
        title="Compare Property"
        subHeader="Powered By Highrachy"
        bgImage="/assets/img/bg/investors.jpeg"
      />
      {selectedProperty ? (
        <ComparePropertiesSection />
      ) : (
        <SelectPropertyToCompare setSelectedProperty={setSelectedProperty} />
      )}

      <Footer />
    </>
  );
};

const SelectPropertyToCompare = ({ setSelectedProperty }) => {
  return (
    <Section>
      <div className="container">
        <h5 className="mb-4">Select property to compare:</h5>
        <div className="card bg-gray">
          <div className="row g-4 py-4">
            <div className="col-md-4"></div>
            <div className="col-md-4 text-center">
              <Image
                src="/assets/img/property/property1.jpeg"
                alt="Hero Image"
                height="200"
                width="240"
                objectFit="cover"
                className="rounded"
              />
              <h6>3 Bedroom Apartments</h6>
              <h5 className="text-primary">₦35,000,000</h5>
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
                  <Dropdown.Item href="#/action-1">
                    <span onClick={() => setSelectedProperty(true)}>
                      4 Bedroom Maisonettes <br />
                      <span className="text-xs text-muted">
                        Blissville Duos
                      </span>
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    <span onClick={() => setSelectedProperty(true)}>
                      3 Bedroom Apartments <br />
                      <span className="text-xs text-muted">
                        Blissville Premium
                      </span>
                    </span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
const ComparePropertiesSection = () => {
  return (
    <Section>
      <div className="container">
        <div className="card">
          <div className="table-responsive mb-0">
            <table className="table table-border table-compare table-cols-3">
              <thead>
                <tr>
                  <th></th>
                  <th className="text-center">
                    <Image
                      src="/assets/img/property/property1.jpeg"
                      alt="Hero Image"
                      height="200"
                      width="240"
                      objectFit="cover"
                      className="rounded"
                    />
                    <h6 className="text-mobile-xs">3 Bedroom Apartments</h6>
                    <h5 className="text-primary d-none d-md-block">
                      ₦35,000,000
                    </h5>
                  </th>
                  <th className="text-center">
                    <Image
                      src="/assets/img/property/property2.jpeg"
                      alt="Hero Image"
                      height="200"
                      width="240"
                      objectFit="cover"
                      className="rounded"
                    />
                    <h6 className="text-mobile-xs">4 Bedroom Maisonettes</h6>
                    <h5 className="text-primary d-none d-md-block">
                      ₦45,000,000
                    </h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-secondary text-primary fw-semibold">
                    Project
                  </td>
                  <td className="text-center">Blissville Uno</td>
                  <td className="text-center">Blissville Duos</td>
                </tr>
                <tr>
                  <td className="font-secondary text-primary fw-semibold">
                    Price
                  </td>
                  <td className="text-center">₦35,000,000</td>
                  <td className="text-center">₦45,000,000</td>
                </tr>
                <tr>
                  <td className="font-secondary text-primary fw-semibold">
                    Security Fence
                  </td>
                  <td className="text-center text-muted">Lekki, Lagos</td>
                  <td className="text-center text-muted">Lekki, Lagos</td>
                </tr>
                <tr>
                  <td className="font-secondary text-primary fw-semibold">
                    Bedrooms
                  </td>
                  <td className="text-center">3 bedrooms</td>
                  <td className="text-center">4 bedrooms</td>
                </tr>
                <tr>
                  <td className="font-secondary text-primary fw-semibold">
                    Bathrooms
                  </td>
                  <td className="text-center">4 Bathrooms</td>
                  <td className="text-center">5 Bathrooms</td>
                </tr>
                <tr>
                  <td className="font-secondary text-primary fw-semibold">
                    Toilets
                  </td>
                  <td className="text-center">5 Toilets</td>
                  <td className="text-center">6 Toilets</td>
                </tr>
                <tr>
                  <td className="font-secondary text-primary fw-semibold">
                    Parking Space
                  </td>
                  <td className="text-center text-muted">2 Cars</td>
                  <td className="text-center text-muted">2 Cars</td>
                </tr>
                <tr>
                  <td className="font-secondary text-primary fw-semibold">
                    Payment Plan
                  </td>
                  <td className="text-center text-muted">12 Months</td>
                  <td className="text-center text-muted">12 Months </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CompareProperties;
