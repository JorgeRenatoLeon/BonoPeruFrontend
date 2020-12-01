import { Typography, Button ,Cointaner, FormGroup, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React, {Component, useReducer} from 'react';
import { Link } from 'react-router-dom';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';

const Queja=()=>{
    
    return ( 
        <Grid>    
            <Paper elevation={0} style={{marginLeft: 40, marginRight: 40, marginBottom: 20,  boxShadow: 'none'}}>
                <Grid container direction="column" justify="space-evenly" >
                    <Typography variant="subtitle1" color="inherit">
                        Opción 1: Agencia DEF-Turno Tarde
                    </Typography>
                    <Typography variant="subtitle1" color="inherit">
                        Seleccione la mejor opción acorde a su queja
                    </Typography>
                </Grid>
                <Grid>
                    <Grid container direction="column" justify="space-evenly" alignItems="center" >
                        <Typography variant="subtitle1" color="inherit">
                            1. ¿Tuvo algún inconventiente con su lugar de entrega asignado?
                        </Typography>
                        <RadioGroup row variant="subtitle1"  color="inherit">
                            <FormControlLabel value="Si" control={<Radio color='primary'/>} label="Si" />
                            <FormControlLabel value="No" control={<Radio color='black'/>} label="No" />
                        </RadioGroup>
                    </Grid>
                    <Grid container direction="column" justify="space-evenly" alignItems="center" >
                        <Typography variant="subtitle1" color="inherit">
                            2. Seleccione el incoveniente que tuvo en el lugar de entrega
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox color="black"/>}
                                label="Muy lejos de mi ubicación"
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary"/>}
                                label="Se demoraron en atender"
                            />
                            <FormControlLabel
                                control={<Checkbox color="black"/>}
                                label="No había efectivo"
                            />
                            <FormControlLabel
                                control={<Checkbox color="black"/>}
                                label="No estaba abierto"
                            />
                            <Grid container direction="row" justify="flex-start" alignItems="center">
                                <FormControlLabel
                                    control={<Checkbox color="black"/>}
                                    label="Otro"
                                />
                                <input></input>
                            </Grid>
                        </FormGroup>
                    </Grid>
                    <Grid container direction="column" justify="space-evenly" alignItems="center" >
                        <Typography variant="subtitle1" color="inherit">
                            3. ¿Tuvo algún inconventiente con su turno asignado?
                        </Typography>
                        <RadioGroup row variant="subtitle1"  color="inherit">
                            <FormControlLabel value="Si" control={<Radio color='black'/>} label="Si" />
                            <FormControlLabel value="No" control={<Radio color='black'/>} label="No" />
                        </RadioGroup>
                    </Grid>
                    <Grid container direction="column" justify="space-evenly" alignItems="center" >
                        <Typography variant="subtitle1" color="inherit">
                            4. Seleccione el incoveniente que tuvo sobre el turno
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox color="black"/>}
                                label="Muy temprano"
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary"/>}
                                label="Muy tarde"
                            />
                            <FormControlLabel
                                control={<Checkbox color="black"/>}
                                label="Había mucha gente en los horarios"
                            />
                            <Grid container direction="row" justify="flex-start" alignItems="center">
                                <FormControlLabel
                                    control={<Checkbox color="black"/>}
                                    label="Otro"
                                />
                                <input></input>
                            </Grid>
                        </FormGroup>
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-evenly" alignItems="center" >
                    <Button variant="contained" size="medium" color="primary" style={{margin: 10}}>
                        Enviar
                    </Button> 
                    <Button variant="contained"  size="medium" color="secondary" style={{margin: 10}}>
                        Cancelar 
                    </Button>
                </Grid>                  
            </Paper>  
        </Grid>
    );

}
 
export default Queja;