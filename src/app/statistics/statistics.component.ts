import { Component, OnInit } from '@angular/core';
import { StatisticsService } from './statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.getGists();
  }

  private getGists(): void {
    this.statisticsService.getPublicGists({
      page: 30,
      per_page: 100,
    })
        .subscribe(res => console.log(res, 'res'))
  }

}
