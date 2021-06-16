enum KeyLocalStorage {
  WasLogin = "WasLogin",
  AccessToken = "AccessToken",
  RefreshToken = "RefreshToken",
}

export default class AppInfoManager {
  private static _instance: AppInfoManager | null | undefined;
  static getInstance(): AppInfoManager {
    if (!this._instance) {
      this._instance = new AppInfoManager();
    }
    return this._instance;
  }
  static clear(): void {
    if (this._instance) {
      delete this._instance;
    }
  }
  constructor() {
    this._init();
  }
  private accessToken: string | undefined | null;
  private refreshToken: string | undefined | null;

  _init() {
    this.accessToken = this.getAccessToken();
    this.refreshToken = this.getRefreshToken();
  }

  checkLogin(): boolean {
    const wasLogin = localStorage.getItem(KeyLocalStorage.WasLogin);
    if (!wasLogin) return false;
    return true;
  }

  setStatusLogin(value: boolean): void {
    localStorage.setItem(KeyLocalStorage.WasLogin, value ? "true" : "");
  }

  setAccessToken(accessToken: string | null | undefined) {
    if (!accessToken) return;
    this.accessToken = accessToken;
    localStorage.setItem(KeyLocalStorage.AccessToken, accessToken);
  }

  getAccessToken(): string | null {
    return this.accessToken
      ? this.accessToken
      : localStorage.getItem(KeyLocalStorage.AccessToken);
  }

  setRefreshToken(refreshToken: string | null) {
    if (!refreshToken) return;
    this.refreshToken = refreshToken;
    localStorage.setItem(KeyLocalStorage.RefreshToken, refreshToken);
  }

  getRefreshToken(): string | null {
    return this.refreshToken
      ? this.refreshToken
      : localStorage.getItem(KeyLocalStorage.RefreshToken);
  }
}
