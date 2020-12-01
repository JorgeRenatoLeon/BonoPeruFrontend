import { AppBar, Toolbar, Typography, Button, Cointaner, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React, {Component, useReducer, useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import BarraInicial from '../Barras/BarraInicial';
import BarraFinal from '../Barras/BarraFinal';
import InfoService from '../../Servicios/info.beneficiario';



const Informacion = (props) => {
    let valor = 2;
    const [depa,setDepa]= useState("");
    const [prov,setProv]= useState("");
    const [dist,setDist]= useState("");
    const [sexo,setSexo]= useState("");
    const [discapacitado,setDiscapacitado]= useState("");
    useEffect(() => {
        InfoService.mostrarInfo(valor).then(response =>{
            setDepa(response.data.departamento);
            setProv(response.data.provincia);
            setDist(response.data.distrito);
            setSexo(response.data.sexo);
            setDiscapacitado(response.data.discapacitado);
            console.log(response);
          })
          .catch(() => {
              console.log('Error al pedir la información');
          });  
    },[]);
    
   return (
       <Grid>
           <BarraInicial/> 
           <Grid style={{minHeight:"82.5vh"}}>             
           <AppBar position="relative" style={{background: 'transparent', boxShadow: 'none'}}>
               <Toolbar>
                   <Grid container direction="row" justify="center">
                       <Grid container item xs={12} justify="center">
                   
                        <Typography variant="h3" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold"}} gutterBottom justify="center" >
                             Información Personal
                        </Typography> 
                       </Grid>                                                  
                   </Grid>
               </Toolbar>
           </AppBar>
           <Paper elevation={0} style={{margin: 50, boxShadow: 'none'}}>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <Grid item xs={6} sm={3}></Grid>
                    <Grid item xs={6} sm={3}>
                        <Typography variant="h4"  >
                            <h3 style={{color: 'black', margin: 20,justify:"left" }}>Departamento</h3>
                        </Typography> 
                        <Typography variant="h4"  >
                            <h3 style={{color: 'black', margin: 20,justify:"right" }}>Provincia</h3>
                        </Typography> 
                        <Typography variant="h4"  >
                            <h3 style={{color: 'black', margin: 20,justify:"right" }}>Distrito</h3>
                        </Typography>
                        <Typography variant="h4"  >
                            <h3 style={{color: 'black', margin: 20,justify:"right" }}>Sexo</h3>
                        </Typography>
                        <Typography variant="h4"  >
                            <h3 style={{color: 'black', margin: 20,justify:"right" }}>Discapacitado</h3>
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Typography variant="h4"   >
                            <h3 style={{color: 'black', margin: 20,justify:"center" }}>{depa}</h3>
                        </Typography> 
                        <Typography variant="h4"   >
                            <h3 style={{color: 'black', margin: 20,justify:"center" }}>{prov}</h3>
                        </Typography>
                        <Typography variant="h4"   >
                            <h3 style={{color: 'black', margin: 20,justify:"center" }}>{dist}</h3>
                        </Typography> 
                        <Typography variant="h4"   >
                                <h3 style={{color: 'black', margin: 20,justify:"center" }}>{sexo}</h3>
                        </Typography> 
                        <Typography variant="h4"   >
                            <h3 style={{color: 'black', margin: 20,justify:"center" }}>{discapacitado}</h3>
                        </Typography> 
                    </Grid>
                    <Grid item xs={6} sm={3}></Grid>
                </Grid>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <Button variant="contained"  size="medium" color="secondary" style={{margin: 10}}>
                        Regresar 
                    </Button>
                </Grid>
           </Paper> 
           </Grid> 
           <BarraFinal/>
       </Grid>
   );
   
}
export default Informacion;

