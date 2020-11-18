import { AppBar, Toolbar, Typography, Button ,Cointaner, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React, {Component, useReducer} from 'react';
import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import BarraInicial from '../Barras/BarraInicial';
import BarraFinal from '../Barras/BarraFinal';
import Combobox from '../Elementos/Combobox';
import Buscador from '../Elementos/Buscador.jsx';
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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';

import '../../assets/css/Cronograma.css';

function createData(id, nombre, locacion, turno, capacidad, beneficiarios, mujeres, hombres, discapacitados, riesgo) {
    return { id, nombre, locacion,turno, capacidad, beneficiarios, mujeres, hombres, discapacitados, riesgo};
}

const reducer = (state, action) => {
    return { checkedId: action.id }
}

const rows = [
    createData(0, 'ABC', 'LIMA-LIMA-LA VICTORIA', '1pm - 5pm', 50, 40, 30, 10, '100%', 'Bajo'),
    createData(1, 'ABC', 'LIMA-LIMA-LA VICTORIA', '9am - 1pm', 50, 40, 25, 15, '1%', 'Medio'),
    createData(2, 'PQR', 'LIMA-LIMA-SURCO', '9am - 1:30pm', 100, 40, 40, 10, '2%', 'Alto'),
    createData(3, 'PQR', 'LIMA-LIMA-SURCO', '1:30pm - 6pm', 100, 40, 35, 15, '60%', 'Bajo'),
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
  { id: 'locacion', numeric: false, disablePadding: false, label: 'Locación' },
  { id: 'turno', numeric: false, disablePadding: false, label: 'Turno' },
  { id: 'capacidad', numeric: false, disablePadding: false, label: 'Capacidad' },
  { id: 'beneficiarios', numeric: false, disablePadding: false, label: 'Beneficiarios' },
  { id: 'mujeres', numeric: false, disablePadding: false, label: 'Mujeres' },
  { id: 'hombres', numeric: false, disablePadding: false, label: 'Hombres' },
  { id: 'discapacitados', numeric: false, disablePadding: false, label: '%Discapacitados' },
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




function Cronograma() {
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
    const departamentos = [
        { value: 'Lima', label: 'LIMA' },
        { value: 'Tumbes', label: 'TUMBES' },
        { value: 'Tacna', label: 'TACNA' }
    ];
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
    const history = useHistory();

    const consultarLugar = () => {
        history.push("/consultasBeneficiarios");
    }

    return ( 
        <Grid>
            <BarraInicial/>              
            <AppBar position="relative" style={{background: 'transparent', boxShadow: 'none'}}>
                <Toolbar>
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={12} justify="center">
                            <Typography variant="h3"  gutterBottom justify="center" >
                                    <h3 style={{color: 'black', margin: 20,justify:"center" }}>Cronograma</h3>
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
                    <Grid container direction="row"  justify="space-evenly" alignItems="center">
                        <Typography variant="subtitle1" color="inherit">
                            Fechas:
                        </Typography>
                        
                        <Typography variant="subtitle1" color="inherit">
                            Nombre lugar de entrega:
                        </Typography>
                        <TextField className="inputRounded" id="outlined-basic" label={null} variant="outlined" />
                    </Grid>
                </Grid>
            </Paper> 
            <Paper elevation={0} style={{marginLeft: 40, marginRight: 40, marginTop:10, marginBottom:20,  boxShadow: 'none'}}>
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
                                <TableCell align="left">{row.nombre}</TableCell>
                                <TableCell align="left">{row.locacion}</TableCell>
                                <TableCell align="left">{row.turno}</TableCell>
                                <TableCell align="left">{row.capacidad}</TableCell>
                                <TableCell align="left">{row.beneficiarios}</TableCell>
                                <TableCell align="left">{row.mujeres}</TableCell>
                                <TableCell align="left">{row.hombres}</TableCell>
                                <TableCell align="left">{row.discapacitados}</TableCell>
                                <TableCell align="left">{row.riesgo}</TableCell>
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
                <Grid container direction="row" justify="space-evenly" alignItems="center" >
                    <Button variant="contained" size="medium" color="primary" style={{margin: 10}}>
                        Descargar
                    </Button> 
                    <Link to='/' style={{textDecoration:"none"}}>
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