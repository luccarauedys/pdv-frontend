import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    margin-bottom: 0.5rem;
  }

  .table {
    width: 100%;
    overflow-x: auto !important;

    tbody {
      td:last-child {
        text-align: center;
      }

      button {
        width: 100%;
        max-width: 200px;
        padding: 0.5rem;
        background-color: #06093d;
      }
    }
  }

  @media (max-width: 500px) {
    width: 400px;
  }
`;

export const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SearchBar = styled.div`
  display: grid;
  grid-template-columns: minmax(400px, 1fr) repeat(2, minmax(100px, 400px));
  gap: 0.5rem;

  input,
  button {
    padding: 1rem;
  }

  @media (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`;

export const CartContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .product {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: #d6d6d6;
    color: #222;
    border-radius: 0.3rem;
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
  }

  svg {
    color: #222;
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  button {
    width: 100%;
    padding: 1rem;

    &:first-child {
      background-color: #f24636;
    }

    &:last-child {
      background-color: #7cb342;
    }
  }

  div.price {
    span {
      color: #222;
    }
  }

  div.actions {
    width: 100%;
    max-width: 750px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.25rem;

    @media (max-width: 750px) {
      grid-template-columns: 1fr;

      button {
        max-width: 100%;
      }
    }
  }
`;
