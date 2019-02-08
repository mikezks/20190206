import { Action } from '@ngrx/store';
import { State } from '../reducers/app.reducer';

export enum AppActionTypes {
  AppSetName = '[App] Set Name',
  AppSaveStateLocal = '[App] Save state local',
  AppLoadStateLocal = '[App] Load state local',
  AppLoadedStateLocal = '[App] Loaded state local'
}

export class AppSetNameAction implements Action {
  readonly type = AppActionTypes.AppSetName;
  constructor(readonly name: string) {}
}

export class AppSaveStateLocal implements Action {
  readonly type = AppActionTypes.AppSaveStateLocal;
}

export class AppLoadStateLocal implements Action {
  readonly type = AppActionTypes.AppLoadStateLocal;
}

export class AppLoadedStateLocal implements Action {
  readonly type = AppActionTypes.AppLoadedStateLocal;
  constructor(readonly state: State) {}
}

export type AppActions =
  AppSetNameAction |
  AppSaveStateLocal |
  AppLoadStateLocal |
  AppLoadedStateLocal;
