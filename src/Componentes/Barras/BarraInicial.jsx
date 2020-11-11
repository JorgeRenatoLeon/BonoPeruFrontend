import {AppBar, Grid, Toolbar, Typography} from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

import { history } from "../../helpers/history";
import { logout } from "../../actions/auth";
import { clearMessage } from "../../actions/message";
import { Link } from 'react-router-dom';

function BarraInicial () {

    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    


    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  
    useEffect(() => {
      history.listen((location) => {
        dispatch(clearMessage()); // clear message when changing location
      });
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
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

    return (
        <div className={classes.root}>
            <AppBar position="relative" style={{background:"#B3E5FC"}}>
                <Toolbar>
                    <Typography variant="h5" color="inherit" noWrap>
                        BONO PERU
                    </Typography>
                    <Grid style={{marginLeft: 'auto'}}>
                        <Grid md={12} container item direction="row" justify="flex-end">
                            {showModeratorBoard && (
                            <Grid item style={{paddingLeft: 10}}>
                                <Link to={"/mod"} >
                                    Moderator Board
                                </Link>
                            </Grid>
                            )}

                            {showAdminBoard && (
                            <Grid item style={{paddingLeft: 10}}>
                                <Link to={"/admin"} >
                                Admin Board
                                </Link>
                            </Grid>
                            )}

                            {currentUser && (
                            <Grid item style={{paddingLeft: 10}}>
                                <Link to={"/user"} >
                                User
                                </Link>
                            </Grid>
                            )}

                            {currentUser ? (
                            <Grid item style={{paddingLeft: 10}}>
                                <Link to={"/profile"}>
                                    {currentUser.username}
                                </Link>
                                <Link to={"/acceso"} onClick={logOut} style={{paddingLeft: 10}}>
                                    LogOut
                                </Link>
                            </Grid>
                            ) : (
                            <Grid item style={{paddingLeft: 10}}>
                                <Link to={"/acceso"} >
                                    Login
                                </Link>
                            </Grid>
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