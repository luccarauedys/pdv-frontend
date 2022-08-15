import React from "react";
import styled from "styled-components";
import { getExpenses, createExpense, deleteExpense } from "../../services/api";
import { BRL } from "../../utils/BRLformatter";
import { formatDate } from "../../utils/dateFormatter";
import { ToastContainer } from "react-toastify";
import { notifyError, notifySuccess } from "../../utils/toasts";
import { HeaderContainer } from "../History";
import { DatePickerContainer } from "../Inflows";
import { TableContainer } from "../../components/ProductsList/styles";
import { TrashSimple } from "phosphor-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt";
registerLocale("pt", pt);

export function Outflows() {
  const [expenseData, setExpenseData] = React.useState({
    description: "",
    value: "",
    date: new Date(),
  });

  const [expenses, setExpenses] = React.useState([]);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const getAllExpenses = async () => {
    try {
      const response = await getExpenses();
      setExpenses([...response.data]);
    } catch (error) {
      const message =
        error.response.data || "Ocorreu um erro ao tentar buscar as saídas de dinheiro!";
      return notifyError(message);
    }
  };

  const handleFilterByDate = async () => {
    await getAllExpenses();

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    const filtered = expenses.filter((expense) => {
      const date = new Date(expense.date).getTime();
      return date >= start && date <= end;
    });

    setExpenses(filtered);
  };

  const handleClearFilterByDate = async () => {
    setStartDate(new Date());
    setEndDate(new Date());

    await getAllExpenses();
  };

  const handleCreateExpense = async (e) => {
    e.preventDefault();
    try {
      await createExpense(expenseData);
      notifySuccess("Despesa cadastrada com sucesso!");
      getAllExpenses();
    } catch (error) {
      const message =
        error.response.data || "Ops... Ocorreu um erro ao tentar cadastrar a despesa.";
      notifyError(message);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await deleteExpense(expenseId);
      notifySuccess("Saída deletada com sucesso!");
      getAllExpenses();
    } catch (error) {
      const message = error.response.data || "Ocorreu um erro ao tentar deletar essa saída.";
      return notifyError(message);
    }
  };

  React.useEffect(() => {
    getAllExpenses();
  }, []);

  return (
    <Container>
      <HeaderContainer2>
        <h1>Saídas</h1>

        <div>
          <h3>Saídas: {expenses.length}</h3>
          <h3>Total: {BRL.format(expenses.reduce((acc, expense) => acc + expense.value, 0))}</h3>
        </div>
      </HeaderContainer2>

      <div>
        <h2>Cadastro de saídas</h2>
      </div>

      <ExpenseCreationContainer onSubmit={handleCreateExpense}>
        <label>
          Descrição da despesa
          <input
            type="text"
            value={expenseData.description}
            onChange={({ target }) => setExpenseData({ ...expenseData, description: target.value })}
          />
        </label>

        <label>
          Valor
          <input
            type="text"
            value={expenseData.value}
            onChange={({ target }) => setExpenseData({ ...expenseData, value: target.value })}
          />
        </label>

        <label>
          Data
          <DatePicker
            id="date"
            selected={expenseData.date}
            onChange={(date) => setExpenseData({ ...expenseData, date })}
            locale="pt"
            dateFormat="dd/MM/yyyy"
          />
        </label>

        <div className="button">
          <button type="submit">Cadastrar despesa</button>
        </div>
      </ExpenseCreationContainer>

      <div>
        <h2>Listagem de saídas</h2>
      </div>

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
            <th>Descrição da saída</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>{BRL.format(expense.value)}</td>
              <td>{formatDate(expense.date)}</td>
              <td>
                <TrashSimple
                  onClick={() => handleDeleteExpense(expense.id)}
                  size={25}
                  color="#AB1B1E"
                />
              </td>
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

const HeaderContainer2 = styled(HeaderContainer)`
  div {
    h3 {
      background-color: #ab1b1e;
    }
  }
`;

const ExpenseCreationContainer = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;

  input,
  button {
    height: 40px;
    padding: 0.8rem;
    border-radius: 0.2rem;
    margin-top: 0.5rem;
  }

  div.button {
    display: flex;

    button {
      flex: 1;
      align-self: flex-end;
    }
  }
`;

const Table = styled(TableContainer)`
  th {
    background-color: #ab1b1e;
    color: #ffffff;
  }
`;
