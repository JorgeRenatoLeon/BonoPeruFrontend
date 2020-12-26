import { AppBar, Toolbar, Typography, Button, Cointaner, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React, {Component, useReducer, useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import BarraInicial from '../Barras/BarraInicial';
import BarraFinal from '../Barras/BarraFinal';
import InfoService from '../../Servicios/infobeneficiario.service';
import  Cargando  from "../ModalCargando";


const Informacion = (props) => {
    const [estadoCargando,setEstadoCargando]= useState(true);

    //PARA MODAL CARGANDO
    const useStyles2 = makeStyles((theme) => ({
        root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        },
    }));
    const classes2 = useStyles2();
    //FIN DE MODAL CARGANDO
    
    const apiBeneficiario = JSON.parse(localStorage.getItem("beneficiarioKayt")) ;   //RespuestaBeneficiario.jsx            
    //console.log('para kayt: ',apiBeneficiario[0].beneficiario.idbeneficiario); //

    const [depa,setDepa]= useState("");
    const [prov,setProv]= useState("");
    const [dist,setDist]= useState("");
    const [sexo,setSexo]= useState("");
    const [discapacitado,setDiscapacitado]= useState("");
    useEffect(() => {
        InfoService.mostrarInfo(apiBeneficiario[0].beneficiario.idbeneficiario).then(response =>{
            setEstadoCargando(false);
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
           
           <Paper elevation={0} style={{marginLeft: 100, marginRight:100, boxShadow: 'none'}}>
                {estadoCargando?
                <Grid container direction="row" justify="center">
                    <Cargando/>
                </Grid>:
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <Grid item xs={6} sm={3}></Grid>
                    <Grid item xs={6} sm={3}>
                        <Typography variant="h6" style={{color: 'black', marginLeft: 80, marginBottom:20, marginTop:20 }} >
                           Departamento
                        </Typography> 
                        <Typography variant="h6" style={{color: 'black', marginLeft: 80, marginBottom:20, marginTop:20}} >
                            Provincia
                        </Typography> 
                        <Typography variant="h6" style={{color: 'black', marginLeft: 80, marginBottom:20, marginTop:20 }} >
                            Distrito
                        </Typography>
                        <Typography variant="h6"  style={{color: 'black', marginLeft: 80, marginBottom:20, marginTop:20}} >
                            Sexo
                        </Typography>
                        <Typography variant="h6" style={{color: 'black', marginLeft: 80, marginBottom:20, marginTop:20 }} >
                            Discapacitado
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Typography variant="h6" style={{color: 'black', marginLeft: 80, marginBottom:20, marginTop:20 }}  >
                            {depa}
                        </Typography> 
                        <Typography variant="h6" style={{color: 'black', marginLeft: 80, marginBottom:20, marginTop:20}} >
                            {prov}
                        </Typography>
                        <Typography variant="h6" style={{color: 'black', marginLeft: 80, marginBottom:20, marginTop:20 }}>
                            {dist}
                        </Typography> 
                        <Typography variant="h6" style={{color: 'black', marginLeft: 80, marginBottom:20, marginTop:20 }} >
                            {sexo}
                        </Typography> 
                        <Typography variant="h6" style={{color: 'black', marginLeft: 80, marginBottom:20, marginTop:20}} >
                            {discapacitado}
                        </Typography> 
                    </Grid>
                    <Grid item xs={6} sm={3}></Grid>
                </Grid>}
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <Link to='/consulta' style={{textDecoration:"none"}}>
                        <Button variant="contained"  size="medium" color="secondary" style={{margin: 10}}>
                            Regresar
                        </Button>
                    </Link> 
                </Grid>               
           </Paper>
           </Grid> 
           <BarraFinal/>
       </Grid>
   );
   
}
export default Informacion;

