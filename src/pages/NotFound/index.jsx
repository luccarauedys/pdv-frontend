import styled from "styled-components";

export function NotFound() {
  return (
    <Container>
      <h1>Página não encontrada</h1>
      <p>Você está tentando acessar uma página que não existe.</p>
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
