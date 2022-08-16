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

  @media (max-width: 500px) {
    padding: 0;

    h1 {
      margin-top: 2rem;
    }

    p {
      font-size: 1rem !important;
    }
  }
`;

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;

    p {
      font-size: 1.2rem;
      font-weight: 600;
      text-align: center;
      padding: 0.5rem 1rem;
      border-radius: 0.2rem;
      color: #e3e3e3;
      background-color: #06093d;
    }
  }
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1rem;
`;
