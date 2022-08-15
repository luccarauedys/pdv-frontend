import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  h1 {
    margin-bottom: 1rem;
  }
`;

export const HeaderContainer = styled.header`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  h1 {
    flex: 1;
    min-width: 300px;
  }

  div {
    flex: 1;

    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 0.5rem;

    p {
      flex: 1;
      font-size: 1.2rem;
      font-weight: 600;
      text-align: center;
      padding: 0.5rem;
      border-radius: 0.5rem;
      background-color: #2127c6;
      color: #e3e3e3;
    }
  }
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1rem;
`;
