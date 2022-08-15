import styled from "styled-components";

export const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1rem;

  input,
  button {
    padding: 1rem;
  }

  button {
    &.clearFilterBtn {
      background-color: #256d85;
    }
  }
`;

export const TableContainer = styled.table`
  margin-top: 1rem;
  width: 100%;
  text-align: left;

  th {
    background-color: #222222;
    color: #ffffff;
  }

  td:first-child {
    font-weight: 600;
  }

  tr:nth-child(even) {
    background-color: #d6d6d6;
  }

  th,
  td {
    padding: 1rem;
    border-radius: 0.2rem;
  }

  td.icons {
    display: flex;
    gap: 0.8rem;
  }
`;
