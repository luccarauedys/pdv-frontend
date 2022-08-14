import React from "react";
import styled from "styled-components";
import { deleteSale, getSales } from "../../services/api";
import { BRL } from "../../utils/BRLformatter";
import { ToastContainer } from "react-toastify";
import { notifyError, notifySuccess } from "../../utils/toasts";
import { SaleCard } from "../../components/SaleCard";

export function History() {
  const [history, setHistory] = React.useState([]);

  const getHistory = async () => {
    try {
      const response = await getSales();

      const sales = response.data.map((sale) => {
        const { products } = sale;
        return { ...sale, products: JSON.parse(products) };
      });

      setHistory(sales);
    } catch (error) {
      notifyError("Ocorreu um erro ao obter o histórico de vendas!");
    }
  };

  const handleDeleteSale = async (saleId) => {
    try {
      await deleteSale(saleId);
      getHistory();
      notifySuccess("Venda deletada com sucesso!");
    } catch (error) {
      notifyError("Ocorreu um erro. Não foi possível deletar a venda!");
    }
  };

  const calcTotalPriceOfAllSales = () => {
    return history.reduce((total, sale) => {
      return total + sale.totalPrice;
    }, 0);
  };

  React.useEffect(() => {
    getHistory();
  }, []);

  return (
    <Container>
      <header>
        <h1>Histórico de vendas</h1>

        <div>
          <h3>Vendas realizadas: {history.length}</h3>
          <h3>Total: {BRL.format(calcTotalPriceOfAllSales())}</h3>
        </div>
      </header>

      <CardsContainer>
        {history.map((sale) => {
          return <SaleCard key={sale.id} sale={sale} handleDeleteSale={handleDeleteSale} />;
        })}
      </CardsContainer>

      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  h1 {
    margin-bottom: 1rem;
  }

  header {
    div {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      h3 {
        font-weight: 500;
      }
    }
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1rem;
`;
