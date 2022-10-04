import React from 'react';
import {
  NoPackageIcon,
  ShellPackageIcon,
  StandardPackageIcon,
  SupremePackageIcon,
} from '../Icons/Icons';

const ComparePackages = ({ project }) => {
  const { features, standardFeatures, supremeFeatures } = project;
  const allFeatures = [
    ...features?.split(','),
    ...standardFeatures?.split(','),
    ...supremeFeatures?.split(','),
  ];

  return (
    <section>
      <div className="table-responsive">
        <table className="table table-border table-compare table-cols-4">
          <thead>
            <tr>
              <th className="text-center"></th>
              <th className="text-center">
                Shell <span className="d-none d-md-inline">Package</span>
              </th>
              <th className="text-center">
                Standard <span className="d-none d-md-inline">Package</span>
              </th>
              <th className="text-center">
                Supreme <span className="d-none d-md-inline">Package</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {allFeatures.map((feature) => (
              <tr key={feature}>
                <td className="font-secondary">{feature}</td>
                <td className="text-center">
                  {features.includes(feature) && <ShellPackageIcon />}
                </td>
                <td className="text-center">
                  {(features.includes(feature) ||
                    standardFeatures.includes(feature)) && (
                    <StandardPackageIcon />
                  )}
                </td>
                <td className="text-center">{<SupremePackageIcon />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ComparePackages;
