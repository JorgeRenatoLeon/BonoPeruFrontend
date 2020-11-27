import axios from "axios";

const API_URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/departamento/";

const mostrarDepartamentos=(props)=>{
  return axios
    .post(API_URL+ 'listar')
    
};


const exportar = {
  mostrarDepartamentos,
}

export default exportar;