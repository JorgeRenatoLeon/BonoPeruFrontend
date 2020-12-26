import axios from "axios";

const API_URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/incidente/reporte";



const obtenerReporte=(props)=>{
    return axios
      .post(API_URL,props)
  };
  
  const exportar = {
        obtenerReporte
  }
  
  export default exportar;