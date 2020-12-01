import axios from "axios";

const API_URL= "http://127.0.0.1:8084/api/provincia/";


const mostrarProvincias=(props)=>{
  return axios
    .post(API_URL+ 'listar/'+props)
};

const exportar = {
    mostrarProvincias,
}

export default exportar;