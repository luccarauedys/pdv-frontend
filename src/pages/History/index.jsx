import React from "react";
import { Container, HeaderContainer, CardsContainer } from "./styles";
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
      <HeaderContainer>
        <h1>Histórico de vendas</h1>

        <div>
          <p>Vendas realizadas: {history.length}</p>
          <p>Total: {BRL.format(calcTotalPriceOfAllSales())}</p>
        </div>
      </HeaderContainer>

      <CardsContainer>
        {history.reverse().map((sale) => {
          return <SaleCard key={sale.id} sale={sale} handleDeleteSale={handleDeleteSale} />;
        })}
      </CardsContainer>

      <ToastContainer />
    </Container>
  );
}
