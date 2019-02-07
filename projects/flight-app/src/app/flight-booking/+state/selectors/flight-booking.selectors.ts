import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "../reducers/flight-booking.reducer";

export const getFlightBooking = createFeatureSelector<State>(
    'flightBooking'
);

export const getFlights = createSelector(
    // Selectors
    getFlightBooking,
    // Projector
    (state) => state.flights
);