import React from "react";
import ReactDom from "react-dom/client";
import { Provider } from "react-redux";
import appStore from "./src/store/appStore";
import AppRouter from "./appRouter";
import './src/globalStyles.css'

const App = () => {
  return (
    <Provider store={appStore}>
      <AppRouter />
    </Provider>
  );
};

const parent = document.getElementById("root");
const root = ReactDom.createRoot(parent);
root.render(App());
