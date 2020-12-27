import axios from "axios";

const API_URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/cronograma/listar_cronogramas";

const listar=(props)=>{
  return axios
    .post(API_URL)
    
};


const exportar = {
    listar,
}

export default exportar;