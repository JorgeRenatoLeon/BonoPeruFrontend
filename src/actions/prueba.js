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

export const fetchPokemons = payload =>{
  //console.log('payload: ',payload);//Payload es undefined
  return dispatch =>{
    dispatch(startGet());    
    fetch('https://pokeapi.co/api/v2/pokemon')
    .then( response => response.json())
    .then( result =>{ 
            // console.log("Prueba action:",successGet(result));
            dispatch(successGet(result) )             
          
          }); 
  };
};

