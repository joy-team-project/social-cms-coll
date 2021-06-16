import React from "react";
import AppContainer from "../navigation/navigation.app";
import ConfigStore from "./ConfigStore";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import vi_VN from "antd/lib/locale/vi_VN";
// import "antd/dist/antd.css";
import './App.less';

const { store } = ConfigStore();

const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={vi_VN}>
        <AppContainer />
      </ConfigProvider>
    </Provider>
  );
};

export default App;
