import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  loadingResources: string[] = [];

  constructor() {
  }

  addResource(value: string) {
    this.loadingResources.push(value);
    this.isLoading.next(true);
  }

  removeResource(value: string): void {
    const index = this.loadingResources.indexOf(value);
    if (index !== -1) {
      this.loadingResources.splice(index, 1);

      if (this.loadingResources.length === 0) {
        this.clearResources();
      }
    }
  }

  clearResources(): void {
    this.loadingResources = [];
    this.isLoading.next(false);
  }

}
