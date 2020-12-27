import { Button, Dialog, DialogActions, DialogTitle, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Select, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import authHeader from "../Servicios/auth-header";
import axios from "axios";
import EncuestaService from "../Servicios/encuestas.service";
import BarraInicial from './Barras/BarraInicial';
import BarraFinal from './Barras/BarraFinal';
import ModalCargando from './ModalCargando';

const API_URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/encuesta/";

const Encuesta = (props) => {

    // const [preguntasHard, setPreguntasHard] = useState([{id: 0,pregunta:'¿Pudo recoger su bono asignado?',respuesta: "No"},{id:1, pregunta:'¿Recogió su bono en el lugar y hora indicado en su cronograma?',respuesta: "No"},{id: 2,pregunta:'¿Pudo recoger su bono asignado?',respuesta: "Si"}])
    const [opciones, setOpcion] = useState([
        {
            horario:{
                horariolugarentrega:{
                    lugarentrega:{
                        nombre:'Agencia ABC- Turno Mañana'
                    }
                }
            },
            respuestas:[
                {
                    idRespuestaindividual: 0,
                    pregunta:{
                        pregunta:'¿Cómo calificaría la atención en el lugar de entrega?'},
                    respuesta: 1
                },
                {
                    idRespuestaindividual: 0,
                    pregunta:{
                        pregunta:'¿Cómo calificaría la flexibilidad del horario?'},
                    respuesta: 1
                },
            ]
        },
        {
            horario:{
                horariolugarentrega:{
                    lugarentrega:{
                        nombre:'Agencia DEF- Turno Tarde'
                    }
                }
            },
            respuestas:[
                {
                    idRespuestaindividual: 0,
                    pregunta:{
                        pregunta:'¿Cómo calificaría la atención en el lugar de entrega?'},
                    respuesta: 'Si',
                    puntaje: 1
                },
                {
                    idRespuestaindividual: 0,
                    pregunta:{
                        pregunta:'¿Cómo calificaría la flexibilidad del horario?'},
                    respuesta: 'Si',
                    puntaje: 1
                },
            ]
        },
        {
            horario:{
                horariolugarentrega:{
                    lugarentrega:{
                        nombre:'Agencia GHI- Turno Mañana'
                    }
                }
            },
            preguntas:[
                {
                    idRespuestaindividual: 0,
                    pregunta:{
                        pregunta:'¿Cómo calificaría la atención en el lugar de entrega?'},
                    respuesta: 'Si',
                    puntaje: 1
                },
                {
                    idRespuestaindividual: 0,
                    pregunta:{
                        pregunta:'¿Cómo calificaría la flexibilidad del horario?'},
                    respuesta: 'Si',
                    puntaje: 1
                },
            ]
        },
    ])
    const [opcionSel, setOpcionSel] = useState(1)
    const [isLoading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [disponible, setDisponible] = useState(true);



    const handleClose = () => {
      setOpen(false);
      props.history.push('/')
    };

    // function handleChange(index,valor){
    //     let preguntasAux = [...preguntasHard]
    //     preguntasAux[index].respuesta = valor
    //     setPreguntasHard(preguntasAux)
    // }

    function handleChangeRespuesta(index,valor){
        let opcionAux = [...opciones]
        opcionAux[opcionSel-1].respuestas[index].respuesta = valor
        setOpcion(opcionAux)
    }

    function handleChangeOpcion(index,valor){
        let opcionAux = [...opciones]
        opcionAux[opcionSel-1].respuestas[index].puntaje = valor
        setOpcion(opcionAux)
    }

    useEffect(() => {
        if(JSON.parse(localStorage.getItem("beneficiarioKayt"))!==[] && JSON.parse(localStorage.getItem("beneficiarioKayt"))!==null && JSON.parse(localStorage.getItem("beneficiarioKayt"))!==undefined){
            axios
            .post(API_URL + JSON.parse(localStorage.getItem("beneficiarioKayt"))[0].beneficiario.idbeneficiario, { headers: authHeader() })
            .then(response =>{
                console.log("API OBT ENCUESTA: ",response.data)
                let encuestas = []
                encuestas.push(response.data)
                if(encuestas[0]){
                    setOpcion(encuestas)
                    setLoading(false)
                }
                else{
                    setLoading(false)
                    setDisponible(false)
                }
            })
            .catch(() => {
                console.log('Error al obtener Encuestas')
            });
        }
        else{
            return <Redirect to='/'/>
        }
    },[]);

    function enviarEncuesta(){
        if(EncuestaService.responderEncuesta(opciones[(opcionSel-1)].idRespuestaencuesta,opciones[(opcionSel-1)].respuestas)){
            setMensaje('Respondido Exitosamente')
        }
        else{
            setMensaje('Estamos experimentando complicaciones..')
        }
        setOpen(true)
        localStorage.removeItem("beneficiarioKayt")
    }


    // const componentesPreguntas = preguntasHard.map((pregunta,index) => 
    //     <Grid key={pregunta.id} container direction="row" justify="center">
    //         <Grid container direction="row" item md={12} style={{paddingTop: '1.5vh'}}>
    //             <Typography variant="subtitle1" color="inherit">
    //                 {(index+1)+'. '+pregunta.pregunta} 
    //             </Typography>
    //         </Grid>
    //         <Grid container direction="row" item md={12} style={{paddingBottom: '1.5vh'}}>
    //             <RadioGroup row variant="subtitle1" value={pregunta.respuesta} color="inherit">
    //                 <FormControlLabel value="Si" control={<Radio style={{color: 'black'}}/>} label="Si" onClick={() => handleChange(pregunta.id,"Si")}/>
    //                 <FormControlLabel value="No" control={<Radio style={{color: 'black'}}/>} label="No" onClick={() => handleChange(pregunta.id,"No")}/>
    //             </RadioGroup>
    //         </Grid>
    //     </Grid>
    // )

    const componentesPreguntasOpcion = opciones[opcionSel-1].respuestas.map((respuesta,index) => 
        <Grid key={respuesta.idRespuestaindividual} container direction="row" justify="center">
            <Grid container direction="row" item md={12} style={{paddingTop: '1.5vh'}}>
                <Typography variant="subtitle1" color="inherit">
                    {(index+1)+'. '+respuesta.pregunta.pregunta} 
                </Typography>
            </Grid>
            <Grid container direction="row" item md={12} style={{paddingBottom: '1.5vh'}}>
                {respuesta.puntaje===-1?
                <RadioGroup row variant="subtitle1" value={respuesta.respuesta} color="inherit">
                    <FormControlLabel value="Si" control={<Radio style={{color: 'black'}}/>} label="Si" onClick={() => handleChangeRespuesta(index,"Si")}/>
                    <FormControlLabel value="No" control={<Radio style={{color: 'black'}}/>} label="No" onClick={() => handleChangeRespuesta(index,"No")}/>
                </RadioGroup>
                :
                <RadioGroup row variant="subtitle1" value={respuesta.puntaje} color="inherit">
                    <FormControlLabel value={1} control={<Radio style={{color: 'black'}}/>} label="1" onClick={() => handleChangeOpcion(index,1)}/>
                    <FormControlLabel value={2} control={<Radio style={{color: 'black'}}/>} label="2" onClick={() => handleChangeOpcion(index,2)}/>
                    <FormControlLabel value={3} control={<Radio style={{color: 'black'}}/>} label="3" onClick={() => handleChangeOpcion(index,3)}/>
                    <FormControlLabel value={4} control={<Radio style={{color: 'black'}}/>} label="4" onClick={() => handleChangeOpcion(index,4)}/>
                    <FormControlLabel value={5} control={<Radio style={{color: 'black'}}/>} label="5" onClick={() => handleChangeOpcion(index,5)}/>
                </RadioGroup>
                }
            </Grid>
        </Grid>
    )
    
    if (isLoading) {
        return <ModalCargando/>;
    }
    if (!disponible) {
        return <Grid>
                    <BarraInicial />
                    <Grid container direction="column" justify="center" alignContent="center" style={{minHeight: '86.8vh'}}>
                        <Grid container item justify="center">
                            <Typography variant="h3" color="inherit">
                                No cuenta con encuestas pendientes
                            </Typography>
                        </Grid>
                        <Grid container item justify="center" style={{padding: "3%"}}>
                            <Link to='/consulta'>
                                <Button variant="contained"  size="medium" color="secondary" >
                                    Volver
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                    <BarraFinal/>
                </Grid>;
    }

    return ( 
        <Grid>
            <BarraInicial />
            <Grid container direction="column" style={{minHeight: '88vh'}}>
                <Grid container justify="center" style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                    <Typography variant="h3" color="inherit">
                        Encuesta de Satisfacción
                    </Typography>
                </Grid>
                <Grid className='Contenedor'>
                    <Grid container direction="row">
                        <Typography variant="subtitle1" color="inherit">
                            Nos interesa su satisfacción , por eso le pedimos constestar las siguientes preguntas 
                        </Typography>
                    </Grid>
                    {/* {componentesPreguntas} */}
                </Grid>
                
                <Grid className='Contenedor'>
                    <Grid container direction="row">
                        <Grid item md={1} style={{paddingTop: '1.5vh'}}>
                            <Typography variant="subtitle1" color="inherit">
                                Opción:
                            </Typography>
                        </Grid>
                        <Grid item md={1} style={{paddingTop: '1.5vh'}}>
                            <Select variant="outlined"
                            value={opcionSel}
                            style={{padding: 0, height: '3vh', color: 'black'}}>
                                {opciones.map((opcion,index) => <MenuItem key={index+1} value={index+1} onClick={()=>setOpcionSel(index+1)}>1</MenuItem>)}
                            </Select>
                        </Grid>
                        <Grid item md={4} style={{paddingTop: '1.5vh'}}>
                            <Typography variant="subtitle1" color="inherit">
                                {opciones[opcionSel-1].horario.horariolugarentrega.lugarentrega.nombre}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justify="center">
                        <Grid container direction="row" item md={12} style={{paddingTop: '1.5vh'}}>
                            <Typography variant="subtitle1" color="inherit">
                                Califique la atención de su cronograma siendo 1 (muy mala) la calificación más baja y 5 (muy buena) la más alta.
                            </Typography>
                        </Grid>
                    </Grid>

                    {componentesPreguntasOpcion}
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={6} sm={2} justify="center" style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                            <Button variant="contained" size="medium" color="primary" onClick={enviarEncuesta}>
                                Enviar
                            </Button>
                        </Grid>
                        <Grid container item xs={6} sm={2} justify="center" style={{paddingBottom: '3vh',paddingTop: '3vh'}}>
                            <Link to='/consulta'>
                                <Button variant="contained"  size="medium" color="secondary" onClick={()=>{localStorage.removeItem("beneficiarioKayt")}}>
                                    Cancelar
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <BarraFinal />
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
 
export default Encuesta;