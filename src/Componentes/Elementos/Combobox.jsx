import React, { Component } from 'react';
import Select,  { components } from 'react-select';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {  Grid, InputLabel} from '@material-ui/core';


const DropdownIndicator = props => {
    return (
        <components.DropdownIndicator {...props}>
          <ArrowDropDownIcon fontSize="large" />
        </components.DropdownIndicator>
      );
};


const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderRadius: "50px",
      width:"300px",
    }),
    control: (provided) => ({
      ...provided,
      borderRadius: "50px",
      width:"300px",
    }),
    container: (provided) => ({
        ...provided,
        width: '300px',
        borderRadius: "50px",
    }),
}

export default function Combobox(props){
    return(
        <Grid>
            <Select components={{DropdownIndicator, IndicatorSeparator: () => null}} styles={customStyles} options={props.options} placeholder=' '/>
        </Grid>
    );
}