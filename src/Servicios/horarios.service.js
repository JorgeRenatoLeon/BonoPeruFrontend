import axios from "axios";

const API_URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/cronograma/listarbeneficiarioscronograma";


const obtenerHorarios=(props)=>{
    return axios
      .post(API_URL, props)
  };
  
  const exportar = {
      obtenerHorarios
  }
  
  export default exportar;