import {AppBar, Grid, SvgIcon, Toolbar, Typography} from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom'

import { history } from "../../helpers/history";
import { logout } from "../../actions/auth";
import { clearMessage } from "../../actions/message";
import { Link } from 'react-router-dom';

function BarraInicial () {

    const { user: currentUser } = useSelector((state) => state.auth);

    const [admin, setAdmin] = useState(false);
    const [representante, setRepresentante] = useState(false);

    const location = useLocation();

    const dispatch = useDispatch();
  
    useEffect(() => {
      history.listen((location) => {
        dispatch(clearMessage()); // clear message when changing location
      });
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setAdmin(currentUser.roles.includes("ROLE_ADMIN"));
            setRepresentante(currentUser.roles.includes("ROLE_REPRESENTANTE"));
        }
      }, [currentUser]);

    const logOut = () => {
      dispatch(logout());
    };


    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
          flexGrow: 1,
        },
    }));

    const classes = useStyles();

    const tabsRepresentante = [
                            // {nombre: 'Cargar Datos', path: '/cargar'},
                            {id: 0, nombre: 'Lugares de Entrega', path: '/lugaresentrega'},
                            {id: 1, nombre: 'Gestión de Bonos', path: '/bonos'},
                            {id: 2, nombre: 'Monitoreo', path: '/monitoreo'},
                            {id: 3, nombre: 'Reportes', path: '/reportes'},
                            {id: 4, nombre: 'Preguntas Frecuentes', path: '/preguntasfrecuentes'}]
    const tabsAdmin = [
                        {id: 0, nombre: 'Gestión de Bonos', path: '/bonos'},
                        // {nombre: 'Reportes', path: '/reportes'},
                        {id: 1, nombre: 'Monitoreo', path: '/monitoreo'},
                        {id: 2, nombre: 'Encuestas', path: '/encuesta'},
                        {id: 3, nombre: 'Usuarios', path: '/usuarios'}]

    const AdminTabs = 
        admin ? 
            (tabsAdmin.map(tab =>
                    <Grid key={tab.id} item style={{paddingLeft: 10}} align="center">
                        <Link to={tab.path} style={{textDecoration: 'none', color:'black', fontWeight: (location.pathname===tab.path?'bold':'normal')}}>
                            {tab.nombre}
                        </Link>
                    </Grid>
                ))
            :
            (<Grid></Grid>)

    const RepresentanteTabs = 
        representante ? 
            (tabsRepresentante.map(tab =>
                    <Grid item style={{paddingLeft: 10}} align="center">
                        <Link to={tab.path} style={{textDecoration: 'none', color:'black', fontWeight: (location.pathname===tab.path?'bold':'normal')}}>
                            {tab.nombre}
                        </Link>
                    </Grid>
                ))
            :
            (<Grid></Grid>)

    return (
        <div className={classes.root}>
            <AppBar position="relative" style={{background:"#B3E5FC"}}>
                <Toolbar>
                    <Typography variant="h5" color="inherit" noWrap>
                        BONO PERU
                    </Typography>
                    <Grid style={{marginLeft: 'auto'}}>
                        <Grid md={12} container item direction="row" justify="flex-end" alignContent="flex-end">
                            {AdminTabs}
                            {RepresentanteTabs}
                            {currentUser ? (
                                <Grid item style={{paddingLeft: 10}} align="center">
                                    <Link to={"/profile"} style={{textDecoration: 'none', color:'black'}}>
                                        {currentUser.username}
                                    </Link>
                                </Grid>
                            ) : (
                                <Grid></Grid>
                            )
                            }
                            {currentUser ? (
                                <Grid item style={{paddingLeft: 10}}>
                                    <Link to={"/acceso"} onClick={logOut} style={{paddingLeft: 10,marginTop: -3, height: 'auto',display: 'flex', color:'black'}}>
                                        <SvgIcon color="inherit">
                                            <path d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
                                        </SvgIcon>
                                    </Link>
                                </Grid>
                            ) : (
                                <Grid></Grid>
                            )
                            }
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default BarraInicial;