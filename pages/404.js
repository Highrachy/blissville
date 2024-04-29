import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import Section from '@/components/common/Section';
import Button from '@/components/forms/Button';
import Navigation from '@/components/layouts/Navigation';

const Page404 = () => (
  <>
    <Navigation />
    <PageHeader
      title="PAGE NOT FOUND"
      subHeader="Let's Get You Back on Track!"
      bgImage="/assets/img/bg/about-us.jpeg"
    />
    <Section>
      <div className="container">
        <div className="row">
          <div className="text-center px-2 px-md-6 px-lg-8">
            <h2>Page not found</h2>
            <p className="lead">
              We&apos;re sorry, but the page you&apos;re looking for cannot be
              found. You can navigate back to safety by using the menu above or
              clicking on the link below to return to our homepage.
            </p>
            <Button color="secondary" href="/">
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </Section>
    <Footer />
  </>
);

export default Page404;
