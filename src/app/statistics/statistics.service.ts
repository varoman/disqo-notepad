import { Injectable } from '@angular/core';
import { Notepad } from '../notepads/notepad/notepad.interface';

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
  public readonly itemsPerPage = 100;
  public readonly delimiterStepSize = 120;

  constructor() {
  }

  /**
   *
   * @param data - collection of items to draw chart data from.
   */
  public prepareDataForChart(data: Notepad[]): any {
    /* represent the first and last points on the timeline in milliseconds
       since unix epoch in the data collection.
       we need this data to understand what is time period between first entity
       and the last one in order to get all available chart delimiters in that period.
     */
    const lastDelimiter = new Date(data[0].created_at).getTime();
    const firstDelimiter = new Date(data[data.length - 1].created_at).getTime();

    // unix milliseconds representation of x axis labels
    const delimiters: number[] = this.generateDelimitersInMilliseconds(
        firstDelimiter,
        lastDelimiter,
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
  private sortDataCollectionByBuckets(delimiters: number[], data: Notepad[]): number[] {
    const dataSet: number[] = [];
    delimiters.forEach((delimiter: number) => {
      const recordsInDelimiterTimeSpan = data
          .filter((item: Notepad) => new Date(item.created_at).getTime() <= delimiter);
      dataSet.push(this.resultCount - (this.itemsPerPage - recordsInDelimiterTimeSpan.length));
    });
    return dataSet;
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
   * @returns [1633871507000, 1633873912000... ]
   */
  private generateDelimitersInMilliseconds(
      firstDelimiter: number,
      lastDelimiter: number,
      ): number[] {

    const delimiters = [];
    for (let i = lastDelimiter; i >= firstDelimiter; i -= this.delimiterStepSize * 1000) {
      delimiters.push(new Date(i).getTime());
    }
    return delimiters.reverse();
  }
}
