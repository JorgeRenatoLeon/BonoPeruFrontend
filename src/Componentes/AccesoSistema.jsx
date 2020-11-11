import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from 'react-router-dom'
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import BarraInicial from './Barras/BarraInicial'
import BarraFinal from './Barras/BarraFinal'

import { login } from "../actions/auth";


const AccesoSistema = (props) => {
    
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [usuarioValido, setUsuarioValido] = useState(false);
    const [contrasenaValida, setContrasenaValida] = useState(false);
    
    const {isLoggedIn} = useSelector(state => state.auth);

    const dispatch = useDispatch();


    const loginF = () => {
        dispatch(login(usuario, contrasena))
        .then(() => {
          props.history.push("/");
          window.location.reload();
        })
        .catch(() => {
          console.log('Error Dispatch Login')
        });
    };

    const { from } = props.location.state || {from: {pathname: '/'}};
    
    if (isLoggedIn) {
        return (
            <Redirect to={from}/>
        )
    }

    return ( 
        <Grid>
            <BarraInicial/>
            <Grid container direction="column" style={{minHeight: '88vh'}}>
                {from.pathname!=='/' && <p> You must log in to view the content at {from.pathname} </p>}
                <Grid container justify="center" style={{paddingBottom: '10vh',paddingTop: '10vh'}}>
                    <Typography variant="h2" color="inherit">
                        Inicio de Sesión
                    </Typography>
                </Grid>
                <Grid container direction="row" justify="center">
                    <Grid container direction="row" item md={12} justify="center" style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                        <Grid container item md={1} alignContent="center" justify="center">
                            <Typography variant="subtitle2" color="inherit">
                                Usuario
                            </Typography>
                        </Grid>
                        <Grid container item md={2} justify="center">
                            <TextField
                                value={usuario}
                                onChange={(event) => {setUsuario(event.target.value)}}
                                error={!usuarioValido}
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                helperText={!usuarioValido ? "Incorrect entry.":null}/>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" item md={12} justify="center" style={{paddingBottom: '3vh'}}>
                        <Grid container item md={1} justify="center" alignContent="center">
                            <Typography variant="subtitle2" color="inherit">
                                Contraseña
                            </Typography>
                        </Grid>
                        <Grid container item md={2} justify="center">
                            <TextField
                                value={contrasena}
                                onChange={(event) => {setContrasena(event.target.value)}}
                                error={!contrasenaValida}
                                id="outlined-basic"
                                variant="outlined"
                                type="password"
                                size="small"
                                autoComplete="current-password"/>
                        </Grid>
                    </Grid>
                    <Grid container item md={12} justify="center" style={{paddingBottom: '3vh'}}>
                        <Typography variant="subtitle2" color="inherit">
                            ¿Olvidó su contraseña?
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="center">
                    <Grid container item xs={6} sm={2} justify="center" style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                        <Button variant="contained" size="medium" color="primary" onClick={loginF}>
                            Ingresar
                        </Button>
                    </Grid>
                    <Grid container item xs={6} sm={2} justify="center" style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                        <Link to='/'>
                            <Button variant="contained"  size="medium" color="secondary">
                                Cancelar
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            <BarraFinal/>
        </Grid> 
    );
}
 
export default AccesoSistema;