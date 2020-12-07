import { Button, Dialog, DialogActions, DialogTitle, Grid, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import BarraInicial from './Barras/BarraInicial'
import BarraFinal from './Barras/BarraFinal'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import axios from "axios";

const API_URL = "http://localhost:8084/api/";



const OlvidarContrasena = (props) => {
    
    const [isLoading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [usuario, setUsuario] = useState("");
    const [recuperar, setRecuperar] = useState(false);
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
        const regex = /^[a-zA-Z]+$/
        if(!regex.test(keyValue))
            event.preventDefault();
    }

    function cambiarContrasena(){
        axios
        .post(API_URL + "usuarios/contrasena/1", 
        {contrasena: nuevaContrasena})
        .then(response =>{
            console.log("API Cambiar Contrasena: ",response)
            setMensaje('Cambio de Contraseña Exitosa')
            setOpen(true)
        })
        .catch(() => {
            console.log('Error al Cambiar de Contraseña')
            setMensaje('Error al Cambiar de Contraseña')
            setOpen(true)
        });
    }

    return ( 
        <Grid>
            <BarraInicial/>
            <Grid container direction="column" style={{minHeight: '88vh'}}>
                <Grid container justify="center" style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                    <Typography variant="h3" color="inherit">
                        Recuperar Contraseña
                    </Typography>
                </Grid>
                <Grid className='Contenedor'>
                    <Grid container direction="row">
                        <Typography variant="subtitle1" color="inherit">
                            Por favor ingrese su usuario para proceder al cambio de contraseña
                        </Typography>
                    </Grid>
                    <Grid container item xs={10} md={1} alignContent="center">
                        <Typography variant="subtitle2" color="inherit">
                            Usuario
                        </Typography>
                    </Grid>
                    <Grid container item xs={10} md={2} justify="center">
                        <TextField
                            value={usuario}
                            onChange={(event) => {setUsuario(event.target.value)}}
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            fullWidth={true}
                            onKeyPress={onKeyPress.bind(this)}
                            inputProps={{ maxLength: 50 }}/>
                    </Grid>
                
                
                    <Grid container direction="row">
                        <Grid container item xs={6} sm={2} style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                            <Button variant="contained" color="primary" component="span" onClick={(event) => {setRecuperar(true)}}>
                                Recuperar Contraseña
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                {recuperar?
                    <Grid className='Contenedor'>
                        <Grid container item xs={10} md={1} alignContent="center">
                            <Typography variant="subtitle2" color="inherit">
                                Nueva Contraseña
                            </Typography>
                        </Grid>
                        <Grid container item xs={10} md={2} justify="center">
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
                        <Grid container item xs={10} md={1} alignContent="center">
                            <Typography variant="subtitle2" color="inherit">
                                Confirmar Contraseña
                            </Typography>
                        </Grid>
                        <Grid container item xs={10} md={2} justify="center">
                            <TextField
                                value={confirmarContrasena}
                                onChange={(event) => {setConfirmarContrasena(event.target.value)}}
                                error={confirmarContrasena!=='' && confirmarContrasena!==nuevaContrasena}
                                id="outlined-basic"
                                variant="outlined"
                                type={showPasswordC ? "text" : "password"}
                                size="small"
                                autoComplete="current-password"
                                fullWidth={true}
                                helperText={confirmarContrasena!=='' && confirmarContrasena!==nuevaContrasena ? "Las contraseñas no coinciden": null}
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

                        <Grid container direction="row">
                            <Grid container item xs={6} sm={2} style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                                <Button variant="contained" color="primary" component="span" onClick={cambiarContrasena}>
                                    Cambiar Contraseña
                                </Button>
                            </Grid>
                        </Grid>
                    
                    
                    </Grid>
                :
                    null
                }
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
            <BarraFinal/>
        </Grid>
    );
}
 
export default OlvidarContrasena;