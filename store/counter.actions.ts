import { createAction, props } from "@ngrx/store";

export const increment = createAction(
  '[Counter] Increment',
  props<{valueToBeAdded : number}>()
)

export const decrement = createAction(
  '[Counter] Decrement',
  props<{valueToBeDeducted : number}>()
)
