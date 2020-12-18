import { AppBar, Toolbar, Typography, Button ,Cointaner, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React, {Component, useReducer} from 'react';
import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import BarraInicial from './Barras/BarraInicial';
import BarraFinal from './Barras/BarraFinal';
import Combobox from './Elementos/Combobox';
import Queja from'./Queja';
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
    const apiBeneficiario = JSON.parse(localStorage.getItem("beneficiarioKayt")) ;   //RespuestaBeneficiario.jsx            
    console.log('para kayt: ',apiBeneficiario); //necesitas el turno y el lugar de entrega 

    let cant = 0;
    return ( 
        <Grid>
            <BarraInicial/>             
            <AppBar position="relative" style={{background: 'transparent', boxShadow: 'none'}}>
                <Toolbar>
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={12} justify="center">
                            <Typography variant="h3"  gutterBottom justify="center" >
                                    <h3 style={{color: 'black', margin: 20,justify:"center" }}>Quejas</h3>
                            </Typography> 
                        </Grid>                                                  
                    </Grid>
                </Toolbar>
            </AppBar>
            {apiBeneficiario.map((opcion,index)=> (
/*                         <Grid container direction="row" item md={4} xs={4}>  
                            <Typography variant="subtitle2" color="inherit">
                            {opcion.horariolugarentrega.lugarentrega.nombre} 
                            </Typography> 
                        </Grid>  */
                    <Queja name={opcion.horariolugarentrega.lugarentrega.nombre} numero={index+1} 
                        idHorario={opcion.idHorario}
                        idLugar={opcion.horariolugarentrega.lugarentrega.idLugarentrega}></Queja>      
                )) 
            } 
            <BarraFinal/>
        </Grid>
    );

}
 
export default Quejas;