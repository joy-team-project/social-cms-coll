import { Login, Home, NoPage, Account } from "../pages";

export const RouterName = {
  Home: "/",
  Login: "/login/",
  Account: "/account/",
  NoPage: "/404/",
};

interface IRouteItem {
  path: string;
  component: any;
  exact?: boolean;
  wasLogin?: boolean;
}

export const RouterApp: IRouteItem[] = [
  {
    path: RouterName.Home,
    component: Home,
    exact: true,
    wasLogin: true,
  },
  {
    path: RouterName.Login,
    component: Login,
    exact: true,
  },
  {
    path: RouterName.NoPage,
    component: NoPage,
    // exact: true,
  },
  {
    path: RouterName.Account,
    component: Account,
    exact: true,
    wasLogin: true,
  },
];
