import axios from "axios";

const API_URL = "http://3.87.144.73:8084/api/departamento/";

async function mostrarDepartamentos(){
  return axios
    .post(API_URL+ 'listar')
    .then(response =>{
      const departamentos = [];

        response.data.map(dep => {
          departamentos.push({
                value: dep.nombre,
                label: dep.nombre,
            });
        });
        //console.log(departamentos);
      return departamentos;
    })
    .catch(() => {
      console.log('Error al pedir los departamentos')
    });
};


const exportar = {
  mostrarDepartamentos,
}

export default exportar;