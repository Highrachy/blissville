import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import BLOG_POSTS, { BLOG_CATEGORIES } from '@/data/blog';
import Button from '../forms/Button';

export default function BlogSection({
  isLandingPage = false,
  title = '',
  posts = null,
  hideHeading = false,
}) {
  const [activeCategory, setActiveCategory] = useState(BLOG_CATEGORIES.ALL);
  const sectionRef = useRef(null);

  // If specific posts are provided (e.g. for "Related Stories"), use those, else use all posts
  const allPosts = posts || BLOG_POSTS;

  // Filter by category
  const filteredPosts = activeCategory === BLOG_CATEGORIES.ALL
    ? allPosts
    : allPosts.filter(post => post.category === activeCategory);

  const sortedPosts = filteredPosts.slice().reverse(); // Show newest first

  // Pagination Config
  const POSTS_PER_PAGE = 12;
  const POSTS_ON_HOMEPAGE = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPosts = sortedPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;

  const postsToShow = isLandingPage
    ? sortedPosts.slice(0, POSTS_ON_HOMEPAGE)
    : (posts ? sortedPosts : sortedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE));

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push('...');
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    return pages;
  };

  const categories = Object.values(BLOG_CATEGORIES);

  return (
    <section ref={sectionRef} className="py-6 container">
      {!hideHeading && (
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="fw-bold mb-0">Insights &amp; Articles</h2>

          {isLandingPage && (
            <Link href="/blog" passHref>
              <Button color="secondary" className="btn-sm">
                View all articles
              </Button>
            </Link>
          )}
        </div>
      )}

      {/* Category Navigation */}
      {!isLandingPage && !posts && (
        <div className="blog-category-nav">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`nav-item ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1); // Reset to page 1 on category change
              }}
            >
              {cat}
            </div>
          ))}
        </div>
      )}

      {/* Optional Title (e.g. "Related Stories") */}
      {title && (
        <h4 className="fw-bold text-dark mb-4" style={{ color: '#0d1b3e' }}>{title}</h4>
      )}

      {/* Blog Grid */}
      <div className="blog-grid">
        {postsToShow.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id} passHref>
            <a className="text-decoration-none">
              <div className="blog-card">
                <div className="blog-card-image">
                  <span className="pill-overlay category-pill">{post.category}</span>
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={400}
                  />
                </div>

                <div className="blog-card-body p-4 p-lg-5 d-flex flex-column flex-grow-1">
                  <h5 className="blog-card-title">{post.title}</h5>
                  <p className="blog-card-excerpt">{post.excerpt}</p>

                  <div className="mt-1 mb-4">
                    <div className='btn btn-dark btn-sm'>Read More</div>
                  </div>

                  <div className="blog-card-meta mt-auto">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      {!isLandingPage && !posts && totalPages > 1 && (
        <div className="blog-pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn pagination-nav-btn"
            aria-label="Previous Page"
          >
            <FaArrowLeft size={12} />
            <span>Previous</span>
          </button>

          {getPageNumbers().map((pageNum, idx) => {
            if (pageNum === '...') {
              return (
                <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
                  &hellip;
                </span>
              );
            }
            return (
              <button
                key={`page-${pageNum}`}
                onClick={() => handlePageChange(pageNum)}
                className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                aria-label={`Page ${pageNum}`}
                aria-current={currentPage === pageNum ? 'page' : undefined}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn pagination-nav-btn"
            aria-label="Next Page"
          >
            <span>Next</span>
            <FaArrowRight size={12} />
          </button>
        </div>
      )}
    </section>
  );
}
