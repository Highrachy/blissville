import React, { useState } from 'react';
import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaRegCopy,
  FaWhatsapp,
  FaXTwitter,
} from 'react-icons/fa6';
import Modal from '@/components/ui/Modal';
import { FaInstagram, FaShareAlt } from 'react-icons/fa';

const SOCIALS = [
  {
    name: 'Facebook',
    icon: <FaFacebookF className="icon text-facebook" />,
    getShareUrl: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: 'Twitter',
    icon: <FaXTwitter className="icon text-twitter" />,
    getShareUrl: (url, text) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
  },
  {
    name: 'Instagram',
    icon: <FaInstagram className="icon text-instagram" />,
    getShareUrl: (url) =>
      `https://www.instagram.com/?url=${encodeURIComponent(url)}`,
  },
  {
    name: 'WhatsApp',
    icon: <FaWhatsapp className="icon text-whatsapp" />,
    getShareUrl: (url, text) =>
      `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedinIn className="icon text-linkedin" />,
    getShareUrl: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
  },
];

const ShareButton = ({ url, text, header = 'Share Page' }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const handleEmail = () => {
    const subject = encodeURIComponent('Check this out!');
    const body = encodeURIComponent(`${text}\n\n${url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <button
        className="btn btn-info ms-2"
        aria-label="Share"
        onClick={() => setShowOptions(true)}
      >
        <FaShareAlt size={20} /> {header}
      </button>

      <Modal
        show={showOptions}
        onHide={() => setShowOptions(false)}
        className="share-modal"
      >
        <div className="share-box text-center">
          <button
            className="btn-close share-close"
            onClick={() => setShowOptions(false)}
          />
          <h4 className="fw-semibold font-primary mb-4">Share this Page</h4>

          <div className="d-flex justify-content-center gap-3 mb-5 flex-wrap">
            {SOCIALS.map((social) => (
              <button
                key={social.name}
                className={`share-icon-btn text-${social.name.toLowerCase()}`}
                aria-label={`Share on ${social.name}`}
                onClick={() => {
                  window.open(social.getShareUrl(url, text), '_blank');
                  setShowOptions(false);
                }}
              >
                {social.icon}
              </button>
            ))}
          </div>

          <div className="d-flex justify-content-center gap-2">
            <button className="btn btn-info-light" onClick={handleCopy}>
              <FaRegCopy className="me-3" />
              {copied ? 'Copied!' : 'Copy link'}
            </button>
            <button className="btn btn-primary-light" onClick={handleEmail}>
              <FaEnvelope className="me-3" />
              Send as Email
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ShareButton;
