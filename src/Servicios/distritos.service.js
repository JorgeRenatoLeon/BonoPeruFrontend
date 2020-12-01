import axios from "axios";

const API_URL= "http://127.0.0.1:8084/api/distrito/";


const mostrarDistritos=(props)=>{
  return axios
    .post(API_URL+ 'listar/'+props)
};

const exportar = {
    mostrarDistritos,
}

export default exportar;