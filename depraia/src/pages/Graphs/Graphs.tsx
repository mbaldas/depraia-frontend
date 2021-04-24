import "./index.scss";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import PraiaService from "../../service/PraiaService";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { Praia } from "../../model/Praia";
import Utils from "../../utils/utils";

export default function Graphs() {
  const [praias, setPraias] = useState<Praia[]>([]);
  const [selectedPraia, setSelectedPraia] = useState<Praia | null>();

  const graphOptions = {
    series: [
      {
        name: "Pessoas",
        data: selectedPraia?.agendas.map((p) => {
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
          selectedPraia?.agendas.map((p) => {
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
    </>
  );
}
