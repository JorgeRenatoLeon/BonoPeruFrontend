//import logo from './logo.svg';
import React from "react";
import PantallaInicial from './Componentes/PantallaInicial'
import RutaProtegida from './Componentes/RutaProtegida'
import AccesoSistema from './Componentes/AccesoSistema'
import { Router, Route, Switch } from "react-router-dom"
import RespuestaBeneficiario from './Componentes/Beneficiario/RespuestaBeneficiario'
import BusquedaLugares from './Componentes/Trabajador/BusquedaLugares'
import BarraInicial from './Componentes/Barras/BarraInicial'
import BarraFinal from './Componentes/Barras/BarraFinal'
import { Container } from '@material-ui/core';
// import imagenes from './assets/imagenes.js';
import { history } from "./helpers/history";
import Encuesta from "./Componentes/Encuesta";
import ConsultasBeneficiarios from "./Componentes/Trabajador/ConsultasBeneficiarios";
import Cronograma from "./Componentes/Representante/Cronograma";
import Quejas from "./Componentes/Quejas";
import PruebaC from "./Componentes/Beneficiario/pruebaC";
import GestionBonos from './Componentes/Representante/GestionBonos'
import Monitoreo from "./Componentes/Representante/Monitoreo";
import Informacion from './Componentes/Beneficiario/Informacion';
import CargaMasiva from "./Componentes/Representante/CargaMasiva";
import PreguntasFrecuentes from "./Componentes/Representante/PreguntasFrecuentes";
import EditarPreguntasFrecuentes from "./Componentes/Representante/EditarPreguntasFrecuentes";
import Usuarios from './Componentes/Admin/Usuarios'
import Formulario from './Componentes/Admin/Formulario'
import OlvidarContrasena from "./Componentes/OlvidarContrasena";
import ReporteQuejas from "./Componentes/Reportes/Quejas";
import ReporteEncuestas from "./Componentes/Reportes/ReporteEncuestasSatisfaccion";

import ReporteIncidentes from "./Componentes/Reportes/Incidentes";
import NoEncontrada from "./Componentes/NoEncontrada";
import Reportes from "./Componentes/Reportes/Reportes";
const App = () => {

  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={PantallaInicial} /> {/* pantalla de Johana */}
          <Route exact path="/usuarios" component={Usuarios} />
          <Route exact path="/lugares" component={BusquedaLugares} />
          <Route exact path="/consultasBeneficiarios" component={ConsultasBeneficiarios} />
          <Route exact path="/cronogramapararepresentante" component={Cronograma} />
          <Route exact path="/informacion" component={Informacion} />
          <Route exact path='/quejas' component={Quejas} />
          <Route exact path='/reporteincidentes' component={ReporteIncidentes} />
          <Route path="/acceso" component={AccesoSistema} />
          <RutaProtegida path="/cambiarcontrasena" component={OlvidarContrasena} />
          <RutaProtegida path="/encuesta" component={Encuesta} />
          <RutaProtegida path="/carga" component={CargaMasiva} />
          <RutaProtegida path="/reportes" component={Reportes} />
          <Route path="/preguntasfrecuentes" component={PreguntasFrecuentes} />
          <Route path="/editarpreguntasfrecuentes" component={EditarPreguntasFrecuentes} />
          <Route path="/reporteencuestas" component={ReporteEncuestas} />
          <Route path="/prueba" component={PruebaC} />            {/* pantalla de Johana para todos :D */}
          <Route exact path="/formulario" component={Formulario} />
          <RutaProtegida path="/bonos" component={GestionBonos}
          />
          <Route exact path="/consulta" >  {/* pantalla de Johana :D */}
            <BarraInicial />
            <Container>
              <RespuestaBeneficiario />
            </Container>
            <BarraFinal />
          </Route>
          <RutaProtegida path="/monitoreo" component={Monitoreo}
          />
          <RutaProtegida path="/reportequejas" component={ReporteQuejas}
          />
          <Route component={NoEncontrada} />
        </Switch>
      </div>
    </Router>
  );


}

export default App;