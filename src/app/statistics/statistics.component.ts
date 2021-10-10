import { Component, OnInit } from '@angular/core';
import { StatisticsService } from './statistics.service';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

    constructor(public statisticsService: StatisticsService) { }

    ngOnInit(): void {
        this.statisticsService.getGistsAndTriggerChartInit();
    }
    
    public onLoadMoreGists(page: number, isTriggeredByFilesChart?: boolean): void {
        this.statisticsService.loadMoreGistsAndTriggerChartUpdate(page, isTriggeredByFilesChart);
    }

}
