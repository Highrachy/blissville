import React, { useEffect, useState } from 'react';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import SeoHead from '@/components/utils/SeoHead';
import FormikForm from '@/components/forms/FormikForm';
import { subscribeSchema } from '@/components/forms/schemas/page-schema';
import Input from '@/components/forms/Input';
import FormikButton from '@/components/forms/FormikButton';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getError, statusIsSuccessful } from '@/utils/helpers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Shield } from 'iconsax-react';

const Subscribe = () => {
  const router = useRouter();
  const [referenceQuery, setReferenceQuery] = useState('');

  useEffect(() => {
    if (router.isReady) {
      setReferenceQuery(router.query.ref || '');
    }
  }, [router.isReady, router.query.ref]);

  const handleSubmit = async (values, actions) => {
    const finalEmail = values.email;

    const payload = {
      name: `${values.firstName} ${values.lastName}`,
      email: finalEmail,
      phone: '',
      subject: `Newsletter Subscription Request`,
      message: `I would like to subscribe to the Blissville newsletter to receive property updates and investment strategies.`,
      source: 'Newsletter Subscribe Page',
      reference: referenceQuery || 'Website Direct',
    };

    try {
      const response = await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/contacts`,
        data: { data: payload },
      });
      const { status } = response;
      if (statusIsSuccessful(status)) {
        toast.success('Thank you! You have successfully subscribed to our newsletter.');
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
        title="Subscribe | Blissville Newsletter"
        description="Stay ahead of the Lagos real estate market. Subscribe to the Blissville newsletter for property investment insights and project updates."
        canonical="https://www.blissville.com.ng/newsletter/subscribe"
        keywords={[
          'Blissville newsletter',
          'Lagos real estate updates',
          'diaspora real estate investment',
          'Highrachy newsletter subscribe'
        ]}
      />
      <Navigation />

      <main className="bg-body-tertiary min-vh-100 d-flex flex-column align-items-center py-5">
        <div className="container" style={{ maxWidth: '700px' }}>
          {/* Header */}
          <div className="text-center mb-5 mt-5">
            <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3 fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
              NEWSLETTER SIGNUP
            </span>
            <h1 className="fw-semibold lh-1 display-4 my-3" style={{ color: '#111827' }}>
              Stay ahead of the <div className="text-primary">market.</div>
            </h1>
            <p className="lead text-dark mx-auto mt-5" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              Subscribe to get curated insights on real estate investment in Lagos, exclusive project previews, and milestones delivered directly to your inbox.
            </p>
          </div>

          {/* Form Card */}
          <div className="card shadow-sm border-0 rounded-4 p-4 p-md-5 mb-4">
            <FormikForm
              schema={subscribeSchema}
              initialValues={{ firstName: '', lastName: '', email: '' }}
              handleSubmit={handleSubmit}
              name="subscribe-form"
            >
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <Input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    label="First Name"
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    label="Last Name"
                  />
                </div>
              </div>

              <div className="mb-4">
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your professional email address"
                  label="Email Address"
                />
              </div>

              <div className="d-flex flex-column flex-sm-row align-items-center mt-4 gap-3">
                <FormikButton color="primary" className="btn-lg px-4 fw-bold w-100 w-sm-auto">
                  Subscribe Now
                </FormikButton>
              </div>
            </FormikForm>
          </div>

          {/* Footer of form */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center px-2 mt-4 mb-6">
            <div className="d-flex align-items-center text-muted small mb-3 mb-md-0 fw-semibold text-center">
              <Shield size="20" color="#22c55e" variant="Bulk" className="me-2 flex-shrink-0" />
              <span>We value your inbox. Unsubscribe anytime in one click.</span>
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

export default Subscribe;
