import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { IStore } from "../store";
import Board from "./Board";
import Thread from "./Thread";

interface IProps {
    store?: IStore;
}

@inject("store")
@observer
class App extends Component<IProps> {
    render() {
        const { state } = this.props.store!;
        return (
            <div className="container">
                {state == "board" && <Board />}
                {state == "thread" && <Thread />}
            </div>
        );
    }
}

export default App;
