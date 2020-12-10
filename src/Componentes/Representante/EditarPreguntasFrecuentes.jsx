import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import BarraInicial from '../Barras/BarraInicial'
import BarraFinal from '../Barras/BarraFinal'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AppBar, Container, Grid } from "@material-ui/core"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Button } from "@material-ui/core"
import { Link } from "react-router-dom"
import EliminarPregunta from './EliminarPreguntasFrecuentes'

function createData(id, pregunta, respuesta) {
    return { id, pregunta, respuesta };
}

const useStyles = makeStyles({
    root: {
        width: '100%',
        justify: "center",
        position: 'relative',
        overflow: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    inline: {
        display: 'inline',
    },
    textField: {
        width: '25ch',
    },
});

export default function EditarPreguntasFrecuentes(props) {

    const classes = useStyles();
    //const [pregunta, setPregunta] = useState(""); //props.pregunta.pregunta
    //const [respuesta, setRespuesta] = useState(""); //props.pregunta.respuesta

    const [preguntaErr, setPreguntaErr] = useState("");
    const [respuestaErr, setRespuestaErr] = useState("");

    let preguntas = [
        createData(1, '¿Dónde encuentro el lugar de recojo?', 'El lugar de regojo se indica al momento de consultar su bono asignado usando su código de hogar'),
        createData(2, '¿Qué código debo colocar para visualizar si tengo un bono asignado?', 'El código es el código de hogar asignado a su familia'),
        createData(3, '¿En qué horario debo ir a recoger mi bono?', 'Las fechas y rangos de horas asignadas para el recojo se indican luego de consultar si tiene un bono asignado'),
        createData(4, 'Pregunta 4', 'Respuesta 4'),
        createData(5, 'Pregunta 5', 'Respuesta 5'),
    ];

    const handleClose = () => {
        setPreguntaErr("");
        setRespuestaErr("");
    };

    const changePregunta = e => {
        //setPregunta(e.target.value);
    };

    const changeRespuesta = e => {
        //setRespuesta(e.target.value);
    };

    const validate = () => {
        let isError = false;

        /*
        if (pregunta.length < 5) {
            isError = true;
            setPreguntaErr("Ingresar una pregunta válida");
        }

        if (respuesta.length < 1) {
            isError = true;
            setRespuestaErr("Ingresar una respuesta válida");
        }

        return isError;
        */
    };

    const listarPreguntas = () => {
        /*
        PreguntasService.listarPreguntas().then(response => {
            let pregAux = [];
            response.data.map(user => {
                pregAux.push(createData(pregunta.id, pregunta.pregunta, pregunta.respuesta));
            });

            setPreguntas(pregAux);
            console.log(pregAux);
        })
            .catch(() => {
                console.log('Error al listar preguntas')
            });

        */
        //setPreguntas(pregAux);
    }

    const onSubmit = e => {
        e.preventDefault();
        const err = validate();

        if (!err) {
            /*
            const preg = {
                id: props.pregunta.id,
                pregunta: pregunta,
                respuesta: respuesta,
            };

            
            PreguntassService.modificarPregunta(preg).then(response => {
                setPreguntaErr("");
                setRespuestaErr("");
                props.onActualizar();
                handleClose();
            })
                .catch(() => {
                    console.log('Error al editar el usuario')
                });
        }
        */
        }
    }

    useEffect(() => {
        /*
        PreguntasService.listarPreguntas().then(response => {
            let pregAux = [];
            response.data.map(user => {
                pregAux.push(createData(pregunta.id, pregunta.pregunta, pregunta.respuesta));
            });

            setPreguntas(pregAux);
            console.log(pregAux);
        })
            .catch(() => {
                console.log('Error al listar preguntas')
            });

        */
        //setPreguntas(pregAux);
    }, []);

    return (
        <div>
            <BarraInicial />
            <Container>
                <div>
                    <AppBar position="relative" style={{ background: 'transparent', boxShadow: 'none' }}>
                        <Toolbar>
                            <Grid container direction="row" justify="center">
                                <Grid container item xs={10} justify="center">
                                    <Typography variant="h3" gutterBottom justify="center" >
                                        <h1 style={{ color: 'black', margin: 20, justify: "center" }}>Preguntas Frecuentes</h1>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className='Contenedor'>
                    <div className={classes.root}>
                        <Grid item md={12} container>
                            <List className={classes.root}>
                                {preguntas.map((pregunta, index) =>
                                    <ListItem alignItems="flex-start">
                                        <Grid container item md={12} style={{width: 'auto'}}>
                                            <TextField
                                                style={{ padding: "15px" , width: '100%'}}
                                                fullWidth={true}
                                                variant="outlined"
                                                id="pregunta"
                                                //label="Pregunta"
                                                value={pregunta.pregunta}
                                                onChange={p => changePregunta(p)}
                                                errorText={preguntaErr}
                                                className={clsx(classes.textField)}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">{"Pregunta " + (index + 1) + ": "}</InputAdornment>,
                                                }}
                                            />
                                            <TextField
                                                style={{ padding: "15px" , width: '100%'}}
                                                fullWidth={true}
                                                variant="outlined"
                                                id="respuesta"
                                                //label="Respuesta"
                                                type='text'
                                                size="medium"
                                                hintText="Respuesta"
                                                value={pregunta.respuesta}
                                                onChange={r => changeRespuesta(r)}
                                                errorText={respuestaErr}
                                                className={clsx(classes.textField)}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">{"Respuesta " + (index + 1) + ": "}</InputAdornment>,
                                                }}
                                            />
                                            <EliminarPregunta preg={pregunta} onActualizar={listarPreguntas} />
                                        </Grid>
                                        <Divider variant="inset" component="li" />
                                    </ListItem>
                                )}
                            </List>
                        </Grid>
                        <Grid container direction="row" justify="left">
                            <Grid container item xs={12} justify="space-evenly" direction="row" alignItems="center" >
                                <Link to='/preguntasfrecuentes' style={{ textDecoration: "none" }}>
                                    <Button variant="contained" size="small" color="primary" onClick={g => onSubmit(g)}>
                                        Guardar
                                    </Button>
                                </Link>
                                <Link to='/preguntasfrecuentes' style={{ textDecoration: "none" }}>
                                    <Button variant="contained" size="small" color="secondary" onClick={handleClose}>
                                        Cancelar
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Container>
            <BarraFinal />
        </div>
    );
}
