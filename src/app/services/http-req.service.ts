import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstants } from '../shared/global-constants';

@Injectable({
  providedIn: 'root'
})
export class HttpReqService {
  apiUrl = GlobalConstants.apiURL;

  constructor(
    private http: HttpClient,
  ) { }

  test(url: any, file: any) {
    return this.http.get<any>(`assets/data/${url}/${file}.json`);
  }

  httpGetRequest(url: string) {
    return this.http.get<any>(`${this.apiUrl}/api/${url}`);
  }

  httpPostRequest(url:string, data: any) {
    return this.http.post<any>(`${this.apiUrl}/api/${url}`,
      {
        data: data
      }
    );
  }
}
