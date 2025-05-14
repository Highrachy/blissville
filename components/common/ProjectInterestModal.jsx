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

// ─────────────────────────────────────────────
// STEP-1 - OPTION LIST
// ─────────────────────────────────────────────
const StepOne = ({ propertyName, setView }) => (
  <section>
    <h4 className="fw-semibold mb-2">Thank you for your interest!</h4>
    <p className="text-muted mb-4">
      You can speak with a sales advisor, ask us a question, or schedule a visit
      to the property.
    </p>

    <div className="pi-option-list">
      <div
        className="pi-option-item"
        onClick={() => setView('contact')}
        role="button"
      >
        <div>
          <div className="pi-option-title">Speak with a Sales Advisor</div>
          <div className="pi-option-meta">
            <FaSquarePhone className="me-2 text-primary" />
            Call or chat with us directly
          </div>
        </div>
        <span className="pi-option-arrow">&rarr;</span>
      </div>

      <div
        className="pi-option-item"
        onClick={() => setView('form')}
        role="button"
      >
        <div>
          <div className="pi-option-title">Ask us a Question</div>
          <div className="pi-option-meta">
            <FaMessage className="me-2 text-info" />
            We will get back within 24 hours
          </div>
        </div>
        <span className="pi-option-arrow">&rarr;</span>
      </div>

      <div
        className="pi-option-item"
        onClick={() => setView('schedule')}
        role="button"
      >
        <div>
          <div className="pi-option-title">Schedule a visit</div>
          <div className="pi-option-meta">
            <FaCalendarAlt className="me-2 text-primary" />
            Pick a date to see the property.
          </div>
        </div>
        <span className="pi-option-arrow">&rarr;</span>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// CONTACT - CALL / WHATSAPP
// ─────────────────────────────────────────────
function ContactOptions({ propertyName, onBack }) {
  const handleContactClick = (number, type) => {
    if (type === 'whatsapp') {
      window.open(
        `https://wa.me/${number}?text=${encodeURIComponent(
          `Hello, I'm interested in the property: ${propertyName}`
        )}`,
        '_blank'
      );
    } else {
      window.open(`tel:+${number}`);
    }
  };

  return (
    <div>
      <h4 className="fw-semibold mb-2">Speak with a Sales Advisor</h4>
      <p className="text-muted mb-4">
        Choose a contact method for each available rep below.
      </p>

      <div className="pi-option-list">
        {SALES_CONTACTS.map((contact) => (
          <div className="pi-option-item px-3 py-3" key={contact.number}>
            <div className="d-flex justify-content-between align-items-start flex-wrap">
              <div>
                <div className="pi-option-title">
                  +{contact.number.slice(0, 3)} {contact.number.slice(3, 6)}{' '}
                  {contact.number.slice(6)}
                </div>
                <div className="pi-option-meta">Sales Representative</div>
              </div>
              <div className="d-flex gap-3 mt-2 mt-md-0">
                <button
                  className="btn btn-outline-primary d-flex align-items-center gap-2"
                  onClick={() => handleContactClick(contact.number, 'call')}
                >
                  <FaSquarePhone size={18} />
                  <span className="d-none d-sm-inline">Call Now</span>
                </button>
                <button
                  className="btn btn-outline-success d-flex align-items-center gap-2"
                  onClick={() => handleContactClick(contact.number, 'whatsapp')}
                >
                  <FaWhatsappSquare size={18} />
                  <span className="d-none d-sm-inline">Chat on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-link mt-4" onClick={onBack}>
        &larr; Back
      </button>
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
        <button type="button" className="btn btn-link" onClick={onBack}>
          &larr; Back
        </button>
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
      <h4 className="fw-semibold mb-2">Schedule a visit</h4>
      <VisitationForm />
    </FormikForm>
  );
};

// ─────────────────────────────────────────────
// MAIN MODAL
// ─────────────────────────────────────────────
const ProjectInterestModal = ({ show, onHide, propertyName }) => {
  const [view, setView] = useState('options'); // options | contact | form | schedule

  return (
    <Modal
      show={show}
      onHide={() => {
        setView('options');
        onHide();
      }}
      size="md"
    >
      <section className="p-3">
        {view === 'options' && (
          <StepOne propertyName={propertyName} setView={setView} />
        )}

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
        <button
          type="button"
          className="btn-modal-close"
          aria-label="Close"
          onClick={() => {
            setView('options');
            onHide();
          }}
        >
          &times;
        </button>
      </section>
    </Modal>
  );
};

export default ProjectInterestModal;
