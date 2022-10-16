import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/admin/sideMenu';
import { LocalImage } from '@/components/common/Image';
import Button from '@/components/forms/Button';
import { filterProjects } from '@/utils/filters';
import { USER_ROLES } from '@/utils/constants';
import Link from 'next/link';
import { GalleryTick } from 'iconsax-react';

const Projects = () => (
  <Backend role={USER_ROLES.ADMIN}>
    <PaginatedContent
      addNewUrl={'/app/admin/projects/new'}
      endpoint={'api/projects'}
      pageName="Project"
      DataComponent={ProjectsRowList}
      PageIcon={adminMenu['Projects']}
      populate="*"
      filterFields={filterProjects}
    />

    <div className="container-fluid">
      <div className="text-end mt-4">
        <Link href="/app/admin/features">Manage Features</Link>
      </div>
    </div>
  </Backend>
);

export const ProjectsRowList = ({ results, offset, attachment }) => {
  return (
    <div className="container-fluid">
      <Card className="mt-2">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Location</th>
                <th className="text-center">Properties</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ id, attributes }, index) => (
                <ProjectsSingleRow
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

export const ProjectsSingleRow = ({
  number,
  attachment,
  properties,
  ...props
}) => {
  const { id, name, city, state, image, featured } = props;
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
        {name} &nbsp;
        {featured && (
          <span className="icon-sm text-primary">
            <GalleryTick variant="Bulk" />
          </span>
        )}
      </td>
      <td>
        <span className={`badge badge-dot text-dark`}>
          {city}, {state}
        </span>
      </td>
      <td className="text-center">{properties?.data?.length}</td>
      <td>
        <Button
          color="secondary"
          className="btn-xs"
          href={{
            pathname: '/app/admin/projects/[id]',
            query: { id },
          }}
        >
          Manage Project
        </Button>
      </td>
    </tr>
  );
};

export default Projects;
