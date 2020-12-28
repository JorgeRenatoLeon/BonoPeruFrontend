 import Respuesta from './Respuesta'
 import { AppBar, Toolbar, Typography, Button, Cointaner, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@material-ui/core';
 import Paper from '@material-ui/core/Paper';
 import React, {Component, useReducer, useEffect,useState } from 'react';
 import { Link } from 'react-router-dom';
 import { withStyles, makeStyles } from '@material-ui/core/styles';
 import BarraInicial from '../Barras/BarraInicial';
 import BarraFinal from '../Barras/BarraFinal';
 import Combobox from '../Elementos/Combobox';
 import BuscadorConsulta from '../Elementos/BuscadorConsulta.jsx';
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
 import {useLocation} from "react-router-dom";
 import ConsultaService from "../../Servicios/consultacod.service";
 import FormLabel from '@material-ui/core/FormLabel';
//Para el título grandote
function createData(id, codigo, nombre, lugar, direccion) {
    return { id, codigo, nombre, lugar, direccion};
}

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
  { id: 'codigo', numeric: false, disablePadding: false, label: 'Codigo' },
  { id: 'nombre', numeric: false, disablePadding: false, label: 'Nombre' },
  { id: 'tipo', numeric: false, disablePadding: false, label: 'Tipo' },
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


const ConsultasBeneficiarios = (params) => {
    let data = useLocation();
    let rows = [{
      id:  data.state.id,
      codigo: data.state.codigo,
      nombre: data.state.nombre,
      tipo: data.state.tipo,
      lugar: data.state.lugar,
      direccion: data.state.direccion,   
    }];
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

    const [mensaje, setMensaje] = useState(null);
    const [mostrarErrorBusqueda, setErrorBusqueda]= useState(false);

    const buscarBeneficiario=(texto) =>{
      //var letters = /^\d*[a-zA-Z-z0-9][a-zA-Z-z0-9\d]*$/;
      var letters = /^\d*[a-zA-Z0-9][a-zA-Z0-9\d]*$/;
      setBusq(texto);
      if(!letters.test(texto)){
        setErrorBusqueda(true);
        return;
      }
      setErrorBusqueda(false);
      setMensaje("Cargando...");
      var dia = ("0" + (new Date()).getDate()).slice(-2);
      var mes = ("0" + ((new Date()).getMonth() + 1)).slice(-2);
      var anho = (new Date()).getFullYear();
      var dia = anho+'-'+mes+'-'+dia;
      var horas = ("0" + (new Date()).getHours()).slice(-2);
      var minutos = ("0" + (new Date()).getMinutes()).slice(-2);
      var segundos = ("0" + (new Date()).getSeconds()).slice(-2);
      var hora = horas+':'+minutos+':'+segundos;
      console.log(rows[0].id);
      console.log(dia);
      console.log(hora);
      const datos ={
        idlugarentrega: rows[0].id,
        codigofamilia: texto,
        hora: hora,
        dia: dia,
      }
      ConsultaService.consultarCodigoFamilia(datos).then(response =>{
        console.log(response.data);
        let respuesta= response.data;
        switch (respuesta) {
          case 'bono':
            setMensaje("Si le corresponde recibir bono al beneficiario");
            break;
          case 'no bono':
            setMensaje("Este código de familia no tiene un bono asignado");
            break;
          case 'lugar':
            setMensaje("Este no es el lugar de entrega que le corresponde al beneficiario");
            break;
          case 'horario':
            setMensaje("Este no es el horario de entrega que le corresponde al beneficiario");
            break;
          case 'dia':
            setMensaje("Este no es el día de entrega que le corresponde al beneficiario");
            break;
          case 'lugar dia horario':
            setMensaje("Este no es el lugar ni el dia ni el horario que le corresponde al beneficiario");
            break;
          case 'lugar horario':
            setMensaje("Este no es el lugar ni el horario que le corresponde al beneficiario");
            break;
          case 'lugar dia':
            setMensaje("Este no es el lugar ni el dia que le corresponde al beneficiario");
            break;
          case 'dia horario':
            setMensaje("Este no es el lugar ni el dia que le corresponde al beneficiario");
            break;
          case 'entregado':
            setMensaje("El bono ya fue entregado");
            break;
          default:
            setMensaje("Ups! Algo salió mal");
            break;
        } 
      })
      .catch(() => {
          console.log('Error al consultar el codigo de Familia')
      });
    }

    const [busqueda, setBusq] = useState("");

    return (
        <Grid>
          <Grid style={{minHeight: "92vh"}}>
            <BarraInicial/>                
            <AppBar position="relative" style={{background: 'transparent', boxShadow: 'none'}}>
                <Toolbar>
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={12} justify="center">
                              <Typography variant="h3" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold"}} gutterBottom justify="center" >
                                Consulta de Beneficiarios
                              </Typography>                         
                        </Grid>                                                  
                    </Grid>
                </Toolbar>
            </AppBar> 
            <Paper elevation={0} style={{marginLeft: 40, marginRight: 40, boxShadow: 'none'}}>
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
                <Grid container direction="row" justify="center" alignItems="center">
                    <BuscadorConsulta mensaje = "Ingrese el Código de familia" buscar={buscarBeneficiario} texto={busqueda}></BuscadorConsulta> 
                </Grid>
                <Grid container direction="row" justify="center" alignItems="center">
                      {mostrarErrorBusqueda?
                        busqueda===""?
                        <FormLabel error={true}>Debe ingresar un código de familia</FormLabel>:
                        <FormLabel error={true}>Búsqueda inválida</FormLabel>
                      :<Grid></Grid>}
                    </Grid>
            </Paper> 
            {mensaje?
            <Respuesta mensaje={mensaje}></Respuesta>:<Grid></Grid>}
            <Grid container direction="row" justify="center">
              <Link to='/lugares' style={{textDecoration:"none"}}>
                <Button variant="contained"  size="medium" color="secondary" style={{margin: 10}}>
                    Regresar
                </Button>
              </Link> 
            </Grid>
            </Grid>
            <BarraFinal/>
        </Grid>
    );
    
}
export default ConsultasBeneficiarios;

