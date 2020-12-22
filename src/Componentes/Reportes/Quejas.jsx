import React from 'react'
import {  AppBar, Toolbar,Typography,  Container} from "@material-ui/core"
import { Grid, Button } from "@material-ui/core"
import { Link } from "react-router-dom"
import axios from "axios"; //Para el api
//Para los chart 
import Line from "../../Componentes/Graficos/Line.js"
import Bar from "../../Componentes/Graficos/Bar.js"
import Pie from "../../Componentes/Graficos/Pie.js"
import { makeStyles } from '@material-ui/core/styles';
import { useEffect,useState } from "react";
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
import  Cargando  from "../ModalCargando";
import CronogramaListado from "../../Servicios/historico.service";
export default function GestionBonos (){
    
    function formato(texto){
      return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    }
    //   Rpta se utiliza para escribir  html en javascript
    const rpta = [ { id: 'Respuesta',  label: 'Respuesta' },];
  //   cronograma que se desea monitorear

    //inicio manejo de fecha inicial
    var f = new Date();
        var dd = f.getDate();//Mañana
        var mm = f.getMonth()+1; 
        if(dd<10)           dd='0'+dd;
        if(mm<10)           mm='0'+mm;
        //console.log( f.getFullYear()+"-" + mm+ "-"+dd);
     //fin manejo de fecha inicial


  

    const [departamento,setSelectedDep] = useState(null);
    const [provincia,setSelectedProv] = useState(null);
    const [distrito,setSelectedDis] = useState(null);  
    const [cbxProv, setStateCbxProv] = useState(true);
    const [cbxDis,setStateCbxDis] = useState(true);
    const [departamentos, setDep] = useState([]);
    const [provincias, setProv] =useState([]);
    const [distritos, setDis] =useState([]);
    const [cronogramass,setSelectedCro] = useState(null);  
    const reporteInicial={
        cronogramas: [1,2,98,99],        
        iddepartamento:null,
        idprovincia:null,
        iddistrito:null,
       // fechaini: f.getFullYear()+"-" + mm+ "-"+dd,//AAAA-MM-DD
        fechaini: "2020-11-01",//AAAA-MM-DD
        fechafi: f.getFullYear()+"-" + mm+ "-"+dd,//AAAA-MM-DD
      }
    useEffect(() => {
      // console.log("dentro del use effect",reporteInicial);
      DepartamentosService.mostrarDepartamentos().then(response =>{
        let depAux=[];
        response.data.map(dep => {
          depAux.push({
                value: dep.iddepartamento,
                label: dep.nombre,
            });
        });
        setDep(depAux);
        // console.log(departamentos);
        })
        .catch(() => {
          console.log('Error al pedir los departamentos')
        });
  
    },[]);
    const apiProvincias=(valor)=>{
      setStateCbxProv(false);
      ProvinciasService.mostrarProvincias(valor).then(response =>{
        let provAux=[];
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
  
    const apiDistritos=(valor)=>{
      setStateCbxDis(false);
      DistritosService.mostrarDistritos(valor).then(response =>{
        let disAux=[];
        if(response.data.length> 0)
        disAux.push({
          value: 0,
          label: "Distrito",
        });
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
  
    const handleComboboxDep=(valor)=>{
        setSelectedDep(valor);
        setEstadoCargando(true);
        if(valor === 0) {
          handleComboboxProv(0);
          handleComboboxDis(0);
          setStateCbxProv(true);
          setStateCbxDis(true);
          setSelectedDep(null);
          const filtroLugar ={
            iddepartamento: null,
            idprovincia: null,
            iddistrito: null,
            nombre: ""
          }
        //  apiLugares(filtroLugar);
        }else{
        
          apiProvincias(valor);
          const filtroLugar ={
            iddepartamento: valor,
            idprovincia: null,
            iddistrito: null,
            nombre: ""
          }
         // apiLugares(filtroLugar);
        }
    }
  
    const handleComboboxProv=(valor)=>{
        setSelectedProv(valor);
        setEstadoCargando(true);
        console.log(valor, "valor dentro de prov combo");
        if(valor === 0){
          setStateCbxDis(true);
          handleComboboxDis(0);
          setSelectedProv(null);
          const filtroLugar ={
            iddepartamento: departamento,
            idprovincia: null,
            iddistrito: null,
            nombre: ""
          }
        //   apiLugares(filtroLugar);
        }else{
          console.log(valor,"id prov");
          apiDistritos(valor);
          const filtroLugar ={
            iddepartamento: departamento,
            idprovincia: valor,
            iddistrito: null,
            nombre: ""
          }
        //   apiLugares(filtroLugar);
        }
    }
  
    const handleComboboxDis=(valor)=>{
        setEstadoCargando(true);        
        if(valor === 0){
          setSelectedDis(null);
          const filtroLugar ={
            iddepartamento: departamento,
            idprovincia: provincia,
            iddistrito: null,
            nombre: ""
          }
        //   apiLugares(filtroLugar);
        }else{
          setSelectedDis(valor);
          const filtroLugar ={
            iddepartamento: departamento,
            idprovincia: provincia,
            iddistrito: valor,
            nombre: ""
        }
        //   apiLugares(filtroLugar);
        }
    }
  
    const [fechaInicio,setSelectedFechaIni]=useState(reporteInicial.fechaini);
    const [fechaFin, setSelectedFechaFin]=useState(reporteInicial.fechafin);
    const cambiar=(fechaIni,fechaFin)=>{
      if((fechaFin !== null) && (fechaIni!== null)){
        // console.log("estoy dentro de cronograma",fechaIni.toDate().getFullYear()+"-"+("0" + (fechaIni.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaIni.toDate().getDate()).slice(-2),
        //fechaFin.toDate().getFullYear()+"-"+("0" + (fechaFin.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaFin.toDate().getDate()).slice(-2));
        setSelectedFechaIni(fechaIni.toDate().getFullYear()+"-"+("0" + (fechaIni.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaIni.toDate().getDate()).slice(-2));
        setSelectedFechaFin(fechaFin.toDate().getFullYear()+"-"+("0" + (fechaFin.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaFin.toDate().getDate()).slice(-2));
      }else if(fechaIni === null && fechaFin !== null){
        setSelectedFechaIni(reporteInicial.fechaIni);
        setSelectedFechaFin(fechaFin.toDate().getFullYear()+"-"+("0" + (fechaFin.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaFin.toDate().getDate()).slice(-2));
      }else if(fechaIni !== null && fechaFin === null){
        setSelectedFechaIni(fechaIni.toDate().getFullYear()+"-"+("0" + (fechaIni.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaIni.toDate().getDate()).slice(-2));
        setSelectedFechaFin(reporteInicial.fechafin);
      }else if(fechaIni === null && fechaFin === null){
        setSelectedFechaIni(reporteInicial.fechaIni);
        setSelectedFechaFin(reporteInicial.fechafin);
      }
  
    }
    const filtrarReporte=()=>{
      // console.log("en buscar",fechaInicio,fechaFin);
      const reporteFiltrado={
        cronogramas: [1,98,99],
        iddepartamento: departamento,
        idprovincia: provincia,
        iddistrito: distrito,
        fechaini: fechaInicio,
        fechafi: fechaFin,
      }    
      apiQuejas(reporteFiltrado);
    }

    const [cronogramas, setCronogramas] = useState([]); //Para el api
    useEffect(() => {
      CronogramaListado.mostrarHistorico().then(response =>{
          let cronogramasAux = []; //Para comobox
          let cronogramasAux2 = []; //Para el api
          response.data.map(hist => {
            cronogramasAux.push({
              value: hist.id, 
              label: hist.nombre,
              fechaIni: hist.fechaini,
              fechaFin: hist.fechafin, 
              });
              cronogramasAux2.push({
                id: hist.id, 
                });
          });
          setCronogramas(cronogramasAux2); //
          setSelectedCro(cronogramasAux); //Combobox
          console.log(cronogramasAux);
        })
        .catch(() => {
          console.log('Error al obtener historico')
        });
    },[]);
    const handleComboboxCro=(valor)=>{
        setEstadoCargando(true);        
        if(valor === 0){
          setSelectedCro(null);
          const filtroLugar ={
            iddepartamento: departamento,
            idprovincia: provincia,
            iddistrito: null,
            nombre: ""
          }
        //   apiLugares(filtroLugar);
        }else{
          setSelectedCro(valor);
          const filtroLugar ={
            iddepartamento: departamento,
            idprovincia: provincia,
            iddistrito: valor,
            nombre: ""
        }
        //   apiLugares(filtroLugar);
        }
    }
  
    //Fin de manejo de filtros
    
    //Colores del chart
    const backgroundColor=[       
    'rgb(179,229,252,0.5)', 'rgb(100, 149, 237,1)', //Celeste
    'rgb(0, 0, 139,1) ' , '	rgb(51,51,255,1)',//azul
    '	rgb(0, 255, 127,1)','rgb(144, 238, 144,1)',//verde
    'pink',     '	rgb(240, 128, 128,1)', //rosado
    'rgb(255, 127, 80,1)' ,'	rgb(244, 164, 96,1)',//naranjita palido
    'rgb(0, 255, 255,0.8)', 'rgb(100, 149, 237,0.8)', //Celeste
    'rgb(0, 0, 139,0.8) ' , '	rgb(51,51,255,0.8)',//azul
    '	rgb(0, 255, 127,0.8)','rgb(144, 238, 144,0.8)',//verde
    'pink',     '	rgb(240, 128, 128,1)', //rosado
    'rgb(255, 127, 80,0.8)' ,'	rgb(244, 164, 96,0.8)',//naranjita palido
    'rgb(0, 255, 255,0.6)', 'rgb(100, 149, 237,0.6)', //Celeste
    'rgb(0, 0, 139,0.6) ' , '	rgb(51,51,255,0.6)',//azul
    '	rgb(0, 255, 127,0.6)','rgb(144, 238, 144,0.6)',//verde
    'pink',     '	rgb(240, 128, 128,0.6)', //rosado
    'rgb(255, 127, 80,0.6)' ,'	rgb(244, 164, 96,0.6)',//naranjita palido
    'rgb(0, 255, 255,0.4)', 'rgb(100, 149, 237,0.4)', //Celeste
    'rgb(0, 0, 139,0.4) ' , '	rgb(51,51,255,0.4)',//azul
    '	rgb(0, 255, 127,0.4)','rgb(144, 238, 144,0.4)',//verde
    'pink',     '	rgb(240, 128, 128,0.4)', //rosado
    'rgb(255, 127, 80,0.4)' ,'	rgb(244, 164, 96,0.4)'//naranjita palido
    ];
    const QUEJAS_URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/quejas/reporte";
    //const QUEJAS_URL = "http://127.0.0.1:8084/api/quejas/reporte";
    var isResponse=false;
    const [datosEntregados,setdatosEntregados]=useState([]); //Set cronograma, creando y un estado de toda la función
    
    const apiQuejas=async (reporteDeseado) => {   
    console.log(reporteDeseado);
    var response;
    if(reporteDeseado.iddepartamento!==null || reporteDeseado.iddistrito!==null  || reporteDeseado.idprovincia!==null ||
         reporteDeseado.fechaini!==reporteInicial.fechaini || reporteDeseado.fechafi!==reporteInicial.fechafin ){
             response = await axios.post(QUEJAS_URL,reporteDeseado).then();
         }
     else response = await axios.post(QUEJAS_URL,reporteInicial).then();
     setEstadoCargando(false);
     console.log('rpta api.data: ',response.data);
      if(response!==undefined && isResponse===false ){
          //Para el chart reporte- Colores 
          
          isResponse=true;
          setdatosEntregados({
            labels:response.data.listacronogramas,
            datasets:[
              {
                label:'Por Lugares',
                 data:response.data.listalugares,
                backgroundColor:backgroundColor,
              },
              {
                label:'Por Horarios',
                 data:response.data.listahorarios,
                backgroundColor:backgroundColor,
              }

            ]
          });
          
        }       
    }

    useEffect(()=>{    
      //Llamo a todos los api de monitoreo    
        apiQuejas(reporteInicial);      
    },[]);

    //fin del chart reporte 

 
    var titulo="Reporte de Quejas";
    if(datosEntregados!==[] && datosEntregados.length!==0){
      //Debo preguntar esto antes de llamar a los gráficos
       var respuesta= rpta.map((rpta,index)   =>
            <Grid key={rpta.id} container  justify="center">
              <Bar chartData={datosEntregados} md={12} sm={12} xs={12}  nameTitle="Cantidad de Quejas" legendPosition="bottom"/> 
            </Grid>

            )
          }
    
     const [estadoCargando,setEstadoCargando]= useState(true);
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
        <div style={{minHeight:"88vh"}}>
               <AppBar position="relative" style={{background: 'transparent', boxShadow: 'none'}}>
                    <Toolbar>
                        <Grid container direction="row" justify="center">
                            <Grid container item xs={12} justify="center">
                                <Typography variant="h2" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold"}} gutterBottom justify="center" >
                                     {titulo}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

            <div className='Contenedor'>
                <Container style={{margin: 10, boxShadow: 'none'}}>
                    <Grid>
                        <Grid container direction="row" item md={12} justify="space-evenly" alignItems="center" >
                            <Typography variant="subtitle1"  color="inherit">
                                Departamento:
                            </Typography>
                            <Combobox options={departamentos} onSeleccion={handleComboboxDep} 
                              value={departamento} placeholder="Todos"/>
                            <Typography variant="subtitle1" color="inherit">
                                Provincia:
                            </Typography>
                            <Combobox options={provincias} onSeleccion={handleComboboxProv} 
                            value={provincia} isDisabled={cbxProv} placeholder="Todos"/>
                            <Typography variant="subtitle1" color="inherit">
                                Distrito:
                            </Typography>
                            <Combobox options={distritos} onSeleccion={handleComboboxDis} 
                                    value={distrito} isDisabled={cbxDis} placeholder="Todos"/>
                            </Grid>
                        <br></br>
                        <Grid container direction="row" item md={12} justify="space-evenly" alignItems="center">
                            <Typography variant="subtitle1" color="inherit">
                                Fechas:
                            </Typography>
                              <RangoFechas onCambio={cambiar}/>                              
                           
                              <Typography variant="subtitle1" color="inherit">
                                Cronogramas:
                            </Typography>
                            <Combobox options={cronogramass} onSeleccion={handleComboboxCro} 
                                    value={cronogramass} placeholder="Todos"/>
                             <Button variant="contained" onClick={filtrarReporte} size="medium" color="primary" style={{margin: 10}}>
                                Filtrar
                              </Button> 
                           
                              
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={12} justify="center">                            
                            <Typography variant="h5"  gutterBottom justify="center" >
                                   
                             {datosEntregados?
                             respuesta:
                              <Grid container direction="row" justify="center">
                                  <Cargando/>
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
