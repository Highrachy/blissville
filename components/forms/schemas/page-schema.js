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
  phoneNumber,
  booleanValidation,
} from './schema-helpers';

export const contactUsSchema = {
  name: stringValidation('Full Name'),
  email,
  phone: optionalValidation(required('Phone Number')),
  subject: required('Subject'),
  message: stringValidation('Message', 10),
};

export const investorSchema = {
  title: stringValidation('Title'),
  firstName: stringValidation('First Name'),
  middleName: optionalValidation(stringValidation('Middle Name')),
  surname: stringValidation('Surname'),
  residentialAddress: stringValidation('Residential Address'),
  phone: phoneNumber,
  email: email,
  gender: stringValidation('Gender'),
  nationality: stringValidation('Nationality'),
  occupation: stringValidation('Occupation'),
  employmentStatus: stringValidation('Employment Status'),
  employerName: optionalValidation(stringValidation('Employer Name')),
  officeAddress: stringValidation('Office Address'),
  investmentRange: optionalValidation(stringValidation('Investment Range')),
  amountToInvest: stringValidation('Amount to Invest'),
  bankAccountName: stringValidation('Bank Account Name'),
  accountNumber: stringValidation('Account Number'),
  bankName: stringValidation('Bank Name'),
  signature: stringValidation('Signature'),
  confirmation: booleanValidation('Confirmation'),
  declaration: booleanValidation('Declaration'),
};

export const propertyAcquisitionSchema = {
  title: stringValidation('Title'),
  firstName: stringValidation('First Name'),
  surname: stringValidation('Surname'),
  otherNames: optionalValidation(stringValidation('Middle Name')),
  passport: optionalValidation(required('Passport')),
  officeAddress: stringValidation('Office Address'),
  residentialAddress: stringValidation('Residential Address'),
  occupation: stringValidation('Occupation'),
  phone: phoneNumber,
  email: email,
  nextOfKin: optionalValidation(stringValidation('Next of Kin')),
  phoneNOK: optionalValidation(phoneNumber),
  emailNOK: optionalValidation(email),
  residentType: stringValidation('Resident Type'),
  previousHighrachyTransactions: optionalValidation(
    stringValidation('Previous Highrachy Transactions')
  ),
  intendedUseOfProperty: optionalValidation(
    stringValidation('Intended Use of Property')
  ),
  nameOnTitleDocument: stringValidation('Name on Title Document'),
  nameOfAgent: optionalValidation(stringValidation('Name of Agent')),
  telephoneNoAgent: optionalValidation(phoneNumber),
  paymentPlan: stringValidation('Payment Plan'),
  amountImmediatelyAvailableForPayment: positiveNumberValidation(
    'Amount Immediately Available for Payment'
  ),
  nameOfBanker: optionalValidation(stringValidation('Name of Banker')),
  customersSignature: stringValidation('Signature'),
  confirmation: booleanValidation('Confirmation'),
};

export const supportSchema = {
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

export const profileSchema = {
  firstName: stringValidation('First Name'),
  lastName: stringValidation('Last Name'),
  phone: optionalValidation(required('Phone Number')),
};

export const forgotPasswordSchema = {
  email,
};

export const changePasswordSchema = {
  currentPassword: password,
  password,
  confirmPassword,
};
