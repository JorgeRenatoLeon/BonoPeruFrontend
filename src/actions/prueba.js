import { push } from "react-router-redux";
import { START_GET,SUCESS_GET } from "./types";

//Para llamar a la api
 const startGet = payload => ({
  type: START_GET,
  ...payload
});

 const successGet = payload => ({
  type: SUCESS_GET,
  ...payload 
  
});


export const fetchPokemons = ( payload, h) => (dispatch) => {
  console.log('payload: ',typeof payload);
  dispatch(startGet());  
   //return fetch('https://pokeapi.co/api/v2/pokemon')  
  return fetch('http://localhost:8084/api/beneficiario/consultarHorario/'+payload ,{
    method: 'POST',
    headers: {
        'Content-Type': ''
    },
    body: ''})  
    .then( response => response.json())
    .then( result =>{ 
             console.log("Prueba action:",successGet(result));
             dispatch(successGet(result) );
             localStorage.setItem("beneficiario", JSON.stringify(result)); //Guardar la rpta del api 
             return Promise.resolve(); 
          
          });
    
 
};

