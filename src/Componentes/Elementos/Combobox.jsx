import React, { Component } from 'react';
import Select,  { components } from 'react-select';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {  Grid, InputLabel} from '@material-ui/core';


const DropdownIndicator = props => {
    return (
        <components.DropdownIndicator {...props}>
          <ArrowDropDownIcon  fontSize="default" />    
        </components.DropdownIndicator>
      );
};


const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderRadius: "50px",
      width:"250px",
       height: "30px",
      // margin:"10px",
    }),
    control: (provided) => ({
      ...provided,
      borderRadius: "50px",
      width:"250px",
       height: "30px",
      // margin:"10px",
    }),
    container: (provided) => ({
        ...provided,
        width: '250px',
        borderRadius: "50px",
         height: "30px",
        // margin:"10px",

    }),
}

export default function Combobox(props){

  const seleccionar=(e)=>{
    console.log(e, "este es el select");
    props.onSeleccion(e.value);
  }
  

  return(
          <Select components={{DropdownIndicator, IndicatorSeparator: () => null}}
           styles={customStyles} options={props.options} placeholder={props.placeholder} 
           onChange={seleccionar} isDisabled={props.isDisabled} noOptionsMessage={() => "Sin opciones"}/>
  );
}