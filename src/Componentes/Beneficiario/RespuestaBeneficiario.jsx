import React from 'react'
import {  AppBar, Toolbar,Typography,  Container} from "@material-ui/core"
 import { Grid, Button } from "@material-ui/core"
 import { Link } from "react-router-dom"
//Para la dirección en maps
import LocationOnIcon from '@material-ui/icons/LocationOn';
//Para el api
 import { useEffect,useState } from "react";
import { history } from "../../helpers/history";
//para la cabecera
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {TableContainer, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "5AB9EA",
    //   padding:"100",
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 18,
    //   padding:"100",
    },
  }))(TableCell);
  const headCells = [
    { id: 'Descripción', numeric: false, disablePadding: false, label: 'Descripción' },
    { id: 'Opción 1', numeric: false, disablePadding: false, label: 'Opción 1' },
    { id: 'Opción 2', numeric: false, disablePadding: false, label: 'Opción 2' },
    // { id: 'Opcion', numeric: false, disablePadding: false, label: 'Opciones' },
   
  ];
  const rpta = [
    { id: 'Respuesta',  label: 'Respuesta' },
   
   
  ];
  function EnhancedTableHead(props) {
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <StyledTableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
            //   sortDirection={orderBy === headCell.id ? order : false}
              style={{background: '#5AB9EA'}}
            >
              {headCell.label}
            </StyledTableCell>


          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    // onRequestSort: PropTypes.func.isRequired,
    // order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    // orderBy: PropTypes.string.isRequired,
  };
  
  const useStyles = makeStyles({
      root: {
        width: '100%',
        //maxWidth: 750,
        justify:"center",    
      },
      table: {
        minWidth: 500,
      },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      visuallyHidden: {
          border: 0,
          clip: 'rect(0 0 0 0)',
          height: 1,
          margin: -1,
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          top: 20,
          width: 1,
        },
    });


//fin de cosas para cabecera

function formato(texto){
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
  }
function formatoHora(hora){
    var nuevaHora=hora.substring(0,5); //Extraigo todo antes del : 
    return nuevaHora;
}
function imprimir(){
    //  console.log('imp');
     return window.print();
}
//  path: /consulta
function RespuestaBeneficiario (props) { 
  //useState devuelve 2 valores, en la pos 0, devuelve  el valor, y el la pos 1, devuelve una función
        const classes = useStyles();
        const [cronograma,setCronograma]=useState([]); //Set cronograma, creando y un estado de toda la función
       
            useEffect((cronograma) => {
               
                // console.log('apiBeneficiario',JSON.parse(localStorage.getItem("beneficiario")) );    //La hemos obtenido             
                const apiBeneficiario = JSON.parse(localStorage.getItem("beneficiario")) ;
              
            
                    //La hemos obtenido             
                if(cronograma===undefined || cronograma.length===0){ localStorage.setItem("beneficiarioKayt",JSON.stringify(apiBeneficiario)); //Guardar la rpta del apibenefici
                setCronograma(apiBeneficiario); 
                /*
                if (apiBeneficiario ===undefined || apiBeneficiario===null) {
                        history.push('/'); //si no tengo pokemones ni item en beneficiario,lo mando a consutla
                    }
                    else{
                       
                        localStorage.removeItem("beneficiario");                        
                    }
                */

                }
            },  [])
       
        console.log('cronograma:',cronograma);
        var titulo;
        var respuesta;
     
          
        if(cronograma.length===0){
            titulo="Información"
          respuesta=  "No hay un bono asignado a esta familia. Verifique que lo ha ingresado correctamente. ";
        }
        else if (cronograma.length>=1){
            titulo="Cronograma"
            //cambio de formato de Fecha-super no eficiente :(
            var formatoFecha=undefined,horaIni=undefined,horaFin=undefined;
            if(cronograma.length===1 && formatoFecha===undefined && horaIni===undefined && horaFin===undefined){
                // Manejo de fechas
                //llamar a la función del formato de fecha DD/MM/AAAA
               formatoFecha=formato( cronograma[0].fecha); 
               //Asignar la fecha
               cronograma[0].fecha=formatoFecha;

               
                if(horaIni===undefined && horaFin===undefined){
                     //    Manejo de horas
                    horaIni=formatoHora(cronograma[0].horaInicio); //HH:mm
                    horaFin=formatoHora(cronograma[0].horaFin);
                    cronograma[0].horaInicio=horaIni;
                    cronograma[0].horaFin=horaFin;
                }
                    


            }
            if(cronograma.length===2 && formatoFecha===undefined && horaIni===undefined && horaFin===undefined){
                //llamar a la función del formato de fecha DD/MM/AAAA
                formatoFecha=formato( cronograma[0].fecha); 
                //Asignar la fecha
                cronograma[0].fecha=formatoFecha;
                 //llamar a la función del formato de fecha DD/MM/AAAA
                formatoFecha=formato( cronograma[1].fecha); 
                //Asignar la fecha
                cronograma[1].fecha=formatoFecha;
                //    Manejo de horas
                if(horaIni===undefined && horaFin===undefined){
                    // llama a func de formato de hora
                    horaIni=formatoHora(cronograma[0].horaInicio);//HH:mm
                    horaFin=formatoHora(cronograma[0].horaFin);//HH:mm  
                    //asigna en el api               
                    cronograma[0].horaInicio=horaIni;
                    cronograma[0].horaFin=horaFin;

                    // llama a func de formato de hora
                    horaIni=formatoHora(cronograma[1].horaInicio);//HH:mm
                    horaFin=formatoHora(cronograma[1].horaFin);//HH:mm
                     //asigna en el api
                    cronograma[1].horaInicio=horaIni;
                    cronograma[1].horaFin=horaFin;
                }
                
                

             }
             
           
             //Cabecera manejado por headCells
             var mensajeBeneficiario="Usted sí es beneficiario y  cuenta con las siguientes opciones, se le brindará información de cada lugar de entrega y la fecha de recojo.   ";
             //Todoooo la muestra del cronograma está manejado por respuesta
            respuesta= rpta.map((rpta,index)   => 
              
            <Grid key={rpta.id} container direction="col" justify="center">
                <Grid container direction="row" justify="center">
                    <Grid container item md={4} xs={4} justify="center">
                            <Link to='/quejas' style={{textDecoration:"none", paddingTop:"0px"}}>
                                <Button variant="contained" size="medium" color="primary" >
                                    Quiero realizar una queja
                                </Button>
                            </Link>                            
                        </Grid> 
                 
                    <Grid container item md={4} xs={4} justify="center">
                            <Link to='/encuesta' style={{textDecoration:"none", paddingTop:"0px"}}>
                                <Button variant="contained" size="medium" color="primary" >
                                    Quiero realizar una encuesta
                                </Button>
                            </Link>                            
                    </Grid> 
                    <Grid container item md={4} xs={4} justify="center">
                            <Link to='/informacion' style={{textDecoration:"none", paddingTop:"0px"}}>
                                <Button variant="contained" size="medium" color="primary" >
                                    Quiero ver mi información personal
                                </Button>
                            </Link>                            
                    </Grid> 
                </Grid>
                <Grid  item md={12} xs={12} style={{paddingTop: '1.5vh'}}>
                    <Typography variant="subtitle1" color="inherit">
                        {mensajeBeneficiario}
                     </Typography>   
                                 
                </Grid>
                {/* llamada  a la cabecera */}
                <Grid container direction="row" item md={12} style={{paddingTop: '1.5vh'}}>                    
                <Grid className={classes.root}>
                    <Grid className={classes.paper}>                      
                        <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            aria-label="enhanced table"
                        >
                        
                            <EnhancedTableHead
                            classes={classes}
                            />
                            
                        </Table>
                        </TableContainer>
                    
                    </Grid>                  
                </Grid>
             
                </Grid>
                
                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                     <Grid container direction="row" item md={4} xs={4}>
                            <Typography variant="subtitle2" color="inherit">
                                {'Fecha de recojo: '}
                            </Typography>
                      </Grid>              
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} xs={4} >  
                            <Typography variant="subtitle2" color="inherit">
                                    {opcion.fecha} 
                            </Typography> 
                        </Grid> 
                        
                        )) }   
                                                                            
                    
                </Grid> 
                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                    <Grid container direction="row" item md={4} xs={4} >
                        <Typography variant="subtitle2" color="inherit">
                            {'Rango de horas de recojo: '}
                        </Typography>
                    </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} xs={4}>  
                            <Typography variant="subtitle2" color="inherit">
                            {opcion.horaInicio + "-" + opcion.horaFin} 
                            </Typography> 
                        </Grid> 
                        
                        )) } 
                  
                </Grid>  
                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                    <Grid container direction="row" item md={4} xs={4} >
                        <Typography variant="subtitle2" color="inherit">
                            {'Lugar de entrega: '}  
                        </Typography>
                    </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} xs={4}>  
                            <Typography variant="subtitle2" color="inherit">
                            {opcion.horariolugarentrega.lugarentrega.nombre} 
                            </Typography> 
                        </Grid> 
                        
                    )) 
                    } 
                   
                </Grid>  

                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                     <Grid container direction="row" item md={4} xs={4} >                    
                        <Typography variant="subtitle2" color="inherit">
                            {'Dirección del Lugar de entrega: '}     
                        </Typography>
                    </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} xs={4}>  
                            <Typography variant="subtitle2" color="inherit">
                            {opcion.horariolugarentrega.lugarentrega.direccion}   
                            </Typography> 
                            <Grid container direction="row" item md={4} xs={4}> 
                            <a href={"https://www.google.com/maps/place/"
                                +opcion.horariolugarentrega.lugarentrega.direccion+","
                                +opcion.horariolugarentrega.lugarentrega.distrito.nombre} 
                                target="_blank" >
                                <IconButton >
                                    <LocationOnIcon/>
                                </IconButton>
                             </a>
                             </Grid>
                        </Grid> 
                        
                      

                        
                    )) 
                    } 
                   
                </Grid>  
       
            </Grid>
            
            )

        }
       
        
   
    return (
        <Grid style={{minHeight:"88vh"}}>
               
                    <Toolbar>
                        <Grid container direction="row" justify="center">
                            <Grid container item xs={12} justify="center">
                        
                                <Typography variant="h3" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold"}} gutterBottom justify="center" >
                                     {titulo}                                     
                                </Typography> 
                              
                            </Grid>                                                  
                        </Grid>
                    </Toolbar>
                
            
            <Grid className='Contenedor'>
                <Container style={{margin: 10, boxShadow: 'none'}}>
                
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={12} justify="center">                       
                                <Typography variant="h5"  gutterBottom justify="center" >
                                     { respuesta } 
                                </Typography>     
                        </Grid>          
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Grid container item md={3} xs={4} justify="center" style={{textDecoration:"none", paddingTop:"20px"}}>
                                <Button variant="contained" onClick={imprimir} size="medium" color="primary" >
                                    Imprimir
                                </Button>
                           
                        </Grid>   
                        <Grid container item md={3} xs={4} justify="center">
                            <Link to='/' style={{textDecoration:"none", paddingTop:"20px"}}>
                                <Button variant="contained" size="medium" color="secondary" >
                                    Salir
                                </Button>
                            </Link>  
                           
                        </Grid> 
                                       
                    </Grid>
                </Container>             
            </Grid>
        </Grid>
    );
    
    
}
export default RespuestaBeneficiario;
