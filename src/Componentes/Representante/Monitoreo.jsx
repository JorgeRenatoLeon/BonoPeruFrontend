import React from 'react'
import {  AppBar, Toolbar,Typography,  Container} from "@material-ui/core"
 import { Grid, Button } from "@material-ui/core"
//  import { Link } from "react-router-dom"
//  import Chart from "../../Componentes/Graficos/Chart.js"
 import { makeStyles } from '@material-ui/core/styles';
 import Card from '@material-ui/core/Card';
 import CardActions from '@material-ui/core/CardActions';
 import CardContent from '@material-ui/core/CardContent';
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

  
//  path: /monitoreo
function Monitoreo (props) {
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
        var titulo="Monitoreo";
            var respuesta;
            const classes = useStyles();
            const bull = <span className={classes.bullet}>•</span>;
        var      chartData={
                labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
                datasets:[
                  {
                    label:'Population',
                    data:[
                      617594,
                      181045,
                      153060,
                      106519,
                      105162,
                      95072
                    ],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)',
                      'rgba(255, 159, 64, 0.6)',
                      'rgba(255, 99, 132, 0.6)'
                    ]
                  }
                ]
              };
        
              //Todoooo la muestra del cronograma está manejado por respuesta
          
            respuesta= rpta.map((rpta,index)   =>
            <Grid key={rpta.id} container direction="col" justify="center">
                {/* <Grid container direction="row" item md={12} style={{paddingTop: '1.5vh'}}> */}
                   
                {/* <Chart chartData={chartData} location="JohanaLand" legendPosition="bottom"/> */}
               {/* Reporte de Beneficiarios */}

               <Card className={classes.root} variant="outlined">
                    <CardContent>
                     <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Beneficiarios
                        </Typography>                
                        {/* total de beneficiarios */}
                                {/* <Grid container direction="col" style={{ textAlign:"center"}}>
                                    {cronograma.map(opcion=> (
                                        <Grid container direction="col" >
                                            <Typography variant="h3" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold", textAlign:"center"}} gutterBottom justify="center" >
                                            {opcion.totalBeneficiarios}
                                            </Typography>
                                            <Typography variant="h3" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold", textAlign:"center"}} gutterBottom justify="center" >
                                            {opcion.totalBeneficiarios}
                                            </Typography>     
                                            <Typography variant="h5" style={{color: 'black', margin: 20,justify:"center" , textAlign:"center"}} gutterBottom justify="center" >
                                                Total2
                                            </Typography>                           
                                        </Grid>                                
                                    ))
                                     } 
                               
                                    <Typography variant="h5" style={{color: 'black', margin: 20,justify:"center" , textAlign:"center"}} gutterBottom justify="center" >
                                         Total
                                    </Typography>  
                                    <Typography variant="h5" style={{color: 'black', margin: 20,justify:"center" , textAlign:"center"}} gutterBottom justify="center" >
                                         Mujeres
                                    </Typography>            
                                </Grid>                        */}
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


                        
                    </CardContent>
                    {/* <CardActions>
                        <Button size="small"> Total de Beneficiarios</Button>
                    </CardActions> */}
                </Card>
                    {/* Card de Lugares de Entrega */}
                    <Card className={classes.root} variant="outlined">
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


                        
                    </CardContent>
                    {/* <CardActions>
                        <Button size="small"> Total de Beneficiarios</Button>
                    </CardActions> */}
                </Card>
 

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
                                { respuesta }
                            </Typography>
                        </Grid>
                    </Grid>
                   
                </Container>

            </div>
            <div>

            </div>
        </div>
    );


}
export default Monitoreo;



  
/*


*/