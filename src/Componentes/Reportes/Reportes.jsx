import { Button, Container, Grid, Typography } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import RangoFechas from '../Elementos/RangoFechas';
import  Cargando  from "../ModalCargando";
import Pie from "../../Componentes/Graficos/Pie.js"
import Bar from "../../Componentes/Graficos/Bar.js"

import ReporteEncuestasSatisfaccionService from "../../Servicios/rep.encuesta.satisfaccion";


const URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/";
const backgroundColor=[       
    'rgb(179,229,252,0.5)', 'rgb(100, 149, 237,1)', //Celeste
    'rgb(0, 0, 139,0.7)' , '	rgb(51,51,255,0.7)',//azul
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
var labels = ["Muy malo", "Malo", "Regular", "Bueno", "Muy bueno"];

function Reportes (props){

    const [datosEntregados,setdatosEntregados]=useState([]); //Set reporte 1, creando y un estado de toda la función
    const [datosEntregados2,setdatosEntregados2]=useState([]); //Set reporte 2, creando y un estado de toda la función
    const [datosEntregados3,setdatosEntregados3]=useState(null); //Set reporte 3, creando y un estado de toda la función
    const [pregunta,setPregunta]=useState(null); //Set reporte 3, creando y un estado de toda la función

    const rpta = [ { id: 1,  label: 'Respuesta' },];
    const inci = [ { id: 1,  label: 'Incidentes' },];
    var respuesta = <Grid></Grid>
    if(datosEntregados!==[] && datosEntregados.length!==0 && datosEntregados!==undefined){
        //Debo preguntar esto antes de llamar a los gráficos
        respuesta = rpta.map((rptas,index)   =>
            <Grid key={rptas.id} container justify="center">
                <Pie chartData={datosEntregados} nameTitle="Cantidad de Quejas" legendPosition="bottom"/> 
            </Grid>
        )
    }
    var incidentes = <Grid></Grid>
    if(datosEntregados2!==[] && datosEntregados2.length!==0 && datosEntregados2!==undefined){
        //Debo preguntar esto antes de llamar a los gráficos
        incidentes = inci.map((rptas,index)   =>
            <Grid key={rptas.id} container justify="center">
                <Pie chartData={datosEntregados2} nameTitle="Cantidad de Incidentes" legendPosition="bottom"/> 
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
        fechaini: "2020-11-01",//AAAA-MM-DD
        fechafi: f.getFullYear()+"-" + mm+ "-"+dd,//AAAA-MM-DD
        // fechaini: f.getFullYear()+"-" + mm+ "-"+dd,//AAAA-MM-DD
    }
    const [fechaInicio,setSelectedFechaIni]=useState(reporteInicial.fechaini);
    const [fechaFin, setSelectedFechaFin]=useState(reporteInicial.fechafin);

    const cambiar=(fechaIni,fechaFinAux)=>{
        if((fechaFinAux !== null) && (fechaIni!== null)){
          setSelectedFechaIni(fechaIni.toDate().getFullYear()+"-"+("0" + (fechaIni.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaIni.toDate().getDate()).slice(-2));
          setSelectedFechaFin(fechaFinAux.toDate().getFullYear()+"-"+("0" + (fechaFinAux.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaFinAux.toDate().getDate()).slice(-2));
        }else if(fechaIni === null && fechaFinAux !== null){
          setSelectedFechaIni(reporteInicial.fechaIni);
          setSelectedFechaFin(fechaFinAux.toDate().getFullYear()+"-"+("0" + (fechaFinAux.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaFinAux.toDate().getDate()).slice(-2));
        }else if(fechaIni !== null && fechaFinAux === null){
          setSelectedFechaIni(fechaIni.toDate().getFullYear()+"-"+("0" + (fechaIni.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaIni.toDate().getDate()).slice(-2));
          setSelectedFechaFin(reporteInicial.fechafin);
        }else if((fechaIni === null && fechaFinAux === null)||(fechaIni === undefined && fechaFinAux === undefined)){
          setSelectedFechaIni(reporteInicial.fechaIni);
          setSelectedFechaFin(reporteInicial.fechafin);
        }
    }

    const apiQuejas=async () => {
        var response;
        response = await axios.post(URL+"quejas/reportequejas",{fechaini: fechaInicio===undefined?reporteInicial.fechaini:fechaInicio,fechafi: fechaFin===undefined?reporteInicial.fechafi:fechaFin})
        if(response.data){
            setdatosEntregados({
            labels:response.data.listanombres,
            datasets:[
                {
                    label:'Por Horarios',
                    data:response.data.listacantidades,
                    backgroundColor:backgroundColor,    
                }
            ]
            });
            
        }       
    }

    const apiIncidentes=async () => {
        var response;
        
        response = await axios.post(URL+"incidente/reporteinicial",{fechaini: fechaInicio===undefined?reporteInicial.fechaini:fechaInicio,fechafin: fechaFin===undefined?reporteInicial.fechafi:fechaFin})
        if(response.data){
            setdatosEntregados2({
            labels:response.data.listanombres,
            datasets:[
                {
                    label:'Por Horarios',
                    data:response.data.listacantidades,
                    backgroundColor:backgroundColor,    
                }
            ]
            });
            
        }       
    }
    
    const apiEncuestas= async () => {
        
        ReporteEncuestasSatisfaccionService.listarPreguntas().then(response => {
            let pregsAux = [];
            response.data.map(preg => {
                pregsAux.push(preg.pregunta);
                return preg
            });

            ReporteEncuestasSatisfaccionService.cronogramaPublicado().then(responseCrono => {
                let respuestas = [0, 0, 0, 0, 0];
                ReporteEncuestasSatisfaccionService.listarRespuestas_1(responseCrono.data.idCronograma).then(responseResp => {
                    if (responseResp.data.length > 0) {
                        responseResp.data.map(resp => {
                            if (resp[0] === 1) {
                                respuestas[0] = resp[1];
                            } else if (resp[0] === 2) {
                                respuestas[1] = resp[1];
                            } else if (resp[0] === 3) {
                                respuestas[2] = resp[1];
                            } else if (resp[0] === 4) {
                                respuestas[3] = resp[1];
                            } else if (respuesta[0] === 5) {
                                respuestas[4] = resp[1];
                            }
                            return respuesta
                        });
                    }
                    setPregunta(pregsAux[0])
                    setdatosEntregados3({
                        labels: labels,
                        datasets: [
                            {
                                label: responseCrono.data.nombre,
                                data: respuestas,
                                backgroundColor: backgroundColor,
                            }
                        ]
                    });
                })
                .catch(() => {
                    console.log('Error al listar cronogramas')
                });
            })
            .catch(() => {
                console.log('Error al listar cronogramas')
            });
        })
        .catch(() => {
            console.log('Error al listar preguntas')
        });

    }

    const filtrarReporte=()=>{
        setdatosEntregados([])
        setdatosEntregados2([])
        setdatosEntregados3(null)
        apiQuejas();
        apiIncidentes(); 
        apiEncuestas();
    }

    useEffect(()=>{    
        //Llamo a todos los api de monitoreo    
        apiQuejas();  
        apiIncidentes();  
        apiEncuestas();
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
                        <Grid container direction="row" item md={12} alignItems="center">
                            <Typography variant="subtitle1" color="inherit" style={{paddingRight:"2vw"}}>
                                Fechas:
                            </Typography>
                            <RangoFechas onCambio={cambiar}/>  
                            <Button variant="contained" onClick={filtrarReporte} size="medium" color="primary" style={{margin: 10}}>
                                Filtrar
                            </Button> 
                        </Grid>
                    </Grid>
                    <Grid container direction="row">
                        <Grid container item md={6} direction="column" justify="center">
                            <Grid container item style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                                <Typography variant="h4" color="inherit">
                                    Reporte de Quejas
                                </Typography>
                            </Grid>
                            <Grid container item>                 
                                {datosEntregados!==[] && datosEntregados.length!==0?
                                respuesta:
                                <Grid container direction="row" justify="center">
                                    <Cargando value={2}/>
                                </Grid>
                                }
                            </Grid>
                            <Grid container item justify="flex-end">
                                <Grid item>
                                    <Link to="/reportequejas">
                                        <Button variant="contained" onClick={filtrarReporte} size="medium" color="primary" style={{margin: 10}}>
                                            Ver más
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container item md={6} direction="column" justify="center">
                            <Grid container item style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                                <Typography variant="h4" color="inherit">
                                    Reporte de Incidentes
                                </Typography>
                            </Grid>
                            <Grid container item>                 
                                {datosEntregados2!==[] && datosEntregados2.length!==0?
                                incidentes:
                                <Grid container direction="row" justify="center">
                                    <Cargando value={2}/>
                                </Grid>
                                }
                            </Grid>
                            <Grid container item justify="flex-end">
                                <Grid item>
                                    <Link to="/reporteincidentes">
                                        <Button variant="contained" onClick={filtrarReporte} size="medium" color="primary" style={{margin: 10}}>
                                            Ver más
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container item md={12} direction="column" justify="center">
                            <Grid container item style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                                <Typography variant="h4" color="inherit">
                                    Reporte de Encuestas de Satisfacción
                                </Typography>
                            </Grid>
                            <Grid container item>                 
                                {datosEntregados3 && pregunta?
                                <Bar chartData={datosEntregados3} md={12} sm={12} xs={12} nameTitle={pregunta} legendPosition="bottom"/>
                                :
                                <Grid container direction="row" justify="center">
                                    <Cargando value={2}/>
                                </Grid>
                                }
                            </Grid>
                            <Grid container item justify="flex-end">
                                <Grid item>
                                    <Link to="/reporteencuestas">
                                        <Button variant="contained" onClick={filtrarReporte} size="medium" color="primary" style={{margin: 10}}>
                                            Ver más
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                   
                </Container>

            </Grid>
        </Grid>
    )
}

export default Reportes