import { AppBar, Toolbar, Typography, Button, Grid, Radio } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React, {Component, useReducer, useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import BarraInicial from '../Barras/BarraInicial';
import BarraFinal from '../Barras/BarraFinal';
import Combobox from '../Elementos/Combobox';
import Buscador from '../Elementos/Buscador.jsx';
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
import LugaresService from "../../Servicios/lugares.service";
import { render } from '@testing-library/react';


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


/*
const handleRemove = i => {
  this.setState(state => ({
    data: state.data.filter((row, j) => j !== i)
  }));
};

const startEditing = i => {
  this.setState({ editIdx: i });
};

const stopEditing = () => {
  this.setState({ editIdx: -1 });
};

const handleSave = (i, x) => {
  this.setState(state => ({
    data: state.data.map((row, j) => (j === i ? x : row))
  }));
  this.stopEditing();
};
*/
const headCells = [
  { id: 'opción', numeric: false, disablePadding: false, label: ' ' },
  { id: 'codigo', numeric: false, disablePadding: false, label: 'Codigo' },
  { id: 'nombre', numeric: false, disablePadding: false, label: 'Nombre' },
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
  const [departamentos, setDep] = useState([]);
  const [rows, setRows] = useState([]);
  useEffect(() => {
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
  
    LugaresService.obtenerLugares().then(response =>{
      let rowsAux = [];
      response.data.map(lug => {
        rowsAux.push({
          id: lug.idlugarentrega, 
          codigo: lug.codigo, 
          nombre: lug.nombre, 
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
  },[]);
    
  function stableSort(array, comparator) {
    console.log(array);
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

    const provincias = [
        { value: 'Lima', label: 'LIMA' },
        { value: 'Tumbes', label: 'TUMBES' },
        { value: 'Tacna', label: 'TACNA' }
    ];
    const distritos = [
        { value: 'LaVictoria', label: 'LA VICTORIA' },
        { value: 'Surco', label: 'SURCO' },
        { value: 'Miraflores', label: 'MIRAFLORES' }
    ];

    const [state, dispatch] = useReducer(reducer, {})
    const RadioButton = ({id,cod}) => (
        <Radio
          id={id}
          cod={cod}
          onClick={() => dispatch({ id})}
          checked={state.checkedId === id}
          type="radio"
          onChange={handlerChange}
        />
    )
    const [selectedId, setSelectedId] = React.useState("");
    const [selectedCod, setSelectedCod] = React.useState("");
    function handlerChange(event) {
        setSelectedId(event.target.id);
        setSelectedCod(event.target.cod);
    }
    console.log({selectedId});
    console.log({selectedCod});

    return ( 
        <Grid>
            <BarraInicial/>              
            <AppBar position="relative" style={{background: 'transparent', boxShadow: 'none'}}>
                <Toolbar>
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={12} justify="center">
                            <Typography variant="h3"  gutterBottom justify="center" >
                                    <h3 style={{color: 'black', margin: 20,justify:"center" }}>Búsqueda de Lugares</h3>
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
                        <Combobox options={departamentos}/>
                        <Typography variant="subtitle1" color="inherit">
                            Provincia:
                        </Typography>
                        <Combobox options={provincias}/>
                        <Typography variant="subtitle1" color="inherit">
                            Distrito:
                        </Typography>
                        <Combobox options={distritos}/>
                    </Grid>
                    <Grid container direction="row"  item xs={6} justify="space-evenly" alignItems="center">
                        <Typography variant="subtitle1" color="inherit">
                            Buscar:
                        </Typography>
                        <Buscador mensaje = " "></Buscador> 
                    </Grid>
                </Grid>
            </Paper> 
            <Paper elevation={0} style={{marginLeft: 40, marginRight: 40, marginTop:10,  boxShadow: 'none'}}>
                <Grid className={classes.paper}>                      
                    <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                        //handleRemove={this.handleRemove}
                        //startEditing={this.startEditing}
                        //editIdx={this.state.editIdx}
                        //stopEditing={this.stopEditing}
                        //handleSave={this.handleSave}
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
                                <RadioButton id={row.id} cod={row.codigo}/>
                                <TableCell align="left">{row.codigo}</TableCell>
                                <TableCell align="left">{row.nombre}</TableCell>
                                <TableCell align="left">{row.lugar}</TableCell>
                                <TableCell align="left">{row.direccion}</TableCell>
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
                </Grid>                  
            </Paper> 
            <Grid container direction="column" justify="flex-start" alignItems="center" >
                <Link to='/consultasBeneficiarios' style={{textDecoration:"none"}}>
                    <Button variant="contained" size="medium" color="primary" style={{margin: 10}}>
                        Consultar
                    </Button> 
                </Link> 
            </Grid>    
                
            <BarraFinal/>
 
        </Grid>
    );

}
 
export default BusquedaLugares;