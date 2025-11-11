import React, { useState } from 'react';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import { SingleProjectGrid } from '@/components/common/SingleProject';
import axios from 'axios';
import { PROJECT_STATUS } from '@/utils/constants';
import SeoHead from '@/components/utils/SeoHead';
import Section from '@/components/common/Section';
import Image from 'next/image';
import { Container } from 'react-bootstrap';
import Button from '@/components/forms/Button';
import { Fade } from 'react-reveal';

export default function PastProjects({ projects }) {
  return (
    <>
      <Navigation />
      <SeoHead
        title="Past Projects | Completed Real Estate Developments by Highrachy in Lagos"
        description="Discover completed real estate projects by Highrachy — the developer behind Blissville Homes. Explore our legacy of quality developments across Lekki, Sangotedo, and Lagos that combine comfort, design, and long-term value."
        canonical="https://www.blissville.com.ng/past-projects"
        ogImage="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-1-front.jpg"
        keywords={[
          'Completed real estate projects Lagos',
          'Highrachy developments',
          'Past projects Blissville',
          'Luxury homes Lagos',
          'Affordable homes Lekki',
          'Completed estates Sangotedo',
          'Terraced duplexes Lagos',
          'Trusted real estate developer Nigeria',
          'Highrachy housing projects',
          'Lagos real estate portfolio',
          'Highrachy Blissville Terraces',
          'Best terraces in Sangotedo',
          'Completed developments Lekki',
          'Blissville by Highrachy Lagos',
          'Modern real estate Nigeria',
        ]}
      />

      <PageHeader
        title="Past Projects"
        subHeader="Powered By Highrachy"
        bgImage="/assets/img/bg/investors.jpeg"
      />

      <PastProjectsOverviewSection />

      <Section>
        <div className="container">
          <h3 className="mb-4">Completed Projects</h3>
          <div className="row">
            {projects.length === 0 && (
              <div className="text-center my-7 fs-5">No projects found</div>
            )}
            {projects.map((project, key) => (
              <SingleProjectGrid key={key} {...project} />
            ))}
          </div>
        </div>
      </Section>

      <ScheduleVisit />
      <Footer />
    </>
  );
}

export function PastProjectsOverviewSection() {
  return (
    <Section>
      <Container>
        <div className="row align-items-center" id="past-projects-overview">
          <h2 className="fw-bold mb-3 mt-3">
            OUR JOURNEY OF EXCELLENCE:
            <br />
            <span className="text-primary d-block d-md-inline">
              Completed Real Estate Projects by Highrachy
            </span>
          </h2>

          {/* LEFT CONTENT */}
          <div className="col-md-7">
            <Fade left>
              <p className="lead mb-3">
                Every completed project by <strong>Highrachy</strong> reflects a
                story of consistency, craftsmanship, and trust. Our{' '}
                <strong>past projects</strong> stand as proof of our vision to
                deliver homes that combine design, comfort, and value across{' '}
                <strong>Lagos</strong>, from <strong>Lekki</strong> to{' '}
                <strong>Sangotedo</strong>.
              </p>

              <p className="lead mb-3">
                Through the <strong>Blissville</strong> brand, we have developed{' '}
                <strong>affordable luxury estates</strong> and{' '}
                <strong>modern terraced duplexes</strong> designed to meet the
                lifestyle of today&apos;s homeowners and investors. Each estate
                reflects innovation, sustainability, and attention to detail
                that make every property a lasting investment.
              </p>

              <p className="lead">
                Our <strong>completed real estate projects</strong> are more
                than milestones; they represent our ongoing commitment to
                excellence. With every project, <strong>Highrachy</strong>{' '}
                continues to redefine the standard of{' '}
                <strong>quality housing in Lagos</strong>, providing
                energy-efficient, family-friendly homes that endure and inspire
                confidence in all who invest in them.
              </p>
            </Fade>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-md-5 mb-4 ps-md-5 mb-md-0">
            <Fade right>
              <Image
                src="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-3.jpg"
                alt="Completed Blissville Project in Lagos by Highrachy"
                width={800}
                height={800}
                className="img-fluid rounded-2 shadow-sm"
              />
            </Fade>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export async function getStaticProps() {
  const projectRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects?populate=*`,
    {
      params: {
        sort: 'createdAt:desc',
        'filters[status][$eq]': PROJECT_STATUS.COMPLETED,
      },
    }
  );

  const projects = projectRes.data.data;

  return {
    props: {
      projects,
    },
    revalidate: 10,
  };
}
