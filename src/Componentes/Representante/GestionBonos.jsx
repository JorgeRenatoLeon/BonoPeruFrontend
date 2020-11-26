import React from 'react'
import {  AppBar, Toolbar,Typography,  Container} from "@material-ui/core"
 import { Grid, Button } from "@material-ui/core"
 import { Link } from "react-router-dom"

//Para el api
 import { useEffect,useState } from "react";
//import { history } from "../../helpers/history";

function formato(texto){
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
  }
  const rpta = [
    { id: 'Respuesta',  label: 'Respuesta' },

  ];
//   cronograma ya generado
//  /*
  var Arrcronograma = [{ fechaInicio:"2020-11-28", 
                         fechaFin:"2020-12-15",
                         totalBeneficiarios:1024,
                         totalLugares:32,                       
                        
                        }]
                        
//*/
    // cronograma no iniciado
  /*    
    var Arrcronograma = [{ fechaInicio:null, 
                            fechaFin:null,
                            totalBeneficiarios:1024,
                            totalLugares:32,                       

    }]  
 */   
  
 function GenerarCronograma(){
     //var llamarAlAlgoritmo;
 }    
  
//  path: /bonos
function GestionBonos (props) {
  //useState devuelve 2 valores, en la pos 0, devuelve  el valor, y el la pos 1, devuelve una función
        //  const classes = useStyles();
        const [cronograma,setCronograma]=useState([]); //Set cronograma, creando y un estado de toda la función

            useEffect((cronograma) => {

                //Para que se actualice y mande a la pantalla principal
                if(cronograma===undefined || cronograma.length===0){
                    
                //     else{
                         setCronograma(Arrcronograma);
                         localStorage.removeItem("beneficiario");
                //     }


                 }
            },  [])

       // console.log('cronograma:',cronograma);
        var titulo="Gestión de Bonos";
        var respuesta;

        var botones;
      

        if(cronograma.length===0){
          respuesta=  "No hay cronograma";
        }
        else if (cronograma.length>=1){

            //cambio de formato de Fecha-super no eficiente :(
            var formatoFecha1,formatoFecha2;
            if(cronograma.length===1 && cronograma[0].fechaInicio !==null && cronograma[0].fechaFin !==null){
                // console.log('fecha antes:', cronograma[0].fechaInicio);
               formatoFecha1=formato( cronograma[0].fechaInicio); 
            //    console.log('fecha:',formatoFecha1);
               cronograma[0].fechaInicio=formatoFecha1;
               formatoFecha2=formato( cronograma[0].fechaFin);
               cronograma[0].fechaFin=formatoFecha2;
                 
                botones=rpta.map((boton) =>   
                        <Grid key={boton.index}  container direction="row" justify="center">
                            <Grid container item md={3} justify="center">
                                <Link to='/cronogramaParaRepresentante' style={{textDecoration:"none"}}>
                                    <Button variant="contained" size="medium" color="primary" >
                                        Ver Cronograma 
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid container item md={3} justify="center">                                
                                    <Button variant="contained" size="medium" color="secondary" >
                                        Regresar
                                    </Button>                             
                            </Grid>
                            {/* <Grid container item md={3} justify="center">                            
                                <Button variant="contained" size="medium" color="primary" >
                                    Publicar Cronograma 
                                </Button>
                            </Grid> */}
                        </Grid>
                    );
            }
            else{
                botones=rpta.map((boton) =>   
                        <Grid key={boton.index}  container direction="row" justify="center">
                            <Grid container item md={3} justify="center">                                
                                    <Button variant="contained" size="medium" color="primary" onClick={GenerarCronograma} >
                                        Generar Cronograma 
                                    </Button>                             
                            </Grid>
                            <Grid container item md={3} justify="center">                                
                                    <Button variant="contained" size="medium" color="secondary" >
                                        Regresar
                                    </Button>                             
                            </Grid>
                        </Grid>
                            
                    );
            }
              //Todoooo la muestra del cronograma está manejado por respuesta
            respuesta= rpta.map((rpta,index)   =>
            <Grid key={rpta.id} container direction="col" justify="center">
                <Grid container direction="row" item md={12} style={{paddingTop: '1.5vh'}}>
                    <Typography variant="subtitle1" color="inherit">
                        {/* {mensajeBeneficiario} */}
                     </Typography>

                </Grid>


                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                     <Grid container direction="row" item md={4} >
                            <Typography variant="subtitle2" color="inherit">
                                {'Fecha de inicio de reparto: '}
                            </Typography>
                      </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} >
                            <Typography variant="subtitle2" color="inherit">
                                    {opcion.fechaInicio?opcion.fechaInicio:"Por definir"}
                            </Typography>
                        </Grid>

                        )) }


                </Grid>
                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                    <Grid container direction="row" item md={4} >
                        <Typography variant="subtitle2" color="inherit">
                            {'Fecha de final de reparto: '}
                        </Typography>
                    </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} >
                            <Typography variant="subtitle2" color="inherit">
                            {opcion.fechaFin? opcion.fechaFin:"Por definir" }
                            </Typography>
                        </Grid>

                        )) }

                </Grid>
                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                    <Grid container direction="row" item md={4} >
                        <Typography variant="subtitle2" color="inherit">
                            {'Total de Beneficiarios: '}
                        </Typography>
                    </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} >
                            <Typography variant="subtitle2" color="inherit">
                                {opcion.totalBeneficiarios}
                            </Typography>
                        </Grid>

                    ))
                    }

                </Grid>

                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                     <Grid container direction="row" item md={4} >
                        <Typography variant="subtitle2" color="inherit">
                            {'Total de Lugares de Entrega:  '}
                        </Typography>
                    </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} >
                            <Typography variant="subtitle2" color="inherit">
                                {opcion.totalLugares}
                            </Typography>
                        </Grid>
                     ))
                    }

                </Grid>

            </Grid>

            )

        }



    return (
        <Grid style={{minHeight:"88vh"}}>
               <AppBar position="relative" style={{background: 'transparent', boxShadow: 'none'}}>
                    <Toolbar>
                        <Grid container direction="row" justify="center">
                            <Grid container item xs={12} justify="center">
                                <Typography variant="h2" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold"}} gutterBottom justify="center" >
                                     {titulo}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

            <Grid className='Contenedor'>
                <Container style={{margin: 10, boxShadow: 'none'}}>
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={12} justify="center">                            
                            <Typography variant="h5"  gutterBottom justify="center" >
                                { respuesta }
                            </Typography>
                        </Grid>
                    </Grid>
                    {/* botones */}
                    <Grid container direction="row" justify="center">
                      {botones}
                    </Grid>

                </Container>

            </Grid>
            <Grid>

            </Grid>
        </Grid>
    );


}
export default GestionBonos;



  
/*


*/