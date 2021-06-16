import { REQUEST_SUBTYPE } from "./ActionTypes";
import RAction from "./RAction";
const { REQUEST, SUCCESS, ERROR } = REQUEST_SUBTYPE;

interface INolmarAction {
  Actions: RAction;
  actionName: string;
  data: any;
  onAfter?: (dispatch: any, getState: any, data: any) => any;
  onBefore?: (dispatch: any, getState: any, data: any) => any;
}

export const getAction = ({
  Actions,
  actionName,
  data = {},
  onAfter = (dispatch, getState, data) => {
    return data;
  },
  onBefore = (dispatch, getState, data) => {
    return data;
  },
}: INolmarAction) => {
  return async (dispatch: any, getState: any) => {
    onBefore && onBefore(dispatch, getState, data);
    dispatch(Actions?.getCallback(actionName)(data));
    onAfter && onAfter(dispatch, getState, data);
  };
};

interface IApiAction {
  Actions: RAction;
  visibleSpin?: boolean;
  actionName: string;
  delayTime?: number;
  promiseApi: () => Promise<any>;
  arg?: any;
  dispatchRedux?: boolean;
  dispatchRequest?: boolean;
  onBeforeRequest?: (dispatch: any, getState: any, arg?: any) => any;
  onAfterRequest?: (dispatch: any, getState: any, arg?: any) => any;
  dispatchSuccess?: boolean;
  onBeforeSuccess?: (dispatch: any, getState: any, data?: any) => any;
  onAfterSuccess?: (dispatch: any, getState: any, data?: any) => any;
  dispatchError?: boolean;
  onBeforeError?: (dispatch: any, getState: any, data?: any) => any;
  onAfterError?: (dispatch: any, getState: any, data?: any) => any;
}

export const getActionAPI = ({
  Actions,
  visibleSpin = false,
  actionName = "",
  delayTime = 100,
  promiseApi,
  arg = {},
  dispatchRedux = true,
  dispatchRequest = true,
  onBeforeRequest = (dispatch, getState, arg) => {
    return arg;
  },
  onAfterRequest = (dispatch, getState, arg) => {
    return arg;
  },
  dispatchSuccess = true,
  onBeforeSuccess = (dispatch, getState) => {
    return;
  },
  onAfterSuccess = (dispatch, getState, data) => {
    return data;
  },
  dispatchError = true,
  onBeforeError = (dispatch, getState) => {
    return;
  },
  onAfterError = (dispatch, getState, data) => {
    return data;
  },
}: IApiAction) => {
  return async (dispatch: any, getState: any) => {
    if (visibleSpin) {
      let handlerOS = setTimeout(() => {
        clearTimeout(handlerOS);
      });
    }
    // TcoN.D-Request
    if (onBeforeRequest) {
      let argTmp = onBeforeRequest(dispatch, getState, {
        ...arg,
      });
      if (typeof argTmp === "object") {
        arg = argTmp;
      }
    }
    dispatchRedux &&
      dispatchRequest &&
      dispatch(
        Actions.getCallback(actionName + REQUEST)({
          ...arg,
        })
      );
    onAfterRequest && onAfterRequest(dispatch, getState, { ...arg });
    // TcoN.D-Request
    try {
      // TcoN.D-Success
      onBeforeSuccess && onBeforeSuccess(dispatch, getState);
      const data = await promiseApi();
      if (arg) {
        data.tmpArg = arg;
      }
      dispatchRedux &&
        dispatchSuccess &&
        dispatch(Actions.getCallback(actionName + SUCCESS)(data));
      onAfterSuccess &&
        setTimeout(() => onAfterSuccess(dispatch, getState, data));
      // TcoN.D-Success
      if (visibleSpin) {
        let handlerCSS = setTimeout(() => {
          clearTimeout(handlerCSS);
        }, delayTime);
      }
      return data;
    } catch (err) {
      // TcoN.D-Error
      onBeforeError && onBeforeError(dispatch, getState);
      dispatchRedux &&
        dispatchError &&
        dispatch(Actions.getCallback(actionName + ERROR)(err));
      onAfterError && onAfterError(dispatch, getState, err);
      if (visibleSpin) {
        let handlerCES = setTimeout(() => {
          clearTimeout(handlerCES);
        }, delayTime);
      }
      // TcoN.D-Error
      throw err;
    }
  };
};
