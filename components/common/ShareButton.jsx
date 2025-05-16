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
import Button from '../forms/Button';
import { ShareProjectIcon } from '../Icons/Icons';

const ShareButton = ({ url, text, header = 'Share this Project' }) => {
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

  const handleClose = () => setShowOptions(false);

  return (
    <>
      <Button
        color="light"
        onClick={() => setShowOptions(true)}
        aria-label="Share"
      >
        {header} <ShareProjectIcon />
      </Button>

      <Modal show={showOptions} onHide={handleClose} className="share-modal">
        <div className="share-box">
          <button className="btn-close share-close" onClick={handleClose} />

          <h5 className="fw-semibold mb-1">{header}</h5>
          <p className="text-muted mb-4 small">
            Share this on social media to let others know.
          </p>

          <div className="d-flex flex-column gap-2 mb-3">
            <button
              className="btn share-btn btn-twitter"
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    url
                  )}&text=${encodeURIComponent(text)}`,
                  '_blank'
                )
              }
            >
              <FaXTwitter className="me-2" /> Share on X
            </button>

            <button
              className="btn share-btn btn-facebook"
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    url
                  )}`,
                  '_blank'
                )
              }
            >
              <FaFacebookF className="me-2" /> Share on Facebook
            </button>

            <button
              className="btn share-btn btn-linkedin"
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    url
                  )}`,
                  '_blank'
                )
              }
            >
              <FaLinkedinIn className="me-2" /> Share on LinkedIn
            </button>

            <button
              className="btn share-btn btn-whatsapp"
              onClick={() =>
                window.open(
                  `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
                  '_blank'
                )
              }
            >
              <FaWhatsapp className="me-2" /> Share on WhatsApp
            </button>

            <button className="btn share-btn btn-email" onClick={handleEmail}>
              <FaEnvelope className="me-2" /> Send via Email
            </button>

            <button className="btn share-btn btn-copy" onClick={handleCopy}>
              <FaRegCopy className="me-2" />
              {copied ? 'Link Copied!' : 'Copy Link'}
            </button>
          </div>

          <button className="btn btn-outline-secondary" onClick={handleClose}>
            No thanks
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ShareButton;
