import { footerLinks } from '@/data/index';
import {
  BLISSVILLE_OFFICIAL_EMAIL,
  PHONE_NUMBER,
  PHONE_NUMBER_ALT,
} from '@/utils/constants';
import Link from 'next/link';

const Footer = () => (
  <>
    <footer className="bg-dark text-white">
      <section>
        <div className="container py-7">
          <div className="row">
            <div className="col-md-3 col-sm-12">
              <h5 className="text-white pb-2">About Us</h5>
              <p className="text-dark-light">
                Blissville is a leading real estate brand committed to
                delivering true value through smart, convenient, and efficient
                housing solutions across Africa.
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
                  3rd Floor, Ibukun House, <br />
                  No. 70 Adetokunbo Ademola Street, <br />
                  Victoria Island, Lagos.
                </p>
                <p>Email: {BLISSVILLE_OFFICIAL_EMAIL}</p>
                <div className="d-flex">
                  <span className="me-2">Phone:</span>
                  <div>
                    <a href={PHONE_NUMBER.HREF} className="text-reset d-block">
                      {PHONE_NUMBER.WITH_COUNTRY_CODE}
                    </a>
                    <a
                      href={PHONE_NUMBER_ALT.HREF}
                      className="text-reset d-block"
                    >
                      {PHONE_NUMBER_ALT.WITH_COUNTRY_CODE}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  </>
);

export default Footer;
