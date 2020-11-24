import React from 'react'
import {  AppBar, Toolbar,Typography,  Container} from "@material-ui/core"
 import { Grid, Button } from "@material-ui/core"
 import { Link } from "react-router-dom"

//Para el api
 import { useEffect,useState } from "react";
import { history } from "../../helpers/history";
//para la cabecera
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import TableContainer from '@material-ui/core/TableContainer';
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
    { id: 'Opciones', numeric: false, disablePadding: false, label: 'Opciones' },
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
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
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

//  path: /consulta
function RespuestaBeneficiario (props) { 
  //useState devuelve 2 valores, en la pos 0, devuelve  el valor, y el la pos 1, devuelve una función
         const classes = useStyles();
        const [cronograma,setCronograma]=useState([]); //Set cronograma, creando y un estado de toda la función
       
            useEffect((cronograma) => {
               
                // console.log('apiBeneficiario',JSON.parse(localStorage.getItem("beneficiario")) );    //La hemos obtenido             
                const apiBeneficiario = JSON.parse(localStorage.getItem("beneficiario")) ;    //La hemos obtenido             
                if(cronograma===undefined || cronograma.length===0){
                    if (apiBeneficiario ===undefined || apiBeneficiario===null) {
                        history.push('/'); //si no tengo pokemones ni item en beneficiario,lo mando a consutla
                    }
                    else{
                        setCronograma(apiBeneficiario); 
                        localStorage.removeItem("beneficiario");                        
                    }
                   

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
            var formatoFecha1,formatoFecha2;
            if(cronograma.length===1){
               formatoFecha1=formato( cronograma[0].fecha); 
               cronograma[0].fecha=formatoFecha1;
            }
            if(cronograma.length===2){
                formatoFecha1=formato( cronograma[0].fecha); 
                cronograma[0].fecha=formatoFecha1;
                formatoFecha2=formato( cronograma[1].fecha); 
                cronograma[1].fecha=formatoFecha2;
             }
             //Cabecera manejado por headCells
             var mensajeBeneficiario="Usted sí es beneficiario y  cuenta con las siguientes opciones, se le brindará información de cada lugar de entrega y la fecha de recojo.   ";
             //Todoooo la muestra del cronograma está manejado por respuesta
            respuesta= rpta.map((rpta,index)   =>   
            <Grid key={rpta.id} container direction="col" justify="center">
                <Grid container direction="row" item md={12} style={{paddingTop: '1.5vh'}}>
                    <Typography variant="subtitle1" color="inherit">
                        {mensajeBeneficiario}
                     </Typography>   
                                 
                </Grid>
                {/* llamada  a la cabecera */}
                <Grid container direction="row" item md={12} style={{paddingTop: '1.5vh'}}>                    
                <div className={classes.root}>
                <Grid className={classes.paper}>                      
                    <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                        // handleRemove={handleRemove}
                        // startEditing={startEditing}
                        // editIdx={state.editIdx}
                        // stopEditing={stopEditing}
                        // handleSave={handleSave}
                    >
                       
                        <EnhancedTableHead
                        classes={classes}
                        // order={order}
                        // orderBy={orderBy}
                        // onRequestSort={handleRequestSort}
                        />
                        
                    </Table>
                    </TableContainer>
                
                </Grid>                  
            </div>
             
                </Grid>
                
                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                     <Grid container direction="row" item md={4} >
                            <Typography variant="subtitle2" color="inherit">
                                {'Fecha de recojo: '}
                            </Typography>
                      </Grid>              
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} >  
                            <Typography variant="subtitle2" color="inherit">
                                    {opcion.fecha} 
                            </Typography> 
                        </Grid> 
                        
                        )) }   
                                                                            
                    
                </Grid> 
                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                    <Grid container direction="row" item md={4} >
                        <Typography variant="subtitle2" color="inherit">
                            {'Rango de horas de recojo: '}
                        </Typography>
                    </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} >  
                            <Typography variant="subtitle2" color="inherit">
                            {opcion.horaInicio + "-" + opcion.horaFin} 
                            </Typography> 
                        </Grid> 
                        
                        )) } 
                  
                </Grid>  
                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                    <Grid container direction="row" item md={4} >
                        <Typography variant="subtitle2" color="inherit">
                            {'Lugar de entrega: '}  
                        </Typography>
                    </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} >  
                            <Typography variant="subtitle2" color="inherit">
                            {opcion.horariolugarentrega.lugarentrega.nombre} 
                            </Typography> 
                        </Grid> 
                        
                    )) 
                    } 
                   
                </Grid>  

                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                     <Grid container direction="row" item md={4} >                    
                        <Typography variant="subtitle2" color="inherit">
                            {'Dirección del Lugar de entrega: '}     
                        </Typography>
                    </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} >  
                            <Typography variant="subtitle2" color="inherit">
                            {opcion.horariolugarentrega.lugarentrega.direccion}   
                            </Typography> 
                        </Grid> 
                        
                    )) 
                    } 
                   
                </Grid>  
       
            </Grid>
            
            )

        }
       
    
        
    return (
        <div>
               <AppBar position="relative" style={{background: 'transparent', boxShadow: 'none'}}>
                    <Toolbar>
                        <Grid container direction="row" justify="center">
                            <Grid container item xs={12} justify="center">
                        
                                <Typography variant="h2" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold"}} gutterBottom justify="center" >
                                     {titulo}                                     
                                </Typography> 
                                {/* Para leer lo que traigo de beneficiario */}                           

                              
                            </Grid>                                                  
                        </Grid>
                    </Toolbar>
                </AppBar>
            
            <div className='Contenedor'>
                <Container style={{margin: 10, boxShadow: 'none'}}>
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={12} justify="center">
                                {/* <Link to="/prueba"> 
                                <button>       Prueba      </button>
                                </Link> */}                                
                                {/* <h1 style={{color: 'black', margin: 0,padding: 30}}>Información</h1>  */}
                                
                                <Typography variant="h5"  gutterBottom justify="center" >
                                { respuesta } 
                                    </Typography>                                     
                                {/* {cronograma.map(pokemon=> (
                                    <Typography variant="h3"  gutterBottom justify="center" >
                                        {pokemon.name+" "+pokemon.url}
                                    </Typography>
                                    )) } */}
                                   
                        </Grid>      
                                         
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Grid container item md={2} justify="center">
                            <Link to='/' style={{textDecoration:"none"}}>
                                <Button variant="contained" size="small" color="secondary" >
                                    Salir
                                </Button>
                            </Link>
                        </Grid>                    
                    </Grid>
                   
                </Container>
             
            </div>
            <div>
           
            </div>
        </div>
    );
    
    
}
export default RespuestaBeneficiario;

/*


*/