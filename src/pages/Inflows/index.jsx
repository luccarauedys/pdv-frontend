import React from "react";
import styled from "styled-components";
import { getSales } from "../../services/api";
import { TableContainer } from "../../components/ProductsList/styles";
import { BRL } from "../../utils/BRLformatter";
import { formatDate } from "../../utils/dateFormatter";
import { ToastContainer } from "react-toastify";
import { notifyError } from "../../utils/toasts";
import { HeaderContainer } from "../History";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt";
registerLocale("pt", pt);

export function Inflows() {
  const [inflows, setInflows] = React.useState([]);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const getInflows = async () => {
    try {
      const response = await getSales();
      setInflows(response.data);
    } catch (error) {
      const message = error.response.data || "Ocorreu um erro ao tentar buscar as entradas!";
      return notifyError(message);
    }
  };

  const handleFilterByDate = async () => {
    await getInflows();

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    const filtered = inflows.filter((inflow) => {
      const date = new Date(inflow.date).getTime();
      return date >= start && date <= end;
    });

    setInflows(filtered);
  };

  const handleClearFilterByDate = async () => {
    setStartDate(new Date());
    setEndDate(new Date());
    await getInflows();
  };

  React.useEffect(() => {
    getInflows();
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <h1>Entradas</h1>

        <div>
          <h3>Vendas: {inflows.length}</h3>
          <h3>Total: {BRL.format(inflows.reduce((acc, inflow) => acc + inflow.totalPrice, 0))}</h3>
        </div>
      </HeaderContainer>

      <DatePickerContainer>
        <div>
          <label htmlFor="startDate">Data inicial</label>
          <DatePicker
            id="startDate"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            locale="pt"
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div>
          <label htmlFor="endDate">Data final</label>
          <DatePicker
            id="endDate"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            locale="pt"
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="button">
          <button onClick={handleFilterByDate}>Filtrar</button>
        </div>

        <div className="button">
          <button onClick={handleClearFilterByDate}>Resetar</button>
        </div>
      </DatePickerContainer>

      <Table>
        <thead>
          <tr>
            <th>Tipo de entrada</th>
            <th>Valor</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {inflows.map((sale) => (
            <tr key={sale.id}>
              <td>Venda</td>
              <td>{BRL.format(sale.totalPrice)}</td>
              <td>{formatDate(sale.date)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
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
`;

export const DatePickerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  div,
  input,
  button {
    flex: 1;
  }

  input,
  button {
    height: 40px;
    padding: 0.5rem;
  }

  label {
    margin-bottom: 0.5rem;
  }

  div.button {
    display: flex;
    align-self: flex-end;
  }

  button {
    width: 100%;
  }
`;

const Table = styled(TableContainer)`
  th {
    background-color: #188348;
    color: #ffffff;
  }
`;
