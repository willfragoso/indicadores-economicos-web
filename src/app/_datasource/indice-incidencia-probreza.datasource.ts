import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import {IndiceIncidenciaPobrezaFilterDto} from '../_dto/filter/indice-incidencia-pobreza-filter.dto';
import {IndiceIncidenciaPobrezaGridDto} from '../_dto/grid/indice-incidencia-pobreza-grid.dto';
import {IndiceIncidenciaProbrezaService} from '../_service/api/indice-incidencia-probreza.service';
import {NotificationService} from '../_service/common/notification.service';

export class IndiceIncidenciaProbrezaDatasource implements DataSource<IndiceIncidenciaPobrezaGridDto> {

  public arrayLength = 0;

  private behaviorSubject = new BehaviorSubject<IndiceIncidenciaPobrezaGridDto[]>([]);

  constructor(private indiceIncidenciaProbrezaService: IndiceIncidenciaProbrezaService,
              private notificationService: NotificationService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<IndiceIncidenciaPobrezaGridDto[]> {
    return this.behaviorSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.behaviorSubject.complete();
  }

  load(
    indiceIncidenciaPobrezaFilterDto: IndiceIncidenciaPobrezaFilterDto,
    page: number,
    size: number
  ) {
    this.indiceIncidenciaProbrezaService
      .getPesquisarIndiceIncidenciaProbreza(
        indiceIncidenciaPobrezaFilterDto,
        page,
        size
      )
      .subscribe(
        {
          next: pesquisaPaginadaModel => {
            this.arrayLength = pesquisaPaginadaModel.totalElementos;
            this.behaviorSubject.next(pesquisaPaginadaModel.elementos);
          },
          error: (message) => {
            this.arrayLength = 0;
            this.behaviorSubject.next([]);
            this.notificationService.showError(message, 'OK')
          }
        }
      );
  }

}
