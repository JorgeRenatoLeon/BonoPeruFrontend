import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom"

// import PropTypes from 'prop-types'
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
// const BuscadorPrincipal=(props) =>{
  const classes = useStyles();
  // const {handleSearch} =this.state; //  
  var mensaje = props.mensaje ? props.mensaje : "Ingrese el Código de familia. Ejemplo: 1234";
  const flag = props.direction;
  // console.log('flag: ', flag);
  if (flag===false){
    mensaje= "Soy falso";
  }
    
  return (
    <Paper component="form" className={classes.root}>
      
      <InputBase
        className={classes.input}
        placeholder={mensaje}
        style={{padding:6}}
        inputProps={{ "aria-label": "search google maps" }}
      />
      {/* {classes.input} */}
       <Link to='/consulta' style={{textDecoration:"none"}}>        
     
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
            
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
      </Link>
       {/* no compilaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa 15/11*/}
    </Paper>
  );
            console.log(classes.input);
}

