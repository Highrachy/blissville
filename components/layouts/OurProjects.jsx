import Image from 'next/image';
import React from 'react';

const OurProjects = () => {
  return (
    <section
      className="bg-image-top"
      style={{ backgroundImage: 'url("/assets/img/bg/bg-projects.jpg")' }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h3 className="mb-5 mt-7">Our Projects</h3>
          </div>
        </div>
        <div className="row">
          <div className="card">
            <div className="row">
              <div className="col-lg-7">
                <div className="mt-2">
                  <Image
                    src="/assets/img/property/3-bedroom.png"
                    alt="Hero Image"
                    width={809}
                    height={680}
                    className="img-cover"
                  />
                </div>
              </div>
              <div className="col-lg-5 bg-gray-200 mt-2 mr-2">
                <aside className="px-3 py-5">
                  <h3>Blissville Uno</h3>
                  <ul>
                    <li>
                      1. Project Name: <span>Quarter</span>
                    </li>
                    <li>
                      2. Project Type: <span>Apartment / Home</span>
                    </li>
                    <li>
                      3. Building Location: <span>New York, USA</span>
                    </li>
                    <li>
                      4. No. Of Apartments: <span>568</span>
                    </li>
                    <li>
                      5. Total Investment: <span>$14,500,00</span>
                    </li>
                  </ul>
                  <div className="btn-wrapper animated">
                    <a
                      href="contact.html"
                      className="theme-btn-1 btn btn-effect-1"
                      tabIndex={-1}
                    >
                      Download Brochure
                    </a>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProjects;
