import { AppBar, Toolbar, Typography, Button ,Cointaner, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React, {Component, useReducer} from 'react';
import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import BarraInicial from './Barras/BarraInicial';
import BarraFinal from './Barras/BarraFinal';
import Combobox from './Elementos/Combobox';

const useStyles = makeStyles({
    root: {
      width: '100%',
      maxWidth: 500,
      justify:"center",    
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });


function Quejas() {
    const incovenientesLugar = [
        { value: 'tipo1', label: 'TIPO 1' },
        { value: 'tipo2', label: 'TIPO 2' },
        { value: 'tipo3', label: 'TIPO 3' }
    ];
    const incovenientesTurno = [
        { value: 'tipo1', label: 'TIPO 1' },
        { value: 'tipo2', label: 'TIPO 2' },
        { value: 'tipo3', label: 'TIPO 3' }
    ];
    
    return ( 
        <Grid>
            <BarraInicial/>              
            <AppBar position="relative" style={{background: 'transparent', boxShadow: 'none'}}>
                <Toolbar>
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={12} justify="center">
                            <Typography variant="h3"  gutterBottom justify="center" >
                                    <h3 style={{color: 'black', margin: 20,justify:"center" }}>Cronograma</h3>
                            </Typography> 
                        </Grid>                                                  
                    </Grid>
                </Toolbar>
            </AppBar>
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
                            1. Seleccione el incoveniente que tuvo en el lugar de entrega
                        </Typography>
                        <Combobox options={incovenientesLugar}/>
                    </Grid>
                    <Grid container direction="column" justify="space-evenly" alignItems="center" >
                        <Typography variant="subtitle1" color="inherit">
                            2. Seleccione el incoveniente que tuvo sobre el turno
                        </Typography>
                        <Combobox options={incovenientesTurno}/>
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
            <BarraFinal/>
        </Grid>
    );

}
 
export default Quejas;