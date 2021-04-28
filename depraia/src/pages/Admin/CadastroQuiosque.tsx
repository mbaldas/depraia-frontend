import "./index.scss";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import NavBar from "../../components/NavBar/NavBar";
import { Button, makeStyles, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PraiaService from "../../service/PraiaService";
import QuiosqueService from "../../service/QuiosqueService";
import { Praia } from "../../model/Praia";
import NewQuiosque from "../../model/NewQuiosque";
import MenuAdmin from "./MenuAdmin";



export default function CadastroQuiosque() {
  const [praias, setPraias] = useState<Praia[]>([]);
  const [selectedPraia, setSelectedPraia] = useState<Praia | null>();

  const formik = useFormik({
    initialValues: {
      nome: ""
    },
    onSubmit: (values) => {
      console.log(values);
      const quiosque = new NewQuiosque(
        values.nome,
        praias[0]
      );
      QuiosqueService.createQuiosque(quiosque);
    }
  
  });

  useEffect(() => {
    async function fetchPraias() {
      const response = await PraiaService.getAll();
      setPraias(response);
    }
    fetchPraias();
  }, []);


  return (
    <>
      <NavBar />
      <div className="container--admin">
        <MenuAdmin />
          <div className="right--admin">
            <div className="container--right__admin">
              <h1 className="font--black">Cadastro de Quiosque</h1>
              <form onSubmit={formik.handleSubmit}>
              <Autocomplete
                  id="praia"
                  onChange={(e, value) => {
                    formik.setFieldValue("praia", value);
                    setSelectedPraia(value);
                  }}
                  options={praias}
                  getOptionLabel={(option: any) => option.nome}
                  style={{ width: 300 }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      name="praia"
                      label="Selecione sua Praia"
                      variant="outlined"
                    />
                  )}
                />
                <div className="form-group">
                <TextField
                  id="nome"
                  name="nome"
                  label="Nome do quiosque"
                  value={formik.values.nome}
                  onChange={formik.handleChange}
                />
                </div>
              
                <Button
                  variant="contained"
                  className="button--cadastro"
                  type="submit"
                >
                  <span className="button--text">CADASTRAR</span>
                </Button>
              </form>
            </div>
          </div>
      </div>
    </>
  );
}

