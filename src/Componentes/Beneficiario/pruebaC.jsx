import React from 'react'
import { Typography} from "@material-ui/core";
import { useSelector } from "react-redux";
// Este es un componente para usarlo de prueba :D
export default function PruebaC () { 

    const {beneficiario}= useSelector(state => state.prueba);
    console.log('PruebC beneficiario:', beneficiario);
    
    return (    <Typography variant="h3"  gutterBottom justify="center" >
        {beneficiario[0].name+" "+beneficiario[0].url}
        </Typography> );
}