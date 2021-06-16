import { URL } from "./connection.const";
import Connector from "./connection.connector";

export default class ManagerAPI {
  private static _instance: ManagerAPI | undefined;
  private static _displayName: string = "ManagerAPI";
  static getInstance() {
    if (!this._instance) {
      this._instance = new ManagerAPI();
    }
    return this._instance;
  }
  static clear() {
    if (this._instance) delete this._instance;
  }

  // 0. GetConnector
  getConnector = (url: string, customUrl: string = ""): Connector => {
    return new Connector().setUrl(customUrl ? customUrl : URL.baseUrl + url);
  };

  login = (username: string, password: string): Promise<any> => {
    const params = {
      username,
      password,
    };
    return this.getConnector(URL.login)
      .setMethod("POST")
      .setParams(params)
      .setUseToken(false)
      .getPromise();
  };

  getAllAccount = (page?: number, size?: number): Promise<any> => {
    return this.getConnector(URL.getListAccount)
      .setMethod("GET")
      .setQuery({ page, size })
      .getPromise();
  };
}

export { ManagerAPI };
