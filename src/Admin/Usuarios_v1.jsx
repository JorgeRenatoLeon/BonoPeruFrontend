import React from 'react'
import BarraInicial from '../Componentes/Barras/BarraInicial'
import BarraFinal from '../Componentes/Barras/BarraFinal'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import SearchField from "react-search-field";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import '../assets/css/FondoBeneficiario.css'
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core"
import { Grid, Button } from "@material-ui/core"
import { Link } from "react-router-dom"

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
  },
});

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "5AB9EA", /*CAMBIAR EL COLOR AZUL=5AB9EA*/
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
const StyledTableRow = withStyles((theme) => ({
root: {
    '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    },
},
}))(TableRow);

/*Me falta hacer el back para obtener la data*/
function createData(nombre, apellido, correo) {
    return {nombre, apellido, correo};
}

const headCells = [
    { id: 'nombre', numeric: false, disablePadding: false, label: 'Nombres' },
    { id: 'apellido', numeric: false, disablePadding: false, label: 'Apellidos' },
    { id: 'correo', numeric: false, disablePadding: false, label: 'Correo' },
    { id: 'accion', numeric: false, disablePadding: false, label: 'Acciones' },
  ];

const rows = [
    createData('Pedro Luis', 'Ramos Rojas', 'pedroramos@bancoabc.com'),
    createData('Víctor Andres', 'Baron Solana', 'victorbaron@bancoabc.com'),
    createData('Domingo', 'Serrano Araque', 'dserrano@bancoxyz.com'),
    createData('Sara Susana', 'Llano', 'dserrano@bancoxyz.com'),
    createData('María Concepción', 'Arrieta Granada', 'dserrano@bancoxyz.com'),
];


/* VENTANA MODAL */
function abrirModal() {
    const classes = useStyles(); 
    return (
      <div>        
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Transition modal</h2>
              <p id="transition-modal-description">react-transition-group animates me.</p>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }

/* TABLA USUARIOS */
export default function Usuarios() {
    //estilo
    const classes = useStyles();
    //ventana modal
    const [open, setOpen] = React.useState(false);  
    const handleOpen = () => {
      setOpen(true);
    };  
    const handleClose = () => {
      setOpen(false);
    };
  
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

            <div className='Tabla'>
                <TableContainer component={Paper} style={{margin: 30, boxShadow: 'none'}}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                        <StyledTableCell>Nombres</StyledTableCell>
                        <StyledTableCell align="right">Apellidos</StyledTableCell>
                        <StyledTableCell align="right">Correo</StyledTableCell>
                        <StyledTableCell align="right">Acciones</StyledTableCell>                        
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                        <StyledTableRow key={row.nombre}>
                            <StyledTableCell component="th" scope="row">{row.nombre}</StyledTableCell>
                            <StyledTableCell align="right">{row.apellido}</StyledTableCell>
                            <StyledTableCell align="right">{row.correo}</StyledTableCell>
                            <button type="button" onClick={handleOpen}>Editar</button>
                        </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            </Container>
        <BarraFinal/>
    </div>        
    );
}
