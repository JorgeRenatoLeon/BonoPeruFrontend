import React from 'react';
import {Redirect, Route} from 'react-router-dom'
import { useSelector } from "react-redux";
import {Container, Grid} from '@material-ui/core';
import BarraInicial from './Barras/BarraInicial'
import BarraFinal from './Barras/BarraFinal'

const RutaProtegida = (props) => {
 
    const { component: Componente, ...propsAux } = props

    const {isLoggedIn} = useSelector(state => state.auth);
  
    return (
      <Route 
        {...propsAux} 
        render={props => (
          isLoggedIn ?
            
          <Grid>
              <BarraInicial/>
                  <Container>
                      <Componente {...props} />
                  </Container>
              <BarraFinal/>
          </Grid> 
          :
          <Redirect to='/acceso' />
        )} 
      />
    )
}

export default RutaProtegida