import axios from "axios";

const API_URL = "http://127.0.0.1:8084/api/cronograma/descargar";



const descargarCronograma=(props)=>{
    return axios
      .get(API_URL, props)
      .then(response =>{   
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'cronograma.xlsx'); //or any other extension
            document.body.appendChild(link);
            link.click();
            console.log(response, "es el excel :)");
        })
      .catch(() => {
        console.log('Error al descargar cronograma')
      });  
  };
  
  const exportar = {
    descargarCronograma
  }
  
  export default exportar;