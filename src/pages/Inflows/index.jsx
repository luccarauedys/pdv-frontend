import React from "react";
import { Container, Header, DatePickerContainer } from "./styles";
import { getSales } from "../../services/api";
import { TableContainer } from "../../components/ProductsList/styles";
import { BRL } from "../../utils/BRLformatter";
import { formatDate } from "../../utils/dateFormatter";
import { ToastContainer } from "react-toastify";
import { notifyError } from "../../utils/toasts";
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
      <Header>
        <h1>🟢 Entradas</h1>

        <div>
          <p>Vendas: {inflows.length}</p>
          <p>Total: {BRL.format(inflows.reduce((acc, inflow) => acc + inflow.totalPrice, 0))}</p>
        </div>
      </Header>

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

      <TableContainer>
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
      </TableContainer>
      <ToastContainer />
    </Container>
  );
}
