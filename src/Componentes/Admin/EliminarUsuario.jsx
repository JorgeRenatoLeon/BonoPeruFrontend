import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Button } from "@material-ui/core"
import { Link } from "react-router-dom"

import UsuariosService from "../../Servicios/user.service";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRemove = () => {
        console.log(props.usuario.id);
        UsuariosService.eliminarUsuarios(props.usuario.id).then(response => {
            console.log(props.usuario.id);
        })
            .catch(() => {
                console.log('Error al eliminar el usuario')
            });

        window.location.reload();
    };

    return (
        <div>
            <IconButton aria-label="delete">
                <DeleteOutlineIcon onClick={handleClickOpen} />
            </IconButton>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"¿Está seguro que desea eliminar este usuario?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Tenga en consideración que una vez eliminado el usuario no se puede volver a recuperar.
          </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Link to='/usuarios' style={{ textDecoration: "none" }}>
                        <Button variant="contained" size="small" color="primary" onClick={() => handleRemove()}>
                            Aceptar
                        </Button>
                    </Link>
                    <Link to='/usuarios' style={{ textDecoration: "none" }}>
                        <Button variant="contained" size="small" color="secondary" onClick={handleClose}>
                            Cancelar
            </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    );
}
