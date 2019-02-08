import {Component} from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  pi = 'it is great!';

  constructor(
    private snackBar: MatSnackBar,
    private swUpdate: SwUpdate
  ) { 
    this.setupUpdate();
  }

  setupUpdate() {
    this.swUpdate.available
      .subscribe(u => {
        this.swUpdate.activateUpdate().then(e => {
          this.snackBar.open('App updated - please reload!', 'OK');
        });
      });
  }
}

