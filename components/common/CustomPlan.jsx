import { useState, useEffect } from 'react';
import BuyNowButton from '../utils/BuyNowButton';
import { PACKAGE_NAME } from '@/data/packages';
import ProjectInterestModal from './ProjectInterestModal';
import Button from '../forms/Button';

const PAYMENT_PLANS = [
  {
    name: 'Outright Payment',
    color: '#1c4791',
    colorDark: '#163771',
    initialPayment: 135_000_000,
    monthlyPayment: null,
    durationMonths: 0,
  },
  {
    name: 'Flexi Plan',
    color: '#00903f',
    colorDark: '#007031',
    initialPayment: 20_000_000,
    monthlyPayment: 7_000_000,
    durationMonths: 18,
  },
  {
    name: 'Fixed Plan',
    color: '#0284c7',
    colorDark: '#0369a1',
    initialPayment: 10_000_000,
    monthlyPayment: 10_000_000,
    durationMonths: 13,
  },
];

// ─────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────
const nf = new Intl.NumberFormat('en-NG');
const format = (n) => `₦${nf.format(n)}`;
const formatShort = (n) => `₦${(n / 1_000_000).toFixed(0)}M`;

const getTotal = ({ initialPayment, monthlyPayment, durationMonths }) =>
  monthlyPayment && durationMonths
    ? initialPayment + monthlyPayment * durationMonths
    : initialPayment;

const getRecurring = (plan, billing) =>
  billing === 'quarterly' && plan.monthlyPayment
    ? plan.monthlyPayment * 3
    : plan.monthlyPayment;

const getDescription = (plan, billing) =>
  plan.monthlyPayment
    ? `Plus ${format(getRecurring(plan, billing))} per ${
        billing === 'quarterly' ? 'quarter' : 'month'
      }`
    : 'One-time payment, no installments';

const durationLabel = (m) => (m ? `${m} month${m > 1 ? 's' : ''}` : 'N/A');

const useScreenSize = () => {
  const [width, setWidth] = useState(null);
  useEffect(() => {
    const update = () =>
      setWidth(typeof window !== 'undefined' ? window.innerWidth : null);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return width;
};

// ─────────────────────────────────────────────
// SUB COMPONENTS
// ─────────────────────────────────────────────
const ContactSalesTeam = ({ property }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="text-center mt-6">
      <p className="fw-medium text-lg text-muted mb-4">
        Not seeing the perfect fit? <br /> Let&apos;s craft a personalized
        payment plan tailored just for you.
      </p>
      <Button
        color="primary"
        className="btn-wide py-4"
        onClick={() => setShowModal(true)}
      >
        Contact Our Sales Team
      </Button>
      <ProjectInterestModal
        show={showModal}
        onHide={() => setShowModal(false)}
        propertyName={property?.name || property?.title || 'Property'}
        property={property}
        contactSalesOnly
        subject="Payment Plan Inquiry"
        description="I would like to discuss a personalized payment plan for this property."
      />
    </div>
  );
};

const PlanItem = ({ label, value }) => (
  <li>
    <span className="list-dotted__label">{label}</span>
    <span className="list-dotted__value">{value}</span>
  </li>
);

const PaymentCard = ({ plan, property, billing, hideDetails }) => {
  const total = getTotal(plan);
  const recurring = getRecurring(plan, billing);
  return (
    <div className="payment-plan-card shadow-sm h-100 d-flex flex-column">
      <div className="d-flex align-items-center gap-2 mb-3">
        <span
          style={{
            width: 12,
            height: 12,
            background: plan.color,
            borderRadius: '50%',
            filter: 'blur(1px)',
          }}
        />
        <h5 className="fw-semibold m-0 text-capitalize">{plan.name}</h5>
      </div>

      <div className="d-flex align-items-baseline">
        <span className="display-6 fw-bold" style={{ color: plan.colorDark }}>
          {formatShort(plan.initialPayment)}
        </span>
      </div>

      <p className="text-muted fst-italic mb-5">
        {getDescription(plan, billing)}
      </p>

      {!hideDetails && (
        <ul className="list-dotted list-unstyled mt-auto">
          <PlanItem
            label="Initial Payment"
            value={format(plan.initialPayment)}
          />
          <PlanItem
            label={
              plan.monthlyPayment
                ? billing === 'quarterly'
                  ? 'Quarterly Payment'
                  : 'Monthly Payment'
                : 'Installment'
            }
            value={recurring ? format(recurring) : 'N/A'}
          />
          <PlanItem
            label="Duration"
            value={durationLabel(plan.durationMonths)}
          />
          <PlanItem
            label="Total"
            value={
              <span className="fw-bold text-primary text-price">
                {format(total)}
              </span>
            }
          />
        </ul>
      )}

      <div className={hideDetails ? '' : 'pt-4'}>
        <BuyNowButton
          className="btn btn-secondary-light w-100"
          property={property}
          paymentPlan={plan.durationMonths}
          initialPayment={plan.initialPayment}
          price={total}
          packageName={PACKAGE_NAME.SHELL}
        />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
const BlissvillePaymentPlans = ({ property }) => {
  const width = useScreenSize();
  const [billing, setBilling] = useState('monthly');

  if (!property?.availableUnits) return null;

  const isOutrightHidden = width && width < 992;

  return (
    <section className="container py-7">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-3">
        <div>
          <h4 className="fw-bold display-6 font-primary">
            Available Payment Plans (Shell Package)
          </h4>
          <p className="text-muted">
            Choose the plan that works best for your financial schedule *.
          </p>
        </div>

        <div
          className="btn-group rounded-pill border mx-auto mx-md-0 my-3"
          role="group"
        >
          {['monthly', 'quarterly'].map((option) => (
            <button
              key={option}
              className={`btn btn-sm fw-bold border-0 px-4 py-2 text-capitalize ${
                billing === option
                  ? 'btn-primary text-white rounded-pill'
                  : 'btn-white text-dark'
              }`}
              onClick={() => setBilling(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="row g-4">
        {PAYMENT_PLANS.map((plan, index) => {
          const isOutright = plan.name === 'Outright Payment';
          const hideDetails = isOutright && isOutrightHidden;

          let colClass = 'col-12';
          if (width >= 576) colClass = 'col-10 mx-auto';
          if (width >= 768) colClass = index === 0 ? 'col-md-12' : 'col-md-6';
          if (width >= 992) colClass = 'col-lg-4';

          return (
            <div key={plan.name} className={colClass}>
              <PaymentCard
                plan={plan}
                property={property}
                billing={billing}
                hideDetails={hideDetails}
              />
            </div>
          );
        })}
      </div>
      <p className="text-muted fst-italic mt-4">
        * All payment plans are subject to terms and conditions. Please contact
        our sales team for more details.
      </p>

      <ContactSalesTeam property={property} />
    </section>
  );
};

export default BlissvillePaymentPlans;
