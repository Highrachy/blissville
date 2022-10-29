import store from 'store2';

const PREFIX = 'blissville';
const TOKEN = `${PREFIX}-token`;
const PERMISSION = `${PREFIX}-permission`;
const REFERRAL = `${PREFIX}-referral`;
const MENU = `${PREFIX}-menu-state`;

// Token
export const storeToken = (token) => store(TOKEN, token);
export const getTokenFromStore = (tokenOnly = false) =>
  tokenOnly ? store(TOKEN) : `Bearer ${store(TOKEN)}`;

// Role Permission
export const storePermission = (permission) => store(PERMISSION, permission);
export const getPermissionFromStore = () => store(PERMISSION);

// Referal
export const storeReferral = (role) => store(REFERRAL, role);
export const getReferralFromStore = () => store(REFERRAL);

// Menu
export const storeMenuState = (menu) => store(MENU, menu);
export const getMenuStateFromStore = () => store(MENU);

// Clear Storage
export const clearStorage = () => store(false);
