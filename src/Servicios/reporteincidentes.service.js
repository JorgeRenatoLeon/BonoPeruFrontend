import axios from "axios";

const API_URL = "http://127.0.0.1:8084/api/incidente/reporte";



const obtenerReporte=(props)=>{
    return axios
      .post(API_URL,props)
  };
  
  const exportar = {
        obtenerReporte
  }
  
  export default exportar;