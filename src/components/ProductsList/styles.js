import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .table {
    width: 100%;
    overflow-x: auto !important;
  }

  .search-products-form {
    width: 100%;
  }

  @media (max-width: 500px) {
    width: 300px;
  }
`;

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;

  button.clearFilterBtn {
    filter: saturate(40%);
  }

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const TableContainer = styled.table`
  width: 100%;
  text-align: left;
  margin-top: 0.5rem;

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
    padding: 0.8rem;
    border-radius: 0.2rem;
  }

  td.icons {
    display: flex;
    gap: 0.8rem;
  }
`;
