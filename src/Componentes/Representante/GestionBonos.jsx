import React, {setState} from 'react'
import {  AppBar, Toolbar,Typography,  Container,TextField } from "@material-ui/core"
 import { Grid, Button } from "@material-ui/core"
 import { Link } from "react-router-dom"
 import axios from "axios";

//Para el api
 import { useEffect,useState } from "react";
import Cronograma from './Cronograma';
import { history } from "../../helpers/history";

function formato(texto){
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
  }
  const rpta = [
    { id: 'Respuesta',  label: 'Respuesta' },
   
  ];
  const ARI_URL = "http://localhost:8084/api/cronograma/generarcronograma";

//   cronograma ya generado
  /*
  var Arrcronograma = [{ fechaini:"2020-11-28", 
                         fechafin:"2020-12-15",
                         beneficiarios:1024,
                         lugares:32,                       
                        
                        }]
                        
*/
    // cronograma no iniciado
 // /*    
  
 //*/   
  var updateCronograma=false;
 function GenerarCronograma(){
        updateCronograma=true; 
   
       // useEffect((cronograma) => {
         //   if(cronograma===undefined || cronograma.length===0){

                 //   setCronograma(Arrcronograma);
            const params=     {
                    nombre:"BonoSoloJoh", //<3
                    fechaini:"2020-12-3", //AAAA-MM-DD
                    fechafin:"",
                    usuariocreacion:1
            }

              //   API de Ari
            axios.post(ARI_URL,params)
            .then(response =>{
                console.log("ARI url ",response.data);
                 let apiCronograma = [];
                 apiCronograma.push(response.data)
                 if(apiCronograma){
                     //setCronograma(apiCronograma);
                     localStorage.setItem("Gcronograma", JSON.stringify(apiCronograma));
                     history.push('/bonos');
                 }
                updateCronograma=true;
            })
            .catch(() => {
                console.log('Error al obtener Cronograma generado')
            });
        


          //  }
        //},  [])


 }    
  
 const API_URL = "http://localhost:8084/api/cronograma/resumencronograma";

 var rptaAPI;
 
//  path: /bonos
function GestionBonos (props) {
  //useState devuelve 2 valores, en la pos 0, devuelve  el valor, y el la pos 1, devuelve una función
        //  const classes = useStyles();
        var respuesta;
        const [fechaInicioAux,setFechaIni] = useState("2020-11-20");
        const [fechaFinAux, setFechaFin] = useState("2020-12-10");
        const [idcronograma,setIdCronograma] =useState(2);
        const [cronograma,setCronograma]=useState([{    
                                "beneficiarios": 0,
                                "fechaini": "",
                                "idcronograma": "",
                                "lugares": 0,
                                "fechafin": ""

        }]); //Set cronograma, creando y un estado de toda la función
        updateCronograma=false;
            useEffect((cronograma) => {

                //Para que se actualice y mande a la pantalla principal
                if(cronograma===undefined || cronograma.length===0){

                // /*     API API API API API
                 axios.post(API_URL)
                 .then(response =>{
                     console.log("API OBT : ",response.data);
                     if(response){
                        
                        localStorage.setItem("cronogramaKaytlin", JSON.stringify(response.data)); //apenas lo recibo te lo envío
                        let apiCronograma = [];
                        apiCronograma.push(response.data);
                        
                        if(apiCronograma){
                            setCronograma(apiCronograma);
                            console.log("API OBT cro: ",apiCronograma);
                            if(apiCronograma[0].idcronograma===""){
                                updateCronograma=true;
                            }
                            
                        }
                        
                     }
                     
                     //setCronograma(Arrcronograma);
                 })
                 .catch((e) => {
                     console.log('Error al obtener Monitoreo',e);
                     respuesta="No se ha podido cargar el cronograma. Vuelva a intentarlo en unos minutos";
                     if (cronograma===null){
                        //Salio del catch de Caro problablemente
                        var ArrcronogramaNulo = [{ 
                            fechaini:"", 
                            fechafin:"",
                            beneficiarios:"",//Vendrán null
                            lugares:"",      //Vendrán null              
                
                        }];
                        /*
                        {
                                "beneficiarios": 3,
                                "fechaini": "",
                                "idcronograma": "",
                                "lugares": 0,
                                "fechafin": ""
                            }

                        */
                        setCronograma(ArrcronogramaNulo);
                        
                    }
                 });
                // */


                 }
            },  [])

       // console.log('cronograma:',cronograma);

        var titulo="Gestión de Bonos";
       
        var botones;
        
        if(updateCronograma===true){
             let apiCronograma = [];
             const cronGuardado = JSON.parse(localStorage.getItem("Gcronograma")) ;    //La hemos obtenido 
             apiCronograma.push(cronGuardado)
             if(apiCronograma){
                 setCronograma(apiCronograma);
             }
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

        if(cronograma[0].idcronograma==="" ){
          respuesta=  "Cargando Cronograma...";
            
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
                            {/* Manejo de input TEXT FIELD para que pongamos un cronograma -
                               enviar por params la fecha de inicio, el id mio
                            */}
                            {/* <TextField className="inputRounded" id="outlined-basic" label={null} variant="outlined" /> */}
                            <Typography variant="subtitle2" color="inherit">
                                    {opcion.fechaini?opcion.fechaini:"Por definir"}
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
                            {opcion.fechafin? opcion.fechafin:"Por definir" }
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
                                {opcion.beneficiarios}
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
                                {opcion.lugares}
                            </Typography>
                        </Grid>
                     ))
                    }

                </Grid>

            </Grid>

            )
            // botones de cuando no hay un cronograma generado
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
        else if (cronograma[0].idcronograma!==""){

            //cambio de formato de Fecha-super no eficiente :(
            var formatoFecha;
            if(cronograma.length===1 && cronograma[0].fechaini !==null && cronograma[0].fechafin !==null){
                // console.log('fecha antes:', cronograma[0].fechaini);
               formatoFecha=formato( cronograma[0].fechaini); 
               cronograma[0].fechaini=formatoFecha;
               formatoFecha=formato( cronograma[0].fechafin);
               cronograma[0].fechafin=formatoFecha;
                botones=rpta.map((boton) =>   
                        <Grid key={boton.index}  container direction="row" justify="center">
                            <Grid container item md={3} justify="center">
                                <Link 
                                    to={{
                                        pathname: "/cronogramaParaRepresentante",
                                        state: { id: idcronograma,
                                          fechaini: fechaInicioAux,
                                          fechafin: fechaFinAux}
                                      }}
                                    style={{textDecoration:"none"}}>
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
                            {/* Manejo de input TEXT FIELD para que pongamos un cronograma -
                               enviar por params la fecha de inicio, el id mio
                            */}
                            {/* <TextField className="inputRounded" id="outlined-basic" label={null} variant="outlined" /> */}
                            <Typography variant="subtitle2" color="inherit">
                                    {opcion.fechaini?opcion.fechaini:"Por definir"}
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
                            {opcion.fechafin? opcion.fechafin:"Por definir" }
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
                                {opcion.beneficiarios}
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
                                {opcion.lugares}
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
                                <Typography variant="h3" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold"}} gutterBottom justify="center" >
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