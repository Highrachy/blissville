import React, { useEffect, useState } from 'react';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import SeoHead from '@/components/utils/SeoHead';
import FormikForm from '@/components/forms/FormikForm';
import { unsubscribeSchema } from '@/components/forms/schemas/page-schema';
import Textarea from '@/components/forms/Textarea';
import Input from '@/components/forms/Input';
import FormikButton from '@/components/forms/FormikButton';
import { FeedbackMessage } from '@/components/forms/form-helper';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getError, statusIsSuccessful } from '@/utils/helpers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Field } from 'formik';
import { Shield } from 'iconsax-react';

const Unsubscribe = () => {
  const router = useRouter();
  const [emailQuery, setEmailQuery] = useState(null);
  const [referenceQuery, setReferenceQuery] = useState('');

  useEffect(() => {
    if (router.isReady) {
      setEmailQuery(router.query.email || '');
      setReferenceQuery(router.query.ref || '');
    }
  }, [router.isReady, router.query.email, router.query.ref]);

  if (emailQuery === null) return null; // Wait for router to be ready

  const handleSubmit = async (values, actions) => {
    const finalEmail = values.email || emailQuery;
    const finalReason = values.reason;

    const reasonLabels = {
      frequency: 'Frequency is too high',
      relevance: 'Content not relevant',
      found_property: 'Found my property',
      other: 'Other'
    };
    const reasonText = reasonLabels[finalReason] || finalReason;
    const finalMessage = values.message ? values.message : `No additional details provided. Reason selected: ${reasonText}`;

    const payload = {
      name: finalEmail ? finalEmail.split('@')[0] : 'Newsletter Subscriber',
      email: finalEmail,
      phone: '',
      subject: `Newsletter Unsubscription - ${reasonText}`,
      message: finalMessage,
      source: 'Newsletter Unsubscribe',
      reference: referenceQuery || finalReason,
    };

    try {
      const response = await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/contacts`,
        data: { data: payload },
      });
      const { status } = response;
      if (statusIsSuccessful(status)) {
        toast.success('Your feedback has been submitted successfully.');
        actions.resetForm();
        actions.setSubmitting(false);
      }
    } catch (error) {
      toast.error(getError(error));
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <SeoHead
        title="Unsubscribe | Blissville Newsletter"
        description="Manage your subscription and communication preferences for Blissville. Update your email settings or unsubscribe from our mailing list."
        canonical="https://www.blissville.com.ng/newsletter/unsubscribe"
        robots="noindex, nofollow"
        keywords={[
          'Blissville unsubscribe',
          'manage subscription Blissville',
          'newsletter preferences',
          'Highrachy email settings'
        ]}
      />
      <Navigation />

      <main className="bg-light min-vh-100 d-flex flex-column align-items-center py-5">
        <div className="container" style={{ maxWidth: '700px' }}>
          {/* Header */}
          <div className="text-center mb-5 mt-5">
            <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3 fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
              NEWSLETTER PREFERENCES
            </span>
            <h1 className="fw-semibold lh-1 display-4 my-3" style={{ color: '#111827' }}>
              We're sorry to see <div className="text-primary">you go.</div>
            </h1>
            <p className="lead text-dark mx-auto mt-5" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              Blissville is committed to only sharing property insights that matter.
              If we missed the mark, we'd value knowing why before you leave our community.
            </p>
          </div>

          {/* Form Card */}
          <div className="card shadow-sm border-0 rounded-4 p-4 p-md-5 mb-4">
            <FormikForm
              schema={unsubscribeSchema}
              initialValues={{ email: emailQuery, reason: '', message: '' }}
              handleSubmit={handleSubmit}
              name="unsubscribe-form"
            >
              {emailQuery ? (
                <div className="d-flex align-items-center pb-4 border-bottom mb-4">
                  <div className="rounded-circle bg-secondary-700 d-flex align-items-center justify-content-center text-white me-3 position-relative" style={{ width: '50px', height: '50px', flexShrink: 0, overflow: 'hidden' }}>
                    <span className="fw-bold fs-5">{emailQuery.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <h6 className="fw-bold text-secondary-800 mb-0">{emailQuery}</h6>
                    <small className="text-secondary-900 text-uppercase fw-semibold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>NEWSLETTER SUBSCRIBER</small>
                  </div>
                </div>
              ) : (
                <div className="mb-4 pb-4 border-bottom">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    label="Email Address"
                  />
                </div>
              )}

              <h6 className="text-uppercase fw-bold text-muted mb-3" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>
                HOW CAN WE IMPROVE?
              </h6>

              {/* Custom Radio Group to match 2x2 grid */}
              <Field name="reason">
                {({ field }) => (
                  <div className="row g-3 mb-2">
                    {[
                      { label: 'Frequency is too high', value: 'frequency' },
                      { label: 'Content not relevant', value: 'relevance' },
                      { label: 'Found my property', value: 'found_property' },
                      { label: 'Other', value: 'other' },
                    ].map((option) => {
                      const isSelected = field.value === option.value;
                      return (
                        <div className="col-md-6" key={option.value}>
                          <label
                            className={`w-100 p-3 border rounded-3 d-flex align-items-center form-check-label h-100 ${isSelected ? 'bg-primary-light text-primary border-primary' : 'bg-light'}`}
                            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                          >
                            <input
                              type="radio"
                              {...field}
                              value={option.value}
                              checked={isSelected}
                              className="form-check-input mt-0 me-3"
                              style={{ width: '1.2em', height: '1.2em', borderColor: isSelected ? 'rgba(255,255,255,0.5)' : '' }}
                            />
                            <span className={isSelected ? 'text-primary fw-semibold' : 'text-dark'}>{option.label}</span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Field>
              <div className="mb-4">
                <FeedbackMessage name="reason" showFeedback="ALL" />
              </div>

              <Textarea
                name="message"
                placeholder="Tell us more (optional)"
                rows={4}
                inputClassName="bg-light border-0"
              />

              <div className="d-flex flex-column flex-sm-row align-items-center mt-4 gap-3">
                <FormikButton color="primary" className="btn-lg px-4 fw-bold w-100 w-sm-auto">
                  Unsubscribe
                </FormikButton>
              </div>
            </FormikForm>
          </div>

          {/* Footer of form */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center px-2 mt-4 mb-6">
            <div className="d-flex align-items-center text-muted small mb-3 mb-md-0 fw-semibold text-center">
              <Shield size="20" color="#22c55e" variant="Bulk" className="me-2 flex-shrink-0" />
              <span>Your privacy is our architectural priority.</span>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-3 gap-md-4">
             <Link href="/"><a className="text-muted text-uppercase small fw-bold text-decoration-none" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>HOME PAGE</a></Link>
              <Link href="/contact-us"><a className="text-muted text-uppercase small fw-bold text-decoration-none" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>CONTACT SUPPORT</a></Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Unsubscribe;
