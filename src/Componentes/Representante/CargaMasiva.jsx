import { Button, Dialog, DialogActions, DialogTitle, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Tabla from './Tabla'
import axios from "axios";

const API_URL = "http://localhost:8084/api/";

const CargaMasiva = (props) => {

    const [open, setOpen] = useState(false)
    const [mensaje, setMensaje] = useState('')
    const [value, setValue] = React.useState(0)
    //Registros Exitosos
    const [registros, setRegistros] = React.useState([])

    //Errores de Carga
    const [errores, setErrores] = React.useState([])
    const [datosErrores, setDatosErrores] = React.useState([
        {especial: false, valor: '0',compuesto: false},
        {especial: false, valor: '1',compuesto: false},
    ])
  
    const handleClose = () => {
      setOpen(false)
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
        setRegistros([])
        setErrores([])
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
    
    const headCellsErrores = [
        { id: 'fila', numeric: false, disablePadding: false, label: 'Fila' },
        { id: 'error', numeric: false, disablePadding: false, label: 'Error' },
    ];

    const datosBeneficiarios = [
        {especial: false, valor: 'codigofamilia',compuesto: false},
        {especial: false, valor: 'fiddistrito',compuesto: false},
        {especial: true, valor: 'esdiscapacitado',verdadero: 'Si', falso:'No'},
        {especial: true, valor: 'masculino',verdadero: 'Masculino', falso:'Femenino'}
    ]
    
    const datosLugares = [
        {especial: false, valor: 'codigo',compuesto: false},
        {especial: false, valor: 'nombre',compuesto: false},
        {especial: false, valor: 'distrito',compuesto: true, segundo:'nombre'},
        {especial: false, valor: 'distrito',compuesto: true, segundo:'ubigeo'},
        {especial: false, valor: 'direccion',compuesto: false},
        {especial: false, valor: 'tipo',compuesto: false},
        {especial: false, valor: 'ratioAtencion',compuesto: false}
    ]

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
            setErrores(response.data.errores)
            let max = 0;
            let datos = []
            for (let index = 0; index < response.data.errores.length; index++) {
                if(response.data.errores[index].length>max) max = response.data.errores[index].length;
            }
            for (let index = 0; index < max; index++) {
                datos.push({especial: false, valor: index.toString(),compuesto: false})
            }
            setDatosErrores(datos)
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
            setErrores(response.data.errores)
            let max = 0;
            let datos = []
            for (let index = 0; index < response.data.errores.length; index++) {
                if(response.data.errores[index].length>max) max = response.data.errores[index].length;
            }
            for (let index = 0; index < max; index++) {
                datos.push({especial: false, valor: index.toString(),compuesto: false})
            }
            setDatosErrores(datos)
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
                    <Grid className='Contenedor'>
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
                        <Tabla columnas={registros} headCell={headCellsLugares} cabeceras={datosLugares}/>
                        :
                        <Tabla columnas={registros} headCell={headCellsBeneficiarios} cabeceras={datosBeneficiarios}/>
                        }
                    </Grid>
                :
                    null
                }
                {errores.length>0?
                    <Grid className='Contenedor'>
                        <Grid container style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                            <Typography variant="h4" color="inherit">
                                Lista de Errores en la Carga
                            </Typography>
                        </Grid>
                        <Tabla columnas={errores} headCell={headCellsErrores} cabeceras={datosErrores}/>
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