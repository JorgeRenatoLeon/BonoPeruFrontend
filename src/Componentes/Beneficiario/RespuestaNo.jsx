import React from 'react'
import {  AppBar, Toolbar, Typography, Container} from "@material-ui/core"
 import { Grid, Button } from "@material-ui/core"
 import { Link } from "react-router-dom"


function RespuestaNo () {
   

    return (
        <div>
            <div >                
                <AppBar position="relative" style={{background: 'transparent', boxShadow: 'none'}}>
                    <Toolbar>
                        <Grid container direction="row" justify="center">
                            <Grid container item xs={12} justify="center">
                        
                                <Typography variant="h3"  gutterBottom justify="center" >
                                     <h3 style={{color: 'black', margin: 20,justify:"center" }}>Información</h3>
                                </Typography> 
                              
                            </Grid>                                                  
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
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
export default RespuestaNo;

