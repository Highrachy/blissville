import React from 'react';
import Image from 'next/image';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import classNames from 'classnames';
import Button from '@/components/forms/Button';
import Section from '@/components/common/Section';
import ScheduleVisit, {
  ScheduleVisitationButton,
} from '@/components/common/ScheduleVisit';
import { FeaturedProperties } from '@/components/layouts/FeaturedProperties';
import { Tab } from 'react-bootstrap';
import FAQsAccordion from '@/components/common/FAQsAccordion';
import ActionButtonGroup from '@/components/layouts/ActionButtonGroup';
import Sharer from '@/components/ui/Sharer';
import Modal from '@/components/ui/Modal';
import { ShareProjectIcon } from '@/components/Icons/Icons';
import { useRouter } from 'next/router';
import {
  getLocationFromAddress,
  getPrice,
  listFeatures,
  moneyFormatInNaira,
} from '@/utils/helpers';
import { getShortDate } from '@/utils/date-helpers';
import axios from 'axios';
import { PROPERTY_STATUS } from '@/utils/constants';
import { AskInfoForm } from './our-properties/[...id]';
import { Gallery, Neighborhood } from './our-projects/[slug]';
import faqs from '@/data/faqs';
import ReactPlayer from 'react-player';

export default function SingleProjectPage({ project, featuredProperties }) {
  const [showModal, setShowModal] = React.useState(false);
  const router = useRouter();
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const {
    name,
    image,
    description,
    startingPrice,
    type,
    delivery,
    city,
    state,
  } = project;

  const slug = 'blissville-terraces';
  const shareUrl = `https://blissville.com.ng/${slug}`;
  const isBlissvilleTerraces = true;

  return (
    <>
      <Navigation />
      <div>
        <img
          src="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/launch-ads.jpg"
          alt="Project Image"
          className="img-fluid"
        />
      </div>
      <Section>
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <h2>{name}</h2>
              <p className="text-primary h2">
                {moneyFormatInNaira(120_000_000)}
              </p>
              <p className="lead">{getLocationFromAddress(project)}</p>
            </div>
            <div className="col-sm-4 text-md-end mb-4 mb-md-0">
              <Button color="light" onClick={() => setShowModal(true)}>
                Share Project <ShareProjectIcon />
              </Button>

              <Modal
                title="Share Project"
                show={showModal}
                onHide={() => setShowModal(false)}
              >
                <section className="row">
                  <div className="col-md-12 my-3">
                    <p>Click to share this project with your friends</p>
                    <Sharer shareUrl={shareUrl} />
                  </div>
                </section>
              </Modal>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="lead">{description}</div>
              {listFeatures(project)}
              {/* <ActionButtonGroup price={startingPrice} /> */}
              <ActionButtonGroup price={120_000_000} />

              <div className="mb-5"></div>
            </div>
            <div className="col-md-4">
              <div className="bg-gray rounded p-4">
                <h4>Interested</h4>
                <h6 className="mb-3">Ask for more Information</h6>

                <AskInfoForm
                  name={name}
                  projectName={project.name}
                  source="Blissville Terraces Landing Page"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section altBg>
        <div className="container">
          <div className="row">
            <h3>Video</h3>
            <div className="card rounded p-2 m-0 mb-5">
              <div className="ratio ratio-16x9 mb-3">
                <ReactPlayer
                  url="/videos/blissville-video.mp4"
                  width="100%"
                  height="100%"
                  controls
                />
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Gallery galleries={project?.project_galleries?.data || []} />
      <Neighborhood
        neighborhoods={project?.neighborhoods?.data || []}
        slug={slug}
      />

      <Section>
        <div className="container">
          <div className="row">
            <h2>FAQS</h2>
            <div className="mt-5 col-12 faqs-section">
              <FAQsAccordion faqs={faqs[0]?.faqs} />
            </div>
          </div>
        </div>
      </Section>

      <div className="mt-7"></div>
      <ScheduleVisit />
      <Footer />
    </>
  );
}
export async function getStaticProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects?populate=*&filters[slug][$eq]=blissville-terraces`
  );

  let { data } = await res.json();

  if (!data || data.length === 0) {
    const resAll = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/projects?populate=*`
    );
    const { data: allData } = await resAll.json();
    data = allData;
  }

  const propertiesRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties`,
    {
      params: {
        populate: '*',
        'pagination[pageSize]': 3,
        sort: 'createdAt:desc',
        'filters[project][id][$ne]': data[0].id,
        'filters[status][$eq]': PROPERTY_STATUS.ACTIVE,
      },
    }
  );

  return {
    props: {
      project: { id: data[0].id, ...data[0]['attributes'] },
      featuredProperties: propertiesRes.data.data,
    },
    revalidate: 10,
  };
}
