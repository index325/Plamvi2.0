import { IClient } from '../../../interfaces';

export enum ActionTypes {
  clientRequest = 'CLIENT_REQUEST',
  clientSuccess = 'CLIENT_SUCCESS',
  clientReset = 'CLIENT_RESET',
  loadClient = 'LOAD_CLIENT',
}

export interface IClientState {
  client: IClient;
}
