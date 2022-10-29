import React from 'react';

const Alert = ({ children, type = 'danger', handleClose }) => {
  return (
    <div className={`alert alert-${type} alert-dismissible my-4`} role="alert">
      <div>{children}</div>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={handleClose}
      ></button>
    </div>
  );
};

export default Alert;
