import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import Button from './Button';
import { toast } from 'react-toastify';

const FormikButton = ({ children, ...props }) => {
  const {
    submitForm,
    validateForm,
    isSubmitting,
    isValid,
    touched,
    setTouched,
  } = useFormikContext();

  const handleClick = async () => {
    // Trigger validation
    const errors = await validateForm();

    // Mark all fields as touched (so errors show)
    setTouched(
      Object.keys(errors).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {}),
    );

    if (Object.keys(errors).length > 0) {
      toast.error(Object.values(errors)[0]);
      return;
    }

    // Submit only if valid
    submitForm();
  };

  return (
    <Button onClick={handleClick} disabled={isSubmitting} {...props}>
      {isSubmitting ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" />
          Processing...
        </>
      ) : (
        children
      )}
    </Button>
  );
};

FormikButton.propTypes = {
  children: PropTypes.any,
};

FormikButton.defaultProps = {
  children: 'Submit',
};

export default FormikButton;
