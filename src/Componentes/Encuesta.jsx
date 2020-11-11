import { Button, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@material-ui/core';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Encuesta extends Component {
    constructor(props){
        super(props)

        this.state = {
            preguntasHard: [{id: 0,pregunta:'¿Pudo recoger su bono asignado?',respuesta: "No"},{id:1, pregunta:'¿Recogió su bono en el lugar y hora indicado en su cronograma?',respuesta: "No"}],
            opcion: {
                nombre: 'Agencia ABC- Turno Mañana',
                preguntas:[
                    {id: 0, pregunta:'¿Cómo calificaría la atención en el lugar de entrega?',respuesta: 1},
                    {id: 1, pregunta:'¿Cómo calificaría la flexibilidad del horario?',respuesta: 1}
                ]
            },
            opcionSel: 1
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleChangeOpcion = this.handleChangeOpcion.bind(this)
        this.enviarEncuesta = this.enviarEncuesta.bind(this)
    }

    handleChange(index,valor){
        let preguntasAux = [...this.state.preguntasHard]
        preguntasAux[index].respuesta = valor
        this.setState({preguntasHard: preguntasAux})
    }

    handleChangeOpcion(index,valor){
        let opcionAux = {...this.state.opcion}
        opcionAux.preguntas[index].respuesta = valor
        this.setState({opcion: opcionAux})
    }

    enviarEncuesta(){
        return;
    }

    render(){

        const componentesPreguntas = this.state.preguntasHard.map((pregunta,index) => 
            <Grid key={pregunta.id} container direction="row" justify="center">
                <Grid container direction="row" item md={12} style={{paddingTop: '1.5vh'}}>
                    <Typography variant="subtitle1" color="inherit">
                        {(index+1)+'. '+pregunta.pregunta} 
                    </Typography>
                </Grid>
                <Grid container direction="row" item md={12} style={{paddingBottom: '1.5vh'}}>
                    <RadioGroup row variant="subtitle1" value={pregunta.respuesta} color="inherit">
                        <FormControlLabel value="Si" control={<Radio />} label="Si" onClick={() => this.handleChange(pregunta.id,"Si")}/>
                        <FormControlLabel value="No" control={<Radio />} label="No" onClick={() => this.handleChange(pregunta.id,"No")}/>
                    </RadioGroup>
                </Grid>
            </Grid>
        )

        const componentesPreguntasOpcion = this.state.opcion.preguntas.map((pregunta,index) => 
            <Grid key={pregunta.id} container direction="row" justify="center">
                <Grid container direction="row" item md={12} style={{paddingTop: '1.5vh'}}>
                    <Typography variant="subtitle1" color="inherit">
                        {(index+1)+'. '+pregunta.pregunta} 
                    </Typography>
                </Grid>
                <Grid container direction="row" item md={12} style={{paddingBottom: '1.5vh'}}>
                    <RadioGroup row variant="subtitle1" value={pregunta.respuesta} color="inherit">
                        <FormControlLabel value={1} control={<Radio />} label="1" onClick={() => this.handleChangeOpcion(pregunta.id,1)}/>
                        <FormControlLabel value={2} control={<Radio />} label="2" onClick={() => this.handleChangeOpcion(pregunta.id,2)}/>
                        <FormControlLabel value={3} control={<Radio />} label="3" onClick={() => this.handleChangeOpcion(pregunta.id,3)}/>
                        <FormControlLabel value={4} control={<Radio />} label="4" onClick={() => this.handleChangeOpcion(pregunta.id,4)}/>
                        <FormControlLabel value={5} control={<Radio />} label="5" onClick={() => this.handleChangeOpcion(pregunta.id,5)}/>
                    </RadioGroup>
                </Grid>
            </Grid>
        )

        return ( 
            <Grid>
                <Grid container direction="column" style={{minHeight: '88vh'}}>
                    <Grid container justify="center" style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                        <Typography variant="h3" color="inherit">
                            Encuesta de Satisfacción
                        </Typography>
                    </Grid>
                    <Grid container direction="row">
                        <Typography variant="subtitle1" color="inherit">
                            Nos interesa su satisfacción , por eso le pedimos constestar las siguientes preguntas 
                        </Typography>
                    </Grid>
                    {componentesPreguntas}
                    
                    <Grid container direction="row">
                        <Grid item md={1} style={{paddingTop: '1.5vh'}}>
                            <Typography variant="subtitle1" color="inherit">
                                Opción:
                            </Typography>
                        </Grid>
                        <Grid item md={1} style={{paddingTop: '1.5vh'}}>
                            <Select value={this.state.opcionSel}>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item md={4} style={{paddingTop: '1.5vh'}}>
                            <Typography variant="subtitle1" color="inherit">
                                {this.state.opcion.nombre}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justify="center">
                        <Grid container direction="row" item md={12} style={{paddingTop: '1.5vh'}}>
                            <Typography variant="subtitle1" color="inherit">
                                Califique la atención de su cronograma siendo 1 (muy mala) la calificación más baja y 5 (muy buena) la más alta.
                            </Typography>
                        </Grid>
                    </Grid>

                    {componentesPreguntasOpcion}
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={6} sm={2} justify="center" style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                            <Button variant="contained" size="medium" color="primary" onClick={this.enviarEncuesta}>
                                Ingresar
                            </Button>
                        </Grid>
                        <Grid container item xs={6} sm={2} justify="center" style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                            <Link to='/'>
                                <Button variant="contained"  size="medium" color="secondary">
                                    Cancelar
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
 
export default Encuesta;