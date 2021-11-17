import React, { createContext, useContext, useMemo } from "react";
import { FC, useState } from "react";
import { User } from "./models/User";

interface IUserContext {
  user: User;
  setUser: (user: User) => void;
}

const defaultUser: User = {
  userId: "",
  isCompany: false,
  description: "",
  name: "",
  isActive: false,
};

const defaultUserContext: IUserContext = {
  user: defaultUser,
  setUser: () => {
    throw new Error("there is no provider for doing this");
  },
};

const UserContext = createContext<IUserContext>(defaultUserContext);
export const useUserContext = () => useContext(UserContext);

export const UserContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  // const setNewUser = (newUser: User) => {
  //   !!newUser && setUser(newUser);
  //   console.log(!!newUser);
  //   console.log(user);
  //   console.log("++++");
  //   alert("stop");
  // };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
