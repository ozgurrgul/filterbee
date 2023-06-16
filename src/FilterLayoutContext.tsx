import { createContext, useReducer } from "react";
import {
  Actions,
  SetTemporarilyAppliedFiltersAction,
  State,
  filterLayoutReducer,
} from "./FilterLayoutReducer";

type FilterLayoutContextType = {
  temporarilyAppliedFilters: State["temporarilyAppliedFilters"];
  setTemporarilyAppliedFilters: (
    payload: SetTemporarilyAppliedFiltersAction["payload"]
  ) => void;
};

export const FilterLayoutContext = createContext<FilterLayoutContextType>({
  temporarilyAppliedFilters: {},
  setTemporarilyAppliedFilters: () => {},
});

type FilterLayoutContextProviderProps = {
  children: any;
  appliedFilters?: State["temporarilyAppliedFilters"];
};

export const FilterLayoutContextProvider: React.FC<
  FilterLayoutContextProviderProps
> = ({ children, appliedFilters }) => {
  const [state, dispatch] = useReducer(filterLayoutReducer, {
    temporarilyAppliedFilters: appliedFilters || {},
  });

  const value: FilterLayoutContextType = {
    temporarilyAppliedFilters: state.temporarilyAppliedFilters,
    setTemporarilyAppliedFilters: (
      payload: Parameters<
        FilterLayoutContextType["setTemporarilyAppliedFilters"]
      >[0]
    ) => {
      dispatch({ type: Actions.SetTemporarilyAppliedFiltersAction, payload });
    },
  };

  return (
    <FilterLayoutContext.Provider value={value}>
      {children}
    </FilterLayoutContext.Provider>
  );
};
