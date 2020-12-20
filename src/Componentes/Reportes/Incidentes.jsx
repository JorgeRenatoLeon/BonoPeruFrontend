import { AppBar, Toolbar, Typography, Button ,Cointaner, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React, {Component, useReducer,  useEffect,useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import BarraInicial from '../Barras/BarraInicial';
import BarraFinal from '../Barras/BarraFinal';
import Combobox from '../Elementos/Combobox';
import RangoFechas from '../Elementos/RangoFechas';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Alert, AlertTitle } from '@material-ui/lab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import '../../assets/css/Cronograma.css';
import Checkbox from '@material-ui/core/Checkbox';
import HorariosService from "../../Servicios/horarios.service";
import DepartamentosService from "../../Servicios/departamentos.service";
import ProvinciasService from "../../Servicios/provincias.service";
import DistritosService from "../../Servicios/distritos.service";
import DescargaService from "../../Servicios/descarga.cronograma";
import { SelectAll } from '@material-ui/icons';
import  Cargando  from "../ModalCargando";
import Bar from "../../Componentes/Graficos/Bar.js";

const reducer = (state, action) => {
    return { checkedId: action.id }
}

const useStyles = makeStyles({
    root: {
      width: '100%',
      maxWidth: 500,
      justify:"center",    
    },
    table: {
      minWidth: 500,
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
      },
  });


const ReporteIncidentes = (props) => {
  const [estadoCargando,setEstadoCargando]= useState(true);

  //PARA MODAL CARGANDO
  const useStyles2 = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }));
  const classes2 = useStyles2();
  //FIN DE MODAL CARGANDO

  //Para Kaytlin de Johana
  var cronogramaGestionBonos = JSON.parse(localStorage.getItem("cronogramaKaytlin")) ;    //La hemos obtenido 
  //console.log('joh: ',cronogramaGestionBonos) ; //Borralo cuando ya no lo uses, pero aquí está el api que me manda Caro,
  /* Incluye estos datos, siempre te los pasaré una vez se haya generado el cronograma
    beneficiarios: 3
    fechafin: "2020-12-08"
    fechaini: "2020-11-23"
    idcronograma: 2
    lugares: 3
  */
  let data = useLocation();
  const cronogramaInicial={
    idcronograma: cronogramaGestionBonos.idcronograma,
    iddepartamento:null,
    idprovincia:null,
    iddistrito:null,
    fechaini: cronogramaGestionBonos.fechaini,
    fechafin: cronogramaGestionBonos.fechafin,
    nombre:""
  }

  const apiCronograma = (valor)=>{
    console.log(valor);
    console.log("apicronogrma",rows);
    HorariosService.obtenerHorarios(valor).then(response =>{
      setEstadoCargando(false);
      let rowsAux = [];
      response.data.map(lug => {
        rowsAux.push({
          id: lug.idlugarentrega, 
          nombre: lug.nombre, 
          locacion: lug.locacion,
          fecha: lug.fecha,
          turno: lug.horainicio + '-'+ lug.horafin,
          aforo: lug.aforo,
          mujeres: lug.mujeres,
          discapacitados: lug.discapacitados,
          riesgo:lug.riesgo,
        });
      });
      setRows([]);
      setRows(rowsAux);
      console.log(rowsAux);
    })
    .catch(() => {
      console.log('Error al obtener Cronograma')
    });  
  }

  const [departamento,setSelectedDep] = useState(null);
  const [provincia,setSelectedProv] = useState(null);
  const [distrito,setSelectedDis] = useState(null);

  const [cbxProv, setStateCbxProv] = useState(true);
  const [cbxDis,setStateCbxDis] = useState(true);

  const apiProvincias=(valor)=>{
    setStateCbxProv(false);
    console.log(cbxProv);
    ProvinciasService.mostrarProvincias(valor).then(response =>{
      console.log(valor,"dentro de la funcion api");
      let provAux=[];
      if(response.data.length> 0)
        provAux.push({
          value: 0,
          label: "Provincia",
        }); 
      response.data.map(prov => {
        provAux.push({
              value: prov.idprovincia,
              label: prov.nombre,
          });
      });
      setProv(provAux);
      console.log(provincias);

    })
    .catch(() => {
        console.log('Error al pedir las provincias');
        console.log(props);
    }); 
  } 

  const apiDistritos=(valor)=>{
    setStateCbxDis(false);
    DistritosService.mostrarDistritos(valor).then(response =>{
      let disAux=[];
      if(response.data.length> 0)
      disAux.push({
        value: 0,
        label: "Distrito",
      });
      response.data.map(prov => {
        disAux.push({
              value: prov.iddistrito,
              label: prov.nombre,
          });
      });
      setDis(disAux);
      console.log(distritos);

    })
    .catch(() => {
        console.log('Error al pedir los distritos');
        console.log(props);
    });
  }

  const handleComboboxDep=(valor)=>{
    setSelectedDep(valor);
    console.log(departamento,"id depa"); 
    if(valor === 0) {
      handleComboboxProv(0);
      handleComboboxDis(0);
      setStateCbxProv(true);
      setStateCbxDis(true);
      setSelectedDep(null);      
    }else{
      console.log(departamento,"id depa"); 
      apiProvincias(valor);
    }
  }

  const handleComboboxProv=(valor)=>{
    setSelectedProv(valor);
    console.log(valor,"id prov");
    if(valor === 0){
      setStateCbxDis(true);
      handleComboboxDis(0);
      setSelectedProv(null);
    }else{
      console.log(valor,"id prov");
      apiDistritos(valor);
    }
  }

  const handleComboboxDis=(valor)=>{
    setSelectedDis(valor);
    if(valor === 0){
      setSelectedDis(null);
    }else{
      setSelectedDis(valor);
    }
  }

  const [fechaInicio,setSelectedFechaIni]=useState(cronogramaInicial.fechaini);
  const [fechaFin, setSelectedFechaFin]=useState(cronogramaInicial.fechafin);
  const cambiar=(fechaIni,fechaFin)=>{
    if((fechaFin !== null) && (fechaIni!== null)){
      console.log("estoy dentro de cronograma",fechaIni.toDate().getFullYear()+"-"+("0" + (fechaIni.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaIni.toDate().getDate()).slice(-2),
      fechaFin.toDate().getFullYear()+"-"+("0" + (fechaFin.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaFin.toDate().getDate()).slice(-2));
      setSelectedFechaIni(fechaIni.toDate().getFullYear()+"-"+("0" + (fechaIni.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaIni.toDate().getDate()).slice(-2));
      setSelectedFechaFin(fechaFin.toDate().getFullYear()+"-"+("0" + (fechaFin.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaFin.toDate().getDate()).slice(-2));
    }else if(fechaIni === null && fechaFin !== null){
      setSelectedFechaIni(cronogramaInicial.fechaini);
      setSelectedFechaFin(fechaFin.toDate().getFullYear()+"-"+("0" + (fechaFin.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaFin.toDate().getDate()).slice(-2));
    }else if(fechaIni !== null && fechaFin === null){
      setSelectedFechaIni(fechaIni.toDate().getFullYear()+"-"+("0" + (fechaIni.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaIni.toDate().getDate()).slice(-2));
      setSelectedFechaFin(cronogramaInicial.fechafin);
    }else if(fechaIni === null && fechaFin === null){
      setSelectedFechaIni(cronogramaInicial.fechaini);
      setSelectedFechaFin(cronogramaInicial.fechafin);
      console.log("si entro aqui");
    }

  }

  const [searchText,setSearchText] =React.useState("");
  const handleSearchText = event =>{
      setSearchText(event.target.value);
      console.log(event.target.value);
      console.log(searchText);
  } 

  const buscarCronogramas=()=>{
    setEstadoCargando(true);
    console.log("en buscar fechas",fechaInicio,fechaFin);
    console.log("en buscar depa",departamento);
    console.log("en buscar distrito",distrito);
    console.log("en buscar",fechaInicio,fechaFin);
    const cronogramaBusqueda={
      idcronograma: cronogramaGestionBonos.idcronograma,
      iddepartamento: departamento,
      idprovincia: provincia,
      iddistrito: distrito,
      fechaini: fechaInicio,
      fechafin: fechaFin,
      nombre: searchText
    }
    apiCronograma(cronogramaBusqueda);
  }


  const [departamentos, setDep] = useState([]);
  const [rows, setRows] = useState([]);
  const [provincias, setProv] =useState([]);
  const [distritos, setDis] =useState([]);
  useEffect(() => {
    console.log("dentro del use effect",cronogramaInicial);
    apiCronograma(cronogramaInicial);  
    
    DepartamentosService.mostrarDepartamentos().then(response =>{
      let depAux=[];
      if(response.data.length> 0)
      depAux.push({
        value: 0,
        label: "Departamento",
      });
      response.data.map(dep => {
        depAux.push({
              value: dep.iddepartamento,
              label: dep.nombre,
          });
      });
      setDep(depAux);
      console.log(departamentos);
      })
      .catch(() => {
        console.log('Error al pedir los departamentos')
      });

  },[]);
  
    const styles = { width: 260, display: 'block', marginBottom: 10 };
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        console.log(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        console.log(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const [state, dispatch] = useReducer(reducer, {})
 
    var arrayNumSelected = [];
    var arrayFechaSelected = [];
    var arrayHoraIniSelected = [];
    var arrayHoraFinSelected = [];
    const selectCheckBox= (event,fecha,horaIni,horaFin) =>{
      console.log(event);
      if(event.target.checked) {
        arrayNumSelected.push(parseInt(event.target.id));
        arrayFechaSelected.push(fecha);
        arrayHoraIniSelected.push(horaIni);
        arrayHoraFinSelected.push(horaFin);
      } else{
        for (var i = arrayNumSelected.length - 1; i >= 0; i--) {
          if (arrayNumSelected[i] === parseInt(event.target.id) &&
              arrayFechaSelected[i] === fecha &&
              arrayHoraIniSelected[i] === horaIni &&
              arrayHoraFinSelected[i] === horaFin) {
            arrayNumSelected.splice(i, 1);
            arrayFechaSelected.splice(i, 1);
            arrayHoraIniSelected.splice(i, 1);
            arrayHoraFinSelected.splice(i, 1);
            break;
          }
        }
      }
      //console.log(event, "checkbox");
      console.log(arrayNumSelected);
      console.log(arrayFechaSelected);
      console.log(arrayHoraIniSelected);
      console.log(arrayHoraFinSelected);
    }

    return ( 
        <Grid>
            <BarraInicial/> 
            <Grid style={{minHeight:"82.5vh"}}>              
            <AppBar position="relative" style={{background: 'transparent', boxShadow: 'none'}}>
                <Toolbar>
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={12} justify="center">
                              <Typography variant="h3" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold"}} gutterBottom justify="center" >
                                    Reporte de Incidentes
                                </Typography>                         
                        </Grid>                                                  
                    </Grid>
                </Toolbar>
            </AppBar>
            <Paper elevation={0} style={{marginLeft: 40, marginRight: 40, boxShadow: 'none'}}>
                <Grid>
                    <Grid container direction="row" justify="space-evenly" alignItems="center" >
                        <Typography variant="subtitle1" color="inherit">
                            Departamento:
                        </Typography>
                        <Combobox options={departamentos} onSeleccion={handleComboboxDep} 
                          value={departamento} placeholder="Departamento"/>
                        <Typography variant="subtitle1" color="inherit">
                            Provincia:
                        </Typography>
                        <Combobox options={provincias} onSeleccion={handleComboboxProv} 
                        value={provincia} isDisabled={cbxProv} placeholder="Provincia"/>
                        <Typography variant="subtitle1" color="inherit">
                            Distrito:
                        </Typography>
                        <Combobox options={distritos} onSeleccion={handleComboboxDis} 
                        value={distrito} isDisabled={cbxDis} placeholder="Distrito"/>
                    </Grid>
                    <br></br>
                    <Grid container direction="row"  justify="space-evenly" alignItems="center">
                        <Typography variant="subtitle1" color="inherit">
                            Fechas:
                        </Typography>
                          <RangoFechas onCambio={cambiar}/>
                        <Typography variant="subtitle1" color="inherit">
                            Cronograma:
                        </Typography>
                        <Combobox c/>
                        <Button variant="contained" onClick={buscarCronogramas} size="medium" color="primary" style={{margin: 10}}>
                          Filtrar
                        </Button>  
                    </Grid>
                </Grid>
            </Paper> 
            </Grid>
            {/* <Bar chartData={datosEntregados} md={6} sm={12} xs={12}  nameTitle="Top Peores Lugares de Entrega" legendPosition="bottom"/>  */}
            <BarraFinal/>
        </Grid>
    );

}
 
export default ReporteIncidentes;