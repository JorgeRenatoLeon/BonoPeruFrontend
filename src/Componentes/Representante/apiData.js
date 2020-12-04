import axios from "axios";
const ENTREGADOS = "http://localhost:8084/api/cronograma/monitoreoentregabono";
 
async function DataEntregadosApi(){
    return axios.post(ENTREGADOS)
    .then(response =>{
        //console.log("API entregado: ",response.data);  
        localStorage.setItem("DataEntregados", JSON.stringify(response.data)); //Guardar la rpta del apibeneficiario
           
       return response.data;
        
    })
    .catch(() => {
        console.log('Error al obtener Entregados apiData.js');
    });
}
const apiData = {
    DataEntregadosApi
}

export default apiData;