import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "../reducers/app.reducer";

export const getAppState = createFeatureSelector<State>('app');

export const getAppName = createSelector(
    getAppState,
    (state) => state.name
);