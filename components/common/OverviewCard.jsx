import React, { useState } from 'react';

/**
 * OverviewCard - A reusable, optionally collapsible card with white background, padding, rounded corners, and shadow.
 * @param {React.ReactNode} children - Card content
 * @param {string} className - Additional classes
 * @param {string|React.ReactNode} header - Optional card header/title
 * @param {boolean} collapsible - If true, card is collapsible (default: true)
 * @param {object} rest - Other props
 */
const OverviewCard = ({
  children,
  className = 'p-5',
  header,
  collapsible = false,
  ...rest
}) => {
  const [open, setOpen] = useState(true);
  const showContent = !collapsible || open;
  return (
    <div
      className={`mb-3 rounded overview-card shadow-sm ${className}`}
      {...rest}
    >
      {header && (
        <h5
          className={`d-flex align-items-center justify-content-between${
            collapsible ? ' cursor-pointer' : ''
          } mb-3`}
          style={{ userSelect: 'none' }}
          onClick={collapsible ? () => setOpen((v) => !v) : undefined}
        >
          <span className="fw-semibold mb-0">{header}</span>
          {collapsible && (
            <span
              style={{
                transition: 'transform 0.2s',
                transform: open ? 'rotate(0deg)' : 'rotate(-180deg)',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 8L10 12L14 8"
                  stroke="#333"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </h5>
      )}
      {showContent && <div>{children}</div>}
    </div>
  );
};

export default OverviewCard;
