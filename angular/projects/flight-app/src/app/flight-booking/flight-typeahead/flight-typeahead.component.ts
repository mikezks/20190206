import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Flight } from '@flight-workspace/flight-api';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { debounceTime, tap, switchMap, filter } from 'rxjs/operators';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit {
  control = new FormControl();
  flights$: Observable<Flight[]>;
  loading: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.control.valueChanges
      .pipe(
        debounceTime(300),
        filter((value: string) => value.length > 2),
        tap(() => this.loading = true),
        switchMap(value => this.load(value)),
        tap(() => this.loading = false)
      )
      .subscribe(
        value => console.log(value)
      );
  }

  load(from: string): Observable<Flight[]>  {
    let url = "http://www.angular.at/api/flight";

    let params = new HttpParams()
                        .set('from', from);

    let headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
  }

}
