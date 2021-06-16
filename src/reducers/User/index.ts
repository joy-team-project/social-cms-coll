/* eslint-disable import/no-anonymous-default-export */
import * as Immutable from "immutable";

const initState = Immutable.fromJS({
  userInfo: {},
});

export default (state: any = initState, action: any): any => {
  return state;
};
