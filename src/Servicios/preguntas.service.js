import axios from "axios";

const API_URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/preguntas/";

const pregunta = {
    "idpreguntasfrecuentes": null,
    "pregunta": "",
    "respuesta": "",
    "estado": "",
    "usuariocreacion": "",
    "usuarioactualizacion": "",
}

const listarPreguntas = () => {
    return axios
        .post(API_URL + 'listar')
};

const modificarPreguntas = (preguntas) => {
    return axios
        .post(API_URL + 'modificar', preguntas)
};

const insertarPregunta = (preg) => {
    return axios
        .post(API_URL + 'insertar', preg)
};

const eliminarPregunta = (id) => {
    return axios
        .post(API_URL + 'eliminar?id=' + id)
};

const exportar = {
    listarPreguntas,
    modificarPreguntas,
    insertarPregunta,
    eliminarPregunta,
}

export default exportar;