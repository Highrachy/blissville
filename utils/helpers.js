import humanize from 'humanize-plus';
import { LocalImage } from '@/components/common/Image';
import Link from 'next/link';
import { getShortDate } from './date-helpers';
import classNames from 'classnames';

export const isDevEnvironment = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const objectToOptions = (obj, defaultLabel = null, inverse = false) => {
  const output = Object.entries(obj).map(([label, value]) => ({
    value: inverse ? label.toString() : value.toString(),
    label: inverse
      ? humanize.titleCase(value.toString())
      : humanize.titleCase(label.toString()),
  }));

  return defaultLabel
    ? [{ value: '', label: defaultLabel }, ...output]
    : output;
};

export const valuesToOptions = (values, defaultLabel = null) => {
  const output = values?.map((value) => ({
    value: value.toString(),
    label: humanize.titleCase(value.toString()),
  }));

  return defaultLabel
    ? [{ value: '', label: defaultLabel }, ...output]
    : output;
};

export const dataToOptions = (data, label, value = 'id') => {
  if (!data) return null;
  const output = Object.values(data).map((item) => ({
    value: item[value],
    label: item[label],
  }));

  return output;
};

export const booleanOptions = (trueLabel = 'Yes', falseLabel = 'No') => [
  { label: trueLabel, value: 'true' },
  { label: falseLabel, value: 'false' },
];

export const generateNumOptions = (
  number = 12,
  type = '',
  options = {
    startFrom: 0,
    firstOptionText: null,
    pluralizeText: false,
    step: 1,
  }
) => {
  const startFrom =
    options.startFrom || options.startFrom === 0 ? options.startFrom : 1;
  const firstOptionText = options.firstOptionText;
  const pluralizeText = options.pluralizeText || true;

  return [...Array(number).keys()].map((value) => {
    const num = value * options.step + startFrom;
    return {
      value: num.toString(),
      label:
        num.toString() === startFrom.toString() && firstOptionText
          ? firstOptionText
          : `${num} ${pluralizeText ? humanize.pluralize(num, type) : type}`,
    };
  });
};

export const dashedLowerCase = (text) =>
  text && text.toString().replace(/\s+/g, '-').toLowerCase();

export const moneyFormat = (value) => humanize.formatNumber(value, 2);
export const moneyFormatInNaira = (value) => commaNumber(value, true);

export const commaNumber = (value, prependCurrency = false) => {
  const number = parseInt(value, 10);
  const currency = prependCurrency ? '₦' : '';
  const sign = number < 0 ? '— ' : '';
  return sign + currency + humanize.intComma(Math.abs(number));
};

export const getError = (error, policyError = 'Record exists') => {
  if (error?.response?.status === 404) return;
  if (error?.response?.status === 403) {
    return policyError;
  } else {
    return error?.response?.data
      ? JSON.stringify(error?.response?.data?.error) ||
          JSON.stringify(error?.response?.data?.message) ||
          JSON.stringify(error)
      : 'An error has occured. Please try again later.';
  }
};
export const statusIsSuccessful = (status) => status >= 200 && status <= 204;

// Async Validation
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fieldsToOptions = (values, defaultLabel = null, labels = {}) => {
  const output = values.map((value) => ({
    value: value.toString(),
    label: labels?.[value] || camelToSentence(value.toString()),
  }));

  return defaultLabel
    ? [{ value: '', label: defaultLabel }, ...output]
    : output;
};

// check if undefine or null or empty string
export const isEmpty = (value) => {
  return value === undefined || value === null || value === '';
};

// check if data is a string
export const isString = (data) => typeof data === 'string';

//check if link is an image link
export const isImage = (link) => {
  return link.match(/\.(jpeg|jpg|gif|png)$/);
};

// check if boolean
export const isBoolean = (value) => typeof value === 'boolean';

// check if valid date
export const isValidDate = (date) => {
  return !isNaN(Date.parse(date));
};

// check if string is a valid url
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

// check if variable is an object and is not empty
export const isObject = (obj) => {
  return obj && typeof obj === 'object';
};

export const camelToSentence = (str) =>
  str.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

// check if is valid number or decimal number

export const isValidNumber = (value) => {
  return !isNaN(value) && isFinite(value);
};

export const processData = (data, item) => {
  if (isEmpty(data)) {
    return <em className="text-muted-light">(empty)</em>;
  }
  if (isBoolean(data)) {
    return data ? 'Yes' : 'No';
  }
  if (isValidNumber(data)) {
    return data;
  }
  if (isValidDate(data)) {
    try {
      return getShortDate(data);
    } catch (e) {
      return data;
    }
  }
  if (isString(data)) {
    if (isImage(data)) {
      return (
        <Link href={data} passHref>
          <a target="_blank" rel="noopener noreferrer">
            <LocalImage
              src={data}
              name={item}
              className="img-xxl img-cover"
              rounded
            />
          </a>
        </Link>
      );
    }
    if (isValidUrl(data)) {
      return (
        <Link href={data} passHref>
          <a target="_blank" rel="noopener noreferrer">
            {data}
          </a>
        </Link>
      );
    }
    return data;
  }
  return '-';
};

export const getLocationFromAddress = (address, shortForm = false) => {
  let output = '';
  if (shortForm) return `${address?.city}, ${address?.state}`;

  if (address?.street1 && !shortForm) {
    output += address.street1.trim();

    if (address?.street2) {
      output += `, ${address.street2.trim()}`;
    }

    if (address?.city) {
      output += `, ${address.city.trim()}`;
    }

    if (address?.state) {
      output += `, ${address.state.trim()}.`;
    }
  }
  return output.replaceAll(',,', ',');
};

export const getFormattedAddress = ({
  street1,
  street2,
  city,
  state,
  country,
  hideCountry,
}) => (
  <address>
    {street1}
    <br />
    {street2 && (
      <>
        {street2} <br />{' '}
      </>
    )}
    {city}, {state}
    {!hideCountry && (
      <>
        <br />
        {country}.
      </>
    )}
  </address>
);

const PACKAGE = {
  ALL: 'all',
  SHELL: 'shell',
  STANDARD: 'standard',
  SUPREME: 'supreme',
};

export const listFeatures = (project, type = PACKAGE.ALL) => {
  const features = {
    [PACKAGE.SHELL]: project.features,
    [PACKAGE.STANDARD]: project.standardFeatures,
    [PACKAGE.SUPREME]: project.supremeFeatures,
  };
  const output = [];
  // loop features and split string by , and push to output
  Object.entries(features).forEach(([key, value]) => {
    value?.split(',').forEach((feature) => {
      output.push(
        <li
          key={feature}
          className={classNames('col-md-4', {
            invalid:
              type !== PACKAGE.ALL &&
              ((type === PACKAGE.SHELL && key !== PACKAGE.SHELL) ||
                (type === PACKAGE.STANDARD && key === PACKAGE.SUPREME)),
            standard: key === PACKAGE.STANDARD,
            supreme: key === PACKAGE.SUPREME,
          })}
        >
          {feature}
        </li>
      );
    });
  });
  return <ul className="my-4 row list-features">{output}</ul>;
};
