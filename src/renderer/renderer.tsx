import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import App from "./components/App";
import store from "./store";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);
