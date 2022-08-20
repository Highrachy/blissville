import Link from 'next/link';
import React from 'react';
import Parallax from './Parallax';
import Section from './Section';

const ScheduleVisit = () => (
  <Parallax bgImage="/assets/img/bg/schedule-a-visit.jpg">
    <Section noPaddingBottom className="investor-section pb-8">
      <div className="container">
        <div className="row">
          <div className="col-9 text-white">
            <h3 className="pt-5 text-white">Schedule a Visit</h3>
            <p className="pb-3 pe-5 lead">
              Our designs respond imaginatively to the cultural, climatic and
              environmental conditions; as such, only the most suitable
              materials are employed.
            </p>
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
