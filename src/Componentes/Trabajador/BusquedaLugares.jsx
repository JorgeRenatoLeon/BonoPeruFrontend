import { AppBar, Toolbar, Typography, Button, Grid, Radio } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React, {Component, useReducer, useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import BarraInicial from '../Barras/BarraInicial';
import BarraFinal from '../Barras/BarraFinal';
import Combobox from '../Elementos/Combobox';
import BuscadorLugares from '../Elementos/BuscadorLugares.jsx';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import axios from "axios";
import DepartamentosService from "../../Servicios/departamentos.service";
import ProvinciasService from "../../Servicios/provincias.service";
import DistritosService from "../../Servicios/distritos.service";
import LugaresService from "../../Servicios/lugares.service";
import { render } from '@testing-library/react';
import { Alert, AlertTitle } from '@material-ui/lab';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import  Cargando  from "../ModalCargando";

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


const headCells = [
  { id: 'opción', numeric: false, disablePadding: false, label: ' ' },
  { id: 'codigo', numeric: false, disablePadding: false, label: 'Codigo' },
  { id: 'nombre', numeric: false, disablePadding: false, label: 'Nombre' },
  { id: 'tipo', numeric: false, disablePadding: false, label: 'Tipo'},
  { id: 'lugar', numeric: false, disablePadding: false, label: 'Lugar' },
  { id: 'direccion', numeric: false, disablePadding: false, label: 'Direccion' },
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
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
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




const BusquedaLugares = (props) => {
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

  const datosInicio ={
    iddepartamento: null,
    idprovincia:null,
    iddistrito: null,
    nombre: ""
  }

  const apiLugares=(valor)=>{
    LugaresService.obtenerLugares(valor).then(response =>{
      setEstadoCargando(false);
      let rowsAux = [];
      response.data.map(lug => {
        rowsAux.push({
          id: lug.idlugarentrega, 
          codigo: lug.codigo, 
          nombre: lug.nombre,
          tipo: lug.tipo,
          lugar: lug.depprodis, 
          direccion: lug.direccion
          });
      });
      setRows(rowsAux);
      console.log(rows);
    })
    .catch(() => {
      console.log('Error al obtener Lugares')
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
          label: "Todas",
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
        label: "Todos",
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
    setEstadoCargando(true);
    if(valor === 0) {
      handleComboboxProv(0);
      handleComboboxDis(0);
      setStateCbxProv(true);
      setStateCbxDis(true);
      setSelectedDep(null);
      const filtroLugar ={
        iddepartamento: null,
        idprovincia: null,
        iddistrito: null,
        nombre: ""
      }
      apiLugares(filtroLugar);
    }else{
      console.log(departamento,"id depa"); 
      apiProvincias(valor);
      const filtroLugar ={
        iddepartamento: valor,
        idprovincia: null,
        iddistrito: null,
        nombre: ""
      }
      apiLugares(filtroLugar);
    }
  }

  const handleComboboxProv=(valor)=>{
    setSelectedProv(valor);
    setEstadoCargando(true);
    console.log(valor, "valor dentro de prov combo");
    if(valor === 0){
      setStateCbxDis(true);
      handleComboboxDis(0);
      setSelectedProv(null);
      const filtroLugar ={
        iddepartamento: departamento,
        idprovincia: null,
        iddistrito: null,
        nombre: ""
      }
      apiLugares(filtroLugar);
    }else{
      console.log(valor,"id prov");
      apiDistritos(valor);
      const filtroLugar ={
        iddepartamento: departamento,
        idprovincia: valor,
        iddistrito: null,
        nombre: ""
      }
      apiLugares(filtroLugar);
    }
  }

  const handleComboboxDis=(valor)=>{
    setEstadoCargando(true);
    console.log(valor,"id dis");
    if(valor === 0){
      setSelectedDis(null);
      const filtroLugar ={
        iddepartamento: departamento,
        idprovincia: provincia,
        iddistrito: null,
        nombre: ""
      }
      apiLugares(filtroLugar);
    }else{
      setSelectedDis(valor);
      const filtroLugar ={
        iddepartamento: departamento,
        idprovincia: provincia,
        iddistrito: valor,
        nombre: ""
      }
      apiLugares(filtroLugar);
    }
  }

  const [mostrarErrorBusqueda, setErrorBusqueda]= useState(false);
  const buscarLugar=(nombre)=>{
    var letters = /^\d*[a-zA-Z][a-zA-Z\d\s]*$/;
    if(letters.test(nombre)){
      setEstadoCargando(true);
      setErrorBusqueda(false);
      const nombreLugar ={
        iddepartamento: departamento,
        idprovincia: provincia,
        iddistrito: distrito,
        nombre: nombre
      }
      apiLugares(nombreLugar);
    }else{
      setErrorBusqueda(true);
    }
    
  }

  const [departamentos, setDep] = useState([]);
  const [rows, setRows] = useState([]);
  const [provincias, setProv] =useState([]);
  const [distritos, setDis] =useState([]);
 
  useEffect(() => {
    console.log('use');
    apiLugares(datosInicio);

    DepartamentosService.mostrarDepartamentos().then(response =>{
      let depAux=[];
      if(response.data.length> 0)
      depAux.push({
        value: 0,
        label: "Todos",
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
    
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

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

    const reducer = (state, action) => {
      return { checkedId: action.id }
    }
    const [state, dispatch] = useReducer(reducer, {})
    const RadioButton = ({id,cod,nom,tipo,lug,dir}) => (
        <Radio
          id={id}
          cod={cod}
          nom={nom}
          tipo={tipo}
          lug={lug}
          dir={dir}
          onClick={() => dispatch({ id})}
          checked={state.checkedId === id}
          type="radio"
          onChange={() => handleChange(id,cod,nom,tipo,lug,dir)}
        />
    )

    
    const [identificador, setSelectedId] = useState("");
    const [codigo,setSelectedCod] = useState(" ");
    const [nombre, setSelectedNom] = useState("");
    const [tipo, setSelectedTipo] = useState("");
    const [lugar,setSelectedLug] = useState(" ");
    const [direccion,setSelectedDir] = useState(" ");
    
    const [mensajeConsulta, setMsgConsulta] = useState(true);
    const [botonDeshabilitar, setDeshabilitar] = useState(true);
    function handleChange(id,cod,nom,tipo,lug,dir) {
        //setError(true);  
        setMsgConsulta(false);
        setDeshabilitar(false);    
        setSelectedId(id);
        console.log(identificador);
        setSelectedCod(cod);
        console.log(codigo);
        setSelectedNom(nom);
        setSelectedTipo(tipo);
        setSelectedLug(lug);
        setSelectedDir(dir);
    }

  

    const [nomLug, setLug] = useState("");
    return ( 
        <Grid>
            <BarraInicial/>  
            <Grid style={{minHeight: "83vh"}}>
            <AppBar position="relative" style={{background: 'transparent', boxShadow: 'none'}}>
                <Toolbar>
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={12} justify="center">
                              <Typography variant="h3" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold"}} gutterBottom justify="center" >
                                Búsqueda de Lugares
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
                        value={departamento} placeholder="Todos"/>
                        <Typography variant="subtitle1" color="inherit">
                            Provincia:
                        </Typography>
                        <Combobox options={provincias} onSeleccion={handleComboboxProv} 
                        value={provincia} isDisabled={cbxProv} placeholder="Todas"/>
                        <Typography variant="subtitle1" color="inherit">
                            Distrito:
                        </Typography>
                        <Combobox options={distritos} onSeleccion={handleComboboxDis} 
                        value={distrito} isDisabled={cbxDis} placeholder="Todos"/>
                    </Grid>
                    <Grid container direction="row" justify="space-evenly" alignItems="center">
                      <Grid container direction="row" justify="space-evenly" alignItems="center" item xs={6}>
                        <Typography variant="subtitle1" color="inherit">
                            Buscar:
                        </Typography>
                        <BuscadorLugares mensaje = "Ingrese el nombre del lugar" buscar={buscarLugar} nombre={nomLug}></BuscadorLugares> 
                      </Grid>
                      <Grid container direction="row" justify="space-evenly" alignItems="center" item xs={6}>
                      {mensajeConsulta?
                        <Grid>
                          <Typography variant="subtitle1" color="inherit">
                            Debe seleccionar un lugar para poder Consultar 
                          </Typography>
                        </Grid>
                        :<Grid></Grid>}
                      <Link 
                          to={{
                            pathname: "/consultasBeneficiarios",
                            state: { id: identificador,
                              codigo: codigo,
                              nombre: nombre,
                              tipo: tipo,
                              lugar: lugar,
                              direccion: direccion}
                          }}
                          style={{textDecoration:"none"}}>
                          <Button variant="contained" size="medium" color="primary" style={{margin: 10}} disabled={botonDeshabilitar}>
                              Consultar
                          </Button> 
                      </Link>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center" alignItems="flex-start" item xs={6}>
                      {mostrarErrorBusqueda?<FormLabel  error={true}>Búsqueda inválida</FormLabel>:<Grid></Grid>}
                    </Grid>
                </Grid>
            </Paper> 
            <Paper elevation={0} style={{marginLeft: 40, marginRight: 40, marginTop:10,  boxShadow: 'none'}}>
                {estadoCargando?
                <Grid container direction="row" justify="center">
                  <Cargando/>
                </Grid>:
                rows.length > 0?
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
                                  <RadioButton  id={row.id} cod={row.codigo}
                                    nom={row.nombre} tipo={row.tipo} lug={row.lugar}
                                    dir={row.direccion}/>
                                </TableCell> 
                                <TableCell align="left">{row.codigo}</TableCell>
                                <TableCell align="left">{row.nombre}</TableCell>
                                <TableCell align="left">{row.tipo}</TableCell>
                                <TableCell align="left">{row.lugar}</TableCell>
                                <TableCell align="left">{row.direccion}</TableCell>
                                </TableRow>
                            );
                            })}
                        </TableBody>
                        
                    </Table>
                    </TableContainer>
                    <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}                    
                    />
                </Grid>:
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={12} justify="center">
                            <Typography variant="h3"  gutterBottom justify="center" >
                                    <h3 style={{color: 'black', margin: 20,justify:"center" }}>No hay ningún lugar de entrega que coincida con la búsqueda</h3>
                            </Typography> 
                        </Grid>                                                  
                    </Grid>}                 
            </Paper>    
            </Grid>    
            <BarraFinal/>
 
        </Grid>
    );

}
 
export default BusquedaLugares;