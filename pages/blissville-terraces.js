import React from 'react';
import Image from 'next/image';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import classNames from 'classnames';
import Button from '@/components/forms/Button';
import Section from '@/components/common/Section';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import FAQsAccordion from '@/components/common/FAQsAccordion';
import ActionButtonGroup from '@/components/layouts/ActionButtonGroup';
import { ShareProjectIcon } from '@/components/Icons/Icons';
import { useRouter } from 'next/router';
import {
  getLocationFromAddress,
  listFeatures,
  moneyFormatInNaira,
} from '@/utils/helpers';
import axios from 'axios';
import { PROJECT_STATUS, PROPERTY_STATUS } from '@/utils/constants';
import { Gallery, Neighborhood } from './our-projects/[slug]';
import faqs from '@/data/faqs';
import ReactPlayer from 'react-player';
import ShareButton from '@/components/common/ShareButton';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import Textarea from '@/components/forms/Textarea';
import FormikButton from '@/components/forms/FormikButton';
import { askInfoSchema } from '@/components/forms/schemas/page-schema';
import { getError } from '@/utils/helpers';
import { toast } from 'react-toastify';
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

export const AskInfoForm = ({ name, projectName, source = '' }) => {
  const router = useRouter();
  const { ref } = router.query;
  const handleSubmit = async (values, actions) => {
    const payload = {
      ...values,
      source: source || `Property Page`,
      reference: ref || '',
      subject: `Enquiry about ${projectName} - ${name}`,
    };
    try {
      axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/contacts`,
        data: { data: payload },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            toast.success('Information sent successfully');
            actions.resetForm();
            actions.setSubmitting(false);
          }
        })
        .catch(function (error) {
          toast.error(getError(error));
        });
    } catch (error) {
      toast.error(getError(error));
    }
  };
  return (
    <FormikForm
      schema={askInfoSchema}
      handleSubmit={handleSubmit}
      name="ask-info-form"
      buttonText="Send Message"
    >
      <Input floatingLabel name="name" label="Full Name" />
      <Input floatingLabel name="email" type="email" label="Email Address" />

      <Input floatingLabel name="phone" label="Phone Number" optional />

      <Textarea
        floatingLabel
        name="message"
        label="Your Message"
        placeholder="Tell me more about this property"
        rows={5}
      />
      <FormikButton color="success" className="mt-2 text-white btn-wide">
        Send Message
      </FormikButton>
    </FormikForm>
  );
};
