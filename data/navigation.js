export const home = {
  title: 'Home',
  url: '',
  children: {},
};

export const projects = {
  title: 'Projects',
  url: 'projects',
  children: {
    '/our-projects/blissville-terraces': 'Blissville Terraces',
    '/our-projects/blissville-apartments': 'Blissville Apartments',
    // 'our-projects': 'View All Projects',
    // 'our-properties': 'View All  Properties',
    // 'past-projects': 'Past Projects',
  },
};

export const faqs = {
  title: 'Faqs',
  url: 'faqs',
  children: {},
};

export const aboutUs = {
  title: 'About Us',
  url: 'about-us',
  children: {
    '/about-us': 'About Blissville',
    '/about-us#meet-our-team': 'Meet Our Team',
    '/about-us#core-values': 'Our Core Values',
  },
};

export const investors = {
  title: 'Investors',
  url: 'investors',
  children: {},
};

export const contactUs = {
  title: 'Contact Us',
  url: 'contact-us',
  children: {},
};
export const login = {
  title: 'Login',
  url: 'login',
  children: {},
};

const navigation = [
  // home,
  aboutUs,
  projects,
  faqs,
  investors,
  contactUs,
  login,
];

export default navigation;
