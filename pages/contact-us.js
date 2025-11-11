import { PhoneIcon } from '@/components/Icons/Icons';
import { WebsiteIcon } from '@/components/Icons/Icons';
import { LocationIcon } from '@/components/Icons/Icons';
import Section from '@/components/common/Section';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import { contactUsSchema } from '@/components/forms/schemas/page-schema';
import Select from '@/components/forms/Select';
import Textarea from '@/components/forms/Textarea';
import { valuesToOptions } from '@/utils/helpers';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-toastify';
import { socialMediaLinks } from '../data';
import Footer from '@/components/common/Footer';
import Navigation from '@/components/layouts/Navigation';
import {
  BLISSVILLE_OFFICIAL_EMAIL,
  PHONE_NUMBER,
  PHONE_NUMBER_ALT,
} from '@/utils/constants';
import axios from 'axios';
import { getTokenFromStore } from '@/utils/localStorage';
import { getError, statusIsSuccessful } from '@/utils/helpers';
import FormikButton from '@/components/forms/FormikButton';
import SeoHead from '@/components/utils/SeoHead';

const ContactUs = () => {
  return (
    <>
      <SeoHead
        title="Contact Blissville | Get in Touch with Highrachy Real Estate"
        description="Contact Blissville by Highrachy today. Visit our Lagos office or reach out for inquiries about luxury homes, waterfront terraces, investment opportunities, and real estate partnerships."
        canonical="https://www.blissville.com.ng/contact-us"
        ogImage="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-3.jpg"
        keywords={[
          'Contact Blissville Lagos',
          'Blissville contact information',
          'Highrachy real estate developers Lagos',
          'Luxury homes Lagos contact',
          'Real estate inquiry Lagos',
          'Waterfront terraces Sangotedo contact',
          'Property developers Nigeria contact',
          'Blissville customer service',
          'Real estate partnerships Lagos',
          'Book a site visit Blissville Terraces',
        ]}
      />
      <Navigation />
      <Map />
      <ContactIntro />
      <ContactUsForm />
      <ContactInfo />
      <Footer />
    </>
  );
};

const ContactIntro = () => (
  <section className="py-5">
    <div className="container text-center">
      <h2 className="fw-bold mb-3 mt-3 text-primary">
        Let&apos;s Help You Take the Next Step
      </h2>

      <p className="lead mx-auto mb-3" style={{ maxWidth: '720px' }}>
        Whether you are ready to invest, book a site visit, or learn more about{' '}
        <strong>Blissville</strong> developments, our team at{' '}
        <strong>Highrachy</strong> is always available to assist. We value open
        communication and ensure every inquiry receives prompt attention.
      </p>

      <p className="lead mx-auto" style={{ maxWidth: '720px' }}>
        Visit our office in <strong>Victoria Island, Lagos</strong>, or reach us
        by phone or email. Our goal is to make owning a{' '}
        <strong>home in Lagos</strong> simple, secure, and rewarding. Let&apos;s
        start your journey toward a better living experience today.
      </p>
    </div>
  </section>
);

const Map = () => (
  <section className="google-map">
    <iframe
      title="Highrachy on Google Map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7225456353594!2d3.4277053146311514!3d6.429678795348128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf52560c8903b%3A0x264b8d5dbb789d4a!2sHighrachy!5e0!3m2!1sen!2sus!4v1643001127842!5m2!1sen!2sus"
      height={450}
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      className="full-map img-cover"
      sandbox="allow-scripts allow-same-origin"
    />
  </section>
);

const ContactInfo = () => (
  <Section noPaddingTop altBg className="pt-3">
    <div id="form" className="contact-form-area">
      <div className="container">
        <div className="contact-info-wrapper mt-7">
          <h4>Office address</h4>
          <div className="contact-info">
            <p className="lead mt-4">
              Feel free to get in touch with us via any convenient way.
            </p>
            <ul className="list-unstyled">
              <li>
                <div className="contact-text d-flex align-items-center pb-4">
                  <span className="icon-circled">
                    <LocationIcon />
                  </span>
                  <p>
                    3rd Floor, Ibukun House, <br />
                    No.70 Adetokunbo Ademola Street, <br />
                    Victoria Island, Lagos.
                  </p>
                </div>
              </li>
              <li>
                <div className="contact-text d-flex align-items-center pb-4">
                  <span className="icon-circled">
                    <PhoneIcon />
                  </span>
                  <p>
                    <a href={PHONE_NUMBER.HREF} className="text-reset">
                      {PHONE_NUMBER.WITH_COUNTRY_CODE}
                    </a>
                    <br />
                    <a href={PHONE_NUMBER_ALT.HREF} className="text-reset">
                      {PHONE_NUMBER_ALT.WITH_COUNTRY_CODE}
                    </a>
                  </p>
                </div>
              </li>
              <li>
                <div className="contact-text d-flex align-items-center pb-4">
                  <span className="icon-circled">
                    <WebsiteIcon />
                  </span>
                  <p>
                    <a
                      href={`mailto:${BLISSVILLE_OFFICIAL_EMAIL}`}
                      className="text-reset"
                    >
                      {' '}
                      {BLISSVILLE_OFFICIAL_EMAIL}
                    </a>
                    <br />
                    <a
                      href="https://www.blissville.com.ng"
                      className="text-reset"
                    >
                      www.blissville.com.ng
                    </a>
                  </p>
                </div>
              </li>
            </ul>
            <ul className="list-inline icon-md2">
              <h4>Connect with us on social Media</h4>
              {socialMediaLinks.map(({ url, icon }, index) => (
                <li
                  className="list-inline-item"
                  key={`contact-social-media-${index}`}
                >
                  <Link href={url} passHref>
                    <a className="text-reset">{icon}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

const ContactUsForm = () => {
  return (
    <Section altBg>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="text-center">
              <h1>Send Us a Message</h1>
              <p className="lead">
                We&apos;ll update you within the next 24 hours
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </Section>
  );
};

const ContactForm = () => {
  const handleSubmit = async (values, actions) => {
    const payload = {
      ...values,
      source: 'Contact Us Page',
    };
    try {
      axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/contacts`,
        data: { data: payload },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            toast.success('Information sent successfully');
            actions.resetForm();
            actions.setSubmitting(false);
          }
        })
        .catch(function (error) {
          toast.error(getError(error));
        });
    } catch (error) {
      toast.error(getError(error));
    }
  };
  return (
    <FormikForm
      schema={contactUsSchema}
      handleSubmit={handleSubmit}
      name="contact-us-form"
      buttonText="Send Message"
    >
      <div className="row">
        <Input name="name" formGroupClassName="col-sm-6" label="Full Name" />
        <Input
          name="email"
          formGroupClassName="col-sm-6"
          type="email"
          label="Email Address"
        />
      </div>
      <div className="row">
        <Input
          formGroupClassName="col-sm-6"
          name="phone"
          label="Phone Number"
          optional
        />

        <Input name="subject" formGroupClassName="col-sm-6" label="Subject" />
      </div>
      <Textarea name="message" label="Your Message" />
      <FormikButton color="success" className="mt-2 text-white btn-wide">
        Send Message
      </FormikButton>
    </FormikForm>
  );
};

export default ContactUs;
