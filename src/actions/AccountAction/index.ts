import { createrAction } from "../RAction";
import { REQUEST_TYPE } from "../ActionTypes";
import { getActionAPI } from "../UtilAction";
import ManagerAPI from "../../connection/connection.manager";

const { GET_ALL_ACCOUNTS } = REQUEST_TYPE;

const Actions = createrAction({
  actionListApi: [GET_ALL_ACCOUNTS],
  actionName: "AccountAction",
  actionListNormal: [],
});

const getAllAccount = (
  page?:number,size?:number,
  dispatchRedux: boolean = true,
  
) => {
  return getActionAPI({
    dispatchRedux: dispatchRedux,
    Actions: Actions,
    visibleSpin: true,
    actionName: GET_ALL_ACCOUNTS,
    promiseApi: async () => {
      return ManagerAPI.getInstance().getAllAccount(page,size);
    },
  });
};

const ActionCallback = {
  getAllAccount,
};

export default ActionCallback;
