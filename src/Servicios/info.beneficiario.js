import axios from "axios";

const API_URL= "http://127.0.0.1:8084/api/beneficiario/infobeneficiario/";


const mostrarInfo=(props)=>{
  return axios
    .post(API_URL+props)
};

const exportar = {
    mostrarInfo,
}

export default exportar;