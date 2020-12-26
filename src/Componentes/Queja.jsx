import { Typography, Button ,Cointaner, FormGroup, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React, {Component, useReducer} from 'react';
import { Link } from 'react-router-dom';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import QuejasService from '../Servicios/quejas.service';

var descripcion1 = [];
var descripcion2 = [];

const Queja=(props)=>{
    const apiBeneficiario = JSON.parse(localStorage.getItem("beneficiarioKayt"))[0];    //RespuestaBeneficiario.jsx            
    console.log('para kayt: ',apiBeneficiario); //necesitas el turno y el lugar de entrega          
    const [tipoQueja1,setTipoQueja1]= useState("");
    const [respuesta1,setRespuesta1] = useState(false);
    const [razones1,setRazones1] = useState(true);
    const [colorPreg1,setColorP1]=useState("secondary");
    const [colorAst1,setColorA1] = useState("secondary");
    const [tipoQueja2,setTipoQueja2]= useState("");
    const [respuesta2,setRespuesta2] = useState(false);
    const [razones2,setRazones2] = useState(true);
    const [colorPreg2,setColorP2] = useState("secondary");
    const [colorAst2,setColorA2] = useState("secondary");

    const [colorPreg, setColorPreg] = useState("inherit");
    const [colorAst,setColorAst] = useState("error");
    const [radiosDisabled,setRadiosDisabled] = useState(false);
    function handleChangeRadio1(valor){
        setRespuesta1(true);
        setTipoQueja1(valor);
        console.log(valor);       
        if(valor === "lugar"){
            setRazones1(false);
            setColorP1("inherit");
            setColorA1("error");
        }else{
            setRazones1(true)
            setColorP1("secondary");
            setColorA1("secondary");
        }
    }
    
    function handleChangeRadio2(valor){
        setRespuesta2(true);
        setTipoQueja2(valor);
        if(valor === "horario"){
            setRazones2(false);
            setColorP2("inherit");
            setColorA2("error");
        }else{
            setRazones2(true);
            setColorP2("secondary");
            setColorA2("secondary");
        }
    }

    var labelsPregunta2 = ["Muy lejos de mi ubicación","Se demoraron en atender","No había efectivo","No estaba abierto", "Otro"];
    var labelsPregunta4 = ["Muy temprano", "Muy tarde", "Había mucha gente en los horarios", "Otro"];

    const selectCheckBox1= event =>{
      if(event.target.checked) {
        descripcion1.push(event.target.id);
      } else{
        for (var i = descripcion1.length - 1; i >= 0; i--) {
          if (descripcion1[i] === event.target.id) {
            descripcion1.splice(i, 1);
            break;
          }
        }
      }
      console.log(event.target.id, "checkbox");
      console.log("descripcion 1",descripcion1);
    }

    const selectCheckBox2= event =>{
        if(event.target.checked) {
          descripcion2.push(event.target.id);
        } else{
          for (var i = descripcion2.length - 1; i >= 0; i--) {
            if (descripcion2[i] === event.target.id) {
              descripcion2.splice(i, 1);
              break;
            }
          }
        }
        console.log(event.target.id, "checkbox");
        console.log("descripcion 2",descripcion2);
    }

    //Obtener valor del input 
    const [answerText1,setAnswerText1] = useState("");
    const handleAnswerText1 = event =>{
        setAnswerText1(event.target.value);
        console.log(answerText1);
    } 

    const [answerText2,setAnswerText2] = useState("");
    const handleAnswerText2 = event =>{
        setAnswerText2(event.target.value);
        console.log(answerText2);
    } 

    const ponerValorOtro1=()=>{
        if(answerText1 != ""){
            for (var i = descripcion1.length - 1; i >= 0; i--) {
                if (descripcion1[i] === "Otro" ) {
                  descripcion1.splice(i, 1);
                  descripcion1.push(answerText1);
                  console.log("donde se hace el cambio",descripcion1);
                  break;
                }
            }
        } 
    }

    const ponerValorOtro2=()=>{
        if(answerText2 !=""){
            for (var i = descripcion2.length - 1; i >= 0; i--) {
                if (descripcion2[i] === "Otro" ) {
                descripcion2.splice(i, 1);
                descripcion2.push(answerText2);
                console.log("donde se hace el cambio",descripcion2);
                break;
                }
            }
        }
    }

    const [deshabilitar,setDeshabilitar] = useState(false);
    const [error,setError] = useState(false);
    const [mensajeError,setMensajeError] = useState("");
    const [open, setOpen] = useState(false);
    const [mensaje,setMensaje] =useState('¿Está seguro que desea enviar sus respuestas?');

    const enviarInfo = () => {
        if(respuesta1 && respuesta2 ){
            if((tipoQueja1 === "") || (tipoQueja1==="lugar" && descripcion1.length>=1)){
                if((tipoQueja2 === "") || (tipoQueja2==="horario" && descripcion2.length>=1)){
                    setOpen(true);
                }else{
                    setError(true);
                    setMensajeError("Debe seleccionar al menos un incoveniente que tuvo sobre el turno");
                }
            }else{
                setError(true);
                setMensajeError("Debe seleccionar al menos un incoveniente que tuvo incoveniente que tuvo en el lugar de entrega");
            }  
        }else{
            setError(true);
            setMensajeError("Debe responder las preguntas obligatorias, las cuales tienen(*)");
        }
    };

    const handleAceptar = () => {
        setOpen(false);
        setError(false);
        ponerValorOtro1();
        ponerValorOtro2();
        console.log("fidbeneficiario", apiBeneficiario.beneficiario.idbeneficiario);
        console.log("fidhorario", props.idHorario);
        console.log("fidlugarentrega", props.idLugar);
        console.log("tipoqueja1", tipoQueja1);
        console.log("descripción1", descripcion1);
        console.log("tipoqueja2",tipoQueja2);
        console.log("descripción2", descripcion2);
        const datos ={
            fidbeneficiario: apiBeneficiario.beneficiario.idbeneficiario,
            fidhorario: props.idHorario,
            fidlugarentrega: props.idLugar,
            tipoqueja1: tipoQueja1,
            descripcion1: descripcion1,
            tipoqueja2: tipoQueja2,
            descripcion2: descripcion2
        }
        QuejasService.enviarQuejas(datos);
        setDeshabilitar(true);
        setColorPreg("secondary");
        setColorAst("secondary");
        setRadiosDisabled(true);
        setRazones1(true)
        setColorP1("secondary");
        setColorA1("secondary");
        setRazones2(true)
        setColorP2("secondary");
        setColorA2("secondary");
    }; 
    const handleCancelar = () => {
        setOpen(false);
       
    }; 
    return ( 
        <Grid>    
            <Paper elevation={0} style={{marginLeft: 70, marginRight: 70, marginBottom: 20,  boxShadow: 'none'}}>
                <Grid container direction="column" justify="space-evenly" >
                    <Typography variant="h5" color="inherit">
                        Opción {props.numero} : {props.name}
                    </Typography>
                    <Typography variant="body1" color="inherit">
                        Seleccione la mejor opción acorde a su queja
                    </Typography>
                </Grid>
                <Grid>
                    <Grid container direction="column" justify="space-evenly" alignItems="center" >
                        <Grid container direction="row" justify="center" alignItems="center" >
                            <Typography variant="subtitle1" color={colorPreg}>
                                1. ¿Tuvo algún inconventiente con su lugar de entrega asignado?
                            </Typography>
                            <Typography variant="h4" color={colorAst}>
                                *
                            </Typography>
                        </Grid>
                        <RadioGroup row variant="subtitle1"  color="inherit">
                        <FormControlLabel value="Si" control={<Radio color='primary' disabled={radiosDisabled}/>} 
                            label="Si" onClick={() => handleChangeRadio1("lugar")}/>
                        <FormControlLabel value="No" control={<Radio color='primary' disabled={radiosDisabled} />} 
                            label="No" onClick={() => handleChangeRadio1("")}/>
                        </RadioGroup>
                    </Grid>
                    <Grid container direction="column" justify="space-evenly" alignItems="center" >
                        <Grid container direction="row" justify="center" alignItems="center" >
                            <Typography variant="subtitle1" color={colorPreg1}>
                                2. Seleccione el incoveniente que tuvo en el lugar de entrega
                            </Typography>  
                            <Typography variant="h4" color={colorAst1}>
                                *
                            </Typography>
                        </Grid>                         
                        <FormGroup>
                        {labelsPregunta2.map(opcion=> (
                            opcion === "Otro" ?
                                <Grid container direction="row" justify="flex-start" alignItems="center">
                                    <FormControlLabel
                                        control={<Checkbox id={opcion} color="primary" onChange={selectCheckBox1} disabled={razones1}/>}
                                        label={opcion}
                                    />
                                    <input value={answerText1}
                                        onChange={handleAnswerText1} disabled={razones1} maxLength="19" ></input>
                                </Grid>
                                :
                                <FormControlLabel
                                    control={<Checkbox id={opcion} color="primary" onChange={selectCheckBox1} disabled={razones1}/>}
                                    label={opcion}
                                /> 
                        ))}
                        </FormGroup>
                    </Grid>
                    <Grid container direction="column" justify="space-evenly" alignItems="center" >
                        <Grid container direction="row" justify="center" alignItems="center" >
                            <Typography variant="subtitle1" color={colorPreg}>
                                3. ¿Tuvo algún inconventiente con su turno asignado?
                            </Typography>
                            <Typography variant="h4" color={colorAst}>
                                *
                            </Typography>
                        </Grid>
                        <RadioGroup row variant="subtitle1"  color="inherit">
                            <FormControlLabel value="Si" control={<Radio color='primary' disabled={radiosDisabled}/>} 
                                label="Si" onClick={() => handleChangeRadio2("horario")}/>
                            <FormControlLabel value="No" control={<Radio color='primary' disabled={radiosDisabled}/>} 
                                label="No" onClick={() => handleChangeRadio2("")}/>
                        </RadioGroup>
                    </Grid>
                    <Grid container direction="column" justify="space-evenly" alignItems="center" >
                        <Grid container direction="row" justify="center" alignItems="center" >
                            <Typography variant="subtitle1" color={colorPreg2}>
                                4. Seleccione el incoveniente que tuvo sobre el turno
                            </Typography>  
                            <Typography variant="h4" color={colorAst2}>
                                *
                            </Typography>
                        </Grid> 
                        <FormGroup>
                        {labelsPregunta4.map(opcion=> (
                            opcion === "Otro" ?
                                <Grid container direction="row" justify="flex-start" alignItems="center">
                                    <FormControlLabel
                                        control={<Checkbox id={opcion} color="primary" onChange={selectCheckBox2} disabled={razones2} />}
                                        label={opcion}
                                    />
                                    <input value={answerText2}
                                        onChange={handleAnswerText2} disabled={razones2} maxLength="19"></input>
                                </Grid>
                                :
                                <FormControlLabel
                                    control={<Checkbox id={opcion} color="primary" onChange={selectCheckBox2} disabled={razones2}/>}
                                    label={opcion}
                                /> 
                        ))}
                        </FormGroup>
                    </Grid>
                </Grid>
                {error?
                    <Grid container justify="center" style={{marginLeft: 40, marginRight: 40, marginBottom: 20, boxShadow: 'none'}}>
                    <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {mensajeError}
                    </Alert>
                    </Grid>
                    :<Grid></Grid>}
                <Grid container direction="row" justify="space-evenly" alignItems="center" >
                    <Button variant="contained" size="medium" color="primary" style={{margin: 10}} onClick={enviarInfo} disabled={deshabilitar}>
                        Enviar
                    </Button> 
                    <Dialog open={open} onClose={handleCancelar} aria-labelledby="form-dialog-title" fullWidth={true}>
                        <DialogTitle id="form-dialog-title">Confirmación</DialogTitle>
                        <DialogContent>
                            < Grid container direction="row" item md={10} style={{paddingTop: '7px'}}>
                                    <Typography variant="subtitle2" color="inherit" >
                                        {mensaje}
                                    </Typography>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Link to='/quejas' style={{ textDecoration: "none" }}>
                                <Button variant="contained" size="small" color="primary" onClick={handleAceptar}>
                                    Aceptar
                                </Button>
                            </Link>
                                <Button variant="contained" size="small" color="secondary" onClick={handleCancelar}>
                                    Cancelar
                                </Button>
                        </DialogActions>
                    </Dialog>
                    <Link to='/' style={{textDecoration:"none"}}>
                        <Button variant="contained"  size="medium" color="secondary" style={{margin: 10}}>
                            Salir
                        </Button>
                    </Link> 
                </Grid>                  
            </Paper>  
        </Grid>
    );

}
 
export default Queja;