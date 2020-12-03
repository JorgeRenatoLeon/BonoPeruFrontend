import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "0px 0px",
        display: "flex",
        alignItems: "center",
        width: 400,
        borderRadius: 100,
        margin: 20
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1
    },
    iconButton: {
        padding: 0,
        color: "white"
    },

}));

export default function Buscador(props) {
    const classes = useStyles();
    const mensaje = "Buscar usuario";

    const [searchTerm, setsearchTerm] = useState("");

    const editSearchTerm = (e) => {
        setsearchTerm(e.target.value);
    }

    useEffect(() => {
        props.onBuscar(searchTerm);
    }, [searchTerm])

    return (
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder={mensaje}
                style={{ padding: 6 }}
                inputProps={{ "aria-label": "Buscar usuario" }}
                value={searchTerm}
                onChange={editSearchTerm}

            />
            <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="Buscar usuario"
            >
                <SearchIcon
                    style={{
                        backgroundColor: "#5AB9EA",
                        borderRadius: 100,
                        borderTopLeftRadius: 0,
                        width: 44,
                        height: 44,
                        padding: 0,
                        margin: 0
                    }}
                />
            </IconButton>
        </Paper>
    );
}
