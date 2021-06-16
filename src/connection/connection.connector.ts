import { HttpStatusCode } from './connection.const';
/* eslint-disable no-throw-literal */
import axios, { AxiosRequestConfig, Method } from "axios";
import AppInfoManager from "../AppInfoManager";
// import Config from "../config";

const myLog = (...args: any[]): void => {
  console.log(...args);
};

const ConfigAxiosDefault = {
  timeout: 30000,
  validateStatus: (status: number) => {
    return status >= 200 && status <= 600;
  },
};

// interface IErrorCode {
//   errorCode: number;
//   errorNameCS: string;
// }

export const ERROR_CODE = {
  AXIOS: { errorCode: 1, errorNameCS: "AXIOS" },
  SERVER: { errorCode: 2, errorNameCS: "SERVER" },
  PARSE_DATA: { errorCode: 3, errorNameCS: "PARSE_DATA" },
  NO_INTERNET: { errorCode: 4, errorNameCS: "NO_INTERNET" },
  OTHER: { errorCode: 5, errorNameCS: "OTHER" },
};

const EC_CODE = {
  TOKEN_EXPIRE: 1,
  LOCK_USER: 2,
  LOCK_DEVICE: 3,
  KICK_BY_OTHER: 4,
};

export const kickAction = (data: any) => {
  localStorage.clear();
  window.location.reload();
};

export default class Connector {
  private url: string = "";
  private token: string = "";
  private timeout: number = 30000;
  private method: Method = "get";
  private useToken: boolean = true;
  private query: any = {};
  private params: any = {};
  private dataTmp: any = {};
  // Set Url for request
  setUrl(url: string): Connector {
    this.url = url;
    return this;
  }

  setTimeOut(timeout: number): Connector {
    this.timeout = timeout;
    return this;
  }

  setAccessToken(token: string): Connector {
    this.token = token;
    return this;
  }

  setMethod(method: Method) {
    this.method = method;
    return this;
  }

  setUseToken(useToken: boolean): Connector {
    this.useToken = useToken;
    return this;
  }

  setQuery(query: any): Connector {
    this.query = query;
    return this;
  }

  setParams(params: any): Connector {
    this.params = params;
    return this;
  }

  setDataTmp(dataTmp: any): Connector {
    this.dataTmp = dataTmp;
    return this;
  }

  async getPromise() {
    return await this._fetchDataHttp();
  }

  async _fetchDataHttp(): Promise<any> {
    const headers: any = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (this.useToken) {
      let access_token = AppInfoManager.getInstance().getAccessToken();
      if (this.token !== "") {
        headers["Authorization"] = "Bearer " + this.token;
      } else {
        if (access_token !== null && access_token !== "")
          headers["Authorization"] = "Bearer " + access_token;
      }
    }
    let data = null;
    const inputData: AxiosRequestConfig = {
      method: this.method,
      url: this.url,
      params: this.query,
      data: this.params,
      headers: headers,
      ...ConfigAxiosDefault,
      timeout: this.timeout,
    };
    myLog(inputData);
    const arg = {
      arg: {
        url: this.url,
        params: this.params,
        query: this.query,
      },
    };
    try {
      const response = await axios(inputData);
      // console.log(response);
      if (typeof response === "object") {
        data = response.data;
      } else if (typeof response === "string") {
        data = response;
      }
      myLog("data", data, response.status);
      if (data === null) {
        throw {
          ...ERROR_CODE.PARSE_DATA,
          ...arg,
        };
      }
      console.log(response.status)
      switch (response.status) {
        case HttpStatusCode.SUCCESS201:
        case HttpStatusCode.SUCCESS:
          return {
            ...arg,
            data: data,
            statusCode: response.status,
          };
        case HttpStatusCode.KICK:
          kickAction(data);
          // switch (data.code) {
          //   case EC_CODE.KICK_BY_OTHER:
          //   case EC_CODE.LOCK_DEVICE:
          //   case EC_CODE.LOCK_USER:
          //     kickAction(data);
          //     break;
          //   default:
          //     break;
          // }
          throw {
            ...data,
            ...ERROR_CODE.SERVER,
            ...arg,
            statusCode: response.status,
          };
        case HttpStatusCode.SERVER:
          throw {
            ...data,
            ...ERROR_CODE.SERVER,
            ...arg,
            statusCode: response.status,
          };
        default:
          throw {
            ...data,
            ...ERROR_CODE.OTHER,
            ...arg,
            statusCode: response.status,
          };
      }
    } catch (error) {
      if (error.isAxiosError) {
        throw {
          ...error,
          ...ERROR_CODE.AXIOS,
          ...arg,
        };
      }
      switch (error.errorCode) {
        case ERROR_CODE.PARSE_DATA.errorCode:
        case ERROR_CODE.AXIOS.errorCode:
        case ERROR_CODE.SERVER.errorCode:
        case ERROR_CODE.NO_INTERNET.errorCode:
          throw error;
        default:
          throw {
            ...error,
            ...ERROR_CODE.OTHER,
            ...arg,
          };
      }
    }
  }
}
