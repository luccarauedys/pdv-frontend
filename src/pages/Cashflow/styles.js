import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  padding: 2rem;

  h1 {
    margin-bottom: 1rem;
  }

  div.buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;

    button {
      font-weight: 600;
    }
  }

  div.text {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    p {
      font-weight: 500;
    }
  }

  div.chart {
    max-width: 600px;
    margin: 2rem auto 0;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 2rem;
  background-color: ${(props) => props.bgColor};
  color: #ffffff;
  font-weight: 500;

  &:hover {
    filter: brightness(80%);
  }
`;
