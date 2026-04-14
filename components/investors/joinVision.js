import { useState } from 'react';
import Section from '../common/Section';
import Button from '../forms/Button';
import axios from 'axios';
import { toast } from 'react-toastify';

import { FaVideo, FaArrowRight } from 'react-icons/fa';

export default function JoinVision() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    subject: 'Standard Block (19.1M)',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!form.name || !form.subject) {
      toast.error('Please complete required fields');
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email) {
      toast.error('Email is required');
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts`, {
        data: {
          ...form,
          source: 'Investors Page',
        },
      });

      toast.success('Request submitted successfully');

      setForm({
        name: '',
        subject: 'Standard Block (19.1M)',
        email: '',
        phone: '',
      });

      setStep(1);
    } catch (err) {
      toast.error('Submission failed');
    }

    setLoading(false);
  };

  return (
    <Section className="join-vision-section">
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
              <Button color="primary">
                <FaVideo size={12} /> Invest Now
              </Button>

              <Button color="success">
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
                    />
                  </div>

                  <div className="form-group">
                    <label>INVESTMENT TYPE</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                    >
                      <option>Standard Block (19.1M)</option>
                      <option>Large Portfolio</option>
                      <option>Full Ownership</option>
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
