import React from "react";

import UserService from "../service/UserService";
import User from "../model/User";
import { useHistory } from "react-router";

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
      setUser(loggedUser);
      history.push("/");
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
