import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/admin/sideMenu';
import Button from '@/components/forms/Button';
// import { filterFeatures } from '@/utils/filters';
import { USER_ROLES } from '@/utils/constants';

const Features = () => (
  <Backend role={USER_ROLES.ADMIN}>
    <PaginatedContent
      addNewUrl={'/app/admin/features/new'}
      endpoint={'api/features'}
      pageName="Feature"
      DataComponent={FeaturesRowList}
      PageIcon={adminMenu['Features']}
      populate="*"
      // filterFields={filterFeatures}
    />
  </Backend>
);

export const FeaturesRowList = ({ results, offset, attachment }) => {
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
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ id, attributes }, index) => (
                <FeaturesSingleRow
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

export const FeaturesSingleRow = ({ number, name, price, id, description }) => {
  return (
    <tr>
      <td>{number}</td>
      <td>{name}</td>
      <td>{price}</td>
      <td>{description}</td>
      <td>
        <Button
          color="secondary"
          className="btn-xs"
          href={{
            pathname: '/app/admin/features/new',
            query: { id, action: 'edit' },
          }}
        >
          Edit Feature
        </Button>
      </td>
    </tr>
  );
};

export default Features;
