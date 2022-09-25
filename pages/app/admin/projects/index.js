import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/admin/sideMenu';
import { LocalImage } from '@/components/common/Image';
import Button from '@/components/forms/Button';
import { filterProjects } from '@/utils/filters';
import { USER_ROLES } from '@/utils/constants';

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
                <th>Status</th>
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

export const ProjectsSingleRow = ({ number, attachment, ...props }) => {
  const { id, name, type, image, status } = props;
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
      <td>
        <span className={`badge badge-dot bg-red}`}>{status}</span>
      </td>
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
