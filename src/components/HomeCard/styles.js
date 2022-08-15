import styled from "styled-components";

const textColor = "#FFFFFF";
const bgColor = "#222222";
const bgColorHover = "#2127c6";

export const Container = styled.div`
  padding: 2rem;
  border-radius: 1rem;
  background-color: ${bgColor};
  color: ${textColor};
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
    background-color: ${bgColorHover};
  }
`;
