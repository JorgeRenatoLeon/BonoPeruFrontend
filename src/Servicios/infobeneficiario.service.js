import axios from "axios";

const API_URL= "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/beneficiario/infobeneficiario/";


const mostrarInfo=(props)=>{
  return axios
    .post(API_URL+props)
};

const exportar = {
    mostrarInfo,
}

export default exportar;