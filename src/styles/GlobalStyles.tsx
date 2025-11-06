import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Hind', sans-serif;
    background: #101c1cff;
    color: #fff;
    min-height: 100vh;
  }
`;

export default GlobalStyles;