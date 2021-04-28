import "../SignIn/index.scss";
import img from "../../assets/cadastro.svg";
import TextField from "@material-ui/core/TextField";
import { Button, Select, MenuItem, InputLabel } from "@material-ui/core";
import { useFormik } from "formik";
import User from "../../model/User";
import Endereco from "../../model/Endereco";
import { useCommonStore } from "../../hooks";

export default function SignUp() {
  const store = useCommonStore();
  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      cpf: "",
      rua: "",
      bairro: "",
      cidade: "",
      cep: "",
      senha: "",
      tipo: 0
    },
    onSubmit: (values) => {
      const endereco = new Endereco(
        values.rua,
        values.bairro,
        values.cidade,
        values.cep
      );
      const user = new User(
        values.cpf,
        values.email,
        values.nome,
        values.senha,
        values.tipo,
        endereco
      );
      store.user.actions.AddUser(user);
    }
  });

  return (
    <div className="container--signup">
      <div className="left">
        <div className="container--left">
          <h1 className="font--black">Olá!</h1>
          <p className="font--black">Cadastre-se agora</p>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <TextField
                id="nome"
                name="nome"
                label="Nome"
                placeholder="Ex. João da Silva"
                onChange={formik.handleChange}
              />
            </div>
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
                id="cpf"
                name="cpf"
                label="CPF"
                placeholder="Ex. 12345678912"
                value={formik.values.cpf}
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-group">
              <TextField
                id="rua"
                name="rua"
                label="Rua"
                placeholder="Ex. Avenida Amaral Peixoto"
                value={formik.values.rua}
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-group">
              <TextField
                id="bairro"
                name="bairro"
                label="Bairro"
                placeholder="Ex. Centro"
                value={formik.values.bairro}
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-group">
              <TextField
                id="cidade"
                name="cidade"
                label="Cidade"
                placeholder="Ex. Niteroi"
                value={formik.values.cidade}
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-group">
              <TextField
                id="cep"
                name="cep"
                label="CEP"
                placeholder="Ex. 123456778"
                value={formik.values.cep}
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
            <div className="form-group">
              <InputLabel>Você é um</InputLabel>
              <Select
                placeholder="Você é um"
                value={formik.values.tipo}
                onChange={formik.handleChange}
                id="tipo"
                name="tipo"
              >
                <MenuItem value={1}>Banhista</MenuItem>
                <MenuItem value={2}>Esportista</MenuItem>
                <MenuItem value={3}>Ambulante</MenuItem>
              </Select>
            </div>
            <Button
              variant="contained"
              className="button--signup"
              type="submit"
            >
              <span className="button--text">CADASTRE-SE</span>
            </Button>
          </form>
        </div>
      </div>
      <div className="right">
        <div className="container--right">
          <p className="font--white">
            Cadastre-se e venha curtir uma praia, mas sem aglomerar
          </p>
          <div className="col-lg-6 d-none d-lg-block container--right--image">
            <img src={img} alt="" className="img-fluid" width="400px" />
          </div>
        </div>
      </div>
    </div>
  );
}
