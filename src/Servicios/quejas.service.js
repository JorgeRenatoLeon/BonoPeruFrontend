import axios from "axios";

const API_URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/cronograma/historico";

const enviarQuejas = (props) => {
    return axios
      .post(API_URL , props)
  };

const exportar = {
    enviarQuejas,
}

export default exportar;