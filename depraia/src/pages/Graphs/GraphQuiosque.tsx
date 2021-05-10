import { InputLabel, makeStyles } from "@material-ui/core";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Praia } from "../../model/Praia";
import PraiaService from "../../service/PraiaService";
import MenuGraphs from "./MenuGraphs";
import "../Admin/index.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row"
  },
  item: {
    flexDirection: "column"
  }
}));

const GraphQuiosque: React.FC = () => {
  const [praias, setPraias] = useState<Praia[]>([]);
  const classes = useStyles();

  const graphOptions = {
    options: {
      chart: {
        id: "praia"
      },
      xaxis: {
        categories: praias.map((p) => p.nome)
      }
    },
    series: [
      {
        name: "Quiosques",
        data: praias.map((p) => p.quiosques.length)
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
            <h1 className="font--black">Quiosques por praia</h1>
            <div className={classes.root}>
              <div className={classes.item}>
                <InputLabel>Quantas quiosques tem nas praias?</InputLabel>
                {praias && (
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

export default GraphQuiosque;
