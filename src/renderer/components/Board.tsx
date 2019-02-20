import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Button from "antd/lib/button";
import { List, Avatar } from "antd";
import { IStore, IThread } from "../store";

interface IProps {
    store?: IStore;
}

@inject("store")
@observer
class Board extends Component<IProps> {
    buttonClick = (e: React.MouseEvent<HTMLElement>) => {
        this.props.store!.setThread(e.currentTarget.id);
    };
    render() {
        const { board } = this.props.store!;
        return (
            <div>
                {board && (
                    <List
                        bordered
                        dataSource={board.threads}
                        renderItem={(thread: IThread) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={
                                        <Button
                                            type="primary"
                                            id={thread.num}
                                            onClick={this.buttonClick}
                                        >
                                            Open
                                        </Button>
                                    }
                                    avatar={
                                        thread.files.length && (
                                            <Avatar
                                                src={
                                                    "https://2ch.hk" +
                                                    thread.files[0].path
                                                }
                                            />
                                        )
                                    }
                                    description={
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: thread.comment
                                            }}
                                        />
                                    }
                                />
                            </List.Item>
                        )}
                    />
                )}
            </div>
        );
    }
}

export default Board;
