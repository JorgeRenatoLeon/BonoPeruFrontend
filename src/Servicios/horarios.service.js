import axios from "axios";

const API_URL = "http://3.87.144.73:8084/api/cronograma/listarhorariocronograma";

const cronograma ={
    idcronograma: 2,
    iddepartamento:null,
    idprovincia:null,
    iddistrito:null,
    fechaini:"2020-11-20",
    fechafin: "2020-12-10",
    nombre:""
}

const obtenerHorarios=(props)=>{
    return axios
      .post(API_URL, {cronograma})
  };
  
  const exportar = {
      obtenerHorarios
  }
  
  export default exportar;