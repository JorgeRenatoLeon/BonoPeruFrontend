import axios from "axios";

const API_URL= "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/distrito/";


const mostrarDistritos=(props)=>{
  return axios
    .post(API_URL+ 'listar/'+props)
};

const exportar = {
    mostrarDistritos,
}

export default exportar;