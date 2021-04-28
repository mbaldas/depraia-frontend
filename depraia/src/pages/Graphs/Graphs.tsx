import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import PraiaService from "../../service/PraiaService";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, InputLabel, makeStyles } from "@material-ui/core";
import { Praia } from "../../model/Praia";
import NavBar from "../../components/NavBar/NavBar";
import Utils from "../../utils/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row"
  },
  item: {
    flexDirection: "column"
  }
}));

export default function Graphs() {
  const [praias, setPraias] = useState<Praia[]>([]);
  const [selectedPraia, setSelectedPraia] = useState<any>();
  const classes = useStyles();

  const graphOptions = {
    series: [
      {
        name: "Pessoas",
        data: selectedPraia?.agendas.map((p: any) => {
          return p.usuarios.length;
        })
      }
    ],
    options: {
      chart: {
        id: "praia"
      },
      xaxis: {
        categories: [
          selectedPraia?.agendas.map((p: any) => {
            const date = Utils.convertDateToDayAndMonth(p.data);
            return date;
          })
        ]
      }
    }
  };

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
      <div className={classes.root}>
        <div className={classes.item}>
          <InputLabel>Quantas pessoas estiveram nessa praia?</InputLabel>
          <Autocomplete
            id="praia"
            onChange={(e, value) => setSelectedPraia(value)}
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
          {selectedPraia && (
            <Chart
              options={graphOptions.options}
              series={graphOptions.series}
              type="bar"
              width="500"
            />
          )}
        </div>
        <div className={classes.item}>
          <InputLabel>Quantas vagas sobraram nessa praia?</InputLabel>
          <Autocomplete
            id="praia"
            onChange={(e, value) => setSelectedPraia(value)}
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
          {selectedPraia && (
            <Chart
              options={graphOptions.options}
              series={graphOptions.series}
              type="bar"
              width="500"
            />
          )}
        </div>
      </div>
    </>
  );
}
