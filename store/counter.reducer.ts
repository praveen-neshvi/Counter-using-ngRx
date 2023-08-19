import { createReducer, on } from "@ngrx/store";
import { decrement, increment, init, set } from "./counter.actions";

const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state, action) => state + action.valueToBeAdded),
  on(decrement, (state, action) => state - action.valueToBeDeducted),
  on(set, (state, action) => action.value)       //This action will carry some data which must be set to the state
);


//The 'state' in the argument defines the current state (or value) in the store and the part
//that comes after => is the return part which then defines what value must be the new state (or value) in store

