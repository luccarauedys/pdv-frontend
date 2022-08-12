import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [isOpen, setIsOpen] = React.useState(true);
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
            <h1>MENU</h1>
            <XCircle size={30} onClick={() => setIsOpen(false)} />
          </MenuHeader>

          <MenuBody>
            <MenuItem>
              <House size={32} weight="fill" />
              <Link to="">Início</Link>
            </MenuItem>
            <MenuItem>
              <ShoppingCart size={32} weight="fill" />
              <Link to="">Cadastrar produtos</Link>
            </MenuItem>
            <MenuItem>
              <ShoppingBag size={32} weight="fill" />
              <Link to="">Realizar venda</Link>
            </MenuItem>
            <MenuItem>
              <ClockCounterClockwise size={32} weight="fill" />
              <Link to="">Histórico de vendas</Link>
            </MenuItem>
            <MenuItem>
              <ChartLine size={32} weight="fill" />
              <Link to="">Entradas e saídas</Link>
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
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
  padding: 2rem;
  background-color: #06283d;
  color: #e3e3e3;
  h1 {
    font-weight: 700;
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
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const MenuFooter = styled.div`
  position: absolute;
  bottom: 2rem;
  cursor: pointer;
  p {
    font-weight: 600;
  }
`;
