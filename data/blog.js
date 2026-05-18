export const BLOG_CATEGORIES = {
  ALL: 'All Stories',
  MARKET_DATA: 'Market Data',
  LIFESTYLE: 'Lifestyle',
  INVESTING: 'Investing',
  ARCHITECTURE: 'Architecture',
  ADVISORY: 'Advisory',
};

const DEFAULT_AUTHOR = {
  name: 'Oluwatodimu Adeleke',
  role: 'Author',
  avatar: 'https://highrachy.s3.amazonaws.com/team/picture/0a9d3fd0-08c2-11ef-b90e-e51880c7684a.png',
};

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Beyond the Hype: Tenets of a Winning Real Estate Deal',
    excerpt:
      'A deep dive into what truly makes a real estate investment successful beyond marketing hype and quick sales.',
    image: '/assets/img/blog/beyond-the-hype.jpg',
    slug: 'beyond-the-hype-tenets-of-a-winning-real-estate-deal',
    category: BLOG_CATEGORIES.INVESTING,
    readTime: '5 min read',
    date: 'March 12, 2026',
    author: DEFAULT_AUTHOR,
  },
  {
    id: 2,
    title: 'Finding Your Dream Home in Lagos: A Simple Guide',
    excerpt:
      'We know the Lagos market can feel complex. That is why we have broken down these three (3) important steps into a simple, easy-to-read guide.',
    image: '/assets/img/blog/lagos-view.jpg',
    slug: 'finding-your-dream-home-in-lagos',
    category: BLOG_CATEGORIES.ADVISORY,
    readTime: '4 min read',
    date: 'March 15, 2026',
    author: DEFAULT_AUTHOR,
  },
  {
    id: 3,
    title:
      'The Blissville Effect: How Your Premium Home Design Can (Literally) Add Years to Your Life and Value to Your Portfolio',
    excerpt:
      'How intentional home design, wellness-focused living, and community alignment protect both lifestyle and long-term investment value.',
    image: '/assets/img/blog/the-blissville-effect.jpg',
    slug: 'the-blissville-effect',
    category: BLOG_CATEGORIES.ARCHITECTURE,
    readTime: '6 min read',
    date: 'April 02, 2026',
    author: DEFAULT_AUTHOR,
  },
  {
    id: 4,
    title: '2026: Blissville Terraces - From Acceleration to Consolidation',
    excerpt:
      'A 2026 outlook on Blissville Terraces as acceleration gives way to consolidation, infrastructure delivery, and peak investment opportunity.',
    image: '/assets/img/blog/blissville-terraces-2026.jpg',
    slug: '2026-blissville-terraces-from-acceleration-to-consolidation',
    category: BLOG_CATEGORIES.MARKET_DATA,
    readTime: '3 min read',
    date: 'April 10, 2026',
    author: DEFAULT_AUTHOR,
  },
  {
    id: 5,
    title: 'The Value of Peace of Mind - Your Home Should Be a Sanctuary',
    excerpt:
      'A home should be more than shelter. Discover how thoughtful design, strong foundations, and secure ownership create true peace of mind.',
    image: '/assets/img/blog/blissville-sanctuary.jpg',
    slug: 'the-value-of-peace-of-mind',
    category: BLOG_CATEGORIES.LIFESTYLE,
    readTime: '4 min read',
    date: 'April 18, 2026',
    author: DEFAULT_AUTHOR,
  },
  {
    id: 6,
    title: 'The "Blue Bliss": Why Your Next Investment Should Breathe',
    excerpt:
      'Experience waterfront living that combines peace, wellness, and strong investment returns. Discover why "Blue Bliss" is more than a view, it is a lifestyle.',
    image: '/assets/img/blog/the-blue-bliss.jpg',
    slug: 'the-blue-bliss-why-your-next-investment-should-breathe',
    category: BLOG_CATEGORIES.INVESTING,
    readTime: '5 min read',
    date: 'April 25, 2026',
    author: DEFAULT_AUTHOR,
  },
  {
    id: 7,
    title: 'Why Sangotedo Properties Keep Growing',
    excerpt:
      "Sangotedo has emerged as Lagos' fastest-growing investment corridor, with rapid appreciation, infrastructure expansion, and rare waterfront opportunities driving explosive equity growth.",
    image: '/assets/img/blog/sangotedo-inflection.jpg',
    slug: 'why-sangotedo-properties-keep-growing',
    category: BLOG_CATEGORIES.MARKET_DATA,
    readTime: '5 min read',
    date: 'May 02, 2026',
    author: DEFAULT_AUTHOR,
  },
  {
    id: 8,
    title:
      'From Bar Beach to Eko Atlantic: Why Sangotedo is the Next Lagos Success Story',
    excerpt:
      'Lagos transforms fast, and Sangotedo is next. Discover how infrastructure, gentrification, and economic shifts are turning this corridor into the next prime real estate destination.',
    image: '/assets/img/blog/sangotedo-success.jpg',
    slug: 'sangotedo-next-lagos-success-story',
    category: BLOG_CATEGORIES.MARKET_DATA,
    readTime: '6 min read',
    date: 'May 10, 2026',
    author: DEFAULT_AUTHOR,
  },
];

export default BLOG_POSTS;
