import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  ChartLine,
  ClockCounterClockwise,
  House,
  List,
  ShoppingBag,
  ShoppingCart,
  SignOut,
  XCircle,
} from "phosphor-react";

export function Menu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {!isOpen && (
        <MenuIcon>
          <List size={35} weight="bold" onClick={() => setIsOpen(!isOpen)} />
        </MenuIcon>
      )}

      {isOpen && (
        <MenuContainer>
          <MenuHeader>
            <h2>MENU</h2>
            <XCircle size={30} onClick={() => setIsOpen(false)} />
          </MenuHeader>

          <MenuBody>
            <MenuItem onClick={() => navigate("/home")}>
              <House size={32} weight="fill" />
              <p>Início</p>
            </MenuItem>

            <MenuItem onClick={() => navigate("/home/products")}>
              <ShoppingCart size={32} weight="fill" />
              <p>Cadastrar produtos</p>
            </MenuItem>

            <MenuItem onClick={() => navigate("/home/sales")}>
              <ShoppingBag size={32} weight="fill" />
              <p>Realizar venda</p>
            </MenuItem>

            <MenuItem onClick={() => navigate("/home/history")}>
              <ClockCounterClockwise size={32} weight="fill" />
              <p>Histórico de vendas</p>
            </MenuItem>

            <MenuItem onClick={() => navigate("/home/cashflow")}>
              <ChartLine size={32} weight="fill" />
              <p>Entradas e saídas</p>
            </MenuItem>
          </MenuBody>

          <MenuFooter onClick={handleLogout}>
            <SignOut size={30} weight="fill" />
            <p>Sair</p>
          </MenuFooter>
        </MenuContainer>
      )}
    </>
  );
}

const MenuIcon = styled.div`
  padding: 1rem;
  background-color: #06283d;
  color: #e3e3e3;
`;

const MenuContainer = styled.div`
  width: 350px;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  background-color: #06283d;
  color: #e3e3e3;

  p {
    font-weight: 500;
  }

  @media (max-width: 800px) {
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const MenuBody = styled.div`
  font-size: 1.2rem;
  padding-top: 1rem;
  border-top: 1px solid #e3e3e350;
`;

const MenuItem = styled.div`
  margin-bottom: 0.8rem;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.5s;

  &:hover {
    color: #06283d;
    background-color: #dff6ff;
    border-radius: 0.25rem;
    transform: scale(110%);
    cursor: pointer;
  }
`;

const MenuFooter = styled.div`
  position: absolute;
  bottom: 2rem;
  cursor: pointer;
`;
