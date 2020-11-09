import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {CssBaseline} from '@material-ui/core'

import ArvoTTF from './assets/fonts/Arvo-Regular.ttf';

const arvo = {
  fontFamily: 'Arvo',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Arvo'),
    local('Arvo-Regular'),
    url(${ArvoTTF}) format('ttf')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

//Declaración del tema de los colores de los botones
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#B3E5FF',
      main: '#5AB9EA', //Color principal-celeste
      dark: '#2380AF',
      contrastText: '#000', //color de la letra
    },
    secondary: {
      light: '#ff7961',
      main: '#CED4DD',//Color principal-gris
      dark: '#808888', 
      contrastText: '#000',//color de la letra
    },
  },
  typography: {
    fontFamily: 'Arvo',
    button: {
      textTransform: 'none'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [arvo],
      },
    },
  },
});


ReactDOM.render(
  <React.StrictMode>
      {/*Proveedor de los temas de los botones que ya puse */}
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <App></App>
        </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
