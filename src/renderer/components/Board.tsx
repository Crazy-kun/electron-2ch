import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { IStore } from "../store";

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
                <button
                    onClick={this.props.store!.setBoard}
                    className="btn btn-primary"
                >
                    Update
                </button>
                <ul className="list-group">
                    {board &&
                        board.threads.map(thread => {
                            return (
                                <li
                                    className="list-group-item"
                                    key={thread.num}
                                >
                                    {thread.subject}
                                    <button
                                        className="btn btn-primary btn-sm"
                                        id={thread.num}
                                        onClick={this.buttonClick}
                                    >
                                        Open
                                    </button>
                                </li>
                            );
                        })}
                </ul>
            </div>
        );
    }
}

export default Board;
