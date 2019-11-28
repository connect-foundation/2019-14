import { useState } from "react";

const useReducerAsync = (reducer, initState = {}) => {
  const [state, setState] = useState(() => {
    return initState;
  });

  const dispatch = async (action) => {
    const promise = reducer(state, action);
    if (typeof promise.then === "function") {
      try {
        const nextState = await promise;
        setState(nextState);
      } catch (error) {
        // TODO: attach debug
        console.log("Async reducer error!", error);
        setState((prevState) => ({ ...prevState, error }));
      }
    } else {
      setState(promise);
    }
  };

  return [state, dispatch];
};

export default useReducerAsync;
