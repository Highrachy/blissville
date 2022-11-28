import {
  stringValidation,
  optionalValidation,
  required,
  requiredDate,
  customSelectValidation,
  positiveNumberValidation,
  numberValidation,
  numberRange,
} from './schema-helpers';

export const projectSchema = {
  name: stringValidation('Project Name'),
  type: stringValidation('Project Type'),
  image: stringValidation('Project Image'),
  description: stringValidation('Project Description'),
  street1: stringValidation('Street 1'),
  street2: optionalValidation(stringValidation('Street 2')),
  city: stringValidation('City'),
  state: stringValidation('State'),
  features: customSelectValidation('Shell Features'),
  standardFeatures: customSelectValidation('Standard Features'),
  supremeFeatures: customSelectValidation('Supreme Features'),
  startingPrice: positiveNumberValidation('Starting Price'),
  paymentPlan: required('Payment Plan'),
  startDate: requiredDate('Start Date'),
  delivery: requiredDate('Delivery'),
  status: required('Status'),
  slogan: optionalValidation(required('Slogan')),
};

export const propertySchema = {
  name: stringValidation('Project Name'),
  type: stringValidation('Project Type'),
  description: stringValidation('Project Description'),
  image: optionalValidation(stringValidation('Property Image')),
  size: positiveNumberValidation('Size'),
  totalUnits: positiveNumberValidation('Total Units'),
  availableUnits: numberValidation('Available Units'),
  baths: numberValidation('Baths'),
  beds: numberValidation('Beds'),
  toilets: numberValidation('Toilets'),
  floors: customSelectValidation('Floors'),
  parkingSpace: numberValidation('Parking Space'),
  price: positiveNumberValidation('Price'),
  standardPrice: optionalValidation(numberValidation('Standard Price')),
  supremePrice: optionalValidation(numberValidation('Supreme Price')),
  paymentPlan: optionalValidation(numberValidation('Payment Plan')),
  paymentPlanIncrement: optionalValidation(
    numberValidation('Payment Plan Increment')
  ),
  initialPayment: optionalValidation(
    positiveNumberValidation('Initial Payment Price')
  ),
  standardInitialPayment: optionalValidation(
    numberValidation('Standard Initial Payment')
  ),
  supremeInitialPayment: optionalValidation(
    numberValidation('Supreme Initial Payment')
  ),
};

export const featureSchema = {
  name: stringValidation('Feature Name'),
  description: optionalValidation(stringValidation('Feature Description')),
  price: numberValidation('Feature Price'),
};

export const filterSchema = {
  field: stringValidation('Field'),
  value: required('Value'),
};
export const gallerySchema = {
  image: stringValidation('Image'),
  description: optionalValidation(stringValidation('Image Description')),
};
export const neighborhoodSchema = {
  location: stringValidation('Location'),
  category: stringValidation('Category'),
  distance: required('Distance'),
};
export const floorPlanSchema = {
  image: stringValidation('Image'),
  title: stringValidation('Title'),
};

export const faqSchema = {
  question: stringValidation('Question'),
  answer: stringValidation('Answer'),
};
export const referralPercentageSchema = {
  referralPercentage: numberRange('Referral Percentage', 'number', 1, 5),
};
