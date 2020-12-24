import React, { Component } from 'react';
import Select,  { components } from 'react-select';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {  Grid, InputLabel} from '@material-ui/core';
//para multiple
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';


const DropdownIndicator = props => {
    return (
        <components.DropdownIndicator {...props}>
          <ArrowDropDownIcon  fontSize="default" />    
        </components.DropdownIndicator>
      );
};

/*

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
*/
export default function Combobox(props){

  const seleccionar=(e)=>{
    console.log(e, "este es el select");
    props.onSeleccion(e.value);
  }
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));
  function getStyles( theme) {
    return {
      fontWeight:theme.typography.fontWeightRegular
       
    };
  }
  
  
  const classes = useStyles();
  const theme = useTheme();
  return(
    <FormControl className={classes.formControl}>
          <Select components={{DropdownIndicator, IndicatorSeparator: () => null}}
          //  styles={customStyles} 
           options={props.options} placeholder={props.placeholder} 
           onChange={seleccionar} isDisabled={props.isDisabled} 
          //  Lo que lo hace multiple
           noOptionsMessage={() => "Sin opciones"}
           multiple 
           labelId="demo-mutiple-name-label"
           id="demo-mutiple-name"
           style={getStyles( theme)}
           MenuProps={MenuProps}
           />
          </FormControl>
  );
}