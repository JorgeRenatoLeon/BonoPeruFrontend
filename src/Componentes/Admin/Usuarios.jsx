import React from 'react';
import BarraInicial from '../Barras/BarraInicial'
import BarraFinal from '../Barras/BarraFinal'
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AppBar, Container, Grid } from "@material-ui/core"
import Buscador from '../Elementos/Buscador.jsx'
import Formulario from './Formulario'
import VerFormulario from './VerFormulario'
import EditarFormulario from './EditarFormulario'
import EliminarUsuario from "./EliminarUsuario";

function createData(id, nombre, apellido, correo) {
  return { id, nombre, apellido, correo};
}

const state = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  editIdx: -1,
};

let rows = [
    createData(0, 'Pedro Luis', 'Ramos Rojas', 'pedroramos@bancoabc.com'),
    createData(1, 'Víctor Andres', 'Baron Solana', 'victorbaron@bancoabc.com'),
    createData(2, 'Domingo', 'Serrano Araque', 'dserrano@bancoxyz.com'),
    createData(3, 'Sarah Susana', 'Llano', 'dserrano@bancoxyz.com'),
    createData(4, 'María Concepción', 'Arrieta Granada', 'dserrano@bancoxyz.com'),
    createData(5, 'Sarita Susana', 'Llano', 'dserrano@bancoxyz.com'),
    createData(6, 'María Concepción', 'Arrieta Granada', 'dserrano@bancoxyz.com'),    
    createData(7, 'Victoria Andrea', 'Baron Solana', 'victorbaron@bancoabc.com'),
    createData(8, 'Sabado', 'Serrano Araque', 'dserrano@bancoxyz.com'),
    createData(9, 'Saragovia Susana', 'Llano', 'dserrano@bancoxyz.com'),
    createData(10, 'María Concepción', 'Arrieta Granada', 'dserrano@bancoxyz.com'),    
    createData(11, 'Pablo Luis', 'Ramos Rojas', 'pedroramos@bancoabc.com'),
    createData(12, 'Manuel Andres', 'Baron Solana', 'victorbaron@bancoabc.com'),
    createData(13, 'Lunes', 'Serrano Araque', 'dserrano@bancoxyz.com'),
    createData(14, 'Sara Susana', 'Llano', 'dserrano@bancoxyz.com'),
    createData(15, 'María Concepción', 'Arrieta Granada', 'dserrano@bancoxyz.com'),
    createData(16, 'Sarana Susana', 'Llano', 'dserrano@bancoxyz.com'),
    createData(17, 'María Concepción', 'Arrieta Granada', 'dserrano@bancoxyz.com'),    
    createData(18, 'Jorge Luis', 'Ramos Rojas', 'pedroramos@bancoabc.com'),
    createData(19, 'Spiderman Andres', 'Baron Solana', 'victorbaron@bancoabc.com'),    
];

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

const handleRemove = i => {
  rows = rows.filter((row, j) => j !== i);
};

const startEditing = i => {
  state.editIdx = i;
};

const stopEditing = () => {
  state.editIdx = -1;
};

const handleSave = (i, x) => {
  rows = rows.map((row, j) => (j === i ? x : row));
  stopEditing();
};

const headCells = [
  { id: 'nombre', numeric: false, disablePadding: false, label: 'Nombre' },
  { id: 'apellido', numeric: false, disablePadding: false, label: 'Apellido' },
  { id: 'correo', numeric: false, disablePadding: false, label: 'Correo' },
  { id: 'editar', numeric: false, disablePadding: false, label: ' ' }
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
      //maxWidth: 750,
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

 
export default function EnhancedTable() {
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

  return (
     <div>
         <BarraInicial/>
             <Container>
                <div>
                  <AppBar position="relative" style={{background: 'transparent', boxShadow: 'none'}}>
                          <Toolbar>
                              <Grid container direction="row" justify="center">
                                  <Grid container item xs={10} justify="center">                        
                                      <Typography variant="h3"  gutterBottom justify="center" >
                                          <h4 style={{color: 'black', margin: 20,justify:"center" }}>Listado de Usuarios</h4>
                                      </Typography>                               
                                  </Grid>                                                  
                              </Grid>
                          </Toolbar>
                  </AppBar>
                </div>

                <div className='Contenedor'>
                  <Grid container direction="row" justify="left">
                      <Grid container item xs={12} justify="space-evenly" direction="row" alignItems="center" >
                          <Buscador mensaje = "Buscar nombre"></Buscador>                           
                          <Formulario></Formulario>                        
                      </Grid>
                  </Grid>

                  <div className={classes.root}>
                    <Grid className={classes.paper}>                      
                        <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            aria-label="enhanced table"
                            handleRemove={handleRemove}
                            startEditing={startEditing}
                            editIdx={state.editIdx}
                            stopEditing={stopEditing}
                            handleSave={handleSave}
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
                                    <TableRow hover tabIndex={-1} key={row.id}>
                                    <TableCell align="left">{row.nombre}</TableCell>
                                    <TableCell align="left">{row.apellido}</TableCell>
                                    <TableCell align="left">{row.correo}</TableCell>
                                    
                                    {<TableCell>  
                                      <Grid container item xs={10} justify="center">                                    
                                        <VerFormulario/>
                                        <EditarFormulario/>
                                        <EliminarUsuario/>
                                      </Grid>                                           
                                    </TableCell>}
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
                  </div>
                </div>
             </Container>
         <BarraFinal/>
     </div>  
  );
}
