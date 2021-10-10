import { Component, OnInit } from '@angular/core';
import { StatisticsService } from './statistics.service';
import { ChartService } from './chart/chart.service';
import {GistsService} from '../shared/gists.service';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

    constructor(private statisticsService: StatisticsService,
                private gistsService: GistsService,
                private chartService: ChartService,
    ) { }

    ngOnInit(): void {
        this.getGists();
    }

    private getGists(): void {
        this.gistsService
            .getPublicGists({page: 1, per_page: 10})
            .subscribe((res: any) => {
                const chartData = this.statisticsService.prepareDataForChart(5, res);
                this.chartService.chartDataSubject.next(chartData);
            });
    }

}
