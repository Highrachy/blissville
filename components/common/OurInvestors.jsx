import Link from 'next/link';
import React from 'react';
import Parallax from './Parallax';
import Section from './Section';

const OurInvestors = ({ image, text, header, buttonText }) => (
  <Parallax bgImage={image}>
    <Section className="investor-section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3 className="invest-now__header">{header}</h3>
            <p className="pb-3 pe-5">{text}</p>
            <Link href="/contact-us" passHref>
              <a className="btn btn-success text-white btn-wide">
                {buttonText}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  </Parallax>
);

OurInvestors.defaultProps = {
  image: '/assets/img/bg/investors.jpeg',
  text: 'Invest today and watch your money grow',
  header: (
    <>
      Get up to <br className="d-block d-md-none" />{' '}
      <span className="text-success">45% return</span> <br /> on investment
    </>
  ),
  buttonText: 'Learn More',
};

export default OurInvestors;
