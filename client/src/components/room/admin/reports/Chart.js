import React, { Component } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

export default class Chart extends Component {
    constructor(props) {
        super(props);

        console.log(123);
        console.log(this.props.chartData);

        this.data = {
            labels: this.props.chartData.labels,
            datasets: [{
                data: this.props.chartData.dataset,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderColor: 'rgba(255,255,255, 0.6)',
                borderWidth: 1
            }]
        }

        this.options = {
            maintainAspectRatio: false,
            elements: {
                
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                        drawTicks: false
                    },
                    ticks: {
                        display: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                        drawTicks: false
                    },
                    ticks: {
                        display: false,
                    }   
                }]
            },
            legend: {
                display: false
            },

        }
    }

    render() {
        return (
            <Line
                data={this.data}
                width={100}
                height={300}
                options={this.options}
            />
        )
    }
}
