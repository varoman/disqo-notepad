import { Injectable } from '@angular/core';
import { Gist } from '../shared/gist.interface';
import { ChartData } from './chart/chartData.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  /**
   * In order to show amount of gists at the time when request is performed we need
   * to pull that amount from github api, but github api doesn't share that info in gists api.
   *
   * From github documentation:
   *
   * Note: With pagination, you can fetch up to 3000 gists.
   * For example, you can fetch 100 pages with 30 gists per page or 30 pages
   * with 100 gists per page.
   *
   * With this limitation in place, we can safely state, that there there are no more
   * than 3000 gists at the time when request is performed, thus we can use
   * this data to mock the result count.
   */
  public readonly resultCount = 3000;
  public readonly itemsPerPage = 10;
  public readonly delimiterStepSize = 5;
  // pass these subjects to chart component instance as dataSubscriber,
  // chart component will subscribe to it as a data update source.
  public gistsChartDataSubject: Subject<ChartData> = new Subject();
  public gistsFileChartDataSubject: Subject<ChartData> = new Subject();

  constructor() {
  }


  public prepareDataForChart(gists: Gist[], isFileChart?: boolean): ChartData {
    const {latestDelimiter, firstDelimiter} = StatisticsService
        .getFirstAndLastDelimitersFromCollection(gists);

    // unix milliseconds representation of x axis labels
    const delimiters: number[] = this.generateDelimitersInMilliseconds(
        firstDelimiter,
        latestDelimiter,
    );

    let sortedData;

    if (isFileChart) {
      sortedData = this.sortGistsFilesDataCollectionByBuckets(delimiters, gists);
    } else {
      sortedData = this.sortGistsDataCollectionByBuckets(delimiters, gists);

    }
    return {
      labels: StatisticsService.parseDelimiters(delimiters),
      data: sortedData,
    };
  }


  /**
   * Bucket data according to amount of delimiters.
   * @param delimiters - collection of delimiters in unix epoch milliseconds.
   * @param data - collection of items to iterate against.
   */
  private sortGistsDataCollectionByBuckets(delimiters: number[], data: Gist[]): number[] {
    const dataSet: number[] = [];
    delimiters.forEach((delimiter: number) => {
      const recordsInDelimiterTimeSpan = data
          .filter((item: Gist) => new Date(item.created_at).getTime() <= delimiter);
      dataSet.push(this.resultCount - (this.itemsPerPage - recordsInDelimiterTimeSpan.length));
    });
    return dataSet;
  }

  private sortGistsFilesDataCollectionByBuckets(delimiters: number[], data: Gist[]): number[] {
    let dataSet: number[] = [];
    for (let i = 0; i < delimiters.length - 1; i ++) {
      const recordsInDelimiterTimeSpan = data
          .filter((item: Gist) => {
            const created = new Date(item.created_at).getTime();
            return created > delimiters[i] && created <= delimiters[i + 1];
          });
      const numberOfFilesInTheCurrentSetOfData =
          this.numberOfFilesInTheCurrentSetOfData(recordsInDelimiterTimeSpan)
      dataSet.push(numberOfFilesInTheCurrentSetOfData);
    }

    // for gists files chart we are chunking data by periods of time rather than a given point of time,
    // the pair of the earliest record will miss, so append a 0 to have a symmetric data;
    dataSet.unshift(0);

    return dataSet;
  }

  private numberOfFilesInTheCurrentSetOfData(gists: Gist[]): number {
    return gists
        .reduce((acc, curr) =>
            acc + Object.values(curr.files).length, 0);
  }

  /**
   * @param delimiters - a collection of unix epoch based numbers
   * @returns 24 hour format representation of those.
   */
  private static parseDelimiters(delimiters: number[]): string[] {
    return delimiters.map((item: any) =>
        new Date(item).toLocaleTimeString('en-US', {hour12: false}))
  }

  /**
   * Generate a collection of delimiters in unix epoch milliseconds from first
   * delimiter to the latest one based on the size of the step.
   * @returns [1633871507000, 1633873912000... ] - unix milliseconds representation of x axis labels
   */
  private generateDelimitersInMilliseconds(
      firstDelimiter: number,
      latestDelimiter: number,
      ): number[] {

    const delimiters = [];
    for (let i = latestDelimiter; i >= firstDelimiter; i -= this.delimiterStepSize * 1000) {
      delimiters.push(new Date(i).getTime());
    }
    return delimiters.reverse();
  }

  private static getFirstAndLastDelimitersFromCollection(data: Gist[]):
      { latestDelimiter: number, firstDelimiter: number }  {
    /* represent the first and latest points on the timeline in milliseconds
       since unix epoch in the data collection.
       we need this data to understand what is time period between first entity
       and the latest one in order to get all available chart delimiters in that period.
     */
    return {
      latestDelimiter: new Date(data[0].created_at).getTime(),
      firstDelimiter: new Date(data[data.length - 1].created_at).getTime(),
    };
  }
}
