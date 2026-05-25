import React, { useState } from 'react';
import Image from 'next/image';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import SeoHead from '@/components/utils/SeoHead';
import NewsletterBlock from '@/components/blog/NewsletterBlock';
import BlogSection from '@/components/blog/BlogSection';
import BlogCTA from '@/components/blog/BlogCTA';
import BLOG_POSTS from '@/data/blog';
import fs from 'fs';
import path from 'path';
import BlogHero from '@/components/blog/BlogHero';
import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaRegCopy,
  FaWhatsapp,
  FaXTwitter,
} from 'react-icons/fa6';

/**
 * Helper to split HTML content into two parts for mid-article image insertion.
 * Splits after the second paragraph, or the first paragraph, or the first heading.
 */
function getSplitContent(html) {
  if (!html) return { intro: '', body: '' };

  const pRegex = /<\/p>/gi;
  const pMatches = [...html.matchAll(pRegex)];

  let splitIndex = 0;

  if (pMatches.length >= 2) {
    splitIndex = pMatches[1].index + 4;
  } else if (pMatches.length === 1) {
    splitIndex = pMatches[0].index + 4;
  } else {
    const headingRegex = /<(h2|h3|h4)/gi;
    const matches = [...html.matchAll(headingRegex)];
    if (matches.length > 0) {
      splitIndex = matches[0].index;
    } else {
      splitIndex = html.length;
    }
  }

  return {
    intro: html.substring(0, splitIndex),
    body: html.substring(splitIndex),
  };
}

/**
 * Sub-component for the social share icons.
 */
function ShareBlock({ url, text, onCopy, onEmail, copied }) {
  const openShare = (platformUrl) => {
    window.open(platformUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="share-insight">
      <span>SHARE THIS INSIGHT</span>
      <div className="share-icons-list">
        <a
          href="#"
          className="share-icon-link"
          onClick={(e) => {
            e.preventDefault();
            openShare(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
          }}
        >
          <FaXTwitter size={18} />
        </a>
        <a
          href="#"
          className="share-icon-link"
          onClick={(e) => {
            e.preventDefault();
            openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
          }}
        >
          <FaFacebookF size={18} />
        </a>
        <a
          href="#"
          className="share-icon-link"
          onClick={(e) => {
            e.preventDefault();
            openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
          }}
        >
          <FaLinkedinIn size={18} />
        </a>
        <a
          href="#"
          className="share-icon-link"
          onClick={(e) => {
            e.preventDefault();
            openShare(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`);
          }}
        >
          <FaWhatsapp size={20} />
        </a>
        <a href="#" className="share-icon-link" onClick={onEmail}>
          <FaEnvelope size={18} />
        </a>
        <a
          href="#"
          className="share-icon-link"
          onClick={onCopy}
          title={copied ? 'Copied!' : 'Copy Link'}
        >
          <FaRegCopy size={18} style={{ color: copied ? '#10b981' : 'inherit' }} />
        </a>
      </div>
    </div>
  );
}

export default function BlogPost({ post, htmlContent, relatedPosts }) {
  const [copied, setCopied] = useState(false);

  if (!post) return null;

  const shareUrl = `https://www.blissville.com.ng/blog/${post.slug}`;
  const shareText = `Check out this insight: ${post.title}`;

  const { intro, body } = getSplitContent(htmlContent);

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const handleEmail = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent('Check this out!');
    const bodyText = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${bodyText}`;
  };

  return (
    <>
      <SeoHead
        title={`${post.title} | Blissville`}
        description={post.excerpt}
        canonical={shareUrl}
        ogImage={post.image}
      />

      <Navigation />

      <main style={{ minHeight: '100vh' }}>
        <BlogHero post={post} isSinglePost={true} />

        <article className="container mt-6">
          <div className="mx-auto" style={{ maxWidth: '680px' }}>
            {/* Article Content - Intro Part */}
            {intro && (
              <div
                className="article-content mb-4"
                dangerouslySetInnerHTML={{ __html: intro }}
              />
            )}

            {/* Mid-Article Featured Image */}
            <div
              className="my-5 rounded-4 overflow-hidden shadow-lg"
              style={{ position: 'relative', aspectRatio: '16/9' }}
            >
              <Image
                src={post.image}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="article-inner-image"
              />
            </div>

            {/* Article Content - Remaining Part */}
            {body && (
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            )}

            <ShareBlock
              url={shareUrl}
              text={shareText}
              onCopy={handleCopy}
              onEmail={handleEmail}
              copied={copied}
            />

            {/* Newsletter Block can be re-enabled if needed */}
            {/* <NewsletterBlock /> */}
          </div>
        </article>
      </main>

      <div className="bg-body-tertiary pt-5 pb-5">
        <BlogSection
          title="Related Stories"
          posts={relatedPosts}
          hideHeading={true}
        />
      </div>

      <Footer />
    </>
  );
}


export async function getStaticPaths() {
  const paths = BLOG_POSTS.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
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

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== params.slug);
  let relatedPosts = otherPosts.filter((p) => p.category === post.category);

  if (relatedPosts.length < 2) {
    const fallbackPosts = otherPosts.filter((p) => p.category !== post.category);
    relatedPosts = [...relatedPosts, ...fallbackPosts];
  }

  relatedPosts = relatedPosts
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  return {
    props: {
      post: post || null,
      htmlContent,
      relatedPosts,
    },
  };
}
