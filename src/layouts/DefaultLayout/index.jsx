import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Menu } from "../../components/Menu";

export function DefaultLayout() {
  return (
    <Container>
      <Menu />
      <Outlet />
    </Container>
  );
}

export const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
`;
