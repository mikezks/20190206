import {Component, OnInit, OnDestroy} from '@angular/core';
import {FlightService} from '@flight-workspace/flight-api';
import { timer, Subscription, Subject, Observable } from 'rxjs';
import { take, takeLast, takeUntil, tap, share } from 'rxjs/operators';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit, OnDestroy {

  from: string = 'Hamburg'; // in Germany
  to: string = 'Graz'; // in Austria
  urgent: boolean = false;
  subscriptionTimer: Subscription;
  destroy$ = new Subject<boolean>();
  timer$: Observable<number>;

  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  constructor(
    private flightService: FlightService) {
  }

  ngOnInit() {
    //this.subscriptionTimer 
    this.timer$ = timer(0, 1000)
      .pipe(
        takeUntil(this.destroy$),
        take(5),
        tap(value => console.log(value)),
        //share()
      );
        /* .subscribe(timer =>
            console.log(timer)
        ); */
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.flightService
      .load(this.from, this.to, this.urgent);
  }

  delay(): void {
    this.flightService.delay();
  }

  ngOnDestroy(): void {
    //this.subscriptionTimer.unsubscribe();
    this.destroy$.next(true);
  }
}
