import React, { useState } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import { RouterApp, RouterName } from "./navigation.const";
import { Layout, Menu, Avatar, Image, } from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  ShopOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import ProLayout from "@ant-design/pro-layout";
import AppInfoManager from "../AppInfoManager";
import { HeaderDropdown } from "../components/common";
const { Content, Footer } = Layout;

// function handleButtonClick(e: any) {
//   console.log("click left button", e);
// }

function handleMenuClick(e: any) {
  console.log("click", e);
}

const menuInfo = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1" icon={<UserOutlined />}>
      Hồ sơ
    </Menu.Item>
    <Menu.Item key="2" icon={<SettingOutlined />}>
      Cài đặt
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" icon={<LogoutOutlined />}>
      Đăng xuất
    </Menu.Item>
  </Menu>
);

interface IItemMenu {
  title: string;
  icon: React.ReactNode;
  route?: string;
}

const menuList: IItemMenu[] = [
  {
    title: "Dashboard",
    icon: <AppstoreOutlined />,
    route: RouterName.Home,
  },
  {
    title: "Thống kê",
    icon: <BarChartOutlined />,
    route: RouterName.NoPage,
  },
  {
    title: "Danh mục",
    icon: <ShopOutlined />,
  },
  {
    title: "Tài khoản MXH",
    icon: <UserOutlined />,
    route: RouterName.Account,
  },
];

const AppContainer = () => {
  const [showMenu, setShowMenu] = useState(false);
  const collapsedMenu = () => setShowMenu(!showMenu);
  return (
    <Router>
      <ProLayout
        title={"Tiktok Manager"}
        logo={"https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg"}
        onCollapse={collapsedMenu}
        menuContentRender={() => (
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            {menuList.map((row, i) => {
              return (
                <Menu.Item key={i} icon={row.icon}>
                  {row.route ? (
                    <Link to={row.route}>{row.title}</Link>
                  ) : (
                    row.title
                  )}
                </Menu.Item>
              );
            })}
          </Menu>
        )}
        fixSiderbar
        fixedHeader
        collapsed={showMenu}
        rightContentRender={() => {
          // const wasLogin = AppInfoManager.getInstance().checkLogin();
          return (
            <div className={"antd-pro-components-global-header-index-right"}>
              {/* <Tooltip title="使用文档">
                <a
                  style={{
                    color: "inherit",
                  }}
                  target="_blank"
                  href="https://pro.ant.design/docs/getting-started"
                  rel="noopener noreferrer"
                >
                  <QuestionCircleOutlined />
                </a>
              </Tooltip> */}
              <HeaderDropdown
                overlay={menuInfo}
                placement="bottomCenter"
                // arrow
                trigger={["click"]}
              >
                <div
                  className={
                    "antd-pro-components-global-header-index-action antd-pro-components-global-header-index-account"
                  }
                >
                  <Avatar />
                  <span>Tài khoản</span>
                </div>
              </HeaderDropdown>
            </div>
          );
        }}
      >
        <Layout className="site-layout">
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, textAlign: "center" }}
            >
              <Switch>
                {RouterApp.map((r, i) => {
                  return (
                    <Route
                      key={i}
                      path={r.path}
                      exact={r.exact}
                      render={(props) => {
                        if (r.wasLogin) {
                          const wasLogin =
                            AppInfoManager.getInstance().checkLogin();
                          if (!wasLogin) {
                            return (
                              <Redirect
                                to={{
                                  pathname: RouterName.Login,
                                  state: { from: props.location },
                                }}
                              />
                            );
                          }
                        }
                        // if (roles && roles.indexOf(currentUser.role) === -1) {
                        //   return <Redirect to={{ pathname: "/" }} />;
                        // }
                        return <r.component {...props} />;
                      }}
                    />
                  );
                })}
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            JoyStudio ©2021 Created by TcoN.D
          </Footer>
        </Layout>
      </ProLayout>
    </Router>
  );
};

export default AppContainer;
