import { Injectable } from '@angular/core';
import { db, basketTableName } from './db';
import { Store, select } from '@ngrx/store';
import { RootState } from '../+state';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalBasketService {

  constructor(
    private store: Store<RootState>
  ) { }

  save(basket: object): Promise<any> {
    return this.store
      .pipe(
        select(s => s),
        first()
      )
      .toPromise()
      .then(state => {
        const entry = {
          date: new Date(),
          basket,
          state
        };

        return db.table(basketTableName).put(entry);
      });
  }

  load(): Promise<object> {
    return db.table(basketTableName).orderBy('id').last()
      .then(entry => entry.basket);
  }
}
