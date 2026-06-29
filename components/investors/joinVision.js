import { useEffect, useState } from 'react';
import Section from '../common/Section';
import Button from '../forms/Button';
import axios from 'axios';
import { toast } from 'react-toastify';

import { FaArrowRight } from 'react-icons/fa';

export default function JoinVision() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const CLARITY_EVENTS = {
    JV_FORM_START: 'jv_form_start',
    JV_STEP_1_COMPLETE: 'jv_step_1_complete',
    JV_STEP_2_VIEW: 'jv_step_2_view',
    JV_SUBMIT_ATTEMPT: 'jv_submit_attempt',
    JV_SUBMIT_SUCCESS: 'jv_submit_success',
    JV_SUBMIT_ERROR: 'jv_submit_error',
  };

  const [form, setForm] = useState({
    name: '',
    subject: 'I want to invest',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (step === 2 && typeof window !== 'undefined' && window.clarity) {
      window.clarity('event', CLARITY_EVENTS.JV_STEP_2_VIEW);
    }
  }, [CLARITY_EVENTS.JV_STEP_2_VIEW, step]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!form.name || !form.subject) {
      toast.error('Please complete required fields');
      return;
    }
    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('event', CLARITY_EVENTS.JV_STEP_1_COMPLETE);
    }

    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('event', CLARITY_EVENTS.JV_SUBMIT_ATTEMPT);
    }

    if (!form.email) {
      toast.error('Email is required');
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts`, {
        data: {
          ...form,
          subject: `Callback Request - ${form.subject}`,
          source: 'Investors Page',
        },
      });

      if (typeof window !== 'undefined' && window.clarity) {
        window.clarity('event', CLARITY_EVENTS.JV_SUBMIT_SUCCESS);
      }

      toast.success('Request submitted successfully');

      setForm({
        name: '',
        subject: 'I want to invest',
        email: '',
        phone: '',
      });

      setStep(1);
    } catch (err) {
      toast.error('Submission failed');
      if (typeof window !== 'undefined' && window.clarity) {
        window.clarity('event', CLARITY_EVENTS.JV_SUBMIT_ERROR);
      }
    }

    setLoading(false);
  };

  return (
    <Section id="join-our-vision" className="join-vision-section">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* LEFT */}
          <div className="col-lg-7">
            <h1 className="join-title">Join the Vision.</h1>

            <div className="contact-block mt-5">
              <span className="label">INQUIRIES</span>

              <p className="contact-text">
                <a href="mailto:info@blissville.com">info@blissville.com</a>
                <br />
                <a href="mailto:blissville@highrachy.com">
                  blissville@highrachy.com
                </a>
              </p>

              <span className="label mt-4 d-block">CONTACT NUMBER</span>

              <p className="contact-text">
                <a href="tel:+2349055555146">+234 905 555 5146</a>
                <br />
                <a href="tel:+2349055555496">+234 905 555 5496</a>
              </p>
            </div>

            <div className="d-flex gap-3 mt-5 flex-wrap">
              <Button color="success" className="px-5" href="/contact-us">
                Send Us a Message <FaArrowRight size={12} />
              </Button>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="col-lg-5">
            <form onSubmit={handleSubmit} className="callback-card">
              <h3 className="card-title">Request Callback</h3>

              {/* STEP 1 */}
              {step === 1 && (
                <>
                  <div className="form-group">
                    <label>FULL NAME</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder=""
                      required
                      onFocus={() => {
                        if (typeof window !== 'undefined' && window.clarity) {
                          window.clarity('event', CLARITY_EVENTS.JV_FORM_START);
                        }
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label>SUBJECT</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                    >
                      <option value="I want to invest">I want to invest</option>

                      <option value="Request pricing & payment plan">
                        Request pricing & payment plan
                      </option>

                      <option value="Schedule a site inspection">
                        Schedule a site inspection
                      </option>

                      <option value="Understand ROI & returns">
                        Understand ROI & returns
                      </option>

                      <option value="Other inquiry">Other inquiry</option>
                    </select>
                  </div>

                  <Button
                    type="button"
                    color="warning"
                    className="w-100 justify-content-center next-btn"
                    onClick={handleNext}
                  >
                    NEXT
                  </Button>
                </>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <>
                  <div className="form-group">
                    <label>EMAIL</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>PHONE NUMBER</label>
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <Button
                      type="button"
                      color="dark"
                      className="w-50"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>

                    <Button
                      type="submit"
                      color="warning"
                      className="w-50 justify-content-center"
                      disabled={loading}
                    >
                      {loading ? 'Submitting...' : 'Submit'}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}
