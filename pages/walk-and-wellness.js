import React, { useState } from 'react';
import SeoHead from '@/components/utils/SeoHead';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import Section from '@/components/common/Section';
import Fade from 'react-reveal/Fade';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError, statusIsSuccessful } from '@/utils/helpers';
import {
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiClock,
  FiMapPin,
  FiUsers,
} from 'react-icons/fi';

export default function WalkAndWellness() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    hasClients: '',
    priceRange: '',
    source: '',
    sourceOther: '',
    additionalInfo: '',
  });

  const errors = {
    firstName: form.firstName.trim().length < 2,
    lastName: form.lastName.trim().length < 2,
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    company: form.company.trim().length < 2,
    phone: form.phone.replace(/\D/g, '').length < 7,
    hasClients: form.hasClients === '',
    priceRange: form.priceRange === '',
    source: form.source === '',
    sourceOther: form.source === 'Other' && form.sourceOther.trim() === '',
  };

  const isValid =
    !errors.firstName &&
    !errors.lastName &&
    !errors.email &&
    !errors.company &&
    !errors.phone &&
    !errors.hasClients &&
    !errors.priceRange &&
    !errors.source &&
    !errors.sourceOther;

  const handleBlur = (field) => setTouched({ ...touched, [field]: true });

  const handlePhoneChange = (value) => {
    const cleaned = value.replace(/\D/g, '');
    setForm({ ...form, phone: cleaned });
  };

  const handleOptionClick = (field, value, isMultiple = false) => {
    if (isMultiple) {
      const current = form[field] || [];
      const newArray = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setForm({ ...form, [field]: newArray });
    } else {
      setForm({ ...form, [field]: value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        company: true,
        phone: true,
        hasClients: true,
        priceRange: true,
        source: true,
        sourceOther: true,
      });

      setTimeout(() => {
        const errorElement = document.querySelector(
          '.is-invalid, .wellness-field-error',
        );
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);

      return;
    }

    setLoading(true);

    const finalSource =
      form.source === 'Other' && form.sourceOther
        ? form.sourceOther
        : form.source;

    const extraContent = {
      company: form.company,
      hasClients: form.hasClients,
      priceRange: form.priceRange,
      additionalInfo: form.additionalInfo,
      source: finalSource,
    };

    const payload = {
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
      source: 'Walkness & Walk Regsitration page',
      funnel: 'Blissville Walk & Wellness',
      content: JSON.stringify(extraContent),
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/funnels`,
        { data: payload },
      );
      if (statusIsSuccessful(response.status)) {
        setSent(true);
        setTimeout(() => {
          const successElement = document.getElementById(
            'registration-complete',
          );
          if (successElement) {
            successElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        }, 100);
      }
    } catch (error) {
      toast.error(getError(error));
      console.log('getError', getError(error));
    } finally {
      setLoading(false);
    }
  };

  const renderOptions = (field, options, isMultiple = false) => {
    const showOtherInput = isMultiple
      ? form[field].includes('Other')
      : form[field] === 'Other';

    return (
      <div className="wellness-options-wrapper">
        <div className="wellness-options">
          {options.map((option, index) => {
            const value = typeof option === 'string' ? option : option.value;
            const label = typeof option === 'string' ? option : option.label;
            const letter = String.fromCharCode(65 + index);
            const isSelected = isMultiple
              ? form[field].includes(value)
              : form[field] === value;
            return (
              <label
                className={`wellness-option ${isSelected ? 'is-selected' : ''}`}
                key={value}
              >
                <input
                  type={isMultiple ? 'checkbox' : 'radio'}
                  name={field}
                  value={value}
                  checked={isSelected}
                  onChange={() => handleOptionClick(field, value, isMultiple)}
                />
                <span className="wellness-option__key" aria-hidden="true">
                  {isSelected ? <FiCheck /> : letter}
                </span>
                <span className="wellness-option__label">{label}</span>
              </label>
            );
          })}
        </div>
        {showOtherInput && (
          <div className="wellness-other-input mt-3">
            <input
              type="text"
              className={`form-control wellness-input ${touched[`${field}Other`] && errors[`${field}Other`] ? 'is-invalid' : ''}`}
              placeholder="Please specify..."
              value={form[`${field}Other`] || ''}
              onBlur={() => handleBlur(`${field}Other`)}
              onChange={(e) =>
                setForm({ ...form, [`${field}Other`]: e.target.value })
              }
            />
            {touched[`${field}Other`] && errors[`${field}Other`] && (
              <div className="wellness-field-error">
                Please specify your answer.
              </div>
            )}
          </div>
        )}
        {touched[field] && errors[field] && (
          <div className="wellness-field-error">Please select an option.</div>
        )}
      </div>
    );
  };

  return (
    <>
      <SeoHead
        title="Blissville Walk & Wellness Registration"
        description="Join us for a curated morning of movement, wellness, networking and an exclusive experience at Blissville Terraces."
      />

      <Navigation />

      <main className="wellness-page">
        <Section className="wellness-section">
          <div className="container wellness-container">
            <Fade bottom distance="24px">
              <div className="wellness-shell">
                <aside className="wellness-intro">
                  <div className="wellness-intro__image" aria-hidden="true" />
                  <div className="wellness-intro__content">
                    <span className="wellness-eyebrow">
                      An invitation for real estate professionals
                    </span>
                    <h1>
                      Walk. Connect. <span>Feel well.</span>
                    </h1>
                    <p>
                      Start the morning with movement, meaningful conversations,
                      and an exclusive experience of Blissville Terraces.
                    </p>

                    <div className="wellness-event-details">
                      <div className="wellness-event-detail">
                        <FiCalendar />
                        <div>
                          <span>Date</span>
                          <strong>Saturday, 22 August 2026</strong>
                        </div>
                      </div>
                      <div className="wellness-event-detail">
                        <FiClock />
                        <div>
                          <span>Experience</span>
                          <strong>Walk, stretch &amp; connect</strong>
                        </div>
                      </div>
                      <div className="wellness-event-detail">
                        <FiMapPin />
                        <div>
                          <span>Meeting point</span>
                          <strong>Shared after registration</strong>
                        </div>
                      </div>
                    </div>

                    <div className="wellness-availability">
                      <FiUsers />
                      <span>
                        <strong>Limited spaces.</strong> Registration takes
                        about 2 minutes.
                      </span>
                    </div>
                  </div>
                </aside>

                <div className="wellness-form-panel">
                  {!sent ? (
                    <form onSubmit={onSubmit} noValidate>
                      <div className="wellness-form-heading">
                        <span className="wellness-step-label">
                          Event registration
                        </span>
                        <h2>Reserve your place</h2>
                        <p>
                          Tell us a little about you and the clients you serve.
                        </p>
                      </div>

                      <section className="wellness-form-section">
                        <div className="wellness-section-heading">
                          <span>01</span>
                          <div>
                            <h3>Your details</h3>
                            <p>How we can identify and reach you.</p>
                          </div>
                        </div>
                        <div className="row g-3 g-md-4">
                          <div className="col-12 col-md-6">
                            <label
                              className="wellness-label"
                              htmlFor="firstName"
                            >
                              First name <span>*</span>
                            </label>
                            <input
                              id="firstName"
                              type="text"
                              className={`form-control wellness-input ${touched.firstName && errors.firstName ? 'is-invalid' : ''}`}
                              placeholder="e.g. Ada"
                              value={form.firstName}
                              onBlur={() => handleBlur('firstName')}
                              onChange={(e) =>
                                setForm({ ...form, firstName: e.target.value })
                              }
                              aria-invalid={
                                touched.firstName && errors.firstName
                              }
                            />
                          </div>
                          <div className="col-12 col-md-6">
                            <label
                              className="wellness-label"
                              htmlFor="lastName"
                            >
                              Last name <span>*</span>
                            </label>
                            <input
                              id="lastName"
                              type="text"
                              className={`form-control wellness-input ${touched.lastName && errors.lastName ? 'is-invalid' : ''}`}
                              placeholder="e.g. Okafor"
                              value={form.lastName}
                              onBlur={() => handleBlur('lastName')}
                              onChange={(e) =>
                                setForm({ ...form, lastName: e.target.value })
                              }
                              aria-invalid={touched.lastName && errors.lastName}
                            />
                          </div>
                          <div className="col-12 col-md-6">
                            <label className="wellness-label" htmlFor="email">
                              Email address <span>*</span>
                            </label>
                            <input
                              id="email"
                              type="email"
                              className={`form-control wellness-input ${touched.email && errors.email ? 'is-invalid' : ''}`}
                              placeholder="e.g. ada@example.com"
                              value={form.email}
                              onBlur={() => handleBlur('email')}
                              onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                              }
                              aria-invalid={touched.email && errors.email}
                            />
                          </div>
                          <div className="col-12 col-md-6">
                            <label className="wellness-label" htmlFor="phone">
                              Phone / WhatsApp <span>*</span>
                            </label>
                            <input
                              id="phone"
                              type="tel"
                              className={`form-control wellness-input ${touched.phone && errors.phone ? 'is-invalid' : ''}`}
                              placeholder="0801 234 5678"
                              value={form.phone}
                              onBlur={() => handleBlur('phone')}
                              onChange={(e) =>
                                handlePhoneChange(e.target.value)
                              }
                              inputMode="tel"
                              aria-invalid={touched.phone && errors.phone}
                            />
                          </div>
                          <div className="col-12">
                            <label className="wellness-label" htmlFor="company">
                              Company / Brokerage <span>*</span>
                            </label>
                            <input
                              id="company"
                              type="text"
                              className={`form-control wellness-input ${touched.company && errors.company ? 'is-invalid' : ''}`}
                              placeholder="Your company name"
                              value={form.company}
                              onBlur={() => handleBlur('company')}
                              onChange={(e) =>
                                setForm({ ...form, company: e.target.value })
                              }
                              aria-invalid={touched.company && errors.company}
                            />
                          </div>
                        </div>
                      </section>

                      <section className="wellness-form-section">
                        <div className="wellness-section-heading">
                          <span>02</span>
                          <div>
                            <h3>Your market</h3>
                            <p>A quick view of the clients you serve.</p>
                          </div>
                        </div>

                        <fieldset className="wellness-question">
                          <legend>
                            Do you currently have clients looking for
                            residential property in the Lekki/Ajah/Sangotedo
                            axis? <span className="text-danger">*</span>
                          </legend>
                          {renderOptions('hasClients', [
                            { label: 'Yes, I do', value: 'Yes' },
                            { label: 'No, not right now', value: 'No' },
                          ])}
                        </fieldset>

                        <fieldset className="wellness-question">
                          <legend>
                            What price range do your clients typically consider?{' '}
                            <span className="text-danger">*</span>
                          </legend>
                          {renderOptions('priceRange', [
                            '₦50M – ₦100M',
                            '₦100M – ₦150M',
                            '₦150M – ₦200M',
                            '₦200M+',
                          ])}
                        </fieldset>

                        <fieldset className="wellness-question">
                          <legend>
                            How did you hear about the Blissville Walk &
                            Wellness? <span className="text-danger">*</span>
                          </legend>
                          {renderOptions('source', [
                            'Instagram',
                            'Referral',
                            'Brokerage / Company',
                            'Other',
                          ])}
                        </fieldset>

                        <div className="wellness-question">
                          <label
                            className="wellness-label wellness-label--question"
                            htmlFor="additionalInfo"
                          >
                            Anything else you&apos;d like us to know?{' '}
                            <small>Optional</small>
                          </label>
                          <textarea
                            id="additionalInfo"
                            className="form-control wellness-input wellness-textarea"
                            rows="4"
                            placeholder="Any additional notes for the team"
                            value={form.additionalInfo}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                additionalInfo: e.target.value,
                              })
                            }
                          ></textarea>
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
                              Processing...
                            </>
                          ) : (
                            <>
                              Complete registration <FiArrowRight />
                            </>
                          )}
                        </button>
                        <small>
                          By registering, you agree to receive updates about
                          this event and Blissville.
                        </small>
                      </div>
                    </form>
                  ) : (
                    <div
                      id="registration-complete"
                      className="wellness-success text-center"
                      role="status"
                    >
                      <div className="wellness-success__icon">
                        <FiCheck />
                      </div>
                      <span className="wellness-step-label">
                        You&apos;re on the list
                      </span>
                      <h2>Registration complete.</h2>
                      <p>
                        We&apos;re excited to welcome you. Your meeting point
                        and event details will be shared shortly.
                      </p>
                      <button
                        type="button"
                        className="wellness-secondary-button"
                        onClick={() => {
                          setSent(false);
                          setForm({
                            firstName: '',
                            lastName: '',
                            email: '',
                            company: '',
                            phone: '',
                            hasClients: '',
                            priceRange: '',
                            propertyType: [],
                            propertyTypeOther: '',
                            source: '',
                            sourceOther: '',
                            additionalInfo: '',
                          });
                          setTouched({});
                        }}
                      >
                        Register another person
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
