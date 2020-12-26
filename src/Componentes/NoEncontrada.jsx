import React from 'react'

import { Grid, Typography } from '@material-ui/core'
import '../assets/css/NoEncontrada.css';

function NoEncontrada (props) {
    return (
        <Grid className="mainbox" style={{backgroundColor: "#95c2de", minHeight: "100vh", minwidth: "199vh"}} container alignItems="center">
            <Grid container item direction="row" justify="center">
                <Grid item><Typography variant="h1" style={{color:"white", fontSize: "10rem"}}>4</Typography></Grid>
                <Grid item style={{paddingTop:"1%"}}><i className="far fa-question-circle fa-spin"></i></Grid>
                <Grid item><Typography variant="h1" style={{color:"white", fontSize: "10rem"}}>4</Typography></Grid>
            </Grid>
            <Grid item container direction="column" className="msg" style={{marginTop: "-25%"}}>
                <Grid item>
                    <Typography variant="h3" style={{color:"white"}} >
                        No se encontró la página que buscaba
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h4" style={{color:"white"}}>
                        Regresemos al <a href="/">inicio</a> e intentemos desde allí.
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default NoEncontrada