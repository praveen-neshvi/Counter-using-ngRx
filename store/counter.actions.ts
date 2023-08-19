import { createAction, props } from "@ngrx/store";

export const init = createAction(                            //This action triggers the side effect
  '[Counter] Init'
)

export const set = createAction(                            //This action is dispatched by the side effect when the side effect is done
  '[Counter] Set',
  props<{value : number}>()
)

export const increment = createAction(
  '[Counter] Increment',
  props<{valueToBeAdded : number}>()
)

export const decrement = createAction(
  '[Counter] Decrement',
  props<{valueToBeDeducted : number}>()
)
