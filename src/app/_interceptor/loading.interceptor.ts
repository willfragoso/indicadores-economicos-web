import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LoadingService} from '../_service/util/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

	constructor(private loadingService: LoadingService) {
	}

	intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
		this.loadingService.addResource(httpRequest.url);
		return httpHandler.handle(httpRequest).pipe(
			tap(
				{
					next: event => {
						if (event.type === HttpEventType.Response) {
							this.loadingService.removeResource(httpRequest.url);
						}
					},
					error: () => {
						this.loadingService.removeResource(httpRequest.url);
					}
				}
			)
		);
	}

}
