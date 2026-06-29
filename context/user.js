import {
  clearStorage,
  storePermission,
  storeToken,
} from '@/utils/localStorage';
import { useState, createContext } from 'react';

const defaultUserContext = {
  user: null,
  setUser: () => {},
  loginUser: () => {},
  logoutUser: () => {},
};

export const UserContext = createContext(defaultUserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  async function loginUser(user, jwt = null) {
    setUser(user);
    storePermission(user.permission);
    jwt && storeToken(jwt);
  }

  const logoutUser = async () => {
    clearStorage();
    setUser(null);
  };

  const useract = {
    user: user,
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <UserContext.Provider value={useract}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
