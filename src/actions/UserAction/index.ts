import { createrAction } from "../RAction";
import { REQUEST_TYPE } from "../ActionTypes";
import { getActionAPI } from "../UtilAction";
import ManagerAPI from "../../connection/connection.manager";

const { POST_USER_LOGIN } = REQUEST_TYPE;

const Actions = createrAction({
  actionListApi: [POST_USER_LOGIN],
  actionName: "UserAction",
  actionListNormal: [],
});

const postUserLogin = (
  username: string,
  password: string,
  dispatchRedux: boolean = true
) => {
  return getActionAPI({
    dispatchRedux: dispatchRedux,
    Actions: Actions,
    visibleSpin: true,
    actionName: POST_USER_LOGIN,
    promiseApi: async () => {
      return ManagerAPI.getInstance().login(username, password);
    },
  });
};

const ActionCallback = {
  postUserLogin,
};

export default ActionCallback;
