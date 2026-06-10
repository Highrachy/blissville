import React from 'react';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import SeoHead from '@/components/utils/SeoHead';
import BlogSection from '@/components/blog/BlogSection';
import BlogHero from '@/components/blog/BlogHero';
import BlogCTA from '@/components/blog/BlogCTA';
import NewsletterBlock from '@/components/blog/NewsletterBlock';
import BLOG_POSTS from '@/data/blog';

export default function BlogIndex() {
  // Use the 3 newest posts as the carousel slides
  const featuredPosts = BLOG_POSTS.slice().reverse().slice(0, 3);

  return (
    <>
      <SeoHead
        title="Insights & Articles | Blissville"
        description="Expert insights, market updates, and thought leadership on real estate, investment strategy, wellness-focused living, and infrastructure-led growth."
        canonical="https://www.blissville.com.ng/blog"
        ogImage="/assets/img/blog/beyond-the-hype.jpg"
        keywords={[
          'Blissville blog',
          'Real estate insights Nigeria',
          'Property investment articles',
          'Lagos real estate market',
          'Infrastructure investment Nigeria',
          'Blissville Terraces updates',
          'Highrachy real estate insights',
        ]}
      />

      <Navigation />

      <main className="pb-5 bg-primary-50" style={{ minHeight: '100vh' }}>
        <BlogHero posts={featuredPosts} />

        <BlogSection />

        {/* <BlogCTA /> */}

        {/* <NewsletterBlock /> */}
      </main>

      <Footer />
    </>
  );
}
