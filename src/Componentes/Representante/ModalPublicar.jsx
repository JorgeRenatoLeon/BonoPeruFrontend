import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Button } from "@material-ui/core"
import { Link } from "react-router-dom"
import { Grid, Typography} from "@material-ui/core"
import axios from "axios";

export default function FormDialog(props) {
 
    var isResponse=false;
    const [open, setOpen] = React.useState(false);
    const [mensaje,setMensaje] =useState('¿Está seguro que desea publicar el cronograma?');
    const cronGuardado = JSON.parse(localStorage.getItem("cronogramaKaytlin")) ;    //La hemos obtenido 
    const handleClickOpen = () => {
        // console.log("imprimir", props);
        setOpen(true);
    };

    const handleAceptar = () => {
        setOpen(false);
        //Llama a la función de publicar
        // console.log('handle: ',mensaje,isResponse);
        //Si tuviera el estado, podría evitar que vuelva a preguntar
        if(isResponse===false) {
            PublicarCronograma();
        }
    }; 
    const handleCancelar = () => {
        setOpen(false);
       
    }; 
    const PUB_URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/cronograma/publicar";//Ari
    const rpta = [
        { id: 'Respuesta',  label: 'Respuesta' },
       
      ];
     
    function PublicarCronograma(){
        //falta chequear los estados
            
                //Sorry 
            const params=     {
                    idcronograma:cronGuardado.idcronograma
            }
            //   API de Ari
            axios.post(PUB_URL+"/"+cronGuardado.idcronograma)
            .then(response =>{
                // console.log("ARI Pub url ",response);
                setOpen(true);
                isResponse=true;
                // mensaje='El cronograma ha sido publicado.';
                setMensaje('El cronograma ha sido publicado.');
                // console.log(mensaje,isResponse);
            })
            .catch(() => {
                console.log('Error al obtener Publicar cronograma');
                setMensaje('El cronograma no ha sido publicado. Intente nuevamente');
                // respuesta=rpta.map((rpta) =>   
                // <Grid key={rpta.index}  container direction="row" justify="center">
                   
                // </Grid>
                    
                //  );
            });
    } 
 
    return (
        <div>
            <Button variant="contained" size="medium" color="secondary" onClick={handleClickOpen} >
                                    Publicar Cronograma 
            </Button> 

            <Dialog open={open} onClose={handleCancelar} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Aviso</DialogTitle>
                
                {/* {isResponse===false? <DialogTitle id="form-dialog-title">Aviso</DialogTitle>} */}
                <DialogContent>
                    < Grid container direction="row" item md={10} style={{paddingTop: '7px'}}>
                            <Typography variant="subtitle2" color="inherit" >
                                {mensaje}
                            </Typography>
                      </Grid>

                </DialogContent>
                <DialogActions>
                    <Link to='/bonos' style={{ textDecoration: "none" }}>
                        <Button variant="contained" size="small" color="primary" onClick={handleAceptar}>
                            Aceptar
                        </Button>
                    </Link>
                        <Button variant="contained" size="small" color="secondary" onClick={handleCancelar}>
                            Cancelar
                        </Button>
             
                </DialogActions>
            </Dialog>
        </div>
    );
}
