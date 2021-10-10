import { Component, OnInit } from '@angular/core';
import { StatisticsService } from './statistics.service';
import { GistsService } from '../shared/gists.service';
import { Gist } from '../shared/gist.interface';

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
        this.getGistsAndTriggerChartChange();
    }

    private getGistsAndTriggerChartChange(): void {
        this.gistsService
            .getPublicGists({page: 1, per_page: this.statisticsService.itemsPerPage})
            .subscribe((gists: Gist[]) => {
                const gistsData = this.statisticsService.prepareDataForChart(gists);
                const gistsFileData = this.statisticsService.prepareDataForChart(gists, true);
                this.statisticsService.gistsChartDataSubject.next(gistsData);
                this.statisticsService.gistsFileChartDataSubject.next(gistsFileData);
            });
    }

}
