import axios from "axios";

const API_URL = "http://127.0.0.1:8084/api/lugarentrega/listarLugaresEntrega";



const obtenerLugares=(props)=>{
    return axios
      .post(API_URL,props)
  };
  
  const exportar = {
      obtenerLugares
  }
  
  export default exportar;