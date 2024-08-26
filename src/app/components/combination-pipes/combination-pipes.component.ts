import { Component } from '@angular/core';
import { Subject, combineLatest, forkJoin, takeUntil, tap, zip } from 'rxjs';

interface ShapeInterface {
  shape: string;
  color: string;
}

@Component({
  selector: 'app-combination-pipes',
  templateUrl: './combination-pipes.component.html',
  styleUrl: './combination-pipes.component.scss',
})
export class CombinationPipesComponent {
  public results: ShapeInterface[] = [];

  public color$ = new Subject<string>();
  public shape$ = new Subject<string>();

  public colorCompleted$ = new Subject();
  public shapeCompleted$ = new Subject();

  public colorCompleted = false;
  public shapeCompleted = false;

  clearTable() {
    this.results = [];
  }

  public setOperator(id: number) {
    this.colorCompleted = false;
    this.shapeCompleted = false;
    this.currentOperator = id;
    this.render$ = this.currentStream$;
  }
  public currentOperator = 0;
  public operators = [zip, forkJoin, combineLatest];

  public render$ = this.currentStream$;

  public get currentStream$() {
    return this.operators[this.currentOperator]([
      this.color$.pipe(takeUntil(this.colorCompleted$)),
      this.shape$.pipe(takeUntil(this.shapeCompleted$)),
    ]).pipe(
      tap((result) => this.results.push({ color: result[0], shape: result[1] }))
    );
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
}
