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
    min-height: 100vh;
  }

  body {
    background-color: #e3e3e3; 
    color: #222222;
  }

  body, form, input, textarea, button {
    font-family: "Inter", sans-serif;
    font-size: 1rem;
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
    border-radius: 0.2rem;
  }

  h1 {
    font-size: 2rem;
    font-weight: 600;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  a {
    display: block;
    font-weight: 500;
    text-decoration: none;
    color: inherit;
  }

  a, button, svg {
    cursor: pointer;
    
    &:hover {
      opacity: 80%;
    }
  }

  button {
    padding: 0.8rem;
    font-size: 1rem;
    font-weight: 600;
    background-color: #1363DF;
    color: #FFF;
    
    &[disabled] {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;
