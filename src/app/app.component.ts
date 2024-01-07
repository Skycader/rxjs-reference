import { Component } from '@angular/core';
import {
  Observable,
  Subject,
  Subscription,
  concatMap,
  delay,
  exhaustMap,
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
  public ngOnInit(): void {
    this.apiService.requestingPersonId$.subscribe((id: any) => {
      console.log('got id', id);
      this.activeBtns[id] = true;
      setTimeout(() => {
        this.activeBtns[id] = false;
      }, id * 1000);
    });
  }

  public ngAfterViewInit() {
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]'),
    );
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
  public switchStream$: Subscription | null = null;
  public switchMapExample(): void {
    if (this.switchStream$) {
      this.switchStream$.unsubscribe();
      this.switchStream$ = null;
      return;
    }
    this.switchStream$ = this.stream$
      .pipe(
        switchMap((id) => this.apiService.getPersonById(id)),
        tap((result: any) => this.data.push(result)),
      )
      .subscribe();
  }

  public activeBtns: boolean[] = [];
  public disabledBtns: boolean[] = [];
  public emitValue(value: number) {
    this.disabledBtns[value] = true;
    this.stream$.next(value);
    setTimeout(() => {
      this.disabledBtns[value] = false;
    }, value * 1000);
  }

  public concatStream$: Subscription | null = null;
  public concatMapExample(): void {
    if (this.concatStream$) {
      this.concatStream$.unsubscribe();
      this.concatStream$ = null;
      return;
    }

    this.concatStream$ = this.stream$
      .pipe(
        concatMap((id) => this.apiService.getPersonById(id)),
        tap((result: any) => this.data.push(result)),
      )
      .subscribe();
  }

  public mergeStream$: Subscription | null = null;
  public mergeMapExample(): void {
    if (this.mergeStream$) {
      this.mergeStream$.unsubscribe();
      this.mergeStream$ = null;
      return;
    }

    this.mergeStream$ = this.stream$
      .pipe(
        mergeMap((id) => this.apiService.getPersonById(id)),
        tap((result: any) => this.data.push(result)),
      )
      .subscribe();
  }

  public exhaustStream$: Subscription | null = null;
  public exhaustMapExample(): void {
    if (this.exhaustStream$) {
      this.exhaustStream$.unsubscribe();
      this.exhaustStream$ = null;
      return;
    }

    this.exhaustStream$ = this.stream$
      .pipe(
        exhaustMap((id) => this.apiService.getPersonById(id)),
        tap((result: any) => this.data.push(result)),
      )
      .subscribe();
  }
}
