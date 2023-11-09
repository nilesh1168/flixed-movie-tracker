import { Component } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


class Statistics extends Component {

    options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    dataDoughnut = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    dataBar = {
        labels: this.labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: this.labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: this.labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    render() {
        return (
            <div className="container-fluid">Hello Welcome to Stats Page
                <div className="container-fluid">
                    <div className="container-fluid row">
                        <div className="col-md-8">
                            <Bar options={this.options} data={this.dataBar} />
                        </div>
                        <div className="col-md-4">
                            <Doughnut data={this.dataDoughnut} />
                        </div>
                    </div>
                    <div className="container-fluid row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-8">
                            <Bar options={this.options} data={this.dataBar} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Statistics