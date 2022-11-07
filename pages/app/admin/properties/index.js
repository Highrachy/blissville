import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/admin/sideMenu';
import { LocalImage } from '@/components/common/Image';
import Button from '@/components/forms/Button';
import { USER_ROLES } from '@/utils/constants';
import { moneyFormatInNaira } from '@/utils/helpers';

const Properties = () => (
  <Backend role={USER_ROLES.ADMIN}>
    <PaginatedContent
      endpoint={'api/properties'}
      pageName="Property"
      pluralPageName="Properties"
      DataComponent={PropertiesRowList}
      PageIcon={adminMenu['Properties']}
      populate="*"
      // filterFields={filterProperties}
    />
  </Backend>
);

export const PropertiesRowList = ({ results, offset, attachment }) => {
  return (
    <div className="container-fluid">
      <Card className="mt-2">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ id, attributes }, index) => (
                <PropertiesSingleRow
                  key={index}
                  number={offset + index + 1}
                  id={id}
                  {...attributes}
                  attachment={attachment}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export const PropertiesSingleRow = ({ number, attachment, ...props }) => {
  const { id, name, price, image, status } = props;
  return (
    <tr>
      <td>{number}</td>
      <td>
        <LocalImage
          src={image}
          name={`${name}-${number}`}
          className="img-md2 me-2"
          rounded
        />
        {name}
      </td>
      <td className="text-price">{moneyFormatInNaira(price)}</td>
      <td>
        <Button
          color="secondary"
          className="btn-xs"
          href={{
            pathname: '/app/admin/properties/[id]',
            query: { id },
          }}
        >
          Manage Property
        </Button>
      </td>
    </tr>
  );
};

export default Properties;
