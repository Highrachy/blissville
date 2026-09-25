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
  features: customSelectValidation('The Canvas Features'),
  standardFeatures: customSelectValidation('The Complete Features'),
  supremeFeatures: customSelectValidation('The Prestige Features'),
  startingPrice: positiveNumberValidation('Starting Price'),
  paymentPlan: required('Payment Plan'),
  startDate: requiredDate('Start Date'),
  delivery: requiredDate('Delivery'),
  status: required('Status'),
  slogan: optionalValidation(required('Slogan')),
  locationMapURL: optionalValidation(stringValidation('Location Map')),
  googleMapLatLng: optionalValidation(stringValidation('Google Map Lat/Lng')),
  brochureURL: optionalValidation(stringValidation('Brochure')),
  videoURL: optionalValidation(stringValidation('Video URL')),
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
  price: positiveNumberValidation('The Canvas Price'),
  standardPrice: optionalValidation(numberValidation('The Complete Price')),
  supremePrice: optionalValidation(numberValidation('The Prestige Price')),
  paymentPlan: optionalValidation(numberValidation('Payment Plan')),
  paymentPlanIncrement: optionalValidation(
    numberValidation('Payment Plan Increment')
  ),
  initialPayment: optionalValidation(
    positiveNumberValidation('Initial Payment Price')
  ),
  standardInitialPayment: optionalValidation(
    numberValidation('The Complete Initial Payment')
  ),
  supremeInitialPayment: optionalValidation(
    numberValidation('The Prestige Initial Payment')
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
