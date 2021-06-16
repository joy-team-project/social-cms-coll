import React from "react";
import { RouterName } from "../../navigation/navigation.const";
import BasePage from "../BasePage";

interface IState {
  username?: string;
  password?: string;
}

interface IProps {
  history?: any;
}

class Home extends BasePage<IProps, IState> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.displayName = RouterName.Home;
  }

  renderContent() {
    return <div>{this.displayName}</div>;
  }
}

export default Home;
