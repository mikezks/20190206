import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../+state';
import { Observable } from 'rxjs';
import { AppSetNameAction, AppSaveStateLocal, AppLoadStateLocal } from '../+state/actions/app.actions';
import { getAppName } from '../+state/selectors/app.selectors';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  name$: Observable<string>;

  constructor(
    private store: Store<fromRoot.RootState>,
    private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.name$ = this.store.pipe(select(getAppName));
    this.store.dispatch(new AppLoadStateLocal());
  }

  setName(): void {
    this.store.dispatch(new AppSetNameAction('Ionic App Name form @ngrx/store'));
    //this.localStorage.saveData('test', { data: 'ionic storage demo data' });
    //this.localStorage.loadData('test').then(data => console.log(data));
    //this.store.dispatch(new AppSaveStateLocal());
  }
}
