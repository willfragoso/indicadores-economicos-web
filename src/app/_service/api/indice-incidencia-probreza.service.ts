import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {IndiceIncidenciaPobrezaFilterDto} from '../../_dto/filter/indice-incidencia-pobreza-filter.dto';
import {PesquisaPageDto} from '../../_dto/page/pesquisa-page.dto';
import {AppService} from '../../app.service';

@Injectable({
  providedIn: 'root'
})
export class IndiceIncidenciaProbrezaService extends AppService {

  private resource = 'indice-incidencia-pobreza';

  constructor(private httpClient: HttpClient) {
    super();
  }

  getPesquisarIndiceIncidenciaProbreza(
    indiceIncidenciaPobrezaFilterDto: IndiceIncidenciaPobrezaFilterDto,
    page: number,
    size: number
  ): Observable<PesquisaPageDto> {
    let params = new HttpParams();

    if (indiceIncidenciaPobrezaFilterDto.codigoPais) {
      params = params.append('codigoPais', indiceIncidenciaPobrezaFilterDto.codigoPais);
    }

    params = super.aplicarPaginacao(params, size, page);

    return this.httpClient.get<PesquisaPageDto>(
      this.baseApi + this.resource + '/pais',
      {
        headers: super.getHeaders(),
        params
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

}
