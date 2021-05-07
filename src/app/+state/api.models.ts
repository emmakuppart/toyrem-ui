import { HttpParams } from '@angular/common/http';

export abstract class ToyremFilter {
  page: number = 1;
  size: number = 25;

  public static toHttpParams(filter: ToyremFilter): HttpParams {
    let params = new HttpParams();
    Object.keys(filter).forEach(key => {
      const value = filter[key]?.toString()?.trim();
      if (value && value.length > 0) {
        params = params.append(key, value);
      }
    });
    return params;
  }
}

export class Page<T> {
  results: T[];
  count: number;
}