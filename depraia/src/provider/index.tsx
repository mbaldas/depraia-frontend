import React from "react";

import UserService from "../service/UserService";
import User from "../model/User";
import { useHistory } from "react-router";
import { useLocalStorage } from "../hooks/localStorage";

export const CommonContext = React.createContext({});

interface IStoreUserAction {
  AddUser: (user: User) => void;
  LoginUser: (user: any) => void;
}

export interface IStore {
  user: {
    actions: IStoreUserAction;
    data: {
      user: User | null;
    };
  };
}

export default ({ children }: React.Props<any>) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [actualUser, setActualUser] = useLocalStorage("name", "");
  const history = useHistory();

  const userActions: IStoreUserAction = {
    AddUser: async (user: User) => {
      if (!user) {
        return;
      }
      try {
        const newUser = await UserService.createUser(user);
        history.push("/signin");
      } catch (error) {
        throw error;
      }
    },
    LoginUser: async (user: any) => {
      const loggedUser = await UserService.loginUser(user);
      setActualUser(loggedUser);
      history.push("/home");
    }
  };

  const store: IStore = {
    user: {
      actions: userActions,
      data: {
        user
      }
    }
  };

  return (
    <CommonContext.Provider value={store}>{children}</CommonContext.Provider>
  );
};
