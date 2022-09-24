import {
  APPLICANT_STAGE,
  DATA_TYPE,
  FILTER_FIELDS,
  TENANT_STATUS,
} from '@/utils/constants';
import { booleanOptions, valuesToOptions } from '@/utils/helpers';

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
export const filterProjects = {
  name: {},
  type: {},
  lastName: {},
  street1: {},
  city: {},
  state: {},
  // status: {
  //   field: FILTER_FIELDS.SELECT,
  //   values: valuesToOptions(Object.values(TENANT_STATUS)),
  // },
};
