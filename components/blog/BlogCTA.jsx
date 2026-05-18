import React from 'react';
import Link from 'next/link';

export default function BlogCTA() {
  return (
    <section className="container">
      <div className="blog-cta">
        <h2 className="blog-cta-title text-white">Secure Your Milestone Investment.</h2>
        <p className="blog-cta-text">
          At Blissville, we craft more than just energy-efficient homes; we curate
          premium living experiences that redefine true value. Discover our portfolio
          and take the first step toward a home that reflects your legacy.
        </p>

        <div className="d-flex flex-wrap justify-content-center gap-3">
          <Link href="/our-projects" passHref>
            <a className="btn btn-light px-4 py-3 rounded-1 fw-semibold">
              Explore Our Portfolio
            </a>
          </Link>
          <Link href="/investors" passHref>
            <a className="btn btn-outline-light px-4 py-3 rounded-1 fw-semibold">
              Invest in Blissville
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
