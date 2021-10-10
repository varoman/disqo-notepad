import {
  Component,
  OnInit,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartService } from './chart.service';
Chart.register(...registerables);


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public chart: Chart;

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.chartService
        .chartDataSubject
        .subscribe((data) => this.initChart(data));
  }

  private initChart({labels, data}: any): void {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data,
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
            title: {
              display: true,
              text: 'Number of Gists'
            }
          },
          x: {
            grid: {
              display: false,
            }
          }
        }
      }
    });
  }

}
