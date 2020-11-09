import React from 'react'
import {AppBar, Toolbar, Typography} from '@material-ui/core';
function BarraInicial () {
    return (
        <AppBar position="relative" style={{background:"#B3E5FC"}}>
            <Toolbar>
                <Typography variant="h5" color="inherit" noWrap>
                    BONO PERU
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
export default BarraInicial;