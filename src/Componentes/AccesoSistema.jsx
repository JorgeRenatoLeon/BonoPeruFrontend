import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from 'react-router-dom'
import { Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import BarraInicial from './Barras/BarraInicial'
import BarraFinal from './Barras/BarraFinal'

import { login } from "../actions/auth";
import { Alert } from '@material-ui/lab';


const AccesoSistema = (props) => {
    
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [usuarioValido, setUsuarioValido] = useState(true);
    const [contrasenaValida, setContrasenaValida] = useState(true);
    
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const {isLoggedIn} = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();


    const loginF = () => {
        setContrasenaValida(true)
        setUsuarioValido(true)
        if(usuario==='' || contrasena === ''){
            setContrasenaValida(contrasena===''?false:true)
            setUsuarioValido(usuario===''?false:true)
        }
        else{
            dispatch(login(usuario, contrasena))
            .then(() => {
                let usuarioRecibido = JSON.parse(localStorage.getItem("user"))
                if(usuarioRecibido.roles.includes("ROLE_ADMIN")) props.history.push("/usuarios");
                else props.history.push("/bonos");
                // window.location.reload();
            })
            .catch(() => {
              console.log('Error en las credenciales')
            });
        }
    };

    const { from } = props.location.state || {from: {pathname: '/'}};
    
    if (isLoggedIn) {
        return (
            <Redirect to={from}/>
        )
    }

    function onKeyPress(event) {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        const regex = /^[a-zA-Z]+$/
        if(!regex.test(keyValue))
            event.preventDefault();
    }

    return ( 
        <Grid>
            <BarraInicial/>
            <Grid container direction="column" style={{minHeight: '88vh'}}>
                {from.pathname!=='/' && <p> You must log in to view the content at {from.pathname} </p>}
                <Grid container direction="row" justify="center">
                    <Grid container item xs={10} justify="center" style={{paddingBottom: '10vh',paddingTop: '10vh'}}>
                        <Typography variant="h2" color="inherit">
                            Inicio de Sesión
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="center">
                    <Grid container direction="row" item md={12} justify="center" style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                        <Grid container item xs={10} md={1} alignContent="center">
                            <Typography variant="subtitle2" color="inherit">
                                Usuario
                            </Typography>
                        </Grid>
                        <Grid container item xs={10} md={2} justify="center">
                            <TextField
                                value={usuario}
                                onChange={(event) => {setUsuario(event.target.value)}}
                                error={message || !usuarioValido}
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                fullWidth={true}
                                helperText={!usuarioValido ? "Completar el campo Usuario":null}
                                onKeyPress={onKeyPress.bind(this)}
                                inputProps={{ maxLength: 50 }}/>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" item md={12} justify="center" style={{paddingBottom: '3vh'}}>
                        <Grid container item xs={10} md={1} alignContent="center">
                            <Typography variant="subtitle2" color="inherit">
                                Contraseña
                            </Typography>
                        </Grid>
                        <Grid container item xs={10} md={2} justify="center">
                            <TextField
                                value={contrasena}
                                onChange={(event) => {setContrasena(event.target.value)}}
                                error={message || !contrasenaValida}
                                id="outlined-basic"
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                size="small"
                                autoComplete="current-password"
                                fullWidth={true}
                                helperText={!contrasenaValida ? "Completar el campo Contraseña":null}
                                inputProps={{maxLength: 20}}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    )
                                }}/>
                        </Grid>
                    </Grid>
                    {message && (
                        <Grid container item md={12} justify="center" style={{paddingBottom: '3vh'}}>
                            <Alert severity="error">{message}</Alert>
                        </Grid>
                    )}
                    {/* <Grid container item md={12} justify="center" style={{paddingBottom: '3vh'}}>
                        <Link to="/recuperarcontrasena">
                            <Typography variant="subtitle2" color="inherit">
                                ¿Olvidó su contraseña?
                            </Typography>
                        </Link>
                    </Grid> */}
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