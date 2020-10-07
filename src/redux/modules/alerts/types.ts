export enum ActionTypes {
  alertRequest = 'ALERT_REQUEST',
  alertSuccess = 'ALERT_SUCCESS',
  alertFailure = 'ALERT_FAILURE',
  alertReset = 'ALERT_RESET',
}

export interface IAlertState {
  message: string;
  isDialog: boolean;
  messageType:
    | 'none'
    | 'default'
    | 'info'
    | 'success'
    | 'danger'
    | 'warning'
    | undefined;
}
