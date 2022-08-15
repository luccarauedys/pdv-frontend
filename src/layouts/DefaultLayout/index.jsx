import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Menu } from "../../components/Menu";

export function DefaultLayout() {
  return (
    <Container>
      <Menu />
      <div className="outlet">
        <Outlet />
      </div>
    </Container>
  );
}

export const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;

  div.outlet {
    flex: 1;

    max-width: 1200px;
    margin: 0 auto;
  }
`;
