import styled from "styled-components";

export function Cashflow() {
  return (
    <Container>
      <h1>Página</h1>
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
