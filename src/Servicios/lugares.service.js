import axios from "axios";

const API_URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/lugarentrega/listarLugaresEntrega";



const obtenerLugares=(props)=>{
    return axios
      .post(API_URL,props)
  };
  
  const exportar = {
      obtenerLugares
  }
  
  export default exportar;