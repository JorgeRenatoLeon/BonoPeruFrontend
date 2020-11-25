import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

//import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { Button } from "@material-ui/core"
import { Link } from "react-router-dom"

import UsuariosService from "../Servicios/user.service";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function FormDialog(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        //setUsuario("");
        //setApellido("");
        //setNombre("");
        setUsuarioErr("");
        setNombreErr("");
        setApellidoErr("");

        setOpen(false);
    };

    const [nombre, setNombre] = useState(props.usuario.nombre);
    const [apellido, setApellido] = useState(props.usuario.apellido);
    const [usuario, setUsuario] = useState(props.usuario.correo);

    const changeNombre = e => {
        setNombre(e.target.value);
    };

    const changeApellido = e => {
        setApellido(e.target.value);
    };

    const changeUsuario = e => {
        setUsuario(e.target.value);
    };

    const [nombreErr, setNombreErr] = useState("");
    const [apellidoErr, setApellidoErr] = useState("");
    const [usuarioErr, setUsuarioErr] = useState("");

    const validate = () => {
        let isError = false;

        if (nombre.length > 200) {
            isError = true;
            setNombreErr("La longitud del nombre no puede exceder a 200 caracteres");
        }

        if (nombre.length < 2) {
            isError = true;
            setNombreErr("La longitud del nombre debe ser de al menos 2 caracteres");
        }

        if (apellido.length > 200) {
            isError = true;
            setApellidoErr("La longitud del apellido no puede exceder a 200 caracteres");

        }

        if (apellido.length < 2) {
            isError = true;
            setApellidoErr("La longitud del apellido debe ser de al menos 2 caracteres");
        }

        if (usuario.length < 1) {
            isError = true;
            setUsuarioErr("La longitud del usuario debe ser de al menos 1 caracter");
        }

        if (usuario.length > 50) {
            isError = true;
            setUsuarioErr("La longitud del apellido no puede exceder a 50 caracteres");
        }

        return isError;
    };

    const onSubmit = e => {
        e.preventDefault();
        const err = validate();

        if (!err) {
            //onSubmit(state);
            const user = {
                id: props.usuario.id,
                usuario: usuario,
                nombres: nombre,
                apellidos: apellido,
            };

            console.log(user);
            console.log(props.usuario);

            UsuariosService.modificarUsuarios(user).then(response => {
                console.log(response);
            })
                .catch(() => {
                    console.log('Error al editar el usuario')
                });

            //setUsuario("");
            //setApellido("");
            //setNombre("");
            setUsuarioErr("");
            setNombreErr("");
            setApellidoErr("");
            window.location.reload();
            handleClose();
        }
    };

    return (
        <div>
            <IconButton aria-label="edit" onClick={handleClickOpen}>
                <EditOutlinedIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Editar usuario</DialogTitle>
                <DialogContent>
                    <div sytle="padding: 15px">
                        <TextField
                            autoFocus
                            fullWidth
                            variant="outlined"
                            label="Nombres"
                            id="name"
                            hintText="Nombres"
                            value={nombre}
                            onChange={e => changeNombre(e)}
                            errorText={nombreErr}
                        />
                    </div>
                    <br />
                    <div sytle="padding: 15px">
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="lastname"
                            label="Apellidos"
                            hintText="Apellidos"
                            value={apellido}
                            onChange={e => changeApellido(e)}
                            errorText={apellidoErr}
                        />
                    </div>
                    <br />
                    <div sytle="padding: 15px">
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="username"
                            label="Nombre de usuario"
                            hintText="Nombre de usuario"
                            value={usuario}
                            onChange={e => changeUsuario(e)}
                            errorText={usuarioErr}
                        />
                    </div>
                    <br />
                </DialogContent>
                <DialogActions>
                    <Link to='/usuarios' style={{ textDecoration: "none" }}>
                        <Button variant="contained" size="small" color="primary" onClick={e => onSubmit(e)}>
                            Guardar
                </Button>
                    </Link>
                    <Link to='/usuarios' style={{ textDecoration: "none" }}>
                        <Button variant="contained" size="small" color="secondary" onClick={handleClose}>
                            Cancelar
                </Button>
                    </Link>
                </DialogActions>

                {/* <Snackbar open={open} autoHideDuration={300} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }} key={"topcenter"}>
                    <Alert onClose={handleClose} severity="success">
                        Edición exitosa
                    </Alert>
                </Snackbar> */}
            </Dialog>
        </div>
    );
}


