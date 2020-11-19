import axios from "axios";

const API_URL = "http://3.87.144.73:8084/api/departamento";

function mostrarDepartamentos(){
  return axios
    .get(API_URL+ 'listar')
    .then(response =>{
      console.log("Departamentos: ",response.data);
      return response.data;
    })
    .catch(() => {
      console.log('Error al pedir los departamentos')
    });
};


const exportar = {
  mostrarDepartamentos,
}

export default exportar;