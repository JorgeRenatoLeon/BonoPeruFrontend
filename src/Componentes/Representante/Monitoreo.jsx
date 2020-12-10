import React from 'react'
import {  AppBar, Toolbar,Typography,  Container} from "@material-ui/core"
 import { Grid, Button } from "@material-ui/core"
//  import { Link } from "react-router-dom"
 import Chart from "../../Componentes/Graficos/Chart.js"
 import Line from "../../Componentes/Graficos/Line.js"
 import Bar from "../../Componentes/Graficos/Bar.js"
 import Pie from "../../Componentes/Graficos/Pie.js"

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



    const ENTREGADOS = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/cronograma/monitoreoentregabono";
    const TOTALES = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/cronograma/reportebeneficiarios";
   //const ENTREGADOS = "http://localhost:8084/api/cronograma/monitoreoentregabono";
    //const TOTALES = "http://localhost:8084/api/cronograma/reportebeneficiarios";

    //fin del chart reporte  
  //  path: /monitoreo
  var isResponse=false;
 function Monitoreo (props) {
  //useState devuelve 2 valores, en la pos 0, devuelve  el valor, y el la pos 1, devuelve una función
  var labels= ["23-11-2020", "25-11-2020", "08-12-2020"];
  var data=[0, 1, 2];
  var pie;
  // apiEntregados();
        const [cronograma,setCronograma]=useState([]); //Set cronograma, creando y un estado de toda la función
        const [datosEntregados,setdatosEntregados]=useState([]); //Set cronograma, creando y un estado de toda la función
        const [datosIndicadores,setdatosIndicadores]=useState([]); //Set cronograma, creando y un estado de toda la función
        // const [isResponse,setisResponse]=useState([]); //Set cronograma, creando y un estado de toda la función
       // useEffect((datosEntregados) => {   
         
        //  setisResponse(false);
        useEffect((datosEntregados)=>{

              const apiEntregados=async () => {   
                const response = await axios.post(ENTREGADOS).then();
                // console.log('rpta api.data: ',response.data);
                if(response!==undefined && isResponse===false ){
                  isResponse=true;
                  const chartDataEntregadosASYNC={
                    //labels: response.data.listaFechas,
                    labels: labels,
                    datasets:[
                      {
                        label:'Bonos Entregados',
                        // data:response.data.listaCantidades,
                        data:data, //Valor truncado
                        backgroundColor:backgroundColor,
                      }
                    ]};
                    
                  
                  console.log('chartDataEntregadosASYNC',chartDataEntregadosASYNC);
                  let api=[];
                  api.push(chartDataEntregadosASYNC);
                  
                  if(api!==undefined){
                    console.log('datosEntregados antes set',datosEntregados);
                    setdatosEntregados(api);
                    console.log('api',api);
                    console.log('datosEntregados deps set',datosEntregados);
                  }
                 
                }
              
                
                // console.log(this.state.chartData);
              }
        apiEntregados();
        },[]);

        console.log('datosEntregados async dsps api',datosEntregados);
            if(datosIndicadores===undefined || datosIndicadores.length===0)            
                axios.post(TOTALES)
                .then(response =>{                    
                    let api=[];
                    api.push(response.data)   ;               
                    setdatosIndicadores(api);
                    
                })
                .catch(() => {
                    console.log('Error al obtener Entregados');
                });
             var titulo="Monitoreo";
            var respuesta;
            const classes = useStyles();
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
            respuesta= rpta.map((rpta,index)   =>
            <Grid key={rpta.id} container  justify="center">
               <Line chartData={datosEntregados} md={10} nameTitle="Bonos Entregados" legendPosition="bottom"/>
               {/* <apiData></apiData> */}
               <Pie chartData={datosEntregados}  md={12} nameTitle="Bonos Entregados" legendPosition="bottom"/>
                 {/* { datosEntregados===undefined? "a": ":("} */}
                <Bar chartData={chartDataEntregados} md={12} nameTitle="Bonos Entregados" legendPosition="bottom"/>
              <Card className={classes.root} variant="outlined">
                    <CardContent>
                     <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Beneficiarios
                        </Typography>                
              
                                {/* {datosIndicadores.map(opcion=> (
                                <Grid container direction="row" >
                                    <Typography variant="h3" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold", textAlign:"center"}} gutterBottom justify="center" >
                                    {opcion.totalBeneficiarios}
                                    </Typography>                                     
                                    <Typography variant="h5" style={{color: 'black', margin: 40,justify:"center" , textAlign:"center"}} gutterBottom justify="center" >
                                         Total
                                    </Typography>                           
                                </Grid>                                
                            ))} */}
                            {datosIndicadores.map(opcion=> (
                                <Grid container direction="row" >
                                    <Typography variant="h4" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold", textAlign:"center"}} gutterBottom justify="center" >
                                    {opcion.cantmujeres}
                                    </Typography>                                     
                                    <Typography variant="h5" style={{color: 'black', margin: 30,justify:"center" , textAlign:"center"}} gutterBottom justify="center" >
                                         Mujeres
                                    </Typography>                           
                                </Grid>                                
                            ))
                            } 
                             {datosIndicadores.map(opcion=> (
                                <Grid container direction="row" >
                                    <Typography variant="h4" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold", textAlign:"center"}} gutterBottom justify="center" >
                                    {opcion.canthombres}
                                    </Typography>                                     
                                    <Typography variant="h5" style={{color: 'black', margin: 30,justify:"center" , textAlign:"center"}} gutterBottom justify="center" >
                                         Hombres
                                    </Typography>                           
                                </Grid>                                
                            ))
                            } 
                                {datosIndicadores.map(opcion=> (
                                <Grid container direction="row" >
                                    <Typography variant="h4" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold", textAlign:"center"}} gutterBottom justify="center" >
                                    {opcion.cantdisc}
                                    </Typography>                                     
                                    <Typography variant="h5" style={{color: 'black', margin: 30,justify:"center" , textAlign:"center"}} gutterBottom justify="center" >
                                         Discapacitados
                                    </Typography>                           
                                </Grid>                                
                            ))
                            } 
                               {datosIndicadores.map(opcion=> (
                                <Grid container direction="row" >
                                    <Typography variant="h4" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold", textAlign:"center"}} gutterBottom justify="center" >
                                    {opcion.cantquejas}
                                    </Typography>                                     
                                    <Typography variant="h5" style={{color: 'black', margin: 30,justify:"center" , textAlign:"center"}} gutterBottom justify="center" >
                                    Quejas
                                    </Typography>                           
                                </Grid>                                
                            ))
                            } 


                        
                    </CardContent>
                    {/* <CardActions>
                        <Button size="small"> Total de Beneficiarios</Button>
                    </CardActions> */}
                 </Card>
                    {/* Card de Lugares de Entrega */}
                {/* <Card className={classes.root} variant="outlined">
                    <CardContent>
                     <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Lugares de entrega
                        </Typography>                
                                      
                                {datosIndicadores.map(opcion=> (
                                <Grid container direction="row" >
                                    <Typography variant="h3" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold", textAlign:"center"}} gutterBottom justify="center" >
                                    {opcion.totalLugares}
                                    </Typography>                                     
                                    <Typography variant="h5" style={{color: 'black', margin: 40,justify:"center" , textAlign:"center"}} gutterBottom justify="center" >
                                         Total
                                    </Typography>                           
                                </Grid>                                
                            ))}
                            {datosIndicadores.map(opcion=> (
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
                             {datosIndicadores.map(opcion=> (
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


                        
                    </CardContent> 
                   
               </Card> */}


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
