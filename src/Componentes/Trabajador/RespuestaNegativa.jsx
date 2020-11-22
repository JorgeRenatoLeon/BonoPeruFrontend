import React from 'react'
import {  AppBar, Toolbar, Typography, Container } from "@material-ui/core"
//import { Grid } from "@material-ui/core"
 import { Grid, Button } from "@material-ui/core"
 import { Link } from "react-router-dom"
// import '../assets/css/FondoBeneficiario.css'
import SearchField from "react-search-field";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
//Para el título grandote
const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
    justify:"center",
    
  },
});


function RespuestaNegativa () {
    

    return (
            <Paper elevation={1} style={{marginLeft: 400, marginRight:400, marginBottom:60}} >
                <h>El beneficiario  no le corresponde bono en este horario o no le corresponde en esta agencia.</h><br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </Paper> 
    );
    
}
export default RespuestaNegativa;

