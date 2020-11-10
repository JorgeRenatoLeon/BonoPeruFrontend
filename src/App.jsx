//import logo from './logo.svg';
import React from 'react'
import PantallaInicial from './Componentes/PantallaInicial'
import RespuestaNo from './Componentes/Beneficiario/RespuestaNo'
import BarraInicial from './Componentes/Barras/BarraInicial'
import BarraFinal from './Componentes/Barras/BarraFinal'
import { BrowserRouter as Router, Route} from "react-router-dom"
import {Container} from '@material-ui/core';
// import imagenes from './assets/imagenes.js';

function App() {
 
  return (
    // <div className={classes.root}>
    <Router>
      <div className="App">
        {/* Pantalla Beneficiario sin barra superior */}
        <Route exact path="/" component={PantallaInicial}/>
        {/* Pantalla Beneficiario con barra superior e inferior */} 
        <Route path="/home">
          <BarraInicial/>
          <Container>
            <PantallaInicial/>
            {/* <PantallaInicial/>
            <PantallaInicial/> */}
          </Container>
          <BarraFinal/>
        </Route>
        <Route exact path="/consulta" >
          <BarraInicial/>
          <Container>
            <RespuestaNo/>
          </Container>
          <BarraFinal/>
        </Route>
      </div>
    </Router>
  );
}

export default App;
