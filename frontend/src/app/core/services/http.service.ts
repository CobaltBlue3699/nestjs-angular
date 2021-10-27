import { AlertService } from './alert.service';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
  HttpResponse,
  HttpEventType,
  HttpEvent
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { switchMap, catchError } from 'rxjs/operators';
import { of, Observable, throwError, EMPTY } from 'rxjs';
import { Browser } from 'src/app/utils';
import { extend } from 'lodash-es';

export interface IHttpServiceOptions {
  // headers?: HttpHeaders | { [header: string]: string | string[]; };
  // observe?: 'response' | 'events' | 'body';
  // params?: HttpParams | { [param: string]: string | string[]; };
  // reportProgress?: boolean;
  // responseType?: 'json' | 'arraybuffer' | 'blob' | 'text';
  // withCredentials?: boolean;
  headers?: { [header: string]: string | string[] };
  ignoreCheck?: boolean;
  ignoreErrorCheck?: boolean;
  cache?: boolean;
}

export interface IResponseBody<T = any> {
  code: number;
  message: string;
  data: T;
}


/**
 * TODO: header extends has bug
 * TODO: upload & download process
 */
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private httpClient: HttpClient,
    private alertService: AlertService
  ) {}

  static readonly basicHeaders = {
    'x-asc-os-version': `${ Browser.os }`,
    'x-asc-client-version': 'Johnson test 1.0'
  };

  static readonly defaultOptions: IHttpServiceOptions = {
    cache: true,
    ignoreCheck: false,
    ignoreErrorCheck: false
  }

  handleSuccess<T = any>(url: string, response: IResponseBody<T>): Observable<IResponseBody<T>> {
    if (!(response?.message && Number.isInteger(response?.code))) {
      if (this.unofficial) { // 不是正常server回應且為開發模式
        this.alertService.alertError(`${url} has invalid response.`);
      }
      return EMPTY;
    }
    if (response.code !== 0) {
      this.alertService.alertError(response.message, { extraText: `${response.code}` });
    }
    return of(response);
  }

  handleError(errorResponse: HttpErrorResponse): void {
    const { ok, error, status } = errorResponse;
    const { code, message } = error;

    if (ok) {
      return;
    }

    this.alertService.alertError(message, { extraText: `${status}-${code}` });
  }

  getHttpParams(data: any, cache = true): HttpParams {
    let params = new HttpParams();
    if (data) {
      Object.keys(data).forEach(key => {
        params = params.append(`${key}`, `${data[key]}`);
      });
    }

    if (this.unofficial || !cache) { // 開發環境幫忙加上時間戳記 (cache disable)
      params = params.append('_t', `${ Date.now() }`);
    }
    return params;
  }

  // getFormData(data: any, cache = true): FormData {
  //   let formData = new FormData();
  //   if (data) {
  //     Object.keys(data).forEach(key => {
  //       formData.append(`${key}`, `${data[key]}`);
  //     });
  //   }

  //   if (this.unofficial || !cache) { // 開發環境幫忙加上時間戳記 (cache disable)
  //     formData.append('_t', `${ Date.now() }`);
  //   }
  //   return formData;
  // }

  get unofficial(): boolean { // 如果測試站台需要可以加上判斷: /test\.omnistorpoc\.com/.test(location.host)
    return environment.production === false;
  }

  get<T = any>(url: string, data?: any, options: IHttpServiceOptions = {}): Observable<IResponseBody<T>> {
    options = extend({}, HttpService.defaultOptions, options);
    let params = this.getHttpParams(data, options.cache);
    return this.httpClient.get<IResponseBody<T>>(url, { headers: options.headers, params }).pipe(
        switchMap(response => {
          if (options.ignoreCheck) {
            return of(response);
          }
          return this.handleSuccess<T>(url, response);
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          if (!options.ignoreErrorCheck) {
            this.handleError(errorResponse);
          }
          return throwError(errorResponse);
        })
      );
  }

  post<T = any>(url: string, data?: any, options: IHttpServiceOptions = {}): Observable<IResponseBody<T>> {
    options = extend({}, HttpService.defaultOptions, options);
    // const formData = this.getFormData(data, options.cache);
    return this.httpClient
      .post<IResponseBody<T>>(url, data, { headers: options.headers })
      .pipe(
        switchMap((response: IResponseBody<T>) => {
          if (options?.ignoreCheck) {
            return of(response);
          }
          return this.handleSuccess<T>(url, response);
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          if (!options.ignoreErrorCheck) {
            this.handleError(errorResponse);
          }
          return throwError(errorResponse);
        })
      );
  }
}
