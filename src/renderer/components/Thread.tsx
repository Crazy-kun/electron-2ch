import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Button from "antd/lib/button";
import { List, Avatar } from "antd";
import { IStore, IPost } from "../store";

interface IProps {
    store?: IStore;
}

@inject("store")
@observer
class Thread extends Component<IProps> {
    buttonClick = () => {
        this.props.store!.setBoard();
    };
    render() {
        const { thread } = this.props.store;
        const posts = thread && thread.posts;
        return (
            <div>
                <Button type="primary" onClick={this.buttonClick}>
                    Back
                </Button>

                <List
                    bordered
                    dataSource={posts}
                    renderItem={(post: IPost) => (
                        <List.Item>
                            <List.Item.Meta
                                title={post.date}
                                avatar={
                                    post.files.length && (
                                        <Avatar
                                            src={
                                                "https://2ch.hk" +
                                                post.files[0].path
                                            }
                                        />
                                    )
                                }
                                description={
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: post.comment
                                        }}
                                    />
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default Thread;
