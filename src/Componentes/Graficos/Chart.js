 import React, {Component} from 'react';
 import {Bar, Line, Pie} from 'react-chartjs-2';
 import { Grid} from "@material-ui/core"
 class Chart extends Component{
   constructor(props){
     super(props);
     this.state = {
       chartData:props.chartData
     }
   }

   static defaultProps = {
     displayTitle:true,
     displayLegend: true,
     legendPosition:'right',
     location:'City'
   }

   render(){
     return (
       <Grid className="chart">
            <Line
           data={this.state.chartData}
           options={{
             title:{
               display:this.props.displayTitle,
               text:'Cronogramas entregados',
               fontSize:25
             },
             legend:{
               display:this.props.displayLegend,
               position:this.props.legendPosition
             }
           }}
         />
          <Bar
           data={this.state.chartData}
           options={{
             title:{
               display:this.props.displayTitle,
               text:'Largest Cities In '+this.props.location,
               fontSize:25
             },
             legend:{
               display:this.props.displayLegend,
               position:this.props.legendPosition
             }
           }} 
         />

      

          <Pie
           data={this.state.chartData}
           options={{
             title:{
               display:this.props.displayTitle,
               text:'Largest Cities In '+this.props.location,
               fontSize:25
             },
             legend:{
               display:this.props.displayLegend,
               position:this.props.legendPosition
             }
           }}
           
         /> 
         
   
         
       </Grid>
     )
   }
 }

 export default Chart;