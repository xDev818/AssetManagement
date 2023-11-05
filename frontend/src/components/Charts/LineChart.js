import React from "react";
import ReactApexChart from "react-apexcharts";
import { lineChartData, 
  lineChartOptions } from "variables/charts";

  import axios from 'axios'



class LineChart extends React.Component {
  constructor(props) {
    super(props);



    this.state = {
      chartData: props,
      chartOptions: {},
    };
  }


  componentDidMount() {
    this.setState({
      chartData: this.props,
      chartOptions: lineChartOptions,
    });
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="area"
        width="100%"
        height="100%"
      />
    );
  }
}

export default LineChart;
