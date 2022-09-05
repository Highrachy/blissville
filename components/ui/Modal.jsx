import React from 'react';
import PropTypes from 'prop-types';
import { Modal as BModal } from 'react-bootstrap';
import Button from '../forms/Button';

const Modal = ({ showFooter, className, ...props }) => {
  return (
    <BModal
      {...props}
      size={props.size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={className}
    >
      {props.title && (
        <BModal.Header closeButton>
          <BModal.Title id="contained-modal-title-vcenter">
            {props.title}
          </BModal.Title>
        </BModal.Header>
      )}
      <BModal.Body>{props.children}</BModal.Body>
      {showFooter && (
        <BModal.Footer>
          <Button color="none" className="btn btn-light" onClick={props.onHide}>
            Close
          </Button>
        </BModal.Footer>
      )}
    </BModal>
  );
};

Modal.propTypes = {
  children: PropTypes.any.isRequired,
  dialogClassName: PropTypes.string,
  title: PropTypes.string,
  size: PropTypes.string,
  showFooter: PropTypes.bool,
};

Modal.defaultProps = {
  size: 'md', //xs, sm, md, lg
  className: null, //modal-left, modal-right
  showFooter: false,
  title: null,
};

export default Modal;
