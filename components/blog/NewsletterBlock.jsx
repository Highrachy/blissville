import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { statusIsSuccessful, getError } from '@/utils/helpers';

const newsletterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export default function NewsletterBlock() {
  const handleSubmit = async (values, actions) => {
    const payload = {
      name: values.email.split('@')[0],
      email: values.email,
      phone: '',
      subject: 'New Blog Newsletter Subscriber',
      message: 'I would like to subscribe to The Monday Briefing.',
      source: 'Blog Newsletter Form',
      reference: '',
    };

    try {
      const response = await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/contacts`,
        data: { data: payload },
      });

      if (statusIsSuccessful(response.status)) {
        toast.success('Successfully subscribed to our newsletter!');
        actions.resetForm();
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <section className="newsletter-section py-6">
      <div className="container text-center">
        <div className="mx-auto" style={{ maxWidth: '650px' }}>
          <span className="d-block text-uppercase text-muted fw-bold mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.2em' }}>
            PROJECT PROGRESS
          </span>
          <h2 className="fw-bold mb-5" style={{ color: '#1a365d', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', lineHeight: '1.2' }}>
            Witness the evolution of your future home.
          </h2>

          <Formik
            initialValues={{ email: '' }}
            validationSchema={newsletterSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="mx-auto mb-4" style={{ maxWidth: '550px' }}>
                <div className="bg-white rounded p-1 d-flex shadow-sm border">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Your professional email"
                    className="form-control border-0 shadow-none px-3"
                    style={{ backgroundColor: 'transparent' }}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn px-4 fw-semibold rounded"
                    style={{ backgroundColor: '#1e3a8a', color: 'white', minWidth: '100px' }}
                  >
                    {isSubmitting ? '...' : 'JOIN'}
                  </button>
                </div>
                {errors.email && touched.email && (
                  <div className="text-danger small text-start mt-2 px-2">{errors.email}</div>
                )}
              </Form>
            )}
          </Formik>

          <p className="text-muted small fst-italic m-0" style={{ fontSize: '0.8rem' }}>
            Quarterly architectural milestones, delivered with precision.
          </p>
        </div>
      </div>
    </section>
  );
}
