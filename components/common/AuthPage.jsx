import Footer from '@/components/common/Footer';
import TopNavigation from '@/components/layouts/Navigation';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import React from 'react';
import { PageHeader } from '@/components/common/Header';
import Image from 'next/image';

const AuthPage = ({ children, title, page, bigForm = false }) => {
  return (
    <>
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
                alt="Hero Image"
                width={1800}
                height={1440}
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
