import { Component, OnInit } from '@angular/core';
import { StatisticsService } from './statistics.service';
import { GistsService } from '../shared/gists.service';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

    constructor(public statisticsService: StatisticsService,
                private gistsService: GistsService,
    ) { }

    ngOnInit(): void {
        this.getGists();
    }

    private getGists(): void {
        this.gistsService
            .getPublicGists({page: 1, per_page: this.statisticsService.itemsPerPage})
            .subscribe((res: any) => {
                const gistsData = this.statisticsService.prepareDataForChart(res);
                const gistsFileData = this.statisticsService.prepareDataForChart(res, true);
                this.statisticsService.gistsChartDataSubject.next(gistsData);
                this.statisticsService.gistsFileChartDataSubject.next(gistsFileData);
            });
    }

}
