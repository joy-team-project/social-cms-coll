import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";
import Immutable from "immutable";

const middleware = [];

middleware.push(thunk);

const store = createStore(
  reducers,
  Immutable.Map({}),
  applyMiddleware(...middleware)
);

const ConfigStore = () => {
  return { store };
};

export default ConfigStore;
