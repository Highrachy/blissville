import {
  email,
  stringValidation,
  optionalValidation,
  required,
  minDateValidation,
  password,
  confirmPassword,
  moneyRange,
  positiveNumberValidation,
  requiredDate,
} from './schema-helpers';

export const contactUsSchema = {
  name: stringValidation('Full Name'),
  email,
  phone: optionalValidation(required('Phone Number')),
  subject: required('Subject'),
  message: stringValidation('Message', 10),
};

export const askInfoSchema = {
  name: stringValidation('Full Name'),
  email,
  phone: optionalValidation(required('Phone Number')),
  message: stringValidation('Message', 10),
};

export const visitationSchema = {
  name: stringValidation('Full Name'),
  email,
  phone: optionalValidation(required('Phone Number')),
  visitDate: minDateValidation('Visitation Date', new Date()),
};

export const interestSchema = {
  firstName: stringValidation('First Name'),
  lastName: stringValidation('Last Name'),
  email,
  phone: optionalValidation(required('Phone Number')),
  paymentStartDate: minDateValidation('Visitation Date', new Date()),
};

export const rescheduleVisitationSchema = {
  visitDate: minDateValidation('Visitation Date', new Date()),
};
export const loginSchema = {
  email,
  password,
};
export const registerSchema = {
  firstName: stringValidation('First Name'),
  lastName: stringValidation('Last Name'),
  email,
  phone: optionalValidation(required('Phone Number')),
  password,
  confirmPassword,
};

export const setPasswordSchema = {
  password,
  confirmPassword,
};

export const referralSchema = {
  referralName: optionalValidation(stringValidation('Name')),
  email,
};

export const onlinePaymentSchema = {
  amount: moneyRange('Amount', 'amount', 10_000, 1_000_000),
};

export const offlinePaymentSchema = {
  amount: positiveNumberValidation('Amount', 'amount'),
  bank: required('Bank'),
  paymentDate: requiredDate('Payment Date'),
  evidence: optionalValidation(required('Evidence')),
  type: required('Payment Type'),
};
