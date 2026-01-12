import React from 'react';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import SeoHead from '@/components/utils/SeoHead';
import BlogSection from '@/components/blog/BlogSection';

export default function BlogIndex() {
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

      <PageHeader
        title="Insights & Articles"
        bgImage="/assets/img/blog/beyond-the-hype.jpg"
      />

      {/* Blog Listing */}
      <BlogSection hideLinkButton />

      <Footer />
    </>
  );
}
