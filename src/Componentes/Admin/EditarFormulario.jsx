import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Button } from "@material-ui/core"
import { Link } from "react-router-dom"
import UsuariosService from "../../Servicios/user.service";


export default function FormDialog(props) {

    const [open, setOpen] = useState(false);
    const [nombre, setNombre] = useState(props.usuario.nombre);
    const [apellido, setApellido] = useState(props.usuario.apellido);
    const [usuario, setUsuario] = useState(props.usuario.usuario);
    const [correo, setCorreo] = useState(props.usuario.correo);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setUsuarioErr("");
        setNombreErr("");
        setApellidoErr("");
        setOpen(false);
    };

    const changeNombre = e => {
        setNombre(e.target.value);
    };

    const changeApellido = e => {
        setApellido(e.target.value);
    };

    const changeUsuario = e => {
        setUsuario(e.target.value);
        console.log(e.target.value);
    };

    const changeCorreo = e => {
        setCorreo(e.target.value);
        console.log(e.target.value);
    };

    const [nombreErr, setNombreErr] = useState("");
    const [apellidoErr, setApellidoErr] = useState("");
    const [usuarioErr, setUsuarioErr] = useState("");
    const [correoErr, setCorreoErr] = useState("");

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

        if (correo.indexOf("@") === -1) {
            isError = true;
            setCorreoErr("Es necesario un correo válido");
        }

        return isError;
    };

    const onSubmit = e => {
        e.preventDefault();
        const err = validate();

        if (!err) {
            const user = {
                id: props.usuario.id,
                username: usuario,
                nombres: nombre,
                apellidos: apellido,
                correo: correo,
                usuarioactualizacion: JSON.parse(localStorage.getItem("user")).id,
            };

            console.log("user modificado", user);
            console.log("usuario anterior", props.usuario);

            UsuariosService.modificarUsuarios(user).then(response => {
                props.onActualizar();
                setUsuarioErr("");
                setNombreErr("");
                setApellidoErr("");
                setCorreoErr("");
                handleClose();
                console.log(response.data);
            })
                .catch(() => {
                    console.log('Error al editar el usuario')
                });
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
                            value={nombre}
                            onChange={e => changeNombre(e)}
                            error={nombreErr === "" ? null : true}
                            helperText={nombreErr === "" ? null : nombreErr}
                        />
                    </div>
                    <br />
                    <div sytle="padding: 15px">
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="lastname"
                            label="Apellidos"
                            value={apellido}
                            onChange={e => changeApellido(e)}
                            error={apellidoErr === "" ? null : true}
                            helperText={apellidoErr === "" ? null : apellidoErr}
                        />
                    </div>
                    <br />
                    <div sytle="padding: 15px">
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="username"
                            label="Nombre de usuario"
                            value={usuario}
                            onChange={e => changeUsuario(e)}
                            error={usuarioErr === "" ? null : true}
                            helperText={usuarioErr === "" ? null : usuarioErr}
                        />
                    </div>
                    <br />
                    <div sytle="padding: 15px">
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="email"
                            label="Correo"
                            value={correo}
                            onChange={e => changeCorreo(e)}
                            error={correoErr === "" ? null : true}
                            helperText={correoErr === "" ? null : correoErr}
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


