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
    const apiBeneficiario = JSON.parse(localStorage.getItem("beneficiarioKayt")) ;   //RespuestaBeneficiario.jsx            
    console.log('para kayt: ',apiBeneficiario); //necesitas el turno y el lugar de entrega 

    return ( 
        <Grid>
            <BarraInicial/>
            <Grid style={{minHeight:"84vh"}}>          
            <Grid container direction="row" justify="center">
                <Grid container item xs={12} justify="center">
                        <Typography variant="h3" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold"}} gutterBottom justify="center" >
                            Quejas
                        </Typography>                         
                </Grid>                                                  
            </Grid>
            { (apiBeneficiario!==null)?apiBeneficiario.map((opcion,index)=> (
                    <Queja name={opcion.horariolugarentrega.lugarentrega.nombre} numero={index+1} 
                        idHorario={opcion.idHorario}
                        idLugar={opcion.horariolugarentrega.lugarentrega.idLugarentrega}></Queja>      
                )): <Grid></Grid>
            }
            </Grid>  
            <BarraFinal/>
        </Grid>
    );

}
 
export default Quejas;