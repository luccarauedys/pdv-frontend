import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function HomeCard({ children, title, bg, page }) {
  const navigate = useNavigate();

  return (
    <Container cardColor={bg} onClick={() => navigate(`/home/${page}`)}>
      {children}
      <h2>{title}</h2>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${(props) => props.cardColor};
  color: #e3e3e3;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;

  h2 {
    font-size: 1.4rem;
  }

  svg {
    margin-bottom: 0.5rem;
  }

  &:hover {
    filter: brightness(90%);
  }
`;
