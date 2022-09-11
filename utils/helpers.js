import humanize from 'humanize-plus';

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
  const output = values.map((value) => ({
    value: value.toString(),
    label: humanize.titleCase(value.toString()),
  }));

  return defaultLabel
    ? [{ value: '', label: defaultLabel }, ...output]
    : output;
};

export const dataToOptions = (data, label, value = '_id') => {
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
  }
) => {
  const startFrom =
    options.startFrom || options.startFrom === 0 ? options.startFrom : 1;
  const firstOptionText = options.firstOptionText;
  const pluralizeText = options.pluralizeText || true;

  return [...Array(number).keys()].map((value) => {
    const num = value + startFrom;
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

export const moneyFormat = (value) => Humanize.formatNumber(value, 2);
export const moneyFormatInNaira = (value) => commaNumber(value, true);

export const commaNumber = (value, prependCurrency = false) => {
  const number = parseInt(value, 10);
  const currency = prependCurrency ? '₦' : '';
  const sign = number < 0 ? '— ' : '';
  return sign + currency + humanize.intComma(Math.abs(number));
};
