import { contextFactory } from '~config/context';

import { State, Action, SetSession, CloseSession, ActionTypes } from './types';

export const INITIAL_STATE = {
  accessToken: '',
  uid: '',
  client: ''
};

export const actionCreators = {
  setSession: (accessToken: string, uid: string, client: string): SetSession => ({
    type: ActionTypes.SET_SESSION,
    payload: { accessToken, uid, client }
  }),
  closeSession: (): CloseSession => ({ type: ActionTypes.CLOSE_SESSION })
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_SESSION: {
      return {
        ...state,
        accessToken: action.payload.accessToken,
        uid: action.payload.uid,
        client: action.payload.client
      };
    }
    case ActionTypes.CLOSE_SESSION: {
      return { ...state, accessToken: '', uid: '', client: '' };
    }
    default: {
      return state;
    }
  }
};

export const { useSelector, Context, useDispatch } = contextFactory<State, Action>(INITIAL_STATE);
