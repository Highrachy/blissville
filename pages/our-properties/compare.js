import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import Section from '@/components/common/Section';
import {
  NoPackageIcon,
  ShellPackageIcon,
  StandardPackageIcon,
  SupremePackageIcon,
} from '@/components/Icons/Icons';
import Navigation from '@/components/layouts/Navigation';
import Image from 'next/image';
import React from 'react';

const CompareProperties = () => {
  return (
    <>
      <Navigation />
      <PageHeader
        title="Our Properties"
        subHeader="Powered By Highrachy"
        bgImage="/assets/img/bg/investors.jpeg"
      />
      <ComparePropertiesSection />

      <Footer />
    </>
  );
};

const ComparePropertiesSection = () => {
  return (
    <Section>
      <div className="container">
        <div className="card">
          <div className="table-responsive">
            <table className="table table-border">
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
                    <h6>3 Bedroom Apartments</h6>
                    <h5 className="text-primary">₦35,000,000</h5>
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
                    <h6>4 Bedroom Maisonettes</h6>
                    <h5 className="text-primary">₦45,000,000</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-secondary">Cable TV Distribution</td>
                  <td className="text-center">
                    <ShellPackageIcon />
                  </td>
                  <td className="text-center">
                    <StandardPackageIcon />
                  </td>
                </tr>
                <tr>
                  <td className="font-secondary">Intercom System</td>
                  <td className="text-center">
                    <ShellPackageIcon />
                  </td>
                  <td className="text-center">
                    <StandardPackageIcon />
                  </td>
                </tr>
                <tr>
                  <td className="font-secondary">Security Fence</td>
                  <td className="text-center">
                    <StandardPackageIcon />
                  </td>
                  <td className="text-center">
                    <SupremePackageIcon />
                  </td>
                </tr>
                <tr>
                  <td className="font-secondary">Guest Toilet</td>
                  <td className="text-center">
                    <ShellPackageIcon />
                  </td>
                  <td className="text-center">
                    <StandardPackageIcon />
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

export default CompareProperties;
