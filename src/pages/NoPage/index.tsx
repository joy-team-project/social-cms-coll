import React from "react";
import { RouterName } from "../../navigation/navigation.const";
import BasePage from "../BasePage";
import { Result, Button } from "antd";

interface IState {
  username?: string;
  password?: string;
}

interface IProps {
  history?: any;
}

class NoPage extends BasePage<IProps, IState> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.displayName = RouterName.NoPage;
  }

  renderContent() {
    const {history} = this.props;
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => history.push(RouterName.Home)}>
            Back Home
          </Button>
        }
      />
    );
  }
}

export default NoPage;
