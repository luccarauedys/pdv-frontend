import styled from "styled-components";

const bgColor = "#222";
const textColor = "#FFF";
const bgColorHover = "#2127c6";

export const MenuIcon = styled.div`
  padding: 1rem;
  background-color: ${bgColor};
  color: ${textColor};
`;

export const MenuContainer = styled.div`
  height: 100vh;
  width: 400px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: ${bgColor};
  color: ${textColor};

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
    z-index: 3;
  }
`;

export const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const MenuBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-top: 1px solid ${textColor};
  padding-top: 1.5rem;
  font-size: 1.2rem;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 0;
  transition: all 0.3s;

  &:hover {
    transform: scale(105%);
    background-color: ${bgColorHover};
    border-radius: 0.5rem;
    padding-left: 0.5rem;
    cursor: pointer;
  }
`;

export const MenuFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  position: absolute;
  bottom: 2rem;
  cursor: pointer;

  p {
    font-weight: 600;
  }
`;
