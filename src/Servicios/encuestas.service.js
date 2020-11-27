import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8084/api/encuesta/";

async function obtenerEncuesta(idUsuario){
  return axios
    .post(API_URL + idUsuario, { headers: authHeader() })
    .then(response =>{
      console.log("API OBT ENCUESTA: ",response.data)
      return response.data;
    })
    .catch(() => {
      console.log('Error al obtener Encuestas')
    });
};

const responderEncuesta = (idEncuesta,respuestas) => {
  return axios
    .post(API_URL + 'responder/' + idEncuesta,respuestas, { headers: authHeader() })
    .then(response =>{
      console.log("API RESP ENCUESTA: ",response)
      return true;
    })
    .catch(() => {
      console.log('Error al responder Encuesta')
      return false
    });
};

const exportar = {
    obtenerEncuesta,
    responderEncuesta
}

export default exportar;