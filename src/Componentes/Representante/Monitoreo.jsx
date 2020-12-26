import React from 'react'
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core"
import { Grid, Button } from "@material-ui/core"
import { Link } from "react-router-dom"
//Para los chart 
import Line from "../../Componentes/Graficos/Line.js"
import Bar from "../../Componentes/Graficos/Bar.js"
import Pie from "../../Componentes/Graficos/Pie.js"
import { makeStyles } from '@material-ui/core/styles';
//Para los card
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from "axios"; //Para el api
import { useEffect, useState } from "react";
//Pata los combobox/filtros del monitoreo
import '../../assets/css/Cronograma.css';
import Checkbox from '@material-ui/core/Checkbox';
import HorariosService from "../../Servicios/horarios.service";
import DepartamentosService from "../../Servicios/departamentos.service";
import ProvinciasService from "../../Servicios/provincias.service";
import DistritosService from "../../Servicios/distritos.service";
import DescargaService from "../../Servicios/descarga.cronograma";
import Combobox from '../Elementos/Combobox';
import RangoFechas from '../Elementos/RangoFechas';
import Cargando from "../ModalCargando";

export default function GestionBonos() {
  function formato(texto) {
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
  }
  //   Rpta se utiliza para escribir  html en javascript
  const rpta = [{ id: 'Respuesta', label: 'Respuesta' },];
  //   cronograma que se desea monitorear

    var cronogramaGestionBonos = JSON.parse(localStorage.getItem("cronogramaKaytlin")) ; //Para el id
    //cronogramaGestionBonos.idcronograma,
    //inicio manejo de filtros
    const cronogramaInicial={
      listaDepartamentos:[],
      listaProvincias:[],
      listaDistritos:[],
      fechaini: cronogramaGestionBonos.fechaini,
      fechafin: cronogramaGestionBonos.fechafin
    }

    const [departamento,setSelectedDep] = useState(null);
    const [provincia,setSelectedProv] = useState(null);
    const [distrito,setSelectedDis] = useState(null);  
    const [cbxProv, setStateCbxProv] = useState(true);
    const [cbxDis,setStateCbxDis] = useState(true);
    const [departamentos, setDep] = useState([]);
    const [provincias, setProv] =useState([]);
    const [distritos, setDis] =useState([]);
    useEffect(() => {
    
      DepartamentosService.mostrarDepartamentos().then(response =>{
        let depAux=[];
        response.data.map(dep => {
          depAux.push({
                value: dep.iddepartamento,
                label: dep.nombre,
            });
        });
      });
      setDep(depAux);
      // console.log(departamentos);
    })
      .catch(() => {
        console.log('Error al pedir los departamentos')
      });

  }, []);
  const apiProvincias = (valor) => {
    setStateCbxProv(false);
    ProvinciasService.mostrarProvincias(valor).then(response => {
      let provAux = [];
      response.data.map(prov => {
        provAux.push({
          value: prov.idprovincia,
          label: prov.nombre,
        });
      });
      setProv(provAux);
    })
      .catch(() => {
        console.log('Error al pedir las provincias');

      });
  }

  const apiDistritos = (valor) => {
    setStateCbxDis(false);
    DistritosService.mostrarDistritos(valor).then(response => {
      let disAux = [];
      response.data.map(prov => {
        disAux.push({
          value: prov.iddistrito,
          label: prov.nombre,
        });
      });
      setDis(disAux);
      // console.log(distritos);

    })
      .catch(() => {
        console.log('Error al pedir los distritos');

      });
  }

  const handleComboboxDep = (valor) => {
    setSelectedDep(valor);
    // console.log(departamento,"id depa"); 
    apiProvincias(valor);
  }

  const handleComboboxProv = (valor) => {
    setSelectedProv(valor);
    // console.log(valor,"id prov");
    apiDistritos(valor);
  }

  const handleComboboxDis = (valor) => {
    setSelectedDis(valor);
  }

  const [fechaInicio, setSelectedFechaIni] = useState(cronogramaInicial.fechaini);
  const [fechaFin, setSelectedFechaFin] = useState(cronogramaInicial.fechafin);
  const cambiar = (fechaIni, fechaFin) => {
    if ((fechaFin !== null) && (fechaIni !== null)) {
      // console.log("estoy dentro de cronograma",fechaIni.toDate().getFullYear()+"-"+("0" + (fechaIni.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaIni.toDate().getDate()).slice(-2),
      //fechaFin.toDate().getFullYear()+"-"+("0" + (fechaFin.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaFin.toDate().getDate()).slice(-2));
      setSelectedFechaIni(fechaIni.toDate().getFullYear() + "-" + ("0" + (fechaIni.toDate().getMonth() + 1)).slice(-2) + "-" + ("0" + fechaIni.toDate().getDate()).slice(-2));
      setSelectedFechaFin(fechaFin.toDate().getFullYear() + "-" + ("0" + (fechaFin.toDate().getMonth() + 1)).slice(-2) + "-" + ("0" + fechaFin.toDate().getDate()).slice(-2));
    } else if (fechaIni === null && fechaFin !== null) {
      setSelectedFechaIni(cronogramaInicial.fechaIni);
      setSelectedFechaFin(fechaFin.toDate().getFullYear() + "-" + ("0" + (fechaFin.toDate().getMonth() + 1)).slice(-2) + "-" + ("0" + fechaFin.toDate().getDate()).slice(-2));
    } else if (fechaIni !== null && fechaFin === null) {
      setSelectedFechaIni(fechaIni.toDate().getFullYear() + "-" + ("0" + (fechaIni.toDate().getMonth() + 1)).slice(-2) + "-" + ("0" + fechaIni.toDate().getDate()).slice(-2));
      setSelectedFechaFin(cronogramaInicial.fechafin);
    } else if (fechaIni === null && fechaFin === null) {
      setSelectedFechaIni(cronogramaInicial.fechaIni);
      setSelectedFechaFin(cronogramaInicial.fechafin);
    }
  
    const handleComboboxDep=(valor)=>{
      let arr=[];
      arr.push(valor);
      setSelectedDep(arr);
      // console.log("arr depa ",departamento); 
      // console.log("arr depa ",arr); 
      // console.log("valor ",valor); 
      apiProvincias(valor);
    }
  
    const handleComboboxProv=(valor)=>{
      let arr=[];
      arr.push(valor);
      setSelectedProv(arr);
      // console.log(valor,"id prov");
      apiDistritos(valor);
    }
  
    const handleComboboxDis=(valor)=>{
      let arr=[];
      arr.push(valor);
      setSelectedDis(arr);
    }
  
    const [fechaInicio,setSelectedFechaIni]=useState(cronogramaInicial.fechaini);
    const [fechaFin, setSelectedFechaFin]=useState(cronogramaInicial.fechafin);
    const cambiar=(fechaIni,fechaFin)=>{
      if((fechaFin !== null) && (fechaIni!== null)){
        // console.log("estoy dentro de cronograma",fechaIni.toDate().getFullYear()+"-"+("0" + (fechaIni.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaIni.toDate().getDate()).slice(-2),
        //fechaFin.toDate().getFullYear()+"-"+("0" + (fechaFin.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaFin.toDate().getDate()).slice(-2));
        setSelectedFechaIni(fechaIni.toDate().getFullYear()+"-"+("0" + (fechaIni.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaIni.toDate().getDate()).slice(-2));
        setSelectedFechaFin(fechaFin.toDate().getFullYear()+"-"+("0" + (fechaFin.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaFin.toDate().getDate()).slice(-2));
      }else if(fechaIni === null && fechaFin !== null){
        setSelectedFechaIni(cronogramaInicial.fechaIni);
        setSelectedFechaFin(fechaFin.toDate().getFullYear()+"-"+("0" + (fechaFin.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaFin.toDate().getDate()).slice(-2));
      }else if(fechaIni !== null && fechaFin === null){
        setSelectedFechaIni(fechaIni.toDate().getFullYear()+"-"+("0" + (fechaIni.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaIni.toDate().getDate()).slice(-2));
        setSelectedFechaFin(cronogramaInicial.fechafin);
      }else if(fechaIni === null && fechaFin === null){
        setSelectedFechaIni(cronogramaInicial.fechaIni);
        setSelectedFechaFin(cronogramaInicial.fechafin);
      }
  
    }
    const filtrarReporte=()=>{
      // console.log("en buscar",fechaInicio,fechaFin);
      const cronogramaBusqueda={
        idcronograma: cronogramaGestionBonos.idcronograma,
        listaDepartamentos: departamento,
        listaProvincias: provincia,
        listaDistritos: distrito,
        fechaini: fechaInicio,
        fechafin: fechaFin,
      }    
      console.log('cronogramaBusqueda',cronogramaBusqueda)
      apiEntregados(cronogramaBusqueda);
      apiLugares(cronogramaBusqueda);
      apiTotales(cronogramaBusqueda);
    }
    //Fin de manejo de filtros
    //Para card de reporte 
    const useStyles = makeStyles({
      root: {
        minWidth: 275,
        marginRight:20,
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      // title: {
      //   fontSize: 14,
      // },
      pos: {
        marginBottom: 12,
      },
    });
    //Colores del chart
    const backgroundColor=[       
    'rgb(179,229,252,0.5)', 'rgb(100, 149, 237,1)', //Celeste
    'rgb(0, 0, 139,1) ', '	rgb(51,51,255,1)',//azul
    '	rgb(0, 255, 127,1)', 'rgb(144, 238, 144,1)',//verde
    'pink', '	rgb(240, 128, 128,1)', //rosado
    'rgb(255, 127, 80,1)', '	rgb(244, 164, 96,1)',//naranjita palido
    'rgb(0, 255, 255,0.8)', 'rgb(100, 149, 237,0.8)', //Celeste
    'rgb(0, 0, 139,0.8) ', '	rgb(51,51,255,0.8)',//azul
    '	rgb(0, 255, 127,0.8)', 'rgb(144, 238, 144,0.8)',//verde
    'pink', '	rgb(240, 128, 128,1)', //rosado
    'rgb(255, 127, 80,0.8)', '	rgb(244, 164, 96,0.8)',//naranjita palido
    'rgb(0, 255, 255,0.6)', 'rgb(100, 149, 237,0.6)', //Celeste
    'rgb(0, 0, 139,0.6) ', '	rgb(51,51,255,0.6)',//azul
    '	rgb(0, 255, 127,0.6)', 'rgb(144, 238, 144,0.6)',//verde
    'pink', '	rgb(240, 128, 128,0.6)', //rosado
    'rgb(255, 127, 80,0.6)', '	rgb(244, 164, 96,0.6)',//naranjita palido
    'rgb(0, 255, 255,0.4)', 'rgb(100, 149, 237,0.4)', //Celeste
    'rgb(0, 0, 139,0.4) ' , '	rgb(51,51,255,0.4)',//azul
    '	rgb(0, 255, 127,0.4)','rgb(144, 238, 144,0.4)',//verde
    'pink',     '	rgb(240, 128, 128,0.4)', //rosado
    'rgb(255, 127, 80,0.4)' ,'	rgb(244, 164, 96,0.4)'//naranjita palido
    ];
    //const ENTREGADOS = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/cronograma/monitoreoentregabono";
    const ENTREGADOS = "http://127.0.0.1:8084/api/cronograma/monitoreoentregabono";
    // const TOPLUGARES = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/cronograma/monitoreotoplugares";
    const TOPLUGARES = "http://127.0.0.1:8084/api/cronograma/monitoreotoplugares";
    const TOTALES = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/cronograma/reportebeneficiarios";
    var isResponse=false;
    const [datosEntregados,setdatosEntregados]=useState([]); //Set cronograma, creando y un estado de toda la función
    const [datosTopLugares,setTopLugares]=useState([]); //Set cronograma, creando y un estado de toda la función
    const [datosIndicadores,setdatosIndicadores]=useState([]); //Set cronograma, creando y un estado de toda la función
    
    const apiEntregados=async (cronogramaDeseado) => {   
      const response = await axios.post(ENTREGADOS,cronogramaDeseado).then();
        // console.log('rpta api.data: ',response.data);
      if(response!==undefined && isResponse===false ){
          //Para el chart reporte- Colores 
          console.log('api entregados',response.data);
          isResponse=true;
          setdatosEntregados({
            labels:response.data.listaFechas,
            datasets:[
              {
                label:'Fechas de entrega de bonos',
                data:response.data.listaCantidades,
                backgroundColor:backgroundColor,
              }

  const apiEntregados = async (cronogramaDeseado) => {
    const response = await axios.post(ENTREGADOS).then();
    // console.log('rpta api.data: ',response.data);
    if (response !== undefined && isResponse === false) {
      //Para el chart reporte- Colores 

      isResponse = true;
      setdatosEntregados({
        labels: response.data.listaFechas,//[,,]
        /*labels:["Ari","Caro","Kayt","Vale","Jorge","Johana","Eder",
        "Ari","Caro","Kayt","Vale","Jorge","Johana","Eder",
        "Ari","Caro","Kayt","Vale","Jorge","Johana","Eder","JP"],//[,,]*/
        datasets: [
          {
            label: 'Bonos Entregados',
            data: response.data.listaCantidades,
            /* data:[201,456,98,12,456,999,441,
              420,456,98,12,456,999,441,
              300,456,98,12,456,999,441,785],*/
            backgroundColor: backgroundColor,
          }

        ]
      });

    }
    const apiLugares=async (cronogramaDeseado) => { 

      console.log('filtro',cronogramaDeseado);
      axios.post(TOPLUGARES,cronogramaDeseado)
      .then(response =>{                    
                   
          setTopLugares({
            labels:response.data.listaLugares,
            datasets:[
              {
                label:'Lugares de Entrega',
                data:response.data.listaCantidades,
                backgroundColor:backgroundColor,
              }

            ]
          }); 
      })
      .catch(() => {
          console.log('Error al obtener Totales');
      });
      /*
      const response = await axios.post(TOPLUGARES,cronogramaDeseado).then();
        // console.log('rpta api.data: ',response.data);
      if(response!==undefined && isResponse===false ){
          //Para el chart reporte- Colores 
          console.log('api Lugares',response.data);
         
          setTopLugares({
            labels:response.data.listaLugares,
            datasets:[
              {
                label:'Lugares de Entrega',
                data:response.data.listaCantidades,
                backgroundColor:backgroundColor,
              }

            ]
          });
          
        }  */     
    }
    const apiTotales = (cronogramaDeseado) => {
      axios.post(TOTALES)
        .then(response =>{                    
            let api=[];
            api.push(response.data);               
            setdatosIndicadores(api);
            
        })
        .catch(() => {
            console.log('Error al obtener Totales');
        });
    }   
    useEffect(()=>{    
      //Llamo a todos los api de monitoreo    
        apiEntregados(cronogramaInicial);
        apiTotales(cronogramaInicial);
        apiLugares(cronogramaInicial);
    },[]);

    //fin del chart reporte 
     
    //  path: /monitoreo
    const classes = useStyles();
    var titulo="Monitoreo";
    if(datosEntregados!==[] && datosEntregados.length!==0){
      //Debo preguntar esto antes de llamar a los gráficos
       var respuesta= rpta.map((rpta,index)   =>
            <Grid key={rpta.id} container  justify="center">
              <Pie chartData={datosEntregados}  md={6} sm={12}  xs={12}  nameTitle="Progreso Entrega" legendPosition="bottom"/>
          
              <Bar chartData={datosTopLugares} md={6} sm={12} xs={12}  nameTitle="Top Peores Lugares de Entrega" legendPosition="bottom"/> 
        
               <Line chartData={datosEntregados} md={10} sm={12} xs={12} nameTitle="Cantidad de Bonos Entregados" legendPosition="bottom"/>
               {/* <apiData></apiData> */}
               <Card className={classes.root} variant="outlined">
                    <CardContent>
                     <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Beneficiarios
                        </Typography>                
                            {datosIndicadores.map(opcion=> (
                                <Grid container direction="row" >
                                    <Typography variant="h4" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold", textAlign:"center"}} gutterBottom justify="center" >
                                    {opcion.cantmujeres}
                                    </Typography>                                     
                                    <Typography variant="h5" style={{color: 'black', margin: 30,justify:"center" , textAlign:"center"}} gutterBottom justify="center" >
                                         Mujeres
                                    </Typography>                           
                                </Grid>                                
                            ))
                            } 
                             {datosIndicadores.map(opcion=> (
                                <Grid container direction="row" >
                                    <Typography variant="h4" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold", textAlign:"center"}} gutterBottom justify="center" >
                                    {opcion.canthombres}
                                    </Typography>                                     
                                    <Typography variant="h5" style={{color: 'black', margin: 30,justify:"center" , textAlign:"center"}} gutterBottom justify="center" >
                                         Hombres
                                    </Typography>                           
                                </Grid>                                
                            ))
                            } 
                                {datosIndicadores.map(opcion=> (
                                <Grid container direction="row" >
                                    <Typography variant="h4" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold", textAlign:"center"}} gutterBottom justify="center" >
                                    {opcion.cantdisc}
                                    </Typography>                                     
                                    <Typography variant="h5" style={{color: 'black', margin: 30,justify:"center" , textAlign:"center"}} gutterBottom justify="center" >
                                         Discapacitados
                                    </Typography>                           
                                </Grid>                                
                            ))
                            } 
                               {datosIndicadores.map(opcion=> (
                                <Grid container direction="row" >
                                    <Typography variant="h4" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold", textAlign:"center"}} gutterBottom justify="center" >
                                    {opcion.cantquejas}
                                    </Typography>                                     
                                    <Typography variant="h5" style={{color: 'black', margin: 30,justify:"center" , textAlign:"center"}} gutterBottom justify="center" >
                                    Quejas
                                    </Typography>                           
                                </Grid>                                
                            ))
                            } 

  //fin del chart reporte 

  //  path: /monitoreo
  const classes = useStyles();
  var titulo = "Monitoreo";
  if (datosEntregados !== [] && datosEntregados.length !== 0) {
    //Debo preguntar esto antes de llamar a los gráficos
    var respuesta = rpta.map((rpta, index) =>
      <Grid key={rpta.id} container justify="center">
        <Pie chartData={datosEntregados} md={6} sm={12} xs={12} nameTitle="Progreso Entrega" legendPosition="bottom" />

        <Bar chartData={datosEntregados} md={6} sm={12} xs={12} nameTitle="Top Peores Lugares de Entrega" legendPosition="bottom" />

        <Line chartData={datosEntregados} md={10} sm={12} xs={12} nameTitle="Bonos Entregados" legendPosition="bottom" />
        {/* <apiData></apiData> */}
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Beneficiarios
                        </Typography>
            {datosIndicadores.map(opcion => (
              <Grid container direction="row" >
                <Typography variant="h4" style={{ color: 'black', margin: 20, justify: "center", fontWeight: "bold", textAlign: "center" }} gutterBottom justify="center" >
                  {opcion.cantmujeres}
                </Typography>
                <Typography variant="h5" style={{ color: 'black', margin: 30, justify: "center", textAlign: "center" }} gutterBottom justify="center" >
                  Mujeres
                                    </Typography>
              </Grid>
            ))
            }
            {datosIndicadores.map(opcion => (
              <Grid container direction="row" >
                <Typography variant="h4" style={{ color: 'black', margin: 20, justify: "center", fontWeight: "bold", textAlign: "center" }} gutterBottom justify="center" >
                  {opcion.canthombres}
                </Typography>
                <Typography variant="h5" style={{ color: 'black', margin: 30, justify: "center", textAlign: "center" }} gutterBottom justify="center" >
                  Hombres
                                    </Typography>
              </Grid>
            ))
            }
            {datosIndicadores.map(opcion => (
              <Grid container direction="row" >
                <Typography variant="h4" style={{ color: 'black', margin: 20, justify: "center", fontWeight: "bold", textAlign: "center" }} gutterBottom justify="center" >
                  {opcion.cantdisc}
                </Typography>
                <Typography variant="h5" style={{ color: 'black', margin: 30, justify: "center", textAlign: "center" }} gutterBottom justify="center" >
                  Discapacitados
                                    </Typography>
              </Grid>
            ))
            }
            {datosIndicadores.map(opcion => (
              <Grid container direction="row" >
                <Typography variant="h4" style={{ color: 'black', margin: 20, justify: "center", fontWeight: "bold", textAlign: "center" }} gutterBottom justify="center" >
                  {opcion.cantquejas}
                </Typography>
                <Typography variant="h5" style={{ color: 'black', margin: 30, justify: "center", textAlign: "center" }} gutterBottom justify="center" >
                  Quejas
                                    </Typography>
              </Grid>
            ))
            }



          </CardContent>

        </Card>
        {/* Card de Lugares de Entrega */}
        {/* <Card className={classes.root} variant="outlined">
                    <CardContent>
                     <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Lugares de entrega
                        </Typography>                
                                      
                                {datosIndicadores.map(opcion=> (
                                <Grid container direction="row" >
                                    <Typography variant="h3" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold", textAlign:"center"}} gutterBottom justify="center" >
                                    {opcion.totalLugares}
                                    </Typography>                                     
                                    <Typography variant="h5" style={{color: 'black', margin: 40,justify:"center" , textAlign:"center"}} gutterBottom justify="center" >
                                         Total
                                    </Typography>                           
                                </Grid>                                
                            ))}
                            {datosIndicadores.map(opcion=> (
                                <Grid container direction="row" >
                                    <Typography variant="h4" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold", textAlign:"center"}} gutterBottom justify="center" >
                                    {opcion.totalActivo}
                                    </Typography>                                     
                                    <Typography variant="h5" style={{color: 'black', margin: 30,justify:"center" , textAlign:"center"}} gutterBottom justify="center" >
                                         Activos
                                    </Typography>                           
                                </Grid>                                
                            ))
                            } 
                             {datosIndicadores.map(opcion=> (
                                <Grid container direction="row" >
                                    <Typography variant="h4" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold", textAlign:"center"}} gutterBottom justify="center" >
                                    {opcion.totalQuejas}
                                    </Typography>                                     
                                    <Typography variant="h5" style={{color: 'black', margin: 30,justify:"center" , textAlign:"center"}} gutterBottom justify="center" >
                                         Quejas
                                    </Typography>                           
                                </Grid>                                
                            ))
                            } 


                        
                    </CardContent> 
                   
               </Card> */}


      </Grid>

    )
  }
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
    <div style={{ minHeight: "88vh" }}>
      <AppBar position="relative" style={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <Grid container direction="row" justify="center">
            <Grid container item xs={12} justify="center">
              <Typography variant="h2" style={{ color: 'black', margin: 20, justify: "center", fontWeight: "bold" }} gutterBottom justify="center" >
                {titulo}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <div className='Contenedor'>
        <Container style={{ margin: 10, boxShadow: 'none' }}>
          <Grid>
            <Grid container direction="row" item md={12} justify="space-evenly" alignItems="center" >
              <Typography variant="subtitle1" color="inherit">
                Departamento:
                            </Typography>
              <Combobox options={departamentos} onSeleccion={handleComboboxDep}
                value={departamento} placeholder="Todos" />
              <Typography variant="subtitle1" color="inherit">
                Provincia:
                            </Typography>
              <Combobox options={provincias} onSeleccion={handleComboboxProv}
                value={provincia} isDisabled={cbxProv} placeholder="Todos" />
              <Typography variant="subtitle1" color="inherit">
                Distrito:
                            </Typography>
              <Combobox options={distritos} onSeleccion={handleComboboxDis}
                value={distrito} isDisabled={cbxDis} placeholder="Todos" />
            </Grid>
            <br></br>
            <Grid container direction="row" item md={6} justify="space-evenly" alignItems="center">
              <Typography variant="subtitle1" color="inherit">
                Fechas:
                            </Typography>
              <RangoFechas onCambio={cambiar} />
              <Button variant="contained" onClick={filtrarReporte} size="medium" color="primary" style={{ margin: 10 }}>
                Filtrar
                              </Button>
              <Link to={{
                pathname: "/reportequejas"

              }} style={{ textDecoration: "none" }}>
                <Button variant="contained" size="medium" color="secondary" style={{ margin: 10 }}>
                  Reporte Quejas
                                </Button>
              </Link>


            </Grid>
          </Grid>
          <Grid container direction="row" justify="center">
            <Grid container item xs={12} justify="center">
              <Typography variant="h5" gutterBottom justify="center" >

                {datosEntregados ?
                  respuesta :
                  <Grid container direction="row" justify="center">
                    <Cargando />
                  </Grid>
                }
              </Typography>
            </Grid>
          </Grid>

        </Container>

      </div>

    </div>
  );


}

