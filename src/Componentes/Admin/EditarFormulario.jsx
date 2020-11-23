import React, { setState }from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Button } from "@material-ui/core"
import { Link } from "react-router-dom"

export default function FormDialog() {
    let state = {
        firstName: "",
        firstNameError: "",
        lastName: "",
        lastNameError: "",
        username: "",
        usernameError: "",
        email: "",
        emailError: "",
    };

    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const change = e => {  
        //Falta servicio  
        this.setState({
        [e.target.name]: e.target.value
    });
    };

    const validate = () => {
        let isError = false;
        const errors = {
        firstNameError: "",
        lastNameError: "",
        usernameError: "",
        emailError: "",
        };

        if (state.firstName.length > 200) {
            isError = true;
            errors.firstNameError = "La longitud del nombre no puede exceder a 200 caracteres";
        }
        
        if (state.firstName.length < 2) {
            isError = true;
            errors.firstNameError = "La longitud del nombre debe ser de al menos 2 caracteres";
        }
    
        if (state.lastName.length > 200) {
            isError = true;
            errors.lastNameError = "La longitud del apellido no puede exceder a 200 caracteres";
        }
        
        if (state.lastName.length < 2) {
            isError = true;
            errors.lastNameError = "La longitud del apellido debe ser de al menos 2 caracteres";
        }
    
        if (state.username.length < 1) {
            isError = true;
            errors.usernameError = "La longitud del usuario debe ser de al menos 1 caracter";
        }
        
        if (state.username.length > 50) {
            isError = true;
            errors.usernameError = "La longitud del apellido no puede exceder a 50 caracteres";
        }
    
        if (state.email.indexOf("@") === -1) {
            isError = true;
            errors.emailError = "Requires valid email";
        }
    
        this.setState({
          ...state,
          ...errors
        });
    
        return isError;
    };

    const onSubmit = e => {
        e.preventDefault();
        const err = validate();
        if (!err) {
            onSubmit(state);
            // limpiar formulario
            this.setState({
                firstName: "",
                firstNameError: "",
                lastName: "",
                lastNameError: "",
                username: "",
                usernameError: "",
                email: "",
                emailError: "",
            });
        }
    };
  
    return (
      <div>
        <IconButton aria-label="edit" onClick={handleClickOpen}>
            <EditOutlinedIcon/>
        </IconButton>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
          <DialogTitle id="form-dialog-title">Editar usuario</DialogTitle>
          <DialogContent>
          <div sytle="padding: 15px">
            <TextField
                autoFocus
                fullWidth
                variant="outlined"
                label="Nombres" 
                id="name"
                hintText="Nombres"
                value={state.firstName}
                onChange={e => change(e)}
                errorText={state.firstNameError}
            />
            </div>
            <br />
            <div sytle="padding: 15px">
            <TextField
                fullWidth
                variant="outlined"
                id="lastname"
                label="Apellidos"
                hintText="Apellidos"
                value={state.lastName}
                onChange={e => change(e)}
                errorText={state.lastNameError}
            />
            </div>
            <br />
            <div sytle="padding: 15px">
            <TextField
                fullWidth
                variant="outlined"
                id="username"
                label="Nombre de usuario"
                hintText="Nombre de usuario"
                value={state.username}
                onChange={e => change(e)}
                errorText={state.usernameError}
            />
            </div>
            <br />
            <div sytle="padding: 15px">
            <TextField
                fullWidth
                variant="outlined"
                id="email"
                label="Correo electrónico"
                hintText="Correo electrónico"
                value={state.email}
                onChange={e => change(e)}
                errorText={state.emailError}
            />
            </div>
            <br />
          </DialogContent>
          <DialogActions>
            <Link to='/usuarios' style={{textDecoration:"none"}}>
                <Button variant="contained" size="small" color="primary" onClick={e => onSubmit(e)}>
                    Guardar
                </Button>
            </Link>
            <Link to='/usuarios' style={{textDecoration:"none"}}>
                <Button variant="contained" size="small" color="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    );
}


