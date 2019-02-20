import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Row, Col } from "antd/lib/grid";
import Layout from "antd/lib/layout";
import { IStore } from "../store";
import Board from "./Board";
import Thread from "./Thread";

interface IProps {
    store?: IStore;
}

@inject("store")
@observer
class App extends Component<IProps> {
    componentDidMount() {
        this.props.store!.setBoard();
    }
    render() {
        const { state } = this.props.store!;
        return (
            <Layout>
                <Layout.Content>
                    <Row gutter={16}>
                        <Col span={1} />
                        <Col span={10}>
                            {state == "pending" && <div>Loading...</div>}
                            {state == "board" && <Board />}
                            {state == "thread" && <Thread />}
                        </Col>
                        <Col span={1} />
                    </Row>
                </Layout.Content>
            </Layout>
        );
    }
}

export default App;
