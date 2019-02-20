import { action, observable } from "mobx";

export type State = "board" | "thread" | "pending";

export interface IFile {
    name: string;
    path: string;
}

export interface IPost {
    comment: string;
    date: string;
    name: string;
    num: string;
    files: IFile[];
}

export interface IThread {
    num: string;
    subject: string;
    comment: string;
    date: string;
    threads: any[];
    files: IFile[];
    posts: IPost[];
}

export interface IBoard {
    threads: IThread[];
}

export interface IStore {
    state: State;
    board?: IBoard;
    thread?: IThread;
    setThread(num: string): void;
    setBoard(): void;
    changeState(state: State): void;
}

class Store implements IStore {
    @observable
    state: State = "board";

    @observable
    board?: IBoard;

    @observable
    thread?: IThread;

    @action
    setThread = async (num: string) => {
        this.changeState("pending");
        const resp = await fetch(`https://2ch.hk/pr/res/${num}.json`);
        const thread: IThread = await resp.json();
        thread.posts = [];
        for (const post of thread.threads[0].posts) {
            thread.posts.push(post);
        }
        this.thread = thread;
        this.changeState("thread");
    };

    @action
    setBoard = async () => {
        this.changeState("pending");
        const resp = await fetch("https://2ch.hk/pr/catalog.json");
        const board = await resp.json();
        this.board = board;
        this.changeState("board");
    };

    @action
    changeState = (state: State) => {
        this.state = state;
    };
}

export default new Store();
