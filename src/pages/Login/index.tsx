import React from "react";
import { Form, Input, Button, Typography, Space, Divider } from "antd";
import ManagerAPI from "../../connection/connection.manager";
import { getValueFromObjectByKeys } from "../../utils/utils.data";
import AppInfoManager from "../../AppInfoManager";
import { RouterName } from "../../navigation/navigation.const";
import BasePage from "../BasePage";

const { Title } = Typography;

interface IState {
  username?: string;
  password?: string;
}

interface IProps {
  history?: any;
  location?: any;
}

class Login extends BasePage<IProps, IState> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.displayName = RouterName.Login;
    this.state = {
      username: "",
      password: "",
    };
  }
  _componentDidMount() {
    const { history, location } = this.props;
    let { from } = location.state || { from: { pathname: "/" } };
    const wasLogin = AppInfoManager.getInstance().checkLogin();
    if (wasLogin) {
      history.replace(from);
    }
  }
  renderContent() {
    const { username, password } = this.state;
    const { history, location } = this.props;
    const handleChange = (e: any) => {
      const { name, value } = e.target;
      this.setStateSafe({ [name]: value });
    };
    return (
      <div>
        <section
          style={{ textAlign: "center", marginTop: 48, marginBottom: 40 }}
        >
          <Space align="start">
            <img
              style={{ width: 40, height: 40 }}
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              alt="J.O.Y"
            />
            <Title level={2} style={{ marginBottom: 0 }}>
              Joy .Ent
            </Title>
          </Space>
        </section>
        <Divider style={{ marginBottom: 60 }}>Đăng nhập</Divider>
        <Form.Item>
          <Input
            name="username"
            value={username}
            onChange={handleChange}
            style={{ width: "30vw" }}
            size={"large"}
            maxLength={35}
            placeholder={"Tên đăng nhập"}
            allowClear
          />
        </Form.Item>
        <Form.Item>
          <Input.Password
            name="password"
            value={password}
            onChange={handleChange}
            style={{ width: "30vw" }}
            size={"large"}
            maxLength={35}
            placeholder={"Mật khẩu"}
            allowClear
          />
        </Form.Item>
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            onClick={async () => {
              if (!username || !password) {
                return;
              }
              try {
                const data = await ManagerAPI.getInstance().login(
                  username, //"admin",
                  password //"admin123"
                );
                console.log("Data:", data);
                const token = getValueFromObjectByKeys(data, ["data", "token"]);
                let { from } = location.state || { from: { pathname: "/" } };
                if (token) {
                  AppInfoManager.getInstance().setStatusLogin(true);
                  AppInfoManager.getInstance().setAccessToken(token);
                  history.replace(from);
                }
                return data;
              } catch (error) {
                throw error;
              }
            }}
          >
            Đăng nhập
          </Button>
          <Button>Đăng ký</Button>
        </Space>
      </div>
    );
  }
}

export default Login;
