import {
  getUnexpectedInvocationParameterMessage,
  validateNextState,
} from "./util.immutable";

import tracker from "./Tracker";
import User from "./User";

const MainListReducers = {
  User,
};

const rootReducerImmutable = (reducers: any, getDefaultState?: any): any => {
  const reducerKeys = Object.keys(reducers);
  return (inputState = getDefaultState(), action: any) => {
    if (process.env.NODE_ENV !== "production") {
      const warningMessage = getUnexpectedInvocationParameterMessage(
        inputState,
        reducers,
        action
      );
      if (warningMessage) {
        console.error(warningMessage);
      }
    }
    const state = inputState.withMutations((temporaryState: any) => {
      reducerKeys.forEach((reducerName) => {
        const reducer = reducers[reducerName];
        const currentDomainState = temporaryState.get(reducerName);
        const nextDomainState = reducer(currentDomainState, action);
        validateNextState(nextDomainState, reducerName, action);
        temporaryState.set(reducerName, nextDomainState);
      });
    });
    tracker(state, action);
    return state;
  };
};

const root = rootReducerImmutable(MainListReducers);

export default root;
