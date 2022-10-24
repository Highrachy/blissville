import { statusToName } from './helpers';

export const PHONE_NUMBER = {
  OFFICIAL: '0905 555 5146',
  HREF: 'tel:+2349055555146',
  WITH_COUNTRY_CODE: ' +234 905 555 5146',
};

export const COLOR_STYLE = [
  'none',
  'primary',
  'secondary',
  'success',
  'danger',
  'error',
  'warning',
  'info',
  'light',
  'dark',
  'outline-light',
];

export const FILTER_FIELDS = {
  TEXT: 'text',
  SELECT: 'select',
};

export const USER_ROLES = {
  USER: 0,
  ADMIN: 10,
};
export const ROLE_NAME = statusToName(USER_ROLES);

export const PROJECT_STATUS = {
  IN_VIEW: 0,
  STARTED: 1,
  IN_PROGRESS: 2,
  ALMOST_COMPLETED: 3,
  COMPLETED: 4,
  NOT_AVAILABLE: 5,
};
export const PROJECT_STATUS_NAME = statusToName(PROJECT_STATUS);

export const STATUS = {
  CREATED: 0,
  AVAILABLE: 10,
};
export const STATUS_NAME = statusToName(STATUS);

export const INTEREST_STATUS = {
  INTERESTED: 0,
  CANCELLED: 1,
  ASSIGNED: 2,
};
export const INTEREST_STATUS_NAME = statusToName(INTEREST_STATUS);

export const VISITATION_STATUS = {
  SCHEDULED: 0,
  RESCHEDULED: 1,
  CONFIRMED: 2,
  VISITED: 3,
  CANCELLED: 4,
};
export const VISITATION_STATUS_NAME = statusToName(VISITATION_STATUS);

export const DATA_TYPE = {
  STRING: 'string',
  NUMBER: 'number',
  DATE: 'date',
  BOOLEAN: 'boolean',
};

export const STATES = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT - Abuja',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
];

export const FLOORS = [
  'Ground Floor',
  '1st Floor',
  '2nd Floor',
  '3rd Floor',
  '4th Floor',
  '5th Floor',
  '6th Floor',
  '7th Floor',
];
