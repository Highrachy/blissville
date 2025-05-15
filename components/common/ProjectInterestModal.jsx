import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import Textarea from '@/components/forms/Textarea';
import FormikButton from '@/components/forms/FormikButton';
import DatePicker from '@/components/forms/DatePicker';
import {
  contactUsSchema,
  visitationSchema,
} from '@/components/forms/schemas/page-schema';
import axios from 'axios';
import { SALES_CONTACTS } from './Whatsapp';
import { FaMessage, FaSquarePhone } from 'react-icons/fa6';
import { FaCalendarAlt, FaWhatsappSquare } from 'react-icons/fa';
import { VisitationForm } from './ScheduleVisit';
import Button from '../forms/Button';

// ─────────────────────────────────────────────
// BACK BUTTON COMPONENT
// ─────────────────────────────────────────────
const BackButton = ({ onClick, className = '', children }) => (
  <Button
    color="light"
    className={`btn btn-link ${className}`}
    onClick={onClick}
  >
    &larr; {children || 'Back'}
  </Button>
);

// ─────────────────────────────────────────────
// STEP-1 - OPTION LIST
// ─────────────────────────────────────────────
const StepOptionItem = ({ className, onClick, title, icon, meta }) => (
  <div
    className={`pi-option-item ${className}`}
    onClick={onClick}
    role="button"
  >
    <div>
      <div className="pi-option-title">{title}</div>
      <div className="pi-option-meta">
        {icon}
        {meta}
      </div>
    </div>
    <span className="pi-option-arrow">&rarr;</span>
  </div>
);

const StepOne = ({ header, setView }) => (
  <section>
    <h5 className="fw-semibold mb-2 text-primary">{header}</h5>
    <p className="mb-4">
      You can speak with a sales advisor, ask us a question, or schedule a visit
      to the property.
    </p>

    <div className="pi-option-list">
      <StepOptionItem
        className="pi-primary"
        onClick={() => setView('contact')}
        title="Speak with a Sales Advisor"
        icon={<FaSquarePhone className="me-2 pi-option-icon" />}
        meta="Call or chat with us directly"
      />
      <StepOptionItem
        className="pi-secondary"
        onClick={() => setView('schedule')}
        title="Schedule a visit"
        icon={<FaCalendarAlt className="me-2 pi-option-icon" />}
        meta="Pick a date to see the property."
      />
      <StepOptionItem
        className="pi-info"
        onClick={() => setView('form')}
        title="Ask us a Question"
        icon={<FaMessage className="me-2 pi-option-icon" />}
        meta="We will get back within 24 hours"
      />
    </div>
  </section>
);

// ─────────────────────────────────────────────
// CONTACT - CALL / WHATSAPP
// ─────────────────────────────────────────────

function ContactOptions({ propertyName, onBack }) {
  const handleContactClick = (number, type) => {
    const cleanNumber = number.replace(/\s+/g, '');
    const message = `Hello, I'm interested in the property: ${propertyName}`;
    const url =
      type === 'whatsapp'
        ? `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`
        : `tel:+${cleanNumber}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <h5 className="fw-semibold text-primary-700 text-center mb-2">
        Speak with a Sales Advisor
      </h5>
      <p className="text-muted mb-4 text-center">
        Choose a contact method for each available sales advisor below.
      </p>

      <div className="pi-option-list">
        {SALES_CONTACTS.map((contact, index) => (
          <div
            key={contact.number}
            className={`rounded mb-2 p-3 text-center ${
              index % 2 === 0
                ? 'bg-primary-50 border border-primary-200'
                : 'bg-primary-50 border border-secondary-200'
            }`}
          >
            <h4 className="fw-bold mb-2 text-dark-900">
              +{contact.number.slice(0, 3)} {contact.number.slice(3, 6)}{' '}
              {contact.number.slice(6, 9)} {contact.number.slice(9)}
            </h4>

            <div className="d-flex justify-content-center gap-3">
              <button
                className="btn p-0 border-0 bg-transparent text-info-600 icon-hover"
                onClick={() => handleContactClick(contact.number, 'call')}
                title="Call"
              >
                <FaSquarePhone size={36} />
              </button>

              <button
                className="btn p-0 border-0 bg-transparent text-secondary-600 icon-hover"
                onClick={() => handleContactClick(contact.number, 'whatsapp')}
                title="WhatsApp"
              >
                <FaWhatsappSquare size={36} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <h6 className="text-dark text-center mt-4">
        or email us at{' '}
        <a
          href="mailto:info@blissville.com"
          className="text-decoration-underline"
        >
          info@blissville.com
        </a>
      </h6>

      <div className="text-center mt-4">
        <BackButton onClick={onBack} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MESSAGE FORM
// ─────────────────────────────────────────────
const MessageForm = ({ propertyName, onBack }) => {
  const [alert, setAlert] = useState({ type: '', msg: '' });

  return (
    <FormikForm
      schema={contactUsSchema}
      handleSubmit={async (values, actions) => {
        try {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts`, {
            data: { ...values, source: `Project: ${propertyName}` },
          });
          setAlert({
            type: 'success',
            msg: 'Message sent! We’ll be in touch.',
          });
          actions.resetForm();
        } catch {
          setAlert({ type: 'danger', msg: 'Error, please try again.' });
        }
        actions.setSubmitting(false);
      }}
      name="project-interest-form"
      buttonText="Submit"
    >
      <h4 className="fw-semibold mb-2">Ask us a Question</h4>
      <div className="mb-3">
        <Input name="name" label="Full Name" />
      </div>
      <div className="mb-3">
        <Input name="email" type="email" label="Email Address" />
      </div>
      <div className="mb-3">
        <Input name="phone" label="Phone Number" />
      </div>
      <div className="mb-3">
        <Textarea name="message" label="Your Message" />
      </div>
      {alert.msg && (
        <div className={`alert alert-${alert.type}`}>{alert.msg}</div>
      )}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <BackButton onClick={onBack} />
        <FormikButton color="primary" className="btn-wide" type="submit">
          Submit
        </FormikButton>
      </div>
    </FormikForm>
  );
};

// ─────────────────────────────────────────────
// SCHEDULE VISIT FORM
// ─────────────────────────────────────────────
const ScheduleVisitForm = ({ propertyName, onBack }) => {
  const [alert, setAlert] = useState({ type: '', msg: '' });

  return (
    <FormikForm
      schema={visitationSchema}
      handleSubmit={async (values, actions) => {
        try {
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/visitations`,
            {
              data: {
                ...values,
                visiting: `Project: ${propertyName}`,
                visitDate: values.visitDate?.date || values.visitDate,
              },
            }
          );
          setAlert({ type: 'success', msg: 'Visit scheduled successfully.' });
          actions.resetForm();
        } catch {
          setAlert({ type: 'danger', msg: 'Error, please try again.' });
        }
        actions.setSubmitting(false);
      }}
      name="pi-visit-form"
      buttonText="Schedule Visit"
    >
      <h4 className="fw-semibold text-info-800 text-center mb-2">
        Schedule a Visit
      </h4>
      <VisitationForm />
      {alert.msg && (
        <div className={`alert alert-${alert.type}`}>{alert.msg}</div>
      )}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <BackButton onClick={onBack} />
      </div>
    </FormikForm>
  );
};

// ─────────────────────────────────────────────
// MAIN CONTENT FOR MODAL (EXPORTED)
// ─────────────────────────────────────────────
export function ProjectInterestContent({
  propertyName,
  header = 'Thank you for your interest!',
  onHide = () => {},
  showCloseButton = false,
}) {
  const [view, setView] = useState('options'); // options | contact | form | schedule
  return (
    <section>
      {showCloseButton && (
        <button
          type="button"
          className="btn-modal-close"
          aria-label="Close"
          onClick={() => {
            setView('options');
            if (onHide) onHide();
          }}
        >
          &times;
        </button>
      )}
      {view === 'options' && <StepOne header={header} setView={setView} />}

      {view === 'contact' && (
        <ContactOptions
          propertyName={propertyName}
          onBack={() => setView('options')}
        />
      )}

      {view === 'form' && (
        <MessageForm
          propertyName={propertyName}
          onBack={() => setView('options')}
        />
      )}

      {view === 'schedule' && (
        <ScheduleVisitForm
          propertyName={propertyName}
          onBack={() => setView('options')}
        />
      )}
    </section>
  );
}

// ─────────────────────────────────────────────
// MAIN MODAL
// ─────────────────────────────────────────────
const ProjectInterestModal = ({ show, onHide, propertyName }) => {
  return (
    <Modal
      show={show}
      onHide={() => {
        if (onHide) onHide();
      }}
      size="md"
    >
      <section className="p-3">
        <ProjectInterestContent
          propertyName={propertyName}
          onHide={onHide}
          showCloseButton
        />
      </section>
    </Modal>
  );
};

export default ProjectInterestModal;
