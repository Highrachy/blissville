import {
  generateStatus,
  generateStatusColor,
  mapStatusToName,
} from './helpers';

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

const ALL_USER_ROLES = {
  USER: { id: 0, name: 'user' },
  ADMIN: { id: 10, name: 'admin' },
};
export const USER_ROLES = generateStatus(ALL_USER_ROLES);
export const ROLE_NAME = mapStatusToName(ALL_USER_ROLES);

const ALL_PROJECT_STATUS = {
  IN_VIEW: { id: 0, color: 'warning' },
  STARTED: { id: 1, color: 'dark' },
  IN_PROGRESS: { id: 2, color: 'info' },
  ALMOST_COMPLETED: { id: 3, color: 'primary' },
  COMPLETED: { id: 4, color: 'success' },
  NOT_AVAILABLE: { id: 5, color: 'danger' },
};
export const PROJECT_STATUS = generateStatus(ALL_PROJECT_STATUS);
export const PROJECT_STATUS_COLOR = generateStatusColor(ALL_PROJECT_STATUS);
export const PROJECT_STATUS_NAME = mapStatusToName(ALL_PROJECT_STATUS);

const ALL_INTEREST_STATUS = {
  INTERESTED: { id: 0, color: 'primary' },
  CANCELLED: { id: 1, color: 'danger' },
  ASSIGNED: { id: 2, color: 'success' },
};
export const INTEREST_STATUS = generateStatus(ALL_INTEREST_STATUS);
export const INTEREST_STATUS_COLOR = generateStatusColor(ALL_INTEREST_STATUS);
export const INTEREST_STATUS_NAME = mapStatusToName(ALL_INTEREST_STATUS);

export const ALL_VISITATION_STATUS = {
  SCHEDULED: { id: 0, color: 'dark' },
  RESCHEDULED: { id: 1, color: 'info' },
  CONFIRMED: { id: 2, color: 'primary' },
  VISITED: { id: 3, color: 'success' },
  CANCELLED: { id: 4, color: 'danger' },
};
export const VISITATION_STATUS = generateStatus(ALL_VISITATION_STATUS);
export const VISITATION_STATUS_COLOR = generateStatusColor(
  ALL_VISITATION_STATUS
);
export const VISITATION_STATUS_NAME = mapStatusToName(ALL_VISITATION_STATUS);

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
