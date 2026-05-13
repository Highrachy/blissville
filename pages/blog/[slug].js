import React from 'react';
import Image from 'next/image';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import SeoHead from '@/components/utils/SeoHead';
import { PageHeader } from '@/components/common/Header';
import BLOG_POSTS from '@/data/blog';
import fs from 'fs';
import path from 'path';

export default function BlogPost({ post, htmlContent }) {
  if (!post) return null;

  return (
    <>
      <SeoHead
        title={`${post.title} | Blissville`}
        description={post.excerpt}
        canonical={`https://www.blissville.com.ng/blog/${post.slug}`}
        ogImage={post.image}
      />

      <Navigation />

      {/* HERO USING PAGE NAVIGATION */}
      <PageHeader
        title={post.title}
        bgImage={post.image}
      />

      {/* ARTICLE CONTENT */}
      <ArticleWrapper>
        <BlogCoverImage src={post.image} alt={post.title} />
        <div className="d-flex align-items-center mb-3 gap-3 text-muted">
          <span className="text-primary fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>
            {post.category}
          </span>
          <span>&bull;</span>
          <span>{post.readTime}</span>
        </div>
        <h2 className="fw-bold mb-4">{post.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </ArticleWrapper>

      <ScheduleVisit />
      <Footer />
    </>
  );
}

/* -----------------------------------------------------
   MEDIUM-STYLE WRAPPER
------------------------------------------------------- */
const ArticleWrapper = ({ children }) => (
  <div
    className="container"
    style={{
      maxWidth: '800px',
      paddingTop: '3rem',
      paddingBottom: '3rem',
      lineHeight: '1.85',
      fontSize: '1.15rem',
    }}
  >
    {children}
  </div>
);

/* -----------------------------------------------------
   BEAUTIFUL LARGE COVER IMAGE
------------------------------------------------------- */
const BlogCoverImage = ({ src, alt }) => (
  <div className="mb-5">
    <Image
      src={src}
      alt={alt}
      width={1920}
      height={1080}
      className="rounded-3 shadow-sm"
      style={{ width: '100%', height: 'auto' }}
    />
  </div>
);

/* -----------------------------------------------------
   DATA FETCHING
------------------------------------------------------- */
export async function getStaticPaths() {
  const paths = BLOG_POSTS.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false, // Return 404 for missing slugs
  };
}

export async function getStaticProps({ params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  let htmlContent = '';
  try {
    const filePath = path.join(process.cwd(), 'content', 'blog', `${params.slug}.html`);
    htmlContent = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`Could not read file for slug: ${params.slug}`, err);
  }

  return {
    props: {
      post: post || null,
      htmlContent,
    },
  };
}
