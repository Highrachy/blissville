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
export const ROLE_NAME = {
  [USER_ROLES['USER']]: 'user',
  [USER_ROLES['ADMIN']]: 'admin',
};

export const PROJECT_STATUS = {
  IN_VIEW: 0,
  STARTED: 1,
  IN_PROGRESS: 2,
  ALMOST_COMPLETED: 3,
  COMPLETED: 4,
  NOT_AVAILABLE: 5,
};
export const PROJECT_STATUS_NAME = {
  [PROJECT_STATUS['IN_VIEW']]: 'In View',
  [PROJECT_STATUS['STARTED']]: 'Started',
  [PROJECT_STATUS['IN_PROGRESS']]: 'In Progress',
  [PROJECT_STATUS['ALMOST_COMPLETED']]: 'Almost Completed',
  [PROJECT_STATUS['COMPLETED']]: 'Completed',
  [PROJECT_STATUS['NOT_AVAILABLE']]: 'Not Available',
};

export const STATUS = {
  CREATED: 0,
  AVAILABLE: 10,
};
export const STATUS_NAME = {
  [STATUS['CREATED']]: 'Created',
  [STATUS['AVAILABLE']]: 'Available',
};

export const INTEREST_STATUS = {
  INTERESTED: 0,
  CANCELLED: 1,
  ASSIGNED: 2,
};
export const INTEREST_STATUS_NAME = {
  [INTEREST_STATUS['INTERESTED']]: 'Interested',
  [INTEREST_STATUS['CANCELLED']]: 'Cancelled',
  [INTEREST_STATUS['ASSIGNED']]: 'Assigned',
};

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
