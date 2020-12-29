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
import DescargaService from "../../Servicios/descarga.service";
import Combobox from '../Elementos/Combobox';
import ComboboxMultiple from '../Elementos/ComboboxMultiple';
import RangoFechas from '../Elementos/RangoFechas';
import  Cargando  from "../ModalCargando";
//mANEJO COMOBOX CRONOGRAMAS 
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, useTheme, Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import CronogramaService from "../../Servicios/historico.service";
export default function GestionBonos (){
    
    function formato(texto){
      return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    }
    //   Rpta se utiliza para escribir  html en javascript
    const rpta = [ { id: 'Respuesta',  label: 'Respuesta' },];
  //   cronograma que se desea monitorear



//fecha del mes anterior
      let f = new Date();
      let dd = f.getDate();//Mañana
      let mm = f.getMonth()+1; 
      if(dd<10)           dd='0'+dd;
      if(mm<10)           mm='0'+mm;
       let fechaHoy = f.getFullYear()+"-" + mm+ "-"+dd;
       
       let    FechaMes=f.getFullYear()+ '-'+f.getMonth()+'-'+ dd ; //AAAA-MM-DD




  

    const [departamento,setSelectedDep] = useState(null);
    const [provincia,setSelectedProv] = useState(null);
    const [distrito,setSelectedDis] = useState(null);  
    const [cbxProv, setStateCbxProv] = useState(true);
    const [cbxDis,setStateCbxDis] = useState(true);
    const [departamentos, setDep] = useState([]);
    const [provincias, setProv] =useState([]);
    const [distritos, setDis] =useState([]);
    const [cronogramas, setCro]= useState([]);
    const [names,setNames] = useState([]);   
    
    const reporteInicial={
      cronogramas: cronogramas,        
      iddepartamento:null,
      idprovincia:null,
      iddistrito:null,
     // fechaini: f.getFullYear()+"-" + mm+ "-"+dd,//AAAA-MM-DD
      fechaini: FechaMes,//AAAA-MM-DD fecha un mes anterior
      fechafi: fechaHoy,
    }
    // console.log('cronograma inicial: ',reporteInicial);
    // console.log('reporte inicial',reporteInicial );
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
     
      CronogramaService.mostrarHistorico().then(response =>{
        let croAux=[];
        response.data.map(cro => {
          croAux.push({
            key: cro.id,
            label: cro.nombre,
          });
        });
        setNames(croAux);
        console.log("cronogramas", croAux);
        })
        .catch(() => {
          console.log('Error al pedir los cronogramas')
        });
      

        apiQuejas(reporteInicial); 
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
          label: "Todos",
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
        }else{
        
          apiProvincias(valor);
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

        }else{
          console.log(valor,"id prov");
          apiDistritos(valor);

        }
    }
  
    const handleComboboxDis=(valor)=>{
        setEstadoCargando(true);        
        if(valor === 0){
          setSelectedDis(null);

        }else{
          setSelectedDis(valor);

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
      let reporteFiltrado;
      if(fechaInicio===undefined && fechaFin===undefined ){
        reporteFiltrado={
          cronogramas: personName,
          iddepartamento: departamento,
          idprovincia: provincia,
          iddistrito: distrito,
          fechaini: fechaHoy,
          fechafi: FechaMes,
        } 
        console.log('ambos indefinidos')
      }
      else if (fechaInicio===undefined){
        reporteFiltrado={
          cronogramas: personName,
          iddepartamento: departamento,
          idprovincia: provincia,
          iddistrito: distrito,
          fechaini: fechaHoy,
          fechafi: fechaFin,
        }   
        console.log('fecha ini indefinidos')
      }
      else if (fechaFin ===undefined){
        reporteFiltrado={
          cronogramas: personName,
          iddepartamento: departamento,
          idprovincia: provincia,
          iddistrito: distrito,
          fechaini: fechaInicio,
          fechafi: fechaHoy,
        }   
      }
      else{
        reporteFiltrado={
          cronogramas: personName,
          iddepartamento: departamento,
          idprovincia: provincia,
          iddistrito: distrito,
          fechaini: fechaInicio,
          fechafi: fechaFin,
        }   
      }
      
      apiQuejas(reporteFiltrado);
      console.log("en filtrar",reporteFiltrado);
     
      
    }

   
    
  
    //Fin de manejo de filtros
    
    //Colores del chart
    const backgroundColor=[       
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   100% de la barra inicial
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   
    'rgb(1,185,223,1)', 'rgb(1,185,223,1)', //Celeste   

    ];
    const backgroundColor2=[    
      '	rgb(0, 255, 127,1)','	rgb(0, 255, 127,1)',//verde   50%
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
      '	rgb(0, 255, 127,1)','rgb(0, 255, 127,1)',//verde   
  
      ];
    const QUEJAS_URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/quejas/reporte";
    //const QUEJAS_URL = "http://127.0.0.1:8084/api/quejas/reporte";
    var isResponse=false;
    const [datosEntregados,setdatosEntregados]=useState([]); //Set cronograma, creando y un estado de toda la función
    
    const apiQuejas= (reporteDeseado) => {   
        console.log('filtros del reporte: ',reporteDeseado);
        var response;
        /*
        if(reporteDeseado.iddepartamento!==null || reporteDeseado.iddistrito!==null  || reporteDeseado.idprovincia!==null ||
            reporteDeseado.fechaini!==reporteInicial.fechaini || reporteDeseado.fechafi!==reporteInicial.fechafin ){
                response = await axios.post(QUEJAS_URL,reporteDeseado).then();
            }
        else{ 
          response = await axios.post(QUEJAS_URL,reporteInicial).then();
        }
*/
        axios.post(QUEJAS_URL,reporteDeseado).then(response =>{
          console.log('rpta api.data: ',response.data);
          console.log('response: ',response);
  
            if(response!==undefined ){
          
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
                      backgroundColor:backgroundColor2,
                    }
  
                  ]
                });
                
              }      
                  if(datosEntregados!==[] && datosEntregados.length!==0 && datosEntregados!==undefined){
                    console.log('datosEntregados',datosEntregados);
                    //Debo preguntar esto antes de llamar a los gráficos
                    respuesta= rpta.map((rpta,index)   =>
                          <Grid key={rpta.id} container  justify="center">
                            <Bar chartData={datosEntregados} md={12} sm={10} xs={10}  nameTitle="Cantidad de Quejas Por Cronograma" legendPosition="bottom"/> 
                            {/* <Pie chartData={datosEntregados} md={6} sm={10} xs={10}  nameTitle="Porcentaje de Quejas" legendPosition="bottom"/>  */}
                            <Typography variant="h4" style={{color: 'white', margin: 20,justify:"center" , fontWeight:"bold"}} gutterBottom justify="center" >
                                          Grupo IMposible
                                      </Typography>
                          </Grid>
  
                          )
                    }
                    else{
                      respuesta=null;
                    } 


        }
        );


        



    } //termina apiquejas



    //fin del chart reporte 

 
    var titulo="Reporte de Quejas";
    var respuesta;
    const llamadaGraficos= () => {  
            if(datosEntregados!==[] && datosEntregados.length!==0 && datosEntregados!==undefined){
              //Debo preguntar esto antes de llamar a los gráficos
              respuesta= rpta.map((rpta,index)   =>
                    <Grid key={rpta.id} container  justify="center">
                      <Bar chartData={datosEntregados} md={12} sm={10} xs={10}  nameTitle="Cantidad de Quejas Por Cronograma" legendPosition="bottom"/> 
                      {/* <Pie chartData={datosEntregados} md={6} sm={10} xs={10}  nameTitle="Porcentaje de Quejas" legendPosition="bottom"/>  */}
                      <Typography variant="h4" style={{color: 'white', margin: 20,justify:"center" , fontWeight:"bold"}} gutterBottom justify="center" >
                                    Grupo IMposible
                                </Typography>
                    </Grid>

                    )
                  }
                  else{
                    respuesta=null;
                  }
    }
    llamadaGraficos();
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


    //COMBOBOX MULTIPLE MATERIAL UI
    const useStyles3 = makeStyles((theme) =>
    createStyles({
      formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
        maxWidth: 1070,
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
      noLabel: {
        marginTop: theme.spacing(3),
      },
      
    }),
  );
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  
  
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  
 
    const classes3 = useStyles3();
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);    
      
    const handleChange = (event) => {
      setPersonName(event.target.value);
      
    };
  
    const handleChangeMultiple = (event) => {
      const { options } = event.target;
      const value= [];
      for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setPersonName(value);
    };


    //FIN DE COMBOBOX MULTIPLE MATERIAL UI


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
                        <Grid container direction="row" item md={12} justify="flex-start" alignItems="center" >
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
                        <Grid container direction="row" item md={12} justify="flex-start" alignItems="center">
                        
                              <Typography variant="subtitle1" color="inherit">
                                Cronogramas:
                            </Typography>

                              {/* comobox multiple
                               */}
                            <Grid>
                                  <FormControl className={classes3.formControl}>
                                    <InputLabel id="demo-mutiple-chip-label"></InputLabel>
                                    <Select
                                      labelId="demo-mutiple-chip-label"
                                      id="demo-mutiple-chip"
                                      multiple
                                      value={personName}
                                      onChange={handleChange}
                                      input={<Input id="select-multiple-chip" />}
                                      renderValue={(selected) => (
                                        <div className={classes3.chips}>
                                          {(selected).map((value) => (
                                            <Chip key={value} label={value} className={classes3.chip} />
                                          ))}
                                        </div>
                                      )}
                                      MenuProps={MenuProps}
                                    >
                                      {names.map((name) => (
                                        <MenuItem key={name.key}  value={name.label} style={getStyles(name, personName, theme)}>
                                          {name.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>

                               {/* fin de comobox multiple */}

                               <Grid container direction="row" item md={12} justify="flex-start" alignItems="center">
                                  <Typography variant="subtitle1" color="inherit">
                                      Fechas:
                                  </Typography>
                                  <RangoFechas onCambio={cambiar}/> 
                                  <Button variant="contained" onClick={filtrarReporte} size="medium" color="primary" style={{margin: 20}}>
                                      Filtrar
                                   </Button> 
                              </Grid>




                            
                           
                              
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
