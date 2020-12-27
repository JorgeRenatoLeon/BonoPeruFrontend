import React, { useEffect, useState } from "react";
import { Toolbar, Typography, Container, Grid, Button } from "@material-ui/core"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import BarraInicial from '../Barras/BarraInicial'
import BarraFinal from '../Barras/BarraFinal'
import Bar from "../../Componentes/Graficos/Bar.js"
import Pie from "../../Componentes/Graficos/Pie.js"
import ReporteEncuestasSatisfaccionService from "../../Servicios/rep.encuesta.satisfaccion";

import '../../assets/css/Cronograma.css';
import Combobox from '../Elementos/Combobox_vale';
//import Cargando from "../ModalCargando";

//Colores del chart
const backgroundColor1 = [
    'rgb(179,229,255, 1)', 'rgb(179,229,255, 1)',
    'rgb(179,229,255, 1)', 'rgb(179,229,255, 1)',
    'rgb(179,229,255, 1)', 'rgb(179,229,255, 1)',
    'rgb(179,229,255, 1)', 'rgb(179,229,255, 1)',
    'rgb(179,229,255, 1)', 'rgb(179,229,255, 1)',
    'rgb(179,229,255, 1)', 'rgb(179,229,255, 1)',
];
const backgroundColor2 = [
    'rgb(100, 149, 237, 1)', 'rgb(100, 149, 237, 1)',
    'rgb(100, 149, 237, 1)', 'rgb(100, 149, 237, 1)',
    'rgb(100, 149, 237, 1)', 'rgb(100, 149, 237, 1)',
    'rgb(100, 149, 237, 1)', 'rgb(100, 149, 237, 1)',
    'rgb(100, 149, 237, 1)', 'rgb(100, 149, 237, 1)',
    'rgb(100, 149, 237, 1)', 'rgb(100, 149, 237, 1)',
];
const backgroundColor3 = [
    'rgb(179,229,255, 1)', 'rgb(179,229,255, 0.6)',
    'rgb(179,229,255, 1)', 'rgb(179,229,255, 0.6)',
    'rgb(179,229,255, 1)', 'rgb(179,229,255, 0.6)',
    'rgb(179,229,255, 1)', 'rgb(179,229,255, 0.6)',
    'rgb(179,229,255, 1)', 'rgb(179,229,255, 0.6)',
];
const backgroundColor4 = [
    'rgb(100, 149, 237, 1)', 'rgb(100, 149, 237, 0.6)',
    'rgb(100, 149, 237, 1)', 'rgb(100, 149, 237, 0.6)',
    'rgb(100, 149, 237, 1)', 'rgb(100, 149, 237, 0.6)',
    'rgb(100, 149, 237, 1)', 'rgb(100, 149, 237, 0.6)',
    'rgb(100, 149, 237, 1)', 'rgb(100, 149, 237, 0.6)',

];


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ReporteEncuestasSatisfaccion() {

    var labels1 = ["Muy malo", "Malo", "Regular", "Bueno", "Muy bueno"];
    var labels2 = ["Si", "No"];

    const [openConfirmacion, setOpenConfirmacion] = useState(false);

    const [cronograma1, setCronograma1] = useState({ value: null, label: null });
    const [cronograma2, setCronograma2] = useState({ value: null, label: null });
    const [cronogramas, setCronogramas] = useState([]);
    const [preguntas, setPreguntas] = useState([]);

    const [datosPreg1, setDatosPreg1] = useState(null);
    const [datosPreg2, setDatosPreg2] = useState(null);
    const [datosPreg3, setDatosPreg3] = useState(null);
    const [datosPreg4, setDatosPreg4] = useState(null);
    const [datosPreg5, setDatosPreg5] = useState(null);

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
            setCronograma1(cronog);
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

        //también se setean los valores de los graficos
        if (cronograma1.value !== null && datosPreg1 !== null && datosPreg2 != null && datosPreg3 !== null && datosPreg4 !== null && datosPreg5 !== null) {
            actualizarValores(cronograma1.value, null);
        }
    }, []);

    const handleComboboxCronograma1 = (valor) => {
        setCronograma1(valor);
    }

    const handleComboboxCronograma2 = (valor) => {
        setCronograma2(valor);
    }

    const resetearValores = () => {
        setDatosPreg1(null);
        setDatosPreg2(null);
        setDatosPreg3(null);
        setDatosPreg4(null);
        setDatosPreg5(null);
    }

    const actualizarValoresPreg1 = (idcronograma1, idcronograma2) => {
        let resp1crono1 = [0, 0, 0, 0, 0];
        ReporteEncuestasSatisfaccionService.listarRespuestas_1(idcronograma1).then(response => {
            if (response.data.length > 0) {
                response.data.map(respuesta => {
                    if (respuesta[0] === 1) {
                        resp1crono1[0] = respuesta[1];
                    } else if (respuesta[0] === 2) {
                        resp1crono1[1] = respuesta[1];
                    } else if (respuesta[0] === 3) {
                        resp1crono1[2] = respuesta[1];
                    } else if (respuesta[0] === 4) {
                        resp1crono1[3] = respuesta[1];
                    } else if (respuesta[0] === 5) {
                        resp1crono1[4] = respuesta[1];
                    }
                });
                //llamamos al cronograma 2
                let resp1crono2 = [0, 0, 0, 0, 0];
                ReporteEncuestasSatisfaccionService.listarRespuestas_1(idcronograma2).then(resp => {
                    if (resp.data.length > 0) {
                        resp.data.map(respuesta => {
                            if (respuesta[0] === 1) {
                                resp1crono2[0] = respuesta[1];
                            } else if (respuesta[0] === 2) {
                                resp1crono2[1] = respuesta[1];
                            } else if (respuesta[0] === 3) {
                                resp1crono2[2] = respuesta[1];
                            } else if (respuesta[0] === 4) {
                                resp1crono2[3] = respuesta[1];
                            } else if (respuesta[0] === 5) {
                                resp1crono2[4] = respuesta[1];
                            }
                        });
                        //se actualizan ambos valores
                        setDatosPreg1({
                            labels: labels1,
                            datasets: [
                                {
                                    label: cronograma1.label,
                                    data: resp1crono1,
                                    backgroundColor: backgroundColor1,
                                },
                                {
                                    label: cronograma2.label,
                                    data: resp1crono2,
                                    backgroundColor: backgroundColor2,
                                }
                            ]
                        });
                    } else {
                        handleOpenConfirmacion();
                        resetearValores();
                    }
                })
                    .catch(() => {
                        console.log('Error al listar respuesta 1 del cronograma 2')
                    });
            } else {
                handleOpenConfirmacion();
                resetearValores();
            }
        })
            .catch(() => {
                console.log('Error al listar respuesta 1 del cronograma 1')
            });
    }

    const actualizarValoresPreg2 = (idcronograma1, idcronograma2) => {
        let resp2crono1 = [0, 0, 0, 0, 0];
        ReporteEncuestasSatisfaccionService.listarRespuestas_2(idcronograma1).then(response => {
            if (response.data.length > 0) {
                response.data.map(respuesta => {
                    if (respuesta[0] === 1) {
                        resp2crono1[0] = respuesta[1];
                    } else if (respuesta[0] === 2) {
                        resp2crono1[1] = respuesta[1];
                    } else if (respuesta[0] === 3) {
                        resp2crono1[2] = respuesta[1];
                    } else if (respuesta[0] === 4) {
                        resp2crono1[3] = respuesta[1];
                    } else if (respuesta[0] === 5) {
                        resp2crono1[4] = respuesta[1];
                    }
                });
                //llamamos al cronograma 2
                let resp2crono2 = [0, 0, 0, 0, 0];
                ReporteEncuestasSatisfaccionService.listarRespuestas_2(idcronograma2).then(resp => {
                    if (resp.data.length > 0) {
                        resp.data.map(respuesta => {
                            if (respuesta[0] === 1) {
                                resp2crono2[0] = respuesta[1];
                            } else if (respuesta[0] === 2) {
                                resp2crono2[1] = respuesta[1];
                            } else if (respuesta[0] === 3) {
                                resp2crono2[2] = respuesta[1];
                            } else if (respuesta[0] === 4) {
                                resp2crono2[3] = respuesta[1];
                            } else if (respuesta[0] === 5) {
                                resp2crono2[4] = respuesta[1];
                            }
                        });
                        //se actualizan ambos valores
                        setDatosPreg2({
                            labels: labels1,
                            datasets: [
                                {
                                    label: cronograma1.label,
                                    data: resp2crono1,
                                    backgroundColor: backgroundColor1,
                                },
                                {
                                    label: cronograma2.label,
                                    data: resp2crono2,
                                    backgroundColor: backgroundColor2,
                                }
                            ]
                        });
                    } else {
                        handleOpenConfirmacion();
                        resetearValores();
                    }
                })
                    .catch(() => {
                        console.log('Error al listar respuesta 2 del cronograma 2')
                    });
            } else {
                handleOpenConfirmacion();
                resetearValores();
            }
        })
            .catch(() => {
                console.log('Error al listar respuesta 2 del cronograma 1')
            });
    }

    const actualizarValoresPreg3 = (idcronograma1, idcronograma2) => {
        let resp3crono1 = [0, 0];
        ReporteEncuestasSatisfaccionService.listarRespuestas_3(idcronograma1).then(response => {
            if (response.data.length > 0) {
                response.data.map(respuesta => {
                    if (respuesta[0] === 'Si') {
                        resp3crono1[0] = respuesta[1];
                    } else if (respuesta[0] === 'No') {
                        resp3crono1[1] = respuesta[1];
                    }
                });
                let resp3crono2 = [0, 0];
                ReporteEncuestasSatisfaccionService.listarRespuestas_3(idcronograma2).then(resp => {
                    if (resp.data.length > 0) {
                        resp.data.map(respuesta => {
                            if (respuesta[0] === 'Si') {
                                resp3crono2[0] = respuesta[1];
                            } else if (respuesta[0] === 'No') {
                                resp3crono2[1] = respuesta[1];
                            }
                        });
                        //se actualizan ambos valores
                        setDatosPreg3({
                            labels: labels2,
                            datasets: [
                                {
                                    label: cronograma1.label,
                                    data: resp3crono1,
                                    backgroundColor: backgroundColor3,
                                },
                                {
                                    label: cronograma2.label,
                                    data: resp3crono2,
                                    backgroundColor: backgroundColor4,
                                }
                            ]
                        });
                    } else {
                        handleOpenConfirmacion();
                        resetearValores();
                    }
                })
                    .catch(() => {
                        console.log('Error al listar respuesta 3 del cronograma 2')
                    });
            } else {
                handleOpenConfirmacion();
                resetearValores();
            }
        })
            .catch(() => {
                console.log('Error al listar respuesta 3 del cronograma 1')
            });
    }

    const actualizarValoresPreg4 = (idcronograma1, idcronograma2) => {
        let resp4crono1 = [0, 0];
        ReporteEncuestasSatisfaccionService.listarRespuestas_4(idcronograma1).then(response => {
            if (response.data.length > 0) {
                response.data.map(respuesta => {
                    if (respuesta[0] === 'Si') {
                        resp4crono1[0] = respuesta[1];
                    } else if (respuesta[0] === 'No') {
                        resp4crono1[1] = respuesta[1];
                    }
                });
                let resp4crono2 = [0, 0];
                ReporteEncuestasSatisfaccionService.listarRespuestas_4(idcronograma2).then(resp => {
                    if (resp.data.length > 0) {
                        resp.data.map(respuesta => {
                            if (respuesta[0] === 'Si') {
                                resp4crono2[0] = respuesta[1];
                            } else if (respuesta[0] === 'No') {
                                resp4crono2[1] = respuesta[1];
                            }
                        });
                        //se actualizan ambos valores
                        setDatosPreg4({
                            labels: labels2,
                            datasets: [
                                {
                                    label: cronograma1.label,
                                    data: resp4crono1,
                                    backgroundColor: backgroundColor3,
                                },
                                {
                                    label: cronograma2.label,
                                    data: resp4crono2,
                                    backgroundColor: backgroundColor4,
                                }
                            ]
                        });
                    } else {
                        handleOpenConfirmacion();
                        resetearValores();
                    }
                })
                    .catch(() => {
                        console.log('Error al listar respuesta 3 del cronograma 2')
                    });
            } else {
                handleOpenConfirmacion();
                resetearValores();
            }
        })
            .catch(() => {
                console.log('Error al listar respuesta 3 del cronograma 1')
            });
    }

    const actualizarValoresPreg5 = (idcronograma1, idcronograma2) => {
        let resp5crono1 = [0, 0];
        ReporteEncuestasSatisfaccionService.listarRespuestas_5(idcronograma1).then(response => {
            if (response.data.length > 0) {
                response.data.map(respuesta => {
                    if (respuesta[0] === 'Si') {
                        resp5crono1[0] = respuesta[1];
                    } else if (respuesta[0] === 'No') {
                        resp5crono1[1] = respuesta[1];
                    }
                });
                let resp5crono2 = [0, 0];
                ReporteEncuestasSatisfaccionService.listarRespuestas_5(idcronograma2).then(resp => {
                    if (resp.data.length > 0) {
                        resp.data.map(respuesta => {
                            if (respuesta[0] === 'Si') {
                                resp5crono2[0] = respuesta[1];
                            } else if (respuesta[0] === 'No') {
                                resp5crono2[1] = respuesta[1];
                            }
                        });
                        //se actualizan ambos valores
                        setDatosPreg5({
                            labels: labels2,
                            datasets: [
                                {
                                    label: cronograma1.label,
                                    data: resp5crono1,
                                    backgroundColor: backgroundColor3,
                                },
                                {
                                    label: cronograma2.label,
                                    data: resp5crono2,
                                    backgroundColor: backgroundColor4,
                                }
                            ]
                        });
                    } else {
                        handleOpenConfirmacion();
                        resetearValores();
                    }
                })
                    .catch(() => {
                        console.log('Error al listar respuesta 3 del cronograma 2')
                    });
            } else {
                handleOpenConfirmacion();
                resetearValores();
            }
        })
            .catch(() => {
                console.log('Error al listar respuesta 3 del cronograma 1')
            });
    }

    const actualizarValores = (idcronograma1, idcronograma2) => {
        if (idcronograma1 !== null && idcronograma2 !== null) {
            actualizarValoresPreg1(idcronograma1, idcronograma2);
            actualizarValoresPreg2(idcronograma1, idcronograma2);
            actualizarValoresPreg3(idcronograma1, idcronograma2);
            actualizarValoresPreg4(idcronograma1, idcronograma2);
            actualizarValoresPreg5(idcronograma1, idcronograma2);
        }
    }

    return (
        <div style={{ minHeight: "88vh" }}>
            <BarraInicial />
            <Toolbar>
                <Grid container direction="row" justify="center" style={{ margin: 20 }}>
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
                        <Grid container direction="row" item xs={12} spacing={3} justify="center" alignItems="center" style={{ margin: 20 }}>
                            <Grid item md={3} sm={3} xs={1}>
                                <Typography variant="subtitle1" color="inherit" md={12}>
                                    Primer cronograma:
                                </Typography>
                            </Grid>
                            <Grid item md={3} sm={3} xs={3}>
                                <Combobox options={cronogramas} onSeleccion={handleComboboxCronograma1}
                                    value={cronograma1} placeholder={cronograma1.label} />
                            </Grid>
                            <Grid item md={3} sm={3} xs={3}>
                                <Typography variant="subtitle1" color="inherit" md={12}>
                                    Segundo cronograma:
                                </Typography>
                            </Grid>
                            <Grid item md={3} sm={3} xs={3}>
                                <Combobox options={cronogramas} onSeleccion={handleComboboxCronograma2}
                                    value={cronograma2} placeholder={"Seleccione un cronograma"} />
                            </Grid>
                        </Grid>
                        <Grid container direction="row" item xs={12} spacing={3} justify="center" alignItems="center" style={{ margin: 20 }}>
                            <Button variant="contained" onClick={e => actualizarValores(cronograma1.value, cronograma2.value)} size="medium" color="primary" style={{ margin: 20 }}>
                                Filtrar
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Typography variant="h5" gutterBottom justify="center" >
                            <Grid container justify="center">
                                {datosPreg1 === null ? null :
                                    <Bar chartData={datosPreg1} md={8} sm={12} xs={12} nameTitle={preguntas[0]} legendPosition="bottom" />}
                                {datosPreg2 === null ? null :
                                    <Bar chartData={datosPreg2} md={8} sm={12} xs={12} nameTitle={preguntas[1]} legendPosition="bottom" />}
                                {datosPreg3 === null ? null :
                                    <Pie chartData={datosPreg3} md={6} sm={12} xs={12} nameTitle={preguntas[2]} legendPosition="bottom" />}
                                {datosPreg4 === null ? null :
                                    <Pie chartData={datosPreg4} md={6} sm={12} xs={12} nameTitle={preguntas[3]} legendPosition="bottom" />}
                                {datosPreg5 === null ? null :
                                    <Pie chartData={datosPreg5} md={6} sm={12} xs={12} nameTitle={preguntas[4]} legendPosition="bottom" />}
                            </Grid>
                        </Typography>
                    </Grid>
                    <Snackbar open={openConfirmacion} autoHideDuration={3000} onClose={handleCloseConfirmacion} anchorOrigin={{ vertical: "top", horizontal: "center" }} key={"topcenter"}>
                        <Alert open={openConfirmacion} onClose={handleCloseConfirmacion} severity="info">
                            No se ha registrado ninguna respuesta en este cronograma
                        </Alert>
                    </Snackbar>
                </Container>
            </div>
            <BarraFinal />
        </div >
    );

}

