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


export const fetchConsulta = ( payload) => (dispatch) => {
  //PAYLOAD es el dato de entrada
  dispatch(startGet());  
  
  return fetch('http://bonoperubackend-env.eba-gtzdnmjw.us-east-1.elasticbeanstalk.com/api/beneficiario/consultarHorario/'+payload ,
         {method: 'POST'})  
      .then( response => response.json())
      .then( result =>{ 
              console.log("Prueba action:",successGet(result));
              dispatch(successGet(result) );
              localStorage.setItem("beneficiario", JSON.stringify(result)); //Guardar la rpta del apibeneficiario
              return Promise.resolve(); 
            
      });
 
};

