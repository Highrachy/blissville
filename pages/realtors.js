import React, { useState } from 'react';
import axios from 'axios';
import Fade from 'react-reveal/Fade';
import {
  FiArrowRight,
  FiBookOpen,
  FiCheck,
  FiGift,
  FiHome,
  FiTrendingUp,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import Footer from '@/components/common/Footer';
import Section from '@/components/common/Section';
import Navigation from '@/components/layouts/Navigation';
import SeoHead from '@/components/utils/SeoHead';
import { getError, statusIsSuccessful } from '@/utils/helpers';

const initialForm = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
};

const benefits = [
  { icon: FiHome, label: 'Blissville Terraces access' },
  { icon: FiTrendingUp, label: 'Competitive commissions' },
  { icon: FiBookOpen, label: 'Sales and marketing resources' },
  { icon: FiGift, label: 'Exclusive realtor incentives' },
];

export default function Realtors() {
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const errors = {
    firstName: form.firstName.trim().length < 2,
    lastName: form.lastName.trim().length < 2,
    phone: form.phone.replace(/\D/g, '').length < 7,
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
  };

  const isValid = Object.values(errors).every((error) => !error);

  const updateField = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  };

  const handleBlur = (field) => {
    setTouched((currentTouched) => ({ ...currentTouched, [field]: true }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!isValid) {
      setTouched({ firstName: true, lastName: true, phone: true, email: true });
      return;
    }

    setLoading(true);

    const payload = {
      name: `${form.firstName.trim()} ${form.lastName.trim()}`,
      email: form.email.trim(),
      phone: form.phone,
      source: 'Realtors Registration Page',
      funnel: 'Blissville Realtors Network',
      content: JSON.stringify({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
      }),
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/funnels`,
        { data: payload },
      );

      if (statusIsSuccessful(response.status)) {
        setSent(true);
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setTouched({});
    setSent(false);
  };

  const renderField = ({ id, label, type = 'text', placeholder }) => {
    const showError = touched[id] && errors[id];

    return (
      <div className="col-12 col-md-6">
        <label className="wellness-label" htmlFor={id}>
          {label} <span aria-hidden="true">*</span>
        </label>
        <input
          id={id}
          type={type}
          value={form[id]}
          placeholder={placeholder}
          className={`form-control wellness-input ${showError ? 'is-invalid' : ''}`}
          onBlur={() => handleBlur(id)}
          onChange={(event) =>
            updateField(
              id,
              id === 'phone'
                ? event.target.value.replace(/\D/g, '')
                : event.target.value,
            )
          }
          inputMode={id === 'phone' ? 'tel' : undefined}
          autoComplete={id === 'phone' ? 'tel' : id}
          aria-invalid={showError}
          aria-describedby={showError ? `${id}-error` : undefined}
        />
        {showError && (
          <div id={`${id}-error`} className="wellness-field-error">
            {id === 'email'
              ? 'Enter a valid email address.'
              : id === 'phone'
                ? 'Enter a valid mobile number.'
                : `Enter your ${label.toLowerCase()}.`}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <SeoHead
        title="Join the Blissville Realtors Network"
        description="Register as a Blissville realtor and access premium properties, competitive commissions, marketing resources and exclusive incentives."
      />

      <Navigation />

      <main className="wellness-page wellness-page--realtors">
        <Section className="wellness-section">
          <div className="container wellness-container">
            <Fade bottom distance="20px">
              <div className="wellness-shell">
                <aside className="wellness-intro">
                  <div
                    className="wellness-intro__image wellness-intro__image--realtors"
                    aria-hidden="true"
                  />
                  <div className="wellness-intro__content">
                    <span className="wellness-eyebrow">
                      Blissville Realtor Network
                    </span>
                    <h1>
                      Sell exceptional homes. <span>Earn more.</span>
                    </h1>
                    <p>
                      Join our network of real estate professionals and gain
                      privileged access to Blissville Terraces, sales
                      opportunities and the tools to close with confidence.
                    </p>

                    <div className="wellness-event-details">
                      {benefits.map(({ icon: Icon, label }) => (
                        <div className="wellness-event-detail" key={label}>
                          <Icon aria-hidden="true" />
                          <div>
                            <strong>{label}</strong>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>

                <div className="wellness-form-panel">
                  {!sent ? (
                    <form onSubmit={onSubmit} noValidate>
                      <div className="wellness-form-heading">
                        <span className="wellness-step-label">
                          Private registration
                        </span>
                        <h2>Become a Blissville realtor</h2>
                        <p>
                          Introduce yourself. Our partnerships team will be in
                          touch with the next steps.
                        </p>
                      </div>

                      <section className="wellness-form-section pt-4">
                        <div className="row g-3 g-md-4">
                          {renderField({
                            id: 'firstName',
                            label: 'First name',
                            placeholder: 'e.g. Ada',
                          })}
                          {renderField({
                            id: 'lastName',
                            label: 'Last name',
                            placeholder: 'e.g. Okafor',
                          })}
                          {renderField({
                            id: 'phone',
                            label: 'Mobile number',
                            type: 'tel',
                            placeholder: '0801 234 5678',
                          })}
                          {renderField({
                            id: 'email',
                            label: 'Email address',
                            type: 'email',
                            placeholder: 'ada@example.com',
                          })}
                        </div>
                      </section>

                      <div className="wellness-submit">
                        <button
                          className="wellness-submit-button"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm" />
                              Sending application...
                            </>
                          ) : (
                            <>
                              Join the realtor network <FiArrowRight />
                            </>
                          )}
                        </button>
                        <small>
                          By registering, you agree to receive relevant
                          partnership updates from Blissville.
                        </small>
                      </div>
                    </form>
                  ) : (
                    <div className="wellness-success" role="status">
                      <div className="wellness-success__icon">
                        <FiCheck />
                      </div>
                      <span className="wellness-step-label">
                        Application received
                      </span>
                      <h2>Welcome to the beginning of something rewarding.</h2>
                      <p>
                        Thank you for joining the Blissville Realtors Network.
                        Our partnerships team will contact you shortly.
                      </p>
                      <button
                        type="button"
                        className="wellness-secondary-button"
                        onClick={resetForm}
                      >
                        Register another realtor
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Fade>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
