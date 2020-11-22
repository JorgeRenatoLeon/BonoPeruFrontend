import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";



//para la redireccion
import { useState } from "react";
import { useDispatch } from "react-redux";
import {fetchPokemons} from "../../actions/prueba";
 import { history } from "../../helpers/history";
// import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0px 0px",
    display: "flex",
    alignItems: "center",
    width: 400,
    borderRadius:100,
    margin:20
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 0,
    color:"white"
  },
  
}));

export default function BuscadorPrincipal(props) {

  const classes = useStyles();
  var mensaje = props.mensaje ? props.mensaje : "Ingrese el Código de familia. Ejemplo: 1234";

  const [searchText,setSearchText] =useState("");
  const handleSearchText = event =>{
      setSearchText(event.target.value);
  } 
 
  const dispatch =useDispatch();
  function buscarBeneficiario(){

    console.log('antes de dispatch', dispatch(fetchPokemons(searchText,history)));
    
    dispatch(fetchPokemons(searchText,history))
    .then(() => {
      console.log('history',history);     
      history.push("/consulta");     
    })
    .catch(() => {
      console.log('Error en las credenciales');
    });
   
  }

  return (
    <Paper component="form" className={classes.root}>
      
      <InputBase
        value={searchText}
        onChange={handleSearchText}
        className={classes.input}
        placeholder={mensaje}
        style={{padding:6}}
        inputProps={{ "aria-label": "search google maps" }}
      />
    
    
          <IconButton
            // type="submit"
            className={classes.iconButton}
            aria-label="search"
            onClick={buscarBeneficiario}
          >
          <SearchIcon
            style={{
              backgroundColor: "#5AB9EA",
              borderRadius: 100,
              borderTopLeftRadius: 0,
              width: 50,
              height: 50,
              padding: 0,
              margin: 0
            }}
        />
      </IconButton>
     
     
    </Paper>
  );

}

// export default  withRouter(BuscadorPrincipal)
