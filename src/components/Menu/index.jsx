import React from "react";
import { useNavigate } from "react-router-dom";
import { MenuBody, MenuContainer, MenuFooter, MenuHeader, MenuIcon, MenuItem } from "./styles";
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
        <MenuIcon className="menu-icon">
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
