import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Container, Grid, Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import Line from "../../Componentes/Graficos/Line.js"
import Bar from "../../Componentes/Graficos/Bar.js"
import Pie from "../../Componentes/Graficos/Pie.js"
import ReporteEncuestasSatisfaccionService from "../../Servicios/rep.encuesta.satisfaccion";

import '../../assets/css/Cronograma.css';
import Combobox from '../Elementos/Combobox';
import Cargando from "../ModalCargando";

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


export default function ReporteEncuestasSatisfaccion(props) {

    var labels1 = ["1", "2", "3", "4", "5"];
    var data1 = [2, 1, 0, 4, 2];
    var labels2 = ["Si", "No"];
    var data2 = [2, 1];

    const cronogramaGestionBonos = JSON.parse(localStorage.getItem("cronogramaKaytlin"));
    const [cronograma, setSelectedCronograma] = useState(null);
    const [cronogramas, setCronogramas] = useState(null);

    const [datosPreg1, setDatosPreg1] = useState([]);
    const [datosPreg2, setDatosPreg2] = useState([]);
    const [datosPreg3, setDatosPreg3] = useState([]);
    const [datosPreg4, setDatosPreg4] = useState([]);
    const [datosPreg5, setDatosPreg5] = useState([]);

    const datosGraficos = {
        labels: labels,
        datasets: [
            {
                label: 'Bonos Entregados',
                data: data,
                backgroundColor: backgroundColor,
            }
        ]
    }

    useEffect(() => {
        //aqui llamo a la lista de cronogramas
        //también se setean los valores de los graficos

    }, []);

    const handleComboboxCronograma = (valor) => {
        setSelectedCronograma(valor);
        // llamar al api y setear los nuevos valores de los graficos
    }


    return (
        <div style={{ minHeight: "88vh" }}>
            <AppBar position="relative" style={{ background: 'transparent', boxShadow: 'none' }}>
                <Toolbar>
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={12} justify="center">
                            <Typography variant="h2" style={{ color: 'black', margin: 20, justify: "center", fontWeight: "bold" }} gutterBottom justify="center" >
                                {"Reporte de encuestas de satisfacción"}
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            <div className='Contenedor'>
                <Container style={{ margin: 10, boxShadow: 'none' }}>
                    <Grid>
                        <Grid container direction="row" item md={12} justify="space-evenly" alignItems="center" >
                            <Typography variant="subtitle1" color="inherit">
                                Cronograma:
                                </Typography>
                            <Combobox options={departamentos} onSeleccion={handleComboboxCronograma}
                                value={cronograma} placeholder="Todos" />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Grid container item xs={12} justify="center">
                            <Typography variant="h5" gutterBottom justify="center" >
                                <Grid container justify="center">
                                    <Pie chartData={datosGraficos} md={6} sm={12} xs={12} nameTitle="Progreso Entrega" legendPosition="bottom" />
                                    <Bar chartData={datosGraficos} md={6} sm={12} xs={12} nameTitle="Top Peores Lugares de Entrega" legendPosition="bottom" />
                                    <Line chartData={datosGraficos} md={10} sm={12} xs={12} nameTitle="Bonos Entregados" legendPosition="bottom" />
                                </Grid>
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );

}

