import { IClient } from '../../../interfaces';
import { ActionTypes } from './types';

export function clientRequest(client: IClient) {
  return {
    type: ActionTypes.clientRequest,
    payload: {
      client,
    },
  };
}

export function clientSuccess(client: IClient) {
  return {
    type: ActionTypes.clientSuccess,
    payload: {
      client,
    },
  };
}

export function clientReset() {
  return {
    type: ActionTypes.clientReset,
  };
}

export function clientLoad() {
  return {
    type: ActionTypes.loadClient,
  };
}
