
import { AppActions, AppActionTypes } from '../actions/app.actions';

export interface State {
  name: string;
}

export const initialState: State = {
  name: ''
};

export function reducer(state = initialState, action: AppActions): State {
  switch (action.type) {

    case AppActionTypes.AppSetName:
      return { ...state, name: action.name };

    case AppActionTypes.AppLoadedStateLocal:
      return action.state || state;

    default:
      return state;
  }
}
