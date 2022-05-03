import React from 'react';
import PropTypes from 'prop-types';
import { connect, Field, getIn } from 'formik';
import classNames from 'classnames';
import { FeedbackMessage, feedback } from 'components/forms/form-helper';
import Humanize from 'humanize-plus';
import { dashedLowerCase } from 'utils/helpers';
import Label from './Label';

const genId = (name, value) => `${name}-${value}`.replace(/\./g, '-');

const Radio = ({
  checked,
  formGroupLabelClassName,
  inline,
  inputClassName,
  name,
  label,
  value,
}) => {
  const radioId = genId(name, value);
  return (
    <div className={classNames('form-check', { 'form-check-inline': inline })}>
      <Field
        checked={checked}
        className={classNames(inputClassName, 'form-check-input')}
        id={radioId}
        name={name}
        type="radio"
        value={value}
      />

      <label
        className={classNames(formGroupLabelClassName, 'form-check-label')}
        htmlFor={radioId}
        id={`${radioId}-label `}
      >
        {label}
      </label>
    </div>
  );
};

Radio.propTypes = {
  checked: PropTypes.bool,
  formGroupLabelClassName: PropTypes.string,
  inline: PropTypes.bool.isRequired,
  inputClassName: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

Radio.defaultProps = {
  formGroupLabelClassName: null,
  checked: false,
  label: null,
  value: null,
};

const RadioSelect = ({
  formGroupLabelClassName,
  formik,
  helpText,
  inline,
  inputClassName,
  isValidMessage,
  label,
  labelClassName,
  labelSizeClassName,
  name,
  optional,
  options,
  radioSizeClassName,
  showFeedback,
  tooltipHeader,
  tooltipPosition,
  tooltipText,
  ...props
}) => {
  const fieldValue = getIn(formik.values, name);
  const radioGroup = options.map(({ label, value }) => {
    if (!(label || value)) return null;
    const optionValue = value || dashedLowerCase(label);
    const optionLabel = label || Humanize.capitalize(value);
    return (
      <Radio
        checked={fieldValue === optionValue}
        formGroupLabelClassName={formGroupLabelClassName}
        formik={formik}
        inline={inline}
        inputClassName={inputClassName}
        key={optionValue}
        label={optionLabel}
        name={name}
        value={optionValue}
      />
    );
  });

  return (
    <>
      {label ? (
        <RadioSelect.withLabel
          label={label}
          labelClassName={labelClassName}
          labelSizeClassName={labelSizeClassName}
          name={name}
          optional={optional}
          radioSizeClassName={radioSizeClassName}
          tooltipHeader={tooltipHeader}
          tooltipPosition={tooltipPosition}
          tooltipText={tooltipText}
        >
          {radioGroup}
        </RadioSelect.withLabel>
      ) : (
        radioGroup
      )}
      <FeedbackMessage
        formik={formik}
        helpText={helpText}
        showFeedback={showFeedback}
        name={name}
        validMessage={isValidMessage}
      />
    </>
  );
};

RadioSelect.propTypes = {
  formGroupLabelClassName: PropTypes.string,
  formik: PropTypes.object.isRequired,
  helpText: PropTypes.string,
  inline: PropTypes.bool,
  inputClassName: PropTypes.string,
  isValidMessage: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  labelSizeClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  optional: PropTypes.bool,
  options: PropTypes.array.isRequired,
  radioSizeClassName: PropTypes.string,
  showFeedback: PropTypes.oneOf(Object.keys(feedback)),
  tooltipHeader: PropTypes.string,
  tooltipPosition: PropTypes.string,
  tooltipText: PropTypes.string,
};

RadioSelect.defaultProps = {
  formGroupClassName: 'mb-4',
  helpText: null,
  inline: false,
  inputClassName: '',
  isValidMessage: null,
  label: null,
  labelClassName: null,
  labelSizeClassName: 'col-sm-2',
  optional: false,
  radioSizeClassName: 'col-sm-10',
  showFeedback: feedback.ALL,
  tooltipHeader: null,
  tooltipPosition: 'right',
  tooltipText: null,
};

RadioSelect.withLabel = ({
  children,
  label,
  labelClassName,
  labelSizeClassName,
  name,
  optional,
  radioSizeClassName,
  tooltipHeader,
  tooltipText,
  tooltipPosition,
}) => {
  return (
    <fieldset className="form-group">
      <div className="row">
        <legend className={`col-form-label ${labelSizeClassName} pt-0`}>
          <Label
            className={`label-radio ${labelClassName}`}
            name={name}
            text={label}
            optional={optional}
            tooltipHeader={tooltipHeader}
            tooltipPosition={tooltipPosition}
            tooltipText={tooltipText}
          />
        </legend>
        <div className={radioSizeClassName}>{children}</div>
      </div>
    </fieldset>
  );
};

RadioSelect.withLabel.propTypes = {
  children: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
  labelSizeClassName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  optional: PropTypes.bool,
  radioSizeClassName: PropTypes.string.isRequired,
  tooltipHeader: PropTypes.string,
  tooltipPosition: PropTypes.string,
  tooltipText: PropTypes.string,
};

RadioSelect.withLabel.defaultProps = {
  labelClassName: null,
  tooltipText: null,
  tooltipHeader: null,
  tooltipPosition: 'right',
  optional: false,
};

export default connect(RadioSelect);
