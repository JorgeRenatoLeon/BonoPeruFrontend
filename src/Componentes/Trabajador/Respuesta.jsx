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


function RespuestaPositiva (props) {
    

    return (
            <Grid container
              direction="column"
              justify="center"
              alignItems="center">
              <Paper elevation={1} style={{ marginBottom:76}} >
                <br></br>
                <br></br>
                <h>{props.mensaje}</h><br></br>
                <br></br>
                <br></br>
              </Paper> 
            </Grid>  
    );
    
}
export default RespuestaPositiva;

