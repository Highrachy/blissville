import { useState } from 'react';
import BuyNowButton from '../utils/BuyNowButton';
import { PACKAGE_NAME } from '@/data/packages';
import ProjectInterestModal from './ProjectInterestModal';
import Button from '../forms/Button';

// ─────────────────────────────────────────────
// CONTACT SALES TEAM BUTTON & MODAL
// ─────────────────────────────────────────────
function ContactSalesTeam({ property }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="text-center mt-5">
      <p className="fw-medium text-muted lead mb-3">
        Not seeing the perfect fit? Let&apos;s craft a personalized payment plan
        tailored just for you.
      </p>
      <Button
        color="primary-light"
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
}

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
    name: 'Flat Plan',
    color: '#0284c7',
    colorDark: '#0369a1',
    initialPayment: 10_000_000,
    monthlyPayment: 10_000_000,
    durationMonths: 13,
  },
];

export default function BlissvillePaymentPlans({ property }) {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const formatter = new Intl.NumberFormat('en-NG');
  const formatCurrency = (value) => `₦${formatter.format(value)}`;
  const formatShortCurrency = (value) => `₦${(value / 1_000_000).toFixed(0)}M`;

  const calculateTotal = (plan) => {
    return !plan.monthlyPayment || !plan.durationMonths
      ? plan.initialPayment
      : plan.initialPayment + plan.monthlyPayment * plan.durationMonths;
  };

  const calculateQuarterlyPayment = (plan) => {
    return plan.monthlyPayment ? plan.monthlyPayment * 3 : null;
  };

  if (property?.availableUnits === 0) {
    return null;
  }

  return (
    <section className="container py-7">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5">
        <div className="text-start">
          <h4 className="fw-bold display-6 font-primary">
            Available Payment Plans
          </h4>
          <p className="text-muted">
            Choose the plan that works best for your financial schedule.
          </p>
        </div>
        <div className="toggle-pill border border-success rounded overflow-hidden mt-3 mt-md-0">
          <button
            className={`px-3 py-2 ${
              billingCycle === 'monthly' ? 'active' : ''
            }`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </button>
          <button
            className={`px-3 py-2 ${
              billingCycle === 'quarterly' ? 'active' : ''
            }`}
            onClick={() => setBillingCycle('quarterly')}
          >
            Quarterly
          </button>
        </div>
      </div>

      <div className="row g-4">
        {PAYMENT_PLANS.map((plan) => {
          const totalCost = calculateTotal(plan);
          const recurringPayment =
            billingCycle === 'quarterly'
              ? calculateQuarterlyPayment(plan)
              : plan.monthlyPayment;

          let description = 'One-time payment, no installments';
          if (plan.monthlyPayment) {
            const cycleLabel =
              billingCycle === 'quarterly' ? 'quarter' : 'month';
            description = `${formatCurrency(
              recurringPayment
            )} per ${cycleLabel}`;
          }

          return (
            <div className="col-12 col-sm-6 col-lg-4" key={plan.name}>
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
                  ></span>
                  <h5 className="fw-semibold m-0 text-capitalize">
                    {plan.name}
                  </h5>
                </div>

                <div className="d-flex align-items-baseline">
                  <span
                    className="display-6 fw-bold"
                    style={{ color: plan.colorDark }}
                  >
                    {formatShortCurrency(plan.initialPayment)}
                  </span>
                </div>

                <p className="text-muted fst-italic mb-5">{description}</p>

                <ul className="list-dotted list-unstyled mt-auto">
                  <li>
                    <span className="list-dotted__label">Initial Payment</span>
                    <span className="list-dotted__value">
                      {formatCurrency(plan.initialPayment)}
                    </span>
                  </li>
                  <li>
                    <span className="list-dotted__label">
                      {plan.monthlyPayment
                        ? billingCycle === 'quarterly'
                          ? 'Quarterly Payment'
                          : 'Monthly Payment'
                        : 'Installment'}
                    </span>
                    <span className="list-dotted__value">
                      {recurringPayment
                        ? formatCurrency(recurringPayment)
                        : 'N/A'}
                    </span>
                  </li>
                  <li>
                    <span className="list-dotted__label">Duration</span>
                    <span className="list-dotted__value">
                      {plan.durationMonths
                        ? `${plan.durationMonths} month${
                            plan.durationMonths > 1 ? 's' : ''
                          }`
                        : 'N/A'}
                    </span>
                  </li>
                  <li>
                    <span className="list-dotted__label">Total</span>
                    <span className="list-dotted__value fw-bold text-primary text-price">
                      {formatCurrency(totalCost)}
                    </span>
                  </li>
                  <li className="pt-4">
                    <BuyNowButton
                      className="btn btn-secondary-light w-100"
                      property={property}
                      paymentPlan={plan.durationMonths}
                      initialPayment={plan.initialPayment}
                      price={totalCost}
                      packageName={PACKAGE_NAME.SHELL}
                    />
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <ContactSalesTeam property={property} />
    </section>
  );
}
