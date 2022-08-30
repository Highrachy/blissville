import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { EmailIcon, PhoneIcon } from '../Icons/Icons';
import Parallax from './Parallax';
import Section from './Section';

const ScheduleVisit = () => (
  <Parallax bgImage="/assets/img/bg/schedule-a-visit.jpg" isDark={false}>
    <Section noPaddingBottom className="investor-section pb-8">
      <div className="container">
        <div className="row">
          <div className="col-md-9 text-white">
            <h3 className="pt-5 text-white">Schedule a Visit</h3>
            <p className="pb-3 pe-5 lead">
              Our designs respond imaginatively to the cultural, climatic and
              environmental conditions; as such, only the most suitable
              materials are employed.
            </p>

            <div className="row mb-4">
              <div className="d-flex flex-column flex-md-row align-items-md-center">
                <div className="flex-shrink-0">
                  <Image
                    src={`/assets/img/team/sales-manager.jpg`}
                    alt="Sales Manager"
                    width={150}
                    height={150}
                    className="rounded"
                  />
                </div>
                <div className="flex-grow-1 ms-md-3">
                  <h5 className="text-white">Sandra Holyfield</h5>
                  <p className="text-white">SALES MANAGER</p>
                  <p>
                    <PhoneIcon />
                    &nbsp;
                    <a className="text-white" href="tel:+2348028337440">
                      +0802-833-7440
                    </a>
                  </p>
                  <p className="email">
                    <a
                      href="mailto:blissville@highrachy.com"
                      className="text-white"
                    >
                      <EmailIcon />
                      &nbsp; blissville@highrachy.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <Link href="/contact-us" passHref>
              <a className="btn btn-success text-white btn-wide">
                Schedule a Visit Now
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  </Parallax>
);

export default ScheduleVisit;
