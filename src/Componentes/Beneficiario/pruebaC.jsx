import React, {useEffect,useState} from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import CronogramaService from "../../Servicios/historico.service";
import {  Grid } from '@material-ui/core';
const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      maxWidth: 1070,
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
    
  }),
);

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



function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Prueba=()=> {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [idArray, setIdArray] = useState([]);
  const [cronogramas, setCro]= useState([]);
  const [names,setNames] = useState([]);
  useEffect(() => {
   
    CronogramaService.mostrarHistorico().then(response =>{
      let croAux=[];
      response.data.map(cro => {
        croAux.push({
          key: cro.id,
          label: cro.nombre,
        });
      });
      setNames(croAux);
      console.log("cronogramas", croAux);
      })
      .catch(() => {
        console.log('Error al pedir los cronogramas')
      });
    
  },[]);
    
  const handleChange = (event) => {
    setPersonName(event.target.value);
    console.log(event.target.value, "lo que muestro");
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value= [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };

  return (
    <Grid>
    <Grid>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label"></InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected).map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name.key}  value={name.label} style={getStyles(name, personName, theme)}>
              {name.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
    </Grid>
  );
}

export default Prueba;