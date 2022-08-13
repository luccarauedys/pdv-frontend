import styled from "styled-components";

export function History() {
  return (
    <Container>
      <div>
        <h1>Vendas</h1>
        <p>Vendas: 5</p>
        <p>Total: R$ 860.00</p>
      </div>
      <div>
        <p>Cards</p>
        <p>Cards</p>
        <p>Cards</p>
        <p>Cards</p>
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
`;
