import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa6';

/* ── Single slide (shared between carousel & single post) ── */
function HeroSlide({ post, isSinglePost = false, isActive = true }) {
  if (!post) return null;

  return (
    <div className={`hero-slide ${isActive ? 'hero-slide--active' : ''}`}>
      {/* Background Image */}
      <Image
        src={post.image}
        alt={post.title}
        layout="fill"
        objectFit="cover"
        priority={isActive}
      />

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content-wrapper">
        <div className="hero-meta-row">
          {!isSinglePost && <span className="badge-light">FEATURED ARTICLE</span>}

          {isSinglePost && (
            <>
              <span className="d-flex align-items-center gap-2">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                {post.readTime}
              </span>
              <span className="divider">|</span>
              <span>{post.date}</span>
              <span className="divider">|</span>
              <span>{post.category}</span>
            </>
          )}
        </div>

        <h1 className="hero-title">{post.title}</h1>

        {post.excerpt && (
          <p className="hero-excerpt">{post.excerpt}</p>
        )}

        <footer className="hero-footer">
          {isSinglePost && (
            <div className="hero-author">
              <img src={post.author.avatar} alt={post.author.name} />
              <div>
                <p className="author-name">{post.author.name}</p>
                <p className="author-role">{post.author.role}</p>
              </div>
            </div>
          )}

          {!isSinglePost && (
            <Link href={`/blog/${post.slug}`} passHref>
              <a className="read-button">
                READ ARTICLE <FaArrowRight size={18} />
              </a>
            </Link>
          )}
        </footer>
      </div>
    </div>
  );
}

/* ── Carousel wrapper (index page only) ─────────────────── */
function BlogHeroCarousel({ posts }) {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const count = posts.length;
  const minSwipeDistance = 50;

  const goTo = useCallback(
    (index) => {
      if (animating) return;
      setAnimating(true);
      setActive(index);
      setTimeout(() => setAnimating(false), 700);
    },
    [animating]
  );

  // Auto-advance every 6 s, only if not paused
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      goTo((active + 1) % count);
    }, 6000);
    return () => clearInterval(timer);
  }, [active, count, goTo, isPaused]);

  // Swipe handlers
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      goTo((active + 1) % count);
    } else if (isRightSwipe) {
      goTo((active - 1 + count) % count);
    }
  };

  return (
    <section className="container-fluid px-0">
      <div
        className="featured-hero-full hero-carousel shadow-lg"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {posts.map((post, i) => (
          <HeroSlide key={post.slug} post={post} isActive={i === active} />
        ))}

        {/* Dot indicators */}
        <div className="hero-carousel-dots">
          {posts.map((_, i) => (
            <button
              key={i}
              className={`hero-carousel-dot ${i === active ? 'hero-carousel-dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Prev / Next arrows */}
        <button
          className="hero-carousel-arrow hero-carousel-arrow--prev"
          onClick={() => goTo((active - 1 + count) % count)}
          aria-label="Previous"
        >
          <FaArrowRight size={18} style={{ transform: 'rotate(180deg)' }} />
        </button>
        <button
          className="hero-carousel-arrow hero-carousel-arrow--next"
          onClick={() => goTo((active + 1) % count)}
          aria-label="Next"
        >
          <FaArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

/* ── Public export ───────────────────────────────────────── */
export default function BlogHero({ post, posts, isSinglePost = false }) {
  // Carousel mode: pass `posts` array from the index page
  if (!isSinglePost && posts && posts.length > 0) {
    return <BlogHeroCarousel posts={posts} />;
  }

  // Single post fallback / single-post page
  if (!post) return null;
  return (
    <section className="container-fluid px-0">
      <div className={`featured-hero-full ${isSinglePost ? 'single-article-hero' : ''} shadow-lg`}>
        <HeroSlide post={post} isSinglePost={isSinglePost} isActive />
      </div>
    </section>
  );
}
