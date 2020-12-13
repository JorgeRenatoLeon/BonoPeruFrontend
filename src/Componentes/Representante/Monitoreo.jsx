import React from 'react'
import {  AppBar, Toolbar,Typography,  Container} from "@material-ui/core"
import { Grid, Button } from "@material-ui/core"
//Para los chart 
import Line from "../../Componentes/Graficos/Line.js"
import Bar from "../../Componentes/Graficos/Bar.js"
import Pie from "../../Componentes/Graficos/Pie.js"
import { makeStyles } from '@material-ui/core/styles';
//Para los card
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from "axios"; //Para el api
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

export default function GestionBonos (){
    function formato(texto){
      return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    }
    //   Rpta se utiliza para escribir  html en javascript
    const rpta = [ { id: 'Respuesta',  label: 'Respuesta' },];
  //   cronograma que se desea monitorear

    var cronogramaGestionBonos = JSON.parse(localStorage.getItem("cronogramaKaytlin")) ; //Para el id
    //cronogramaGestionBonos.idcronograma,
    //inicio manejo de filtros
    const cronogramaInicial={
      idcronograma: cronogramaGestionBonos.idcronograma,
      iddepartamento:null,
      idprovincia:null,
      iddistrito:null,
      fechaini: cronogramaGestionBonos.fechaini,
      fechafin: cronogramaGestionBonos.fechafin,
      nombre:""
    }
    console.log(cronogramaInicial.fechaini);
    console.log(cronogramaInicial.fechafin);
    const [departamento,setSelectedDep] = useState(null);
    const [provincia,setSelectedProv] = useState(null);
    const [distrito,setSelectedDis] = useState(null);  
    const [cbxProv, setStateCbxProv] = useState(true);
    const [cbxDis,setStateCbxDis] = useState(true);
    const [departamentos, setDep] = useState([]);
    const [provincias, setProv] =useState([]);
    const [distritos, setDis] =useState([]);
    useEffect(() => {
      console.log("dentro del use effect",cronogramaInicial);
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
      console.log(cbxProv);
      ProvinciasService.mostrarProvincias(valor).then(response =>{
        console.log(valor,"dentro de la funcion api");
        let provAux=[];
        response.data.map(prov => {
          provAux.push({
                value: prov.idprovincia,
                label: prov.nombre,
            });
        });
        setProv(provAux);
        console.log(provincias);
  
      })
      .catch(() => {
          console.log('Error al pedir las provincias');
         
      }); 
    } 
  
    const apiDistritos=(valor)=>{
      setStateCbxDis(false);
      DistritosService.mostrarDistritos(valor).then(response =>{
        let disAux=[];
        response.data.map(prov => {
          disAux.push({
                value: prov.iddistrito,
                label: prov.nombre,
            });
        });
        setDis(disAux);
        console.log(distritos);
  
      })
      .catch(() => {
          console.log('Error al pedir los distritos');
        
      });
    }
  
    const handleComboboxDep=(valor)=>{
      setSelectedDep(valor);
      console.log(departamento,"id depa"); 
      apiProvincias(valor);
    }
  
    const handleComboboxProv=(valor)=>{
      setSelectedProv(valor);
      console.log(valor,"id prov");
      apiDistritos(valor);
    }
  
    const handleComboboxDis=(valor)=>{
      setSelectedDis(valor);
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
      console.log("en buscar",fechaInicio,fechaFin);
      const cronogramaBusqueda={
        idcronograma: cronogramaGestionBonos.idcronograma,
        iddepartamento: departamento,
        idprovincia: provincia,
        iddistrito: distrito,
        fechaini: fechaInicio,
        fechafin: fechaFin,
      }    
      apiEntregados(cronogramaBusqueda);
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

  //Para el chart reporte- Colores 
    var backgroundColor=[    'rgba(179, 229, 252, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',     'rgba(255, 159, 64, 1)',     'rgba(255, 99, 132, 1)'   ];

    const ENTREGADOS = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/cronograma/monitoreoentregabono";
    const TOTALES = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/cronograma/reportebeneficiarios";
    var isResponse=false;
    const [datosEntregados,setdatosEntregados]=useState([]); //Set cronograma, creando y un estado de toda la función
    const [datosIndicadores,setdatosIndicadores]=useState([]); //Set cronograma, creando y un estado de toda la función
    
    const apiEntregados=async (cronogramaDeseado) => {   
      const response = await axios.post(ENTREGADOS).then();
        // console.log('rpta api.data: ',response.data);
      if(response!==undefined && isResponse===false ){
        
          isResponse=true;
          setdatosEntregados({
            labels:response.data.listaFechas,
            datasets:[
              {
                label:'Bonos Entregados',
               data:response.data.listaCantidades,
                backgroundColor:backgroundColor,
              }

            ]
          });
          
        }       
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
          
              <Bar chartData={datosEntregados} md={6} sm={12} xs={12}  nameTitle="Top Peores Lugares de Entrega" legendPosition="bottom"/> 
        
               <Line chartData={datosEntregados} md={10} sm={12} xs={12} nameTitle="Bonos Entregados" legendPosition="bottom"/>
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
                            <Typography variant="subtitle1" color="inherit">
                                Departamento:
                            </Typography>
                            <Combobox options={departamentos} onSeleccion={handleComboboxDep} 
                              value={departamento} placeholder="Departamento"/>
                            <Typography variant="subtitle1" color="inherit">
                                Provincia:
                            </Typography>
                            <Combobox options={provincias} onSeleccion={handleComboboxProv} 
                            value={provincia} isDisabled={cbxProv} placeholder="Provincia"/>
                            <Typography variant="subtitle1" color="inherit">
                                Distrito:
                            </Typography>
                            <Combobox options={distritos} onSeleccion={handleComboboxDis} 
                            value={distrito} isDisabled={cbxDis} placeholder="Distrito"/>
                        </Grid>
                        <br></br>
                        <Grid container direction="row" item md={6} justify="space-evenly" alignItems="center">
                            <Typography variant="subtitle1" color="inherit">
                                Fechas:
                            </Typography>
                              <RangoFechas onCambio={cambiar}/>
                              <Button variant="contained" onClick={filtrarReporte} size="medium" color="primary" style={{margin: 10}}>
                                Filtrar:
                              </Button> 
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={12} justify="center">                            
                            <Typography variant="h5"  gutterBottom justify="center" >
                                   
                             {respuesta}
                            </Typography>
                        </Grid>
                    </Grid>
                   
                </Container>

            </div>

        </div>
    );


}

