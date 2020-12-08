import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {DateRangePicker} from 'react-dates';
import moment from 'moment'
import 'moment/locale/es'  // without this line it didn't work
moment.locale('es')

class RangoFechas extends Component{
    constructor(props){
        super(props);
        this.state ={
            startDate: null,
            endDate: null,
            hideKeyboardShortcutsPanel: true,
            minimumNights: 0,
            //showDefaultInputIcon: true,
            readOnly: true,
            showClearDates: true,
        }
        console.log(this.state);
    }

    capturarFecha(startDate,endDate){
        //({ startDate, endDate }) => this.setState({ startDate, endDate })
        //({startDate,endDate}) => this.capturarFecha(startDate,endDate)
        this.setState({ startDate, endDate });
        this.props.onCambio(startDate,endDate);
    }
    render(){

        return(
            <DateRangePicker
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={({startDate,endDate}) => this.capturarFecha(startDate,endDate)} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                startDatePlaceholderText= "Fecha inicio"
                endDatePlaceholderText= "Fecha fin"
                hideKeyboardShortcutsPanel={this.state.hideKeyboardShortcutsPanel}
                minimumNights={this.state.minimumNights}
                //showDefaultInputIcon={this.state.showDefaultInputIcon}
                readOnly={this.state.readOnly}
                showClearDates={this.state.showClearDates}
            />
            
        )
        
    }
}

export default RangoFechas;