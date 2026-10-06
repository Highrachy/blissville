export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || '1512176516986701';

/**
 * Standard or Custom Meta Pixel tracking event
 * @param {string} event - The Meta event name (e.g. 'PageView', 'ViewContent', 'Lead', 'Contact', 'Purchase')
 * @param {object} [options] - Custom parameters payload
 */
export const trackMetaEvent = (event, options = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    if (Object.keys(options).length > 0) {
      window.fbq('track', event, options);
    } else {
      window.fbq('track', event);
    }
  }
};
