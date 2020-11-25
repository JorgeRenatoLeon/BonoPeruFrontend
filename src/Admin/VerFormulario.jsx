import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Button } from "@material-ui/core"
import { Link } from "react-router-dom"

export default function FormDialog(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        console.log("imprimir", props);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <IconButton aria-label="see" onClick={handleClickOpen}>
                <VisibilityIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Visualizar usuario</DialogTitle>
                <DialogContent>
                    <div sytle="padding: 15px">
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Nombres"
                            id="name"
                            hintText="Nombres"
                            value={props.usuario.nombre}
                            InputProps={{ readOnly: true, }}
                        />
                    </div>
                    <br />
                    <div sytle="padding: 15px">
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Apellidos"
                            id="lastname"
                            hintText="Apellidos"
                            value={props.usuario.apellido}
                            InputProps={{ readOnly: true, }}
                        />
                    </div>
                    <br />
                    <div sytle="padding: 15px">
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Nombre de usuario"
                            id="username"
                            hintText="Nombre de usuario"
                            value={props.usuario.correo}
                            InputProps={{ readOnly: true, }}
                        />
                    </div>
                    <br />
                </DialogContent>
                <DialogActions>
                    <Link to='/usuarios' style={{ textDecoration: "none" }}>
                        <Button variant="contained" size="small" color="primary" onClick={handleClose}>
                            Aceptar
                </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    );
}


