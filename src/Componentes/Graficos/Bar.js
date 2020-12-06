 import React, {Component} from 'react';
 import {Bar} from 'react-chartjs-2';
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
     nameTitle:'City',
     sm:12,
     md:12,
     xs:12,

   }

   render(){
     return (
       <Grid  container  item xs={this.props.xs} sm={this.props.sm} md={this.props.md} justify="center" >
           <Bar
           data={this.state.chartData}
           options={{
             title:{
               display:this.props.displayTitle,
               text:this.props.nameTitle, 
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