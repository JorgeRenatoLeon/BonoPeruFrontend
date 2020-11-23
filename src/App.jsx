//import logo from './logo.svg';
import React from "react";
import PantallaInicial from './Componentes/PantallaInicial'
import RutaProtegida from './Componentes/RutaProtegida'
import AccesoSistema from './Componentes/AccesoSistema'
import { Router, Route, Switch} from "react-router-dom"
//import RespuestaNo from './Componentes/Beneficiario/RespuestaNo'
import BusquedaLugares from './Componentes/Trabajador/BusquedaLugares'
import RespuestaBeneficiario from './Componentes/Beneficiario/RespuestaBeneficiario'
import BarraInicial from './Componentes/Barras/BarraInicial'
import BarraFinal from './Componentes/Barras/BarraFinal'
import {Container} from '@material-ui/core';
// import imagenes from './assets/imagenes.js';
import { history } from "./helpers/history";
import Encuesta from "./Componentes/Encuesta";
import Usuarios from './Componentes/Admin/Usuarios'
import ConsultasBeneficiarios from "./Componentes/Trabajador/ConsultasBeneficiarios";
import Cronograma from "./Componentes/Representante/Cronograma";
import Quejas from "./Componentes/Quejas";
import PruebaC from "./Componentes/Beneficiario/pruebaC";
import Formulario from './Componentes/Admin/Formulario'


const App = () => {

  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={PantallaInicial}/>
          <Route exact path="/usuarios" component={Usuarios}/>
          <Route exact path="/lugares" component={BusquedaLugares}/>
          <Route exact path="/consultasBeneficiarios" component={ConsultasBeneficiarios}/>
          <Route exact path="/cronogramaParaRepresentante" component={Cronograma}/>
          <Route exact path='/quejas' component={Quejas}/>
          <Route path="/acceso" component={AccesoSistema}/>            {/* Pantalla Jorge */}
          <RutaProtegida path="/encuesta" component={Encuesta}/>  {/* Pantalla Jorge */}
          <Route path="/prueba" component={PruebaC}/>            {/* pantalla de Johana para todos :D */}
          <Route exact path="/formulario" component={Formulario}/>
          <Route exact path="/consulta" >
            <BarraInicial/>
            <Container>
              <RespuestaBeneficiario />
            </Container>
            <BarraFinal/>
          </Route>
        </Switch>
      </div>
    </Router>
  );


}

export default App;