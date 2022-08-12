import styled from "styled-components";
import { ChartLine, ClockCounterClockwise, ShoppingBag, ShoppingCart } from "phosphor-react";
import { HomeCard } from "../../components/HomeCard";

export function Home() {
  return (
    <Container>
      <h1>Início</h1>
      <CardsContainer>
        <HomeCard title="Cadastrar produtos" bg="#395B64" page="products">
          <ShoppingCart size={35} />
        </HomeCard>

        <HomeCard title="Realizar venda" bg="#516162" page="sales">
          <ShoppingBag size={35} />
        </HomeCard>

        <HomeCard title="Histórico de vendas" bg="#25344a" page="history">
          <ClockCounterClockwise size={35} />
        </HomeCard>

        <HomeCard title="Entradas e saídas" bg="#4f5a6b" page="cashflow">
          <ChartLine size={35} />
        </HomeCard>
      </CardsContainer>
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  padding: 2rem;

  h1 {
    margin-bottom: 1rem;
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;
