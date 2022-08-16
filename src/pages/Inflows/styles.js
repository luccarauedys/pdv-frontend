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
  gap: 0.8rem;

  .button {
    flex: 1;
    align-self: flex-end;
  }

  .clearFilterBtn {
    filter: saturate(40%);
  }

  button {
    width: 100%;
  }

  label {
    margin-bottom: 0.5rem;
  }

  @media (max-width: 800px) {
    flex-direction: column;

    .button,
    button {
      width: 100%;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;

  div {
    width: 100%;
    display: flex;
    gap: 0.5rem;

    p {
      color: #fff;
      text-align: center;
      font-weight: 600;
      font-size: 1.2rem;
      padding: 0.5rem 1rem;
      border-radius: 0.2rem;
      background-color: #6fa13a;

      @media (max-width: 800px) {
        font-size: 1rem;
      }
    }
  }
`;
