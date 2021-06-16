import Config from "../config";

export const URL = {
  __DEV__: "192.168.3.169:3000",
  _tmpUrl: "",
  baseUrl: "http://localhost:3001/user-service/",
  switchBaseUrl: function (url: string) {
    if (Config.useServerTest) {
      if (url.indexOf(Config.versionApi) !== -1) {
        this.baseUrl = url;
        return;
      }
      this.baseUrl = url + Config.versionApi;
      return;
    }
    if (url.indexOf(Config.versionApi) !== -1) {
      this.baseUrl = url;
      return;
    }
    this.baseUrl = url + Config.versionApi;
  },
  login: "user/login",
  getListAccount: "account/accounts",
};

// export enum TypeMethod {
//     GET = "GET",
//     POST = "POST",
//     OPTION = "OPTION",
//     PUT = "PUT",
//     DELETE = "DELETE",
// }

export const HttpStatusCode = {
  SUCCESS: 200,
  SUCCESS201: 201,
  KICK: 401,
  SERVER: 497,
};
