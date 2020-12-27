import React from 'react';
import Select, { components } from 'react-select';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const DropdownIndicator = props => {
    return (
        <components.DropdownIndicator {...props}>
            <ArrowDropDownIcon fontSize="default" />
        </components.DropdownIndicator>
    );
};

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderRadius: "50px",
        width: "250px",
        height: "30px",
    }),
    control: (provided) => ({
        ...provided,
        borderRadius: "50px",
        width: "250px",
        height: "30px",
    }),
    container: (provided) => ({
        ...provided,
        width: '250px',
        borderRadius: "50px",
        height: "30px",

    }),
}

export default function Combobox(props) {
    const seleccionar = (e) => {
        props.onSeleccion(e);
    }

    return (
        <Select components={{ DropdownIndicator, IndicatorSeparator: () => null }}
            styles={customStyles} options={props.options} placeholder={props.placeholder}
            onChange={seleccionar} isDisabled={props.isDisabled} noOptionsMessage={() => "Sin opciones"} />
    );
}