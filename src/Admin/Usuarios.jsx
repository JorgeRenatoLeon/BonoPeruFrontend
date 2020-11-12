import React from 'react';
import BarraInicial from '../Componentes/Barras/BarraInicial'
import BarraFinal from '../Componentes/Barras/BarraFinal'
import SearchField from "react-search-field";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
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
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { AppBar, Container, Grid } from "@material-ui/core"

function createData(nombre, apellido, correo) {
  return { nombre, apellido, correo};
}

const rows = [
    createData('Pedro Luis', 'Ramos Rojas', 'pedroramos@bancoabc.com'),
    createData('Víctor Andres', 'Baron Solana', 'victorbaron@bancoabc.com'),
    createData('Domingo', 'Serrano Araque', 'dserrano@bancoxyz.com'),
    createData('Sara Susana', 'Llano', 'dserrano@bancoxyz.com'),
    createData('María Concepción', 'Arrieta Granada', 'dserrano@bancoxyz.com'),    
    createData('Pedro Luis', 'Ramos Rojas', 'pedroramos@bancoabc.com'),
    createData('Víctor Andres', 'Baron Solana', 'victorbaron@bancoabc.com'),
    createData('Domingo', 'Serrano Araque', 'dserrano@bancoxyz.com'),
    createData('Sara Susana', 'Llano', 'dserrano@bancoxyz.com'),
    createData('María Concepción', 'Arrieta Granada', 'dserrano@bancoxyz.com'),
    
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

const headCells = [
  { id: 'nombre', numeric: false, disablePadding: false, label: 'Nombre' },
  { id: 'apellido', numeric: false, disablePadding: false, label: 'Apellido' },
  { id: 'correo', numeric: false, disablePadding: false, label: 'Correo' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
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
          </TableCell>
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
    paper: {
      //backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      //boxShadow: theme.shadows[5],
      //padding: theme.spacing(2, 4, 3),
      //width: '100%',
      //marginBottom: theme.spacing(2),
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
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
     <div>
         <BarraInicial/>
             <Container>
                <div>
                  <AppBar position="relative" style={{background: 'transparent', boxShadow: 'none'}}>
                          <Toolbar>
                              <Grid container direction="row" justify="center">
                                  <Grid container item xs={12} justify="center">                        
                                      <Typography variant="h3"  gutterBottom justify="center" >
                                          <h3 style={{color: 'black', margin: 20,justify:"center" }}>Listado de Usuarios</h3>
                                      </Typography>                               
                                  </Grid>                                                  
                              </Grid>
                          </Toolbar>
                  </AppBar>
                  </div>

                  <div className='Buscador'>
                  <SearchField
                      placeholder="Buscar usuarios..."
                      classNames="test-class"
                  />
                  </div>

                  <div className={classes.root}>
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
                                  <TableRow
                                  hover
                                  key={row.name}
                                  >
                                  <TableCell component="th" scope="row" padding="none">
                                      {row.name}
                                  </TableCell>
                                  <TableCell align="right">{row.nombre}</TableCell>
                                  <TableCell align="right">{row.apellido}</TableCell>
                                  <TableCell align="right">{row.correo}</TableCell>

                                  </TableRow>
                              );
                              })}
                          
                          </TableBody>
                      </Table>
                      </TableContainer>
                      <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                      />
                  </Grid>                  
                </div>
             </Container>
         <BarraFinal/>
     </div>  
  );
}
