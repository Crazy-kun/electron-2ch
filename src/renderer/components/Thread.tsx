import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { IStore } from "../store";

interface IProps {
    store?: IStore;
}

@inject("store")
@observer
class Thread extends Component<IProps> {
    buttonClick = () => {
        this.props.store!.changeState("board");
    };
    render() {
        const { thread } = this.props.store;
        const posts = thread && thread.threads[0].posts;
        return (
            <div>
                <button onClick={this.buttonClick} className="btn btn-primary">
                    Back
                </button>
                <ul className="list-group">
                    {posts &&
                        posts &&
                        posts.map((post: any) => {
                            return (
                                <li
                                    className="list-group-item"
                                    key={post.num}
                                    dangerouslySetInnerHTML={{
                                        __html: post.comment
                                    }}
                                />
                            );
                        })}
                </ul>
            </div>
        );
    }
}

export default Thread;
