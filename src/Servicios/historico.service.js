import axios from "axios";

const API_URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/cronograma/historico";

const mostrarHistorico=(props)=>{
  return axios
    .post(API_URL)
    
};


const exportar = {
    mostrarHistorico,
}

export default exportar;