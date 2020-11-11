import React, { Component } from 'react'
import { Grid, Button, AppBar, Toolbar, Typography, Container } from "@material-ui/core"
import { Link } from "react-router-dom"
import '../assets/css/FondoBeneficiario.css'
function PantallaInicial () {
    
    return (
        <div>
            <div className='Fondo'>
                {/* nombre */}
                <AppBar position="relative" style={{background: 'transparent', boxShadow: 'none'}}>
                    <Toolbar>
                        <Typography variant="h5" style={{color: 'white'}} noWrap>
                            BONO PERU
                        </Typography>
                    </Toolbar>
                </AppBar>
                {/* <h1 style={{color: 'black', margin: 0,padding: 50}}>Consulte su Bono</h1> */}
                             
                    
                {/* Título */}
                 <Grid container direction="row" justify="center">
                    <Grid container item xs={12} justify="center">
                        <Typography variant="h2"  gutterBottom justify="center" >
                            <h3 style={{color: 'black', margin: 0,justify:"center",padding: 50 }}>Consulte su Bono</h3>
                        </Typography> 
                    </Grid>                                                  
                </Grid>             
                   {/* botones */}
                <Grid container direction="row" justify="center">
                    <Grid container item md={2} justify="center">
                        <Link to='/'>
                            <Button variant="contained" size="small" color="primary">
                                Sin AppBar
                            </Button>
                        </Link>
                    </Grid>
                    <Grid container item md={2} justify="center">
                        <Link to='/home'>
                            <Button variant="contained"  size="small" color="secondary">
                                Con AppBar
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="center">
                    <Grid container item md={2} justify="center">
                        <Link to='/'>
                            <Button variant="contained" size="small" color="primary">
                                Soy Beneficiario
                            </Button>
                        </Link>
                    </Grid>
                    <Grid container item md={2} justify="center">
                        <Link to='/consulta'>
                            <Button variant="contained"  size="small" color="secondary">
                                No Soy Beneficario
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
            {/* contenedor clásico, fondo blanco redondeado */}
            <div className='Contenedor'>
                <Container style={{margin: 100}}>
                    <h1 color="inherit">Preguntas</h1>
                    <h4 color="inherit">Pregunta 1</h4>
                    <h4 color="inherit">Pregunta 2</h4>
                    <h4 color="inherit">Pregunta 3</h4>
                    <h4 color="inherit">Pregunta 4</h4>
                </Container>
            </div>
        </div>
    );
    
}
export default PantallaInicial;
