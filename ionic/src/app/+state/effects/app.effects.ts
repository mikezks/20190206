import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AppActionTypes, AppLoadedStateLocal, AppSaveStateLocal } from '../actions/app.actions';
import { RootState, State } from '..';
import { Store, select } from '@ngrx/store';
import { switchMap, map, first, tap } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { from, Observable } from 'rxjs';
import { getAppState } from '../selectors/app.selectors';

@Injectable()
export class AppEffects {
  @Effect()
  loadState$ = this.actions$
    .pipe(
      ofType(AppActionTypes.AppLoadStateLocal),
      switchMap(() => from(this.localStorageService.loadData('state'))),
      map((state: State) => new AppLoadedStateLocal(state))
    );

  @Effect({ dispatch: false })
  saveState$ = this.actions$
    .pipe(
      ofType(AppActionTypes.AppSaveStateLocal),
      switchMap(() =>
        this.store.pipe(
          select(getAppState),
          first()
        )
      ),
      tap(state =>
        this.localStorageService.saveData('state', state)
      )
    );

  @Effect()
  triggerStateSave$ = this.actions$
    .pipe(
      ofType(
        /**
         * Define action types here which should trigger a
         * save event to the storage of your ionic app
         */
        AppActionTypes.AppSetName
      ),
      map((state: State) => new AppSaveStateLocal())
    );

  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private localStorageService: LocalStorageService) {}

}
