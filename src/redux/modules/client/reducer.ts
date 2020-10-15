import { Reducer } from 'redux';
import produce from 'immer';
import AsyncStorage from '@react-native-community/async-storage';
import { ActionTypes, IClientState } from './types';
import { IClient } from '../../../interfaces';

const INITIAL_STATE: IClientState = {
  client: {} as IClient,
};

const auth: Reducer<IClientState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.clientRequest: {
        const { client } = action.payload;

        draft.client = client;

        AsyncStorage.setItem('Plamvi:Client', JSON.stringify(client));

        break;
      }

      case ActionTypes.clientReset: {
        draft.client = {} as IClient;

        AsyncStorage.removeItem('Plamvi:Client');

        break;
      }

      default: {
        return draft;
      }
    }
  });
};

export default auth;
