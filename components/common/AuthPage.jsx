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
                src="/assets/img/property/property1.jpeg"
                alt="Hero Image"
                width={1024}
                height={768}
                className="rounded"
              />
              <p className="text-muted text-center fw-semibold">
                Blissville Uno
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
