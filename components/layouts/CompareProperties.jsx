import React from 'react';
import {
  NoPackageIcon,
  ShellPackageIcon,
  StandardPackageIcon,
  SupremePackageIcon,
} from '../Icons/Icons';

const CompareProperties = () => {
  return (
    <section>
      <div className="card">
        <div className="table-responsive">
          <table className="table table-border">
            <thead>
              <tr>
                <th></th>
                <th>
                  Shell <span className="d-none d-md-inline">Package</span>
                </th>
                <th>
                  Standard <span className="d-none d-md-inline">Package</span>
                </th>
                <th>
                  Supreme <span className="d-none d-md-inline">Package</span>
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
                <td className="text-center">
                  <SupremePackageIcon />
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
                <td className="text-center">
                  <SupremePackageIcon />
                </td>
              </tr>
              <tr>
                <td className="font-secondary">Security Fence</td>
                <td className="text-center">
                  <ShellPackageIcon />
                </td>
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
                <td className="text-center">
                  <SupremePackageIcon />
                </td>
              </tr>
              <tr>
                <td className="font-secondary">Spacious Kitchen</td>
                <td className="text-center">
                  <ShellPackageIcon />
                </td>
                <td className="text-center">
                  <StandardPackageIcon />
                </td>
                <td className="text-center">
                  <SupremePackageIcon />
                </td>
              </tr>
              <tr>
                <td className="font-secondary">Dedicated Parking</td>
                <td className="text-center">
                  <ShellPackageIcon />
                </td>
                <td className="text-center">
                  <StandardPackageIcon />
                </td>
                <td className="text-center">
                  <SupremePackageIcon />
                </td>
              </tr>
              <tr>
                <td className="font-secondary">Gym</td>
                <td className="text-center">
                  <ShellPackageIcon />
                </td>
                <td className="text-center">
                  <StandardPackageIcon />
                </td>
                <td className="text-center">
                  <SupremePackageIcon />
                </td>
              </tr>
              <tr>
                <td className="font-secondary">Water Treatment</td>
                <td className="text-center">
                  <ShellPackageIcon />
                </td>
                <td className="text-center">
                  <StandardPackageIcon />
                </td>
                <td className="text-center">
                  <SupremePackageIcon />
                </td>
              </tr>
              <tr>
                <td className="font-secondary">Maids Room</td>
                <td className="text-center">
                  <ShellPackageIcon />
                </td>
                <td className="text-center">
                  <StandardPackageIcon />
                </td>
                <td className="text-center">
                  <SupremePackageIcon />
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
                <td className="text-center">
                  <SupremePackageIcon />
                </td>
              </tr>
              <tr>
                <td className="font-secondary">Surveillance System</td>
                <td className="text-center">
                  <ShellPackageIcon />
                </td>
                <td className="text-center">
                  <StandardPackageIcon />
                </td>
                <td className="text-center">
                  <SupremePackageIcon />
                </td>
              </tr>
              <tr>
                <td className="font-secondary">Inverter System</td>
                <td className="text-center">
                  <NoPackageIcon />
                </td>
                <td className="text-center">
                  <StandardPackageIcon />
                </td>
                <td className="text-center">
                  <SupremePackageIcon />
                </td>
              </tr>
              <tr>
                <td className="font-secondary">Fire Detection</td>
                <td className="text-center">
                  <NoPackageIcon />
                </td>
                <td className="text-center">
                  <NoPackageIcon />
                </td>
                <td className="text-center">
                  <SupremePackageIcon />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CompareProperties;
