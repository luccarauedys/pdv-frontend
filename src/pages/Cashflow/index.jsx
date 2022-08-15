import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getExpenses, getSales } from "../../services/api";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { BRL } from "../../utils/BRLformatter";

ChartJS.register(ArcElement, Tooltip, Legend);

export function Cashflow() {
  const navigate = useNavigate();

  const [inflows, setInflows] = React.useState();
  const [outflows, setOutflows] = React.useState();
  const [chartData, setChartData] = React.useState({ inflowsTotal: 0, outflowsTotal: 0 });

  const data = {
    labels: ["Entradas", "Saídas"],
    datasets: [
      {
        label: "Quantidade em reais",
        data: [chartData.inflowsTotal, chartData.outflowsTotal],
        backgroundColor: ["#15944e", "#ab1b1e"],
        borderColor: ["#15944e", "#ab1b1e"],
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
      <h1>Entradas e saídas</h1>

      <div className="buttons">
        <Button bgColor="#15944e" onClick={() => navigate("/home/inflows")}>
          Ver entradas
        </Button>
        <Button bgColor="#ab1b1e" onClick={() => navigate("/home/outflows")}>
          Ver saídas
        </Button>
      </div>

      <div className="summary">
        <div className="text">
          <h2>Resumo</h2>
          <p>
            <strong>Total de entradas em reais: </strong>
            {BRL.format(chartData.inflowsTotal)}
          </p>
          <p>
            <strong>Total de saídas em reais:</strong> {BRL.format(chartData.outflowsTotal)}
          </p>
        </div>

        <div className="chart">
          <Pie data={data} />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  padding: 2rem;

  h1 {
    margin-bottom: 1rem;
  }

  div.buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
  }

  div.text {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  div.chart {
    max-width: 600px;
    margin: 2rem auto 0;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 2rem;
  background-color: ${(props) => props.bgColor};
  color: #ffffff;
  font-weight: 500;

  &:hover {
    filter: brightness(80%);
  }
`;
