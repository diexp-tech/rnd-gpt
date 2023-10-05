export interface IError {
  message: string;
  error?: string;
}

export enum EApiStatuses {
  SUCCESS = 'success',
  FAILED = 'failed',
  WARNING = 'warning',
}
