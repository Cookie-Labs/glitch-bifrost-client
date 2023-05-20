import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';
import * as colors from '@styles/colors';

const combineStrings = (args, ...keys) => {
  return args.reduce((initialValue, currentValue, currentIndex) => {
    return `${initialValue}${keys[currentIndex - 1]}${currentValue}`;
  });
};

export const sm = (args, ...keys) => {
  return css`
    @media screen and (max-width: 600px) {
      ${combineStrings(args, ...keys)}
    }
  `;
};

export const lg = (args, ...keys) => {
  return css`
    @media screen and (max-width: 1024px) {
      ${combineStrings(args, ...keys)}
    }
  `;
};

const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body, div, button, input, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, menu, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, main, menu, nav, output, ruby, section, summary, time, mark, audio, video { 
    font-family: 'Spoqa Han Sans Neo', 'Spoqa Han Sans JP', sans-serif, -apple-system, BlinkMacSystemFont, system-ui, Roboto;
    font-weight: 400;
  }

  html{
    ${lg`
      font-size: 12px;
    `}

    ${sm`
      font-size: 9px;
    `}
  }

  body {
    background-color: ${colors.bgPrimary};    
    color: ${colors.textPrimary};
  }

  button {
    border: none;
    padding: 0;
    color: ${colors.textPrimary};
    text-align: center;
    background-color: transparent;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
