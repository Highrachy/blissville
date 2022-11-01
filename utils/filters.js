import {
  APPLICANT_STAGE,
  DATA_TYPE,
  FILTER_FIELDS,
  INTEREST_STATUS,
  TENANT_STATUS,
} from '@/utils/constants';
import {
  booleanOptions,
  objectToOptions,
  valuesToOptions,
} from '@/utils/helpers';

// export const filterTenants = {
//   tenantFullName: {},
//   firstName: {},
//   lastName: {},
//   personalEmail: {},
//   selfEmployed: {
//     field: FILTER_FIELDS.SELECT,
//     type: DATA_TYPE.BOOLEAN,
//   },
//   ownLastProperty: {
//     field: FILTER_FIELDS.SELECT,
//     type: DATA_TYPE.BOOLEAN,
//   },
//   employmentCompanyName: {
//     label: 'Company Name',
//   },
//   changeEmployerSoon: {
//     field: FILTER_FIELDS.SELECT,
//     type: DATA_TYPE.BOOLEAN,
//   },
//   hasPersonsWithSpecialNeed: {
//     field: FILTER_FIELDS.SELECT,
//     type: DATA_TYPE.BOOLEAN,
//   },
//   status: {
//     field: FILTER_FIELDS.SELECT,
//     values: valuesToOptions(Object.values(TENANT_STATUS)),
//   },
// };

// available: {
//   field: FILTER_FIELDS.SELECT,
//   values: booleanOptions('Open', 'Closed'),
//   label: 'Status',
//   type: DATA_TYPE.BOOLEAN,
// },
export const filterProjects = {
  name: {},
  type: {},
  street1: {},
  city: {},
  state: {},
  featured: {
    type: DATA_TYPE.BOOLEAN,
  },

  // status: {
  //   field: FILTER_FIELDS.SELECT,
  //   values: valuesToOptions(Object.values(TENANT_STATUS)),
  // },
};

export const filterProperties = {
  name: {},
  type: {},
  lastName: {},
  size: {},
  totalUnits: {},
  availableUnits: {},
  baths: {},
  beds: {},
  toilets: {},
  floors: {},
  parkingSpace: {},
  price: { label: 'Shell Price' },
  standardPrice: { label: 'Standard Price' },
  supremePrice: { label: 'Supreme Price' },
  // status: {
  //   field: FILTER_FIELDS.SELECT,
  //   values: valuesToOptions(Object.values(TENANT_STATUS)),
  // },
};

export const filterFeatures = {
  name: {},
  price: {},
};

export const filterInterests = {
  firstName: {},
  lastName: {},
  status: {
    field: FILTER_FIELDS.SELECT,
    values: objectToOptions(INTEREST_STATUS),
  },
};
