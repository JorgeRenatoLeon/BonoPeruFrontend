import { AppBar, Toolbar, Typography, Button ,Cointaner, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React, {Component, useReducer,  useEffect,useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createStyles, withStyles, makeStyles, useTheme} from '@material-ui/core/styles';
import BarraInicial from '../Barras/BarraInicial';
import BarraFinal from '../Barras/BarraFinal';
import Combobox from '../Elementos/Combobox';
import RangoFechas from '../Elementos/RangoFechas';


import '../../assets/css/Cronograma.css';
import HorariosService from "../../Servicios/horarios.service";
import DepartamentosService from "../../Servicios/departamentos.service";
import ProvinciasService from "../../Servicios/provincias.service";
import DistritosService from "../../Servicios/distritos.service";
import CronogramaService from "../../Servicios/cronograma.service";
import ReporteService from "../../Servicios/reporteincidentes.service";
import { SelectAll } from '@material-ui/icons';
import  Cargando  from "../ModalCargando";
import Bar from "../../Componentes/Graficos/Bar.js";
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';

const reducer = (state, action) => {
    return { checkedId: action.id }
}

const useStyles = makeStyles((theme) =>
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

const ReporteIncidentes = (props) => {
  const [respuesta,setRespuesta] = useState(false);
  const [estadoCargando,setEstadoCargando]= useState(true);
  const classes = useStyles();
  const theme = useTheme();
  //PARA MODAL CARGANDO
  const useStyles2 = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }));


  var dia = ("0" + (new Date()).getDate()).slice(-2);
  var mes1 = ("0" + ((new Date()).getMonth())).slice(-2);
  var mes2 = ("0" + ((new Date()).getMonth()+1)).slice(-2);
  var anho = (new Date()).getFullYear();
  var fechaini = anho+'-'+mes1+'-'+"28";
  var fechafin = anho+'-'+mes2+'-'+dia;
  console.log(fechaini);
  console.log(fechafin);
  const cronogramaInicial={
    cronogramas: [],//debo enviar un array de id
    iddepartamento:null,
    idprovincia:null,
    iddistrito:null,
    fechaini: fechaini,
    fechafin: fechafin,
  }
  const backgroundColor1=[       
    'rgb(179,229,252,0.5)', 'rgb(179,229,252,0.5)', //Celeste
    'rgb(179,229,252,0.5)', 'rgb(179,229,252,0.5)', //Celeste
    'rgb(179,229,252,0.5)', 'rgb(179,229,252,0.5)', //Celeste
    'rgb(179,229,252,0.5)', 'rgb(179,229,252,0.5)', //Celeste
    'rgb(179,229,252,0.5)', 'rgb(179,229,252,0.5)', //Celeste
    'rgb(179,229,252,0.5)', 'rgb(179,229,252,0.5)', //Celeste
    'rgb(179,229,252,0.5)', 'rgb(179,229,252,0.5)', //Celeste
    'rgb(179,229,252,0.5)', 'rgb(179,229,252,0.5)', //Celeste
    'rgb(179,229,252,0.5)', 'rgb(179,229,252,0.5)', //Celeste
    'rgb(179,229,252,0.5)', 'rgb(179,229,252,0.5)', //Celeste
    'rgb(179,229,252,0.5)', 'rgb(179,229,252,0.5)', //Celeste
    'rgb(179,229,252,0.5)', 'rgb(179,229,252,0.5)', //Celeste
    ];
  const backgroundColor2=[       
    'rgb(0, 0, 139,1) ' , 'rgb(0, 0, 139,1) ',//azul
    'rgb(0, 0, 139,1) ' , 'rgb(0, 0, 139,1) ',//azul
    'rgb(0, 0, 139,1) ' , 'rgb(0, 0, 139,1) ',//azul
    'rgb(0, 0, 139,1) ' , 'rgb(0, 0, 139,1) ',//azul
    'rgb(0, 0, 139,1) ' , 'rgb(0, 0, 139,1) ',//azul
    'rgb(0, 0, 139,1) ' , 'rgb(0, 0, 139,1) ',//azul
    'rgb(0, 0, 139,1) ' , 'rgb(0, 0, 139,1) ',//azul
    'rgb(0, 0, 139,1) ' , 'rgb(0, 0, 139,1) ',//azul
    'rgb(0, 0, 139,1) ' , 'rgb(0, 0, 139,1) ',//azul
    'rgb(0, 0, 139,1) ' , 'rgb(0, 0, 139,1) ',//azul
    'rgb(0, 0, 139,1) ' , 'rgb(0, 0, 139,1) ',//azul
    'rgb(0, 0, 139,1) ' , 'rgb(0, 0, 139,1) ',//azul
    'rgb(0, 0, 139,1) ' , 'rgb(0, 0, 139,1) ',//azul
    'rgb(0, 0, 139,1) ' , 'rgb(0, 0, 139,1) ',//azul
    'rgb(0, 0, 139,1) ' , 'rgb(0, 0, 139,1) ',//azul
    'rgb(0, 0, 139,1) ' , 'rgb(0, 0, 139,1) ',//azul
    'rgb(0, 0, 139,1) ' , 'rgb(0, 0, 139,1) ',//azul
    'rgb(0, 0, 139,1) ' , 'rgb(0, 0, 139,1) ',//azul
    'rgb(0, 0, 139,1) ' , 'rgb(0, 0, 139,1) ',//azul
    'rgb(0, 0, 139,1) ' , 'rgb(0, 0, 139,1) ',//azul
    ];
  const backgroundColor3=[       
    '	rgb(0, 255, 127,1)','	rgb(0, 255, 127,1)',//verde
    '	rgb(0, 255, 127,1)','	rgb(0, 255, 127,1)',//verde
    '	rgb(0, 255, 127,1)','	rgb(0, 255, 127,1)',//verde
    '	rgb(0, 255, 127,1)','	rgb(0, 255, 127,1)',//verde
    '	rgb(0, 255, 127,1)','	rgb(0, 255, 127,1)',//verde
    '	rgb(0, 255, 127,1)','	rgb(0, 255, 127,1)',//verde
    '	rgb(0, 255, 127,1)','	rgb(0, 255, 127,1)',//verde
    '	rgb(0, 255, 127,1)','	rgb(0, 255, 127,1)',//verde
    '	rgb(0, 255, 127,1)','	rgb(0, 255, 127,1)',//verde
    '	rgb(0, 255, 127,1)','	rgb(0, 255, 127,1)',//verde
    '	rgb(0, 255, 127,1)','	rgb(0, 255, 127,1)',//verde
    '	rgb(0, 255, 127,1)','	rgb(0, 255, 127,1)',//verde
    '	rgb(0, 255, 127,1)','	rgb(0, 255, 127,1)',//verde
    '	rgb(0, 255, 127,1)','	rgb(0, 255, 127,1)',//verde
    '	rgb(0, 255, 127,1)','	rgb(0, 255, 127,1)',//verde
    '	rgb(0, 255, 127,1)','	rgb(0, 255, 127,1)',//verde
    '	rgb(0, 255, 127,1)','	rgb(0, 255, 127,1)',//verde
    '	rgb(0, 255, 127,1)','	rgb(0, 255, 127,1)',//verde
    '	rgb(0, 255, 127,1)','	rgb(0, 255, 127,1)',//verde
    '	rgb(0, 255, 127,1)','	rgb(0, 255, 127,1)',//verde
    ];
  const [dias,setDias]=useState([]);
  const [lugares,setLugares] = useState([]);
  const [horarios,setHorarios] = useState([]);
  const [labels, setLabels] = useState([]);
  const [datosEntregados,setdatosEntregados]=useState([]);

  const apiReporte = (valor)=>{
    console.log(valor);
    ReporteService.obtenerReporte(valor).then(response =>{
      console.log(response.data, "api filtrar");
      setdatosEntregados({
        labels:response.data.listacronogramas,
          datasets:[
            {
              label:'Dias',
              data:response.data.listadias,
              backgroundColor:backgroundColor1,
            },
            {
              label:'Lugares',
               data:response.data.listalugares,
              backgroundColor:backgroundColor2,
            },
            {
              label:'Horarios',
               data:response.data.listahorarios,
              backgroundColor:backgroundColor3,
            },
          ]
      }); 
      setRespuesta(true); 
    })
    .catch(() => {
      console.log('Error al obtener Reporte incidentes')
    }); 
  }

  const [departamento,setSelectedDep] = useState(null);
  const [provincia,setSelectedProv] = useState(null);
  const [distrito,setSelectedDis] = useState(null);
  const [cronograma,setSelectedCro] = useState(null);  

  const [cbxProv, setStateCbxProv] = useState(true);
  const [cbxDis,setStateCbxDis] = useState(true);

  const apiProvincias=(valor)=>{
    setStateCbxProv(false);
    console.log(cbxProv);
    ProvinciasService.mostrarProvincias(valor).then(response =>{
      console.log(valor,"dentro de la funcion api");
      let provAux=[];
      if(response.data.length> 0)
        provAux.push({
          value: 0,
          label: "Todas",
        }); 
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
        console.log(props);
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
      console.log(distritos);

    })
    .catch(() => {
        console.log('Error al pedir los distritos');
        console.log(props);
    });
  }

  const handleComboboxDep=(valor)=>{
    setSelectedDep(valor);
    console.log(departamento,"id depa"); 
    if(valor === 0) {
      handleComboboxProv(0);
      handleComboboxDis(0);
      setStateCbxProv(true);
      setStateCbxDis(true);
      setSelectedDep(null);      
    }else{
      console.log(departamento,"id depa"); 
      apiProvincias(valor);
    }
  }

  const handleComboboxProv=(valor)=>{
    setSelectedProv(valor);
    console.log(valor,"id prov");
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
    setSelectedDis(valor);
    if(valor === 0){
      setSelectedDis(null);
    }else{
      setSelectedDis(valor);
    }
  }

  const [fechaInicio,setSelectedFechaIni]=useState(cronogramaInicial.fechaini);
  const [fechaFin, setSelectedFechaFin]=useState(cronogramaInicial.fechafin);
  const cambiar=(fechaIni,fechaFin)=>{
    if((fechaFin !== null) && (fechaIni!== null)){
      console.log("estoy dentro de cronograma",fechaIni.toDate().getFullYear()+"-"+("0" + (fechaIni.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaIni.toDate().getDate()).slice(-2),
      fechaFin.toDate().getFullYear()+"-"+("0" + (fechaFin.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaFin.toDate().getDate()).slice(-2));
      setSelectedFechaIni(fechaIni.toDate().getFullYear()+"-"+("0" + (fechaIni.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaIni.toDate().getDate()).slice(-2));
      setSelectedFechaFin(fechaFin.toDate().getFullYear()+"-"+("0" + (fechaFin.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaFin.toDate().getDate()).slice(-2));
    }else if(fechaIni === null && fechaFin !== null){
      setSelectedFechaIni(cronogramaInicial.fechaini);
      setSelectedFechaFin(fechaFin.toDate().getFullYear()+"-"+("0" + (fechaFin.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaFin.toDate().getDate()).slice(-2));
    }else if(fechaIni !== null && fechaFin === null){
      setSelectedFechaIni(fechaIni.toDate().getFullYear()+"-"+("0" + (fechaIni.toDate().getMonth() + 1)).slice(-2)+"-"+("0" + fechaIni.toDate().getDate()).slice(-2));
      setSelectedFechaFin(cronogramaInicial.fechafin);
    }else if(fechaIni === null && fechaFin === null){
      setSelectedFechaIni(cronogramaInicial.fechaini);
      setSelectedFechaFin(cronogramaInicial.fechafin);
      console.log("si entro aqui");
    }

  }
  const [personName, setPersonName] = useState([]);
  const [names,setNames] = useState([]);

  const [departamentos, setDep] = useState([]);
  const [rows, setRows] = useState([]);
  const [provincias, setProv] =useState([]);
  const [distritos, setDis] =useState([]);
  const [cronogramas, setCro]= useState([]);
 
  useEffect(() => {
    apiReporte(cronogramaInicial);
    //setDatosInicio();
    DepartamentosService.mostrarDepartamentos().then(response =>{
      let depAux=[];
      if(response.data.length> 0)
      depAux.push({
        value: 0,
        label: "Todos",
      });
      response.data.map(dep => {
        depAux.push({
              value: dep.iddepartamento,
              label: dep.nombre,
          });
      });
      setDep(depAux);
      console.log(departamentos);
      console.log("datos para el bar",datosEntregados.length);
      })
      .catch(() => {
        console.log('Error al pedir los departamentos')
      });
    
    CronogramaService.listar().then(response =>{
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
      
  },[]);
   

  const handleChange = (event) => {
    setCro([]);
    setPersonName(event.target.value);
    console.log(event.target.value, "lo que muestro");
    setCro(event.target.value);
  };

  
    
  

  const filtrarReporte=()=>{
    setRespuesta(false);
    console.log("fechaini",fechaInicio);
    console.log("fechafin",fechaFin);
    console.log("iddepartamento",departamento);
    console.log("idprovincia",provincia);
    console.log("iddistrito",distrito);
    console.log("cronogramas",cronogramas);
    const cronogramaFiltro={
      cronogramas: cronogramas,//debo enviar un array de id
      iddepartamento:departamento,
      idprovincia:provincia,
      iddistrito:distrito,
      fechaini: fechaInicio,
      fechafin: fechaFin,
    }
    apiReporte(cronogramaFiltro);
    console.log(datosEntregados);
    console.log("click filtrar");
   /*  setdatosEntregados({
      //labels:response.data.listaFechas,//[,,]
      labels:["Ari","Caro","Kayt","Vale","Jorge","Johana","Eder"],
      datasets:[
        {
          label:'Dias',
          //data:response.data.listaCantidades,
           data:[201,456,98,12,456,999,441],
          backgroundColor:backgroundColor1,
        },
        {
          label:'Lugares',
          //data:response.data.listaCantidades,
           data:[21,56,98,12,56,99,41],
          backgroundColor:backgroundColor2,
        },
        {
          label:'Horarios',
          //data:response.data.listaCantidades,
           data:[21,56,98,12,56,99,41],
          backgroundColor:backgroundColor3,
        },
      ]
    }); */
  }
    
    return ( 
        <Grid>
            <BarraInicial/> 
            <Grid style={{minHeight:"82.5vh"}}>              
                <Grid container direction="row" justify="center">
                    <Grid container item xs={12} justify="center">
                          <Typography variant="h3" style={{color: 'black', margin: 20,justify:"center" , fontWeight:"bold"}} gutterBottom justify="center" >
                                Reporte de Incidentes
                            </Typography>                         
                    </Grid>                                                  
                </Grid>
            <Paper elevation={0} style={{marginLeft: 40, marginRight: 40, boxShadow: 'none'}}>
                <Grid>
                    <Grid container direction="row" justify="space-evenly" alignItems="center" >
                        <Typography variant="subtitle1" color="inherit">
                            Departamento:
                        </Typography>
                        <Combobox options={departamentos} onSeleccion={handleComboboxDep} 
                          value={departamento} placeholder="Todos"/>
                        <Typography variant="subtitle1" color="inherit">
                            Provincia:
                        </Typography>
                        <Combobox options={provincias} onSeleccion={handleComboboxProv} 
                        value={provincia} isDisabled={cbxProv} placeholder="Todas"/>
                        <Typography variant="subtitle1" color="inherit">
                            Distrito:
                        </Typography>
                        <Combobox options={distritos} onSeleccion={handleComboboxDis} 
                        value={distrito} isDisabled={cbxDis} placeholder="Todos"/>
                    </Grid>
                    <br></br>
                    <Grid container direction="row"  justify="flex-start" alignItems="center" style={{marginLeft: 45}}>
                        <Typography variant="subtitle1" color="inherit">
                            Cronograma:
                        </Typography>
                        <FormControl className={classes.formControl}>
                          <InputLabel id="demo-mutiple-chip-label"></InputLabel>
                          <Select
                            labelId="demo-mutiple-chip-label"
                            id="demo-mutiple-chip"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected) => (
                              <div className={classes.chips}>
                                {(selected).map((value) => (
                                  <Chip key={value} label={value} className={classes.chip} />
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
                    <Grid container direction="row"  justify="flex-start" alignItems="center" style={{marginLeft: 45, marginTop:20}}>
                        <Typography variant="subtitle1" color="inherit" style={{marginRight: 45}}>
                            Fechas:
                        </Typography>
                        <RangoFechas onCambio={cambiar}/>
                        <Button variant="contained"  onClick={filtrarReporte}  size="medium" color="primary" style={{marginLeft: 70}}>
                          Filtrar
                        </Button>  
                        {/* <Combobox options={cronogramas} onSeleccion={handleComboboxCro} 
                                    value={cronograma} placeholder="Todos"/> */}
                    </Grid>
                </Grid>
            </Paper>
            <Grid container direction="row" justify="center" alignItems="center">
            {respuesta?
            <Bar chartData={datosEntregados} md={10} sm={12} xs={12}  nameTitle="Incidentes" legendPosition="bottom"/>
            :<Cargando></Cargando>}
            </Grid>
            </Grid>
            <BarraFinal/>
        </Grid>
    );

}
 
export default ReporteIncidentes;