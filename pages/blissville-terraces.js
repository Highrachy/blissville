import axios from 'axios';
import { PROJECT_STATUS } from '@/utils/constants';
import SinglePropertyPage from './our-properties/[...id]';

export default function SingleProjectPage({
  property,
  projects,
  similarProperties,
  featuredProperties,
}) {
  return SinglePropertyPage({
    property,
    projects,
    similarProperties,
    featuredProperties,
    isLandingPage: true,
  });
}

export async function getStaticProps({ params }) {
  const id = 3; // blissville terraces id

  // Build the API URL dynamically using the id and populate all fields
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/properties`;
  const { data } = await axios.get(apiUrl, {
    params: {
      'filters[id][$eq]': id,
      populate: '*',
    },
  });

  const propertyData = data?.data[0]?.attributes;
  const project = propertyData.project;
  const projectId = project?.data?.id;

  // Fetch the single project for this id, populate *
  let projectData = null;
  if (projectId) {
    const projectRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${projectId}`,
      {
        params: {
          populate: '*',
        },
      }
    );
    projectData = projectRes?.data || {};
  }

  const similarPropertiesRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties`,
    {
      params: {
        populate: '*',
        'filters[project][id][$eq]': projectId,
        'filters[slug][$ne]': id,
      },
    }
  );

  const featuredPropertiesRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties`,
    {
      params: {
        populate: '*',
        'pagination[pageSize]': 3,
        sort: 'createdAt:desc',
        'filters[project][id][$ne]': projectId,
      },
    }
  );

  const projectRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
    {
      params: {
        'pagination[pageSize]': 3,
        sort: 'createdAt:desc',
        'filters[status][$ne]': PROJECT_STATUS.NOT_AVAILABLE,
        // 'filters[id][$ne]': projectId,
      },
    }
  );

  return {
    props: {
      property: { ...propertyData, project: projectData },
      featuredProperties: featuredPropertiesRes?.data?.data || [],
      similarProperties: similarPropertiesRes?.data?.data || [],
      projects: projectRes?.data?.data || [],
    },
    revalidate: 10,
  };
}
