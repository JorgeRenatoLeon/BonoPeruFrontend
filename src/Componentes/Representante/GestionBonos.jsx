import React, {setState} from 'react'
import {  AppBar, Toolbar,Typography,  Container,TextField , InputBase, Paper} from "@material-ui/core"
 import { Grid, Button } from "@material-ui/core"
 import { Link } from "react-router-dom"
 import axios from "axios";
//Para el mensaje de confirmacion
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//Para el api
 import { useEffect,useState } from "react";
import Cronograma from './Cronograma';
import { history } from "../../helpers/history";
import  ModalPublicar  from "./ModalPublicar";
import  ModalGenerar  from "./ModalGenerar";

import { makeStyles } from "@material-ui/core/styles";
import { textSpanContainsPosition } from 'typescript';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
function formato(texto){
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
  }
  function formatoInverso(texto){ //Transformo desde DD/MM/AAAA a AAAA-MM-DD
    console.log(texto);
    var i=texto.indexOf('/',1); //Comienza desde 0
    console.log(i);
    var dia=texto.substring(0,i); 
        if(dia<10) dia="0"+dia;
    var j=(texto.substring(i+1,texto.length)).indexOf('/',1); //Comienza desde 0
    var mes=(texto.substring(i+1,texto.length)).substring(0,j); 
        if(mes<10) mes="0"+mes;
    var anio=(texto.substring(i+1,texto.length)).substring(j+1,texto.length);

    return anio +"-"+mes+"-"+dia;
  }
//   Rpta se utiliza para escribir  html en javascript
  const rpta = [
    { id: 'Respuesta',  label: 'Respuesta' },
   
  ];
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: "0px 0px",
      display: "flex",
      alignItems: "center",
      width: 150,
      borderRadius:100,
      margin:0
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
 
    
  }));
   const API_URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/cronograma/resumencronograma";//Caro  
  const ARI_URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/cronograma/generarcronograma";//Ari
  
  //const ARI_URL = "http://localhost:8084/api/cronograma/generarcronograma";//Ari
  //const API_URL = "http://localhost:8084/api/cronograma/resumencronograma";//Caro  
  


  var updateCronograma=false;
  var yaSeGeneroCronograma=false;

 function GenerarCronograma(){
     //Desactivo el botón de Generar Cronograma
        updateCronograma=true; 
            const soloFecha = JSON.parse(localStorage.getItem("soloFecha")) ;    //La hemos obtenido 
            const soloNombre = JSON.parse(localStorage.getItem("soloNombre")) ;    //La hemos obtenido 
            const idUsuario= JSON.parse(localStorage.getItem("user")).id;

            console.log('idUsuario: ',idUsuario);
            
            if(soloNombre!=="" && soloFecha!=="" ){
                const params=     {
                    nombre:soloNombre, 
                    fechaini:formatoInverso(soloFecha), //AAAA-MM-DD
                    fechafin:"",
                    usuariocreacion:idUsuario,
            }
                console.log('params',params);
                //   API de Ari
              axios.post(ARI_URL,params)
              .then(response =>{
                  console.log("ARI url ",response.data);
                  let apiCronograma = [];
                  apiCronograma.push(response.data);
                  localStorage.setItem("Gcronograma", JSON.stringify(response.data));
                  history.push('/bonos'); //No hace push :(
                  yaSeGeneroCronograma=true;
                  localStorage.setItem("openConf", JSON.stringify(true));
                 
              })
              .catch(() => {
                localStorage.setItem("openConf", JSON.stringify(true));
                  console.log('Error al obtener Cronograma generado')
              });
            }
            else {
                localStorage.setItem("openConf", JSON.stringify(true));
                console.log('else: ');
               
            }
           
 }    


function guardarFecha(event){
    //Guarda la fecha cuando hay un cambio
    localStorage.setItem("soloFecha",JSON.stringify(event)); 
    // console.log('e: ',event);
}
function guardarNombre(event){
    //Guarda el nombre cuando hay un cambio
    localStorage.setItem("soloNombre",JSON.stringify(event)); 
    // console.log('e: ',event);
}
const handleOpenConfirmacion = (event, reason) => {
    // setOpenConfirmacion(true);
    localStorage.setItem("openConf", JSON.stringify(true));
};

const handleCloseConfirmacion = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    // setOpenConfirmacion(false);
    localStorage.setItem("openConf", JSON.stringify(false));
};
//  path: /bonos
function GestionBonos (props) {
  //useState devuelve 2 valores, en la pos 0, devuelve  el valor, y el la pos 1, devuelve una función
          const classes = useStyles();

          //Manejo de mensajes de confirmacion
        const [openConfirmacion, setOpenConfirmacion] = useState(false);
        localStorage.setItem("openConf", JSON.stringify(openConfirmacion));
                 
        //Fin de manejo de mensajes
        var respuesta;
        const [fechaInicioAux,setFechaIni] = useState("2020-11-20");
        const [fechaFinAux, setFechaFin] = useState("2020-12-10");
        const [idcronograma,setIdCronograma] =useState(2);
        const [cronograma,setCronograma]=useState([{    
                                "beneficiarios": "Cargando...",
                                "fechaini": "",
                                "idcronograma": "inicial",
                                "lugares": "Cargando...",
                                "fechafin": ""

        }]); //Set cronograma, creando y un estado de toda la función
        
        updateCronograma=false;
        localStorage.setItem("soloNombre",JSON.stringify("Bono")); 
       
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
                   
                        setCronograma(ArrcronogramaNulo);
                        
                    }
                 });                 
                }
            },  [])
           
       
       // console.log('cronograma:',cronograma);

        var titulo="Gestión de Bonos";
        
        var botones;
        console.log("API OBT cro2: ",cronograma);
        if(updateCronograma===true){
            const confirmacion = JSON.parse(localStorage.getItem("openConf")) ;    //La hemos obtenido 
            setOpenConfirmacion(confirmacion);
            console.log(confirmacion);
             botones=rpta.map((boton) =>   
                        <Grid key={boton.index}  container direction="row" justify="center">
                          <Grid container item md={3} justify="center">                                
                                    <Button variant="contained" size="medium" color="primary" onClick={GenerarCronograma} >
                                        Generar Cronograma 
                                    </Button>
                              
                                  <Snackbar open={confirmacion} autoHideDuration={3000} onClose={handleCloseConfirmacion} anchorOrigin={{ vertical: "top", horizontal: "center" }} key={"topcenter"}>
                                    <Alert open={confirmacion} onClose={handleCloseConfirmacion} severity="success">
                                        Generación exitosa
                                        </Alert>
                                    </Snackbar>
                            </Grid> 
                            <Grid container item md={3} justify="center">                                
                                    <Button variant="contained" size="medium" color="secondary" >
                                        Regresar
                                    </Button>                             
                            </Grid>
                        </Grid>
                            
                    );

            
        }
        var f = new Date();
        var dd = f.getDate()+1;//Mañana
        var mm = f.getMonth()+1; 
        if(dd<10)           dd='0'+dd;
        if(mm<10)           mm='0'+mm;
        var escribePantalla=     {
            nombre:"Bono", //<3
            FechaInicio:dd+ "/" + mm+ "/" + f.getFullYear(), //AAAA-MM-DD
        }
        localStorage.setItem("soloFecha",JSON.stringify(escribePantalla.FechaInicio)); 
        if( cronograma[0].idcronograma==="" ){//entra por el api-no hay cronograma
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
                     <Grid container direction="row" item md={4} style={{paddingTop: '7px'}}>
                            <Typography variant="subtitle2" color="inherit" >
                                {'Nombre del Cronograma: '}
                            </Typography>
                      </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} >
                            <Paper component="form"  className={classes.root}>
   
                                <InputBase
                                    className={classes.input}
                                     placeholder= {"Escriba el nombre de un bono"}                                
                                    style={{padding:0 }}
                                    inputProps={{ "aria-label": "Escriba un nombre" }}
                                    defaultValue={escribePantalla.nombre}
                                    onChange={e =>guardarNombre(e.target.value)}
                                />
                             </Paper>                              
                        </Grid>

                        )) }


                </Grid>

                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                     <Grid container direction="row" item md={4} style={{paddingTop: '7px'}}>
                            <Typography variant="subtitle2" color="inherit" >
                                {'Fecha de inicio de reparto: '}
                            </Typography>
                      </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} >
                            {/* Manejo de input TEXT FIELD para que pongamos un cronograma -
                               enviar por params la fecha de inicio, el id mio
                            */}
                            {/* <TextField className="inputRounded" id="outlined-basic" label={null} variant="outlined" /> */}
                            <Paper component="form"  className={classes.root}>
   
                                <InputBase
                                    className={classes.input}
                                     placeholder= {"Escriba una fecha  DD/MM/AAAA"}                                
                                    style={{padding:0 }}
                                    inputProps={{ "aria-label": "Escriba una fecha" }}
                                    defaultValue={escribePantalla.FechaInicio}
                                    onChange={e =>guardarFecha(e.target.value)}
                                />
                             </Paper>
                               {/* <Typography variant="subtitle2" color="inherit">
                                    {opcion.fechaini?opcion.fechaini:"Por definir"}
                            </Typography> */}
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
            // const confirmacion = JSON.parse(localStorage.getItem("openConf")) ;    //La hemos obtenido 
            // setOpenConfirmacion(confirmacion);
            // console.log(confirmacion);
            // botones de cuando no hay un cronograma generado
                botones=rpta.map((boton) =>   
                        <Grid key={boton.index}  container direction="row" justify="center">
                            <Grid container item md={3} justify="center">                                
                                    <Button variant="contained" size="medium" color="primary" onClick={GenerarCronograma} >
                                        Generar Cronograma 
                                    </Button>   
                                    <Snackbar open={openConfirmacion} autoHideDuration={3000} onClose={handleCloseConfirmacion} anchorOrigin={{ vertical: "top", horizontal: "center" }} key={"topcenter"}>
                                    <Alert open={openConfirmacion} onClose={handleCloseConfirmacion} severity="success">
                                        Generación exitosa
                                        </Alert>
                                    </Snackbar>                    
                            </Grid>
                            <Grid container item md={3} justify="center">                                
                                    <Button variant="contained" size="medium" color="secondary" >
                                        Regresar
                                    </Button>                             
                            </Grid>
                        </Grid>
                            
                    );
            
        
         
          
        }
        
        else if (cronograma[0].idcronograma!==""  && cronograma[0].idcronograma!=="inicial" ){//Existe un id
            
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
                                <ModalPublicar></ModalPublicar>
                            </Grid>
                        </Grid>
                    );
            }
            else{
                const confirmacion = JSON.parse(localStorage.getItem("openConf")) ;    //La hemos obtenido 
                setOpenConfirmacion(confirmacion);
                console.log(confirmacion);
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
                                {'Nombre del Cronograma:  '}
                            </Typography>
                      </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} >
                            <Typography variant="subtitle2" color="inherit">
                                    {/* Cambiaría y sería por el nombre */}
                                    {opcion.nombre}
                            </Typography>
                        </Grid>

                        )) }
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
        else  if ( cronograma[0].idcronograma==="inicial" ){           
         respuesta="Cargando..."
     }
    
    //     if(confirmacion==="true")   setOpenConfirmacion(true)
    //     else setOpenConfirmacion(false);
  
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