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
import { Gallery, GalleryTick } from 'iconsax-react';
import ProcessButton from '@/components/utils/ProcessButton';

const Projects = () => (
  <Backend role={USER_ROLES.ADMIN}>
    <PaginatedContent
      endpoint={'api/projects'}
      pageName="Slideshow"
      DataComponent={ProjectsRowList}
      PageIcon={<Gallery />}
      params={{
        'filters[featured][$eq]': 'true',
      }}
    />
  </Backend>
);

export const ProjectsRowList = ({ results, offset, attachment, query }) => {
  return (
    <div className="container-fluid">
      <Card className="mt-2">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Slogan</th>
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
                  query={query}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export const ProjectsSingleRow = ({ number, slogan, query, ...props }) => {
  const { id, name, image, featured } = props;
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
      <td> {slogan || 'A PLACE TO CALL HOME'}</td>
      <td>
        <ProcessButton
          afterSuccess={() => query.mutate()}
          api={`projects/${id}`}
          buttonColor={featured ? 'danger' : 'success'}
          buttonSizeClassName="btn-xs"
          data={{ featured: !featured }}
          modalContent={`Are you sure you want to remove this on the home page`}
          modalTitle={featured ? 'Remove from Home Page' : 'Add to Home Page'}
          successMessage={`The information has been successfully updated`}
        >
          {featured ? 'Remove' : 'Add to Slideshow'}
        </ProcessButton>
      </td>
    </tr>
  );
};

export default Projects;
