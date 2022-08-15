import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    margin-bottom: 1rem;
  }
`;

export const DatePickerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  div,
  input,
  button {
    flex: 1;
  }

  input,
  button {
    height: 40px;
    padding: 0.5rem;
  }

  label {
    margin-bottom: 0.5rem;
  }

  div.button {
    display: flex;
    align-self: flex-end;
  }

  button {
    width: 100%;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  h1 {
    min-width: 300px;
  }

  div {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    p {
      width: 300px;
      padding: 0.5rem;
      font-size: 1.2rem;
      font-weight: 600;
      text-align: center;
      border-radius: 0.2rem;
      background-color: #6fa13a;
      color: #fff;
    }
  }
`;
