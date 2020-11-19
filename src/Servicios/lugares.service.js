import axios from "axios";

const API_URL = "http://3.87.144.73:8084/api/lugarentrega/listarLugaresEntrega";
const lugar ={
    "iddepartamento": null,
    "idprovincia":null,
    "iddistrito": null,
    "nombre": ""
}
async function obtenerLugares(idUsuario){
    return axios
      .post(API_URL, { lugar})
      .then(response =>{
        console.log(response.data)
        return response.data;
      })
      .catch(() => {
        console.log('Error al obtener Lugares')
      });
  };
  
  const exportar = {
      obtenerLugares
  }
  
  export default exportar;