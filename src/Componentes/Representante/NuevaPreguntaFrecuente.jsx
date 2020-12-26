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

import PreguntasService from "../../Servicios/preguntasfrecuentes.service";

export default function FormDialog(props) {

    const [open, setOpen] = React.useState(false);
    const [pregunta, setPregunta] = useState("");
    const [respuesta, setRespuesta] = useState("");

    const [preguntaErr, setPreguntaErr] = useState("");
    const [respuestaErr, setRespuestaErr] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setPregunta("");
        setRespuesta("");
        setOpen(false);
    };

    const changePregunta = e => {
        setPregunta(e.target.value);
        setPreguntaErr("");
    };

    const changeRespuesta = e => {
        setRespuesta(e.target.value);
        setRespuestaErr("");
    };

    const validate = () => {
        let isError = false;

        if (pregunta.length < 5) {
            isError = true;
            setPreguntaErr("Ingresar una pregunta válida");
        }

        if (respuesta.length < 1) {
            isError = true;
            setRespuestaErr("Ingresar una respuesta válida");
        }

        return isError;
    };

    const onSubmit = e => {
        e.preventDefault();
        const err = validate();

        if (!err) {
            const preg = {
                pregunta: pregunta,
                respuesta: respuesta,
                estado: "ACT",
                usuariocreacion: JSON.parse(localStorage.getItem("user")).id,
                //usuariocreacion: 1,
            };

            PreguntasService.insertarPregunta(preg).then(response => {
                console.log(response);
                setPregunta("");
                setPreguntaErr("");
                setRespuesta("");
                setRespuestaErr("");
                handleClose();
                props.onActualizar();
            })
                .catch(() => {
                    console.log('Error al insertar pregunta')
                });
        }
    };

    return (
        <div>
            <IconButton aria-label="edit" onClick={handleClickOpen}>
                <AddIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Nueva pregunta</DialogTitle>
                <DialogContent>
                    <div sytle="padding: 15px">
                        <TextField
                            error={preguntaErr === "" ? null : true}
                            autoFocus
                            fullWidth
                            variant="outlined"
                            label="Pregunta"
                            id="name"
                            value={pregunta}
                            onChange={p => changePregunta(p)}
                            helperText={preguntaErr === "" ? null : preguntaErr}
                        />
                    </div>
                    <br />
                    <div sytle="padding: 15px">
                        <TextField
                            error={respuestaErr === "" ? null : true}
                            fullWidth
                            variant="outlined"
                            id="lastname"
                            label="Respuesta"
                            value={respuesta}
                            onChange={r => changeRespuesta(r)}
                            helperText={respuestaErr === "" ? null : respuestaErr}
                        />
                    </div>
                    <br />
                </DialogContent>
                <DialogActions>
                    <Link to='/preguntasfrecuentes' style={{ textDecoration: "none" }}>
                        <Button variant="contained" size="small" color="primary" onClick={e => onSubmit(e)}>
                            Guardar
                </Button>
                    </Link>
                    <Link to='/preguntasfrecuentes' style={{ textDecoration: "none" }}>
                        <Button variant="contained" size="small" color="secondary" onClick={handleClose}>
                            Cancelar
                </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    );
}