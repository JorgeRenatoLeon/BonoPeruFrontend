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
 
     const [open, setOpen] = React.useState(false);
    const [mensaje,setMensaje] =useState('Se ha iniciado la carga de la generación de un nuevo cronograma. Esto puede tomar unos minutos. Se le notificará por correo cuando el cronograma haya terminado.');
    const handleClickOpen = () => {
        // console.log("imprimir", props);
        setOpen(true);
    };
     const rpta = [
        { id: 'Respuesta',  label: 'Respuesta' },
       
      ];
    const handleAceptar = () => {
        setOpen(false);
    }; 
    const handleCancelar = () => {
        setOpen(false);
       
    };  
    setMensaje(this.props.mensaje);
    console.log('modal',mensaje);
    return (
            <Dialog open={open} onClose={handleCancelar} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Aviso</DialogTitle>
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
                            Ok
                        </Button>
                    </Link>
                        {/* <Button variant="contained" size="small" color="secondary" onClick={handleCancelar}>
                            Cancelar
                        </Button> */}
             
                </DialogActions>
            </Dialog>

    );
}


