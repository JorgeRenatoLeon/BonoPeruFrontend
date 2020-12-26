import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Container, Grid, Button } from "@material-ui/core"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import BarraInicial from '../Barras/BarraInicial'
import BarraFinal from '../Barras/BarraFinal'
import Bar from "../../Componentes/Graficos/Bar.js"
import Pie from "../../Componentes/Graficos/Pie.js"
import ReporteEncuestasSatisfaccionService from "../../Servicios/rep.encuesta.satisfaccion";

import '../../assets/css/Cronograma.css';
import Combobox from '../Elementos/Combobox';
//import Cargando from "../ModalCargando";

//Colores del chart
const backgroundColor = [
    'rgb(179,229,252,0.5)', 'rgb(100, 149, 237,1)', //Celeste
    'rgb(0, 0, 139,1) ', '	rgb(51,51,255,1)',//azul
    '	rgb(0, 255, 127,1)', 'rgb(144, 238, 144,1)',//verde
    'pink', '	rgb(240, 128, 128,1)', //rosado
    'rgb(255, 127, 80,1)', '	rgb(244, 164, 96,1)',//naranjita palido
    'rgb(0, 255, 255,0.8)', 'rgb(100, 149, 237,0.8)', //Celeste
    'rgb(0, 0, 139,0.8) ', '	rgb(51,51,255,0.8)',//azul
    '	rgb(0, 255, 127,0.8)', 'rgb(144, 238, 144,0.8)',//verde
    'pink', '	rgb(240, 128, 128,1)', //rosado
    'rgb(255, 127, 80,0.8)', '	rgb(244, 164, 96,0.8)',//naranjita palido
    'rgb(0, 255, 255,0.6)', 'rgb(100, 149, 237,0.6)', //Celeste
    'rgb(0, 0, 139,0.6) ', '	rgb(51,51,255,0.6)',//azul
    '	rgb(0, 255, 127,0.6)', 'rgb(144, 238, 144,0.6)',//verde
    'pink', '	rgb(240, 128, 128,0.6)', //rosado
    'rgb(255, 127, 80,0.6)', '	rgb(244, 164, 96,0.6)',//naranjita palido
    'rgb(0, 255, 255,0.4)', 'rgb(100, 149, 237,0.4)', //Celeste
    'rgb(0, 0, 139,0.4) ', '	rgb(51,51,255,0.4)',//azul
    '	rgb(0, 255, 127,0.4)', 'rgb(144, 238, 144,0.4)',//verde
    'pink', '	rgb(240, 128, 128,0.4)', //rosado
    'rgb(255, 127, 80,0.4)', '	rgb(244, 164, 96,0.4)'//naranjita palido
];

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ReporteEncuestasSatisfaccion() {

    var labels1 = ["Muy malo", "Malo", "Regular", "Bueno", "Muy bueno"];
    var labels2 = ["Si", "No"];

    const [openConfirmacion, setOpenConfirmacion] = useState(false);

    const [cronograma, setCronograma] = useState({ value: null, label: null });
    const [cronogramas, setCronogramas] = useState([]);
    const [preguntas, setPreguntas] = useState([]);

    const [datosPreg1, setDatosPreg1] = useState({ labels: labels1, datasets: [{ label: "", data: [0, 0, 0, 0, 0], backgroundColor: backgroundColor }] });
    const [datosPreg2, setDatosPreg2] = useState({ labels: labels1, datasets: [{ label: "", data: [0, 0, 0, 0, 0], backgroundColor: backgroundColor }] });
    const [datosPreg3, setDatosPreg3] = useState({ labels: labels2, datasets: [{ label: "", data: [0, 0], backgroundColor: backgroundColor }] });
    const [datosPreg4, setDatosPreg4] = useState({ labels: labels2, datasets: [{ label: "", data: [0, 0], backgroundColor: backgroundColor }] });
    const [datosPreg5, setDatosPreg5] = useState({ labels: labels2, datasets: [{ label: "", data: [0, 0], backgroundColor: backgroundColor }] });

    const handleOpenConfirmacion = (event, reason) => {
        setOpenConfirmacion(true);
    };

    const handleCloseConfirmacion = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenConfirmacion(false);
    };

    useEffect(() => {
        //aqui llamo al cronograma actualmente publicado
        ReporteEncuestasSatisfaccionService.cronogramaPublicado().then(response => {
            let cronog = { value: response.data.idCronograma, label: response.data.nombre }
            setCronograma(cronog);
            //también se setean los valores de los graficos
            actualizarValores(cronog.value);
        })
            .catch(() => {
                console.log('Error al listar cronogramas')
            });

        //aqui llamo a la lista de cronogramas
        ReporteEncuestasSatisfaccionService.listarCronogramas().then(response => {
            let cronogAux = [];
            response.data.map(cronog => {
                cronogAux.push({
                    value: cronog.idCronograma,
                    label: cronog.nombre,
                });
            });
            setCronogramas(cronogAux);
        })
            .catch(() => {
                console.log('Error al listar cronogramas')
            });

        //también se listan las preguntas
        ReporteEncuestasSatisfaccionService.listarPreguntas().then(response => {
            let pregsAux = [];
            response.data.map(pregunta => {
                pregsAux.push(pregunta.pregunta);
            });
            setPreguntas(pregsAux);
        })
            .catch(() => {
                console.log('Error al listar preguntas')
            });

    }, []);

    const handleComboboxCronograma = (valor) => {
        console.log("este es valor", valor);
        actualizarValores(valor);
    }

    const resetearValores = () => {
        setDatosPreg1({ labels: labels1, datasets: [{ label: "", data: [0, 0, 0, 0, 0], backgroundColor: backgroundColor }] });
        setDatosPreg2({ labels: labels1, datasets: [{ label: "", data: [0, 0, 0, 0, 0], backgroundColor: backgroundColor }] });
        setDatosPreg3({ labels: labels2, datasets: [{ label: "", data: [0, 0], backgroundColor: backgroundColor }] });
        setDatosPreg4({ labels: labels2, datasets: [{ label: "", data: [0, 0], backgroundColor: backgroundColor }] });
        setDatosPreg5({ labels: labels2, datasets: [{ label: "", data: [0, 0], backgroundColor: backgroundColor }] });
    }

    const actualizarValores = (idcronograma) => {
        ReporteEncuestasSatisfaccionService.listarRespuestas_1(idcronograma).then(response => {
            if (response.data.length > 0) {
                let respAux1 = [0, 0, 0, 0, 0];
                response.data.map(respuesta => {
                    console.log("esta es respuesta", respuesta);
                    if (respuesta[0] === 1) {
                        respAux1[0] = respuesta[1];
                    }
                    if (respuesta[0] === 2) {
                        respAux1[1] = respuesta[1];
                    }
                    if (respuesta[0] === 3) {
                        respAux1[2] = respuesta[1];
                    }
                    if (respuesta[0] === 4) {
                        respAux1[3] = respuesta[1];
                    }
                    if (respuesta[0] === 5) {
                        respAux1[4] = respuesta[1];
                    }
                });
                console.log("esta es respAux1", respAux1);
                setDatosPreg1({
                    labels: labels1,
                    datasets: [
                        {
                            label: preguntas[0],
                            data: respAux1,
                            backgroundColor: backgroundColor,
                        }
                    ]
                });
            } else {
                resetearValores();
                handleOpenConfirmacion();
            }
        })
            .catch(() => {
                console.log('Error al listar respuesta 1')
            });

        ReporteEncuestasSatisfaccionService.listarRespuestas_2(idcronograma).then(response => {
            if (response.data.length > 0) {
                let respAux2 = [0, 0, 0, 0, 0];
                response.data.map(respuesta => {
                    console.log("esta es respuesta", respuesta);
                    if (respuesta[0] === 1) {
                        respAux2[0] = respuesta[1];
                    }
                    if (respuesta[0] === 2) {
                        respAux2[1] = respuesta[1];
                    }
                    if (respuesta[0] === 3) {
                        respAux2[2] = respuesta[1];
                    }
                    if (respuesta[0] === 4) {
                        respAux2[3] = respuesta[1];
                    }
                    if (respuesta[0] === 5) {
                        respAux2[4] = respuesta[1];
                    }
                });
                console.log("esta es respAux2", respAux2);
                setDatosPreg2({
                    labels: labels1,
                    datasets: [
                        {
                            label: preguntas[1],
                            data: respAux2,
                            backgroundColor: backgroundColor,
                        }
                    ]
                });
            } else {
                resetearValores();
                handleOpenConfirmacion();
            }
        })
            .catch(() => {
                console.log('Error al listar respuesta 2')
            });

        ReporteEncuestasSatisfaccionService.listarRespuestas_3(idcronograma).then(response => {
            if (response.data.length > 0) {
                let respAux3 = [0, 0];
                response.data.map(respuesta => {
                    console.log("esta es respuesta", respuesta);
                    if (respuesta[0] === 'Si') {
                        respAux3[0] = respuesta[1];
                    }
                    if (respuesta[0] === 'No') {
                        respAux3[1] = respuesta[1];
                    }
                });
                console.log("esta es respAux3", respAux3);
                setDatosPreg3({
                    labels: labels2,
                    datasets: [
                        {
                            label: preguntas[2],
                            data: respAux3,
                            backgroundColor: backgroundColor,
                        }
                    ]
                });
            } else {
                resetearValores();
                handleOpenConfirmacion();
            }
        })
            .catch(() => {
                console.log('Error al listar respuesta 3')
            });

        ReporteEncuestasSatisfaccionService.listarRespuestas_4(idcronograma).then(response => {
            if (response.data.length > 0) {
                let respAux4 = [0, 0];
                response.data.map(respuesta => {
                    console.log("esta es respuesta", respuesta);
                    if (respuesta[0] === 'Si') {
                        respAux4[0] = respuesta[1];
                    }
                    if (respuesta[0] === 'No') {
                        respAux4[1] = respuesta[1];
                    }
                });
                console.log("esta es respAux4", respAux4);
                setDatosPreg4({
                    labels: labels2,
                    datasets: [
                        {
                            label: preguntas[3],
                            data: respAux4,
                            backgroundColor: backgroundColor,
                        }
                    ]
                });
            } else {
                resetearValores();
                handleOpenConfirmacion();
            }
        })
            .catch(() => {
                console.log('Error al listar respuesta 4')
            });

        ReporteEncuestasSatisfaccionService.listarRespuestas_5(idcronograma).then(response => {
            if (response.data.length > 0) {
                let respAux5 = [0, 0];
                response.data.map(respuesta => {
                    console.log("esta es respuesta", respuesta);
                    if (respuesta[0] === 'Si') {
                        respAux5[0] = respuesta[1];
                    }
                    if (respuesta[0] === 'No') {
                        respAux5[1] = respuesta[1];
                    }
                });
                console.log("esta es respAux5", respAux5);
                setDatosPreg5({
                    labels: labels2,
                    datasets: [
                        {
                            label: preguntas[4],
                            data: respAux5,
                            backgroundColor: backgroundColor,
                        }
                    ]
                });
            } else {
                resetearValores();
                handleOpenConfirmacion();
            }
        })
            .catch(() => {
                console.log('Error al listar respuesta 5')
            });

    }

    return (
        <div style={{ minHeight: "88vh" }}>
            <BarraInicial />
            <Toolbar>
                <Grid container direction="row" justify="center">
                    <Grid container item xs={12} justify="center">
                        <Typography variant="h3" style={{ color: 'black', margin: 20, justify: "center", fontWeight: "bold" }} gutterBottom justify="center" >
                            {"Reporte de encuestas de satisfacción"}
                        </Typography>
                    </Grid>
                </Grid>
            </Toolbar>

            <div className='Contenedor'>
                <Container style={{ margin: 10, boxShadow: 'none' }}>
                    <Grid>
                        <Grid container direction="row" item xs={12} spacing={3} justify="center" alignItems="center">
                            <Grid item xs={2} justify="center" spacing={4}>
                                <Typography variant="subtitle1" color="inherit" md={12}>
                                    Cronograma:
                                    </Typography>
                            </Grid>
                            <Grid item xs={2} justify="center" spacing={4}>
                                <Combobox options={cronogramas} onSeleccion={handleComboboxCronograma}
                                    value={cronograma} placeholder={cronograma.label} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={12} justify="center">
                            <Typography variant="h5" gutterBottom justify="center" >
                                <Grid container justify="center">
                                    <Bar data={datosPreg1} md={6} sm={12} xs={12} nameTitle={preguntas[0]} legendPosition="bottom" />
                                    <Bar data={datosPreg2} md={6} sm={12} xs={12} nameTitle={preguntas[1]} legendPosition="bottom" />
                                    <Pie chartData={datosPreg3} md={6} sm={12} xs={12} nameTitle={preguntas[2]} legendPosition="bottom" />
                                    <Pie chartData={datosPreg4} md={6} sm={12} xs={12} nameTitle={preguntas[3]} legendPosition="bottom" />
                                    <Pie chartData={datosPreg5} md={6} sm={12} xs={12} nameTitle={preguntas[4]} legendPosition="bottom" />
                                </Grid>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Snackbar open={openConfirmacion} autoHideDuration={3000} onClose={handleCloseConfirmacion} anchorOrigin={{ vertical: "top", horizontal: "center" }} key={"topcenter"}>
                        <Alert open={openConfirmacion} onClose={handleCloseConfirmacion} severity="info">
                            No se ha registrado ninguna respuesta en este cronograma
                        </Alert>
                    </Snackbar>
                </Container>
            </div>
            <BarraFinal />
        </div>
    );

}

