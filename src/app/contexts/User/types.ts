export interface State {
  accessToken: string;
  uid: string;
  client: string;
}

export enum ActionTypes {
  SET_SESSION = 'SET_SESSION',
  CLOSE_SESSION = 'CLOSE_SESSION'
}

export interface SetSession {
  type: ActionTypes.SET_SESSION;
  payload: {
    accessToken: string;
    uid: string;
    client: string;
  };
}

export interface CloseSession {
  type: ActionTypes.CLOSE_SESSION;
}

export type Action = SetSession | CloseSession;
