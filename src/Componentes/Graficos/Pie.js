 import React, {Component} from 'react';
 import {Pie} from 'react-chartjs-2';
 import { Grid} from "@material-ui/core"
 import "chartjs-plugin-datalabels";
 class Chart extends Component{
   constructor(props){
     super(props);
     this.state = { data: { datasets:[], labels:[] } }
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
        <Pie
           data={this.props.chartData}
           options={{
             title:{
               display:this.props.displayTitle,
               text:this.props.nameTitle,
               fontSize:25
             },
             legend:{
               display:this.props.displayLegend,
               position:this.props.legendPosition
             },
             plugins: {
                datalabels: {
                  display: true,
                  color: 'gray'
                }
              }
           }}
           
         /> 
       </Grid>
     )
   }
 }

 export default Chart;