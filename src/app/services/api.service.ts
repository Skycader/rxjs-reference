import { Injectable } from '@angular/core';
import { delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public responses = [
    {
      id: 0,
      name: 'Alex',
      friends: ['Charlie'],
      age: 29,
    },
    {
      id: 1,
      name: 'Betty',
      friends: ['Daniel'],
      age: 12,
    },
    {
      id: 2,
      name: 'Charlie',
      friends: ['Elon'],
      age: 11,
    },
    {
      id: 3,
      name: 'Daniel',
      friends: ['Alex'],
      age: 22,
    },
    {
      id: 4,
      name: 'Elon',
      friends: ['Betty'],
      age: 44,
    },
  ];

  public startTime = 0;
  constructor() { }

  public getPersonById(id: number) {
    this.startTime = Date.now();
    return of(this.responses[id]).pipe(
      tap(() => console.log('[Service] requesting id:', id)),
      delay(id * 1000),
      tap(() =>
        console.log(
          '[Service] responsing with object by',
          id,
          'complete within',
          Date.now() - this.startTime,
        ),
      ),
    );
  }
}
