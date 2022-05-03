import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { connect } from 'formik';
import classNames from 'classnames';
import { FeedbackMessage, feedback } from 'components/forms/form-helper';
import Label from './Label';

const Switch = ({
  autoComplete,
  formGroupClassName,
  formik,
  helpText,
  inline,
  inputClassName,
  isValidMessage,
  label,
  labelLink,
  labelClassName,
  name,
  optional,
  showFeedback,
  tooltipHeader,
  tooltipText,
  tooltipPosition,
  ...props
}) => {
  return (
    <div className={classNames('mb-4', formGroupClassName)}>
      <div className="form-check form-switch">
        <Field
          aria-describedby={name}
          autoComplete={autoComplete}
          className={classNames('form-check-input', inputClassName)}
          id={name}
          name={name}
          type="checkbox"
          {...props}
        />
        <Label
          className={classNames('form-check-label', labelClassName)}
          hideOptionalText
          labelLink={labelLink}
          name={name}
          optional={optional}
          text={label}
          tooltipHeader={tooltipHeader}
          tooltipPosition={tooltipPosition}
          tooltipText={tooltipText}
          floatingLabel
        />
      </div>
    </div>
  );
};

Switch.defaultProps = {
  autoComplete: 'off',
  formGroupClassName: 'col mb-4',
  helpText: null,
  inline: false,
  inputClassName: null,
  isValidMessage: '',
  label: null,
  labelClassName: null,
  labelLink: null,
  optional: false,
  showFeedback: feedback.ALL,
  tooltipHeader: null,
  tooltipText: null,
  tooltipPosition: 'right',
};

Switch.propTypes = {
  autoComplete: PropTypes.string,
  formGroupClassName: PropTypes.string,
  formik: PropTypes.object.isRequired,
  helpText: PropTypes.string,
  inline: PropTypes.bool,
  inputClassName: PropTypes.string,
  isValidMessage: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  labelLink: PropTypes.shape({
    to: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
  }),
  name: PropTypes.string.isRequired,
  optional: PropTypes.bool,
  showFeedback: PropTypes.oneOf(Object.keys(feedback)),
  tooltipHeader: PropTypes.string,
  tooltipPosition: PropTypes.string,
  tooltipText: PropTypes.any,
};

export default connect(Switch);
