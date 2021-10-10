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
            .getPublicGists({page: 1, per_page: this.statisticsService.itemsPerPage})
            .subscribe((res: any) => {
                const chartData = this.statisticsService.prepareDataForChart(res);
                this.chartService.chartDataSubject.next(chartData);
            });
    }

}
