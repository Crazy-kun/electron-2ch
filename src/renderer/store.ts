import { action, observable } from "mobx";

export type State = "board" | "thread" | "pending";

export interface IThread {
    num: string;
    subject: string;
    threads: any[];
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
        this.state = "pending";
        const resp = await fetch(`https://2ch.hk/pr/res/${num}.json`);
        const thread = await resp.json();
        this.thread = thread;
        this.state = "thread";
    };

    @action
    setBoard = async () => {
        this.state = "pending";
        const resp = await fetch("https://2ch.hk/pr/catalog.json");
        const board = await resp.json();
        this.board = board;
        this.state = "board";
    };

    @action
    changeState(state: State) {
        this.state = state;
    }
}

export default new Store();
