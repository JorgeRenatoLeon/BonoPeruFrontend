import { Button, Dialog, DialogActions, DialogTitle, Grid, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Tabs, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";

const API_URL = "http://localhost:8084/api/";

const CargaMasiva = (props) => {

    const [open, setOpen] = useState(false)
    const [mensaje, setMensaje] = useState('')
    const [value, setValue] = React.useState(0)
    const [registros, setRegistros] = React.useState([])
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    const handleClose = () => {
      setOpen(false);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setRegistros([]);
    }

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

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function descendingComparator(a, b, orderByAux) {
        if (b[orderByAux] < a[orderByAux]) {
          return -1;
        }
        if (b[orderByAux] > a[orderByAux]) {
          return 1;
        }
        return 0;
    }

    function getComparator(orderAux, orderByAux) {
        return orderAux === 'desc'
          ? (a, b) => descendingComparator(a, b, orderByAux)
          : (a, b) => -descendingComparator(a, b, orderByAux);
    }

    const headCellsLugares = [
        { id: 'codigo', numeric: false, disablePadding: false, label: 'Codigo' },
        { id: 'nombre', numeric: false, disablePadding: false, label: 'Nombre' },
        { id: 'distrito', numeric: false, disablePadding: false, label: 'Distrito' },
        { id: 'ubigeo', numeric: false, disablePadding: false, label: 'Ubigeo' },
        { id: 'direccion', numeric: false, disablePadding: false, label: 'Direccion'},
        { id: 'tipo', numeric: false, disablePadding: false, label: 'Tipo' },
        { id: 'ratio', numeric: false, disablePadding: false, label: 'Ratio' },
    ];

    const headCellsBeneficiarios = [
        { id: 'codigo', numeric: false, disablePadding: false, label: 'Codigo de Hogar' },
        { id: 'distrito', numeric: false, disablePadding: false, label: 'Distrito' },
        { id: 'ubigeo', numeric: false, disablePadding: false, label: 'Discapacitado' },
        { id: 'direccion', numeric: false, disablePadding: false, label: 'Sexo'},
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

    function EnhancedTableHead(propsAux) {
        const {  orderAux, orderByAux, onRequestSort } = propsAux;
        const createSortHandler = (property) => (event) => {
          onRequestSort(event, property);
        };
        const headCellsAux = value===1?headCellsLugares:headCellsBeneficiarios
        return (
          <TableHead>
            <TableRow>
              {headCellsAux.map((headCell) => (
                <StyledTableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  padding={headCell.disablePadding ? 'none' : 'default'}
                  sortDirection={orderByAux === headCell.id ? orderAux : false}
                  style={{ background: '#5AB9EA' }}
                >
                  <TableSortLabel
                    active={orderByAux === headCell.id}
                    direction={orderByAux === headCell.id ? orderAux : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderByAux === headCell.id ? (
                      <span>
                        {orderAux === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
        );
    }

    const cargarLugaresEntrega = event => { 

        let file = event.target.files[0]

        const formData = new FormData();

        formData.append( 
            "file",
            file,
            file.name
        );
        
        console.log(file)

        axios
        .post(API_URL + "lugarentrega/carga/"+ JSON.parse(localStorage.getItem("user")).id, 
        formData,
        {   
            headers: {
                "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        .then(response =>{
            console.log("API Cargar Lugares Entrega: ",response.data)
            setMensaje('Carga Exitosa')
            setOpen(true)
            setRegistros(response.data.lugares)
        })
        .catch(() => {
            console.log('Error al Cargar Lugares de Entrega')
            setMensaje('Error al Cargar')
            setOpen(true)
        });
    }; 

    const cargarBeneficiarios = event => { 

        let file = event.target.files[0]

        const formData = new FormData();

        formData.append( 
            "file",
            file,
            file.name
        );
        
        console.log(file)

        axios
        .post(API_URL + "beneficiario/carga/"+ JSON.parse(localStorage.getItem("user")).id, 
        formData,
        {   
            headers: {
                "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        .then(response =>{
            console.log("API Cargar Lugares Entrega: ",response.data)
            setMensaje('Carga Exitosa')
            setOpen(true)
            setRegistros(response.data.beneficiarios)
        })
        .catch(() => {
            console.log('Error al Cargar Lugares de Entrega')
            setMensaje('Error al Cargar')
            setOpen(true)
        });
    }; 
    
    const StyledTabs = withStyles({
        indicator: {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'white',
            '& > span': {
                maxWidth: 40,
                width: '100%',
                backgroundColor: '#635ee7',
            },
        },
    })((propsAux) => <Tabs {...propsAux} TabIndicatorProps={{ children: <span /> }} />);

    const StyledTab = withStyles((theme) => ({
        root: {
            textTransform: 'none',
            color: '#000000',
            backgroundColor: 'white',
            borderRadius: '15px',
            fontWeight: theme.typography.fontWeightRegular,
            fontSize: theme.typography.pxToRem(15),
            marginRight: theme.spacing(1),
            '&:focus': {
                opacity: 1,
            },
        },
    }))((propsAux) => <Tab disableRipple {...propsAux} />);

    return ( 
        <Grid>
            <Grid container direction="column" style={{minHeight: '88vh'}}>
                <Grid container justify="center" style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                    <Typography variant="h3" color="inherit">
                        Carga de Datos
                    </Typography>
                </Grid>
                <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
                    <StyledTab label="Beneficiarios" />
                    <StyledTab label="Lugares de Entrega" />
                </StyledTabs>
                {value===1?
                <Grid className='Contenedor'>
                    <Grid container direction="row">
                        <Typography variant="h5" color="inherit">
                            Formato de Carga 
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography>
                            - El archivo debe tener formato .csv
                        </Typography>
                        <Typography>
                            - El archivo debe tener el siguiente formato “código, nombre de la agencia, departamento, provincia, distrito,  dirección, capacidad, media de atención y lista de horarios,, zona de riesgo del distrito(del 1 al 5) siendo 1 el menos riesgoso y 5 el más riesgoso”
                        </Typography>
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={6} sm={2} justify="center" style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                            <input
                                accept=".csv"
                                id="contained-button-file"
                                multiple
                                type="file"
                                style={{display:'none'}}
                                onChange={cargarLugaresEntrega}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span">
                                    Subir Archivo
                                </Button>
                            </label>
                        </Grid>
                        <Grid container item xs={6} sm={2} justify="center" style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                            <Link to='/'>
                                <Button variant="contained"  size="medium" color="secondary">
                                    Cancelar
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                :
                <Grid className='Contenedor'>
                    <Grid container direction="row">
                        <Typography variant="h5" color="inherit">
                            Formato de Carga 
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography>
                            - El archivo debe tener formato .csv en caso contrario se muestra un mensaje de error
                        </Typography>
                        <Typography>
                            - El archivo debe tener el formato establecido en datos abiertos, es decir, “código de hogar, ubigeo(6 dígitos),
                            nombre de departamento, nombre de provincia, nombre de distrito, código de género (1: masculino, 2: femenino), código de incapacidad, 
                            código de jefe de familia, código de discapacidad severa (1: presenta discapacidad severa, 0: no presenta discapacidad severa), 
                            código de edad (1: adulto mayor, 0: no adulto mayor)”, en caso contrario se mostrará un mensaje de error
                        </Typography>
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={6} sm={2} justify="center" style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                            <input
                                accept=".csv"
                                id="contained-button-file"
                                multiple
                                type="file"
                                style={{display:'none'}}
                                onChange={cargarBeneficiarios}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span">
                                    Subir Archivo
                                </Button>
                            </label>
                        </Grid>
                        <Grid container item xs={6} sm={2} justify="center" style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                            <Link to='/'>
                                <Button variant="contained"  size="medium" color="secondary">
                                    Cancelar
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                }
                {registros.length>0?
                    <Grid>
                        {value===1?
                        <Grid container style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                            <Typography variant="h4" color="inherit">
                                Lugares de Entrega cargados
                            </Typography>
                        </Grid>
                        :
                        <Grid container style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                            <Typography variant="h4" color="inherit">
                                Beneficiarios cargados
                            </Typography>
                        </Grid>
                        }
                        {value===1?
                        <TableContainer>
                            <Table
                                aria-labelledby="tableTitle"
                                aria-label="enhanced table"
                            >
                                <EnhancedTableHead
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {stableSort(registros, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                
                                        return (
                                            <TableRow hover tabIndex={-1} key={index}>
                                                <TableCell align="left">{row.codigo}</TableCell>
                                                <TableCell align="left">{row.nombre}</TableCell>
                                                <TableCell align="left">{row.distrito.nombre}</TableCell>
                                                <TableCell align="left">{row.distrito.ubigeo}</TableCell>
                                                <TableCell align="left">{row.direccion}</TableCell>
                                                <TableCell align="left">{row.tipo}</TableCell>
                                                <TableCell align="left">{row.ratioAtencion}</TableCell>
                                            </TableRow>
                                        );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        :
                        <TableContainer>
                            <Table
                                aria-labelledby="tableTitle"
                                aria-label="enhanced table"
                            >
                                <EnhancedTableHead
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {stableSort(registros, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                
                                        return (
                                            <TableRow hover tabIndex={-1} key={index}>
                                            <TableCell align="left">{row.codigofamilia}</TableCell>
                                            <TableCell align="left">{row.fiddistrito}</TableCell>
                                            <TableCell align="left">{row.esdiscapacitado?'Si':'No'}</TableCell>
                                            <TableCell align="left">{row.esdiscapacitado?'Femenino':'Masculino'}</TableCell>
                                            </TableRow>
                                        );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        }
                        <TablePagination
                            rowsPerPageOptions={[5, 10, { value: -1, label: 'Todo' }]}
                            component="div"
                            count={registros.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Grid>
                :
                    null
                }
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{mensaje}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
 
export default CargaMasiva;