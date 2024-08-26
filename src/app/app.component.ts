import { Component } from '@angular/core';
import {
  Subject,
  Subscription,
  concatMap,
  delay,
  exhaustMap,
  filter,
  forkJoin,
  map,
  mergeMap,
  switchMap,
  take,
  tap,
  zip,
} from 'rxjs';
import { ApiService } from './services/api.service';

interface Person {
  id: number;
  name: string;
  friends: string[];
  age: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'rxjs-reference';
  public data: Person[] = [];
  public stream$ = new Subject<number>();

  public betty$ = new Subject<string>();
  public charlie$ = new Subject<string>();
  public daniel$ = new Subject<string>();
  public elon$ = new Subject<string>();

  public betty$$ = this.betty$.pipe(
    tap(() => this.apiService.getPersonById(1)),
    delay(1000)
  );

  constructor(private apiService: ApiService) {}
  public ngOnInit(): void {
    this.apiService.requestingPersonId$.subscribe((id: any) => {
      console.log('got id', id);
      this.activeBtns[id] = true;
      this.disabledBtns[id] = true;
      setTimeout(() => {
        this.activeBtns[id] = false;
        this.disabledBtns[id] = false;
      }, id * 1000);
    });
  }

  public pushData(value: any) {
    this.data.push(value);
  }

  public ngAfterViewInit() {
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
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
        tap((result: any) => this.pushData(result))
      )
      .subscribe();
  }

  public activeBtns: boolean[] = [];
  public disabledBtns: boolean[] = [];
  public emitValue(value: number) {
    this.sendSignal(value);
    this.stream$.next(value);
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
        tap((result: any) => this.pushData(result))
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
        tap((result: any) => this.pushData(result))
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
        tap((result: any) => this.pushData(result))
      )
      .subscribe();
  }

  public forkJoinStream$: Subscription | null = null;
  public forkJoinExample(): void {
    if (this.forkJoinStream$) {
      this.forkJoinStream$.unsubscribe();
      this.forkJoinStream$ = null;
      return;
    }

    this.forkJoinStream$ = forkJoin([
      this.stream$.pipe(
        filter((value: number) => value === 1),
        switchMap((value: number) => this.apiService.getPersonById(value)),
        take(1)
      ),
      this.stream$.pipe(
        filter((value: number) => value === 2),
        switchMap((value: number) => this.apiService.getPersonById(value)),
        take(1)
      ),
      this.stream$.pipe(
        filter((value: number) => value === 3),
        switchMap((value: number) => this.apiService.getPersonById(value)),
        take(1)
      ),
      this.stream$.pipe(
        filter((value: number) => value === 4),
        switchMap((value: number) => this.apiService.getPersonById(value)),
        take(1)
      ),
    ])
      .pipe(
        tap((data: any) => {
          console.log(data);
        }),
        map((result: any) => Object.values(result)),
        tap((result: any) => this.data.push(...result))
      )
      .subscribe();
  }

  public zipStream$: Subscription | null = null;
  public zipExample(): void {
    if (this.zipStream$) {
      this.zipStream$.unsubscribe();
      this.zipStream$ = null;
      return;
    }

    this.zipStream$ = zip([
      this.stream$.pipe(
        filter((value: number) => value === 1),
        switchMap((value: number) => this.apiService.getPersonById(value))
      ),
      this.stream$.pipe(
        filter((value: number) => value === 2),
        switchMap((value: number) => this.apiService.getPersonById(value))
      ),
      this.stream$.pipe(
        filter((value: number) => value === 3),
        switchMap((value: number) => this.apiService.getPersonById(value))
      ),
      this.stream$.pipe(
        filter((value: number) => value === 4),
        switchMap((value: number) => this.apiService.getPersonById(value))
      ),
    ])
      .pipe(tap((result: any) => this.data.push(...result)))
      .subscribe();
  }

  public signalSendingBtns: boolean[] = [];

  /**
   * Исключительно визуал
   * @param btnId
   */
  public sendSignal(btnId: number) {
    this.signalSendingBtns[btnId] = true;
    setTimeout(() => {
      this.signalSendingBtns[btnId] = false;
    }, 500);
  }

  public clearTable() {
    this.data = [];
  }
}
