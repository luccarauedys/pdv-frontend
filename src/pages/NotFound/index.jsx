import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function NotFound() {
  const navigate = useNavigate();
  return (
    <Container>
      <h1>Página não encontrada</h1>
      <p>Você está tentando acessar uma página que não existe.</p>
      <button onClick={() => navigate("/home")}>Voltar para home</button>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  button {
    margin-top: 0.5rem;
    padding: 0.5rem;
  }
`;
