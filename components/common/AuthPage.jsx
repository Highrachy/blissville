import React from 'react';
import Image from 'next/image';
import Footer from '@/components/common/Footer';
import TopNavigation from '@/components/layouts/Navigation';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import { PageHeader } from '@/components/common/Header';
import SeoHead from '../utils/SeoHead';

const AuthPage = ({
  children,
  title,
  page,
  canonical = '',
  bigForm = false,
  seo = {}, // ✅ Optional prop for custom SEO overrides
}) => {
  // ✅ Default SEO (can be overridden from each auth page)
  const defaultSeo = {
    title: `${page} | Blissville by Highrachy`,
    description: `Access your Blissville by Highrachy account to ${page.toLowerCase()} and manage your property investments in Lagos.`,
    canonical: `https://www.blissville.com.ng/${
      canonical || page.toLowerCase()
    }`,
    ogImage:
      'https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-1-front.jpg',
    keywords: [
      `Blissville ${page.toLowerCase()}`,
      'Highrachy real estate login',
      'Customer portal Blissville',
      'Real estate dashboard Lagos',
      'Property management Nigeria',
      'Luxury homes Lagos',
      'Affordable real estate Nigeria',
      'Smart homes Sangotedo',
      'Highrachy account access',
      'Property ownership Lagos',
    ],
  };

  return (
    <>
      {/* ✅ SEO Head: Merge defaults with page-level overrides */}
      <SeoHead {...defaultSeo} {...seo} />

      <TopNavigation />

      <PageHeader
        title={`${page} Page`}
        bgImage="/assets/img/bg/about-us.jpeg"
      />

      <div className="container my-7">
        <div className="row">
          <div className={bigForm ? 'col-md-7' : 'col-md-5'}>
            <h4>{title}</h4>
            {children}
          </div>

          <div className={`${bigForm ? 'col-md-5' : 'col-md-7'} ps-5`}>
            <div className="mt-5">
              <Image
                src="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-1-front.jpg"
                alt="Blissville Terraces"
                width={1800}
                height={1440}
                priority
              />
              <p className="text-muted text-center fw-semibold">
                Blissville Terraces
              </p>
            </div>
          </div>
        </div>
      </div>

      <ScheduleVisit />
      <Footer />
    </>
  );
};

export default AuthPage;
