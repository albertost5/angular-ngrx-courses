import {createReducer, on} from '@ngrx/store';
import {User} from "../model/user.model";
import {AuthActions} from "../action-type";

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User;
}

export const initialAuthState = {
  user: undefined,
}

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user
    }
  }),
  on(AuthActions.logout, (state, action) => {
    return initialAuthState
  })
);
