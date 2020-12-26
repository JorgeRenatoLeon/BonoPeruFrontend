import { Button, Dialog, DialogActions, DialogTitle, Grid, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Alert } from '@material-ui/lab';

const API_URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/";



const OlvidarContrasena = (props) => {
    
    const [isLoading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [mensaje, setMensaje] = useState('');
    // const [usuario, setUsuario] = useState("");
    // const [usuarioValido, setUsuarioValido] = useState(true);
    const [message, setMessage] = useState(null);
    const [nuevaContrasena, setNuevaContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");
    const [showPasswordN, setShowPasswordN] = useState(false);
    const handleClickShowPassword = () => setShowPasswordN(!showPasswordN);
    const handleMouseDownPassword = () => setShowPasswordN(!showPasswordN);
    const [showPasswordC, setShowPasswordC] = useState(false);
    const handleClickShowPasswordC = () => setShowPasswordC(!showPasswordC);
    const handleMouseDownPasswordC = () => setShowPasswordC(!showPasswordC);
  
    const handleClose = () => {
      setOpen(false);
      if(mensaje==='El cambio de contraseña se ha realizado con exito') props.history.push("/usuarios");
    };



    useEffect(() => {
        setLoading(false)
        setMensaje('Cargo')
    },[]);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    function onKeyPress(event) {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        const regex = /^[a-zA-Z0-9]+$/
        if(!regex.test(keyValue))
            event.preventDefault();
    }

    function cambiarContrasena(){
        // if(usuario!==''){
            // setUsuarioValido(true)
            const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/
            if(nuevaContrasena!=='' && confirmarContrasena===nuevaContrasena && regex.test(nuevaContrasena)){
                axios
                .post(API_URL + "usuarios/contrasena/" + JSON.parse(localStorage.getItem("user")).id, 
                {contrasena: nuevaContrasena})
                .then(response =>{
                    console.log("API Cambiar Contrasena: ",response)
                    setMensaje('El cambio de contraseña se ha realizado con exito')
                    setMessage(null)
                    setOpen(true)
                })
                .catch((response) => {
                    console.log('Error al Cambiar de Contraseña')
                    setMensaje('Error al cambiar de contraseña')
                    setMessage(response)
                    setOpen(true)
                });
            }
            else{
                setMensaje('La contraseña no contiene al menos un número y al menos un caracter')
                setMessage('La contraseña no contiene al menos un número y al menos un caracter')
                setOpen(true)
            }
        // }
        // else{
        //     setUsuarioValido(false)
        // }
    }

    return ( 
        <Grid>
            <Grid container direction="column" style={{minHeight: '88vh'}}>
                <Grid container direction="row" justify="center">
                    <Grid container item xs={10} justify="center" style={{paddingBottom: '10vh',paddingTop: '10vh'}}>
                        <Typography variant="h2" color="inherit">
                            Cambio de contraseña
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="center">
                    {/* <Grid container direction="row" item md={12} justify="center" style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                        <Grid container item xs={10} md={2} alignContent="center">
                            <Typography variant="subtitle2" color="inherit">
                                Usuario
                            </Typography>
                        </Grid>
                        <Grid container item xs={10} md={4} justify="center">
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
                    </Grid> */}
                    <Grid container direction="row" item md={12} justify="center" style={{paddingBottom: '3vh'}}>
                        <Grid container item xs={10} md={2} alignContent="center">
                            <Typography variant="subtitle2" color="inherit">
                                Contraseña Nueva
                            </Typography>
                        </Grid>
                        <Grid container item xs={10} md={4} justify="center">
                            <TextField
                                value={nuevaContrasena}
                                onChange={(event) => {setNuevaContrasena(event.target.value)}}
                                error={confirmarContrasena!=='' && confirmarContrasena!==nuevaContrasena}
                                id="outlined-basic"
                                variant="outlined"
                                type={showPasswordN ? "text" : "password"}
                                size="small"
                                autoComplete="current-password"
                                fullWidth={true}
                                onKeyPress={onKeyPress.bind(this)}
                                inputProps={{maxLength: 20}}
                                InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                    {showPasswordN ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                )
                            }}/>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" item md={12} justify="center" style={{paddingBottom: '3vh'}}>
                        <Grid container item xs={10} md={2} alignContent="center">
                            <Typography variant="subtitle2" color="inherit">
                                Confirmar Contraseña
                            </Typography>
                        </Grid>
                        <Grid container item xs={10} md={4} justify="center">
                            <TextField
                                value={confirmarContrasena}
                                onChange={(event) => {setConfirmarContrasena(event.target.value)}}
                                error={(confirmarContrasena!=='' && confirmarContrasena!==nuevaContrasena)||(nuevaContrasena!==''&&confirmarContrasena==='')}
                                id="outlined-basic"
                                variant="outlined"
                                type={showPasswordC ? "text" : "password"}
                                size="small"
                                autoComplete="current-password"
                                fullWidth={true}
                                onKeyPress={onKeyPress.bind(this)}
                                helperText={confirmarContrasena!=='' && confirmarContrasena!==nuevaContrasena ? "Las contraseñas no coinciden": confirmarContrasena===''?"Debe completar este campo":null }
                                inputProps={{maxLength: 20}}
                                InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPasswordC}
                                    onMouseDown={handleMouseDownPasswordC}
                                    >
                                    {showPasswordC ? <Visibility /> : <VisibilityOff />}
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
                </Grid>
                <Grid container direction="row" justify="center">
                    <Grid container item xs={6} sm={2} justify="center" style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                        <Button variant="contained" size="medium" color="primary" onClick={cambiarContrasena}>
                            Cambiar Contraseña
                        </Button>
                    </Grid>
                    <Grid container item xs={6} sm={2} justify="center" style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                        {JSON.parse(localStorage.getItem("user")).roles.includes("ROLE_ADMIN")?
                        <Link to='/usuarios'>
                            <Button variant="contained"  size="medium" color="secondary">
                                Cancelar
                            </Button>
                        </Link>
                            :
                        <Link to='/bonos'>
                            <Button variant="contained"  size="medium" color="secondary">
                                Cancelar
                            </Button>
                        </Link>
                        }
                    </Grid>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{mensaje}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
 
export default OlvidarContrasena;