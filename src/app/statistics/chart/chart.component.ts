import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public chart: Chart;

  constructor() { }

  ngOnInit(): void {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 3
        }]
      },
      options: {
        elements: {
          line: {
            borderColor: '#83aee0',
          }
        },
        plugins: {
          legend: {
            display: false,
          }
        },
        backgroundColor: '#83aee0',
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Gists'
            }
          }
        }
      }
    });
  }

}
