import axios from "axios";

const API_URL = "http://3.87.144.73:8084/api/departamento/";

const mostrarDepartamentos=(props)=>{
  return axios
    .post(API_URL+ 'listar')
    
};


const exportar = {
  mostrarDepartamentos,
}

export default exportar;