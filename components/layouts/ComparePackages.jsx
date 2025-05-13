import React from 'react';
import {
  NoPackageIcon,
  ShellPackageIcon,
  StandardPackageIcon,
  SupremePackageIcon,
} from '../Icons/Icons';
const ComparePackages = ({ project }) => {
  const { features, standardFeatures, supremeFeatures } = project;

  // Helper to parse features string into array
  const parseFeatures = (str) =>
    str
      ? str
          .split(',')
          .map((f) => f.trim())
          .filter(Boolean)
      : [];

  const shellArr = parseFeatures(features);

  // Standard includes shell + its own, if not empty
  const standardArr =
    standardFeatures && parseFeatures(standardFeatures).length
      ? [...shellArr, ...parseFeatures(standardFeatures)]
      : [];

  // Supreme includes standard + its own, if not empty
  const supremeArr =
    supremeFeatures && parseFeatures(supremeFeatures).length
      ? [
          ...(standardArr.length ? standardArr : shellArr),
          ...parseFeatures(supremeFeatures),
        ]
      : [];

  // Build columns only if features exist
  const columns = [
    {
      key: 'shell',
      label: 'Shell',
      icon: ShellPackageIcon,
      features: shellArr,
    },
    ...(standardArr.length
      ? [
          {
            key: 'standard',
            label: 'Standard',
            icon: StandardPackageIcon,
            features: standardArr,
          },
        ]
      : []),
    ...(supremeArr.length
      ? [
          {
            key: 'supreme',
            label: 'Supreme',
            icon: SupremePackageIcon,
            features: supremeArr,
          },
        ]
      : []),
  ];

  // Collect all unique features for table rows
  const allFeatures = [...new Set(columns.flatMap((col) => col.features))];

  return (
    <section>
      <div className="table-responsive">
        <table
          className={`table table-border table-compare table-cols-${
            columns.length + 1
          }`}
        >
          <thead>
            <tr>
              <th className="text-center"></th>
              {columns.map((col) => (
                <th className="text-center" key={col.key}>
                  {col.label}{' '}
                  <span className="d-none d-md-inline">Package</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allFeatures.map((feature) => (
              <tr key={feature}>
                <td className="font-secondary">{feature}</td>
                {columns.map((col) => (
                  <td className="text-center" key={col.key}>
                    {col.features.includes(feature) && <col.icon />}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ComparePackages;
