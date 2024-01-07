import { Component } from '@angular/core';
import {
  Observable,
  Subject,
  concatMap,
  delay,
  from,
  fromEvent,
  interval,
  map,
  mergeMap,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'rxjs-reference';
  public data: any[] = [];
  public stream$ = new Subject<number>();
  constructor(private apiService: ApiService) { }
  public ngOnInit(): void { }

  public switchMapExample(): void {
    this.stream$
      .pipe(
        switchMap((id) => this.apiService.getPersonById(id)),
        tap((result: any) => this.data.push(result)),
      )
      .subscribe();
  }

  public emitValue(value: number) {
    this.stream$.next(value);
  }

  public concatMapExample(): void {
    this.stream$
      .pipe(
        concatMap((id) => this.apiService.getPersonById(id)),
        tap((result: any) => this.data.push(result)),
      )
      .subscribe();
  }

  public mergeMapExample(): void {
    this.stream$
      .pipe(
        mergeMap((id) => this.apiService.getPersonById(id)),
        tap((result: any) => this.data.push(result)),
      )
      .subscribe();
  }
}
