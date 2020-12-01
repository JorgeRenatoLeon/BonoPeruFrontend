import React, {useState} from 'react';
import axios from "axios";

const API_URL = "http://127.0.0.1:8084/api/horario/consultarCodigoFamilia";

const datos ={
    idlugarentrega: 7,
	codigofamilia:"FAMILIA3",
	hora:"13:00:00",
	dia: "2020-12-08"
}


const consultarCodigoFamilia=(props)=>{
  return axios
    .post(API_URL, props) 
};


const exportar = {
    consultarCodigoFamilia,
}

export default exportar;