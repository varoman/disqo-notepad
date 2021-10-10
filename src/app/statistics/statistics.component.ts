import { Component, OnInit } from '@angular/core';
import { StatisticsService } from './statistics.service';
import { SharedService } from '../shared/shared.service';
import { ViewportScroller } from '@angular/common';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

    constructor(public statisticsService: StatisticsService,
                private sharedService: SharedService,
                private viewportScroller: ViewportScroller,
                ) { }

    ngOnInit(): void {
        this.statisticsService.getGistsAndTriggerChartInit();
        this.viewportScroller.scrollToPosition([0,0])
    }

    public onHideStats(): void {
        this.sharedService.hideStats();
    }
    
    public onLoadMoreGists(page: number, isTriggeredByFilesChart?: boolean): void {
        this.statisticsService.loadMoreGistsAndTriggerChartUpdate(page, isTriggeredByFilesChart);
    }

}
