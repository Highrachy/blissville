import { useState, useEffect } from 'react';
import BuyNowButton from '../utils/BuyNowButton';
import ProjectInterestModal from './ProjectInterestModal';
import Button from '../forms/Button';
import Modal from '@/components/ui/Modal';
import { FeatureList } from 'pages/our-projects/[slug]';

/* ─────────────────────────────────────────────
CONSTANTS
───────────────────────────────────────────── */

const UNIT_TYPES = {
  CENTER: 'center',
  EDGE: 'edge',
};

const UNIT_LABELS = {
  center: 'Center Unit',
  edge: 'Edge Unit',
};

const PACKAGE_TYPES = {
  SHELL: 'shell',
  FINISHED: 'standard',
  GRAND: 'supreme',
};

const PACKAGE_LABELS = {
  shell: 'Shell',
  standard: 'Finished',
  supreme: 'Grand',
};

const PACKAGE_INITIAL_PAYMENT = {
  shell: 25000000,
  standard: 35000000,
  supreme: null,
};

/* ─────────────────────────────────────────────
PACKAGE INFO
───────────────────────────────────────────── */

const PACKAGE_INFO = {
  shell: {
    title: 'Shell Package',
    tagline:
      'A structurally completed home within a fully serviced smart estate, allowing you to finish the interior to your personal taste.',
  },

  standard: {
    title: 'Finished Package',
    tagline:
      'A move-in ready home with interior finishing completed, including kitchen fittings, wardrobes, doors and electrical systems.',
  },

  supreme: {
    title: 'Grand Package',
    tagline:
      'A premium smart home experience with advanced energy systems and luxury lifestyle upgrades.',
  },
};

/* ─────────────────────────────────────────────
PRICING MATRIX
───────────────────────────────────────────── */

const PRICE_MATRIX = {
  shell: {
    center: { outright: 155_000_000, fixed: 166_840_000 },
    edge: { outright: 165_000_000, fixed: 176_800_000 },
  },

  standard: {
    center: { outright: 187_000_000, fixed: 200_600_000 },
    edge: { outright: 197_000_000, fixed: 210_800_000 },
  },

  supreme: {
    center: { outright: 240_000_000 },
    edge: { outright: 250_000_000 },
  },
};

/* ─────────────────────────────────────────────
UTILS
───────────────────────────────────────────── */

const nf = new Intl.NumberFormat('en-NG');

const format = (n) => `₦${nf.format(n)}`;
const formatShort = (n) => `₦${Math.round(n / 1000000)}M`;
const durationLabel = (m) => (m ? `${m} months` : 'N/A');
const getFromPrice = (pkg, unitType) => {
  const price = PRICE_MATRIX[pkg][unitType].outright;
  return `From ${format(price)}`;
};

/* ─────────────────────────────────────────────
SCREEN SIZE HOOK
───────────────────────────────────────────── */

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

/* ─────────────────────────────────────────────
PLAN ITEM
───────────────────────────────────────────── */

const PlanItem = ({ label, value }) => (
  <li>
    <span className="list-dotted__label">{label}</span>
    <span className="list-dotted__value">{value}</span>
  </li>
);

/* ─────────────────────────────────────────────
PAYMENT CARD
───────────────────────────────────────────── */

const PaymentCard = ({ plan, property, hideDetails }) => {
  const [showModal, setShowModal] = useState(false);
  const isFlexi = plan.customizable;

  const priceTag = isFlexi ? 'Customized' : formatShort(plan.initialPayment);

  const totalLabel = isFlexi
    ? `From ${format(plan.totalFrom)}`
    : format(plan.total);

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
        <h5 className="fw-semibold m-0">{plan.name}</h5>
      </div>

      <div className="d-flex align-items-baseline">
        <span className={`display-6 display-plan-price fw-bold plan-price-${plan.name.toLowerCase().split(' ')[0]}`} style={{ color: plan.colorDark }}>
          {priceTag}
        </span>
      </div>

      <p className="text-muted fst-italic mb-5">
        {isFlexi
          ? 'Tailored to meet your unique needs.'
          : plan.monthlyPayment
            ? `Plus ${format(plan.monthlyPayment)} per month`
            : 'One-time payment, no installments'}
      </p>

      {!hideDetails && (
        <ul className="list-dotted list-unstyled mt-auto">
          <PlanItem
            label="Initial Payment"
            value={isFlexi ? 'Customizable' : format(plan.initialPayment)}
          />

          <PlanItem
            label="Installment"
            value={
              isFlexi
                ? 'Customizable'
                : plan.monthlyPayment
                  ? format(plan.monthlyPayment)
                  : 'N/A'
            }
          />

          <PlanItem
            label="Duration"
            value={
              isFlexi ? 'Customizable' : durationLabel(plan.durationMonths)
            }
          />

          <PlanItem
            label="Total"
            value={
              <span className={`fw-bold display-plan-price plan-price-${plan.name.toLowerCase().split(' ')[0]} text-price`}>
                {totalLabel}
              </span>
            }
          />
        </ul>
      )}

      <div className="pt-4">
        {isFlexi ? (
          <>
            <Button
              className="btn w-100"
              color="primary"
              onClick={() => setShowModal(true)}
            >
              Contact Our Sales Team
            </Button>

            <ProjectInterestModal
              show={showModal}
              onHide={() => setShowModal(false)}
              property={property}
              contactSalesOnly
            />
          </>
        ) : (
          <BuyNowButton
            className="btn w-100"
            property={property}
            paymentPlan={plan.durationMonths}
            initialPayment={plan.initialPayment}
            price={plan.total}
            packageName={plan.packageName}
          />
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
MAIN COMPONENT
───────────────────────────────────────────── */

const BlissvillePaymentPlans = ({ property }) => {
  const width = useScreenSize();
  const project = property?.project?.data?.attributes || {};

  const [unitType, setUnitType] = useState(UNIT_TYPES.CENTER);
  const [packageType, setPackageType] = useState(PACKAGE_TYPES.SHELL);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showFeatureModal, setShowFeatureModal] = useState(false);

  useEffect(() => {
    const modalOpen = showPackageModal || showFeatureModal;

    document.body.style.overflow = modalOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [showPackageModal, showFeatureModal]);

  if (!property?.availableUnits) return null;

  const hideExtraDetails = width && width < 992;

  const pricing = PRICE_MATRIX[packageType][unitType];

  const outrightPrice = pricing.outright;
  const fixedTotal = pricing.fixed;

  const durationMonths = 12;

  const initialPayment = PACKAGE_INITIAL_PAYMENT[packageType] ?? 0;

  const monthlyPayment =
    PACKAGE_INITIAL_PAYMENT[packageType] == null
      ? null
      : Math.round((fixedTotal - initialPayment) / durationMonths);

  const plans = [
    {
      name: 'Outright Payment',
      color: '#1c4791',
      colorDark: '#163771',
      initialPayment: outrightPrice,
      durationMonths: 0,
      total: outrightPrice,
      packageName: packageType,
    },
    {
      name: 'Flexi Plan',
      color: '#00903f',
      colorDark: '#007031',
      customizable: true,
      totalFrom: outrightPrice,
    },
    ...(fixedTotal
      ? [
          {
            name: 'Fixed Plan',
            color: '#0284c7',
            colorDark: '#0369a1',
            initialPayment,
            monthlyPayment,
            durationMonths,
            total: fixedTotal,
            packageName: packageType,
          },
        ]
      : []),
  ];

  const scrollToPricing = () => {
    const el = document.getElementById('payment-plan');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="payment-plan" className="container py-7">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-5">
        <div>
          <h4 className="fw-bold h2 font-primary mb-1">
            {PACKAGE_LABELS[packageType]} Package Pricing
            <span className="text-muted"> · {UNIT_LABELS[unitType]}</span>
          </h4>

          <p className="text-muted h5 fw-normal">
            {PACKAGE_INFO[packageType].tagline}
          </p>
        </div>

        <div className="btn-group rounded-pill border mx-auto mx-md-0 my-3">
          {Object.values(UNIT_TYPES).map((type) => (
            <button
              key={type}
              className={`btn btn-sm fw-bold border-0 px-4 py-2 ${
                unitType === type
                  ? 'btn-primary text-white rounded-pill'
                  : 'btn-white text-dark'
              }`}
              onClick={() => setUnitType(type)}
            >
              {UNIT_LABELS[type]}
            </button>
          ))}
        </div>
      </div>

      <div className="row g-4">
        {plans.map((plan, index) => {
          let colClass = 'col-12';
          if (width && width >= 576) colClass = 'col-10 mx-auto';
          if (width && width >= 768)
            colClass = index === 0 ? 'col-md-12' : 'col-md-6';
          if (width && width >= 992) colClass = 'col-lg-4';

          const isFixed = plan.name === 'Fixed Plan';
          const hideDetails = !isFixed && hideExtraDetails;

          return (
            <div key={plan.name} className={colClass}>
              <PaymentCard
                plan={plan}
                property={property}
                hideDetails={hideDetails}
              />
            </div>
          );
        })}

        <p className="small mt-2">
          * All payment plans are subject to terms and conditions.
        </p>
      </div>

      <div className="text-center mt-5">
        <p className="fw-semibold text-muted h3 mb-2">
          Looking for a different level of finishing?
        </p>

        <p className="text-muted lead h5 fw-normal mb-2">
          You can also explore{' '}
          {Object.values(PACKAGE_TYPES)
            .filter((pkg) => pkg !== packageType)
            .map((pkg, i) => (
              <span key={pkg}>
                <span
                  title={PACKAGE_INFO[pkg].tagline}
                  className="text-primary fw-bold"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedPackage(pkg);
                    setShowFeatureModal(true);
                  }}
                >
                  {PACKAGE_LABELS[pkg]} Package
                </span>
                {i === 0 ? ' or ' : ''}
              </span>
            ))}{' '}
          to compare pricing and features.
        </p>
        <Button
          color="info"
          className="btn-wide mt-3"
          onClick={() => setShowPackageModal(true)}
        >
          View other available packages
        </Button>
      </div>

      {/* PACKAGE LIST MODAL */}

      <Modal
        title="Choose Your Home Package"
        show={showPackageModal}
        onHide={() => setShowPackageModal(false)}
      >
        <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {Object.entries(PACKAGE_INFO).map(([key, pkg]) => {
            const active = key === packageType;

            return (
              <div
                key={key}
                className={`payment-plan-card shadow-sm p-4 mb-3 ${
                  active ? 'border-primary' : ''
                }`}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setSelectedPackage(key);
                  setShowPackageModal(false);
                  setShowFeatureModal(true);
                }}
              >
                <h5 className="fw-bold mb-1">
                  {pkg.title}
                  {key === 'finished' && (
                    <span className="badge bg-primary ms-2">Most Popular</span>
                  )}
                  {key === 'grand' && (
                    <span className="badge bg-warning text-white ms-2">
                      Premium
                    </span>
                  )}
                </h5>
                <p className="text-muted small mb-2">{pkg.tagline}</p>

                <p className="fw-semibold text-primary small mb-0">
                  {getFromPrice(key, unitType)}
                </p>
              </div>
            );
          })}
        </div>
      </Modal>

      {/* PACKAGE FEATURES MODAL */}

      <Modal
        title={
          selectedPackage
            ? `${PACKAGE_LABELS[selectedPackage]} Home Features`
            : ''
        }
        show={showFeatureModal}
        onHide={() => setShowFeatureModal(false)}
      >
        <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {selectedPackage && (
            <>
              <p className="text-muted mb-2">
                {PACKAGE_INFO[selectedPackage].tagline}
              </p>

              <p className="fw-semibold text-primary mb-3">
                {getFromPrice(selectedPackage, unitType)}
              </p>

              <Button
                color="primary"
                className="btn-wide mb-2"
                onClick={() => {
                  setPackageType(selectedPackage);
                  setShowFeatureModal(false);
                  setTimeout(scrollToPricing, 200);
                }}
              >
                View {PACKAGE_LABELS[selectedPackage]} Package
              </Button>
              <p className="small text-muted mb-3">
                Selecting this package will update the pricing options shown
                below.
              </p>

              <div style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                <h5 className="mt-3">
                  Features of the {PACKAGE_LABELS[selectedPackage]} Package
                </h5>
                <FeatureList
                  project={project}
                  oneFeaturePerLine
                  type={selectedPackage}
                  showAllByDefault
                />
              </div>
            </>
          )}
        </div>
      </Modal>
    </section>
  );
};

export default BlissvillePaymentPlans;
