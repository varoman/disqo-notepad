import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subject } from 'rxjs';
import { ChartData } from './chartData.interface';
Chart.register(...registerables);


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() public chartTitle: string;
  @Input() public numbersLabel: string;
  @Input() public dataSubscriber: Subject<ChartData>;
  public chart: Chart;
  private readonly chartColor = '#39ACDC';

  constructor() { }

  ngOnInit(): void {
    this.dataSubscriber
        .subscribe((data) => this.initChart(data));
  }

  private initChart(chartData: {labels: string[], data: number[]}): void {
    this.chart = new Chart(this.chartTitle, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [{
          data: chartData.data,
          borderWidth: 3
        }]
      },
      options: {
        elements: {
          line: {
            borderColor: this.chartColor,
          },
        },
        plugins: {
          legend: {
            display: false,
          }
        },
        backgroundColor: this.chartColor,
        maintainAspectRatio: false,
        scales: {
          y: {
            title: {
              display: true,
              text: this.numbersLabel,
            },
            ticks: {
              stepSize: 1,
            }
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              align: 'start',
            }
          },
        }
      }
    });
  }

}
