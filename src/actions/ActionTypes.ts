const encodeString = (str:string, isRequire = false) => {
  if (isRequire) {
    return str;
  }
  return str;
};

export const REQUEST_TYPE = {
  GET_USER_INFO: encodeString("GET_USER_INFO"),
  POST_USER_LOGOUT: encodeString("POST_USER_LOGOUT"),
  POST_USER_LOGIN: encodeString("POST_USER_LOGIN"),
  GET_ALL_ACCOUNTS: encodeString("GET_ALL_ACCOUNTS"),
};

export const REQUEST_SUBTYPE = {
  REQUEST: encodeString("OnRequest"),
  ERROR: encodeString("OnError"),
  SUCCESS: encodeString("OnSuccess"),
};

export const NORMAL_TYPE = {
  CHANGE_VOD_STATE: encodeString("CHANGE_VOD_STATE"),
  CLEAR_DATA_CATEGORY: encodeString("CLEAR_DATA_CATEGORY"),
  CHANGE_RESIZE_WINDOW: encodeString("CHANGE_RESIZE_WINDOW"),
  NETWORK_CHANGE: encodeString("NETWORK_CHANGE"),
};

const ActionTypes = {
  REQUEST_TYPE,
  REQUEST_SUBTYPE,
  NORMAL_TYPE,
};

export default ActionTypes;
