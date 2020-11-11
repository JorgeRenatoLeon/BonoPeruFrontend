//import logo from './logo.svg';
import React from "react";
import PantallaInicial from './Componentes/PantallaInicial'
import RutaProtegida from './Componentes/RutaProtegida'
import AccesoSistema from './Componentes/AccesoSistema'
import { Router, Route, Switch, Link} from "react-router-dom"
// import imagenes from './assets/imagenes.js';


import { history } from "./helpers/history";
import Encuesta from "./Componentes/Encuesta";

const App = () => {

  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={PantallaInicial}/>
          <Route path="/acceso" component={AccesoSistema}/>
          <RutaProtegida path="/encuesta" component={Encuesta}/>
        </Switch>
      </div>
    </Router>
  );


}

export default App;