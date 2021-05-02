import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, InputLabel, makeStyles } from "@material-ui/core";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Praia } from "../../model/Praia";
import PraiaService from "../../service/PraiaService";
import Utils from "../../utils/utils";
import MenuGraphs from "./MenuGraphs";
import "../Admin/index.scss";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row"
  },
  item: {
    flexDirection: "column"
  }
}));

const GraphPraia: React.FC = () => {
  const [praias, setPraias] = useState<Praia[]>([]);
  const [selectedPraia, setSelectedPraia] = useState<any>();
  const classes = useStyles();
  const [dateArray, setDateArray] = useState<string[]>([]);

  useEffect(() => {
    selectedPraia?.agendas.map((p: any) => {
      const date = Utils.convertDateToDayAndMonth(p.data);
      dateArray.push(date);
    });
  }, [selectedPraia]);

  const graphOptions = {
    options: {
      chart: {
        id: "praia"
      },
      xaxis: {
        categories: dateArray
      }
    },
    series: [
      {
        name: "Pessoas",
        data: selectedPraia?.agendas.map((p: any) => {
          return p.usuarios.length;
        })
      }
    ]
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
      <div className="container--admin">
        <MenuGraphs />
        <div className="right--admin">
          <div className="container--right__admin">
            <h1 className="font--black">Pessoas por praia</h1>
            <div className={classes.root}>
              <div className={classes.item}>
                <InputLabel>Quantas pessoas estiveram nessa praia?</InputLabel>
                <Autocomplete
                  id="praia"
                  onChange={(e, value) => setSelectedPraia(value)}
                  options={praias}
                  getOptionLabel={(option: any) => option.nome}
                  style={{ width: 300, marginTop: "30px" }}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default GraphPraia;
