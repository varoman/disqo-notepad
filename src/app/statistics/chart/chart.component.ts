import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subject, Subscription } from 'rxjs';
import { ChartData } from './chartData.interface';
Chart.register(...registerables);


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit, OnDestroy {

  @Input() public chartTitle: string;
  @Input() public numbersLabel: string;
  @Input() public dataSubscriber: Subject<ChartData>;
  @Output() public loadMoreGists = new EventEmitter<number>();
  private page = 1;
  public chart: Chart;
  private readonly chartColor = '#39ACDC';
  private subscriptions = new Subscription();

  constructor() { }

  ngAfterViewInit(): void {
    this.initChart();
    const subscription =
    this.dataSubscriber
        .subscribe((data) => this.updateChart(data));
    this.subscriptions.add(subscription);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onLoadMore() {
    this.loadMoreGists.emit(++this.page);
    this.chart.update();
  }

  private updateChart(chartData: ChartData) {
    // add new elements to the left side of chart as they are older.
    this.chart.data.labels?.unshift(...chartData.labels);
    this.chart.data.datasets[0].data.unshift(...chartData.data);
    this.chart.update();
  }

  private initChart(): void {
    this.chart = new Chart(this.chartTitle, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          data: [],
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
