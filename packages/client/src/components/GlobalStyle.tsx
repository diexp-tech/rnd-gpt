import { GlobalStyleProps } from '@/types/styles';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  html,
  body,
  #root {
    height: 100%;
    overflow-x: hidden;
  }

  body {
    background: ${(props) => props.theme.palette.background.default};
    margin: 0;
  }

  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
`;

export default GlobalStyle;
