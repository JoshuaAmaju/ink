type Props<T = unknown> = Record<string, T>;
type Events = Props<any>;
type KeyedData<T extends Props = {}> = {
    key: string;
    state: Data<T>;
};
type Properties<T = KeyedData> = {
    value: T;
    class: T;
    style: Props<KeyedData>;
} & Events & Props<T>;
interface Block {
    (props?: Props<string>): Partial<Properties>;
    disconnected?: () => void;
    connected?: () => void | VoidFunction;
}
declare class Data<T extends Props = {}> {
    protected prev: T;
    protected state: T;
    private raf?;
    private listeners;
    constructor(value: T);
    get(): T;
    getPrev(): T;
    set(value: T): void;
    private notify;
    private notifyListeners;
    subscribe(callback: VoidFunction): {
        unsubscribe: () => void;
    };
}
type UseData<T extends Props, P extends keyof T> = {
    state: T;
    data: Data<T>;
    forceUpdate: VoidFunction;
    get: Record<P, KeyedData<T>>;
};
declare function useData<T extends Props, P extends keyof T>(state: T): UseData<T, P>;
declare function query(selector: string | HTMLElement): HTMLElement | null;
declare function queryAll<T extends HTMLElement>(selector: string): T[];
declare function watch({ key, state }: KeyedData, callback: VoidFunction): void;
declare function register(block: Block, domNode: string | HTMLElement): () => void;
declare function map<K extends KeyedData, S extends K["state"], G extends ReturnType<S["get"]>>({ key, state }: K, callback: (v: G[keyof G]) => unknown): {
    key: string;
    state: Data<{}>;
};
export { register, map, Block, query, queryAll, useData, watch };
//# sourceMappingURL=ink.d.ts.map