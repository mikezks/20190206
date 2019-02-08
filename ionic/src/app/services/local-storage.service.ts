import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as fromRoot from '../+state';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private storage: Storage) { }

  saveData(key: string, value: object): void {
    this.storage.set(key, value);
  }

  loadData(key): Promise<fromRoot.State> {
    return this.storage.get(key);
  }
}
