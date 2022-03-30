import Button from '@/components/forms/Button';
import Navigation from '@/components/layouts/Navigation';
import Image from 'next/image';
import Link from 'next/link';
import { socialMediaLinks } from '../data';

export default function Home() {
  return (
    <>
      <Navigation />
      <section className="position-relative">
        <div className="container">
          <div className="row position-relative">
            <section className="col-6">
              <h1 className="text-primary text-title mt-5">
                Start planning your dream home with us
              </h1>
              <p className="text-leading">
                Actualize the dream of buying a home readily tailored to suit
                your peculiar taste.
              </p>
              <div className="my-5">
                <Button color="primary">Buy Now</Button>
                <Button color="none text-secondary text-decoration-underline">
                  Learn Now
                </Button>
              </div>

              <div className="hero-icons">
                <ul className="list-inline ms-auto">
                  {socialMediaLinks.map(({ icon, url }, index) => (
                    <li
                      key={`social-link-${index}`}
                      className="list-inline-item hero-icon"
                    >
                      <Link href={url} passHref>
                        <a className="text-reset icon-sm">{icon}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            <section className="col-6">
              <div className="hero-image py-6 ps-5">
                <Image
                  src="/assets/img/home/hero.png"
                  alt="Hero Image"
                  width={601}
                  height={564}
                />
              </div>
            </section>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </section>
    </>
  );
}
