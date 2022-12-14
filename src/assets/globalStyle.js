import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }

  body {
    background-color: #e3e3e3;
    color: #222222;
  }

  body, form, input, textarea, button {
    font-family: "Inter", sans-serif;
    font-size: 1.1rem;
    font-weight: 400;
  }

  label, input {
    display: block;
    width: 100%;
  }

  label {
    font-weight: 500;
  }

  input, button {
    padding: 0.8rem;
    border-radius: 0.2rem;
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 700;
  }

  a {
    display: block;
    font-weight: 500;
    text-decoration: none;
  }

  a, button, svg {
    color: #ffffff;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      filter: contrast(80%);
    }
  }

  button {
    font-weight: 600;
    background-color: #2127c6;

    &[disabled] {
      background-color: #a5a5a5;
      cursor: not-allowed;
    }
  }

  @media (max-width: 800px) {
    h1 {
      font-size: 1.5rem;
    }
    h2 {
      font-size: 1.25rem;
    }
    body, form, input, textarea, button {
      font-size: 1rem;
    }
  }
`;
