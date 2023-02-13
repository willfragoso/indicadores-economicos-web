import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {merge} from 'rxjs';
import {delay, tap} from 'rxjs/operators';
import {IndiceIncidenciaProbrezaDatasource} from './_datasource/indice-incidencia-probreza.datasource';
import {IndiceIncidenciaPobrezaFilterDto} from './_dto/filter/indice-incidencia-pobreza-filter.dto';
import {IndiceIncidenciaProbrezaService} from './_service/api/indice-incidencia-probreza.service';
import {NotificationService} from './_service/common/notification.service';
import {LoadingService} from './_service/util/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('pesquisaIndicadorForm', {static: true})
  public pesquisaIndicadorForm: NgForm;

  public indiceIncidenciaPobrezaFilterDto: IndiceIncidenciaPobrezaFilterDto = new IndiceIncidenciaPobrezaFilterDto();

  public indiceIncidenciaProbrezaDatasource: IndiceIncidenciaProbrezaDatasource = new IndiceIncidenciaProbrezaDatasource(
    this.indiceIncidenciaProbrezaService,
    this.notificationService
  );

  public displayedColumns: string[] = [
    'colIdIndicador',
    'colNomeIndicador',
    'colIdPais',
    'colNomePais',
    'colAno',
    'colValor'
  ];

  @ViewChild(MatPaginator)
  public matPaginator: MatPaginator;

  public pageSize = 10;

  public loading: boolean = false;

  public constructor(private indiceIncidenciaProbrezaService: IndiceIncidenciaProbrezaService,
                     private notificationService: NotificationService,
                     private loadingService: LoadingService) {

  }

  public ngOnInit(): void {
    this.listenToLoading();
  }

  public ngAfterViewInit(): void {
    merge(this.matPaginator.page)
      .pipe(
        tap(() => this.pesquisar(false))
      )
      .subscribe();
  }

  public pesquisar(novaPesquisa: boolean): void {
    if (this.pesquisaIndicadorForm.valid) {
      if (novaPesquisa) {
        // Reset da paginação quando for feita uma nova pesquisa
        this.matPaginator.pageIndex = 0;
      }
      this.indiceIncidenciaProbrezaDatasource.load(
        this.indiceIncidenciaPobrezaFilterDto,
        this.matPaginator.pageIndex ? this.matPaginator.pageIndex + 1 : 1,
        this.matPaginator.pageSize ? this.matPaginator.pageSize : 50
      );
    } else {
      this.notificationService.showError('É necessário preencher os campos obrigatórios.', 'OK');
    }
  }

  public limparPesquisa(): void {
    this.indiceIncidenciaPobrezaFilterDto = new IndiceIncidenciaPobrezaFilterDto();
    this.indiceIncidenciaProbrezaDatasource = new IndiceIncidenciaProbrezaDatasource(
      this.indiceIncidenciaProbrezaService,
      this.notificationService
    );
  }

  private listenToLoading(): void {
    this.loadingService.isLoading.pipe(delay(0)).subscribe(
      isLoading => {
        this.loading = isLoading;
      }
    );
  }

}
