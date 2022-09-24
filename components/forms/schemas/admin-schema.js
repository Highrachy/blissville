import {
  stringValidation,
  optionalValidation,
  required,
  requiredDate,
  arrayValidation,
  multiSelectValidation,
} from './schema-helpers';

export const projectSchema = {
  name: stringValidation('Project Name'),
  type: stringValidation('Project Type'),
  image: optionalValidation(stringValidation('Project Image')),
  description: stringValidation('Project Description'),
  street1: stringValidation('Street 1'),
  street2: optionalValidation(stringValidation('Street 2')),
  city: stringValidation('City'),
  state: stringValidation('State'),
  features: multiSelectValidation('Shell Features'),
  featuresStandard: optionalValidation(arrayValidation('Standard Features')),
  featuresSupreme: optionalValidation(arrayValidation('Supreme Features')),
  paymentPlan: required('Payment Plan'),
  startDate: requiredDate('Start Date'),
  delivery: requiredDate('Delivery'),
};

export const filterSchema = {
  field: stringValidation('Field'),
  value: required('Value'),
};
