import {
  email,
  stringValidation,
  optionalValidation,
  required,
  minDateValidation,
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
  title: stringValidation('Title'),
  firstName: stringValidation('First Name'),
  lastName: stringValidation('Last Name'),
  email,
  phone: optionalValidation(required('Phone Number')),
  paymentStartDate: minDateValidation('Visitation Date', new Date()),
};
