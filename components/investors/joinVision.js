import Section from '../common/Section';
import { FaVideo } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';

const JoinVision = () => {
  return (
    <Section className="join-vision-section">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* LEFT */}
          <div className="col-lg-7">
            <h1 className="hero-title">Join the Vision.</h1>

            <div className="contact-block mt-4">
              <small className="label">INQUIRIES</small>
              <p className="contact-text">
                info@blissville.com <br />
                blissville@highrachy.com
              </p>

              <small className="label mt-4 d-block">CONTACT NUMBER</small>
              <p className="contact-text">
                +234 905 555 5146 <br />
                +234 905 555 5496
              </p>
            </div>

            <div className="d-flex gap-3 mt-4 flex-wrap">
              <button className="btn btn-primary px-4">
                <FaVideo className="me-2" />
                Invest Now
              </button>

              <button className="btn btn-success px-4">
                Send Us a Message <FaArrowRight className="ms-2" />
              </button>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="col-lg-5">
            <div className="callback-card">
              <h4 className="mb-4">Request Callback</h4>

              <div className="form-group mb-3">
                <label>FULL NAME</label>
                <input type="text" className="form-control" />
              </div>

              <div className="form-group mb-4">
                <label>INVESTMENT TYPE</label>
                <select className="form-select">
                  <option>Standard Block (₦19.1M)</option>
                  <option>Large Portfolio</option>
                  <option>Full Ownership</option>
                </select>
              </div>

              <button className="btn btn-warning w-100">Next</button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default JoinVision;
