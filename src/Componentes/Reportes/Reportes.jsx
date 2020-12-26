import { Button, Container, Grid, Typography } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Combobox from '../Elementos/Combobox';
import axios from "axios";

import RangoFechas from '../Elementos/RangoFechas';
import  Cargando  from "../ModalCargando";
import { Bar } from 'react-chartjs-2';
import CronogramaListado from "../../Servicios/historico.service";


const QUEJAS_URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/quejas/reporte";
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

function Reportes (props){

    const [cronogramass,setSelectedCro] = useState(null);
    const [datosEntregados,setdatosEntregados]=useState([]); //Set cronograma, creando y un estado de toda la función
    const [cronogramas, setCronogramas] = useState([]); //Para el api
    
  
    var isResponse=false;
    const rpta = [ { id: 'Respuesta',  label: 'Respuesta' },];
    var respuesta = <Grid></Grid>
    if(datosEntregados!==[] && datosEntregados.length!==0 && datosEntregados!==undefined){
        //Debo preguntar esto antes de llamar a los gráficos
        respuesta = rpta.map((rptas,index)   =>
            <Grid key={rptas.id} container justify="center">
                <Bar data={datosEntregados} md={9} sm={10} xs={10}  nameTitle="Cantidad de Quejas" legendPosition="bottom"/> 
            </Grid>
        )
    }

    //inicio manejo de fecha inicial
    var f = new Date();
    var dd = f.getDate();//Mañana
    var mm = f.getMonth()+1; 
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    
    const reporteInicial={
        cronogramas: [1,2,98,99],        
        iddepartamento:null,
        idprovincia:null,
        iddistrito:null,
        fechaini: "2020-11-01",//AAAA-MM-DD
        fechafi: f.getFullYear()+"-" + mm+ "-"+dd,//AAAA-MM-DD
        // fechaini: f.getFullYear()+"-" + mm+ "-"+dd,//AAAA-MM-DD
    }
    const [fechaInicio,setSelectedFechaIni]=useState(reporteInicial.fechaini);
    const [fechaFin, setSelectedFechaFin]=useState(reporteInicial.fechafin);

    const cambiar=(fechaIni,fechaFinAux)=>{
        if((fechaFinAux !== null) && (fechaIni!== null)){
          // console.log("estoy dentro de cronograma",fechaIni.toDate().getFullYear()+"-"+("0" + (fechaIni.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaIni.toDate().getDate()).slice(-2),
          //fechaFin.toDate().getFullYear()+"-"+("0" + (fechaFin.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaFin.toDate().getDate()).slice(-2));
          setSelectedFechaIni(fechaIni.toDate().getFullYear()+"-"+("0" + (fechaIni.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaIni.toDate().getDate()).slice(-2));
          setSelectedFechaFin(fechaFinAux.toDate().getFullYear()+"-"+("0" + (fechaFinAux.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaFinAux.toDate().getDate()).slice(-2));
        }else if(fechaIni === null && fechaFinAux !== null){
          setSelectedFechaIni(reporteInicial.fechaIni);
          setSelectedFechaFin(fechaFinAux.toDate().getFullYear()+"-"+("0" + (fechaFinAux.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaFinAux.toDate().getDate()).slice(-2));
        }else if(fechaIni !== null && fechaFinAux === null){
          setSelectedFechaIni(fechaIni.toDate().getFullYear()+"-"+("0" + (fechaIni.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaIni.toDate().getDate()).slice(-2));
          setSelectedFechaFin(reporteInicial.fechafin);
        }else if(fechaIni === null && fechaFinAux === null){
          setSelectedFechaIni(reporteInicial.fechaIni);
          setSelectedFechaFin(reporteInicial.fechafin);
        }
    
    }

    const apiQuejas=async (reporteDeseado) => {
        var response;
        
        response = await axios.post(QUEJAS_URL,reporteInicial).then();
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

    const handleComboboxCro=(valor)=>{  
        if(valor === 0){
            setSelectedCro(null);
            const filtroLugar = {
                iddepartamento: null,
                idprovincia: null,
                iddistrito: null,
                nombre: ""
            }
            apiQuejas(filtroLugar);
        }
        else{
            let arr=[];
            arr.push(valor);
            setSelectedCro(valor);
            setCronogramas(arr);
            const filtroLugar = {
                iddepartamento: null,
                idprovincia: null,
                iddistrito: null,
                nombre: ""
            }
            apiQuejas(filtroLugar);
        }
    }

    
    const filtrarReporte=()=>{
        const reporteFiltrado={
          // cronogramas: [1,98,99],
          cronogramas: cronogramas,
          iddepartamento: null,
          idprovincia: null,
          iddistrito: null,
          fechaini: fechaInicio,
          fechafi: fechaFin,
        }
        apiQuejas(reporteFiltrado);
    }

    useEffect(() => {
        const apiQuejasFun=async () => { 
            await CronogramaListado.mostrarHistorico()
            .then(response =>{
                let cronogramasAux = []; //Para comobox
                let cronogramasAux2 = []; //Para el api
                response.data.map(hist => {
                    //Para comobox
                    cronogramasAux.push({
                        value: hist.id, 
                        label: hist.nombre,
                        fechaIni: hist.fechaini,
                        fechaFin: hist.fechafin, 
                        });
                        //Para el api
                        cronogramasAux2.push(hist.id);
                    return hist
                });
                
                setSelectedCro(cronogramasAux); //Combobox- cronogramass
                setCronogramas(cronogramasAux2); // para el api- cronograma
                // console.log(cronogramasAux);
            })
            .catch(() => {
                console.log('Error al obtener historico')
            });
        }
        apiQuejasFun();
    },[]);

    useEffect(()=>{    
        //Llamo a todos los api de monitoreo    
        apiQuejas(reporteInicial);      
    },[]);

    return (
        <Grid style={{minHeight: '86.8vh'}}>
            <Grid container direction="column">
                <Grid container justify="center" style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                    <Typography variant="h3" color="inherit">
                        Reportes
                    </Typography>
                </Grid>
            </Grid>
            
            <Grid className='Contenedor'>
                <Container style={{margin: 10, boxShadow: 'none'}}>
                    <Grid>
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
                    <Grid container direction="column" justify="center">
                        <Grid container item style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                            <Typography variant="h4" color="inherit">
                                Reporte de Quejas
                            </Typography>
                        </Grid>
                        <Grid container item xs={8}>                 
                            {datosEntregados!==[] && datosEntregados.length!==0?
                            respuesta:
                            <Grid container direction="row" justify="center">
                                <Cargando value={2}/>
                            </Grid>       
                            }
                        </Grid>
                        <Grid>
                            <Link to="/reportequejas">
                                <Button variant="contained" onClick={filtrarReporte} size="medium" color="primary" style={{margin: 10}}>
                                    Ver más
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                   
                </Container>

            </Grid>
        </Grid>
    )
}

export default Reportes