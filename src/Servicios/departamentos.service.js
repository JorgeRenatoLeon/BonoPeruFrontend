import axios from "axios";

const API_URL = "http://127.0.0.1:8084/api/departamento/";

const mostrarDepartamentos=(props)=>{
  return axios
    .post(API_URL+ 'listar')
    
};


const exportar = {
  mostrarDepartamentos,
}

export default exportar;