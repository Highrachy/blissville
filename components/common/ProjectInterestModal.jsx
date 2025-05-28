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
import toast from 'react-hot-toast';
import { FaCheckCircle } from 'react-icons/fa';
import BuyNowButton from '../utils/BuyNowButton';

// ─────────────────────────────────────────────
// SUCCESS COMPONENT
// ─────────────────────────────────────────────
const SuccessConfirmation = ({
  title = 'Request Received',
  message,
  onDone,
}) => {
  return (
    <div className="text-center p-4 p-md-5">
      <FaCheckCircle className="text-success mb-3" size={72} />
      <h4 className="fw-bold">{title}</h4>
      <p className="text-muted mb-4">{message}</p>
      <button className="btn btn-success w-100" onClick={onDone}>
        Done
      </button>
    </div>
  );
};

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

const StepOne = ({ header, setView, property, contactSalesOnly, subject }) => (
  <section>
    <h5 className="fw-semibold mb-2 text-primary">{header}</h5>
    <p className="mb-4">
      {contactSalesOnly
        ? 'You can speak with a sales advisor or ask us a question.'
        : 'You can speak with a sales advisor, ask us a question, or schedule a visit to the property.'}
    </p>

    <div className="pi-option-list">
      <StepOptionItem
        className="pi-primary"
        onClick={() => setView('contact')}
        title="Speak with a Sales Advisor"
        icon={<FaSquarePhone className="me-2 pi-option-icon" />}
        meta="Call or chat with us directly"
      />
      {!contactSalesOnly && (
        <StepOptionItem
          className="pi-secondary"
          onClick={() => setView('schedule')}
          title="Schedule a visit"
          icon={<FaCalendarAlt className="me-2 pi-option-icon" />}
          meta="Pick a date to see the property."
        />
      )}
      <StepOptionItem
        className="pi-info"
        onClick={() => setView('form')}
        title={subject || 'Ask us a Question'}
        icon={<FaMessage className="me-2 pi-option-icon" />}
        meta="We will get back within 24 hours"
      />
    </div>

    {!contactSalesOnly && property?.price && property?.availableUnits > 0 && (
      <BuyNowButton
        className="w-100 mt-4"
        price={property?.price}
        paymentPlan={0}
        initialPayment={property?.price}
        property={property}
        packageName={property?.packageName || 'Shell'}
      >
        Buy Now
      </BuyNowButton>
    )}
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
const MessageForm = ({
  propertyName,
  onBack,
  setView,
  subject,
  description,
}) => {
  const [alert, setAlert] = useState({ type: '', msg: '' });

  return (
    <FormikForm
      schema={contactUsSchema}
      initialValues={{
        name: '',
        email: '',
        phone: '',
        message: description || '',
      }}
      handleSubmit={async (values, actions) => {
        try {
          const source =
            typeof window !== 'undefined' ? window.location.href : '';
          // Get 'ref' from query string if available
          let ref = '';
          if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            ref = params.get('ref') || '';
          }
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts`, {
            data: {
              ...values,
              source,
              subject: subject
                ? `${subject} (${propertyName})`
                : `Enquiry about ${propertyName}`,
              reference: ref,
            },
          });
          setAlert({
            type: 'success',
            msg: "Message sent! We'll be in touch.",
          });
          setView('success-message');
          actions.resetForm();
        } catch {
          setAlert({ type: 'danger', msg: 'Error, please try again.' });
        }
        actions.setSubmitting(false);
      }}
      name="project-interest-form"
      buttonText="Submit"
    >
      <h4 className="fw-semibold mb-2">
        {subject ? subject : 'Ask us a Question'}
      </h4>
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
        <div className={`alert mt-5 alert-${alert.type}`}>{alert.msg}</div>
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
const ScheduleVisitForm = ({ propertyName, onBack, setView }) => {
  const [alert, setAlert] = useState({ type: '', msg: '' });

  return (
    <FormikForm
      schema={visitationSchema}
      handleSubmit={async (values, actions) => {
        const source =
          typeof window !== 'undefined' ? window.location.href : '';
        const payload = {
          ...values,
          source,
          visiting: `Project: ${propertyName}`,
          visitDate: values.visitDate?.date
            ? new Date(values.visitDate.date).toISOString().slice(0, 10)
            : values.visitDate
            ? new Date(values.visitDate).toISOString().slice(0, 10)
            : '',
        };

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/visitations`,
            {
              data: payload,
            }
          );
          if (response.status < 200 || response.status >= 300) {
            toast.error('Failed to schedule visit');
          }
          setAlert({ type: 'success', msg: 'Visit scheduled successfully.' });
          setView('success-schedule');
          toast.success('Visit scheduled successfully.');
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
        <div className={`alert alert-${alert.type} mt-4`}>{alert.msg}</div>
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
  property = { more: 'test' },
  header = 'Thank you for your interest!',
  onHide = () => {},
  showCloseButton = false,
  contactSalesOnly = false,
  subject,
  description,
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
      {view === 'options' && (
        <StepOne
          header={header}
          setView={setView}
          property={property}
          contactSalesOnly={contactSalesOnly}
          subject={subject}
        />
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
          setView={setView}
          subject={subject}
          description={description}
        />
      )}

      {!contactSalesOnly && view === 'schedule' && (
        <ScheduleVisitForm
          propertyName={propertyName}
          onBack={() => setView('options')}
          setView={setView}
        />
      )}

      {view === 'success-message' && (
        <SuccessConfirmation
          title="Message Sent!"
          message="Thank you for reaching out. We'll be in touch within 24 hours with the next steps."
          onDone={() => setView('options')}
        />
      )}

      {view === 'success-schedule' && (
        <SuccessConfirmation
          title="Visit Scheduled"
          message="Thank you! We will get in touch with the next steps."
          onDone={() => setView('options')}
        />
      )}
    </section>
  );
}

// ─────────────────────────────────────────────
// MAIN MODAL
// ─────────────────────────────────────────────

const ProjectInterestModal = ({
  show,
  onHide,
  propertyName,
  property = {},
  contactSalesOnly = false,
  subject = '',
  description = '',
}) => {
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
          property={property}
          contactSalesOnly={contactSalesOnly}
          subject={subject}
          description={description}
        />
      </section>
    </Modal>
  );
};

export default ProjectInterestModal;
