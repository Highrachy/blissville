import store from 'store2';

const PREFIX = 'blissville';
const TOKEN = `${PREFIX}-token`;
const PERMISSION = `${PREFIX}-permission`;
const MENU = `${PREFIX}-menu-state`;

// Token
export const storeToken = (token) => store(TOKEN, token);
export const getTokenFromStore = (tokenOnly = false) =>
  tokenOnly ? store(TOKEN) : `Bearer ${store(TOKEN)}`;

// Token
export const storePermission = (permission) => store(PERMISSION, permission);
export const getPermissionFromStore = () => store(PERMISSION);

// Menu
export const storeMenuState = (menu) => store(MENU, menu);
export const getMenuStateFromStore = () => store(MENU);

// Clear Storage
export const clearStorage = () => store(false);
