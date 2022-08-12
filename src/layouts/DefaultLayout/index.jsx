import { Outlet } from "react-router-dom";
import { Menu } from "../../components/Menu";
import { Container } from "./styles";

export function DefaultLayout() {
  return (
    <Container>
      <Menu />
      <Outlet />
    </Container>
  );
}
