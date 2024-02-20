import { ActionReducer, INIT, UPDATE } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

export const hydrationMetaReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return (state, action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem("token");
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem("token");
        }
      }
    }
    const nextState = reducer(state, action);
    localStorage.setItem("token", JSON.stringify(nextState));
    return nextState;
  };
};
