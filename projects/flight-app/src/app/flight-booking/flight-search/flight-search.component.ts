import {Component, OnInit, OnDestroy} from '@angular/core';
import { Flight } from '@flight-workspace/flight-api';
import { timer, Subscription, Subject, Observable } from 'rxjs';
import { take, takeUntil, tap, first } from 'rxjs/operators';
import { FeatureState } from '../+state/reducers/flight-booking.reducer';
import { Store, select } from '@ngrx/store';
import { FlightUpdateAction, FlightsLoadAction } from '../+state/actions/flight-booking.actions';
import { getFlights } from '../+state/selectors/flight-booking.selectors';
import { LocalBasketService } from '../local-basket.service';

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
  flights$: Observable<Flight[]>;

  /* get flights() {
    return this.flightService.flights;
  } */

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true,
    "7": false
  };

  constructor(
    private store: Store<FeatureState>,
    private localBasketService: LocalBasketService) {
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

      this.flights$ = this.store.pipe(
        select(getFlights)
      );
  }

  search(): void {
    if (!this.from || !this.to) return;

    /* this.flightService
      .load(this.from, this.to, this.urgent); */

    /* this.flightService
      .find(this.from, this.to)
      .subscribe(
        flights => this.store.dispatch(
          new FlightsLoadedAction(flights)
        )
      ); */

      this.store.dispatch(new FlightsLoadAction(this.from, this.to));
  }

  delay(): void {
    // this.flightService.delay();
    this.flights$
      .pipe(first())
      .subscribe(flights => {
        const flight = flights[0];

        const oldDate = new Date(flight.date);
        const newDate = new Date(oldDate.getTime() + 15 * 60 * 1000);
        const newFlight = {
          ...flight,
          date: newDate.toISOString(),
          delayed: true
        };
    
        this.store.dispatch(new FlightUpdateAction(newFlight));
      });
  }

  saveBasket(): void {
    this.localBasketService.save(this.basket).then(
      () => console.log('saved basket'),
      err => console.error('error on basket save', err)
    );
  }

  loadBasket(): void {
    this.localBasketService.load().then(
      basket => this.basket = basket,
      err => console.error('error on loading basket', err)
    );
  }

  ngOnDestroy(): void {
    //this.subscriptionTimer.unsubscribe();
    this.destroy$.next(true);
  }
}
