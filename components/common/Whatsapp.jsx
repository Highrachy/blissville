import React, { useState, useRef, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useChatMessage } from 'context/chat';

const contacts = [
  { number: '2349055555496', label: 'Omolara' },
  { number: '2349055555146', label: 'David' },
];

const FloatingChatButton = () => {
  const [showOptions, setShowOptions] = useState(false);
  const { message, isVisible } = useChatMessage();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showOptions]);

  if (!isVisible) return null;

  const handleContactClick = (number) => {
    window.open(
      `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
    setShowOptions(false);
  };

  const handleClose = () => setShowOptions(false);

  return (
    <div className="floating-chat-wrapper">
      {showOptions && (
        <div className="chat-modal card border-0 shadow-lg" ref={modalRef}>
          <div className="card-header chat-header d-flex justify-content-between align-items-center">
            <span className="fw-semibold small text-dark">
              Contact Our Sales Team
            </span>
            <button
              className="btn btn-close"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="card-body p-0">
            {contacts.map((contact) => (
              <button
                key={contact.number}
                className="chat-option-btn d-flex align-items-center w-100 border-0 px-3"
                onClick={() => handleContactClick(contact.number)}
              >
                <FaWhatsapp className="me-3 text-success" size={22} />
                <div>
                  <div className="fw-semibold agent-label">{contact.label}</div>
                  <div className="small agent-number">
                    +{contact.number.slice(0, 3)} {contact.number.slice(3, 6)}{' '}
                    {contact.number.slice(6)}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="card-footer bg-white text-center border-top-0 py-2">
            <small className="text-muted tiny-text">
              Powered by&nbsp;
              <a
                href="https://highrachy.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Highrachy
              </a>
            </small>
          </div>
        </div>
      )}

      {!showOptions && (
        <button
          className="floating-chat-button"
          onClick={() => setShowOptions(true)}
          aria-label="Open WhatsApp options"
        >
          <FaWhatsapp size={32} />
        </button>
      )}
    </div>
  );
};

export default FloatingChatButton;
