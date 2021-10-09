import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private httpClient: HttpClient) {
  }

  public getPublicGists(pagination: any): Observable<Object> {
    return this.httpClient.get('gists/public', { params: pagination });
  }

  /**
   *
   * @param delimiterStepSize {number} - number of seconds for every bucket of chart data.
   * @param data - collection of items to draw chart data from.
   */
  public prepareDataForChart(delimiterStepSize: number, data: any[]): any {
    /* represent the first and last points on the timeline in milliseconds
       since unix epoch in the data collection.
       we need this data to understand what is time period between first entity
       and the last one in order to get all available chart delimiters in that period.
     */
    const lastDelimiter = new Date(data[0].created_at).getTime();
    const firstDelimiter = new Date(data[data.length - 1].created_at).getTime();

    const delimiters: number[] = StatisticsService.generateDelimitersInMilliseconds(
        firstDelimiter,
        lastDelimiter,
        delimiterStepSize,
    );

    const dataByChunks: number[] = this.sortDataCollectionByBuckets(delimiters, data);

    return {
      labels: StatisticsService.parseDelimiters(delimiters),
      data: dataByChunks,
    };
  }

  /**
   * Bucket data according to amount of delimiters.
   * @param delimiters - collection of delimiters in unix epoch milliseconds.
   * @param data - collection of items to iterate against.
   */
  private sortDataCollectionByBuckets(delimiters: number[], data: any[]): number[] {
    const dataSet = [];
    for (let i = 0; i < delimiters.length; i++) {
      const recordsInDelimiterTimeSpan = data
          .filter((item: any) => new Date(item.created_at).getTime() <= delimiters[i]);
      dataSet.push(3000 - (100 -recordsInDelimiterTimeSpan.length));
    }
    return dataSet;
  }

  /**
   * @param delimiters - a collection of unix epoch based numbers
   * @returns 24 hour format representation of those.
   */
  private static parseDelimiters(delimiters: number[]): any[] {
    return delimiters.map((item: any) =>
        new Date(item).toLocaleTimeString('en-us', {hour12: false}))
  }

  /**
   * Generate a collection of delimiters in unix epoch milliseconds from first
   * delimiter to the latest one based on the size of the step.
   */
  private static generateDelimitersInMilliseconds(
      firstDelimiter: number,
      lastDelimiter: number,
      delimiterStepSize: number,
      ): number[] {

    const delimiters = [];
    for (let i = firstDelimiter; i <= lastDelimiter; i += delimiterStepSize * 1000) {
      delimiters.push(new Date(i).getTime());
    }
    return delimiters;
  }
}
