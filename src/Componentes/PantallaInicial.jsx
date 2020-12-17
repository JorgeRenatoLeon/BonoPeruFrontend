import React from 'react'
import { Grid, AppBar, Toolbar, Typography, Container } from "@material-ui/core"
import { useState, useEffect } from 'react';
import '../assets/css/FondoBeneficiario.css'
import BuscadorPrincipal from '../Componentes/Elementos/BuscadorPrincipal.jsx'
import PreguntasService from "../Servicios/preguntasfrecuentes.service";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

function createData(id, pregunta, respuesta) {
    return { id, pregunta, respuesta };
}

function PantallaInicial(props) {
    const esBeneficiario = true;
    const [preguntas, setPreguntas] = useState([]);

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
            <div className='Fondo'>
                {/* nombre */}
                <AppBar position="relative" style={{ background: 'transparent', boxShadow: 'none' }}>
                    <Toolbar>
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Typography variant="h5" style={{ color: 'white' }} noWrap>
                                BONO PERU
                            </Typography>
                            <Typography variant="h6" style={{ color: 'white' }} noWrap>
                                <a href="#PregFrec">Preguntas frecuentes</a>
                            </Typography>
                        </Grid>
                    </Toolbar>
                </AppBar>
                {/* <h1 style={{color: 'black', margin: 0,padding: 50}}>Consulte su Bono</h1> */}

                {/* Título */}
                <Grid container direction="row" justify="center">
                    <Grid container item xs={12} justify="center">
                        <Typography variant="h1" gutterBottom justify="center" style={{ color: '#EFF0F4', margin: 0, justify: "center", padding: 50, fontWeight: "bold" }} >
                            Consulte su Bono
                        </Typography>
                    </Grid>
                </Grid>
                {/* Barra BuscadorPrincipal */}
                <Grid container direction="row" justify="center">
                    <Grid container item xs={12} justify="center">
                        <BuscadorPrincipal direction={esBeneficiario}></BuscadorPrincipal>
                    </Grid>
                </Grid>
            </div>
            {/* Lista de preguntas frecuentes */}
            <Grid container direction="row" justify="center">
                <Grid container item xs={12} justify="center" id="PregFrec">
                    <Typography variant="h3" gutterBottom justify="center" style={{ color: 'black', margin: 0, justify: "center", padding: 50, fontWeight: "bold" }} >
                        Preguntas Frecuentes
                    </Typography>
                </Grid>
            </Grid>
            <Grid className='Contenedor'>
                <Container style={{ margin: 10 }}>
                    <Grid>
                        <List>
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
                </Container>
            </Grid>
        </div>
    );
}
export default PantallaInicial;
