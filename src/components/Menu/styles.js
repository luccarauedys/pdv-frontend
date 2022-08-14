import styled from "styled-components";

export const MenuIcon = styled.div`
  padding: 1rem;
  background-color: #06283d;
  color: #e3e3e3;
`;

export const MenuContainer = styled.div`
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

export const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const MenuBody = styled.div`
  font-size: 1.2rem;
  padding-top: 1rem;
  border-top: 1px solid #e3e3e350;
`;

export const MenuItem = styled.div`
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

export const MenuFooter = styled.div`
  position: absolute;
  bottom: 2rem;
  cursor: pointer;
`;
