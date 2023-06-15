import { AppliedFiltersType } from "./types";

export enum Actions {
  SetTemporarilyAppliedFiltersAction = "SetTemporarilyAppliedFiltersAction",
  DECREASE = "DECREASE",
}

export type SetTemporarilyAppliedFiltersAction = {
  type: Actions.SetTemporarilyAppliedFiltersAction;
  payload: Partial<AppliedFiltersType<any>>;
};

type Action = SetTemporarilyAppliedFiltersAction;

// An interface for our state
export interface State {
  temporarilyAppliedFilters: Partial<AppliedFiltersType<any>>;
}

export function filterLayoutReducer(state: State, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case Actions.SetTemporarilyAppliedFiltersAction:
      return {
        ...state,
        temporarilyAppliedFilters: payload,
      };
    default:
      return state;
  }
}
