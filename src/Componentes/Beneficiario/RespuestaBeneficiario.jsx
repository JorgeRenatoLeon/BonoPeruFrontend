import React from 'react'
import {  AppBar, Toolbar, Typography, Container} from "@material-ui/core"
 import { Grid, Button } from "@material-ui/core"
 import { Link } from "react-router-dom"


 import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchPokemons} from "../../actions/prueba";

//  path: /consulta

 function RespuestaBeneficiario (props) { 

    const {beneficiario} = useSelector(state => state.prueba);
     
    const dispatch =useDispatch();
    //useState devuelve 2 valores, en la pos 0, devuelve  el valor, y el la pos 1, devuelve una función
    const [pokemons,setPokemons]=useState([]);
    if(pokemons===undefined || pokemons.length===0){
        
        // console.log('rpta:', beneficiario);
        setPokemons(beneficiario);
        if(pokemons===undefined || pokemons.length===0){
          setPokemons([{name:"hi"}]);
        } 
      }
    return (
        <div>
           
                      
                <AppBar position="relative" style={{background: 'transparent', boxShadow: 'none'}}>
                    <Toolbar>
                        <Grid container direction="row" justify="center">
                            <Grid container item xs={12} justify="center">
                        
                                <Typography variant="h3"  gutterBottom justify="center" >
                                     <h3 style={{color: 'black', margin: 20,justify:"center" }}>Información</h3>
                                     
                                </Typography> 
                                {/* Para leer lo que traigo de beneficiario */}
                                {/* {beneficiario.map(pokemon=> (
                                    <Typography variant="h3"  gutterBottom justify="center" >
                                        {pokemon.name+" "+pokemon.url}
                                     </Typography>
                                ))}  */}

                              
                            </Grid>                                                  
                        </Grid>
                    </Toolbar>
                </AppBar>
            
            <div className='Contenedor'>
                <Container style={{margin: 10, boxShadow: 'none'}}>
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={12} justify="center">
                                {/* <h1 style={{color: 'black', margin: 0,padding: 30}}>Información</h1>  */}
                                <h2 >No hay un bono asignado a este código de familia. 
                                     Verifique que lo ha ingresado correctamente. </h2>
                                   
                        </Grid>      
                                         
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Grid container item md={2} justify="center">
                            <Link to='/' style={{textDecoration:"none"}}>
                                <Button variant="contained" size="small" color="secondary">
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

