import React, { useState, useEffect } from 'react';
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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Container, Grid } from "@material-ui/core"
import Buscador from './BuscadorUsuarios'
import Formulario from './Formulario'
import VerFormulario from './VerFormulario'
import EditarFormulario from './EditarFormulario'
import EliminarUsuario from "./EliminarUsuario";
import UsuariosService from "../../Servicios/user.service";

function createData(id, nombre, apellido, usuario, correo) {
  return { id, nombre, apellido, usuario, correo };
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/*
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
*/

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
  { id: 'usuario', numeric: false, disablePadding: false, label: 'Nombre de usuario' },
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
            style={{ background: '#5AB9EA' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={e => createSortHandler(headCell.id)}
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
    justify: "center",
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

  const [usuarios, setUsuarios] = useState([]);

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

  const [openConfirmacion, setOpenConfirmacion] = useState(false);

  const handleOpenConfirmacion = (event, reason) => {
    setOpenConfirmacion(true);
  };

  const handleCloseConfirmacion = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenConfirmacion(false);
  };

  const actualizarTabla = (valores) => {
    UsuariosService.listarUsuariosFiltrado(valores).then(response => {
      let userAux = [];
      response.data.map(user => {
        userAux.push(createData(user.id, user.nombres, user.apellidos, user.username, user.correo));
      });
      setUsuarios(userAux);
    })
      .catch(() => {
        console.log('Error al actualizar la tabla')
      });
  }

  const listarTabla = () => {
    UsuariosService.listarUsuarios().then(response => {

      let userAux = [];
      response.data.map(user => {
        userAux.push(createData(user.id, user.nombres, user.apellidos, user.username, user.correo));
      });
      setUsuarios(userAux);
      handleOpenConfirmacion();
    })
      .catch(() => {
        console.log('Error al listar usuarios')
      });
  }

  useEffect(() => {
    UsuariosService.listarUsuarios().then(response => {

      let userAux = [];
      response.data.map(user => {
        userAux.push(createData(user.id, user.nombres, user.apellidos, user.username, user.correo));
      });
      setUsuarios(userAux);
    })
      .catch(() => {
        console.log('Error al listar usuarios')
      });

  }, []);

  return (
    <div>
      <BarraInicial />
      <Container>
        <div>
          <Toolbar>
            <Grid container direction="row" justify="center">
              <Grid container item xs={10} justify="center">
                <Typography variant="h2" gutterBottom style={{ color: 'black', margin: 20, justify: "center", fontWeight: "bold" }}>
                  {"Usuarios"}
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </div>

        <div className='Contenedor'>
          <Grid container direction="row">
            <Grid container item xs={12} justify="space-evenly" direction="row" alignItems="center" >
              <Buscador names={usuarios} onBuscar={actualizarTabla}></Buscador>
              <Formulario onActualizar={listarTabla} />
            </Grid>
          </Grid>

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
                    {stableSort(usuarios, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {

                        return (
                          <TableRow hover tabIndex={-1} key={row.id}>
                            <TableCell align="left">{row.nombre}</TableCell>
                            <TableCell align="left">{row.apellido}</TableCell>
                            <TableCell align="left">{row.usuario}</TableCell>
                            <TableCell align="left">{row.correo}</TableCell>

                            {<TableCell>
                              <Grid container item xs={10} justify="center">
                                <VerFormulario usuario={row} />
                                <EditarFormulario usuario={row} onActualizar={listarTabla} />
                                <EliminarUsuario usuario={row} onActualizar={listarTabla} />
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
                count={usuarios.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Grid>
            <Snackbar open={openConfirmacion} autoHideDuration={3000} onClose={handleCloseConfirmacion} anchorOrigin={{ vertical: "top", horizontal: "center" }} key={"topcenter"}>
              <Alert open={openConfirmacion} onClose={handleCloseConfirmacion} severity="success">
                Actualización exitosa
                </Alert>
            </Snackbar>
          </div>
        </div>
      </Container>
      <BarraFinal />
    </div>
  );
}
