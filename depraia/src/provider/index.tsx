import React from "react";

import UserService from "../service/UserService";
import User from "../model/User";
import { useHistory } from "react-router";
import { useLocalStorage } from "../hooks/localStorage";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

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
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [mensagem, setMensagem] = React.useState("");
  const history = useHistory();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const userActions: IStoreUserAction = {
    AddUser: async (user: User) => {
      if (!user) {
        return;
      }
      try {
        const newUser = await UserService.createUser(user);
        if (newUser.status == 200) {
          setOpen(true);
          setMensagem("Cadastro realizado com sucesso!");
          setStatus("success");
        } else {
          setOpen(true);
          setMensagem("Erro no cadastro, tente novamente!");
          setStatus("error");
        }
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
    <>
      <CommonContext.Provider value={store}>{children}</CommonContext.Provider>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          style={
            status == "success"
              ? { backgroundColor: "green" }
              : { backgroundColor: "red" }
          }
        >
          {mensagem}
        </Alert>
      </Snackbar>
    </>
  );
};
