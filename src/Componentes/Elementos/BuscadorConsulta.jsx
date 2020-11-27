import React,{useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ConsultaService from "../../Servicios/consultacod.service";
import ConsultaBeneficiarios from "../Trabajador/ConsultasBeneficiarios";

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
let respuesta = "";

const ConsultasBeneficiarios = (props) =>{

  const classes = useStyles();
  const mensaje = props.mensaje ? props.mensaje : "Ingrese el Código de familia. Ejemplo: 1234";

  const [searchText,setSearchText] =React.useState("");
  const handleSearchText = event =>{
      setSearchText(event.target.value);
      console.log(searchText);
  } 

  const handleBuscar = () =>{
    console.log(searchText, "buscando");
    props.buscar(searchText);
  }
   
  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        value={searchText}
        onChange={handleSearchText}
        className={classes.input}
        placeholder= {mensaje}
        style={{padding:6}}
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton
        //type="submit"
        className={classes.iconButton}
        aria-label="search"
        size="medium"
        onClick={handleBuscar}
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

export default ConsultasBeneficiarios;