export const countSelector = (state : {counter : number}) => state.counter;

// (state : {counter : number}) is the shape of the store.
//Selectors are being used when we dont want to select the data using key and also when we dont want to change the actual data and yet transform it before sending it out

export const doubleCounter = (state : {counter : number}) => state.counter * 2;
