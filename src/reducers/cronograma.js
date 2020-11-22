import { START_GET,
         SUCESS_GET } from "../actions/types";


// const beneficiario = JSON.parse(localStorage.getItem("beneficiario"));
const initialState = {}
function exportar(state = initialState, action) {
  const { type, payload } = action; //action tiene en [0] un tipo y el [1] al payload
 
  switch (type) {
    case START_GET:     
      return {  beneficiario:action.results};     

    case SUCESS_GET:     
      return { beneficiario:action.results };      

    default:
      return {...state};
      
  }
}
export default exportar