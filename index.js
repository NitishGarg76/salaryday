/**
 * @format
 */
import React from "react";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { Provider } from "react-redux";
import { persistor, store } from "./src/services/redux/store/configureStore";
import { PersistGate } from "redux-persist/integration/react";

const RNRedux = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
