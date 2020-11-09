import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
 import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
 //Declaración del tema de los colores de los botones
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
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
});


ReactDOM.render(
  <React.StrictMode>
      {/*Proveedor de los temas de los botones que ya puse */}
        <ThemeProvider theme={theme}>
           <App></App>
        </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
