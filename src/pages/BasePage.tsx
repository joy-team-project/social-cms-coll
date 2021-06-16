import React from "react";
import { shouldComponentUpdate } from "react-window";

class BasePage<P, S> extends React.Component<P, S> {
  mounted: boolean = true;
  displayName: string;
  static childContextTypes: {};
  constructor(props: P | Readonly<P>) {
    super(props);
    this.displayName = "";
  }

  _componentDidMount() {}

  componentDidMount() {
    this.mounted = true;
    this._componentDidMount();
  }

  _componentWillUnmount() {}

  componentWillUnmount() {
    this.mounted = false;
    this._componentWillUnmount();
  }

  callbackSafe = (cb?: (...arg: any[]) => void, ...args: any[]) => {
    if (!this.mounted) return;
    cb && cb.call(this, ...args);
  };

  setStateSafe = (
    state:
      | S
      | ((
          prevState: Readonly<S>,
          props: Readonly<P>
        ) => S | Pick<S, keyof S> | null)
      | Pick<S, keyof S>
      | null,
    callback?: () => void
  ): void => {
    if (!this.mounted) return;
    this.setState(state, callback);
  };

  renderContent(): React.ReactNode {
    return null;
  }

  render() {
    return this.renderContent();
  }
}

BasePage.prototype.shouldComponentUpdate = shouldComponentUpdate;

export default BasePage;
