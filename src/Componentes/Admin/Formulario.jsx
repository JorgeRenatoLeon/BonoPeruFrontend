import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { Button } from "@material-ui/core"
import { Link } from "react-router-dom"

import UsuariosService from "../../Servicios/user.service";

export default function FormDialog() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setUsuario("");
        setApellido("");
        setNombre("");
        setUsuarioErr("");
        setNombreErr("");
        setApellidoErr("");

        setOpen(false);
    };

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [usuario, setUsuario] = useState("");

    const changeNombre = e => {
        setNombre(e.target.value);
        setNombreErr("");
    };

    const changeApellido = e => {
        setApellido(e.target.value);
        setApellidoErr("");
    };

    const changeUsuario = e => {
        setUsuario(e.target.value);
        setUsuarioErr("");
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
            const user = {
                username: usuario,
                nombres: nombre,
                apellidos: apellido,
                password: "1234",
            };

            console.log(user);

            UsuariosService.insertarUsuarios(user).then(response => {
                console.log(response);
            })
                .catch(() => {
                    console.log('Error al editar el usuario')
                });

            setUsuario("");
            setApellido("");
            setNombre("");
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
                <AddIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Agregar usuario</DialogTitle>
                <DialogContent>
                    <div sytle="padding: 15px">
                        <TextField
                            error={nombreErr === "" ? null : true}
                            autoFocus
                            fullWidth
                            variant="outlined"
                            label="Nombres"
                            id="name"
                            hintText="Nombres"
                            value={nombre}
                            onChange={e => changeNombre(e)}
                            helperText={nombreErr === "" ? null : nombreErr}
                        />
                    </div>
                    <br />
                    <div sytle="padding: 15px">
                        <TextField
                            error={apellidoErr === "" ? null : true}
                            fullWidth
                            variant="outlined"
                            id="lastname"
                            label="Apellidos"
                            hintText="Apellidos"
                            value={apellido}
                            onChange={e => changeApellido(e)}
                            helperText={apellidoErr === "" ? null : apellidoErr}
                        />
                    </div>
                    <br />
                    <div sytle="padding: 15px">
                        <TextField
                            error={usuarioErr === "" ? null : true}
                            fullWidth
                            variant="outlined"
                            id="username"
                            label="Nombre de usuario"
                            hintText="Nombre de usuario"
                            value={usuario}
                            onChange={e => changeUsuario(e)}
                            helperText={usuarioErr === "" ? null : usuarioErr}
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
            </Dialog>
        </div>
    );
}