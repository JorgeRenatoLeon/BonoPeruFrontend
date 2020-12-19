import axios from "axios";

const API_URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/quejas/insertar";

const enviarQuejas = (props) => {
    console.log(props, "props enviar quejas");
    return axios
      .post(API_URL , props)
  };

const exportar = {
    enviarQuejas,
}

export default exportar;