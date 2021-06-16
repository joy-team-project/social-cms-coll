import { REQUEST_SUBTYPE } from "./ActionTypes";

const { REQUEST, SUCCESS, ERROR } = REQUEST_SUBTYPE;

interface ITypeAction {
  type: string;
  key?: string;
  data?: any;
  subType?: string;
}

interface TypeCreateAction {
  actionListApi?: string[];
  actionName: string;
  actionListNormal?: string[];
}

class RAction {
  private actionListApi: any = {};
  private actionListNormal: any = {};
  private actionName: string = "RAction";
  private actionCallback: any = {};
  constructor({
    actionListApi = [],
    actionName = "",
    actionListNormal = [],
  }: TypeCreateAction) {
    for (let i = 0; i < actionListApi.length; i++) {
      const element = actionListApi[i];
      this.actionListApi[element] = element;
    }
    for (let j = 0; j < actionListNormal.length; j++) {
      const element = actionListNormal[j];
      this.actionListNormal[element] = element;
    }
    this.actionName = actionName;
    this._init();
  }

  getCallback(key: string) {
    return this.actionCallback[key];
  }

  private _init() {
    Object.keys(this.actionListNormal).forEach((key) => {
      let actionKey = this.actionListNormal[key];
      this.actionCallback[key] = (data: any): ITypeAction => {
        return {
          type: actionKey,
          key: actionKey,
          data,
        };
      };
    });
    Object.keys(this.actionListApi).forEach((key) => {
      let actionKey = this.actionListApi[key];
      this.actionCallback[key + REQUEST] = (data: any): ITypeAction => {
        return {
          type: actionKey + REQUEST,
          key: actionKey,
          subType: REQUEST,
          data: data ? data : undefined,
        };
      };
      this.actionCallback[key + SUCCESS] = (data: any): ITypeAction => {
        return {
          type: actionKey + SUCCESS,
          key: actionKey,
          subType: SUCCESS,
          data: data ? data : undefined,
        };
      };
      this.actionCallback[key + ERROR] = (data: any): ITypeAction => {
        return {
          type: actionKey + ERROR,
          key: actionKey,
          subType: ERROR,
          data: data ? data : undefined,
        };
      };
    });
    return this;
  }
}

export const createrAction = ({
  actionListApi = [],
  actionName = "",
  actionListNormal = [],
}: TypeCreateAction) => {
  return new RAction({ actionListApi, actionName, actionListNormal });
};

export default RAction;
