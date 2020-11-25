import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {CssBaseline} from '@material-ui/core'
import store from './store'
import { Provider } from 'react-redux';

const font =  "Arvo, sans-serif";

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
    fontFamily: font,
    button: {
      textTransform: 'none'
    },
  },
  radio: {
    '&$checked': {
      color: '#4B8DF8'
    }
  },
  checked: {}
});


ReactDOM.render(
  <React.StrictMode>
      {/*Proveedor de los temas de los botones que ya puse */}
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Provider store={store}>
            <App/>
          </Provider>
        </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
