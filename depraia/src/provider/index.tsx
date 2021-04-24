import React from "react";

import UserService from "../service/UserService";
import User from "../model/User";

export const CommonContext = React.createContext({});

interface IStoreUserAction {
  AddUser: (user: User) => void;
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

  const userActions: IStoreUserAction = {
    AddUser: async (user: User) => {
      if (!user) {
        return;
      }
      try {
        console.log(user);
        const newUser = await UserService.createUser(user);
        setUser(newUser);
      } catch (error) {
        throw error;
      }
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
