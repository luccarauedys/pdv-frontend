import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  h1 {
    margin: 0.5rem 0;
  }
`;

export const FormContainer = styled.form`
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  input {
    margin-top: 0.25rem;
    padding: 0.5rem;
  }

  p.error {
    color: red;
    margin-top: 0.25rem;
  }

  button {
    padding: 0.5rem;
    margin: 0.5rem 0;
    &:hover {
      filter: brightness(110%);
    }
  }

  a {
    margin: 0.25rem 0;
    align-self: center;
    color: #222222;
  }
`;
