import { Dispatch, SetStateAction } from "react";

/**
 * Defines the overall state structure for your application.
 */
export interface IState {
  user: any;
  isLoading: boolean;
}


/**
 * A type representing a function to update the state.
 */
export type SetState = Dispatch<SetStateAction<IState>>
