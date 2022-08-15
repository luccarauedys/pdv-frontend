import { useNavigate } from "react-router-dom";
import { Container } from "./styles";

export function HomeCard({ children, title, page }) {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(`/home/${page}`)}>
      {children}
      <h2>{title}</h2>
    </Container>
  );
}
