import React, {StrictMode, useEffect,useState} from 'react'
import {  AppBar, Toolbar,Typography,  Container,InputBase, Paper, Divider} from "@material-ui/core"
 import { Grid, Button } from "@material-ui/core"
 import { Link } from "react-router-dom"
 import axios from "axios";
 import PropTypes from 'prop-types';
 import Table from '@material-ui/core/Table';
 import TableBody from '@material-ui/core/TableBody';
 import TableCell from '@material-ui/core/TableCell';
 import TableContainer from '@material-ui/core/TableContainer';
 import TableHead from '@material-ui/core/TableHead';
 import TablePagination from '@material-ui/core/TablePagination';
 import TableRow from '@material-ui/core/TableRow';
 import TableSortLabel from '@material-ui/core/TableSortLabel';
 import HistoricoService from "../../Servicios/historico.service";
  //Para el mensaje de confirmacion
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//Para el api
import { history } from "../../helpers/history";
import  ModalPublicar  from "./ModalPublicar";
import  Cargando  from "../ModalCargando";
import { withStyles, makeStyles } from "@material-ui/core/styles";

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
    { id: 'nombre', numeric: false, disablePadding: false, label: 'Nombre' },
    { id: 'fechaIni', numeric: false, disablePadding: false, label: 'Fecha Inicio' },
    { id: 'fechaFin', numeric: false, disablePadding: false, label: 'Fecha Fin'},
    { id: 'beneficiarios', numeric: false, disablePadding: false, label: 'N° Beneficiarios' },
    { id: 'lugares', numeric: false, disablePadding: false, label: 'N° Lugares de entrega' },
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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
function formato(texto){
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
  }
  function formatoInverso(texto){ //Transformo desde DD/MM/AAAA a AAAA-MM-DD
    console.log(texto);
    var i=texto.indexOf('/',1); //Comienza desde 0
    console.log(i);
    var dia=texto.substring(0,i); 
        if(dia<10) dia="0"+dia;
    var j=(texto.substring(i+1,texto.length)).indexOf('/',1); //Comienza desde 0
    var mes=(texto.substring(i+1,texto.length)).substring(0,j); 
        if(mes<10) mes="0"+mes;
    var anio=(texto.substring(i+1,texto.length)).substring(j+1,texto.length);

    return anio +"-"+mes+"-"+dia;
  }
//   Rpta se utiliza para escribir  html en javascript
  const rpta = [
    { id: 'Respuesta',  label: 'Respuesta' },
   
  ];
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: "0px 0px",
      display: "flex",
      alignItems: "center",
      width: 150,
      borderRadius:100,
      margin:0,
      justify:"center", 
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
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
  }));

   const API_URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/cronograma/resumencronograma";//Caro  
  const ARI_URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/cronograma/generarcronograma";//Ari

  var updateCronograma=false;
//  path: /bonos
const GestionBonos = (props)=>{
    // mount = createMount();
    function guardarFecha(event){
        //Guarda la fecha cuando hay un cambio
        setSoloFecha(event);
        // console.log('e: ',event);
    }
    function guardarNombre(event){
        //Guarda el nombre cuando hay un cambio
        setSoloNombre(event);
        // console.log('e: ',event);
    }
    //const [openConfirmacion, setOpenConfirmacion] = useState(false);
    const [soloNombre, setSoloNombre] = useState("");
    const [soloFecha, setSoloFecha] = useState("");
    
  
   
   const handleCloseConfirmacion = (event, reason) => {
       if (reason === 'clickaway') {
           return;
       }
        //setOpenConfirmacion(false);
       
        setMensaje(defaultM);
   };

   
    const generarOpen={mensaje:"Generación exitosa. Le llegará un correo cuando este terminado el nuevo crograma.", 
                    open:true,severity:"success"}
    const errorOpen={mensaje:"Error", open:true,severity:"error"}
    const faltaOpen={mensaje:"No pueden haber campos vacíos", open:true,severity:"error"}
    const defaultM={mensaje:"", open:false,severity:"error"}
    const [mensaje,setMensaje]=useState(defaultM);
    
  //useState devuelve 2 valores, en la pos 0, devuelve  el valor, y el la pos 1, devuelve una función
        const classes = useStyles();
        var respuesta;
        const [cronograma,setCronograma]=useState([{    
                                "beneficiarios": "Cargando...",
                                "fechaini": "",
                                "idcronograma": "inicial",
                                "lugares": "Cargando...",
                                "fechafin": ""

        }]); //Set cronograma, creando y un estado de toda la función
        
        updateCronograma=false;       
            useEffect((cronograma) => {
                //Para que se actualice y mande a la pantalla principal
                if(cronograma===undefined || cronograma.length===0){                 
                     // /*     API API API API API
                    CronogramaActual();
                       
                }
            },  [])
            const CronogramaActual = () => {
                axios.post(API_URL)
                 .then(response =>{
                     console.log("API OBT : ",response.data);
                     if(response){                        
                        localStorage.setItem("cronogramaKaytlin", JSON.stringify(response.data)); //apenas lo recibo te lo envío
                        let apiCronograma = [];
                        apiCronograma.push(response.data);                        
                        if(apiCronograma){
                            setCronograma(apiCronograma);
                            console.log("API OBT cro: ",apiCronograma);                            
                            if(apiCronograma[0].idcronograma===""){
                                updateCronograma=true;                               
                            }                            
                        }                        
                     }                     
                 })
                 .catch((e) => {
                     console.log('Error al obtener Monitoreo',e);
                     respuesta="No se ha podido cargar el cronograma. Vuelva a intentarlo en unos minutos";
                     if (cronograma===null){
                        //Salio del catch de Caro problablemente
                        var ArrcronogramaNulo = [{ 
                            fechaini:"", 
                            fechafin:"",
                            beneficiarios:"",//Vendrán null
                            lugares:"",      //Vendrán null              
                
                        }];
                   
                        setCronograma(ArrcronogramaNulo);
                        
                    }
                 });           

            }
            const GenerarCronograma = () => {
                updateCronograma=true; 
                // const soloFecha = JSON.parse(localStorage.getItem("soloFecha")) ;    //La hemos obtenido 
                // const soloNombre = JSON.parse(localStorage.getItem("soloNombre")) ;    //La hemos obtenido 
                 const idUsuario= JSON.parse(localStorage.getItem("user")).id;
    
                console.log('idUsuario: ',idUsuario);
                console.log('solo nombre ',soloNombre," fecha: ",soloFecha);
                
                if(soloNombre!=="" && soloFecha!=="" ){
                    const params=     {
                        nombre:soloNombre, 
                        fechaini:formatoInverso(soloFecha), //AAAA-MM-DD
                        fechafin:"",
                        usuariocreacion:idUsuario,
                }
                    console.log('params',params);
                    //   API de Ari
                  axios.post(ARI_URL,params)
                  .then(response =>{
                      console.log("ARI url ",response.data);
                      let apiCronograma = [];
                      apiCronograma.push(response.data);
                      localStorage.setItem("Gcronograma", JSON.stringify(response.data));
                     
                      //setOpenConfirmacion(true);
                      setMensaje(generarOpen);
                      CronogramaActual();
                      
                    //   localStorage.setItem("openConf", JSON.stringify(true));
                     
                  })
                  .catch(() => {
                    // localStorage.setItem("openConf", JSON.stringify(true));
                        //setOpenError(true);
                        setMensaje(errorOpen);
                        
                      console.log('Error al obtener Cronograma generado')
                  });
                }
                else {
                    //setOpenError(true);
                    setMensaje(faltaOpen);
                    // localStorage.setItem("openConf", JSON.stringify(true));
                    console.log('else: ');
                   
                }
            
            
            }

       
       // console.log('cronograma:',cronograma);

        var titulo="Gestión de Bonos";
        
        var botones;
        console.log("API OBT cro2: ",cronograma);
        if(updateCronograma===true){
            // setOpenConfirmacion(true);
             botones=rpta.map((boton) =>   
                        <Grid key={boton.index}  container direction="row" justify="center">
                          <Grid container item md={3} justify="center">                                
                                    <Button variant="contained" size="medium" color="primary" onClick={GenerarCronograma} >
                                        Generar Cronograma 
                                    </Button>
                              
                                 
                            </Grid> 
                            <Grid container item md={3} justify="center">                                
                                    <Button variant="contained" size="medium" color="secondary" >
                                        Regresar
                                    </Button>                             
                            </Grid>
                            <Snackbar open={mensaje.open} autoHideDuration={13000} onClose={handleCloseConfirmacion} anchorOrigin={{ vertical: "top", horizontal: "center" }} key={"success"}>
                            <Alert open={mensaje.open} onClose={handleCloseConfirmacion} severity={mensaje.severity}>
                                 {mensaje.mensaje}
                                  </Alert>
                            </Snackbar>  
                           
                        </Grid>
                            
                    );

            
        }
        var f = new Date();
        var dd = f.getDate()+1;//Mañana
        var mm = f.getMonth()+1; 
        if(dd<10)           dd='0'+dd;
        if(mm<10)           mm='0'+mm;
        var escribePantalla=     {
            nombre:"", //<3
            FechaInicio:dd+ "/" + mm+ "/" + f.getFullYear(), //AAAA-MM-DD
        }
        localStorage.setItem("soloFecha",JSON.stringify(escribePantalla.FechaInicio)); 
        if( cronograma[0].idcronograma==="" ){//entra por el api-no hay cronograma
          respuesta=  "Cargando Cronograma...";
            
              //Todoooo la muestra del cronograma está manejado por respuesta
            respuesta= rpta.map((rpta,index)   =>
            <Grid key={rpta.id} container direction="col" justify="center">
                <Grid container direction="row" item md={12} style={{paddingTop: '1.5vh'}}>
                    <Typography variant="subtitle1" color="inherit">
                        {/* {mensajeBeneficiario} */}
                     </Typography>

                </Grid>
                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                     <Grid container direction="row" item md={4} style={{paddingTop: '7px'}}>
                            <Typography variant="subtitle2" color="inherit" >
                                {'Nombre del Cronograma: '}
                            </Typography>
                      </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} >
                            <Paper component="form"  className={classes.root}>
   
                                <InputBase
                                    className={classes.input}
                                     placeholder= {"Escriba el nombre de un bono"}                                
                                    style={{padding:0 }}
                                    inputProps={{ "aria-label": "Escriba un nombre" }}
                                    defaultValue={escribePantalla.nombre}
                                    onChange={e =>guardarNombre(e.target.value)}
                                />
                             </Paper>                              
                        </Grid>

                        )) }


                </Grid>

                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                     <Grid container direction="row" item md={4} style={{paddingTop: '7px'}}>
                            <Typography variant="subtitle2" color="inherit" >
                                {'Fecha de inicio de reparto: '}
                            </Typography>
                      </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} >
                            <Paper component="form"  className={classes.root}>   
                                <InputBase
                                    className={classes.input}
                                     placeholder= {"DD/MM/AAAA"}                                
                                    style={{padding:0 }}
                                    inputProps={{ "aria-label": "Escriba una fecha" }}
                                    defaultValue={escribePantalla.FechaInicio}
                                    onChange={e =>guardarFecha(e.target.value)}
                                />
                             </Paper>
                               {/* <Typography variant="subtitle2" color="inherit">
                                    {opcion.fechaini?opcion.fechaini:"Por definir"}
                            </Typography> */}
                        </Grid>

                        )) }


                </Grid>
                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                    <Grid container direction="row" item md={4} >
                        <Typography variant="subtitle2" color="inherit">
                            {'Fecha de final de reparto: '}
                        </Typography>
                    </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} >
                            <Typography variant="subtitle2" color="inherit">
                            {opcion.fechafin? opcion.fechafin:"Por definir" }
                            </Typography>
                        </Grid>

                        )) }

                </Grid>
                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                    <Grid container direction="row" item md={4} >
                        <Typography variant="subtitle2" color="inherit">
                            {'Total de Beneficiarios: '}
                        </Typography>
                    </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} >
                            <Typography variant="subtitle2" color="inherit">
                                {opcion.beneficiarios}
                            </Typography>
                        </Grid>

                    ))
                    }

                </Grid>

                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                     <Grid container direction="row" item md={4} >
                        <Typography variant="subtitle2" color="inherit">
                            {'Total de Lugares de Entrega:  '}
                        </Typography>
                    </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} >
                            <Typography variant="subtitle2" color="inherit">
                                {opcion.lugares}
                            </Typography>
                        </Grid>
                     ))
                    }

                </Grid>

            </Grid>

            )
        // var confirmacion2 = JSON.parse(localStorage.getItem("openConf")) ;    //La hemos obtenido 
            //setOpenConfirmacion(confirmacion2);
           
                botones=rpta.map((boton) =>   
                        <Grid key={boton.index}  container direction="row" justify="center">
                            <Grid container item md={3} justify="center">                                
                                    <Button variant="contained" size="medium" color="primary" onClick={GenerarCronograma} >
                                        Generar Cronograma 
                                    </Button>   
                                            
                            </Grid>
                            <Grid container item md={3} justify="center">                                
                                    <Button variant="contained" size="medium" color="secondary" >
                                        Regresar
                                    </Button>                             
                            </Grid>
                            <Snackbar open={mensaje.open} autoHideDuration={13000} onClose={handleCloseConfirmacion} anchorOrigin={{ vertical: "top", horizontal: "center" }} key={"success"}>
                                <Alert open={mensaje.open} onClose={handleCloseConfirmacion} severity={mensaje.severity}>
                                        {mensaje.mensaje}
                                </Alert>
                            </Snackbar>   
                          
                        </Grid>
                            
                    );
            
        
         
          
        }
        
        else if (cronograma[0].idcronograma!==""  && cronograma[0].idcronograma!=="inicial" ){//Existe un id
            
            //cambio de formato de Fecha-super no eficiente :(
            var formatoFecha;
            if(cronograma.length===1 && cronograma[0].fechaini !==null && cronograma[0].fechafin !==null){
                // console.log('fecha antes:', cronograma[0].fechaini);
               formatoFecha=formato( cronograma[0].fechaini); 
               cronograma[0].fechaini=formatoFecha;
               formatoFecha=formato( cronograma[0].fechafin);
               cronograma[0].fechafin=formatoFecha;
                botones=rpta.map((boton) =>   
                        <Grid key={boton.index}  container direction="row" justify="center">
                            <Grid container item md={3} justify="center">
                                <Link 
                                    to={{
                                        pathname: "/cronogramaParaRepresentante"
                                       
                                      }}
                                    style={{textDecoration:"none"}}>
                                    <Button variant="contained" size="medium" color="primary" >
                                        Ver Cronograma 
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid container item md={3} justify="center">  
                                <ModalPublicar></ModalPublicar>
                            </Grid>
                        </Grid>
                    );
            }
            else{
                botones=rpta.map((boton) =>   
                        <Grid key={boton.index}  container direction="row" justify="center">
                            <Grid container item md={3} justify="center">                                
                                    <Button variant="contained" size="medium" color="primary" onClick={GenerarCronograma} >
                                        Generar Cronograma 
                                    </Button>    
                                    <Snackbar open={mensaje.open} autoHideDuration={13000} onClose={handleCloseConfirmacion} anchorOrigin={{ vertical: "top", horizontal: "center" }} key={"success"}>
                            <Alert open={mensaje.open} onClose={handleCloseConfirmacion} severity={mensaje.severity}>
                            {mensaje.mensaje}
                                  </Alert>
                            </Snackbar>  
                       
                                 
                                                     
                            </Grid>
                            <Grid container item md={3} justify="center">                                
                                    <Button variant="contained" size="medium" color="secondary" >
                                        Regresar
                                    </Button>                             
                            </Grid>
                        </Grid>
                            
                    );
            }
              //Todoooo la muestra del cronograma está manejado por respuesta
            respuesta= rpta.map((rpta,index)   =>
            <Grid key={rpta.id} container direction="col" justify="center">
                <Grid container direction="row" item md={12} style={{paddingTop: '1.5vh'}}>
                    <Typography variant="subtitle1" color="inherit">
                        {/* {mensajeBeneficiario} */}
                     </Typography>

                </Grid>


                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                     <Grid container direction="row" item md={4} >
                            <Typography variant="subtitle2" color="inherit">
                                {'Nombre del Cronograma:  '}
                            </Typography>
                      </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} >
                            <Typography variant="subtitle2" color="inherit">
                                    {/* Cambiaría y sería por el nombre */}
                                    {opcion.nombre}
                            </Typography>
                        </Grid>

                        )) }
                </Grid>

                

                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                     <Grid container direction="row" item md={4} >
                            <Typography variant="subtitle2" color="inherit">
                                {'Fecha de inicio de reparto: '}
                            </Typography>
                      </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} >
                            {/* Manejo de input TEXT FIELD para que pongamos un cronograma -
                               enviar por params la fecha de inicio, el id mio
                            */}
                            {/* <TextField className="inputRounded" id="outlined-basic" label={null} variant="outlined" /> */}
                            <Typography variant="subtitle2" color="inherit">
                                    {opcion.fechaini?opcion.fechaini:"Por definir"}
                            </Typography>
                        </Grid>

                        )) }
                </Grid>


                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                    <Grid container direction="row" item md={4} >
                        <Typography variant="subtitle2" color="inherit">
                            {'Fecha de final de reparto: '}
                        </Typography>
                    </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} >
                            <Typography variant="subtitle2" color="inherit">
                            {opcion.fechafin? opcion.fechafin:"Por definir" }
                            </Typography>
                        </Grid>

                        )) }

                </Grid>
                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                    <Grid container direction="row" item md={4} >
                        <Typography variant="subtitle2" color="inherit">
                            {'Total de Beneficiarios: '}
                        </Typography>
                    </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} >
                            <Typography variant="subtitle2" color="inherit">
                                {opcion.beneficiarios}
                            </Typography>
                        </Grid>

                    ))
                    }

                </Grid>

                <Grid container direction="col" item md={12} style={{paddingTop: '1.5vh'}}>
                     <Grid container direction="row" item md={4} >
                        <Typography variant="subtitle2" color="inherit">
                            {'Total de Lugares de Entrega:  '}
                        </Typography>
                    </Grid>
                    {cronograma.map(opcion=> (
                        <Grid container direction="row" item md={4} >
                            <Typography variant="subtitle2" color="inherit">
                                {opcion.lugares}
                            </Typography>
                        </Grid>
                     ))
                    }

                </Grid>

            </Grid>

            )

        }
        else  if ( cronograma[0].idcronograma==="inicial" ){           
        //  respuesta="Cargando..."
         respuesta=rpta.map((boton) => 
            <Cargando/>
         );

     }

     const [rows, setRows] = useState([]);
     useEffect(() => {
       HistoricoService.mostrarHistorico().then(response =>{
           let rowsAux = [];
           response.data.map(hist => {
             rowsAux.push({
               id: hist.id, 
               nombre: hist.nombre,
               fechaIni: hist.fechaini,
               fechaFin: hist.fechafin, 
               beneficiarios: hist.beneficiarios,
               lugares: hist.lugares
               });
           });
           setRows(rowsAux);
           console.log(rows);
         })
         .catch(() => {
           console.log('Error al obtener historico')
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
    //PARA MODAL CARGANDO
    const useStyles2 = makeStyles((theme) => ({
        root: {
          display: 'flex',
          '& > * + *': {
            marginLeft: theme.spacing(2),
          },
        },
      }));
    const classes2 = useStyles2();
    //FIN DE MODAL CARGANDO



    return (
        <StrictMode >
        <Grid style={{minHeight:"88vh"}}>
               <AppBar position="relative" style={{background: 'transparent', boxShadow: 'none'}}>
                    <Toolbar>
                        <Grid container direction="row" justify="center">
                            <Grid container item xs={12} justify="center">
                                <Typography variant="h3" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold"}} gutterBottom justify="center" >
                                     {titulo}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

            <Grid className='Contenedor'>
                <Container style={{margin: 10, boxShadow: 'none'}}>
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={12} justify="center">                            
                            <Typography variant="h5"  gutterBottom justify="center" >
                                { respuesta }
                            </Typography>
                        </Grid>
                    </Grid>
                    {/* botones */}
                    <Grid container direction="row" justify="center">
                      {botones}

                    </Grid>
                  
                  
                </Container>

            </Grid>
            {/* <Divider style={{ height:"2px", backgroundColor:"black"}}/> */}
            {/* Historico de Bonos */}
            <Grid> 
                <Grid container style={{paddingBottom: '3vh',paddingTop: '3vh',marginLeft: 40}}>
                    <Typography variant="h4" color="inherit">
                        Monitoreo Histórico
                    </Typography>
                </Grid>
                <Paper elevation={0} style={{marginLeft: 40, marginRight: 40, marginTop:10,  boxShadow: 'none'}}>
                    {rows.length > 0?
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
                                    <TableCell align="left">{row.fechaIni.substring(8)+row.fechaIni.substring(4,8)+row.fechaIni.substring(0,4)}</TableCell>
                                    <TableCell align="left">{row.fechaFin.substring(8)+row.fechaFin.substring(4,8)+row.fechaFin.substring(0,4)}</TableCell>
                                    <TableCell align="left">{row.beneficiarios}</TableCell>
                                    <TableCell align="left">{row.lugares}</TableCell>
                                    </TableRow>
                                );
                                })}
                            </TableBody>
                            
                        </Table>
                        </TableContainer>
                        <TablePagination
                        rowsPerPageOptions={[5, 10, { value: -1, label: 'Todo' }]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}                    
                        />
                    </Grid>:
                        // <Grid container direction="row" justify="center">
                        //     <Grid container item xs={12} justify="center">
                        //         <Typography variant="h3"  gutterBottom justify="center" >
                        //                 <h3 style={{color: 'black', margin: 20,justify:"center" }}>No hay ningún lugar de entrega que coincida con la búsqueda</h3>
                        //         </Typography> 
                        //     </Grid>                                                  
                        // </Grid>
                        <Grid container direction="row" justify="center">
                            <Cargando/>
                        </Grid>                        
                        }       
                        {/* CARGANDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO */}          
                </Paper>      
            </Grid>
        </Grid>
        </StrictMode>
    );




};


export default GestionBonos;
  
/*


*/