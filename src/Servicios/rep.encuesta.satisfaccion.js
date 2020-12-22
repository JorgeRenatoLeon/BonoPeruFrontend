import axios from "axios";

const API_URL = "http://localhost:8084/api/reporteencuestasatisfaccion/";

const listarCronogramas = () => {
    return axios
        .post(API_URL + 'listar_cronogramas')
};

const listarRespuestasPregunta1 = (id_cronograma) => {
    return axios
        .post(API_URL + 'listar_resp_preg1?id=' + id_cronograma)
};

const listarRespuestasPregunta2 = (id_cronograma) => {
    return axios
        .post(API_URL + 'listar_resp_preg2?id=' + id_cronograma)
};

const listarRespuestasPregunta3 = (id_cronograma) => {
    return axios
        .post(API_URL + 'listar_resp_preg3?id=' + id_cronograma)
};

const listarRespuestasPregunta4 = (id_cronograma) => {
    return axios
        .post(API_URL + 'listar_resp_preg4?id=' + id_cronograma)
};

const listarRespuestasPregunta5 = (id_cronograma) => {
    return axios
        .post(API_URL + 'listar_resp_preg5?id=' + id_cronograma)
};

const exportar = {
    listarCronogramas,
    listarRespuestasPregunta1,
    listarRespuestasPregunta2,
    listarRespuestasPregunta3,
    listarRespuestasPregunta4,
    listarRespuestasPregunta5,
}

export default exportar;