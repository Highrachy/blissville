import { footerLinks, socialMediaLinks } from '@/data/index';
import Link from 'next/link';
import { RightAngleIcon } from '../Icons/Icons';
import Section from '../common/Section';

const Footer = () => (
  <>
    <footer className="bg-dark text-white">
      <Section noPaddingBottom>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <h6 className="text-white">About Us</h6>
              <p className="small">
                The unique thing about our investors is that they are very
                erudite and exposed individuals that can tell the difference
                between mediocre and true quality, words and actions.
              </p>
            </div>
            <div className="col-md-4 col-sm-6 col-6">
              <h6 className="text-white">Helpful Links</h6>
              <ul className="text-white list-unstyled">
                {footerLinks.map(({ title, url }) => (
                  <li key={title}>
                    <Link href={url} passHref>
                      <a className="text-reset small">
                        <RightAngleIcon /> {title}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <h6 className="text-white">Contact Us</h6>
              <div className="small">
                <p>
                  5th Floor, Ibukun House, <br />
                  No. 70 Adetokunbo Ademola Street, <br />
                  Victoria Island, Lagos.
                </p>
                <p>Email: nnamdi@highrachy.com</p>
                <p>
                  <span>Phone:</span> +234 802 833 7440
                </p>
              </div>
              <ul className="list-inline text-white ms-auto">
                {socialMediaLinks.map(({ icon, url }, index) => (
                  <li key={`social-link-${index}`} className="list-inline-item">
                    <Link href={url} passHref>
                      <a className="text-reset icon-md">{icon}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="row mt-5 pt-5 pb-3">
            <div className="col-12 text-center">
              <p>
                &copy; {new Date().getFullYear()} Highrachy. All Rights
                Reserved.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </footer>
  </>
);

export default Footer;
