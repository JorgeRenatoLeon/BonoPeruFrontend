import React from 'react'
import {  AppBar, Toolbar,Typography,  Container} from "@material-ui/core"
 import { Grid, Button } from "@material-ui/core"
//  import { Link } from "react-router-dom"
 import Chart from "../../Componentes/Graficos/Chart.js"
 import Line from "../../Componentes/Graficos/Line.js"
 import Bar from "../../Componentes/Graficos/Bar.js"
 import Pie from "../../Componentes/Graficos/Pie.js"
 import apiData from "./apiData.js"
 import { makeStyles } from '@material-ui/core/styles';
 import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
  import CardContent from '@material-ui/core/CardContent';
 import axios from "axios";
//Para el api
import { useEffect,useState } from "react";

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
                         totalMujeres:701,
                         totalHombres:323,
                         totalLugares:32,                       
                         totalActivo:32,                       
                         totalQuejas:1,                       
                        
                        }]

  //Para card de reprote 
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      marginRight:20,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

//Para el chart reporte

 

  var backgroundColor=[    'rgba(179, 229, 252, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',     'rgba(255, 159, 64, 1)',     'rgba(255, 99, 132, 1)'   ];



    const ENTREGADOS = "http://localhost:8084/api/cronograma/monitoreoentregabono";
    const TOTALES = "http://localhost:8084/api/cronograma/reportebeneficiario";
//fin del chart reporte  
  //  path: /monitoreo

 function Monitoreo (props) {
  //useState devuelve 2 valores, en la pos 0, devuelve  el valor, y el la pos 1, devuelve una función
  var labels= ["23-11-2020", "25-11-2020", "08-12-2020"];
  var data=[2, 1, 0];
 
        const [cronograma,setCronograma]=useState([]); //Set cronograma, creando y un estado de toda la función
        const [datosEntregados,setdatosEntregados]=useState([]); //Set cronograma, creando y un estado de toda la función
       // useEffect((datosEntregados) => {   
 
            if(datosEntregados===undefined || datosEntregados.length===0){
                console.log('if: ',datosEntregados);
                //  const DataEntregados = JSON.parse(localStorage.getItem("DataEntregados")) ;
                //   labels=DataEntregados.listaFechas;
                //   data=DataEntregados.listaCantidades;
             /*
                axios.post(TOTALES)
                .then(response =>{
                    console.log("API entregado: ",response.data);
         
                       } ;  
                   setdatosEntregados(response.data);
                    
                })
                .catch(() => {
                    console.log('Error al obtener Entregados');
                });*/
                //console.log(apiData.DataEntregadosApi());
                //const a= DataEntregadosApi();
                //setdatosEntregados(a);
            }        
            console.log('fuera del api',datosEntregados);
            

             var titulo="Monitoreo";
            var respuesta;
            const classes = useStyles();
           
        
     
              if(datosEntregados.length!==0 && datosEntregados!==undefined ) {
                labels=datosEntregados.listaFechas;
                data=datosEntregados.listaCantidades;
              } 
             
              console.log('labels',labels);
              var chartDataEntregados={
                //fila de nombre
                //Líne: Arreglo de Dias
                 labels: labels,
                 datasets:[
                   {
                     label:'Bonos Entregados',
                     data:data,
                     backgroundColor:backgroundColor,
                   }
                 ]
               }    
               console.log('chartDataEntregados',chartDataEntregados);    
       
               
            respuesta= rpta.map((rpta,index)   =>
            <Grid key={rpta.id} container  justify="center">
               <Line chartData={chartDataEntregados} md={10} nameTitle="Bonos Entregados" legendPosition="bottom"/>
              
                 <Pie chartData={chartDataEntregados}  md={12} nameTitle="Bonos Entregados" legendPosition="bottom"/>
                <Bar chartData={chartDataEntregados} md={12} nameTitle="Bonos Entregados" legendPosition="bottom"/>
                  {/* <Card className={classes.root} variant="outlined">
                    <CardContent>
                     <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Beneficiarios
                        </Typography>                
              
                                {cronograma.map(opcion=> (
                                <Grid container direction="row" >
                                    <Typography variant="h3" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold", textAlign:"center"}} gutterBottom justify="center" >
                                    {opcion.totalBeneficiarios}
                                    </Typography>                                     
                                    <Typography variant="h5" style={{color: 'black', margin: 40,justify:"center" , textAlign:"center"}} gutterBottom justify="center" >
                                         Total
                                    </Typography>                           
                                </Grid>                                
                            ))}
                            {cronograma.map(opcion=> (
                                <Grid container direction="row" >
                                    <Typography variant="h4" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold", textAlign:"center"}} gutterBottom justify="center" >
                                    {opcion.totalMujeres}
                                    </Typography>                                     
                                    <Typography variant="h5" style={{color: 'black', margin: 30,justify:"center" , textAlign:"center"}} gutterBottom justify="center" >
                                         Mujeres
                                    </Typography>                           
                                </Grid>                                
                            ))
                            } 
                             {cronograma.map(opcion=> (
                                <Grid container direction="row" >
                                    <Typography variant="h4" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold", textAlign:"center"}} gutterBottom justify="center" >
                                    {opcion.totalHombres}
                                    </Typography>                                     
                                    <Typography variant="h5" style={{color: 'black', margin: 30,justify:"center" , textAlign:"center"}} gutterBottom justify="center" >
                                         Hombres
                                    </Typography>                           
                                </Grid>                                
                            ))
                            } 


                        
                    </CardContent> */}
                    {/* <CardActions>
                        <Button size="small"> Total de Beneficiarios</Button>
                    </CardActions> */}
                 {/* </Card>
                    {/* Card de Lugares de Entrega */}
                {/*    <Card className={classes.root} variant="outlined">
                    <CardContent>
                     <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Lugares de entrega
                        </Typography>                
                                      
                                {cronograma.map(opcion=> (
                                <Grid container direction="row" >
                                    <Typography variant="h3" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold", textAlign:"center"}} gutterBottom justify="center" >
                                    {opcion.totalLugares}
                                    </Typography>                                     
                                    <Typography variant="h5" style={{color: 'black', margin: 40,justify:"center" , textAlign:"center"}} gutterBottom justify="center" >
                                         Total
                                    </Typography>                           
                                </Grid>                                
                            ))}
                            {cronograma.map(opcion=> (
                                <Grid container direction="row" >
                                    <Typography variant="h4" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold", textAlign:"center"}} gutterBottom justify="center" >
                                    {opcion.totalActivo}
                                    </Typography>                                     
                                    <Typography variant="h5" style={{color: 'black', margin: 30,justify:"center" , textAlign:"center"}} gutterBottom justify="center" >
                                         Activos
                                    </Typography>                           
                                </Grid>                                
                            ))
                            } 
                             {cronograma.map(opcion=> (
                                <Grid container direction="row" >
                                    <Typography variant="h4" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold", textAlign:"center"}} gutterBottom justify="center" >
                                    {opcion.totalQuejas}
                                    </Typography>                                     
                                    <Typography variant="h5" style={{color: 'black', margin: 30,justify:"center" , textAlign:"center"}} gutterBottom justify="center" >
                                         Quejas
                                    </Typography>                           
                                </Grid>                                
                            ))
                            } 


                        
                    </CardContent> */}
                    {/* <CardActions>
                        <Button size="small"> Total de Beneficiarios</Button>
                    </CardActions> */}
                {/* </Card> */}


            </Grid>

            )

        


    return (
        <div style={{minHeight:"88vh"}}>
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

            <div className='Contenedor'>
                <Container style={{margin: 10, boxShadow: 'none'}}>
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={12} justify="center">                            
                            <Typography variant="h5"  gutterBottom justify="center" >
                                    {/* <Pie chartData={chartDataEntregados}  md={6} nameTitle="Bonos Entregados" legendPosition="bottom"/>
                                    <Bar chartData={chartDataEntregados}  md={6} nameTitle="Bonos Entregados" legendPosition="bottom"/>
                                    <Line chartData={chartDataEntregados} md={10} nameTitle="Bonos Entregados" legendPosition="bottom"/>
                         */}
                         {respuesta}
                            </Typography>
                        </Grid>
                    </Grid>
                   
                </Container>

            </div>

        </div>
    );


}
export default Monitoreo;



  
/*


*/