import "./index.scss";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import PraiaService from "../../service/PraiaService";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { Praia } from "../../model/Praia";

export default function Graphs() {
  const [praias, setPraias] = useState<Praia[]>([]);
  const [selectedPraia, setSelectedPraia] = useState<Praia | null>();

  useEffect(() => {
    async function fetchPraias() {
      const response = await PraiaService.getAll();
      setPraias(response);
    }
    fetchPraias();
  }, []);

  const series = [
    {
      name: "Pessoas na praia",
      data: [1, 3, 4, 2, 8, 12, 12, 1]
    }
  ];

  const options = {
    chart: {
      id: "praia"
    },
    xaxis: {
      categories: [
        "20/03",
        "20/03",
        "20/03",
        "20/03",
        "20/03",
        "20/03",
        "20/03",
        "20/03",
        "20/03"
      ]
    }
  };

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
      <Chart options={options} series={series} type="bar" width="500" />
    </>
  );
}
