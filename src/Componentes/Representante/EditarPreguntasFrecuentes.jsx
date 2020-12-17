import React, { useState, useEffect } from 'react';
import { AppBar, Container, Grid, Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom"
import clsx from 'clsx';
import BarraInicial from '../Barras/BarraInicial'
import BarraFinal from '../Barras/BarraFinal'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import EliminarPregunta from './EliminarPreguntasFrecuentes'
import PreguntasService from "../../Servicios/preguntasfrecuentes.service";
import { history } from "../../helpers/history";

function createData(id, pregunta, preguntaErr, respuesta, respuestaErr) {
    return { id, pregunta, preguntaErr, respuesta, respuestaErr };
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

export default function EditarPreguntasFrecuentes() {

    const classes = useStyles();
    const [preguntas, setPreguntas] = useState([]);
    const [pregModif, setPregModif] = useState([]);

    /*
    let preguntas = [
        createData(1, '¿Dónde encuentro el lugar de recojo?', 'El lugar de regojo se indica al momento de consultar su bono asignado usando su código de hogar'),
        createData(2, '¿Qué código debo colocar para visualizar si tengo un bono asignado?', 'El código es el código de hogar asignado a su familia'),
        createData(3, '¿En qué horario debo ir a recoger mi bono?', 'Las fechas y rangos de horas asignadas para el recojo se indican luego de consultar si tiene un bono asignado'),
    ];
    */

    const handleClose = () => {
        setPregModif([]);
    };

    //Agregar la pregunta modificada a una lista auxiliar
    const changePregunta = (newp, preg, index) => {
        //Se actualizan las preguntas
        let preguntasAux = [...preguntas]
        preguntasAux[index].pregunta = newp.target.value;
        preguntasAux[index].preguntaErr = "";
        const err = validate(preguntasAux[index]);
        setPreguntas(preguntasAux);

        if (!err) {
            //se actualiza las preguntas modificadas
            let pregModifAux = [...pregModif]
            //Se busca si la misma pregunta ha sido editada antes
            let flag = 0;
            for (let i = 0; i < pregModifAux.length; i++) {
                if (pregModifAux[i].idpreguntasfrecuentes === preguntasAux[index].id) {
                    pregModifAux[i].pregunta = newp.target.value;
                    flag = 1;
                }
            }
            //si no existe la preg se crea una nueva y se agrega a la lista de modificadas
            if (flag === 0) {
                //Se crea una nueva pregunta
                const p = {
                    idpreguntasfrecuentes: preg.id,
                    pregunta: newp.target.value,
                    respuesta: preg.respuesta,
                    usuarioactualizacion: 1,
                    //usuarioactualizacion: JSON.parse(localStorage.getItem("user")).id,
                };
                pregModifAux.push(p);
            }
            setPregModif(pregModifAux);
        }
    };

    //buscar la respuesta editada y actualizarla
    const changeRespuesta = (newr, preg, index) => {
        //Se actualizan las preguntas
        let preguntasAux = [...preguntas]
        preguntasAux[index].respuesta = newr.target.value;
        preguntasAux[index].respuestaErr = "";
        const err = validate(preguntasAux[index]);
        setPreguntas(preguntasAux);

        if (!err) {
            //se actualiza las preguntas modificadas
            let pregModifAux = [...pregModif]
            //Se busca si la misma pregunta ha sido editada antes
            let flag = 0;
            for (let i = 0; i < pregModifAux.length; i++) {
                if (pregModifAux[i].idpreguntasfrecuentes === preguntasAux[index].id) {
                    pregModifAux[i].respuesta = newr.target.value;
                    flag = 1;
                }
            }
            //si no existe la preg se crea una nueva y se agrega a la lista de modificadas
            if (flag === 0) {
                //Se crea una nueva pregunta
                const p = {
                    idpreguntasfrecuentes: preg.id,
                    pregunta: preg.pregunta,
                    respuesta: newr.target.value,
                    usuarioactualizacion: 1,
                    //usuarioactualizacion: JSON.parse(localStorage.getItem("user")).id,
                };
                pregModifAux.push(p);
            }
            setPregModif(pregModifAux);
        }
    };

    const validate = (preg) => {
        let isError = false;
        if (preg.pregunta.length < 5) {
            isError = true;
            preg.preguntaErr = "Ingresar una pregunta válida";
        }

        if (preg.respuesta.length < 1) {
            isError = true;
            preg.respuestaErr = "Ingresar una respuesta válida";
        }
        return isError;
    };

    const listarPreguntas = () => {
        PreguntasService.listarPreguntas().then(response => {
            let pregAux = [];
            response.data.map(pregunta => {
                pregAux.push(createData(pregunta.idpreguntasfrecuentes, pregunta.pregunta, "", pregunta.respuesta, ""));
            });
            console.log(pregAux);
            setPreguntas(pregAux);
        })
            .catch(() => {
                console.log('Error al listar preguntas')
            });
    }

    //aqui le tengo que pasar la lista de todos las preguntas que tuvieron cambios y por cada una ir llamando al servicio
    const onSubmit = () => {
        console.log(pregModif)
        let err = false;
        pregModif.map(p => {
            err = validate(p);
        });

        if (!err) {
            PreguntasService.modificarPreguntas(pregModif).then(response => {
                handleClose();
                history.push('/preguntasfrecuentes');
            })
                .catch(() => {
                    console.log('Error al guardar los cambios de las preguntas')
                });
        }
    }

    useEffect(() => {
        PreguntasService.listarPreguntas().then(response => {
            let pregAux = [];
            response.data.map(pregunta => {
                pregAux.push(createData(pregunta.idpreguntasfrecuentes, pregunta.pregunta, "", pregunta.respuesta, ""));
            });
            setPreguntas(pregAux);
        })
            .catch(() => {
                console.log('Error al listar preguntas')
            });
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
                                {preguntas.map((preg, index) =>
                                    <ListItem alignItems="flex-start">
                                        <Grid container item md={12} style={{ width: 'auto' }}>
                                            <TextField
                                                style={{ padding: "15px", width: '100%' }}
                                                fullWidth={true}
                                                variant="outlined"
                                                id={"pregunta" + preg.id}
                                                value={preg.pregunta}
                                                onChange={newp => changePregunta(newp, preg, index)}
                                                error={preg.preguntaErr === "" ? null : true}
                                                helperText={preg.preguntaErr === "" ? null : preg.preguntaErr}
                                                className={clsx(classes.textField)}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">{"Pregunta " + (index + 1) + ": "}</InputAdornment>,
                                                }}
                                            />
                                            <TextField
                                                style={{ padding: "15px", width: '100%' }}
                                                fullWidth={true}
                                                variant="outlined"
                                                id={"respuesta" + preg.id}
                                                type='text'
                                                size="medium"
                                                hintText="Respuesta"
                                                value={preg.respuesta}
                                                onChange={newr => changeRespuesta(newr, preg, index)}
                                                error={preg.respuestaErr === "" ? null : true}
                                                helperText={preg.respuestaErr === "" ? null : preg.respuestaErr}
                                                className={clsx(classes.textField)}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">{"Respuesta " + (index + 1) + ": "}</InputAdornment>,
                                                }}
                                            />
                                        </Grid>
                                        <ListItemSecondaryAction>
                                            <EliminarPregunta pregunta={preg} onActualizar={listarPreguntas} />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )}
                            </List>
                        </Grid>
                        <Grid container direction="row" justify="left">
                            <Grid container item xs={12} justify="space-evenly" direction="row" alignItems="center" >
                                <Button variant="contained" size="small" color="primary" onClick={onSubmit}>
                                    Guardar
                                </Button>
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
