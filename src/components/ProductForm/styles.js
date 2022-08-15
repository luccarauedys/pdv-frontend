import styled from "styled-components";

export const FormContainer = styled.form`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1rem;
`;

export const FormItem = styled.div`
  label {
    margin-bottom: 0.5rem;
  }

  button,
  input {
    width: 100%;
    padding: 1rem;
    font-size: 1.1rem;
  }

  p.error {
    margin-top: 5px;
    font-weight: 500;
    color: #ff1e00;
  }
`;
