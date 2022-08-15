import React from "react";
import styled from "styled-components";
import { BRL } from "../../utils/BRLformatter";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getExpenses, getSales } from "../../services/api";

ChartJS.register(ArcElement, Tooltip, Legend);

export function Summary() {
  const [inflows, setInflows] = React.useState();
  const [outflows, setOutflows] = React.useState();
  const [chartData, setChartData] = React.useState({ inflowsTotal: 0, outflowsTotal: 0 });

  const data = {
    labels: ["Entradas", "Saídas"],
    datasets: [
      {
        label: "Quantidade em reais",
        data: [chartData.inflowsTotal, chartData.outflowsTotal],
        backgroundColor: ["#4ebb3b", "#d0070b"],
        borderColor: ["#0f3c23", "#500001"],
        borderWidth: 1,
      },
    ],
  };

  const getData = async () => {
    const { data: inflowsData } = await getSales();
    setInflows(inflowsData);

    const { data: outflowsData } = await getExpenses();
    setOutflows(outflowsData);

    const inflowsTotal = inflowsData.reduce((total, inflow) => total + inflow.totalPrice, 0);
    const outflowsTotal = outflowsData.reduce((total, outflow) => total + outflow.value, 0);

    setChartData({ inflowsTotal, outflowsTotal });
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <h1>Resumo</h1>

      <div className="text">
        <h3>Total de entradas em reais: {BRL.format(chartData.inflowsTotal)}</h3>
        <h3>Total de saídas em reais: {BRL.format(chartData.outflowsTotal)}</h3>
      </div>

      <div className="chart">
        <Pie data={data} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    margin-bottom: 1rem;
  }

  .text {
    h3 {
      margin-bottom: 1rem;
    }
  }

  .chart {
    max-width: 600px;
  }
`;
