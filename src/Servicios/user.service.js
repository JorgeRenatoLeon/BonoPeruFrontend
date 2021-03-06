import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/test/";
const API_URL_2 = "http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/usuarios/";
//const API_URL_2 = "http://localhost:8084/api/usuarios/";

const usuario = {
  "idRol": null,
  "usuario": "",
  "contrasena": "",
  "nombres": "",
  "apellidos": "",
}

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const listarUsuarios = () => {
  return axios
    .post(API_URL_2 + 'listar')
};

const modificarUsuarios = (usuario) => {
  return axios
    .post(API_URL_2 + 'modificar', usuario)
};

const insertarUsuarios = (usuario) => {
  return axios
    .post(API_URL_2 + 'insertar', usuario)
};

const eliminarUsuarios = (id) => {
  return axios
    .post(API_URL_2 + 'eliminar?id=' + id)
};

const listarUsuariosFiltrado = (busqueda) => {
  return axios
    .post(API_URL_2 + 'listarFiltrado?busqueda=' + busqueda)
};

const exportar = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  listarUsuarios,
  modificarUsuarios,
  insertarUsuarios,
  eliminarUsuarios,
  listarUsuariosFiltrado,
}

export default exportar;