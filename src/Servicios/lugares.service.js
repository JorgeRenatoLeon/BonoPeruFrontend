import axios from "axios";

const API_URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/lugarentrega/listarLugaresEntrega";

const lugar ={
    iddepartamento: null,
    idprovincia:null,
    iddistrito: null,
    nombre: ""
}

const obtenerLugares=(props)=>{
    return axios
      .post(API_URL, {lugar})
  };
  
  const exportar = {
      obtenerLugares
  }
  
  export default exportar;