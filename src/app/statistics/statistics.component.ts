import { Component, OnInit } from '@angular/core';
import { StatisticsService } from './statistics.service';
import { ChartService } from './chart/chart.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  constructor(private statisticsService: StatisticsService,
              private chartService: ChartService) { }

  ngOnInit(): void {
    this.getGists();
  }

  private getGists(): void {
    this.statisticsService.getPublicGists({page: 1, per_page: 100})
        .subscribe((res: any) => {
          const chartData = this.statisticsService.prepareDataForChart(120, res);
          this.chartService.chartDataSubject.next(chartData);
        });
  }

}
