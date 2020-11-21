import axios from "axios";

const API_URL = "http://3.87.144.73:8084/api/lugarentrega/listarLugaresEntrega";

const lugar ={
    "iddepartamento": null,
    "idprovincia":null,
    "iddistrito": null,
    "nombre": ""
}

const obtenerLugares=(props)=>{
    return axios
      .post(API_URL, {lugar})
  };
  
  const exportar = {
      obtenerLugares
  }
  
  export default exportar;