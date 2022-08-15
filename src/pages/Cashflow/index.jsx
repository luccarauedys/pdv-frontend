import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function Cashflow() {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Entradas e saídas</h1>
      <div>
        <Button bgColor="#15944e" onClick={() => navigate("/home/inflows")}>
          Entradas
        </Button>
        <Button bgColor="#ab1b1e" onClick={() => navigate("/home/outflows")}>
          Saídas
        </Button>
        <Button bgColor="#333333" onClick={() => navigate("/home/summary")}>
          Resumo
        </Button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  padding: 2rem;

  h1 {
    margin-bottom: 1rem;
  }

  div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;

const Button = styled.button`
  width: 100%;
  max-width: 300px;
  padding: 1rem;
  border-radius: 2rem;
  background-color: ${(props) => props.bgColor};
  color: #ffffff;
  font-weight: 500;

  &:hover {
    filter: brightness(80%);
  }
`;
