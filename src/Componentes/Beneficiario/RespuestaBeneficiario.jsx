import React from 'react'
import {  AppBar, Toolbar,  Container} from "@material-ui/core"
 import { Grid, Button } from "@material-ui/core"
 import { Link } from "react-router-dom"


 import { useEffect,useState } from "react";
import { history } from "../../helpers/history";

//  path: /consulta

function RespuestaBeneficiario (props) { 
  //useState devuelve 2 valores, en la pos 0, devuelve  el valor, y el la pos 1, devuelve una función
        const [pokemons,setPokemons]=useState([]); //Set pokemons, creando y un estado de toda la función
   
            useEffect((pokemons) => {
               
                console.log('api',JSON.parse(localStorage.getItem("beneficiario")) );    //La hemos obtenido             
                const api = JSON.parse(localStorage.getItem("beneficiario")) ;    //La hemos obtenido             
                if(pokemons===undefined || pokemons.length===0){
                    if (api ===undefined || api===null) {
                        history.push('/'); //si no tengo pokemones ni item en beneficiario,lo mando a consutla
                    }
                    else{
                        setPokemons(api); 
                        localStorage.removeItem("beneficiario");                        
                    }
                   

                }
            },  [])
       
        console.log('pokemons:',pokemons);
        var respuesta;
        if(pokemons.length===0){
          respuesta=  "No hay un bono asignado a esta familia. Verifique que lo ha ingresado correctamente. ";
        }
        else if (pokemons.length===1){

            respuesta=  "Usted sí es beneficiario. Puede recoger su bono el día " + pokemons[0].fecha + " en " + pokemons[0].horariolugarentrega.lugarentrega.direccion;
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
                                     
                                {/* {pokemons.map(pokemon=> (
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

