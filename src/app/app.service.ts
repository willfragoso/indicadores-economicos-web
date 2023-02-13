import {HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  get baseApi() {
    return environment.baseApiUrl;
  }

  protected getHeaders(): any {
    return new HttpHeaders(
      {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    );
  }

  protected handleError(httpErrorResponse: HttpErrorResponse): Observable<never> {
    if (!environment.production) {
      console.log('HttpErrorResponse: ', httpErrorResponse);
    }

    let errorMessage;
    if (httpErrorResponse.status == 0) {
      errorMessage = 'Erro de conexão. Não houve resposta do servidor backend.';
    } else {
      if (httpErrorResponse.error && httpErrorResponse.error['message']) {
        errorMessage = `${httpErrorResponse.error.message}`;
      } else {
        errorMessage = `${httpErrorResponse.message}`;
      }
    }
    return throwError(errorMessage);
  }

  protected aplicarPaginacao(params: HttpParams, size: number, page: number) {
    if (size && size >= 0) {
      params = params.append('tamanhoPagina', `${size}`);
    }
    if (page && page >= 0) {
      params = params.append('numeroPagina', `${page}`);
    }
    return params;
  }

}
