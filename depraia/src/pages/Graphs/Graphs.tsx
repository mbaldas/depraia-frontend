import "./index.scss";
import Chart from "react-apexcharts";

export default function Graphs() {
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
      <Chart options={options} series={series} type="bar" width="500" />
    </>
  );
}
