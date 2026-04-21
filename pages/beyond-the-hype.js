import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import Image from 'next/image';
import { Container } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import { HiArrowRight } from 'react-icons/hi';
import { FaCheckCircle, FaFilePdf } from 'react-icons/fa';
import {
  Book1,
  TickCircle,
  Eye,
  MessageQuestion,
  ShieldTick,
  SearchNormal1,
  PresentionChart,
} from 'iconsax-react';
import Section from '@/components/common/Section';
import Button from '@/components/forms/Button';
import { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError, statusIsSuccessful } from '@/utils/helpers';

export const BeyondTheHypeHeroSection = () => (
  <section className="bg-light2 py-5 py-lg-6">
    <Container>
      <div className="row align-items-center g-5">
        {/* LEFT */}
        <div className="col-lg-6">
          <Fade bottom>
            <span className="badge bg-primary-subtle text-primary-700 fw-semibold px-3 py-2 mb-3 small d-inline-flex align-items-center gap-2">
              <Book1 size="16" />
              EXCLUSIVE PUBLICATION
            </span>
          </Fade>

          {/* HEADLINE */}
          <Fade bottom delay={100}>
            <h1 className="fw-bold lh-sm mb-2 hero-title text-darker">
              Beyond the Hype
            </h1>
          </Fade>

          {/* SUBTITLE */}
          <Fade bottom delay={150}>
            <h5 className="text-primary-700 fw-semibold mb-4">
              The Blueprint for Real Estate Wealth
            </h5>
          </Fade>

          {/* COPY */}
          <Fade bottom delay={200}>
            <p className="text-muted fs-5 mb-4">
              Most buyers don&apos;t lose money because of bad luck. They lose
              it because they didn&apos;t know what to check.&nbsp;
              <span className="text-dark fw-semibold">
                This guide gives you the knowledge that protects your money.
              </span>
            </p>
          </Fade>

          {/* CTA */}
          <Fade bottom delay={300}>
            <div className="d-flex flex-wrap gap-3 mb-4">
              <Button
                color="primary"
                href="/beyond-the-hype#exclusive-guide"
                className="fw-semibold px-5 py-4 d-inline-flex align-items-center gap-2"
              >
                <FaFilePdf />
                Get the Free Guide
                <HiArrowRight />
              </Button>
            </div>
          </Fade>

          {/* TRUST LINE */}
          <Fade bottom delay={400}>
            <div className="d-flex align-items-center gap-2 text-muted small">
              <TickCircle size={18} variant="Bold" />
              <span>
                A practical guide to avoiding costly mistakes before you invest
              </span>
            </div>
          </Fade>
        </div>

        <div className="col-lg-6 text-center">
          <Fade bottom>
            <div
              className="position-relative d-inline-block w-100"
              style={{
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))',
              }}
            >
              <Image
                src="/assets/img/beyond-the-hype/book.jpg"
                width={800}
                height={800}
                alt="Beyond the Hype Book"
                className="img-fluid rounded-3"
                priority
              />
            </div>
          </Fade>
        </div>
      </div>
    </Container>
  </section>
);

const FeaturesSection = () => {
  const items = [
    {
      icon: Eye,
      color: '#6f42c1',
      bg: 'rgba(111,66,193,0.08)',
      title: 'The Blind Spot',
      text: 'Most advice is designed to sell, not protect your investment.',
    },
    {
      icon: MessageQuestion,
      color: '#0d6efd',
      bg: 'rgba(13,110,253,0.08)',
      title: 'Better Questions',
      text: 'Serious buyers ask the right questions before committing.',
    },
    {
      icon: ShieldTick,
      color: '#fd7e14',
      bg: 'rgba(253,126,20,0.08)',
      title: 'Risk Awareness',
      text: 'Most risks are invisible until it’s too late.',
    },
    {
      icon: TickCircle,
      color: '#198754',
      bg: 'rgba(25,135,84,0.08)',
      title: 'Confident Decisions',
      text: 'Clarity removes guesswork from your investment.',
    },
  ];

  return (
    <section className="py-6 bg-white">
      <Container>
        <Fade bottom>
          <div className="text-center mb-5">
            <h2 className="fw-bold text-darker">What Most Buyers Get Wrong</h2>
            <p className="text-muted h5">
              The difference between a good deal and a costly mistake
            </p>
          </div>
        </Fade>

        <div className="row row-cols-1 row-cols-sm-2 g-4">
          {items.map((item, i) => (
            <div className="col d-flex" key={i}>
              <Fade bottom delay={i * 100} style={{ width: '100%' }}>
                <div
                  className="benefits-card d-flex flex-column w-100"
                  style={{
                    minHeight: 240,
                    padding: '1.5rem',
                    borderRadius: '12px',
                  }}
                >
                  {/* ICON */}
                  <div
                    className="mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      background: item.bg,
                    }}
                  >
                    <item.icon size={24} color={item.color} variant="Bold" />
                  </div>

                  {/* TITLE */}
                  <h6 className="fw-semibold text-darker mb-2">{item.title}</h6>

                  {/* TEXT */}
                  <p className="text-muted mb-0">{item.text}</p>
                </div>
              </Fade>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

const AuthoritySection = () => (
  <Section altBg2>
    <Container>
      <div className="row align-items-center g-5">
        {/* LEFT */}
        <div className="col-lg-6">
          <Fade left>
            <h2 className="fw-extrabold h2 h1-md text-darker">
              Architecture is{' '}
              <span className="text-primary-600">stability</span>.
              <br />
              Data is <span className="text-secondary-700">clarity</span>.
            </h2>

            <div className="d-flex flex-column gap-4 mt-4">
              <AuthorityItem
                icon={SearchNormal1}
                color="#fd7e14"
                bg="rgba(253, 126, 20, 0.15)"
                title="Identify What Others Miss"
                text="Most costly mistakes are not obvious. Learn how to uncover hidden risks in title, structure, and pricing before you commit."
              />

              <AuthorityItem
                icon={PresentionChart}
                color="#0d6efd"
                bg="rgba(13, 110, 253, 0.15)"
                title="Read the Market Correctly"
                text="Understand where demand is moving, how infrastructure shapes value, and why timing matters more than price."
              />

              <AuthorityItem
                icon={ShieldTick}
                color="#198754"
                bg="rgba(25, 135, 84, 0.15)"
                title="Make Defensible Decisions"
                text="Every decision should be backed by clear reasoning. Invest with confidence, knowing exactly why a property makes sense."
              />
            </div>
          </Fade>
        </div>

        {/* RIGHT */}
        <div className="col-lg-6 position-relative text-center">
          <Fade right>
            <Image
              src="/assets/img/beyond-the-hype/investor.jpg"
              width={1200}
              height={1024}
              alt="Investor reviewing property insights"
              className="img-fluid rounded-3 shadow-sm"
            />
          </Fade>
        </div>
      </div>
    </Container>
  </Section>
);

const SpotlightSection = () => (
  <section className="py-6 py-lg-7 bg-primary2 text-white">
    <Container>
      <div className="row align-items-center g-5">
        <div className="col-lg-6">
          <Fade left>
            <>
              <h3 className="fw-bold my-3 h2 text-white">
                Spotlight: The Sangotedo Opportunity
              </h3>

              <p className="mb-4 lead">
                Discover why we are focusing our architectural curation on
                fast-growing corridors like Sangotedo. The guide breaks down the
                infrastructure growth, price per square meter trends, and the
                lifestyle pivot happening right now.
              </p>

              <div className="d-flex flex-column gap-2 lead">
                <CheckItem text="Upcoming Transport Infrastructure" />
                <CheckItem text="Commercial Expansion Hubs" />
                <CheckItem text="Luxury Gated Communities" />
              </div>
            </>
          </Fade>
        </div>

        <div className="col-lg-6">
          <Fade right>
            <Image
              src="/assets/img/beyond-the-hype/modern-house.jpg"
              width={768}
              height={768}
              alt="Modern House"
              className="img-fluid rounded-3"
            />
          </Fade>
        </div>
      </div>
    </Container>
  </section>
);

/* =========================
   ELITE FORM SECTION
========================= */
export const ClarityFormSection = ({
  projectName = 'Beyond the Hype Guide',
}) => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});

  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const errors = {
    name: form.name.trim().length < 3,
    email: !/^\S+@\S+\.\S+$/.test(form.email),
    phone: form.phone.length > 0 && form.phone.replace(/\D/g, '').length < 7,
  };

  const isValid = !errors.name && !errors.email && !errors.phone;

  const handleBlur = (field) => setTouched({ ...touched, [field]: true });

  const handlePhoneChange = (value) => {
    const cleaned = value.replace(/\D/g, '');
    setForm({ ...form, phone: cleaned });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      setTouched({ name: true, email: true, phone: true });
      return;
    }

    setLoading(true);

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      source: 'Clarity Form',
      funnel: projectName,
    };

    try {
      const link = document.createElement('a');
      link.href = '/docs/beyond-the-hype.pdf';
      link.download = 'Beyond-the-Hype.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Your download is starting... Please check your device.');
      setSent(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/funnels`,
        { data: payload },
      );
      if (statusIsSuccessful(response.status)) {
        console.log('response.status', response);
      }
    } catch (error) {
      // toast.error(getError(error));
      console.log('getError', getError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="exclusive-guide">
      <Section altBg3>
        <div className="container">
          {/* HEADER */}
          <Fade bottom>
            <div className="text-center mb-4 mb-md-5">
              <h2 className="fw-bold text-darker mb-2">
                Get the Clarity You Deserve.
              </h2>

              <p className="fw-semibold text-dark fs-5 mb-1">
                The{' '}
                <span className="text-primary">
                  &quot;Beyond the Hype&quot;
                </span>{' '}
                guide is free.
              </p>

              <p className="text-muted lead mb-0">
                Learn how to avoid costly mistakes and invest with confidence.
              </p>
            </div>
          </Fade>

          {/* FORM */}
          <Fade bottom delay={100}>
            <div className="row justify-content-center">
              <div className="col-12 col-md-10 col-lg-8">
                <div className="bg-white rounded-4 shadow-sm p-3 p-md-4 p-lg-5">
                  {!sent ? (
                    <form onSubmit={onSubmit} className="row g-3">
                      {/* NAME */}
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold small">
                          Full Name
                        </label>
                        <input
                          ref={nameRef}
                          type="text"
                          className={`form-control ${
                            touched.name && errors.name ? 'is-invalid' : ''
                          }`}
                          placeholder="Enter your full name"
                          value={form.name}
                          onBlur={() => handleBlur('name')}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          onKeyDown={(e) =>
                            e.key === 'Enter' && phoneRef.current.focus()
                          }
                        />
                        <div className="invalid-feedback">
                          Enter your full name
                        </div>
                      </div>

                      {/* PHONE (OPTIONAL) */}
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold small">
                          Phone Number{' '}
                          <span className="text-muted fw-normal">
                            (optional)
                          </span>
                        </label>
                        <input
                          ref={phoneRef}
                          type="tel"
                          inputMode="numeric"
                          className={`form-control ${
                            touched.phone && errors.phone ? 'is-invalid' : ''
                          }`}
                          placeholder="e.g. 08012345678"
                          value={form.phone}
                          onBlur={() => handleBlur('phone')}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === 'Enter' && emailRef.current.focus()
                          }
                        />
                        <div className="invalid-feedback">
                          Enter a valid phone number
                        </div>
                      </div>

                      {/* EMAIL */}
                      <div className="col-12">
                        <label className="form-label fw-semibold small">
                          Email Address
                        </label>
                        <input
                          ref={emailRef}
                          type="email"
                          className={`form-control ${
                            touched.email && errors.email ? 'is-invalid' : ''
                          }`}
                          placeholder="Enter your email address"
                          value={form.email}
                          onBlur={() => handleBlur('email')}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                        />
                        <div className="invalid-feedback">
                          Enter a valid email address
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="col-12 mt-3">
                        <button
                          className="btn btn-primary w-100 py-3 fw-semibold d-flex align-items-center justify-content-center gap-2"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm" />
                              Preparing...
                            </>
                          ) : (
                            <>
                              <FaFilePdf />
                              DOWNLOAD THE FREE GUIDE
                            </>
                          )}
                        </button>
                      </div>

                      {/* PRIVACY */}
                      <div className="col-12 text-center">
                        <small className="text-muted">
                          We respect your privacy. Your information will never
                          be shared.
                        </small>
                      </div>
                    </form>
                  ) : (
                    <div className="alert alert-success text-center mb-0 p-4">
                      <div className="d-flex justify-content-center mb-2">
                        <FaCheckCircle className="text-success" size={22} />
                      </div>

                      <h6 className="fw-semibold lead mb-1">
                        Thank you. Your guide is on the way.
                      </h6>

                      <p className="mb-2 text-muted">
                        Your download should begin automatically.
                      </p>

                      <p className="mb-0">
                        If it didn&apos;t start, check your device and&nbsp;
                        <button
                          type="button"
                          className="btn btn-link p-0 align-baseline fw-semibold text-primary"
                          onClick={() => {
                            setSent(false);
                            setForm({ name: '', email: '', phone: '' });
                            setTouched({});
                          }}
                        >
                          try again
                        </button>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </Section>
    </div>
  );
};
const AuthorityItem = ({ icon: Icon, color, bg, title, text }) => (
  <div className="d-flex align-items-start gap-3">
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        width: 48,
        height: 48,
        borderRadius: '12px',
        background: bg,
        flexShrink: 0,
      }}
    >
      <Icon size={24} color={color} variant="Bulk" />
    </div>

    <div className="mb-3">
      <h6 className="fw-semibold text-dark mb-1">{title}</h6>
      <p className="text-muted mb-0">{text}</p>
    </div>
  </div>
);

const CheckItem = ({ text }) => (
  <div className="d-flex align-items-center gap-2">
    <FaCheckCircle className="text-primary-200" />
    <span>{text}</span>
  </div>
);

export default function BeyondTheHype() {
  return (
    <>
      <Navigation />

      <BeyondTheHypeHeroSection />
      <FeaturesSection />
      <AuthoritySection />
      <SpotlightSection />
      <ClarityFormSection />

      <Footer />
    </>
  );
}
