import { footerLinks } from '@/data/index';
import { PHONE_NUMBER } from '@/utils/constants';
import Link from 'next/link';

const Footer = () => (
  <>
    <footer className="bg-dark text-white">
      <section>
        <div className="container py-7">
          <div className="row">
            <div className="col-md-3 col-sm-12">
              <h5 className="text-white pb-2">About Us</h5>
              <p className="small text-dark-light">
                The unique thing about our investors is that they are very
                erudite and exposed individuals that can tell the difference
                between mediocre and true quality, words and actions.
              </p>
            </div>
            <div className="col-md-5 offset-md-1 col-sm-6 col-6">
              <h6 className="text-white pb-2">Quick Links</h6>
              <ul className="text-dark-light list-unstyled row">
                {footerLinks.map(({ title, url }) => (
                  <li key={title} className="col-sm-6 pb-2">
                    <Link href={url} passHref>
                      <a className="text-reset text-decoration-none small">
                        {title}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-3 col-sm-12">
              <h6 className="text-white pb-2">Contact Us</h6>
              <div className="small text-dark-light">
                <p>
                  5th Floor, Ibukun House, <br />
                  No. 70 Adetokunbo Ademola Street, <br />
                  Victoria Island, Lagos.
                </p>
                <p>Email: nnamdi@highrachy.com</p>
                <p>
                  <span>Phone:</span> {PHONE_NUMBER.WITH_COUNTRY_CODE}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  </>
);

export default Footer;
