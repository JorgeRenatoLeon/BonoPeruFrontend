import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Container, Grid } from "@material-ui/core"
import { Link } from "react-router-dom"
import BarraInicial from '../Barras/BarraInicial'
import BarraFinal from '../Barras/BarraFinal'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AgregarPregunta from './NuevaPreguntaFrecuente'
import PreguntasService from "../../Servicios/preguntasfrecuentes.service";

function createData(id, pregunta, respuesta) {
    return { id, pregunta, respuesta };
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
    root: {
        width: '100%',
        justify: "center",
        //maxWidth: '36ch',
        //maxHeight: 300,
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
});

export default function PreguntasFrecuentes() {

    const classes = useStyles();
    const [openConfirmacion, setOpenConfirmacion] = useState(false);
    const [preguntas, setPreguntas] = useState([]);

    /*
    let preguntas = [
        createData(1, '¿Dónde encuentro el lugar de recojo?', 'El lugar de regojo se indica al momento de consultar su bono asignado usando su código de hogar'),
        createData(2, '¿Qué código debo colocar para visualizar si tengo un bono asignado?', 'El código es el código de hogar asignado a su familia'),
        createData(3, '¿En qué horario debo ir a recoger mi bono?', 'Las fechas y rangos de horas asignadas para el recojo se indican luego de consultar si tiene un bono asignado'),
    ];
    */

    const handleCloseConfirmacion = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenConfirmacion(false);
    };

    const actualizarLista = () => {
        PreguntasService.listarPreguntas().then(response => {
            let pregAux = [];
            response.data.map(pregunta => {
                pregAux.push(createData(pregunta.idpreguntasfrecuentes, pregunta.pregunta, pregunta.respuesta));
            });
            setPreguntas(pregAux);
            //console.log(pregAux);
            //handleOpenConfirmacion();
        })
            .catch(() => {
                console.log('Error al listar preguntas')
            });
    }

    useEffect(() => {
        PreguntasService.listarPreguntas().then(response => {
            let pregAux = [];
            response.data.map(pregunta => {
                pregAux.push(createData(pregunta.idpreguntasfrecuentes, pregunta.pregunta, pregunta.respuesta));
            });
            setPreguntas(pregAux);
            //console.log(pregAux);
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
                <Grid container direction="row" justify="right">
                    <Grid container item xs={12} justify="space-evenly" direction="row" alignItems="right" >
                        <Link to='/editarpreguntasfrecuentes' style={{ textDecoration: "none" }}>
                            <IconButton aria-label="edit">
                                <EditOutlinedIcon />
                            </IconButton>
                        </Link>
                        <AgregarPregunta onActualizar={actualizarLista} />
                    </Grid>
                </Grid>
                <div className='Contenedor'>
                    <div className={classes.root}>
                        <Grid className={classes.paper}>
                            <List className={classes.root}>
                                {preguntas.map((pregunta, index) =>
                                    <ListItem alignItems="flex-start">
                                        <ListItemText
                                            primary={(index + 1) + ". " + pregunta.pregunta}
                                            secondary={
                                                <React.Fragment>
                                                    {pregunta.respuesta}
                                                </React.Fragment>
                                            }
                                        />
                                        <Divider variant="inset" component="li" />
                                    </ListItem>
                                )}
                            </List>
                        </Grid>
                        <Snackbar open={openConfirmacion} autoHideDuration={3000} onClose={handleCloseConfirmacion} anchorOrigin={{ vertical: "top", horizontal: "center" }} key={"topcenter"}>
                            <Alert open={openConfirmacion} onClose={handleCloseConfirmacion} severity="success">
                                Actualización exitosa
                            </Alert>
                        </Snackbar>
                    </div>
                </div>
            </Container>
            <BarraFinal />
        </div>
    );
}
