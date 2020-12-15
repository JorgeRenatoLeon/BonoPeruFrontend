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


const reducer = (state, action) => {
    return { checkedId: action.id }
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'nombre', numeric: false, disablePadding: false, label: 'Nombre' },
  { id: 'locacion', numeric: false, disablePadding: false, label: 'Locación' },
  { id: 'fecha', numeric: false, disablePadding: false, label: 'Fecha' },
  { id: 'turno', numeric: false, disablePadding: false, label: 'Turno' },
  { id: 'aforo', numeric: true, disablePadding: false, label: '%Aforo utilizado' },
  { id: 'mujeres', numeric: true, disablePadding: false, label: '%Mujeres' },
  { id: 'discapacitados', numeric: true, disablePadding: false, label: '%Discapacitados' },
  { id: 'riesgo', numeric: false, disablePadding: false, label: 'Riesgo' },
];

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "5AB9EA",
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 18,
  },
}))(TableCell);


function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort} = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };


  return (
    <TableHead>
      <TableRow>
        <StyledTableCell padding="checkbox" style={{background: '#5AB9EA'}}>
          <Checkbox color="default" 
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{background: '#5AB9EA'}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

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


const Cronograma = (props) => {
  //Para Kaytlin de Johana
  var cronogramaGestionBonos = JSON.parse(localStorage.getItem("cronogramaKaytlin")) ;    //La hemos obtenido 
  console.log('joh: ',cronogramaGestionBonos) ; //Borralo cuando ya no lo uses, pero aquí está el api que me manda Caro,
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
  console.log(cronogramaInicial.fechaini);
  console.log(cronogramaInicial.fechafin);

  const apiCronograma = (valor)=>{
    console.log(valor);
    console.log("apicronogrma",rows);
    HorariosService.obtenerHorarios(valor).then(response =>{
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
      console.log('Error al obtener Lugares')
    });  
  }

  const [departamento,setSelectedDep] = useState(null);
  const [provincia,setSelectedProv] = useState(null);
  const [distrito,setSelectedDis] = useState(null);
  const [nombreLugar, setSelectedNom] =useState("");

  const [cbxProv, setStateCbxProv] = useState(true);
  const [cbxDis,setStateCbxDis] = useState(true);

  const apiProvincias=(valor)=>{
    setStateCbxProv(false);
    console.log(cbxProv);
    ProvinciasService.mostrarProvincias(valor).then(response =>{
      console.log(valor,"dentro de la funcion api");
      let provAux=[];
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
    apiProvincias(valor);
  }

  const handleComboboxProv=(valor)=>{
    setSelectedProv(valor);
    console.log(valor,"id prov");
    apiDistritos(valor);
  }

  const handleComboboxDis=(valor)=>{
    setSelectedDis(valor);
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
      setSelectedFechaIni(cronogramaInicial.fechaIni);
      setSelectedFechaFin(fechaFin.toDate().getFullYear()+"-"+("0" + (fechaFin.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaFin.toDate().getDate()).slice(-2));
    }else if(fechaIni !== null && fechaFin === null){
      setSelectedFechaIni(fechaIni.toDate().getFullYear()+"-"+("0" + (fechaIni.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaIni.toDate().getDate()).slice(-2));
      setSelectedFechaFin(cronogramaInicial.fechafin);
    }else if(fechaIni === null && fechaFin === null){
      setSelectedFechaIni(cronogramaInicial.fechaIni);
      setSelectedFechaFin(cronogramaInicial.fechafin);
    }

  }

  const [searchText,setSearchText] =React.useState("");
  const handleSearchText = event =>{
      setSearchText(event.target.value);
      console.log(event.target.value);
      console.log(searchText);
  } 

  const buscarCronogramas=()=>{
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
    const selectCheckBox= event =>{
      if(event.target.checked) {
        arrayNumSelected.push(parseInt(event.target.id));
      } else{
        for (var i = arrayNumSelected.length - 1; i >= 0; i--) {
          if (arrayNumSelected[i] === parseInt(event.target.id)) {
            arrayNumSelected.splice(i, 1);
            break;
          }
        }
      }
      console.log(event, "checkbox");
      console.log(arrayNumSelected);
    }

    const [errorDescarga, setError] = useState(false);
    const descargaCronograma=()=>{
      if(arrayNumSelected.length === 0){
        console.log("No mi amor");
        //alert("Debe seleccionar al menos un lugar para poder descargar");
        setError(true);
        return
      }
      setError(false);
      const cronogramaParaDescarga ={
        idcronograma: cronogramaGestionBonos.idcronograma,
        iddepartamento: departamento,
        idprovincia: provincia,
        iddistrito: distrito,
        fechaini: fechaInicio,
        fechafin: fechaFin,
        nombre: searchText,
        numeros: arrayNumSelected,
      }
      DescargaService.descargarCronograma(cronogramaParaDescarga);
    }
    return ( 
        <Grid>
            <BarraInicial/>              
            <AppBar position="relative" style={{background: 'transparent', boxShadow: 'none'}}>
                <Toolbar>
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={12} justify="center">
                              <Typography variant="h3" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold"}} gutterBottom justify="center" >
                                     Cronograma
                                </Typography>                         
                        </Grid>                                                  
                    </Grid>
                </Toolbar>
            </AppBar>
            {errorDescarga?
            <Grid container justify="center" style={{marginLeft: 40, marginRight: 40, marginBottom: 20, boxShadow: 'none'}}>
              <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
               Debe seleccionar <strong>al menos un </strong>lugar para poder descargar 
              </Alert>
            </Grid>
            :<Grid></Grid>}
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
                            Lugar de entrega:
                        </Typography>
                        <TextField className="inputRounded" id="outlined-basic" 
                        label={null} variant="outlined" value={searchText}
                        onChange={handleSearchText} />
                        <Button variant="contained" onClick={buscarCronogramas} size="medium" color="primary" style={{margin: 10}}>
                          Buscar
                        </Button> 
                    </Grid>
                </Grid>
            </Paper> 
            <Paper elevation={0} style={{marginLeft: 40, marginRight: 40, marginTop:10, marginBottom:20,  boxShadow: 'none'}}>
                {rows.length > 0?
                <Grid className={classes.paper}>                      
                    <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        />
                        
                        
                        <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {                            
                            
                            return (
                                <TableRow hover tabIndex={-1} key={row.id} >
                                <TableCell padding="checkbox">
                                  <Checkbox color="default" id={row.id} onChange={selectCheckBox}/>                                 
                                </TableCell>
                                <TableCell align="left">{row.nombre}</TableCell>
                                <TableCell align="left">{row.locacion}</TableCell>
                                <TableCell align="left">{row.fecha.substring(8)+row.fecha.substring(4,8)+row.fecha.substring(0,4)}</TableCell>
                                <TableCell align="left">{row.turno.substring(0,5)+"-"+row.turno.substring(9,14)}</TableCell>
                                <TableCell align="center">{row.aforo}</TableCell>
                                <TableCell align="center">{row.mujeres}</TableCell>
                                <TableCell align="center">{row.discapacitados}</TableCell>
                                <TableCell align="center">{row.riesgo}</TableCell>
                                </TableRow>
                            );
                            })}
                        
                        </TableBody>
                        
                    </Table>
                    </TableContainer>
                    <TablePagination
                    //rowsPerPageOptions={[5, 10, 25]}
                    rowsPerPageOptions={[5, 10, { value: -1, label: 'Todo' }]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Grid>:<Grid container direction="row" justify="center">
                        <Grid container item xs={12} justify="center">
                            <Typography variant="h3"  gutterBottom justify="center" >
                                    <h3 style={{color: 'black', margin: 20,justify:"center" }}>No hay ningún lugar de entrega que coincida con la búsqueda</h3>
                            </Typography> 
                        </Grid>                                                  
                    </Grid>}
                <Grid container direction="row" justify="space-evenly" alignItems="center" >
                    <Button variant="contained" size="medium" color="primary" style={{margin: 10}} onClick={descargaCronograma}>
                        Descargar
                    </Button> 
                    <Link to='/bonos' style={{textDecoration:"none"}}>
                        <Button variant="contained"  size="medium" color="secondary" style={{margin: 10}}>
                            Regresar
                        </Button>
                    </Link> 
                </Grid>                         
            </Paper>  
            <BarraFinal/>
        </Grid>
    );

}
 
export default Cronograma;