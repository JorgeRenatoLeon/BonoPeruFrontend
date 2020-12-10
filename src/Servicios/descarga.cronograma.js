import axios from "axios";
const FileDownload = require('js-file-download');

const API_URL = "http://127.0.0.1:8084/api/cronograma/descargar";

const descargarCronograma=(props)=>{
    console.log("lo que le paso", props);
    return axios({
      url: API_URL,
      method: 'POST',
      data: props,
      responseType: 'blob', // Important
    }).then((response) => {
        FileDownload(response.data, 'report.xlsx');
    });
  };
  
  const exportar = {
    descargarCronograma
  }
  
  export default exportar;