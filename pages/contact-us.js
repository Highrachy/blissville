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
import { PHONE_NUMBER } from '@/utils/constants';
import axios from 'axios';
import { getTokenFromStore } from '@/utils/localStorage';
import { getError, statusIsSuccessful } from '@/utils/helpers';
import FormikButton from '@/components/forms/FormikButton';

const ContactUs = () => {
  return (
    <>
      <Navigation />
      <Map />
      <ContactUsForm />
      <ContactInfo />
      <Footer />
    </>
  );
};

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
                    5th Floor, Ibukun House, <br />
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
                  </p>
                </div>
              </li>
              <li>
                <div className="contact-text d-flex align-items-center pb-4">
                  <span className="icon-circled">
                    <WebsiteIcon />
                  </span>
                  <p>
                    <a href="mailto:info@highrachy.com" className="text-reset">
                      info@highrachy.com
                    </a>
                    <br />
                    <a href="https://www.highrachy.com" className="text-reset">
                      www.highrachy.com
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
    <Section className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="text-center">
            <h3>Contact Us</h3>
            <p className="lead">
              We&apos;ll update you within the next 24 hours
            </p>
          </div>
          <ContactForm />
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
        headers: { Authorization: getTokenFromStore() },
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
