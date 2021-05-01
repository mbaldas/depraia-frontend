import "./index.scss";
import img from "../../assets/porta.svg";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useCommonStore } from "../../hooks";

export default function SignIn() {
  const store = useCommonStore();

  const formik = useFormik({
    initialValues: {
      email: "",
      senha: ""
    },
    onSubmit: (values) => {
      const userLogin = {
        email: values.email,
        senha: values.senha
      };
      store.user.actions.LoginUser(userLogin);
    }
  });

  return (
    <div className="container--signin">
      <div className="left--signin">
        <div className="container--left__signin">
          <p className="font--white">
            Oque está esperando? Vem curtir uma praia, mas com todos os cuidados
          </p>
          <div className="col-lg-6 d-none d-lg-block container--right--image">
            <img src={img} alt="" className="img-fluid" width="400px" />
          </div>
        </div>
      </div>
      <div className="right--signin">
        <div className="container--right__signin">
          <h1 className="font--black">Olá!</h1>
          <p className="font--black">
            Já se cadastrou? Entre agora na nossa plataforma
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <TextField
                id="email"
                name="email"
                label="Email"
                placeholder="Ex. fulano@email.com"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>

            <div className="form-group">
              <TextField
                id="senha"
                name="senha"
                label="Senha"
                type="password"
                autoComplete="current-password"
                value={formik.values.senha}
                onChange={formik.handleChange}
              />
            </div>
            <Button
              variant="contained"
              className="button--signup"
              type="submit"
            >
              <span className="button--text">ENTRE</span>
            </Button>
          </form>
          <p className="font--black" id="solicite">
            Ainda não se cadastrou? Cadastre-se <Link to={"/signup"}>já</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
