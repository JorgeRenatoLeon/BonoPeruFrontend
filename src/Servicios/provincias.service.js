import axios from "axios";

const API_URL= "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/provincia/";


const mostrarProvincias=(props)=>{
  return axios
    .post(API_URL+ 'listar/'+props)
};

const exportar = {
    mostrarProvincias,
}

export default exportar;