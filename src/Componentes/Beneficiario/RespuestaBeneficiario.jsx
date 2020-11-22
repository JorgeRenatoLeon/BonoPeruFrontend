import React from 'react'
import {  AppBar, Toolbar,  Container} from "@material-ui/core"
 import { Grid, Button } from "@material-ui/core"
 import { Link } from "react-router-dom"


 import { useEffect,useState } from "react";
import { history } from "../../helpers/history";

//  path: /consulta

function RespuestaBeneficiario (props) { 
  //useState devuelve 2 valores, en la pos 0, devuelve  el valor, y el la pos 1, devuelve una función
        const [cronograma,setCronograma]=useState([]); //Set cronograma, creando y un estado de toda la función
   
            useEffect((cronograma) => {
               
                console.log('apiBeneficiario',JSON.parse(localStorage.getItem("beneficiario")) );    //La hemos obtenido             
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
        var respuesta;
        if(cronograma.length===0){
          respuesta=  "No hay un bono asignado a esta familia. Verifique que lo ha ingresado correctamente. ";
        }
        else if (cronograma.length===1){

            respuesta=  "Usted sí es beneficiario. Puede recoger su bono el día " + cronograma[0].fecha + " en " + cronograma[0].horariolugarentrega.lugarentrega.direccion;
        }
       
    
        
    return (
        <div>
           
                      
                <AppBar position="relative" style={{background: 'transparent', boxShadow: 'none'}}>
                    <Toolbar>
                        <Grid container direction="row" justify="center">
                            <Grid container item xs={12} justify="center">
                        
                                {/* <Typography variant="h3"  gutterBottom justify="center" >
                                     <h3 style={{color: 'black', margin: 20,justify:"center" }}>Información</h3>
                                     
                                </Typography>  */}
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
                                <button>
                                    Prueba
                                </button>
                                </Link> */}

                                
                                {/* <h1 style={{color: 'black', margin: 0,padding: 30}}>Información</h1>  */}
                                <h2 > { respuesta } </h2>
                                     
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

