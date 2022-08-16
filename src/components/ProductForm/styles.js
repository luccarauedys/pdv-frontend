import styled from "styled-components";

export const FormContainer = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 0.8rem;

  @media (max-width: 800px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.5rem;
  }
`;

export const FormItem = styled.div`
  label {
    margin-bottom: 0.5rem;
  }

  button,
  input {
    width: 100%;
    padding: 0.8rem;
  }

  p.error {
    margin-top: 5px;
    font-weight: 500;
    color: #ff1e00;
  }
`;
