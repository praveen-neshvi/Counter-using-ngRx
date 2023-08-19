import { Actions, createEffect, ofType } from "@ngrx/effects";
import { decrement, increment, init, set } from "./counter.actions";

import { tap, withLatestFrom, switchMap, of } from "rxjs"
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { countSelector } from "./counter.selector";

@Injectable()
export class CounterEffects {

  constructor (private actions$ : Actions, private store : Store<{ counter: number}>) {}


  loadEffect = createEffect(()=> this.actions$.pipe(
    ofType(init),                                                    //This side effect gets triggred only for init action
    switchMap( () => {
      const storedCounter = localStorage.getItem('count');
      if (storedCounter){
        return of(set({value: +storedCounter}))         //of operator is used to create the return statement into an observable because switchMap mandatorily needs an observable as return item
      }
      return of(set({value: 0}))
    })
  ))



  saveCount = createEffect(() => this.actions$.pipe(
    ofType(increment, decrement),                                   //This side effect gets triggred only for increment or decrement actions
    withLatestFrom(this.store.select(countSelector)),
    tap(([action, counter]) => {
      console.log(action)
      if(action.type == '[Counter] Increment'){
        localStorage.setItem('count', counter.toString())
      } else if (action.type == '[Counter] Decrement'){
        localStorage.setItem('count', counter.toString())
      }
    })
  ),{dispatch : false}
  )

}

//Effects are needed to handle such side effects because we can not use these side effects
//such as HTTP requests in reducers as reducers need to be synchronous and their main core
//job is to handle the state of store. Ergo use Effects insteads

/*
The actions$ is an observable that is injected from @ngrx/effects like this:
  import { Actions } from ' @ngrx/effects '
  constructor ( private actions$ : Actions ) { }

This actions$ will always return a new value when any action is dispatched anywhere in the application.
And we want a particular effect to happen when a particular action is dispatched and hence we can filter
the required action using 'ofType' parameter inside actions$ object



We do filter out the needed action using 'ofType' and decide what side effect should happen .
The side effect to occur when some action is dispatched can also dispatch some other action and can also do
something without dispatching another action.


"withLatestFrom" operator is used to combine latest values coming from two different streams which emit different data.
In this case the two different streams are:
First, action$ : This stream emits actions dispatched within your application.
Second, this.store.select : This is a stream that emits the current state of your application's store.


when we use withLatestFrom, there will be two streams that are emitting data so the tap operator will
receive an array of emitted values, which can be de-structured as
tap ( ( [action (from action$), counter (from this.store.select)] ) => ...... )

*/
