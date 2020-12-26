import axios from "axios";

const API_URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/";
// const API_URL_1 = "http://localhost:8084/api/cronograma/";
// const API_URL_2 = "http://localhost:8084/api/pregunta/";
// const API_URL_3 = "http://localhost:8084/api/encuesta/";
const API_URL_1 = API_URL+"cronograma/";
const API_URL_2 = API_URL+"pregunta/";
const API_URL_3 = API_URL+"encuesta/";

const listarCronogramas = () => {
    return axios
        .post(API_URL_1 + 'listar_cronogramas')
};

const cronogramaPublicado = () => {
    return axios
        .post(API_URL_1 + 'cronograma_publicado')
};

const listarPreguntas = () => {
    return axios
        .post(API_URL_2 + 'listar_pregs')
};

const listarRespuestas_1 = (id_cronograma) => {
    return axios
        .post(API_URL_3 + 'listar_resp1?id=' + id_cronograma)
};

const listarRespuestas_2 = (id_cronograma) => {
    return axios
        .post(API_URL_3 + 'listar_resp2?id=' + id_cronograma)
};

const listarRespuestas_3 = (id_cronograma) => {
    return axios
        .post(API_URL_3 + 'listar_resp3?id=' + id_cronograma)
};

const listarRespuestas_4 = (id_cronograma) => {
    return axios
        .post(API_URL_3 + 'listar_resp4?id=' + id_cronograma)
};

const listarRespuestas_5 = (id_cronograma) => {
    return axios
        .post(API_URL_3 + 'listar_resp5?id=' + id_cronograma)
};

const exportar = {
    listarCronogramas,
    cronogramaPublicado,
    listarPreguntas,
    listarRespuestas_1,
    listarRespuestas_2,
    listarRespuestas_3,
    listarRespuestas_4,
    listarRespuestas_5,
}

export default exportar;